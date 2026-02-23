"use client";

import { useContext, useEffect, useState } from "react";
import UseSpotifyCall from "../_hooks/use-spotify-call";
import ChansonCard from "../_components/chanson-card";
import { CounterContext } from "../_components/context-wrapper";
import { Chanson } from "../_types/chanson";

export default function Song() {
const useSpotifyHook = UseSpotifyCall();
const[songList, setSongList] = useState<Chanson[]>();
const {currentAlbum,setCurrentAlbum} = useContext(CounterContext);

useEffect( () => {
placeSongs(currentAlbum.id);
},[]);

    async function placeSongs(albumId : string) {
    let listChansons : Chanson[] = await useSpotifyHook.getSongs(albumId);
    setSongList(listChansons);
}

return(
    	<main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Chansons de {currentAlbum.name}</h2>
		<div className="flex m-2 flex-wrap">
			{songList?.map(
                (i) => <ChansonCard key={i.id} id={i.id} name={i.name} lenght={i.lenght} />
            )}
		</div>
		<div className="flex justify-center">
			<img src="images/video.png" alt="Vidéo youtube" />
		</div>
	</main>
)

}