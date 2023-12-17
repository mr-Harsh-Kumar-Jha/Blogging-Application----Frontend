import React, { useState, useRef, useEffect } from 'react';
import './sponsor.css';
import brand from '../../Assets/Harshlogo.jpeg';
import sponsor from '../../Assets/sponsor.avif';
import { FiTwitter } from 'react-icons/fi';
import { RxGithubLogo } from 'react-icons/rx';
import { FaLinkedin, FaRupeeSign } from 'react-icons/fa';
import { MdPersonalInjury } from 'react-icons/md';
import Spon from '../modals/sponsor/sponsor';
import CardDisplayBlogs from '../general/cardDisplayblogs/cardDisplayBlogs';

const Sponsor = () => {
   const [modalOpen, setModalOpen] = useState(false);
   const sponsorModalMain = useRef();
   const sponsorModalMain2 = useRef();
   const handleModalOpen = () => {
      setModalOpen(true);
   }
   const [blogs , setBlogs] = useState([]);

   useEffect(()=>{
      const fetchBlogs = async()=>{
         let rawJson = await fetch('http://localhost:4000/upload/blog-post', {
            method: 'GET',
            headers: {
               "auth-token": localStorage.getItem('userDetails')
            },
         })
         let json = await rawJson.json();
         setBlogs(json.blog);
      }

      fetchBlogs();
   },[])

   return (
      <>
         <div className='sponsor-container'>
            <div className="main-sponsor-content">
               <div className="content-1">
                  <div className='content-1-brand'>
                     <img src={brand} alt="Harsh" />
                  </div>
                  <span className='postCount-Sponsor'>1 Post</span>
                  <div className="socialMedia-Imp">
                     <ul>
                        <li><a href="https://twitter.com/_harsh_jha"><FiTwitter style={{ color: "white", fontSize: "1.5em" }} />@_harsh_jha</a></li>
                        <li><a href="https://github.com/mr-Harsh-Kumar-Jha"><RxGithubLogo style={{ color: "white", fontSize: "1.5em" }} />@mr-Harsh-Kumar-Jha </a></li>
                     </ul>
                  </div>
                  <div className="socialHandle-icons">
                     <ul>
                        <li><a href="https://www.linkedin.com/in/harsh-jha-457707203/"><FaLinkedin style={{ color: "white", fontSize: "1.5em" }} /></a></li>
                        <li><div className="empty"></div><a href="https://harshjha.vercel.app/"><MdPersonalInjury style={{ color: "white", fontSize: "1.5em" }} /></a></li>
                     </ul>
                  </div>
               </div>
               <div className="content-2">
                  <div className="header-content-2">
                     <span>SPONSOR & SUPPORT</span>
                     <h1 style={{ fontSize: '6rem', fontWeight: 'bolder', fontFamily: '"Fredericka the Great", cursive', color: '#fff' }}>Harsh Jha</h1>
                     <button className='btn-primary' onClick={handleModalOpen} ref={sponsorModalMain}>
                        <FaRupeeSign style={{ color: "white", fontSize: "1.5em" }} />Sponsor this blog
                     </button>
                  </div>
                  <div className="sponsor-personalInfo">
                     <h1>Hi!</h1>
                     <p>I am a <strong>student</strong> and a <strong>self-taught developer</strong> from 🇮🇳dia. I don't publish blogs frequently because I make sure that my blogs are accurate and easily understood by anyone who reads them. I take enough time to study what I am writing to be able to impart as much knowledge as I acquired.</p>
                     <p>Support me and boost my morale. It'll help me write even better blogs.</p>
                  </div>
                  <div className="recent-articles-sponsor">
                     <h2>Recent articles</h2>
                     <div className='sponsor-blogs'>
                        {blogs.length!==0 && blogs.map((blog, i) =>
                           <div className="actual-post-container-sponsor" key={i}>
                              <CardDisplayBlogs size={'too-small'} blog={blog} disable={true} />
                           </div>
                        )}
                     </div>
                  </div>
               </div>
               <div className="content-3">
                  <div className="header-content-3">Recent Sponsors</div>
                  <div className="sponsorContent">
                     <div className="empty-sponsor-content">
                        <img src={sponsor} alt="sponsors" />
                        <p>Be the first one to sponsor Yash Aryan</p>
                     </div>
                  </div>
                  <button className="button-sponsor" onClick={handleModalOpen} ref={sponsorModalMain2}>
                     <div className="rupees-symbol">
                        <FaRupeeSign style={{ color: "white", fontSize: "1.5em" }} />
                     </div>
                     <span>Become a sponsor</span>
                  </button>
               </div>
            </div>
         </div>
         {modalOpen && <Spon onClose={() => setModalOpen(false)} btnRef={sponsorModalMain.current} btnRef2={sponsorModalMain2.current} />}
      </>
   )
}

export default Sponsor;