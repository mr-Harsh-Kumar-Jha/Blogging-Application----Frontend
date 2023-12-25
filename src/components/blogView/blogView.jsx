import React, { useEffect, useState, useContext } from 'react'
import './blogView.css'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai'
import { BsFillChatHeartFill, BsFillBookmarkHeartFill } from 'react-icons/bs'
import { useParams } from 'react-router';
import { UserContext } from "../../userContext/userContext.jsx";
import CommentView from './commentView.jsx';

const BlogView = () => {
   const param = useParams()
   const blogID = param.id;
   const data = useContext(UserContext);
   const [blog, setBlog] = useState('');
   const [jsonData, setJsonData] = useState({"like":false, "comment":false, "saved":false});

   const getBlog = async () => {
      const resBlog = await fetch(`http://localhost:4000/upload/blog-post/${blogID}`, {
         method: 'GET',
      })
      const blogJson = await resBlog.json();
      return blogJson;
   }

   useEffect(() => {
      const getBlogContent = async () => {
         let blogJson = await getBlog();
         const resUser = await fetch(`http://localhost:4000/auth/getuser`, {
            method: 'GET',
            headers: {
               "auth-token": localStorage.getItem('userDetails')
            }
         })
         const userJson = await resUser.json();
         if (!userJson.error) {
            let jsonObj = {};
            if (blogJson.blog.infoJson.like.includes(userJson._doc._id)) {
               jsonObj['like'] = true;
            }
            else jsonObj['like'] = false;
            if (blogJson.blog.infoJson.comment.includes(userJson._doc._id)) {
               jsonObj['comment'] = true;
            }
            else jsonObj['comment'] = false;
            if (blogJson.blog.infoJson.saved.includes(userJson._doc._id)) {
               jsonObj['saved'] = true;
            }
            else {
               jsonObj['saved'] = false;
            }
            setJsonData(jsonObj);
         }
         setBlog(blogJson.blog);
      }
     getBlogContent();
   }, [])

   const handleClick = async (data, operation) => {
      await fetch(`http://localhost:4000/upload/infoJson/${blogID}`, {
         method: 'PUT',
         headers: {
            'Content-Type': ' application/json ',
            "auth-token": localStorage.getItem('userDetails')
         },
         body: JSON.stringify({ data, operation })
      })
      let blogJson = await getBlog()
      setBlog(blogJson.blog)
      setJsonData({ ...jsonData, [data]: !jsonData[data] });
   }

   return (
      <>
         <div className='blogView-container'>
            <div className="blogView_subcontainer">
               {blog.infoJson && <section className='section-blogview-1'>
                  {jsonData.like === false && <div onClick={() => {
                     handleClick('like', 1);
                  }}>
                     <AiOutlineHeart style={{ fontSize: '2em' }} color='white' />
                     <span>{blog.infoJson.like.length}</span>
                  </div>}
                  {jsonData.like === true && <div onClick={() => {
                     handleClick('like', -1);
                  }}>
                     <AiFillHeart style={{ fontSize: '2em' }} color='red' />
                     <span>{blog.infoJson.like.length}</span>
                  </div>}
                  {jsonData.comment === false && <div onClick={() => {
                     handleClick('comment', 1);
                  }}>
                     <BsFillChatHeartFill style={{ fontSize: '2em' }} color='white' />
                     <span>{blog.infoJson.comment.length}</span>
                  </div>}
                  {jsonData.comment === true && <div onClick={() => {
                     handleClick('comment', -1);
                  }}>
                     <BsFillChatHeartFill style={{ fontSize: '2em' }} color='pink' />
                     <span>{blog.infoJson.comment.length}</span>
                  </div>}
                  {jsonData.saved === false && <div onClick={() => {
                     handleClick('saved', 1);
                  }}>
                     <BsFillBookmarkHeartFill style={{ fontSize: '2em' }} color='white' />
                     <span>{blog.infoJson.saved.length}</span>
                  </div>}
                  {jsonData.saved === true && <div onClick={() => {
                     handleClick('saved', -1);
                  }}>
                     <BsFillBookmarkHeartFill style={{ fontSize: '2em' }} color='yellow' />
                     <span>{blog.infoJson.saved.length}</span>
                  </div>}
               </section>}
               <section className='section-blogview-2 '>
                  <div className='actual-blog-content'>
                     <h1 className='text-center fs-1'>{blog.title}</h1>
                     <img src={blog.imageCover} alt={blog.title} />
                     <div className='fs-3' dangerouslySetInnerHTML={{ __html: blog.description }} />
                  </div>
                  <CommentView data={data} blogID={blogID}/>
               </section>
               <section className='section-blogview-3'>

               </section>
            </div>
         </div>
      </>
   )
}

export default BlogView