import React from 'react';
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetchList } from '../helpers'
import Post from '../components/Post';


const PostList = () => {

    const { data, loading, error } = useFetchList(api.posts.list) // Custom hook
    
    return (
        <div>
            <h1 className="block-title">New entries</h1>
            {error && <Message color="red" message={error} />}
            {loading && <Loader />}
            {!loading && <Post data={data} />}
        </div>
    );
}

export default PostList;

