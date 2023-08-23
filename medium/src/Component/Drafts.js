import React, { useState } from 'react';
import './Draft.css';
import axios from 'axios';

const Draft = () => {
    const [drafts, setDrafts] = useState(
        JSON.parse(localStorage.getItem("draft")) || []
    );
    const jwtToken = localStorage.getItem('jwtToken');
    const headers = {
        'authToken': jwtToken,
    };
    const [editIndex, setEditIndex] = useState(null);
    const [editedDraft, setEditedDraft] = useState({
        title: '',
        topic: '',
        text: '',
    });

    function handleEdit(index) {
        setEditIndex(index);
        const draftToEdit = drafts[index];
        setEditedDraft({
            title: draftToEdit.title,
            topic: draftToEdit.topic,
            text: draftToEdit.text,
        });
    }

    function handleDelete(index) {
        const updatedDrafts = drafts.filter((_, i) => i !== index);
        setDrafts(updatedDrafts);
        localStorage.setItem("draft", JSON.stringify(updatedDrafts));
    }

    function handlePublish(index) {
        const postData = {
            title: drafts[index].title,
            topic: drafts[index].topic,
            text: drafts[index].text,
          };
    
        const revisionHistory = `User created the blog titled ${drafts[index].title}`;
        const revisionHistoryArray = JSON.parse(localStorage.getItem("revisionHistory"));
        revisionHistoryArray.push(revisionHistory);
        localStorage.setItem("revisionHistory",JSON.stringify(revisionHistoryArray));
    
        axios.post('http://127.0.0.1:3000/create/post', postData,{headers})
          .then((response) => {
            console.log('Post saved!', response.data);
          })
          .catch((error) => {
            console.error('Error saving post:', error);
            // Implement error handling logic here
          });
            const updatedDrafts = drafts.filter((_, i) => i !== index);
            setDrafts(updatedDrafts);
            localStorage.setItem("draft", JSON.stringify(updatedDrafts));
            
    }

    function handleSave(index) {
        const updatedDrafts = [...drafts];
        updatedDrafts[index] = editedDraft;
        setDrafts(updatedDrafts);
        localStorage.setItem("draft", JSON.stringify(updatedDrafts));
        setEditIndex(null);
    }

    function handleCancelEdit() {
        setEditIndex(null);
        setEditedDraft({
            title: '',
            topic: '',
            text: '',
        });
    }

    return (
        <div>
            <h2 className='mypost'>Drafts</h2>
            {drafts.map((draft, index) => (
                <div key={draft.title} className="post">
                    {editIndex === index ? (
                        <div className="post-details">
                            <h3>Edit Draft</h3>
                            <input
                                className='draft-input'
                                type="text"
                                value={editedDraft.title}
                                onChange={(e) =>
                                    setEditedDraft({
                                        ...editedDraft,
                                        title: e.target.value,
                                    })
                                }
                            /><br/>
                            <input
                                className='draft-input'
                                type="text"
                                value={editedDraft.topic}
                                onChange={(e) =>
                                    setEditedDraft({
                                        ...editedDraft,
                                        topic: e.target.value,
                                    })
                                }
                            />
                            <textarea
                                value={editedDraft.text}
                                onChange={(e) =>
                                    setEditedDraft({
                                        ...editedDraft,
                                        text: e.target.value,
                                    })
                                }
                            />
                            <div className="edit-delete-options">
                                <button onClick={() => handleSave(index)}>Save</button>
                                <button onClick={() => handleCancelEdit()}>Cancel</button>
                            </div>
                        </div>
                    ) : (
                        <div className="post-details">
                            <h3>Draft no.{index + 1}</h3>
                            <h3>Title: {draft.title}</h3>
                            <p>Topic: {draft.topic}</p>
                            <p>{draft.text}</p>
                            <div className="edit-delete-options">
                                <button onClick={() => handleEdit(index)}>Edit</button>
                                <button onClick={() => handleDelete(index)}>Delete</button>
                                <button onClick={() => handlePublish(index)}>Publish</button>
                            </div>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default Draft;
