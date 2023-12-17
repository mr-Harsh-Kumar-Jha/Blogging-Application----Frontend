import React, { useRef, useEffect, useState, useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { PiSignIn } from 'react-icons/pi';
import './authenticate.css';
import photo from '../../../Assets/harshJha2.jpg'
import { UserContext } from "../../../userContext/userContext.jsx";
// import LoginPage from './loginPage';

const Authenticate = ({ onClose, btnRef}) => {
   const ref = useRef();
   const location = useLocation();

   const data = useContext(UserContext);
   const [signIn, setSignIn] = useState(false);
   const [userData, setUserData] = useState(null);
   console.log('in authenticate');
   console.log(location);

   useEffect(() => {
      const checkIfClickedOutside = e => {
         if (ref.current && !ref.current.contains(e.target) && !btnRef.contains(e.target)) {
            // console.log(onClose, e.target, btnRef);
            onClose();
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [onClose, btnRef]);
   console.log(data);

   useEffect(()=>{
      localStorage.setItem('recentBrowse', location.pathname);
      if(data.state.user!=null){
         console.log("hello", data);
         setSignIn(true);
         setUserData(data.state.user);
      }
   },[]);

   const handleSignout = ()=>{
      // console.log("hey buddy fucker", data);
      data.dispatch({
         type: "signout",
         payload:{user:null}
      });
      setSignIn(false);
   }
   return (
      <>
        {!signIn && <div className="sm-container-authenticate" ref={ref}>
            <span className='authenticate-brand'>Harsh Jha</span>
            <div className="header-authenticate">
               <div className="nameTag-authenticate">
                  <img src={photo} alt="harsh" />
                  <div className="brandName-authenticate">
                     <span>Harsh Jha</span>
                     <a href="https://www.instagram.com/_mr_harsh_jha/?hl=en" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none' }}>@_mr_harsh_jha</a>
                  </div>
               </div>
               <div className="infoContent-authenticate">
                  <h4>Ready to get started?</h4>
                  <p>Don't miss my next articles, sign in for more Updates</p>
               </div>
               <Link to='/signin' state={{ previousLocation: location }} className='SignUp-btn btn-primary' onClick={onClose}>
                  <PiSignIn style={{ fontSize: '2.5rem' }} />
                  <span>SignIn</span>
               </Link>
            </div>
         </div>}

         {signIn && <div className="sm-container-authenticate" ref={ref}>
         <span className='authenticate-brand'>{userData._doc.name}</span>
            <div className="header-authenticate">
               <div className="nameTag-authenticate">
                  <img src={userData.picture
} alt="harsh" />
                  <div className="brandName-authenticate">
                     <span>{userData._doc.name}</span>
                  </div>
               </div>
               <div className="infoContent-authenticate">
                  <h4>Hope u would have enjoyed reading !!!</h4>
                  <p>So stay tuned for my next articles</p>
               </div>
               <button className='SignOut-btn btn-primary' onClick={handleSignout}>
                  <PiSignIn style={{ fontSize: '2.5rem' }} />
                  <span>SignOut</span>
               </button>
            </div>
            </div>}
         {/* {!signClose && <LoginPage setSignClose={setSignClose} />} */}
      </>
   )
}

export default Authenticate;