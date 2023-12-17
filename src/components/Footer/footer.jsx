import React, { useRef, useState } from 'react'
import './footer.css'
import Newsletter from '../modals/newsletter/newsletter'

const Footer = () => {
   const [newsLetter, setNewsLetter] = useState(false);
   const btnRefFooterModal = useRef();
   return (
      <>
         <div className='footer__container'>
            <div className="footer__content">
               <h3 style={{fontFamily:'"Fredericka the Great", cursive', alignItems:'center', display:'flex', gap:'3rem'}}>&copy; 2023 <span className='footer-Brand'>Harsh Jha</span></h3>
               <div className="footer__list">
                  <ul>
                     <li>Archive</li>
                     <li>Privacy Policy</li>
                     <li>Terms</li>
                  </ul>
               </div>
            </div>
            <div className="footer__lastContent">
               <button className='btn-primary' onClick={()=>setNewsLetter(true)} ref={btnRefFooterModal}>Subscribe our Newsletter</button>
               <span>Powered By : <a href="https://harshjha.vercel.app" style={{color:'white', borderBottom:'1px solid #fff', textDecoration:'none'}}>harshjha.vercel.app </a>- Home for tech readers</span>
            </div>
            {newsLetter && <Newsletter onClose={()=>setNewsLetter(false)} btnRef={btnRefFooterModal.current}/>}
         </div>
      </>
   )
}

export default Footer;