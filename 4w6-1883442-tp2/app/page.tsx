"use client";
import Image from "next/image";
import { Key, useContext, useEffect, useState } from "react";
import { Artist } from "./_types/artiste";
import { CounterContext } from "./_components/context-wrapper";
import axios from "axios";
import { ArtistCard } from "./_components/artiste-card";
import { spotifyRequest } from "./spotify-interceptor";
import { SpotifyContext } from "./_components/context-spotify";
import UseSpotifyCall from "./_hooks/use-spotify-call";
import { CurrentArtistContext } from "./_components/context-currentArtist";

export default function Home() {

	const [userInput, setUserInput] = useState<string>("");
	// const {listFavoris, setListFavoris} = useContext(CounterContext);
	const spotifyContext = useContext(SpotifyContext);
	const useSpotifyHook = UseSpotifyCall();
	const useArtistContext = useContext(CurrentArtistContext);
	const [listArtiste, setListeArtist] = useState<Artist[]>()



	 useEffect(() => {
    const jsonArtist : string | null = localStorage.getItem("favorisListe");

    // Si pas vide, on récupère l'info
    if(jsonArtist != null){
      setListeArtist(JSON.parse(jsonArtist));
    }


  },[]);


  function ajusterTab(inputArtist : Artist) {
	let vieuxTab : Artist[] = [];
	for(let a of listArtiste!) {
		vieuxTab.push(new Artist(a.id,a.name,a.imageUrl));
	}
	vieuxTab.push(new Artist(inputArtist.id,inputArtist.name,inputArtist.imageUrl));
	setListeArtist(vieuxTab);
	localStorage.setItem("favorisListe", JSON.stringify(vieuxTab));
  }

	function emptyFavoris() {
		let emptyList : Artist[] = [];
		// if(useArtistContext?.setListFavoris != null)useArtistContext?.setListFavoris(emptyList);
		setListeArtist(emptyList);
		localStorage.clear;
	}


	async function ajouterAuFavoris(artisteRechercher : string) {
		var response = await useSpotifyHook.getArtist(artisteRechercher);
		ajusterTab(response!);
	}


  return (
       <main className="w-5xl mx-auto my-4">
		<div className="flex">
			<div className="flex-1 p-3">
				<h3 className="text-xl font-bold">Ajouter un artiste</h3>
				<input onClick={() => useSpotifyHook.connect()} type="submit" value="Connect" className="lightButton" />
				<input type="text" value={userInput} onChange={(e) => setUserInput(e.target.value)} name="artist" placeholder="Nana Mouskouri" className="lightInput my-2" />
				<input onClick={() => ajouterAuFavoris(userInput)} type="submit" value="Rechercher" className="lightButton" />
			</div>
			<div className="flex-3 p-3 text-center">
				<h2 className="text-2xl font-bold">Vos artistes</h2>
				<div className="flex flex-wrap mt-2">
					{/* Mettre ? avant map afin de verifier si il existe, il est capricieux et throw une erreure sinon. */}
					{listArtiste?.map(
						(i: Artist) => <ArtistCard key={i.id} artist={i}/>
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
