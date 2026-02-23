"use client";

import React, { Children, createContext, useState } from "react";
import { Artist } from "../_types/artiste";
import { Album } from "../_types/album";

//error part d'ici, cela marque tout mes type d'objet dans le context comme any.
//Ca devient chiant a maintenir faire plus de context different pour chaque utilite, ca ne respect pas le SINGLE de solid.
export const CounterContext = createContext<any>(undefined);





export function ContextWrapper( {children } : {children : React.ReactNode} ) {

const CLIENT_ID: string = "88dc980a86e1400bb4add6cd0c70fa00";
const CLIENT_SECRET: string = "1dc36c6949ae4b74a648689f804838f3";
const [spotifyToken, setSpotifyToken] = useState<string>("");
const [currentArtist, setCurrentArtist] = useState<Artist>()
const [currentVideo, setCurrentVideo] = useState<any | undefined>();
const [listFavoris, setListFavoris] = useState<Artist[]>([]);
const [currentAlbum,setCurrentAlbum] = useState<Album | null>(null);

return (
    <CounterContext.Provider value={{listFavoris, setListFavoris, CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken , currentArtist, setCurrentArtist, currentVideo, setCurrentVideo, currentAlbum,setCurrentAlbum}}>
        {children}
    </CounterContext.Provider>
)

}


