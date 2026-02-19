"use client";
import Image from "next/image";
import { useContext, useState } from "react";
import { Artist } from "./_types/artiste";
import { CounterContext } from "./_components/context-wrapper";
import axios from "axios";

export default function Home() {

	const [listArtiste, setListArtiste] = useState<Artist[] | undefined>();
	const [userInput, setUserInput] = useState<string>("");
	const {CLIENT_ID, CLIENT_SECRET} = useContext(CounterContext);
	const [spotifyToken, setSpotifyToken] = useState<string>("");



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

    }


async function getArtist(artistName : string){
debugger;
  const response = await axios.get('https://api.spotify.com/v1/search?type=artist&offset=0&limit=1&q=' + artistName, {
    headers : {
      "Content-Type" : "application/x-www-form-urlencoded",
      "Authorization" : "Bearer " + spotifyToken
    }
  });
  console.log(response.data);

  var listArtiste =  new Artist(response.data.artists.items[0].id, response.data.artists.items[0].name, response.data.artists.items[0].images[0].url);

}

  return (
       <main className="w-5xl mx-auto my-4">
		<div className="flex">
			<div className="flex-1 p-3">
				<h3 className="text-xl font-bold">Ajouter un artiste</h3>
				<input type="text" name="artist" placeholder="Nana Mouskouri" className="lightInput my-2" />
				<input onClick={() => getArtist(userInput)} type="submit" value="Rechercher" className="lightButton" />
			</div>
			<div className="flex-3 p-3 text-center">
				<h2 className="text-2xl font-bold">Vos artistes</h2>
				<div className="flex flex-wrap mt-2">
					<div className="basis-1/3">
						<div className="m-1 p-1 artist">
							<h4>NOM DE L'ARTISTE</h4>
							<img src="images/bust.png" alt="NOM DE L'ARTISTE" />
							<a><button className="lightButton mt-1 mr-1">Concerts</button></a>
							<a><button className="lightButton mt-1">Albums</button></a>
						</div>
					</div>
				</div>
				<div className="flex justify-center mt-2">
					<button className="lightButton">Vider les favoris</button>
				</div>
			</div>
		</div>
	</main>


  );
}
