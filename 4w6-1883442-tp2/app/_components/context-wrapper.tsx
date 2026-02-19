"use client";

import React, { Children, createContext, useState } from "react";
import { Artiste } from "../_types/artiste";

export const CounterContext = createContext<any>(undefined);


const CLIENT_ID: string = "c464311afe434e189dd3e41a01c779cb";
const CLIENT_SECRET: string = "c5b0c246a84f496d983b34893da31fce";


export function ContextWrapper( {children } : {children : React.ReactNode} ) {

const CLIENT_ID: string = "c464311afe434e189dd3e41a01c779cb";
const CLIENT_SECRET: string = "c5b0c246a84f496d983b34893da31fce";

const [listFavoris, setListFavoris] = useState<Artiste>();

return (
    <CounterContext.Provider value={{listFavoris, setListFavoris, CLIENT_ID, CLIENT_SECRET}}>
        {children}
    </CounterContext.Provider>
)

}


