import React, { Fragment } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { checkLogin } from '../../helpers/check';
import './NavLinks.css';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useSelector } from 'react-redux';
import HomeIcon from '@material-ui/icons/Home';
import TrendingUpIcon from '@material-ui/icons/TrendingUp';
import PersonIcon from '@material-ui/icons/Person';

function NavLinks({history}) {
    
    const user = useSelector(state => state.userReducer)
    console.log(user)
    const signOut = () => {
        localStorage.removeItem('jwt_info');
        history.push('/auth') 
    }
    return (
        <ul className="nav__bar__list">
            <li>
                <NavLink exact to='/' ><HomeIcon fontSize="large" /></NavLink>
            </li>
            <li>
                <NavLink exact to='/trending' ><TrendingUpIcon fontSize="large" /></NavLink>
            </li>
            {
                checkLogin() && (
            <li>
                <NavLink exact to='/profil' ><PersonIcon fontSize="large" /></NavLink>
            </li>
                )}
            
            {
                checkLogin() && (
                <li>
                    <p>Welcom {user.username}</p>
                </li>
            )}
            
            {
                checkLogin() && (
                    <li>
                        <span onClick={signOut} className="nav__logout" ><ExitToAppIcon fontSize="large" /></span>
                    </li>
                )
            }
            {
                !checkLogin() && (
                    <Fragment>
                        <li>
                            <NavLink to='/auth' >LOGIN</NavLink>
                        </li>
                    </Fragment>
                )
            }
            
            
        </ul>
    )
}

export default withRouter(NavLinks)
