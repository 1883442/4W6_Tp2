"use client";

import { Concert } from "../_types/concert";

export default function ConcertCart(concert : Concert) {
    return(
        <div className="basis-1/4">
				<div className="m-1 p-1 artist">
					<h4>{concert.date.toUTCString()}</h4>
					<div>{concert.country}</div>
					<div>{concert.city}</div>
				</div>
			</div>
    )
}