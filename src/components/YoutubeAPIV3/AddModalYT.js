import Modal from "react-modal";
import React from "react";
import "./AddModalYT.css";
const customStyles = {
    content: {
        marginLeft: "25%",
        marginTop: "5%",
        height: "50%",
        width: "50%",
        backgroundColor: "transparent",
        borderWidth: 0
    }
};
const AddModalYT = props => {
    const url = props.url && props.url.split("=")[1];
    return (
        <Modal isOpen={props.modalIsOpen} style={customStyles}>
            <div className="video-detail col-md-12">
                <div className="embed-responsive embed-responsive-16by9">
                    <iframe
                        className="embed-responsive-item"
                        src={"https://www.youtube.com/embed/" + url}
                    />
                </div>
            </div>
            <button onClick={() => props.closeModal()} className="button">
                &times;
            </button>
        </Modal>
    );
};

export default AddModalYT;