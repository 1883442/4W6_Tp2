"use client";

import axios from "axios";
import { Artist } from "../_types/artiste";
import { spotifyRequest } from "../spotify-interceptor";
import { useContext, useState } from "react";
import { CounterContext } from "../_components/context-wrapper";
import { CurrentArtistContext } from "../_components/context-currentArtist";
import { Album } from "../_types/album";
import { Chanson } from "../_types/chanson";
import { Concert } from "../_types/concert";

export default function UseSpotifyCall() {
   
    const { CLIENT_ID, CLIENT_SECRET, setSpotifyToken, currentVideo, setCurrentVideo,listConcert,setListConcert,markers, setMarkers} = useContext(CounterContext);
    const useArtistContext = useContext(CurrentArtistContext);
    const apiKey = "AIzaSyCxxpwgifKLBZKELWmXAYQQ7ungz6JVGkQ";
    const bandsInTownApiKey : string = "2b32475766802ac01eefda45e9e42ea0";
   
    function addArtist(newArtist : Artist) {
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
        const response = await axios.post("https://accounts.spotify.com/api/token",
            new URLSearchParams({ grant_type: "client_credentials" }), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + btoa(CLIENT_ID + ":" + CLIENT_SECRET)
            }
        });
        console.log(response.data);
        setSpotifyToken(response.data.access_token);
        localStorage.setItem("token", response.data.access_token);
    }


    async function getArtist(userInput : string) { 

        try {
        const response = await spotifyRequest.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + userInput);
        console.log(response.data);
         var artiste =  new Artist(response.data.artists.items[0].id, response.data.artists.items[0].name, response.data.artists.items[0].images[0].url);
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


async function getSongs(albumId : string){

  const response = await spotifyRequest.get("https://api.spotify.com/v1/albums/" + albumId);
  console.log(response.data);
  let songs : Chanson[] = [];
  for(let i = 0; i < response.data.tracks.items.length; i++){
    songs.push(new Chanson(response.data.tracks.items[i].id,response.data.tracks.items[i].name, response.data.tracks.items[i].duration_ms));
    console.log(response.data.tracks.items[i].id);
    console.log(response.data.tracks.items[i].name);
    console.log(response.data.tracks.items[i].duration_ms);
    // response.data.tracks.items[i].name
  }
  return songs;
}


async function searchYoutube( artistName : string, songName : string) {
    const YT_URL = "https://www.youtube.com/embed/";
    // const apiKey = "AIzaSyCxxpwgifKLBZKELWmXAYQQ7ungz6JVGkQ";
    const urlRequete = `https://www.googleapis.com/youtube/v3/search?type=video&part=id&maxResults=1&key=${apiKey}&q=${artistName} ${songName}`;
    let response = await axios.get(urlRequete);
    console.log(response.data);
    console.log(response.data.items?.[0]?.id.videoId);
    setCurrentVideo(response.data.items?.[0]?.id.videoId);
}



async function getShows(artistName : string) {
    
    const url : string = `https://rest.bandsintown.com/artists/${artistName}/events?app_id=${bandsInTownApiKey}`;
    let response = await axios.get(url);
    console.log(response.data);
    //utilise ceci pour changer en number parseFloat(monString), pour les coordonnees.
    let listConcert : Concert[] =  [];
    let listMarkers = [];
    let newList = response.data;
    for(let c of newList) {
        let longitude = parseFloat(c.venue.longitude);
        let latitude = parseFloat(c.venue.latitude);
        let coordonates = [longitude, latitude];
        let date = new Date(c.datetime);
        listConcert.push(new Concert(c.venue.country,c.venue.city,coordonates,date));
        listMarkers.push({lat: latitude, lng : longitude});
    }
    setMarkers(listMarkers);
    console.log(markers);
    setListConcert(listConcert);
}

// location =
// 'San Francisco, CA'
// longitude


    return {connect,addArtist,getArtist, getAlbums,getSongs,searchYoutube, getShows};

}



   