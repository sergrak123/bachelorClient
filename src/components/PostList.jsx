import React from 'react';
import PostItem from "./PostItem";

const PostList = ({posts, remove}) => {

    if(!posts.length){
        return (
            <div>Постов нет</div>
        )
    }
    return (
        <div>
            <h1>Список</h1>
            {/*//index не желательно тк меняется при удалении и заново перерисовыввает .....(/)______*/}
            {posts.map(post =>
                <PostItem post={post} key = {posts.id} remove={remove}></PostItem>)}

        </div>
    );
};

export default PostList;