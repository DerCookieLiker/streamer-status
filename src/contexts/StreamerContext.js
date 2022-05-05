import React, { useContext, useState, useEffect } from "react";
import { getStreams } from "../utils/api/TwitchAPI";
const StreamerContext = React.createContext();

export function StreamerProvider({children}) {
    
    const [streamer, setStreamer] = useState("");
    const [intervalId, setIntervalId] = useState("");
    const [status, setStatus] = useState("offline");
    const [data, setData] = useState({data:[]});
    const [thumbnailUrl, setThumbnailUrl] = useState("https://m.media-amazon.com/images/M/MV5BNzU3MjZmYjUtM2JjYS00ZjY3LWI2YzQtYjRmYTJmNTJhZGRmXkEyXkFqcGdeQXVyNDk2MzgwNjE@._V1_FMjpg_UX1000_.jpg");
    
    useEffect(() => {
        
        if(streamer === "") return;
        const getData = async () => {
            let data = await getStreams(streamer);
    
                setData(data);
    
                if(!data.data[0]) {
                    setStatus("offline");
                    setThumbnailUrl("https://m.media-amazon.com/images/M/MV5BNzU3MjZmYjUtM2JjYS00ZjY3LWI2YzQtYjRmYTJmNTJhZGRmXkEyXkFqcGdeQXVyNDk2MzgwNjE@._V1_FMjpg_UX1000_.jpg");
                    setData({data:[]});   
                } else {
                    data.data[0].type === "live" ? setStatus("live") : setStatus("unknown");
                    let thumbnail = String(data.data[0].thumbnail_url.replace("{width}", "1920").replace("{height}", "1280"));
                    
                    setThumbnailUrl(thumbnail);
                    
                }
        }
        getData();
        let interval = setInterval(getData, 60000);

        setIntervalId(prevInterval => {
            if(prevInterval !== "") {
                clearInterval(prevInterval);
            }
            return interval;
        });
        
    }, [streamer]);
    
    function setNewStreamer(newStreamer) {
        setStreamer(newStreamer);
    }

    function setNewIntervalId(newIntervalId) {
        if(intervalId !== "") {
            clearInterval(intervalId);
        }
        setIntervalId(newIntervalId);
    }
    function clearIntervalId() {
        clearInterval(intervalId);
        setIntervalId("");
    }
    function clearStreamer() {
        clearIntervalId();
        resetInfo();
    }

    function resetInfo () {
        setStatus("offline");
        setThumbnailUrl("https://m.media-amazon.com/images/M/MV5BNzU3MjZmYjUtM2JjYS00ZjY3LWI2YzQtYjRmYTJmNTJhZGRmXkEyXkFqcGdeQXVyNDk2MzgwNjE@._V1_FMjpg_UX1000_.jpg");
        setData({data:[]});
        setStreamer("");
    }
    

    return (
        <StreamerContext.Provider
            value={
                {
                    streamer,
                    setNewStreamer,
                    setNewIntervalId,
                    intervalId,
                    clearIntervalId,
                    status,
                    data,
                    thumbnailUrl,
                    clearStreamer
                }}
        >
           {children} 
        </StreamerContext.Provider>
    )
}

export function useStreamer() {
    return useContext(StreamerContext);
}