import React, { useContext, useRef, useState } from 'react'
import './navbar.css'
import {FiTwitter} from 'react-icons/fi';
import {FaLinkedin} from 'react-icons/fa';
import {RxGithubLogo} from 'react-icons/rx';
import {MdPersonalInjury} from 'react-icons/md';
import {BsPersonCircle,BsSearch} from 'react-icons/bs';
import {LuMailPlus} from 'react-icons/lu';
import Authenticate from '../modals/authentication/authenticate';
import Newsletter from '../modals/newsletter/newsletter';
import Search from '../modals/search/search';
import { NavLink, Link } from 'react-router-dom';
import { UserContext } from '../../userContext/userContext';
const Nav = () => {
   const [signUpModal, setSignUpModal] = useState(false);
   const [newsLetter, setNewsLetter] = useState(false);
   const [search, setSearch] = useState(false);
   const btnRefSignUp = useRef();
   const btnRefNewsLetter = useRef();
   const btnRefSearch = useRef();
   const data = useContext(UserContext);
   // useEffect(()=>{
   //    let pathName = window.location.pathname;
   //    console.log(pathName);
   //    // setActive()
   // },[window.location.pathname]);

  return (
    <>
         <div className="nav__container">
               <div className="nav__content">
                    <div className="brand">
                     <span>Harsh Jha </span>
                     <div className="nav-socialMedia">
                           <ul>
                              <li><div className="empty"></div><a href="https://twitter.com/_harsh_jha"><FiTwitter style={{color: "white", fontSize: "1.5em"} }/></a></li>
                              <li><div className="empty"></div><a href="https://www.linkedin.com/in/harsh-jha-457707203/"><FaLinkedin style={{color: "white", fontSize: "1.5em"} }/></a></li>
                              <li><div className="empty"></div><a href="https://github.com/mr-Harsh-Kumar-Jha"><RxGithubLogo style={{color: "white", fontSize: "1.5em"} }/></a></li>
                              <li><div className="empty"></div><a href="https://harshjha.vercel.app/"><MdPersonalInjury style={{color: "white", fontSize: "1.5em"} }/></a></li>
                           </ul>
                     </div>
                     </div>
                    <div className="nav__container-elements">
                         <ul>
                           <li className="home"><NavLink to="/" className={({isActive})=>{
                              return isActive?'active-nav':'';
                           }}>Home</NavLink></li>
                           <li className="aboutMe"><Link to="https://harshjha.vercel.app/" className={({isActive})=>{
                              return isActive?'active-nav':'';
                           }}>Portfolio</Link></li>
                           <li className="editor"><NavLink to="/sponsor" className={({isActive})=>{
                              return isActive?'active-nav':'';
                           }}>Sponsor</NavLink></li>
                          {data.state.role === 'admin' && <li className="editor"><NavLink to="/blogeditor" className={({isActive})=>{
                              return isActive?'active-nav':'';
                           }}>Editor</NavLink></li>}
                           <li className="editor"><NavLink to="/newsletter" className={({isActive})=>{
                              return isActive?'active-nav':'';
                           }}>Newsletter</NavLink></li>
                         </ul>
                    </div>
                    <div className="nav__container-elements-loginSystem">
                         <ul>
                           <li className="search-navbar" onClick={()=> setSearch(!newsLetter)} ref={btnRefSearch}>
                              <div className="empty"></div>
                              <BsSearch style={{fontSize:'1.5em'}}/>
                           </li>
                           <li className="newsletter-navbar" onClick={()=> setNewsLetter(!newsLetter)} ref={btnRefNewsLetter}>
                           <div className="empty"></div>
                              <LuMailPlus style={{fontSize:'1.5em'}}/>
                           </li>
                           {data.state.user === null ? <li className="signUp-navbar" onClick={()=> setSignUpModal(!signUpModal)} ref={btnRefSignUp}>
                           <div className="empty"></div>
                              <BsPersonCircle style={{fontSize:'1.5em'}}/>
                           </li>: <li className="signUp-navbar" onClick={()=> setSignUpModal(!signUpModal)} ref={btnRefSignUp}>
                           <div className="empty"></div>
                              <img src={data.state.user.picture} alt={data.state.user._doc?data.state.user._doc.name:data.state.user.name} style={{width:'2.5em', height:'2.5em', borderRadius:'50%'}}/>
                           </li>}
                         </ul>
                    </div>
               </div>
               {signUpModal && <Authenticate onClose={()=> setSignUpModal(false)} btnRef={btnRefSignUp.current}/>}
               {newsLetter && <Newsletter onClose={()=> setNewsLetter(false)} btnRef={btnRefNewsLetter.current}/>}
               {search && <Search onClose={()=> setSearch(false)} btnRef={btnRefSearch.current}/>}
         </div>
    </>
  )
}

export default Nav