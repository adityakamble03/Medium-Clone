import React, { useState } from 'react';
import './Draft.css'


const Draft = () => {

    let draftArray = [];
    if(localStorage.getItem("draft") === null){
        draftArray = [];
    }
    else{
        draftArray = JSON.parse(localStorage.getItem("draft"));
    }
    const [drafts,setDrafts] = useState(draftArray);
    const [isEdit,setIsEdit] = useState(false);
    const [topic, setTopic] = useState('');
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
    
    
    function handleEdit(index) {
        setIsEdit(true);
    }

    function handleDelete(index) {
        return setDrafts(drafts.filter((draft) => draft.title !== drafts[index].title));
    }

    function handleOnChange(e) {
        setTopic(e.target.value);
    }
    return (
        <div>
            <h2 className='mypost'>Drafts</h2>
            
            {drafts.map((draft,index) => (
                <div key={draft.title} className="post">
                    
                    {isEdit ? 
                    (<>
                        <div className="post-details">
                            <h3>Draft no.{draft.index}</h3>
                            <input type="text" value={topic} onChange={handleOnChange}></input>

                        </div>
                    </>) : 
                    (<>
                        <div className="post-details">
                            <h3>Draft no.{index+1}</h3>
                            <h3>Title:- {draft.title}</h3>
                            <p>Topic: {draft.topic}</p>
                            {/* <p>{post.text}</p> */}
                            <a href=''>View details</a>
                            <div className="edit-delete-options">
                                <button onClick={()=>{handleEdit(index)}}>Edit</button>
                                <button onClick={()=>{handleDelete(index)}}>Delete</button>
                            </div>
                        </div>
                    </>)}
                    
                    <img src={draft.image} alt={draft.title} />
                </div>
            ))}
        </div>
    );
};

export default Draft;