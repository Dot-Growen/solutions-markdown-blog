import React, {useRef, useState } from 'react'
import { Button, Form, Image, Divider } from 'semantic-ui-react'
import MarkdownIt from 'markdown-it'
import MdEditor from 'react-markdown-editor-lite'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { authAxios } from "../services"
import { useFetch } from '../helpers'
import { navigate } from '@reach/router'


const PostUpdateForm = ({ postSlug, initialTitle, initialDescription, initialContent, initialThumbnail }) => {
   
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)

    const [title, setTitle] = useState(initialTitle)
    const [description, setDescription] = useState(initialDescription);
    const [markdown, setMarkdown] = useState(initialContent)
    const [currentThumbnail, setCurrentThumbnail] = useState(initialThumbnail)
    const [thumbnail, setThumbnail] = useState(null)

    const fileInputRef = useRef()

    const mdParser = new MarkdownIt(/* Markdown-it options */)

    function handleSubmit(e) {
        e.preventDefault()
        setLoading(true)

        const formData = new FormData()
        if (thumbnail) formData.append('thumbnail', thumbnail)
        formData.append('title', title)
        formData.append('content', markdown)
        formData.append('description', description)
        authAxios
            .put(api.posts.update(postSlug), formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            })
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError(err.message || err)
                setLoading(false)
            })
    }

    return (
        <div>
            <h2 className="create-title">Update post</h2>
            {error && <Message color='red' message={error} />}
            {currentThumbnail && <Image src={currentThumbnail} size='small' />}
            {thumbnail && <Message color='blue' message={`Selected image ${thumbnail.name}`} />}
            <Divider />
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
                        placeholder='Short description for your post'
                    />
                </Form.Field>
                <MdEditor
                    value={markdown}
                    style={{ height: '500px' }}
                    renderHTML={text => mdParser.render(text)}
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
                <Button
                    className="mt-3"
                    primary
                    fluid
                    loading={loading}
                    disabled={loading}
                    type='submit'
                >
                    Submit
        </Button>
            </Form>
        </div>
    )
}

const PostUpdate = props => {
    
    const { data, loading, error } = useFetch(api.posts.retrieve(props.postSlug)) 
    
    if (data && data.is_author === false) {
        navigate(`/posts/${props.postSlug}`)
    }

    return (
        <>
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            {data && (
                <PostUpdateForm
                    initialTitle={data.title}
                    initialContent={data.content}
                    initialThumbnail={data.thumbnail}
                    initialDescription={data.description}
                    postSlug={props.postSlug}
                />
            )}
        </>
    )
}

export default PostUpdate
