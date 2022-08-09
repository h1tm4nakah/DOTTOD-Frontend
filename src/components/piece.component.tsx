import * as React from 'react';
import {Piece} from "../services/exhibiion.service";
import {useEffect, useState} from "react";
import placeholder from "../assets/images/placeholder.jpg"
import {Link} from "react-router-dom";
import {useTranslation} from "react-i18next";


// @ts-ignore
export function PieceComponent({in_piece}: {in_piece: Piece}) {
    const [piece, setPiece] = useState<Piece>(in_piece)
    const [flipped, setFliped] = useState(false)
    const { t } = useTranslation();

    useEffect(() => {
        setPiece(in_piece)
    }, [in_piece])

    return (
        <div className="col-xl-2 col-lg-3 col-sm-6 col-12" style={{verticalAlign: "top"}}>
            <div onMouseLeave={() => setFliped(false)}>
                <div className={(flipped ? "d-none" : "d-block")}>
                    {
                        piece.artifact_url_1 === null ? (<img alt="placeholder" className="img-fluid" src={placeholder} onMouseEnter={() => setFliped(true)}/>) :
                            (
                                <img alt={piece.input_translated} className="img-fluid" src={piece.artifact_url_1} onMouseEnter={() => setFliped(true)}/>
                            )
                    }
                    <div className="d-flex justify-content-between">
                        <p><small>{date2Human(piece.tweeted_at)}</small></p>
                        <a href={"https://twitter.com/twitter/status/" + piece.tweet_id} target="_blank" rel="noreferrer">
                            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" fill="#000000"
                                 className="bi bi-twitter" viewBox="0 0 16 16">
                                <path
                                    d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                            </svg>
                        </a>
                    </div>
                </div>
                <div className={flipped ? "d-block" : "d-none"}>
                    <p className="piece-description"><small><b>{t('ORIGINAL_TEXT')}:</b><br />{piece.input_original}</small></p>
                    <p className="piece-description"><small><b>{t('TRANSLATED_TEXT')}:</b><br />{piece.input_translated}</small></p>
                    <Link to={"/piece/" + piece.tweet_id} className="mt-4 btn btn-sm btn-dark">{t('BTN_SHOW')}</Link>
                </div>
            </div>
        </div>
    );
}

export const date2Human = (input_date: string) => {
    // 2022-08-03 22:56:13
    const [full_date, full_time] = input_date.split(" ");
    const [year, month, day] = full_date.split("-");
    return day + "/" + month + "/" + year + " " + full_time;
}