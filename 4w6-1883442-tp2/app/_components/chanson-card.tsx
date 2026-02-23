"use client";

import { useEffect } from "react";
import { Chanson } from "../_types/chanson";

export default function ChansonCard(songName : Chanson) {

    useEffect(() => {

    },[]);



    return(
        <div className="basis-1/5">
				<div className="m-1 text-center p-1 artist">
					<h4>{songName.name}</h4>
                    <h4>{songName.lenght}</h4>
					<a><button  className="lightButton form-control mt-1">Écouter</button></a>
				</div>
			</div>
    )

}