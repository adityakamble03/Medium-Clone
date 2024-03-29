import React from 'react';
import { useParams, Link } from 'react-router-dom';
import './PostDetail.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [comments, setComments] = useState([]);
  const [post, setPosts] = useState([]);
  const [isLiked, setIsLiked] = useState('false');
  const [isFollow, setIsFollow] = useState('false');
  const [ isSaved, setIsSaved ] = useState('true');
  const [isComment,setIsComment]=useState('false');
  const [playlists, setPlaylists] = useState([]);
  const jwtToken = localStorage.getItem('jwtToken');
  var flag=false;
  
  const headers = {
    'authToken': jwtToken
  };
  useEffect(() => {
    axios.get("http://127.0.0.1:3000/playlists/show/all", {headers})
      .then((response) => {
        setPlaylists(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("error fetching playlists", error);
      })
  })
  useEffect(() => {
    async function fetchMainData() {
      try {
        await axios.get(`http://127.0.0.1:3000/get/post/${postId}`)
        .then((response) => {
          setPosts(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);
  
        });
      } catch (error) {
        console.error('Error fetching main API data:', error);
      }
    }

    fetchMainData();
  }, []);


  useEffect(() => {
    axios.get(`http://127.0.0.1:3000/like/already/liked?post_id=${postId}`,{headers})
      .then((response) => {
        console.log("checklikedlogging");
        setIsLiked(response.data.success);
        console.log(response.data);
      })
      .catch((error) => {
        console.log("checklikedlogging");
        console.error('Error fetching posts:', error);
      });
  }, [isLiked])


  useEffect(() => {

   
    axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
      .then((response) => {
        setComments(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });
    axios.get(`http://127.0.0.1:3000/check/follow/${post.author_id}`, {}, {headers})
      .then((response) => {
        console.log("Checking Follow");
        setIsFollow(response.data.success);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);

      });

  }, []);




  const dateTimeString = post.published_at;

  const dateObj = new Date();


  const year = dateObj.getFullYear();
  const month = dateObj.getMonth() + 1;
  const day = dateObj.getDate();
  const [showCommentPopup, setShowCommentPopup] = useState(false);
  const [newComment, setNewComment] = useState('');


  const formattedDate = `${year}-${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
  const handleDislike = () => {
    axios.delete(`http://127.0.0.1:3000/like/remove/${postId}`,{headers})
      .then((response) => {
        setIsLiked(false);
        const revisionHistory = `User removed the like on ${postId}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
        console.log(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const handleLike = () => {

    axios.post(`http://127.0.0.1:3000/like/create/${postId}`,{},{headers})
      .then((response) => {
        setIsLiked(true);
        const revisionHistory = `User liked post number ${postId}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
        console.log(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });
  }
  const openCommentPopup = () => {
    setShowCommentPopup(true);
  };
  const closeCommentPopup = () => {
    setShowCommentPopup(false);
    setNewComment('');
  };

  const handleCommentChange = (event) => {
    setNewComment(event.target.value);
  };

  const handleSubmitComment = () => {
    if (newComment) {
      const Comment = {
        post_id: postId,
        text: newComment
      }
      setNewComment('');

      axios.post('http://127.0.0.1:3000/comment/create', Comment, { headers })
        .then((response) => {
          console.log("commented");
          // setComments(response.data);
          const revisionHistory = `User commented on post number${postId}`;
          const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
          revisionHistoryArray.push(revisionHistory);
          localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
          console.log(response.data);
          setIsComment(true);
          flag=true;
          console.log(response.data);
        })
        .catch((error) => {
          console.log('cannot put there');
          console.error('Error fetching posts:', error);

        });
      axios.get(` http://127.0.0.1:3000/comment/all/${postId}`)
        .then((response) => {
          setComments(response.data);
          console.log(response.data);
        })
        .catch((error) => {
          console.error('Error fetching posts:', error);

        });

    }

  };
  const handleFollow = () => {
    
    axios.post(`http://127.0.0.1:3000/author/follow/${post.author_id}`,{},{headers})
      .then((response) => {
        setIsFollow((prev)=>!prev);
        const revisionHistory = `User followed author ${post.author_id}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
        console.log(response.data);
      })
      .catch((error) => {
        console.log(headers);
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });


  }

  const handleSavePost = () => {
    axios.post(`http://127.0.0.1:3000/author/saveForLater/${postId}`, {}, { headers })
      .then((response) => {
        
        setIsSaved(true);
        const revisionHistory = `User saved the post ${postId}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
        console.log(response.data);
      })
      .catch((error) => {
        console.log('cannot put there');
        console.error('Error fetching posts:', error);

      });

  }
  function calculateReadingTime(text, wordsPerMinute = 200) {
    if (typeof text !== 'string' || text === null) {
      // Handle the case where text is not a string or is null
      return 0; // Return 0 reading time
    }
    const words = text.split(' ').filter(word => word !== ''); // Split text into words
    const wordCount = words.length;
    const minutes = wordCount / wordsPerMinute; // Calculate reading time in minutes
    const readingTime = Math.ceil(minutes); // Round up to the nearest minute
    return readingTime;
  }
  
  
  const readingTime = calculateReadingTime(post.text);

  const handlePlaylist = (e) => {
    const value = e.target.value;
    axios.post(`http://127.0.0.1:3000/playlists/add/post?playlist_id=${value}&post_id=${postId}`,{}, {headers})
    .then((response) => {
      console.log('Post saved to playlist')
    })
    .catch((error) => {
      console.error('error posting post to playlist',error);
    });
    navigate('/');
  }
  
  
  return (
    <div className="post-details-container">

      <div className="post-details">

        <h3 className='post-title'>{post.title}</h3>
        <p className='post-topic'>{post.topic}</p>
        <div className='author-container'>
          <div className='top-container'>
            <i class="fa fa-user fa-lg"></i>
            <a href={`/authorprofile/${post.author_id}`} className='author'>{post.author_name}</a>
            <a onClick={handleFollow} style={{ textDecoration: 'none', marginRight: '15px' }} >{isFollow ? 'Follow' : 'Following'}</a>
          </div>
          <div className='bottom-container'>
            <p className='published-at'>{formattedDate}</p>
            <p  >{readingTime} Minutes Read</p>
            <i onClick={openCommentPopup} class="fa fa-comment"></i>
            
            <p>{post.comments_count}</p> 
            {isLiked ? <i onClick={handleDislike} class="bi bi-hand-thumbs-up-fill fs-4" ></i> : <i onClick={handleLike} class="bi bi-hand-thumbs-up fs-4"></i>}
            {isLiked ? <p>{post.likes_count + 1}</p> : <p>{post.likes_count}</p>}

            {
              isSaved ?  <i onClick={handleSavePost} class="bi bi-bookmark"></i>:<i class="bi bi-bookmark-fill"></i> 
            }
            
            <select name="playlists" onChange={handlePlaylist}>
              <option value=''>Select Playlist</option>
              {playlists.map((playlist) => (
                <option key={playlist.id} value={playlist.id}>
                  {playlist.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {showCommentPopup && (
          <div className="comment-popup">
            <div className="close-button-container">
              <button onClick={closeCommentPopup}>X</button>
            </div>
            <textarea
              rows="4"
              cols="50"
              value={newComment}
              onChange={handleCommentChange}
              placeholder="Enter your comment..."
            />
            <button onClick={handleSubmitComment}>Submit</button>
            <ul>
              {comments.map((comment, index) => (
                <li key={index} className="comment-box">
                  <p className="comment-author">{comment.author_name}</p>
                  <p className="comment-date">{comment.comment_date}</p>
                  <p className="comment-text">{comment.text}</p>
                </li>
              ))}
            </ul>
          </div>
        )}

        <img src={post.image} alt={post.title} />

        <p className='post-text'>{post.text}</p>

      </div>


    </div>
  );
};

export default PostDetail;