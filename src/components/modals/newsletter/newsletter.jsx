import React, { useEffect, useRef, useState } from 'react';
import './newsletter.css';

const Newsletter = ({onClose, btnRef}) => {
   const enableRef = useRef();
   const newsLetterRef = useRef();
   const [deActivate, setDeActivate] = useState(false);
   const handleEmailChange = (e) =>{
      if(e.target.value!==''){
         enableRef.current.disabled = false;
      }else{
         enableRef.current.disabled = true;
      }
   }

   useEffect(()=>{
      const checkIfClickedOutside = (e)=>{
         if(newsLetterRef.current && !newsLetterRef.current.contains(e.target) && !btnRef.contains(e.target)){
            setTimeout(()=>{
               onClose();
            },500);
            setDeActivate(true);
         }
      }
      document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    }
   },[onClose, btnRef]);
  return (
    <>
      <div className="newsletter-Container">
         <div className={`${deActivate?'newsletter-deactive':'actualContent-newsletter'}`}  ref={newsLetterRef}>
            <h3>Subscribe to Newsletter</h3>
            <p>Subscribe to my newsletter and never miss any upcoming articles!</p>
            <form className='emailInputZone-form'>
               <input type="email" name="email" id="modal-email" placeholder='Enter your email address' onChange={handleEmailChange}/>
               <button type="submit" ref={enableRef} disabled className='subNews-button'>Subscribe</button>
            </form>
            <button className='newsletter-closeButton' onClick={()=>{
                  setTimeout(()=>{
                     onClose();
                  },800);
                  setDeActivate(true);
            }}>x</button>
         </div>
      </div>
    </>
  )
}

export default Newsletter;