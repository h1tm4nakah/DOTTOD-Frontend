import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export interface Piece {
    slug: string,
    input_original: string,
    input_translated: string,
    artifact_url_1: string,
    artifact_url_2: string,
    artifact_url_3: string,
    artifact_url_4: string,
    tweeted_at: string,
    tweet_id: string,
}

export interface Participant {
    username: string,
    profile_url: string,
    affiliated_party: string,
    pieces: Piece[]
}

export const fetchExhibition = () => {
    console.log(API_URL);
    // @ts-ignore
    return axios.get(API_URL + '/api/exhibition');
}