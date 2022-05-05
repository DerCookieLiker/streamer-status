import { useStreamer } from "../../contexts/StreamerContext";
import './status.css';

export default function Status () {

    const {status, data, thumbnailUrl, streamer} = useStreamer();

    return (
        <div>
            <header className="thumbnail">
                {streamer !== "" ? <a href={streamer !== "" ? "https://twitch.tv/" + streamer : ""} target="_blank" rel="noreferrer noopener"><img src={thumbnailUrl} alt="thumbnail stream" className={"thumbnail-image " + status} /></a> : 
                    <img src={thumbnailUrl} alt="thumbnail stream" className={"thumbnail-image " + status} />
                }
                <span className={"thumbnail-status " + status}>{status}</span>
            </header>
            <main className="info">
                    <section className="info-field">
                        <label className="info-name">Username:</label>
                        <output className="info-data">{data.data[0] ? data.data[0].user_name : ""}</output>
                    </section>
                    <section className="info-field">
                        <label className="info-name">Plays:</label>
                        <output className="info-data">{data.data[0] ? data.data[0].game_name : ""}</output>
                    </section>
                    <section className="info-field">
                        <label className="info-name">Title:</label>
                        <output className="info-data">{data.data[0] ? data.data[0].title : ""}</output>
                    </section> 
                    <section className="info-field">
                        <label className="info-name">Viewer Count:</label>
                        <output className="info-data">{data.data[0] ? data.data[0].viewer_count : ""}</output>
                    </section>
                    <section className="info-field">
                        <label className="info-name">Started at:</label>
                        <output className="info-data">{data.data[0] ? new Date(data.data[0].started_at).toLocaleDateString() + " - " + new Date(data.data[0].started_at).toLocaleTimeString() : ""}</output>
                    </section>   
            </main>
        </div>
    );
}