import React from 'react';
import ReactDOM from 'react-dom';
import './SideBar.css'

function SideBar({ children, onClick }) {
    const content = <aside className="side__bar" onClick={onClick} >{children}</aside>;

    return ReactDOM.createPortal(content, document.getElementById('drawer'))
}

export default SideBar
