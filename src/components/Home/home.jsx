import React, {useContext, useEffect, useState} from 'react'
import './home.css';
import brand from '../../Assets/harshJha2.jpg';
import  {UserContext}  from "../../userContext/userContext.jsx";
// import post from '../../Assets/Harshlogo.jpeg';
// import AuthorInfo from '../general/authorInfoSubinfo/authorInfo.jsx';
import CardDisplayBlogs from '../general/cardDisplayblogs/cardDisplayBlogs';
import { useNavigate, useLocation } from 'react-router-dom';

const Home = () => {
   const navigate = useNavigate();
   const data = useContext(UserContext);
	const location = useLocation();
	const queryParams = new URLSearchParams(location.search);
	const userInfo = queryParams.get("jsonData");
   const userRole = queryParams.get("role");
   const authToken = queryParams.get("authToken");
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

	if (userInfo && userRole) {
		localStorage.setItem("userDetails", authToken);
		data.dispatch({
			type: "signin",
			payload: {
            user:JSON.parse(userInfo),
            role: userRole,
            history:localStorage.getItem('recentBrowse')
         }
		});
		navigate(data.state.history);
	}

   const mainContainerContent = [
      {
         "class": "main-contents-1",
         "size": "big"
      },
      {
         "class": "main-contents-2",
         "size": "small"
      },
      {
         "class": "main-contents-3",
         "size": "small"
      }
   ]
   return (
      <>
         <div className="home-container">
            <div className="main-home-container">
               {blogs.length!==0 && mainContainerContent.map((item,i) =>{
                  if(i<blogs.length)
                     return <CardDisplayBlogs className={item.class} blog={blogs[i]} size={item.size} key={i}/>})}
            </div>
            <div className="brief-info-home">
               <div className="brand-brifing-home">
                  <img src={brand} alt="Harsh Jha" style={{ height: '15rem', width: '15rem', borderRadius: '50%' }} />
                  <h2>Harsh Jha</h2>
               </div>
               <div className="brand-info-brifing-home">
                  <p>I like problem solving, designing websites, learning new technologies, discussing ideas, and meeting new people bundled with a deep passion for building things from scratch. I have an immense craze for DIYs, fiction, country music, and movies.</p>
               </div>
            </div>
            <div className="total-posts-container-home">
               {blogs.length && blogs.map((blog, i) =>
                  <div className="actual-post-container-home" key={i}>
                     <CardDisplayBlogs size={'small'} blog={blog} disable={true} />
                  </div>
               )}
            </div>
         </div>
      </>
   )
}

export default Home