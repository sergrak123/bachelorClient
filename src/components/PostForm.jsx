import React, {useState} from 'react';
import MyButton from "./UI/button/MyButton";

const PostForm = ({create}) => {
    //Когда много полей
    const [post, setPost] = useState({
        title: "",
        body: ""
    })

    function addNewPost(event) {
        event.preventDefault()

        // setPosts([...posts, {...post, id: Date.now()}])
        const newPost = {...post, id: Date.now()}
        create(newPost)
        setPost({title: "", body: ""})
    }


    return (
        <div>
            <form action="">
                <input
                    type="text"
                    placeholder="Name"
                    value={post.title}
                    onChange={event => setPost({...post, title: event.target.value})}
                />
                <input
                    value={post.body}
                    onChange={event => setPost({...post, body: event.target.value})}
                    type="text"
                    placeholder="Description"/>
                <MyButton onClick={addNewPost}>Add</MyButton>
            </form>

        </div>
    );
};

export default PostForm;