"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Artist } from "../_types/artiste";

// type ArtistContextType = {
//     currentArtist : Artist,
//     setCurrentArtist :Dispatch<SetStateAction<Artist>>
// };

export const CurrentArtistContext = createContext<any | undefined>(undefined);





export function ContextArtistWrapper( {children } : {children : React.ReactNode} ) {

// const artistTest = new Artist("1960","Drake", "Toronto");
const [currentArtist, setCurrentArtist] = useState<Artist | null>(null);


return (
    <CurrentArtistContext.Provider value={{currentArtist, setCurrentArtist}}>
        {children}
    </CurrentArtistContext.Provider>
)

}