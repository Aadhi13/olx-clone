import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { db } from '../../configs/firebase';
import { useNavigate, Link } from 'react-router-dom';
import Logo from '../../olx-logo.png';
import './Signup.css';
import { useAuth } from '../../contexts/AuthContext';

export default function Signup() {
  const [userName, setUserName] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  const { signup } = useAuth();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(email, password).then( (result) => {
      updateProfile(result.user, {displayName: userName})
      console.log('result =',result.user.displayName)
      addDoc(collection(db, 'users'), {
        id: result.user.uid,
        userName: userName,
        email: email,
        phone: phone
      }).then(()=> {
        navigate("/login");
        //redirect to login page
      });
    })
  }

  return (
    <div>
      <div className="signupParentDiv">
        <img width="200px" height="200px" src={Logo} alt="olx logo"></img>
        <form onSubmit={handleSubmit}>
          <label htmlFor="userName">Username</label>
          <br />
          <input
            className="input"
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            name="name"
          />
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            className="input"
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
          />
          <br />
          <label htmlFor="phone">Phone</label>
          <br />
          <input
            className="input"
            type="number"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            name="phone"
          />
          <br />
          <label htmlFor="password">Password</label>
          <br />
          <input
            className="input"
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
          />
          <br />
          <br />
          <button>Signup</button>
        </form>
        <Link to={'/login'}>Login</Link>
      </div>
    </div>
  );
}
