import { useRef } from "react";
import "./newStreamerModal.css";

export default function NewStreamerModal ({open, handleSubmit, handleClose}) {

    let streamerName = useRef();

    const onHandleSubmit = () => {
        handleSubmit({
            name: streamerName.current.value
        });
        handleClose();
    }

    const onHandleClose = () => {
        handleClose();
    }

    if(open) {
        return (
            <>
                <div className="overlay" onClick={onHandleClose}/>
                <div className="modal">
                    <div className="modal-header">
                        <h2>Enter Name</h2>
                        <button className="btn-close btn" onClick={onHandleClose}></button>
                    </div>
                    <div className="modal-body">
                        <div className="inputGroup">
                            <label className="label">Name</label>
                            <input type="text" ref={streamerName} className="input"/>
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button className="btn btn-primary btn-submit" onClick={onHandleSubmit}>Submit</button>
                    </div>
                </div>
            </>
        )
    } else {
        return null;
    }
}