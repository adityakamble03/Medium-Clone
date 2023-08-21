import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Draft.css'
import axios from 'axios';

const Draft = () => {

    const [drafts, setDrafts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    const [change,setChange]=useState('false');
    useEffect(() => {

        axios.get('http://127.0.0.1:3000/draft/get/all', { headers })
            .then((response) => {
                setDrafts(response.data);
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
                setDrafts(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.error('Error fetching posts:', error);
            });
    }

    return (
        <div>
            {/* <h2 className='mypost'>Drafts</h2> */}
            
            {drafts.map((draft) => (
                <div key={draft.id} className="post">
                    
                    <div className="post-details">
                        <h3>{draft.title}</h3>
                        <p>Topic: {draft.topic}</p>
                        {/* <p>{post.text}</p> */}
                        <p>Published on: {draft.published_at}</p>
                        <p>Author: {draft.author}</p>
                        <Link to={`/post/${draft.id}`}>View Details</Link>
                        <div className="edit-delete-options">
                            <Link to={`/post/${draft.id}/edit`}>Edit</Link>
                            <button onClick={() => handleDelete(draft.id)}>Delete</button>
                        </div>
                    
                    </div>
                    <img src={draft.image} alt={draft.title} />
                </div>

            ))}
        </div>
    );
};

export default Draft;