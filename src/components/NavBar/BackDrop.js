import React from 'react';
import ReactDom from 'react-dom';
import "./BackDrop.css"

function BackDrop({ onClick }) {
    const content = <div className="backdrop" onClick={onClick} ></div>;
    return ReactDom.createPortal(
        content,
        document.getElementById('backdrop')
    )
}

export default BackDrop
