"use client";

import { Key, useContext, useEffect } from "react";
import { CounterContext } from "../_components/context-wrapper";
import ConcertCart from "../_components/concert-card";
import UseSpotifyCall from "../_hooks/use-spotify-call";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

export default function Concert() {
const {currentArtist, setCurrentArtist,listConcert,setListConcert,markers, setMarkers} = useContext(CounterContext);
const useSpotifyHook = UseSpotifyCall();

useEffect(() => {
	if(currentArtist != undefined) {
		useSpotifyHook.getShows(currentArtist.name);
	}
	
},[])

  const center = { lat: -4, lng: -40 };
  const zoom = 4;
	

  const { isLoaded } = useJsApiLoader({
    id : "google-map-script",
    googleMapsApiKey : "AIzaSyCxxpwgifKLBZKELWmXAYQQ7ungz6JVGkQ"
  });



    return(
	<main className="w-5xl mx-auto my-4">
		<h2 className="text-center text-2xl py-1">Concerts de {currentArtist.name}</h2>
		<div className="mx-auto w-2xl artist">

		{ isLoaded && 
	<GoogleMap 
  		center={center} 
  		zoom={zoom} 
  		mapContainerStyle={{ width: "650px", height : "400px" }}
		>
			{markers?.map((m: { lat: any; lng: any; }, index: Key | null | undefined) => 
    <Marker key={index} position={{lat:m.lat,lng:m.lng}}></Marker>
  )}
	</GoogleMap>}
			{/* <img src="images/carte.png" alt="Carte" /> */}
		</div>
		<div className="flex m-3 flex-wrap">
			{listConcert?.map(
                (i: { country: string; city: string; coordonates: number[]; date: Date; }) => <ConcertCart country={i.country} city={i.city} coordonates={[i.coordonates[0], i.coordonates[1]]} date={i.date}/>
            )}
		</div>

		{/* { isLoaded && 
	<GoogleMap 
  		center={center} 
  		zoom={zoom} 
  		mapContainerStyle={{ width: "700px", height : "400px" }}
		>
			{markers?.map((m: { lat: any; lng: any; }, index: Key | null | undefined) => 
    <Marker key={index} position={{lat:m.lat,lng:m.lng}}></Marker>
  )}
	</GoogleMap>} */}
	
	</main>

    )
}