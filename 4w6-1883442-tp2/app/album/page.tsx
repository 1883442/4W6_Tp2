"use client";

import { useContext, useEffect, useState } from "react"
import AlbumCard from "../_components/album-card";
import { CounterContext } from "../_components/context-wrapper";
import { spotifyRequest } from "../spotify-interceptor";
import { Album } from "../_types/album";




export default function Album(props : {artistId : string}) {
const {CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken ,listFavoris, setListFavoris,currentArtist, setCurrentArtist} = useContext(CounterContext);
const [listAlbums, setListAlbums] = useState<Album[]>();

useEffect(() => {
	async function getAlbums(artistId : string){
    const response = await spotifyRequest.get("https://api.spotify.com/v1/artists/" + artistId + "/albums?include_groups=album,single");
    console.log(response.data);
	setListAlbums(response.data);
}
},[]);

return(

	  <main className="w-5xl mx-auto mt-4">
		<h2 className="text-center text-2xl py-1">Albums de {currentArtist}</h2>
		<div className="flex text-center m-3 flex-wrap">
		<AlbumCard albumName={"YOLO"} artistName={"LMFAO"}/>
		</div>
	</main>
)
}