import React, {useEffect, useState} from "react";
import {
    fetchPiecesToGenerate, getGeneratedImages,
    ParticipantAdmin,
    PieceAdmin, postGeneratedImages,
} from "../../services/auth.service";
import {Loading} from "../loading.component";
import {formatTweetDate} from "./generatetweets.component";
import placeholder from "../../assets/images/placeholder.jpg";

export function GenerateImagesPage() {
    const [loading, setloading] = useState(false);
    const [loadGenerated, setLoadGenerated] = useState(false);
    const [participants, setParticipants] = useState<ParticipantAdmin[]>([]);

    useEffect(() => {
        setloading(true);
        fetchPiecesToGenerate(loadGenerated).then(res => {
            setParticipants(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        });
    }, [loadGenerated])

    if (loading) return <Loading />

    return (
        <div className="row mb-5">
            <div className="col-12 mb-3">
                <div className="form-check form-switch">
                    <input className="form-check-input"
                           type="checkbox" role="switch"
                           checked={loadGenerated}
                           onChange={(e) => setLoadGenerated(e.target.checked)} />
                    <label className="form-check-label">Load tweets with generated images</label>
                </div>
            </div>
            {(participants.length === 0) && <h5>There are no tweets that need image generation</h5>}
            {
                participants.map((p: ParticipantAdmin) => {
                    return (
                        <div key={p.username} className="col-12 col-md-6 col-lg-4 col-xl-3 mb-3">
                            <h3 className="mb-0"><a className="text-decoration-none" href={p.profile_url}>{p.username}</a></h3>
                            <p><small>{p.affiliated_party}</small></p>
                            <div className="list-group">
                                {
                                    p.pieces.map((piece: PieceAdmin) => {
                                        return <GeneratePieceComponent key={piece.tweet_id} in_piece={piece} />
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

function GeneratePieceComponent({in_piece}: {in_piece: PieceAdmin}) {
    const [loading, setloading] = useState(false);
    const [manually, setManually] = useState(false);
    const [piece, setPiece] = useState<PieceAdmin>(in_piece);

    function handleGenerate() {
        setloading(true);
        getGeneratedImages(piece.tweet_id).then(res => {
            setPiece({
                ...piece,
                artifact_url_1: res.data.generated_images[0],
                artifact_url_2: res.data.generated_images[1],
                artifact_url_3: res.data.generated_images[2],
                artifact_url_4: res.data.generated_images[3],
            });
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        })
    }

    function handleSave() {
        setloading(true);
        postGeneratedImages(piece.tweet_id, piece.artifact_url_1, piece.artifact_url_2, piece.artifact_url_3, piece.artifact_url_4).then(res => {
            setPiece({
                ...piece,
                artifact_url_1: res.data.artifact_url_1,
                artifact_url_2: res.data.artifact_url_2,
                artifact_url_3: res.data.artifact_url_3,
                artifact_url_4: res.data.artifact_url_4,
            });
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
            setManually(false);
        });
    }

    function handleImageForm(e: any) {
        const key: string = e.target.name;
        if(key === "artifact_url_1") setPiece({...piece, artifact_url_1: (e.target.value !== '') ? e.target.value : null });
        if(key === "artifact_url_2") setPiece({...piece, artifact_url_2: (e.target.value !== '') ? e.target.value : null });
        if(key === "artifact_url_3") setPiece({...piece, artifact_url_3: (e.target.value !== '') ? e.target.value : null });
        if(key === "artifact_url_4") setPiece({...piece, artifact_url_4: (e.target.value !== '') ? e.target.value : null });
    }

    return (
        <div className={"list-group-item list-group-item-action"}>
            <span className="btn-top-right">
                <button className="btn btn-sm btn-dark mx-2" onClick={handleGenerate}>
                    {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} generate
                </button>
                {
                    (manually) ? (
                        <button className="btn btn-sm btn-dark" onClick={handleSave}>
                            {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} save
                        </button>
                    ) : (
                        <button className="btn btn-sm btn-dark" onClick={() => setManually(true)}>
                            {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} set manually
                        </button>
                    )
                }
            </span>

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
            <p className="piece-description">
                <small>
                    <b>translated input:</b><br />
                    {piece.input_translated}
                </small>
            </p>
            <div className="row my-2">
                <div className="col-3">
                    {(piece.artifact_url_1 === null) ? (
                            <img alt="placeholder" className="img-fluid" src={placeholder} />
                        ) : (
                            <a href={piece.artifact_url_1} target="_blank"><img alt="placeholder" className="img-fluid" src={piece.artifact_url_1} /></a>
                    )}
                </div>
                <div className="col-3">
                    {(piece.artifact_url_2 === null) ? (
                        <img alt="placeholder" className="img-fluid" src={placeholder} />
                    ) : (
                        <a href={piece.artifact_url_2} target="_blank"><img alt="placeholder" className="img-fluid" src={piece.artifact_url_2} /></a>
                    )}
                </div>
                <div className="col-3">
                    {(piece.artifact_url_3 === null) ? (
                        <img alt="placeholder" className="img-fluid" src={placeholder} />
                    ) : (
                        <a href={piece.artifact_url_3} target="_blank"><img alt="placeholder" className="img-fluid" src={piece.artifact_url_3} /></a>
                    )}
                </div>
                <div className="col-3">
                    {(piece.artifact_url_4 === null) ? (
                        <img alt="placeholder" className="img-fluid" src={placeholder} />
                    ) : (
                        <a href={piece.artifact_url_4} target="_blank"><img alt="placeholder" className="img-fluid" src={piece.artifact_url_4} /></a>
                    )}
                </div>
            </div>
            {
                manually && (
                    <>
                    <div className="row mb-1 mt-3">
                        <label style={{lineHeight: "1"}} className="col-sm-2 col-form-label"><small>img_1</small></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-xs" name="artifact_url_1"
                                   value={piece.artifact_url_1} onChange={handleImageForm}/>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label style={{lineHeight: "1"}} className="col-sm-2 col-form-label"><small>img_2</small></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-xs" name="artifact_url_2"
                                   value={piece.artifact_url_2} onChange={handleImageForm}/>
                        </div>
                    </div>
                    <div className="row mb-1">
                        <label style={{lineHeight: "1"}} className="col-sm-2 col-form-label"><small>img_3</small></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-xs" name="artifact_url_3"
                                   value={piece.artifact_url_3} onChange={handleImageForm}/>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <label style={{lineHeight: "1"}} className="col-sm-2 col-form-label"><small>img_4</small></label>
                        <div className="col-sm-10">
                            <input type="text" className="form-control form-control-xs" name="artifact_url_4"
                                   value={piece.artifact_url_4} onChange={handleImageForm}/>
                        </div>
                    </div>
                    </>
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