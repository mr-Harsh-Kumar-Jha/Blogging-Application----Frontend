import React from 'react'
import { useNavigate } from "react-router-dom";
import {ImCross} from 'react-icons/im';
import './loginPage.css';

const LoginPage = (props) => {
   const navigate = useNavigate();
   const navigateToPrevSection = ()=>{
      navigate(-1);
   }
   const handleLoginScreen = ()=>{
      const rootUri ="https://accounts.google.com/o/oauth2/v2/auth";
      const options = {
         redirect_uri: 'http://localhost:4000/auth/google',
			client_id: '347802547239-jor0vu5cu53uggvgqvbud4rkmqmj412o.apps.googleusercontent.com',
			access_type: "offline",
			response_type: "code", //authorization code - type
			prompt: "consent",
			scope: [
				"https://www.googleapis.com/auth/userinfo.profile",
				"https://www.googleapis.com/auth/userinfo.email",
			].join(" "),
      }

      const queryString = new URLSearchParams(options);

      return `${rootUri}?${queryString.toString()}`;
   }
   handleLoginScreen()
   return (
      <div className='login-container-modal' onClick={navigateToPrevSection}>
         <div className="login-main-container-modal" onClick={(e) => e.stopPropagation()}>
            <div className="super-video-container">
               <div className="signUp-sidebar">
                  <video muted="" loop="" autoPlay="" playsInline="" className="signup-sidebar__video" src="https://cdn.dribbble.com/users/721278/screenshots/16113831/media/34f9155a09e444a2a0c624d4dd9a5405.mp4">
                  </video>
               </div>
            </div>
            <div className="signup-content-container">
               <div className="letter-content">
                     <h3>Wan't to be enhance your Knowledge, please create an account.</h3>
               </div>
               <div className="sigIn-buttons-login-modal">
                  <a href={handleLoginScreen()} className="btn btn-primary">
                     <div className="text">SignIn with Google</div>
                     <img src="#" alt="google" />
                  </a>
               </div>
               <div className="login-footer-content">
                     <p>By creating an account you agree with our <strong>Terms of Service</strong>, <strong>Privacy Policy</strong>, and <strong>our default Notification Settings</strong>.</p>
               </div>
            </div>
            <div className="close-container-modal-button" onClick={navigateToPrevSection}>
               <ImCross/>
            </div>
         </div>
      </div>
   )
}

export default LoginPage