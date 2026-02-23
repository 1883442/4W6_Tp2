"use client";

import { useContext, useEffect } from "react";
import { CounterContext } from "./context-wrapper";
import { Album } from "../_types/album";

export default function AlbumCard(props : {album : Album}) {


	

    return(
        <div className="basis-1/4">
				<div className="m-1 text-center p-1 artist">
					<div className="basis-1/3">
					<h4>{props.album.name}</h4>
					<img src={props.album.image}  alt="NOM_ALBUM" />
					<a><button className="lightButton mt-1">Chansons</button></a>
				</div>
				</div>
			</div>
)
}

{/* <div className="basis-1/4">
				<div className="m-1 text-center p-1 artist">
					<h4>{props.albumName}</h4>
					<img src="images/disc.png" alt="NOM_ALBUM" />
					<a><button className="lightButton mt-1">Chansons</button></a>
				</div>
			</div> */}