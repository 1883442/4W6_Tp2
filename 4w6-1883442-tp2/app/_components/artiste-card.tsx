"use client";

import { useContext } from "react";
import { Album } from "../_types/album";
import { Concert } from "../_types/concert";
import { CounterContext } from "./context-wrapper";
import { useRouter } from "next/navigation";




export function ArtistCard(props : { artistName : string, imgUrl : string}) {
const {CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken ,listFavoris, setListFavoris,currentArtist, setCurrentArtist} = useContext(CounterContext);
    const router = useRouter();

    function goToAlbum() {
        setCurrentArtist(props.artistName)
        router.push(`/album`)
    }

    return (
                <div className="flex flex-wrap mt-2">
					<div className="basis-1/3">
						<div className="m-1 p-1 artist">
							<h4>{props.artistName}</h4>
							<img src={props.imgUrl} alt="#{props.artistName}" />
							<a><button className="lightButton mt-1 mr-1">Concerts</button></a>
							<a><button onClick={() => goToAlbum()} className="lightButton mt-1">Albums</button></a>
						</div>
					</div>
				</div>
    );
}

