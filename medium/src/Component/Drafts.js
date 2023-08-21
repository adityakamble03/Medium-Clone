import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Draft.css'
import axios from 'axios';

const Draft = () => {

    // const [drafts, setDrafts] = useState([]);
    // const jwtToken = localStorage.getItem('jwtToken');
    // const headers = {
    //     'authToken': jwtToken,
    // };
    // const [change,setChange]=useState('false');
    // useEffect(() => {

    //     axios.get('http://127.0.0.1:3000/draft/get/all', { headers })
    //         .then((response) => {
    //             setDrafts(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching posts:', error);

    //         });
    // }, [change]);
    // const handleDelete = (postId) => {
        
    //     axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
    //         .then((response) => {
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching posts:', error);

    //         });
    //         axios.get('http://127.0.0.1:3000/get/myPost', { headers })
    //         .then((response) => {
    //             setDrafts(response.data);
    //             console.log(response.data);
    //         })
    //         .catch((error) => {
    //             console.error('Error fetching posts:', error);
    //         });
    // }

    const draftArray = JSON.parse(localStorage.getItem("draft"));

    return (
        <div>
            {/* <h2 className='mypost'>Drafts</h2> */}
            
            {draftArray.map((draft,index) => (
                <div key={draft.title} className="post">
                    
                    <div className="post-details">
                        <h3>Draft no.{index}</h3>
                        <h3>Title{draft.title}</h3>
                        <p>Topic: {draft.topic}</p>
                        {/* <p>{post.text}</p> */}
                        <div className="edit-delete-options">
                            <button>Edit</button>
                            <button>Delete</button>
                        </div>
                    
                    </div>
                    <img src={draft.featured_image} alt={draft.title} />
                </div>

            ))}
        </div>
    );
};

export default Draft;