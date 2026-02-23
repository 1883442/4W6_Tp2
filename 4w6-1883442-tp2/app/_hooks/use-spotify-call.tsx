"use client";

import axios from "axios";
import { Artist } from "../_types/artiste";
import { spotifyRequest } from "../spotify-interceptor";
import { useContext, useState } from "react";
import { CounterContext } from "../_components/context-wrapper";
import { CurrentArtistContext } from "../_components/context-currentArtist";
import { Album } from "../_types/album";

export default function UseSpotifyCall() {
   
    const { CLIENT_ID, CLIENT_SECRET, setSpotifyToken} = useContext(CounterContext);
    const useArtistContext = useContext(CurrentArtistContext);
   
    function addArtist(newArtist : Artist) {
        //PK IL DIT QUE C"EST DES STRINGS VOYONS DONC
        let oldArtistList : Artist[] = [];
        if(useArtistContext?.listFavoris  && useArtistContext.listFavoris.length > 0) {
            for(let a  of useArtistContext!.listFavoris) {
            oldArtistList.push(new Artist(a.id,a.name,a.imageUrl));
        }
        }
        
        oldArtistList.push(new Artist(newArtist.id,newArtist.name,newArtist.imageUrl));
        useArtistContext?.setListFavoris(oldArtistList);
        let storeArtist = useArtistContext?.listFavoris
        if(storeArtist !== undefined) {
            localStorage.setItem("favorisListe", JSON.stringify(storeArtist));
        }
        
    }


     async function connect() {
        // Attention ! Pour une fois, on utilise une requête POST
        const response = await axios.post("https://accounts.spotify.com/api/token",
            // On joint un contenu (body) à la requête
            new URLSearchParams({ grant_type: "client_credentials" }), {
            // On joint des en-têtes (headers) à la requête
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
            }
        });
        console.log(response.data);
        // response.data.access_token contient le token qu'on voulait obtenir !
        setSpotifyToken(response.data.access_token);
        localStorage.setItem("token", response.data.access_token);
    }


    async function getArtist(userInput : string) { 

        try {
        const response = await spotifyRequest.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + userInput);
        console.log(response.data);
         var artiste =  new Artist(response.data.artists.items[0].id, response.data.artists.items[0].name, response.data.artists.items[0].images[0].url);
        //  addArtist(artiste);
        //  console.log(useArtistContext?.listFavoris);
         return artiste;
        }
        catch(e) {
            console.log(e);
        }
    }


async function getAlbums(artistId : string) {
  const response = await spotifyRequest.get("https://api.spotify.com/v1/artists/" + artistId + "/albums?include_groups=album,single"
  );
  console.log(response.data);
  let num : number = 0;
  let albums = response.data.items;
  let albumList : Album[] = [];
    for(let a of albums) {
        albumList.push(new Album(a.id, a.name, a.images[0].url));
        console.log(a);
        num++;
    }
  return albumList;
}



    return {connect,addArtist,getArtist, getAlbums};

}



   