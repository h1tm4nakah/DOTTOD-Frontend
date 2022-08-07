import React, {useEffect, useState} from "react";
import {Participant, Piece} from "../../services/exhibiion.service";
import {fetchPiecesToTranslate, ParticipantAdmin, PieceAdmin, postPiecesToTranslate} from "../../services/auth.service";
import {Loading} from "../loading.component";
import {formatTweetDate} from "./generatetweets.component";

export function TranslateTwitterPage() {
    const [loading, setloading] = useState(false);
    const [loadTranslated, setLoadTranslated] = useState(false);
    const [participants, setParticipants] = useState<ParticipantAdmin[]>([]);

    useEffect(() => {
        setloading(true);
        fetchPiecesToTranslate(loadTranslated).then(res => {
            setParticipants(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        })
    }, [loadTranslated])

    if (loading) return <Loading />

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <div className="form-check form-switch">
                    <input className="form-check-input"
                           type="checkbox" role="switch"
                           checked={loadTranslated}
                           onChange={(e) => setLoadTranslated(e.target.checked)} />
                        <label className="form-check-label">Load translated tweets</label>
                </div>
                {(participants.length === 0) && <h5>There are no tweets that need translation</h5>}
            </div>
            {
                participants.map((p: ParticipantAdmin) => {
                    return (
                        <div key={p.username} className="col-12 col-md-6 col-lg-3 mb-3">
                            <h3 className="mb-0"><a className="text-decoration-none" href={p.profile_url}>{p.username}</a></h3>
                            <p><small>{p.affiliated_party}</small></p>
                            <div className="list-group">
                                {
                                    p.pieces.map((piece: PieceAdmin) => {
                                        return <TranslatePieceComponent key={piece.tweet_id} in_piece={piece} />
                                    })
                                }
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

function TranslatePieceComponent({in_piece}: {in_piece: PieceAdmin}) {
    const [loading, setloading] = useState(false);
    const [piece, setPiece] = useState<PieceAdmin>(in_piece);
    const [updateSuccess, setUpdateSuccess] = useState(false);

    function handleTranslate() {
        const is_saving = piece.input_translated !== null;
        setloading(true);
        postPiecesToTranslate(piece.tweet_id, piece.input_translated).then(res => {
            setPiece({...piece, input_translated: res.data.input_translated});
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
            if (is_saving) {
                setUpdateSuccess(true);
                setTimeout(() => {
                    // After 3 seconds set the show value to false
                    setUpdateSuccess(false);
                }, 3000);
            }
        })
    }

    function handleTextChange(e: any) {
        setPiece({...piece, input_translated: e.target.value});
    }

    return (
        <div className={"list-group-item list-group-item-action"}>
            {
                (piece.input_translated === null) ? (
                    <button className="btn btn-sm btn-dark btn-top-right" onClick={handleTranslate}>
                        {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} translate
                    </button>
                ) : (
                    <>
                        <button className="btn btn-sm btn-dark btn-top-right" onClick={handleTranslate}>
                            {
                                updateSuccess && (
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                         className="bi bi-check2-all" viewBox="0 0 16 16">
                                        <path
                                            d="M12.354 4.354a.5.5 0 0 0-.708-.708L5 10.293 1.854 7.146a.5.5 0 1 0-.708.708l3.5 3.5a.5.5 0 0 0 .708 0l7-7zm-4.208 7-.896-.897.707-.707.543.543 6.646-6.647a.5.5 0 0 1 .708.708l-7 7a.5.5 0 0 1-.708 0z"/>
                                        <path d="m5.354 7.146.896.897-.707.707-.897-.896a.5.5 0 1 1 .708-.708z"/>
                                    </svg>
                                )
                            }
                            {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} save
                        </button>
                    </>
                )
            }
            <p className="piece-description">
                <small>
                    <b>tweeted at:</b><br />
                    {formatTweetDate(piece.tweeted_at)}
                </small>
            </p>
            <p className="piece-description">
                <small>
                    <b>original input:</b><br />
                    {piece.input_original}
                </small>
            </p>
            {
                (piece.input_translated !== null) && (
                    <p className="piece-description">
                        <small>
                            <b>translated input:</b><br />
                            <textarea rows={5} name="tweet" maxLength={2000}
                                      className="form-control text-area-small" placeholder="translated tweet input"
                                      value={piece.input_translated} onChange={handleTextChange}/>
                        </small>
                    </p>
                )
            }
            <div className="d-flex w-100 justify-content-between mt-1">
                <small><b>likes:</b> {piece.tweet_like_count}</small>
                <small><b> replies:</b> {piece.tweet_reply_count}</small>
                <small><b> re-tweets:</b> {piece.tweet_retweet_count}</small>
                <small><b>tweet no. </b>
                    <a className="text-decoration-none" target="_blank" rel="noreferrer"
                       href={"https://twitter.com/EnricoLetta/status/" + piece.tweet_id}>{piece.tweet_id}</a></small>
            </div>
        </div>
    )
}