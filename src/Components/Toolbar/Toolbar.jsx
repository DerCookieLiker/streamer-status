import { useState } from "react";
import Ripples  from "react-ripples";
import { useStreamer } from "../../contexts/StreamerContext";
import NewStreamerModal from "../NewStreamerModal/NewStreamerModal";
import "./toolbar.css"

export default function Toolbar () {

    const {setNewStreamer, clearStreamer} = useStreamer();
    const [modalOpen, setModalOpen] = useState(false);


    const newStreamer = (name) => {
        setNewStreamer(name);
    }

    return (
        <nav className="toolbar">
            <div className="toolbar-content">
                <div className="toolbar-item">
                    <Ripples>
                        <button className="toolbar-btn btn-danger" onClick={clearStreamer}>Clear</button>
                    </Ripples>
                </div>
                <div className="toolbar-item">
                    <Ripples>
                        <button className="toolbar-btn btn-success" onClick={() => {setModalOpen(true)}}>New Streamer</button>
                    </Ripples>
                </div>
            </div>
            <NewStreamerModal 
                open={modalOpen}
                handleSubmit={(obj) => {newStreamer(obj.name)}}
                handleClose={() => setModalOpen(false)}
            />
        </nav>
    );
}