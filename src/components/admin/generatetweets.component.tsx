import React, {useEffect, useState} from "react";
import {fetchNewTweets, rawTweet, submitNewTweets} from "../../services/auth.service";
import DatePicker from "react-datepicker";
import {Piece} from "../../services/exhibiion.service";

export function GenerateTwitterPage() {
    const [loading, setloading] = useState(false);
    const [startDate, setStartDate] = useState(new Date());
    const [rawTweets, setRawTweets] = useState<rawTweet[]>([]);
    const [pieces, setPieces] = useState<Piece[]>([]);


    function handleFetchNewTweets() {
        setloading(true);
        setPieces([]);
        setRawTweets([]);
        fetchNewTweets(startDate).then(res => {
            let temp: rawTweet[] = res.data;
            temp.sort((a,b) => a.username.localeCompare(b.username));
            setRawTweets(temp);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        });
    }

    function handlePostNewTweets() {
        setloading(true);
        submitNewTweets(rawTweets).then(res => {
            setPieces(res.data);
        }).catch(err => {
            console.log(err);
        }).finally(() => {
            setloading(false);
        });
    }

    function handleTweetChange(tweet: string, tweet_id: string) {
        let tw = rawTweets.find((t: rawTweet) => t.tweet_id === tweet_id);
        if (tw) {
            tw.tweet = tweet;
            let temp: rawTweet[] = [...rawTweets.filter((t: rawTweet) => t.tweet_id !== tweet_id), tw];
            temp.sort((a,b) => a.username.localeCompare(b.username));
            setRawTweets(temp);
        }
    }

    return (
        <div className="row">
            <div className="col-4">
                <div className="row g-3">
                    <div className="col-auto">
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date) => setStartDate(date)}
                            className="form-control"
                            dateFormat="dd/MM/yyyy"
                        />
                    </div>
                    <div className="col-auto">
                        <button className="btn btn-dark mb-2" onClick={handleFetchNewTweets}>
                            {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} generate
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-12 my-4">
                <div className="row">
                    <div className="col-12 col-md-4">
                        {(rawTweets.length === 0) && <h5>Was not possible to fetch any tweet</h5>}
                        <div className="list-group">
                            {
                                rawTweets.map((t: rawTweet) =>
                                    <RawTweetComponent
                                        key={t.tweet_id} tweet={t}
                                        handleTweetChange={handleTweetChange}
                                        submitted={pieces.findIndex((p: Piece) => p.tweet_id === t.tweet_id) !== -1}
                                    /> )
                            }
                        </div>
                        {
                            (rawTweets.length > 0) && (
                                <button className="btn btn-dark my-2 float-end" onClick={handlePostNewTweets}>
                                    {loading && <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>} store tweets
                                </button>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

interface RawTweetComponentProps {
    tweet: rawTweet,
    handleTweetChange: (e: string, id: string) => void,
    submitted?: boolean
}

function RawTweetComponent({tweet, handleTweetChange, submitted}: RawTweetComponentProps) {
    const [rawTweet, setRawTweet] = useState<rawTweet>(tweet);

    useEffect(() => {
        setRawTweet(tweet);
    }, [tweet]);

    function handleChange(e: any) {
        handleTweetChange(e.target.value, rawTweet.tweet_id);
    }

    return (
        <div className={"list-group-item list-group-item-action" + ((submitted) ? " text-bg-dark" : "")}>
            <div className="d-flex w-100 justify-content-between align-items-center">
                <h5 className="mb-1">{rawTweet.username}</h5>
                <small>{formatTweetDate(rawTweet.tweeted_at)}</small>
            </div>
            <textarea rows={5} name="tweet" maxLength={2000}
                      className="form-control" placeholder="original tweet input"
                      value={rawTweet.tweet} onChange={handleChange}/>

            <div className="d-flex w-100 justify-content-between mt-1">
                <small>
                    <b>likes:</b> {rawTweet.like_count} |
                    <b> replies:</b> {rawTweet.reply_count} |
                    <b> re-tweets:</b> {rawTweet.retweet_count}
                </small>
                <small><b>tweet no. </b>
                    <a className="text-decoration-none" target="_blank" rel="noreferrer"
                       href={"https://twitter.com/EnricoLetta/status/" + rawTweet.tweet_id}>{rawTweet.tweet_id}</a></small>
            </div>
        </div>
    )
}

export function formatTweetDate(in_date: string) {
    //2022-08-05 09:36:25+00:00
    const [date, time] = in_date.split(" ");
    const [year, month, day] = date.split("-");
    const [time_keep, _] = time.split("+");
    return day + '/' + month + '/' + year + ' ' + time_keep;
}