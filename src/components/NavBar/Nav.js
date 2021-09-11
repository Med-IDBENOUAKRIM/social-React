import React, { Fragment, useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import BackDrop from './BackDrop';
import './Nav.css';
import NavLinks from './NavLinks';
import SideBar from './SideBar';
import { useDispatch } from "react-redux";
import { checkLogin } from '../../helpers/check';
import { getUser } from '../../actions/userActions';

function Nav() {
    const [isOpen, setOpen] = useState(false);

    const {user, token} = checkLogin()
    const dispatch = useDispatch();

    useEffect(() => {
        if(user) dispatch(getUser(user._id, token))
    },[dispatch, user, token])

    const openDrawer = () => setOpen(true);
    const closeDrawer = () => setOpen(false);
    return (
        <Fragment>
            {isOpen && <BackDrop onClick={closeDrawer} />}
            {
                isOpen && (
                    <SideBar onClick={closeDrawer} >
                        <nav className="nav__side__bar" >
                            <NavLinks />
                        </nav>
                    </SideBar>
                )
            }
            <header className="nav" >
                <button className="nav__sideBar" onClick={openDrawer} >
                    <span />
                    <span />
                    <span />
                </button>
                <div className="nav__links">
                    <h2 className="nav__title" >
                        <Link to='/' >APP</Link>
                    </h2>
                    <nav className="nav__bar__nav" >
                        <NavLinks />
                    </nav>
                </div>
            </header>
        </Fragment>
    )
}

export default withRouter(Nav)
