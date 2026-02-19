"use client"

import { useState } from "react"


export default function Album() {
const [useInput, setUserInput] = useState<string>();
const [nomArtiste, setNomArtiste] = useState<string>();
const [nomAlbum, setNomAlbum] = useState<string>();
const [listeChanson, setListeChanson] = useState<string []>();


return(
    <main className="w-5xl mx-auto mt-4">
		<h2 className="text-center text-2xl py-1">Albums de NOM_ARTISTE</h2>
		<div className="flex text-center m-3 flex-wrap">
			<div className="basis-1/4">
				<div className="m-1 text-center p-1 artist">
					<h4>NOM_ALBUM</h4>
					<img src="images/disc.png" alt="NOM_ALBUM" />
					<a><button className="lightButton mt-1">Chansons</button></a>
				</div>
			</div>
		</div>
	</main>
)

}