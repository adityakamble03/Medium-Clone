import React, { useState } from 'react';
import axios from 'axios'; 
import './AddPost.css';
import { useNavigate,useParams } from 'react-router-dom';
import { useEffect } from 'react';


const EditPost = () => {


  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [topic, setTopic] = useState('');
  const [imageFile, setImageFile] = useState(null); 
  const [text, setText] = useState('');
  const { postId } = useParams();
  const jwtToken = localStorage.getItem('jwtToken');
   
  const headers = {
    'authToken': jwtToken,
  };

  useEffect(() => {
    
    axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
      .then((response) => {
        setTitle(response.data.title);
        setTopic(response.data.topic);
        setText(response.data.text);
        setImageFile(response.data.imageFile);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
    
      });
  }, [postId]);



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
  };

  const handleSave = () => {
    const postData = {
        title: title,
        topic: topic,
        text: text,
        author_id: 1,
        featured_image:imageFile
      };

      const revisionHistory = `User edited the blog titled ${title}`;
      const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
      revisionHistoryArray.push(revisionHistory);
      localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
      
    axios.put(`http://127.0.0.1:3000/edit/post/${postId}`, postData,{headers})
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
        <input type="file" accept="image/*"  onChange={handleImageChange} />
      </div>
      <div className="form-group">
        <label>Text:</label>
        <textarea value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <button className="save-button" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default EditPost;

