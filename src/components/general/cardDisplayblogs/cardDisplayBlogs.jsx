import React from 'react'
import './cardDisplayBlogs.css';
import post from '../../../Assets/Harshlogo.jpeg';
import AuthorInfo from '../authorInfoSubinfo/authorInfo';
import { calculateReadingTime } from '../../utils/GeneralFunctions';
import {useNavigate} from 'react-router-dom';

const CardDisplayBlogs = (props) => {
   let title='bro';
   let blog = props.blog;
   console.log(blog);
   let description = blog.description.slice(0, 20);
   description = description.replace(/<[^>]*>/g, '');
   let readTime = calculateReadingTime(blog.description)
   const navigate = useNavigate();
   const handleClick = ()=>{
      navigate(`/blog/${blog._id}`);
   }
   return (
      <>
         <div className={`main-display-ground-blogs-home ${props.className}`} onClick={handleClick}>
            <a aria-label={`Cover photo of the article titled ${title}`} className="blog-article-card-cover css-gb564i" href="#">
               <span style={{ boxSizing: "border-box", display: "block", overflow: "hidden", width: "initial", height: "initial", background: "none", opacity: "1", border: "0", margin: "0", padding: "0", position: "relative" }}>
                  <span style={{ boxSizing: "border-box", display: "block", width: "initial", height: "initial", background: "none", opacity: "1", border: "0", margin: "0", padding: "0", paddingTop: "52.5%" }}>
                  </span>
                  <img alt="Exploring composite APIs" src={blog.imageCover} decoding="async" data-nimg="responsive" className="css-1082qq3" style={{ position: "absolute", inset: "0px", boxSizing: "borderBox", padding: "0px", border: "none", margin: "auto", display: "block", width: "0px", height: "0px",  minWidth: "100%", maxWidth: "100", minHeight: "100%", maxHeight: "100%" }} />
               </span>
            </a>
            <h1 className={`blog-article-card-title-home css-bsx20a${props.size!=='big'?'-'+props.size:''}`}><a href="#">{blog.title}</a></h1>
            <p className={`blog-article-card-brief-home css-bsx20b${props.size!=='big'?'-'+ props.size:''}`}><a href="#">{description }</a></p>
            <AuthorInfo disable={props.disable} views={blog.views} readTime={readTime} author={blog.author} size={props.size}/>
         </div>
      </>
   )
}

export default CardDisplayBlogs