import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './SavedPost.css'
import axios from 'axios';

const SavedPost = () => {

    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    useEffect(() => {
        axios.get('http://127.0.0.1:3000/author/savedPosts', {headers})
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }, []);
  

    return (
        <div>
            <h2 className='mypost'>Saved Posts</h2>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    <div className="post-details">
                        <h3>{post.post_title}</h3>
                        <p>Topic: {post.topic}</p>
                        {/* <p>{post.text}</p> */}
                        
                        <p>Author: {post.author_name}</p>
                        <Link to={`/post/${post.post_id}`}>View Details</Link>
                    </div>
                    <img src={post.featured_image} alt={post.title} />
                </div>
            ))}
        </div>
    );
};

export default SavedPost;
