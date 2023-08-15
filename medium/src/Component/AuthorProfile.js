import React, { useState,useEffect } from 'react';
import { useParams } from 'react-router-dom';
import './AuthorProfile.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
const AuthorProfile = () => {
  const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [posts, setPosts] = useState([]);
  const [authorDetails,setAuthorDetails]=useState('');
  useEffect(() => {

    axios.get(`http://127.0.0.1:3000/get/post/author/${authorId}`)
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
      axios.get(`http://127.0.0.1:3000/author/details/${authorId}`)
      .then((response) => {
        setAuthorDetails(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
      


  }, []);







  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="author-profile">
      <div className="author-header">
        <h2>{authorDetails.name}</h2>
        <div className="author-tabs">
          <button
            className={activeTab === 'home' ? 'active' : ''}
            onClick={() => handleTabChange('home')}
          >
            Home
          </button>
          <button
            className={activeTab === 'about' ? 'active' : ''}
            onClick={() => handleTabChange('about')}
          >
            About
          </button>
        </div>
      </div>
      <div className="author-content">
        {activeTab === 'home' ? (
          <div>
          <h2 className='mypost'>My Posts</h2>
          {posts.map((post) => (
              <div key={post.id} className="post">
                  
                  <div className="post-details">
                      <h3>{post.title}</h3>
                      <p>Topic: {post.topic}</p>
                      {/* <p>{post.text}</p> */}
                      <p>Published on: {post.published_at}</p>
                      <p>Author: {post.author}</p>
                      <Link to={`/post/${post.id}`}>View Details</Link>
                  
                  </div>
                  <img src={post.image} alt={post.title} />
              </div>





          ))}
      </div>
        ) : (
        /* Content for About tab */
        <div class="author-section">
    <h1>Number Of Followers: {authorDetails.followers_count}</h1>
    <h1>Email: {authorDetails.email}</h1>
    <p>{authorDetails.about || 'No Bio Added'}</p>
  </div>
        )}
      </div>
    </div>
  );
};

export default AuthorProfile;
