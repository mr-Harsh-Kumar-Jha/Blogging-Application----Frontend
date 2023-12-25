import React, { useEffect, useState } from 'react'
import brand from '../../Assets/Harshlogo.jpeg';
import CommentDisplay from './commentDisplay';

const CommentView = (props) => {
   const { data, blogID } = props;
   const [comment, setComment] = useState([])
   const [message, setMessage] = useState("");
   useEffect(() => {
      const getComment = async () => {

         const comments = await fetch(`http://127.0.0.1:4000/comment/view/${blogID}`, {
            method: 'GET',
         })
         const commentJson = await comments.json();
         setComment(commentJson)
      }
      getComment();
   }, [])

   const handleMessageChange = (e) =>{
      e.preventDefault();
      setMessage(e.target.value)
   }

   const handleSubmitComment = async ()=>{
      const commentRes = await fetch(`http://127.0.0.1:4000/comment/upload/${blogID}`,{
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
            "auth-token": localStorage.getItem('userDetails')
         },
         body: JSON.stringify({
            "message": message,
         })
      })
      const commentResponse = await commentRes.json();
      setMessage("")
      setComment([...comment, commentResponse]);
   }
   const handleCancel = ()=>{
      setMessage("")
   }

   return (
      <>
         <div className="comments-blog-content">
            <div className="comment-header">
               <span>Top Comments (0)</span>
            </div>
            <div className='comment-text-area'>
               <div className="main-comment-text">
                  <img src={data.state.user ? data.state.user.picture : brand} alt={data.state.user ? data.state.user.name : 'alt'} />
                  <textarea name="Comment" id="comment" cols="80" rows="2" placeholder='Add to the discussion' onChange={handleMessageChange} value={message}></textarea>
               </div>
               <div className="comment-button">
                  <button onClick={handleSubmitComment}>Submit</button>
                  <button onClick={handleCancel}>Cancel</button>
               </div>
            </div>
            {comment.length !== 0 && <div className='comment-text-display'>
               {comment.map((ele) => <CommentDisplay comment={ele} data={data} key={ele.id}/>)}
            </div>}
         </div>
      </>
   )
}

export default CommentView