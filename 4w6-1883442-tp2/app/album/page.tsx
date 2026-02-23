"use client";

import { useContext, useEffect, useState } from "react"
import AlbumCard from "../_components/album-card";
import { CounterContext } from "../_components/context-wrapper";
import { spotifyRequest } from "../spotify-interceptor";
import { Album } from "../_types/album";
import { Artist } from "../_types/artiste";
import UseSpotifyCall from "../_hooks/use-spotify-call";




export default function Album(props : {artistId : string}) {
const {CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken ,listFavoris, setListFavoris,currentArtist, setCurrentArtist} = useContext(CounterContext);
const [listAlbums, setListAlbums] = useState<Album[]>();
const useSpotifyHook = UseSpotifyCall();



 useEffect(() => {
	setUpAlbums();
  },[]);


// useEffect(() => {
// 	async function getAlbums(artistId : string){
//     const response = await spotifyRequest.get("https://api.spotify.com/v1/artists/" + artistId + "/albums?include_groups=album,single");
//     console.log(response.data);
// 	setListAlbums(response.data);
// }


// },[]);


async function setUpAlbums(){
	console.log(currentArtist);
	let artist : Artist = currentArtist;
	console.log(artist.id);
	var albums = await useSpotifyHook.getAlbums(artist.id);
	setListAlbums(albums);
}


return(
	  <main className="w-5xl mx-auto mt-4">
		<h2 className="text-center text-2xl py-1">Albums de {currentArtist.name}</h2>
		<div className="flex text-center m-3 flex-wrap">
			{listAlbums?.map(
				(i) => <AlbumCard key={i.id} album={i}/>
			)};
		</div>
	</main>
)
}


