import React, { useContext, useRef, useState } from 'react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import 'react-markdown-editor-lite/lib/index.css';
import { Button, Form } from 'semantic-ui-react'
import { navigate } from "@reach/router"
import Message from '../components/Message';
import { api } from '../api'
import { authAxios, authenticationService } from '../services'
import Login from './Login';
import AuthContext from '../context/AuthContext';

const PostCreate = () => {
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [markdown, setMarkdown] = useState("");
    const [thumbnail, setThumbnail] = useState(null);

    const fileInputRef = useRef()

    const { auth } = useContext(AuthContext);

    const mdParser = new MarkdownIt(/* Markdown-it options */);

    function handleSubmit(e) {
        e.preventDefault();
        setLoading(true)

        const formData = new FormData()
        formData.append("thumbnail", thumbnail)
        formData.append("title", title)
        formData.append("description", description)
        formData.append("content", markdown)

        authAxios
            .post(api.posts.create, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError("All fields are required" || err)
                setLoading(false)
            })
    }

    if (!auth) {
        console.log(authenticationService.isAuthenticated)
        return <Login path='/login' />
    }

    return (
        <div>
            <h2 className="create-title">Create a post</h2>
            {error && (
                <Message color='red' message={error} />
            )}
            {thumbnail && <Message color='blue' message={`Selected image ${thumbnail.name}`} />}
            <Form onSubmit={handleSubmit}>
                <Form.Field>
                    <label className="create-label text-white">Title</label>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Title of your post'
                    />
                </Form.Field>
                <Form.Field>
                    <label className="create-label text-white">Description</label>
                    <input
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder='Short description for your post' className="create-label"
                    />
                </Form.Field>
                <MdEditor
                className="create-markdown"
                    value={markdown}
                    style={{ height: "500px" }}
                    renderHTML={(text) => mdParser.render(text)}
                    onChange={({ text }) => setMarkdown(text)}
                />
                <Form.Field>
                    <Button
                        fluid
                        type='button'
                        content='Choose a thumbnail'
                        labelPosition='left'
                        icon='file'
                        onClick={() => fileInputRef.current.click()}
                    />
                    <input
                        ref={fileInputRef}
                        type='file'
                        hidden
                        onChange={e => setThumbnail(e.target.files[0])}
                    />
                </Form.Field>
                <Button primary fluid loading={loading} disabled={loading} type='submit'>Submit</Button>
            </Form>
        </div>
    )
}

export default PostCreate
