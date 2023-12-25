import React, {useState, useEffect} from 'react';
import brand from '../../Assets/Harshlogo.jpeg';
import './newsletter.css';
import CardDisplayBlogs from '../general/cardDisplayblogs/cardDisplayBlogs';

const Newsletter = () => {
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
         <div className="newsletter-container">
            <div className="main-newsletter-container">
               <span className='image-container'>
                  <span className='main-image-container'>
                     <img src={brand} alt="Harsh" />
                  </span>
               </span>
               <div className="mainContainer-content-newsletter">
                  <div className="css-e2xo3p">
                     <h3 className="css-1yfx558">Subscribe to my newsletter</h3>
                     <p className="css-y0uycb">Read articles from <strong>Yash Aryan</strong> directly inside your inbox. Subscribe to the newsletter, and don't miss out.</p>
                     <div className="css-976no0">
                        <input type="email" placeholder="Enter your email address" className="css-1mxvruu" />
                        <button type="button" variant="transparent" className="css-1ktz4z6">Subscribe</button>
                     </div>
                  </div>
               </div>
            </div>
            <div className="reacent-articles-container-newsletter">
               <div className="heading-container">
                  <h3 className="head-item-actual-newsletter">Recent articles</h3>
               </div>
               <div className="contents-display-container-recent-articles">
                  {blogs.length!==0 && blogs.map((blog, i) =>
                     <div className="actual-post-container-home" key={i}>
                        <CardDisplayBlogs size={'small'} blog={blog} disable={true} />
                     </div>
                  )}
               </div>
            </div>
         </div>
      </>
   )
}

export default Newsletter