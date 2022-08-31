import React, {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {fetchPiece, Piece} from "../services/exhibiion.service";
import {Loading} from "../components/loading.component";
import {useTranslation} from "react-i18next";
import placeholder from "../assets/images/placeholder.jpg";
import {ZoomableImage} from "../components/ZoomableImage.component";


export function PiecePage() {
    const [loading, setloading] = useState(false);
    const [piece, setPiece] = useState<Piece>({} as Piece);
    const { tweet_id = "" } = useParams<string>();
    const { t } = useTranslation();

    useEffect(() => {
        setloading(true);
        fetchPiece(tweet_id).then(res => {
            setPiece(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            document.title = "DOTTOD gallery - " + (tweet_id);
            setloading(false);
        });
    }, [tweet_id]);

    if (loading) return <Loading/>

    return (
        <>
        <div className="container">
            <div className="row mt-5">
                <div className="col-12">
                    <Link to={"/participant/" + piece.participant?.username} className="text-decoration-none" style={{color: "black"}}>
                        <h3 className="mb-0">{piece.participant?.username}</h3>
                        <p className="mb-2">{piece.participant?.affiliated_party}</p>
                    </Link>
                </div>
                <div className="col-12 col-md-5">
                    <div className="piece-image">
                        {
                            piece.artifact_url_1 === null ? (<img alt="placeholder" className="img-fluid" src={placeholder} />) :
                                (
                                    <ZoomableImage alt={piece.input_translated} src={(piece.artifact_url_1) + "/-/format/jpeg/"} />
                                )
                        }
                    </div>
                    <p>{piece.tweeted_at}</p>
                </div>
                <div className="col-12 col-md-7">
                    <h5><b>{t('ORIGINAL_TEXT')}:</b></h5>
                    <p>{piece.input_original}</p>
                    <h5><b>{t('TRANSLATED_TEXT')}:</b></h5>
                    <p>{piece.input_translated}</p>
                    <h5><b>{t('LINK_TO_ORIG_TWEET')}:</b></h5>
                    <p>
                        <a className="text-decoration-none" href={"https://twitter.com/twitter/status/" + piece.tweet_id} target="_blank" rel="noreferrer">
                            {piece.tweet_id}
                        </a>
                    </p>
                    <h5><b>{t('LINK_TO_TWEET_RESP')}:</b></h5>
                    <p>
                        <a className="text-decoration-none" href={"https://twitter.com/twitter/status/" + piece.tweet_response_id} target="_blank" rel="noreferrer">
                            {piece.tweet_response_id}
                        </a>
                    </p>
                </div>
            </div>
        </div>
        </>
    )

}