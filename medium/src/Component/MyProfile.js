import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './MyProfile.css';
import MyPost from './MyPost';
import axios from 'axios';

const MyProfile = () => {
//  const { authorId } = useParams();
  const [activeTab, setActiveTab] = useState('home');
  const [aboutText, setAboutText] = useState('');
  const [authorDetails,setAuthorDetails]=useState('');
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    'authToken': jwtToken
  };

  
  useEffect(()=>{
    console.log(headers);
    axios.get('http://127.0.0.1:3000/author/my/details',{headers})
      .then((response) => {
        setAuthorDetails(response.data);
        setAboutText(response.data.about)
        console.log(response.data);
      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });


  },[])
  

  
  const handleAboutSubmit = () => {
    const val={
      about:aboutText
    }
    console.log(val);
    console.log(headers);
    axios.put('http://127.0.0.1:3000/authors/edit',{val},{headers})
      .then((response) => {
        
        console.log(response.data);

      })
      .catch((error) => {
        console.error('Error fetching posts:', error);
      });


  };
  const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));


  return (
    <div className="author-profile">
      <div className="author-header">
        <h2>Author Name:- {authorDetails.name}</h2>
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

          <MyPost/>
        ) : (
          /* Content for About tab */
          <div>
          
            <div class="author-section">
    {localStorage.getItem('payment') ? (<h3>Premium member</h3>) : (null)}
    <h1>Followers: {authorDetails.followers_count}</h1>
    <h1>Email: {authorDetails.email}</h1>
    <p>{aboutText || 'No Bio Added'}</p>
    <h1>Revision History:-</h1>
    {revisionHistoryArray.map((revisionHistory) => (
      <>
        <p>{revisionHistory}</p>
      </>
    ))}
  </div>

            <div>
            <textarea
              className='bio-textarea'
              value={aboutText}
              onChange={(e) => setAboutText(e.target.value)}
              placeholder="Update About..."
            />
            <div className='update-button'>
              <button onClick={handleAboutSubmit}>Update About</button>
            </div>
          </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyProfile;
