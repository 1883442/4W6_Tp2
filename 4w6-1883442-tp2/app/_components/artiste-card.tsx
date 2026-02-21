"use client";

import { useContext } from "react";
import { Album } from "../_types/album";
import { Concert } from "../_types/concert";
import { CounterContext } from "./context-wrapper";
import { useRouter } from "next/navigation";
import { Artist } from "../_types/artiste";




export function ArtistCard(props : { artist : Artist}) {
const {setCurrentArtist} = useContext(CounterContext);
    const router = useRouter();

    function goToAlbum() {
        setCurrentArtist(props)
        router.push(`/album`)
    }

    return (
                <div className="flex flex-wrap mt-2">
					<div className="basis-1/3">
						<div className="m-1 p-1 artist">
							<h4>{props.artist.name}</h4>
							<img src={props.artist.imageUrl} alt="#{props.artistName}" />
							<a><button className="lightButton mt-1 mr-1">Concerts</button></a>
							<a><button onClick={() => goToAlbum()} className="lightButton mt-1">Albums</button></a>
						</div>
					</div>
				</div>
    );
}

