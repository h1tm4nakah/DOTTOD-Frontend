import React, {useEffect, useState} from "react";
import {fetchExhibition, Participant} from "../services/exhibiion.service";
import {Loading} from "../components/loading.component";
import {Timeline} from "../components/timeline.component";
import {MobileUI} from "../components/mobileUI.component";

export function ExhibitionPage() {
    const [loading, setLoading] = useState(true);
    const [flip, setFlip] = useState(false);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [focusIDX, setFocusIDX] = useState(0);
    const [focusIDXMax, setFocusIDXMax] = useState(0);

    useEffect(() => {
        fetchExhibition()
            .then(res => {
                setParticipants(res.data);
                setFocusIDXMax(res.data[0].pieces.length);
            })
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [])

    function handleIDXChange(value: number) {
        if (focusIDX === 0 && value < 0) return;
        if (focusIDX === (focusIDXMax-1) && value > 0) return;
        setFocusIDX(focusIDX + value);
        console.log(focusIDX + value);
    }

    if (loading) {
        return <Loading />;
    }

    return (
        <>
            <div className="mb-4">
                {
                    participants.map((p: Participant) => {
                        return (
                            <Timeline key={p.username} in_participant={p} flip={flip} focusIDX={focusIDX}/>
                        )
                    })
                }
            </div>
            <MobileUI flip={flip} setFlip={setFlip} focusIDX={focusIDX} handleIDXChange={handleIDXChange} />
        </>
    );
}