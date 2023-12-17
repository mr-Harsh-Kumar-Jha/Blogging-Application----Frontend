import React, { useEffect, useState } from 'react'
import { AiFillRead, AiFillEye } from 'react-icons/ai';
import './authorInfo.css';


const AuthorInfo = (props) => {
   let viewsCount = props.views.length;
   let readTime = props.readTime;
   const [author, setAuthor] = useState(props.author);

   useEffect(()=>{
      const fetchAuthorInfo = async () => {
         let authorInfo = await fetch(`http://localhost:4000/auth/getuser/${author}`, {
            method: 'GET',
            headers: {
               "auth-token": localStorage.getItem('userDetails')
            },
         })
         let json = await authorInfo.json();
         setAuthor(json)
      }
      fetchAuthorInfo();
   },[])

   const assignClass = () => {
      if (props.size === 'small') {
         if (props.disable) {
            return 'disable';
         }
         return `blog-article-card-author-photo-small css-25p9sh`;
      }
      else if (props.disable === true) {
         return 'disable';
      } else {
         return "blog-article-card-author-photo css-25p9sh";
      }
   }

   return (
      <>
         <div className="blog-article-card-author-home">
            <a href="#" className={assignClass()}>
               <span style={{ boxSizing: "border-box", display: "inline-block", overflow: "hidden", width: "initial", height: 'initial', background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", position: "relative", maxWidth: "100%" }}>
                  <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px", maxWidth: "100%" }}>
                     <img alt="" aria-hidden="true" src="data:image/svg+xml,%3csvg%20xmlns=%27http://www.w3.org/2000/svg%27%20version=%271.1%27%20width=%2772%27%20height=%2772%27/%3e" style={{ display: "block", maxWidth: "100%", width: "initial", height: "initial", background: "none", opacity: 1, border: "0px", margin: "0px", padding: "0px" }} />
                  </span>
                  <img alt={author.name} src={author.picture} decoding="async" data-nimg="intrinsic" className="css-4zleql" style={{ position: "absolute", inset: "0px", boxSizing: "border-box", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px", minWidth: "100%", maxWidth: "100%", minHeight: "100%", maxHeight: "100%" }} />
               </span>
            </a>
            <div className={`author-name-home${props.size !== 'big' ? '-' + props.size : ''}`}>
               <a className="blog-article-card-author-name css-e132gw" href="#">{author.name}</a>
               <div className="article-main-meta">
                  <p className={`read-time-home${props.size !== 'big' ? '-' + props.size : ''}`}>
                     <AiFillRead style={{ color: "#9e9e9e", fontSize: '2rem' }} />
                     <span>{readTime} min read</span>
                  </p>
                  <p className='full-stop-home'></p>
                  <p className={`view-section-home${props.size !== 'big' ? '-' + props.size : ''}`}>
                     <AiFillEye style={{ color: "#9e9e9e", fontSize: '2rem' }} />
                     <span>{viewsCount} views</span>
                  </p>
               </div>
            </div>
         </div>
      </>
   )
}

export default AuthorInfo