import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './MyPost.css'
import axios from 'axios';
import MyPlaylist from './MyPlaylist';

const MyPost = () => {

    const [playlists, setPlaylists] = useState([]);
    const [posts, setPosts] = useState([]);
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    
  useEffect(() => {

    axios.get('http://127.0.0.1:3000/get/myPost', { headers })
      .then((response) => {
        setPosts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
      
  }, []);

	useEffect(() => {
		axios.get('http://127.0.0.1:3000/playlists/show/all',{ headers })
      .then((response) => {
        setPlaylists(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching playlists', error);
      });
	}, [])

	
  const handleDelete = (postId) => {
    axios.delete(`http://127.0.0.1:3000/delete/posts/${postId}`,{headers})
      .then((response) => {
        console.log(response.data);
        const revisionHistory = `User deleted the post ${postId}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisonHistory",JSON.stringify(revisionHistoryArray));   
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
    const dateObj = new Date();


    const year = dateObj.getFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const [showCommentPopup, setShowCommentPopup] = useState(false);
    const [newComment, setNewComment] = useState('');
  
  
    const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;

    function handlePlaylist() {
      const nameData = "Playlist " + (playlists.length + 1);
      const playlistdata ={name: nameData};
      axios.post('http://127.0.0.1:3000/playlists/create',playlistdata,{headers})
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("error",error);
        })
    }

  return (
    <>
      <div className='all-my-posts'>
        <h2 className='mypost'>My Posts</h2>
        {posts.map((post) => (
          <div key={post.id} className="post">
            <div className="post-details">
              <h3>{post.title}</h3>
              <p>Topic: {post.topic}</p>
              {/* <p>{post.text}</p> */}
              <p>Published on: {formattedDate}</p>
              <p>Author: {post.author_name}</p>
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
      <div className='all-my-playlists'>
				<h3 className='mypost'>My Playlists</h3>
				{playlists.map((playlist) => (
					<div className='playlist'>
						<h4 className='mypost'>{playlist.name}</h4>
						<MyPlaylist playlistId={playlist.id} />
					</div>
				))}
        <div className='create-playlist'>
        <button onClick={handlePlaylist}>Create Playlist</button>
        </div>
        
      </div>
    </>   
  );
};

export default MyPost;
