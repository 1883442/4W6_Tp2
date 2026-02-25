"use client";

import { useContext, useEffect } from "react";
import { CounterContext } from "../_components/context-wrapper";
import ConcertCart from "../_components/concert-card";
import UseSpotifyCall from "../_hooks/use-spotify-call";

export default function Concert() {
const {currentArtist, setCurrentArtist,listConcert,setListConcert} = useContext(CounterContext);
const useSpotifyHook = UseSpotifyCall();

useEffect(() => {
	if(currentArtist != undefined) {
		useSpotifyHook.getShows(currentArtist.name);
	}
	
},[])

    return(
	<main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Concerts de ${currentArtist.name}</h2>
		<div className="mx-auto w-2xl artist">
			<img src="images/carte.png" alt="Carte" />
		</div>
		<div className="flex m-3 flex-wrap">
			{/* {listConcert?.map(
                (i: { country: string; city: string; coordonates: number[]; date: Date; }) => <ConcertCart country={i.country} city={i.city} coordonates={[i.coordonates[0], i.coordonates[1]]} date={i.date}/>
            )} */}
		</div>
	</main>

    )
}