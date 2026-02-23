"use client";

import { useContext, useEffect } from "react";
import { Chanson } from "../_types/chanson";
import { CounterContext } from "./context-wrapper";
import UseSpotifyCall from "../_hooks/use-spotify-call";

export default function ChansonCard(songName : Chanson) {

    const {currentAlbum,currentArtist} = useContext(CounterContext);
    const useSpotifyHook = UseSpotifyCall();

    useEffect(() => {

    },[]);


    function getVideo() {
        useSpotifyHook.searchYoutube(currentArtist.name, songName.name);
    }


    return(
        <div className="basis-1/5">
				<div className="m-1 text-center p-1 artist">
					<h4>{songName.name}</h4>
                    <h4>{songName.lenght}</h4>
					<a><button onClick={getVideo} className="lightButton form-control mt-1">Écouter</button></a>
				</div>
			</div>
    )

}