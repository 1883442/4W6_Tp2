"use client";

import React, { Children, createContext, useState } from "react";
import { Artist } from "../_types/artiste";

// type SpotifyContextType = {
//     CLIENT_ID : string,
//     CLIENT_SECRET : string,
//     spotifyToken : string,
//     setSpotifyToken : React.Dispatch<React.SetStateAction<string>>,
//     listFavoris : Artist[],
//     setListFavoris : React.Dispatch<React.SetStateAction<Artist | undefined>>
// };

export const CounterContext = createContext<any>(undefined);





export function ContextWrapper( {children } : {children : React.ReactNode} ) {

const CLIENT_ID: string = "88dc980a86e1400bb4add6cd0c70fa00";
const CLIENT_SECRET: string = "1dc36c6949ae4b74a648689f804838f3";
const [spotifyToken, setSpotifyToken] = useState<string>("");



return (
    <CounterContext.Provider value={{ CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken }}>
        {children}
    </CounterContext.Provider>
)

}


