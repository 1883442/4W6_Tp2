"use client";

import { useContext } from "react";
import { CounterContext } from "./context-wrapper";

export default function AlbumCard(props : {albumName : string, artistName : string}) {
    return(
        <div className="basis-1/4">
				<div className="m-1 text-center p-1 artist">
					<h4>{props.albumName}</h4>
					<img src="images/disc.png" alt="NOM_ALBUM" />
					<a><button className="lightButton mt-1">Chansons</button></a>
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