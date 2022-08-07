import React, {useEffect, useState} from "react";
import {fetchExhibition, Participant} from "../services/exhibiion.service";
import {Loading} from "../components/loading.component";
import {Timeline} from "../components/timeline.component";

export function ExhibitionPage() {
    const [loading, setLoading] = useState(true);
    const [participants, setParticipants] = useState<Participant[]>([]);

    useEffect(() => {
        fetchExhibition()
            .then(res => setParticipants(res.data))
            .catch(err => console.log(err))
            .finally(() => setLoading(false));
    }, [])

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="mb-4">
            {
                participants.map((p: Participant) => {
                    return (
                        <Timeline key={p.username} in_participant={p} />
                    )
                })
            }
        </div>
    );
}