import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {useFetching} from "../hooks/useFetching";
import PostService from "../API/PostService";

const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({})
    const [comments, setComments] = useState([])
    const [fetchPostById, isLoading] = useFetching(async (id) => {
        const response = await PostService.getById(id)
        setPost(response.data)
    })

    const [fetchCommentsById, isCommentLoading] = useFetching(async (id) => {
        const response = await PostService.getCommentsById(id)
        setComments(response.data)
    })

    useEffect(() => {
        fetchPostById(params.id)
        fetchCommentsById(params.id)
    }, [])

    return (
        <div>
            <h1>Страница поста {params.id}</h1>
            {isLoading ? <h1>Loading...</h1> : (post === null ? null : <div>{post.id} {post.title}</div>)}
            <h1>Comments</h1>
            {isCommentLoading
                ?<h1>Loading...</h1>
                :<div>
                    {comments.map(comm=>
                        <div>
                            <h5>{comm.email}</h5>
                            <div>{comm.body}</div>
                        </div>
                    )}
                </div>}
        </div>
    );
};

export default PostIdPage;