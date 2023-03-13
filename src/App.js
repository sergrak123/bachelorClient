import React, {useEffect, useMemo, useRef, useState} from "react";
import Counter from "./components/Counter";
import "./App.css"
import PostItem from "./components/PostItem";
import PostList from "./components/PostList";
import MyButton from "./components/UI/button/MyButton";
import PostForm from "./components/PostForm";
import Myselect from "./components/UI/select/Myselect";
import PostFilter from "./components/PostFilter";
import MyModal from "./components/UI/MyModal/MyModal";
import {usePosts} from "./hooks/usePosts";
import axios from "axios";
import PostService from "./API/PostService";
import {useFetching} from "./hooks/useFetching";
import {getPagesArray, getPagesCount} from "./utils/pages";
import myButton from "./components/UI/button/MyButton";

function App() {

    const [posts, setPosts] = useState([])

    // const [selectedSort, setSelectedSort] = useState("")
    // const [searchQuery, setSearchQuery] = useState("")
    const [filter, setFilter] = useState({sort: "", query: ""})
    const [modal, setModal] = useState(false);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(10)
    const [page, setPage] = useState(1)
    let pagesArray = getPagesArray(totalPages)

    const sortedAndSearchPosts = usePosts(posts, filter.sort, filter.query);
    // const [isPostLoading, setIsPostsLoading] = useState(false)

    //1 или передавать тут параметры limit page для вызова сразу без оптимизации
    const [fetchPosts, isPostsLoading] = useFetching(async () => {
        const response = await PostService.getAll(limit, page);
        setPosts(response.data)
        const totalCount = response.headers["x-total-count"]
        setTotalPages(getPagesCount(totalCount, limit))
    })

    // const sortedPost = useMemo(() => {
    //     console.log("call")
    //     if (filter.sort) {
    //         return [...posts].sort((a, b) => a[filter.sort].localeCompare(b[filter.sort]))
    //     }
    //     return posts;
    // }, [filter.sort, posts])
    //
    // const sortedAndSearchPosts = useMemo(() => {
    //     return sortedPost.filter(post => post.title.toLowerCase().includes(filter.query.toLowerCase()))
    // }, [filter.query, sortedPost])

    //delete for find mtd
    // const [title, setTitle] = useState("")
    // const [body, setBody] = useState("")

    //Когда много полей
    // const [post, setPost] = useState({
    //     title: "",
    //     body: ""
    // })

    //better dont use 2 связыаание
    // const bodyInputRef = useRef()

    // function addNewPost(event) {
    //     event.preventDefault()
    //
    //     //Убираем тк вынесли все отдельно
    //     // setPosts([...posts, {
    //     //     id: Date.now(),
    //     //     title,
    //     //     body
    //     // }])
    //     setPosts([...posts, {...post, id: Date.now()}])
    //
    //     //Можно так но проше ->
    //     // setPost({...post, title: ""})
    //     // setPost({...post, body: ""})
    //
    //     setPost({title: "", body: ""})
    // }

    useEffect(() => {
        fetchPosts()
    }, [page])

    function createPost(newPost) {
        setPosts([...posts, newPost])
        setModal(false)
    }

    // async function fetchPosts(){
    //     setIsPostsLoading(true)
    //
    //     setTimeout(async ()=>{
    //
    //         setIsPostsLoading(false)
    //     }, 2000)
    //
    // }

    function removePost(post) {
        //фильтруем и возвращаем новый чтобы соотв условию
        setPosts(posts.filter(p => p.id !== post.id))
    }

    //С запазданием
    function changePage(page) {
        setPage(page)
        //2 и вызывать тут с параметрами этими
        // fetchPosts()

    }

    // function sortPost(sort) {
    //     setSelectedSort(sort)
    //     console.log(sort)
    // }


    return (
        <div className="App">
            <button onClick={fetchPosts}>GET</button>
            <button onClick={() => setModal(true)}>Add new post</button>
            <MyModal visible={modal} setVisible={setModal}>
                <PostForm create={createPost}/>
            </MyModal>

            <hr/>
            <PostFilter
                filter={filter}
                setFilter={setFilter}
            />
            {isPostsLoading
                ? <h1>Load...</h1>
                : <PostList posts={sortedAndSearchPosts} remove={removePost}/>
            }
            <div style={{marginTop: 30}}>
                {pagesArray.map(p =>
                    <button
                        key={p}
                        onClick={() => changePage(p)}
                    >{p}
                    </button>
                )}
            </div>

        </div>
    );
}

export default App;
