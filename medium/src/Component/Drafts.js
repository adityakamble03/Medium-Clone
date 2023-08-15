import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Draft.css'
import axios from 'axios';
import MyPost from './MyPost';

const Draft = () => {

    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    const [change,setChange]=useState('false');
    useEffect(() => {

        axios.get('http://127.0.0.1:3000/draft/get/all', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }, [change]);
    const handleDelete = (postId) => {
        
        axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
            .then((response) => {
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
            axios.get('http://127.0.0.1:3000/get/myPost', { headers })
            .then((response) => {
                setPosts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);

            });
    }

    return (
        <div>
            {/* <h2 className='mypost'>Drafts</h2> */}
            <MyPost/>
            {posts.map((post) => (
                <div key={post.id} className="post">
                    
                    <div className="post-details">
                        <h3>{post.title}</h3>
                        <p>Topic: {post.topic}</p>
                        {/* <p>{post.text}</p> */}
                        <p>Published on: {post.published_at}</p>
                        <p>Author: {post.author}</p>
                        <Link to={`/post/${post.id}`}>View Details</Link>
                        <div className="edit-delete-options">
                            <Link to={`/post/${post.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(post.id)}>Delete</button>
                        </div>
                    
                    </div>
                    <img src={post.image} alt={post.title} />
                </div>





            ))}
        </div>
    );
};

export default Draft;