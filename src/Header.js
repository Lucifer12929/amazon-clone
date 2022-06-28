import React from 'react'
import './Header.css'
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import {Link} from "react-router-dom"
import { useStateValue } from './StateProvider';
import {auth} from './firebase'

function Header() {
    const [{basket,user},dispatch]=useStateValue();
    
    const handleAuthentication=()=>{
        if(user){
            auth.signOut();
        }
    }

    return (
        <div className="header">
            <Link to="/">
            <img className="header_logo"
            src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
            />
            </Link>

            <div className="header_search">
                <input className="header_searchInput"
                type="text"/>
                <SearchIcon className="header_searchIcon"/>
            </div>

            <div className="header_nav">
                <Link to={!user && "/login"}> 
                <div onClick={handleAuthentication} className="header_option">
                    <span>{user ?'Sign Out':'Sign In'}</span>
                </div>
                </Link>
                <div className="header_option">
                <span>&Orders</span>
                </div>
                <div className="header_option">
                <span>Your Prime</span>
                </div>
                <Link to="/checkout">
                <div className="header_basket">
                    <ShoppingBasketIcon/>
                    <span className="header_basketcount">{basket?.length}</span>
                </div>
                </Link>
            </div>
        </div>
    )
}

export default Header
