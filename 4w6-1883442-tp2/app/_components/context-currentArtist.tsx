"use client";

import { createContext, Dispatch, SetStateAction, useState } from "react";
import { Artist } from "../_types/artiste";

type ArtistContextType = {
    listFavoris : Artist[],
    setListFavoris : Dispatch<SetStateAction<Artist[]>>
};

let artistTest = new Artist("1960","renee", "levesque");
const tabTest : Artist[] = [artistTest];

export const CurrentArtistContext = createContext<ArtistContextType | undefined>(undefined);





export function ContextArtistWrapper( {children } : {children : React.ReactNode} ) {

const artistTest = new Artist("1960","renee", "levesque");
const [currentArtist, setCurrentArtist] = useState<Artist>(artistTest)

const tabTest : Artist[] = [artistTest];
const [listFavoris, setListFavoris] = useState<Artist[]>(tabTest);

return (
    <CurrentArtistContext.Provider value={{listFavoris, setListFavoris}}>
        {children}
    </CurrentArtistContext.Provider>
)

}