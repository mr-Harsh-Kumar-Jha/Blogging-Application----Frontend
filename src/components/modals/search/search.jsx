import React, { useEffect, useRef } from 'react'
import { useState } from 'react'
import { BsSearch } from 'react-icons/bs';
import './search.css';

const Search = ({ onClose, btnRef }) => {
   const [actualContent, setActualContent] = useState(false);
   const ref = useRef();
   const handleSearchChange = (e) => {
      if (e.target.value !== '') {
         setActualContent(true);
      } else {
         setActualContent(false);
      }
   }

   useEffect(() => {
      function checkIfClickedOutside(e) {
         if(ref.current && !ref.current.contains(e.target) && !btnRef.contains(e.target)){
            onClose();
         }
      }
      document.addEventListener("click", checkIfClickedOutside)
      return () => {
         document.removeEventListener("click", checkIfClickedOutside)
      }
   }, [onClose, btnRef])
   return (
      <>
         <div className="searchModal-container">
            <div className="form-SearchModal" ref={ref}>
               <form className='mainForm-content-Search'>
                  <input type="text" name="search" id="search-bar" onChange={handleSearchChange} placeholder='Start typing to search' />
               </form>
               <div className="actual-search-content">
                  {actualContent ? 'hello' : <div className="display-content-search">
                     <BsSearch style={{ fontSize: '2em' }} />
                     <p>Search articles from this blog</p>
                  </div>
                  }
               </div>
            </div>
         </div>
      </>
   )
}

export default Search