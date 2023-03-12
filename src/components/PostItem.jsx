import React from 'react';
import * as events from "events";

const PostItem = (props) => {

    return (
        <div>
            <div className="post">
                <div className="post__content">
                    <strong>{props.post.id}. {props.post.title}</strong>
                    <div>{props.post.body}</div>
                </div>

                <div className="post__btns">
                    <button onClick={() => props.remove(props.post)}>Delete</button>
                </div>

            </div>
        </div>
    );
};

export default PostItem;