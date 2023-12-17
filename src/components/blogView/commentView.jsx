import React from 'react'
import brand from '../../Assets/Harshlogo.jpeg';

const CommentView = (props) => {
   const {data} = props;
   return (
      <>
         <div className="comments-blog-content">
            <div className="comment-header">
               <span>Top Comments (0)</span>
            </div>
            <div className='comment-text-area'>
               <img src={data.state.user ? data.state.user.picture : brand} alt={data.state.user ? data.state.user.name : 'alt'} />
               <textarea name="Comment" id="comment" cols="80"  rows="2" placeholder='Add to the discussion'></textarea>
            </div>
            <div className='comment-text-display'></div>
         </div>
      </>
   )
}

export default CommentView