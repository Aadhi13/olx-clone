import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getAuth, signOut } from "firebase/auth";

import './Header.css';
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link } from 'react-router-dom';
function Header() {
  const { currentUser } = useAuth();
  const auth =  getAuth();
  return (
    <div className="headerParentDiv">
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo></OlxLogo>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find car,mobile phone and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span> ENGLISH </span>
          <Arrow></Arrow>
        </div>
        <div className="loginPage">
          <span>{currentUser? `Welcome ${currentUser.displayName}`: <Link to={'/login'} className="loginLink">Login</Link>}</span>
          <hr />
        </div>
          {
            currentUser && <span onClick={()=>{signOut(auth).then(()=> {alert("Successfully Signout")})}}>Logout</span>
          }

        <div className="sellMenu">
          <SellButton></SellButton>
          <div className="sellMenuContent">
            <SellButtonPlus></SellButtonPlus>
            <span><Link style={{color:'black'}} to={'/create'}>SELL</Link></span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
