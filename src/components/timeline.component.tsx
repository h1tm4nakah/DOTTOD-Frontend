import * as React from 'react';
import {Participant, Piece} from "../services/exhibiion.service";
import {useEffect, useRef, useState} from "react";
import {PieceComponent} from "./piece.component";
import {Link} from "react-router-dom";

// @ts-ignore
export function Timeline({in_participant, flip, focusIDX}: {in_participant: Participant, flip: boolean, focusIDX: number}) {
    const [participant, setParticipant] = useState<Participant>(in_participant);

    useEffect(() => {
        setParticipant(in_participant)
    }, [in_participant])

    useEffect(() => {
        const timelineWrapper = document.getElementById("part-" + participant.username);
        const targetPiece = document.getElementById("piece-" + participant.username + '-' + focusIDX);
        if (timelineWrapper && targetPiece) {
            const scrollAmount = targetPiece.offsetLeft - ( targetPiece.offsetWidth / 3 );
            timelineWrapper.scroll({
                left: scrollAmount,
                top: 0,
                behavior: 'smooth'
            })
        }

    }, [focusIDX])

    return (
        <div className="row">
            <div className="col-3 col-sm-2 col-md-1 col-xl-auto" style={{minWidth: "80px"}}>
                <Link to={"/participant/" + participant.username} className="text-decoration-none" style={{color: "black"}}>
                    <div className="participant-username my-4 ms-3">
                        <h2 style={{margin: "0px"}}>{participant.username}</h2>
                        <small>{participant.affiliated_party}</small>
                    </div>
                </Link>
            </div>
            <div className="col-9 col-sm-10 col-md-11">
                <div className="participant-timeline mt-4">
                    <div id={"part-" + participant.username} className="row">
                        {
                            participant.pieces.map((p: Piece, idx) => {
                                return (
                                    <PieceComponent id={"piece-" + participant.username + "-" + idx} key={p.slug} in_piece={p} flip={flip} />
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}