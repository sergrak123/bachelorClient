import axios from "axios";

export default class PostService {
    static async getAll(limit = 10, page = 1) {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts", {
                params: {
                    _limit: limit,
                    _page: page
                }
            })
            // return response.data
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    static async getById(id) {
        try {
            const response = await axios.get('https://jsonplaceholder.typicode.com/posts/' + id)
            console.log(response)
            // return response.data
            return response;
        } catch (e) {
            console.log(e)
        }
    }

    static async getCommentsById(id) {
        try {
            const response = await axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            console.log(response)
            // return response.data
            return response;
        } catch (e) {
            console.log(e)
        }
    }

}