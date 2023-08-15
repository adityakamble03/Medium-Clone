import React, { useState,useEffect } from 'react';
import axios from 'axios'; // Import Axios for API calls
import './AddPost.css';
import { useNavigate } from 'react-router-dom';

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [imageFile, setImageFile] = useState(null); // State to store the selected image file
  const [text, setText] = useState('');
  const jwtToken = localStorage.getItem('jwtToken');
   
  const headers = {
    'authToken': jwtToken,
  };
  useEffect(()=>{
    if(!jwtToken)
    {
        navigate('/login');

    }

  })
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('image', file, 'filename.jpg', { charset: 'utf-8' });
   
    axios.post('http://127.0.0.1:3000/upload',formData,{headers}).then((response)=>{
        setImageFile(response.data.file_url);
    })
    .catch((error)=>{
        console.log("hello");
        console.error(error);
    })
    setImageFile(file);
  };
  
  const handleSave = () => {
    const postData = {
        title: title,
        topic: topic,
        text: text,
        author_id:1,
        featured_image:imageFile
      };


    axios.post('http://127.0.0.1:3000/create/post', postData,{headers})
      .then((response) => {
        console.log('Post saved!', response.data);
      })
      .catch((error) => {
        console.error('Error saving post:', error);
        // Implement error handling logic here
      });
      navigate('/');
  };

  const handleSaveDraft = () => {
    const postData = {
        title: title,
        topic: topic,
        text: text,
        author_id:1,
        featured_image:imageFile
      };


    axios.post('http://127.0.0.1:3000/draft/create', postData,{headers})
      .then((response) => {
        console.log('Post saved!', response.data);
      })
      .catch((error) => {
        console.error('Error saving post:', error);
        // Implement error handling logic here
      });
      navigate('/');
  };


  return (
    <div className="add-post-container">
      <h2>Add Post</h2>
      <div className="form-group">
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="form-group">
        <label>Topic:</label>
        <input type="text" value={topic} onChange={(e) => setTopic(e.target.value)} />
      </div>

      <div className="form-group">
        <label>Featured Image:</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>
      <div className="form-group">
        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className='save-buttons'>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
      <button className="save-button" onClick={handleSaveDraft}>
        Save As Draft
      </button>
      </div>
    </div>
  );
};

export default AddPost;

