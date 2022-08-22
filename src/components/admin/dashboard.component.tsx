import React, {useEffect, useState} from "react";
import {
    deleteDashboardPieces,
    fetchPiecesToGenerate, generateResponseDashboardPiece, getDashboardPieces, getGeneratedImages,
    ParticipantAdmin,
    PieceAdmin, postGeneratedImages,
} from "../../services/auth.service";
import {Loading} from "../loading.component";
import {formatTweetDate} from "./generatetweets.component";
import placeholder from "../../assets/images/placeholder.jpg";

export function DashboardAdminPage() {
    const [loading, setloading] = useState(false);
    const [participants, setParticipants] = useState<ParticipantAdmin[]>([]);

    useEffect(() => {
        setloading(true);
        getDashboardPieces().then(res => {
            setParticipants(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        });
    }, [])

    function handleDelete(piece: PieceAdmin) {
        // eslint-disable-next-line no-restricted-globals
        if (confirm("Do you really want to delete this piece?")) {
            setloading(true);
            deleteDashboardPieces(piece).then(res => {
                setParticipants(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setloading(false);
            });
        }
    }

    if (loading) return <Loading />

    return (
        <div className="row mb-5">
            {(participants.length === 0) && <h5>There are no tweets that need image generation</h5>}
            {
                participants.map((p: ParticipantAdmin) => {
                    return (
                        <div key={p.username} className="col-12 col-md-4 col-lg-3 col-xl-2 mb-3">
                            <h5 className="mb-0"><a className="text-decoration-none" href={p.profile_url}>{p.username}</a></h5>
                            <p><small>{p.affiliated_party}</small></p>
                            <div className="list-group">
                                {
                                    p.pieces.map((piece: PieceAdmin) => {
                                        return <AdminPieceComponent key={piece.tweet_id} in_piece={piece} handleDelete={handleDelete} />
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

function AdminPieceComponent({in_piece, handleDelete}: {in_piece: PieceAdmin, handleDelete: (piece: PieceAdmin) => void}) {
    const [piece, setPiece] = useState<PieceAdmin>(in_piece);
    const [loading, setLoading] = useState(false);

    function handleGenerateResponse() {
        if(piece.tweet_response_id) {
            window.open("https://twitter.com/twitter/status/" + piece.tweet_response_id, '_blank', 'noopener,noreferrer');
        } else {
            setLoading(true);
            generateResponseDashboardPiece(piece).then(res => {
                setPiece(res.data);
            }).catch(err => {
                console.log(err);
            }).finally(() => {
                setLoading(false);
            });
        }
    }

    return (
        <div className={"list-group-item list-group-item-action"}>
            <p className="piece-description">
                <small>
                    <b>tweeted at:</b> {formatTweetDate(piece.tweeted_at)}
                </small>
            </p>
            <div className="row text-center">
                <div className="col-3">
                    <span>
                        { piece.input_translated ? circle_filled : circle} <br/>
                        <small>translated</small>
                    </span>
                </div>
                <div className="col-3">
                    <span>
                        { piece.artifact_url_1 ? circle_filled : circle} <br/>
                        <small>generated</small>
                    </span>
                </div>
                <div className="col-3">
                    {
                        loading ? (
                            <div className="spinner-grow" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        ) : (
                            <a className="btn-delete text-decoration-none" style={{color: "black"}} onClick={() => handleGenerateResponse()}>
                                { piece.tweet_response_id ? circle_filled : circle} <br/>
                                <small>response</small>
                            </a>
                        )
                    }
                </div>
                <div className="col-3">
                    <span className="btn-delete" onClick={() => handleDelete(piece)}>
                        { delete_bin } <br/>
                        <small>delete</small>
                    </span>
                </div>
            </div>
        </div>
    )
}

const circle = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-circle"
         viewBox="0 0 16 16">
        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
    </svg>
)

const circle_filled = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-circle-fill"
         viewBox="0 0 16 16">
        <circle cx="8" cy="8" r="8"/>
    </svg>
)

const delete_bin = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#000" className="bi bi-trash2"
         viewBox="0 0 16 16">
        <path
            d="M14 3a.702.702 0 0 1-.037.225l-1.684 10.104A2 2 0 0 1 10.305 15H5.694a2 2 0 0 1-1.973-1.671L2.037 3.225A.703.703 0 0 1 2 3c0-1.105 2.686-2 6-2s6 .895 6 2zM3.215 4.207l1.493 8.957a1 1 0 0 0 .986.836h4.612a1 1 0 0 0 .986-.836l1.493-8.957C11.69 4.689 9.954 5 8 5c-1.954 0-3.69-.311-4.785-.793z"/>
    </svg>
)