import React, { useRef, useState } from "react";
import ReactSummernote from "react-summernote";
import "react-summernote/dist/react-summernote.css"; // import styles
import './blogeditor.css';

// Import bootstrap(v3 or v4) dependencies
import "bootstrap/js/modal";
import "bootstrap/js/dropdown";
import "bootstrap/js/tooltip";
import "bootstrap/dist/css/bootstrap.css";

const Blogeditor = () => {
   const hiddenFileInput = useRef(null);
   const [image, setImage] = useState('');
   const [disable, setDisable] = useState('preview-container');

   const [description, setDescription] = useState('')
   const [title, setTitle] = useState("")

   const onChange = (e) => {
      setDescription(e)
   };

   const onChange2 = (e) => {
      e.preventDefault();
      setTitle(e.target.value );
   };

   // const onKeyDown = (e)=>{
   //    console.log(e.target);
   // }

   const handleClick = () => {
      hiddenFileInput.current.click();
   };

   const handlePreview = () => {
      setDisable('preview-container');
   }

   const Reset = () =>{
      setDescription('');
      setTitle('');
      handlePreview();
   }

   const handleChange = async (e) => {
      e.preventDefault();
      let reader = new FileReader();
      reader.readAsDataURL(e.target.files[0]);
      reader.onload = async function () {

         const formData = new FormData();
         formData.append('file', e.target.files[0]);

         const response = await fetch('http://localhost:4000/images/upload', {
            method: 'POST',
            headers: {
               "auth-token": localStorage.getItem('userDetails')
            },
            body: formData,
         })
         const json = await response.json();
         setDisable('button-preview');
         setImage(`http://localhost:4000${json.url}`);
         e.target.value = '';
      }
   }

   const onImageUpload = (image, insertImage) => {
      let reader = new FileReader();
      reader.readAsDataURL(image[0]);
      reader.onload = async function () {

         const formData = new FormData();
         formData.append('file', image[0]);

         const response = await fetch('http://localhost:4000/images/upload', {
            method: 'POST',
            headers: {
               "auth-token": localStorage.getItem('userDetails')
            },
            body: formData
         })
         const json = await response.json();
         image[0].url = `http://localhost:4000${json.url}`;
         insertImage(image[0].url, ($image) => {
            $image.css("width", Math.floor($image.width() / 2));
            $image.attr("alt", $image.name);
         });
      };
      reader.onerror = function (error) {
         console.log("Error: ", error);
      };
   }

   const submitBlog = async () => {
      const response = await fetch('http://localhost:4000/upload/blog-post', {
         method: 'POST',
         headers: {
            'Content-Type': ' application/json ',
            'auth-token': localStorage.getItem('userDetails')
         },
         body: JSON.stringify({
            "title": title,
            "description": description,
            "imageCover": image
         })
      })
      Reset();
   }
   return (
      <div className="editor">
         <div className="top-content">
            <div className="input-title" >
               <label htmlFor="title"> Title </label>
               <input type="text" id="title" name="title" placeholder="Title" onChange={onChange2} value={title}/>
            </div>
            <div className="cover-image" >
               <label htmlFor="cover-image">Cover Image</label>
               <div className="input-title-preview">
                  <div className={disable === "button-preview" ? "disable" : "button-preview"}>
                     <p>Upload Cover Image</p>
                     <input type="file" name="cover-image" id="imageInput" accept="image/*" ref={hiddenFileInput} onChange={handleChange}/>
                     <button className="cover-image-button" onClick={handleClick}>Upload Image</button>
                  </div>
                  <div className={disable === "preview-container" ? "disable" : "preview-container"}>
                     <img src={image} alt="Cover-Pic" />
                     <button className="disable-button" onClick={handlePreview}>X</button>
                  </div>
               </div>
            </div>
         </div>
         <ReactSummernote
            options={{
               disableDragAndDrop: true,
               height: 500,
               toolbar: [
                  ["style", ["style"]],
                  ["font", ["bold", "underline", "clear"]],
                  ["fontname", ["fontname"]],
                  ["para", ["ul", "ol", "paragraph"]],
                  ["table", ["table"]],
                  ["insert", ["ajaximageupload", "link", "picture", "video"]],
                  ["view", ["fullscreen", "codeview"]],
                  ["Misc", ["undo", "redo"]]
               ],
            }}
            value={description}
            onChange={onChange}
            onImageUpload={onImageUpload}
         />
         <div className="buttons-end">
            <button className="reset-button" onClick={Reset}>Reset</button>
            <button className="submit-button" onClick={submitBlog}>Submit</button>
         </div>
      </div>
   );
}


export default Blogeditor;
