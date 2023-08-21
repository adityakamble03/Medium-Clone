import React, { useEffect, useState } from "react";
import './MyPlaylist.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
 
export default function MyPlaylist({ playlistId }) {
  const [playlist, setPlaylist] = useState([]);
  const [posts, setPosts] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
      'authToken': jwtToken,
  };

  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/playlists/show/playlist/post/${playlistId}`, {headers})
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts');
      })
  }, []);

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="post">
          <div className="post-details">
            <h3>{post.title}</h3>
            <p>Topic: {post.topic}</p>
            {/* <p>{post.text}</p> */}
            <p>Published on: {post.published_at}</p>

            <p>Author: {post.author_name}</p>
            <Link to={`/post/${post.id}`}>View Details</Link>
          </div>
          <img src={post.image} alt={post.title} />
        </div>
      ))}
    </>
  )
}