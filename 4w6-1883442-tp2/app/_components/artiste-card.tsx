"use client";

import { useContext } from "react";
import { Album } from "../_types/album";
import { Concert } from "../_types/concert";
import { CounterContext } from "./context-wrapper";
import { useRouter } from "next/navigation";
import { Artist } from "../_types/artiste";
import { CurrentArtistContext } from "./context-currentArtist";
import { useTranslations } from "next-intl";




export function ArtistCard(props : { artist : Artist}) {
const {currentArtist,setCurrentArtist} = useContext(CounterContext);
    const router = useRouter();

    function goToAlbum(page : string) {
		console.log(props);
        setCurrentArtist(props.artist);
        router.push(`/${page}`);
    }

    return (
                
						<div className="m-1 p-1 artist">
							<h4>{props.artist.name}</h4>
							<img src={props.artist.imageUrl} alt={`${props.artist.name}`}/>
							<a><button onClick={() => goToAlbum("concert")} className="lightButton mt-1 mr-1">Concerts</button></a>
							<a><button onClick={() => goToAlbum("album")} className="lightButton mt-1">Albums</button></a>
						</div>
				
    );
}

