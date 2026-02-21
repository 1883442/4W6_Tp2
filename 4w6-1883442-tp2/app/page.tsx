"use client";
import Image from "next/image";
import { Key, useContext, useState } from "react";
import { Artist } from "./_types/artiste";
import { CounterContext } from "./_components/context-wrapper";
import axios from "axios";
import { ArtistCard } from "./_components/artiste-card";
import { spotifyRequest } from "./spotify-interceptor";

export default function Home() {

	const [userInput, setUserInput] = useState<string>("");
	const {CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken ,listFavoris, setListFavoris,currentArtist, setCurrentArtist} = useContext(CounterContext);

	function emptyFavoris() {
		let emptyList : Artist[] = [];
		setListFavoris(emptyList);
		localStorage.clear;
	}


	function addArtist(newArtist : Artist) {
		let oldArtistList : any[] = [];
		for(let a  in listFavoris) {
			// oldArtistList.push(new Artist(a.name,a.id,a.imgUrl));
			oldArtistList.push(a);
		}
		oldArtistList.push(newArtist);
		setListFavoris(oldArtistList);
		localStorage.setItem("favorisListe", listFavoris);
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


	async function getArtist() { 

		try {
	  	const response = await spotifyRequest.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + userInput);
	    console.log(response.data);
	  	 var artiste =  new Artist(response.data.artists.items[0].id, response.data.artists.items[0].name, response.data.artists.items[0].images[0].url);
		 addArtist(artiste);
	 	 console.log(listFavoris);
		}
		catch(e) {
			console.log(e);
		}
	}

  return (
       <main className="w-5xl mx-auto my-4">
		<div className="flex">
			<div className="flex-1 p-3">
				<h3 className="text-xl font-bold">Ajouter un artiste</h3>
				<input onClick={() => connect()} type="submit" value="Connect" className="lightButton" />
				<input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} name="artist" placeholder="Nana Mouskouri" className="lightInput my-2" />
				<input onClick={() => getArtist()} type="submit" value="Rechercher" className="lightButton" />
			</div>
			<div className="flex-3 p-3 text-center">
				<h2 className="text-2xl font-bold">Vos artistes</h2>
				<div className="flex flex-wrap mt-2">
					{/* Mettre ? avant map afin de verifier si il existe, il est capricieux et throw une erreure sinon. */}
					{listFavoris?.map(
						(i: { id: Key | null | undefined; name: string; imgUrl: string; }) => <ArtistCard key={i.id} artistName={i.name}  imgUrl={i.imgUrl}/>
					)}
				</div>
				<div className="flex justify-center mt-2">
					<button onClick={emptyFavoris} className="lightButton">Vider les favoris</button>
				</div>
			</div>
		</div>
	</main>
  );
}
