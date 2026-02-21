"use client";

import React, { Children, createContext, useState } from "react";
import { Artist } from "../_types/artiste";

export const CounterContext = createContext<any>(undefined);





export function ContextWrapper( {children } : {children : React.ReactNode} ) {

const CLIENT_ID: string = "88dc980a86e1400bb4add6cd0c70fa00";
const CLIENT_SECRET: string = "1dc36c6949ae4b74a648689f804838f3";
const [spotifyToken, setSpotifyToken] = useState<string>("");
const [currentArtist, setCurrentArtist] = useState<Artist>()

const [listFavoris, setListFavoris] = useState<Artist[]>([]);

return (
    <CounterContext.Provider value={{listFavoris, setListFavoris, CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken , currentArtist, setCurrentArtist}}>
        {children}
    </CounterContext.Provider>
)

}


