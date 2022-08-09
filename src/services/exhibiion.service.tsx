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
    participant?: Participant,
}

export interface Participant {
    username: string,
    profile_url: string,
    affiliated_party: string,
    pieces: Piece[]
}

export const fetchExhibition = () => {
    // @ts-ignore
    return axios.get(API_URL + '/api/exhibition');
}

export const fetchPiece = (tweet_id: string) => {
    // @ts-ignore
    return axios.get(API_URL + '/api/exhibition/piece/' + tweet_id);
}

export const fetchParticipant = (username: string) => {
    // @ts-ignore
    return axios.get(API_URL + '/api/exhibition/participant/' + username);
}