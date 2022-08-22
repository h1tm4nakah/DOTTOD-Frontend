import axios, {AxiosResponse} from "axios";
import {formatTweetDate} from "../components/admin/generatetweets.component";

const API_URL = process.env.REACT_APP_API_URL + "/api/auth/";

export default function authHeader(json?: boolean) {
    const token = localStorage.getItem('token');

    if (token) {
        if(json) return {
            Authorization: 'Bearer ' + token,
            'Content-Type': 'application/json'
        };
        else return { Authorization: 'Bearer ' + token };
    } else {
        return {};
    }
}

export function fetchLogin(email: string, password: string) {
    localStorage.removeItem("token");
    let bodyFormData = new FormData();
    bodyFormData.append('email', email);
    bodyFormData.append('password', password);
    return axios.post(API_URL + "login", bodyFormData);
}

export const fetchLogout = () => {
    // @ts-ignore
    axios.post(API_URL + "logout", {} , { headers: authHeader() })
        .then(res => {})
        .catch(err => console.log(err))
        .finally(() => {
            localStorage.removeItem("token");
        });
};

export interface rawTweet {
    retweet_count: number
    tweet: string,
    tweet_id: string,
    like_count: number
    reply_count: number
    tweeted_at: string
    username: string
}

export const fetchNewTweets = (selectedDate: Date, usernames: string[]) => {
    const [date, time] = selectedDate.toISOString().split("T");
    const [year, month, day] = date.split("-");
    const string_date = '?date=' + day + '/' + month + '/' + year ;
    // @ts-ignore
    return axios.get(API_URL + "tweets/generate" + string_date + "&usernames=" + usernames, { headers: authHeader() });
}

export const submitNewTweets = (tweets: rawTweet[]) => {
    let copy_tweets: rawTweet[] = JSON.parse(JSON.stringify(tweets))
    copy_tweets.forEach((t: rawTweet) => t.tweeted_at = formatTweetDate(t.tweeted_at));
    const json = {"tweets": copy_tweets}
    // @ts-ignore
    return axios.post(API_URL + "tweets/generate", json, { headers: authHeader() });
}

export interface PieceAdmin {
    slug: string,
    input_original: string,
    input_translated: string,
    artifact_url_1: string,
    artifact_url_2: string,
    artifact_url_3: string,
    artifact_url_4: string,
    tweeted_at: string,
    tweet_id: string,
    tweet_response_id: string,
    tweet_retweet_count: string,
    tweet_reply_count: string,
    tweet_like_count: string,
}

export interface ParticipantAdmin {
    username: string,
    profile_url: string,
    affiliated_party: string,
    pieces: PieceAdmin[]
}

export const fetchPiecesToTranslate = (loadTranslated: boolean) => {
    // @ts-ignore
    return axios.get(API_URL + "tweets/translate" + (loadTranslated ? "?load_translated" : ""), { headers: authHeader() });
}

export const postPiecesToTranslate = (tweet_id: string, input_translated: string | null) => {
    let bodyFormData = new FormData();
    if (input_translated !== null) {
        bodyFormData.append('input_translated', input_translated);
    }
    // @ts-ignore
    return axios.patch(API_URL + "tweets/translate/" + tweet_id, bodyFormData, { headers: authHeader() });
}

export const fetchPiecesToGenerate = (loadGenerated: boolean) => {
    // @ts-ignore
    return axios.get(API_URL + "tweets/images" + (loadGenerated ? "?load_generated" : ""), { headers: authHeader() });
}

export const getGeneratedImages = (tweet_id: string) => {
    // @ts-ignore
    return axios.get(API_URL + "tweets/images/" + tweet_id, { headers: authHeader() });
}

export const postGeneratedImages = (tweet_id: string, i1: string, i2: string, i3: string, i4: string) => {
    let jsonData = {
        "artifact_url_1": i1,
        "artifact_url_2": i2,
        "artifact_url_3": i3,
        "artifact_url_4": i4,
    }
    // @ts-ignore
    return axios.patch(API_URL + "tweets/images/" + tweet_id, jsonData, { headers: authHeader() });
}

export const getParticipantsFilters = () => {
    // @ts-ignore
    return axios.get(API_URL + "participants", { headers: authHeader() });
}

export const getDashboardPieces = () => {
    // @ts-ignore
    return axios.get(API_URL + "dashboard/pieces", { headers: authHeader() });
}

export const deleteDashboardPieces = (piece: PieceAdmin) => {
    // @ts-ignore
    return axios.delete(API_URL + "dashboard/pieces/" + piece.tweet_id, { headers: authHeader() });
}

export const generateResponseDashboardPiece = (piece: PieceAdmin) => {
    // @ts-ignore
    return axios.post(API_URL + "dashboard/pieces/" + piece.tweet_id, {},{ headers: authHeader() });
}