"use client";

import React, { Children, createContext, useContext, useState } from "react";
import { Artist } from "../_types/artiste";

//error part d'ici, cela marque tout mes type d'objet dans le context comme any.
//Ca devient chiant a maintenir faire plus de context different pour chaque utilite, ca ne respect pas le SINGLE de solid.
// export const SpotifyContext = createContext(null);
export type SpotifyContext = {
    CLIENT_ID : string,
    CLIENT_SECRET : string,
    spotifyToken : string,
    setSpotifyToken : React.Dispatch<React.SetStateAction<string>>
};

const context = createContext<SpotifyContext | undefined>(undefined);





export function ContextSpotify( {children } : {children : React.ReactNode} ) {

const CLIENT_ID: string = "88dc980a86e1400bb4add6cd0c70fa00";
const CLIENT_SECRET: string = "1dc36c6949ae4b74a648689f804838f3";
const [spotifyToken, setSpotifyToken] = useState<string>("");


return (
    <context.Provider value={{ CLIENT_ID, CLIENT_SECRET, spotifyToken, setSpotifyToken}}>
        {children}
    </context.Provider>
)

}