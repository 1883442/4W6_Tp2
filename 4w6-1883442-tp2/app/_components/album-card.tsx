"use client";

import { useContext, useEffect } from "react";
import { CounterContext } from "./context-wrapper";
import { Album } from "../_types/album";
import { useRouter } from "next/navigation";

export default function AlbumCard(props : {album : Album}) {
	const {currentAlbum,setCurrentAlbum} = useContext(CounterContext);
	
	 const router = useRouter();

	function goToAlbum() {
		setCurrentAlbum(props.album);
		router.push("/song");
	}

    return(
        <div className="basis-1/4">
				<div className="m-1 text-center p-1 artist">
					<div className="basis-1/3">
					<h4>{props.album.name}</h4>
					<img src={props.album.image}  alt="NOM_ALBUM" />
					<a><button onClick={() => goToAlbum()} className="lightButton mt-1">Chansons</button></a>
				</div>
				</div>
			</div>
)
}

