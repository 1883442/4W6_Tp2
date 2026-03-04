"use client";

import ChansonCard from "@/app/_components/chanson-card";
import { CounterContext } from "@/app/_components/context-wrapper";
import UseSpotifyCall from "@/app/_hooks/use-spotify-call";
import { Chanson } from "@/app/_types/chanson";
import { useTranslations } from "next-intl";
import { useContext, useEffect, useState } from "react";

export default function Song() {
const useSpotifyHook = UseSpotifyCall();
const[songList, setSongList] = useState<Chanson[]>();
const {currentAlbum,setCurrentAlbum,currentVideo,setCurrentVideo} = useContext(CounterContext);
const YT_URL = "https://www.youtube.com/embed/";
const t = useTranslations('Song');

useEffect( () => {
placeSongs(currentAlbum.id);
},[]);

    async function placeSongs(albumId : string) {
    let listChansons : Chanson[] = await useSpotifyHook.getSongs(albumId);
    setSongList(listChansons);
}



return(
    	<main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">{t('SongOf')} {currentAlbum.name}</h2>
		<div className="flex m-2 flex-wrap">
			{songList?.map(
                (i) => <ChansonCard key={i.id} id={i.id} name={i.name} lenght={i.lenght}/>
            )}
		</div>
		<div className="flex justify-center">
			{/* <img src="images/video.png" alt="Vidéo youtube" /> */}
			{currentVideo && (
			<iframe width="560" height="315" src={YT_URL + currentVideo} title="YouTube video player" 
      		allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
      		referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
			)

			}
			
		</div>
	</main>
)

}