"use client";

import { useTranslations } from "next-intl";
import { Concert } from "../_types/concert";

export default function ConcertCart(concert : Concert) {
	const t = useTranslations('Concert');
    return(
        <div className="basis-1/4">
				<div className="m-1 p-1 artist">
					{/* concert.date.toUTCString() */}
					<h4>{ t('ConcertDate', {dateVar : concert.date})}</h4>
					<div>{concert.country}</div>
					<div>{concert.city}</div>
				</div>
			</div>
    )
}