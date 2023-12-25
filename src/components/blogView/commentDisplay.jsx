import React, { useEffect, useState } from 'react'
import brand from '../../Assets/Harshlogo.jpeg';

const CommentDisplay = (props) => {
   const { comment, data } = props;
   const [user, setUser] = useState({});
   useEffect(() => {
      const getBlogContent = async () => {
         const resUser = await fetch(`http://localhost:4000/auth/getuser/${comment.userID}`, {
            method: 'GET'
         })
         const userJson = await resUser.json();
         setUser(userJson)
      }
      getBlogContent()
   }, [comment.userID])
   return (
      <>
         <div className="comment-display-container">
            <div className="main-comment-display">
               <img src={user ? user.picture : brand} alt={user ? user.name : 'alt'} />
               <div className="text-display">
                  <div className="comment-display-header">
                     <h5>{user ? user.name : "company"}</h5>
                     <div className='small-line-differentiator'></div>
                     <h5>{comment.date? new Date(comment.date).toLocaleDateString('en-us', {day:'2-digit', month:'long', year:'numeric'}): " "}</h5>
                  </div>
                  <span>{comment.message ? comment.message : "hello brother"}</span>
               </div>
            </div>
            <div className="comment-button">
               <button>Reply</button>
              {data.state.user && data.state.user._doc._id===comment.userID&& <button>Delete</button>}
            </div>
         </div>
         <div style={{ padding: '20px' }}>
            {comment.childComments && comment.childComments.length !== 0 && comment.childComments.map((ele) => (
               <CommentDisplay key={ele.id} comment={ele} data={data} />
            ))}
         </div>
      </>
   )
}

export default CommentDisplay