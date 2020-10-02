import React, { useState } from 'react'
import { Container, Divider, Image } from 'semantic-ui-react'
import ReactMarkdown from 'react-markdown'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { api } from '../api'
import { useFetch } from '../helpers'
import { Link, navigate } from '@reach/router'
import { authAxios } from '../services/authentication.service'
import { Modal, Button } from 'antd'

const DeleteModal = ({ title, postSlug, thumbnail }) => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const [visible, setVisisble] = useState(false)

    function handleSubmit() {
        setLoading(true)
        authAxios
            .delete(api.posts.delete(postSlug))
            .then(res => {
                setLoading(false)
                navigate('/')
            })
            .catch(err => {
                setError(err.message || err)
                setLoading(false)
            })
    }

    const showModal = () => {
        setVisisble(true)
    }

    const handleCancel = e => {
        console.log(e)
        setVisisble(false)
    }

    return (
        <>
            <Button
                className='float-right btn-update btn'
                loading={loading}
                disabled={loading}
                type='primary'
                onClick={showModal}
            >
                Delete Post
      </Button>
            <Modal
                className='text-center'
                title={title}
                visible={visible}
                onOk={handleSubmit}
                onCancel={handleCancel}
                footer={[
                    <Button className='btn-modal2 btn' key='back' onClick={handleCancel}>
                        Return
          </Button>,
                    <Button
                        className='btn-modal1 btn'
                        key='submit'
                        type='primary'
                        loading={loading}
                        onClick={handleSubmit}
                    >
                        Confirm Deletion
          </Button>
                ]}
            >
                <Image className='mx-auto' src={thumbnail} />
                {error && <Message color='red' message={error} />}
                <h3 className='text-center mt-3 text-dark'>
                    Are you sure you want to delete this post?
        </h3>
            </Modal>
        </>
    )
}

const Blockquote = props => {
    console.log(props)
    return (
        <Message
            color='black'
            message={props.value ? props.value : props.children}
        />
    )
}

const Code = props => {
    console.log(props)
    return (
        <pre className='code-blocks'>
            <code>{props.value ? props.value : props.children}</code>
        </pre>
    )
}

const Renderers = {
    blockquote: Blockquote,
    code: Code
}

const PostDetail = props => {

    const { data, loading, error } = useFetch(api.posts.retrieve(props.postSlug)) // Custom hook

    return (
        <Container className='detail-container' text>
            {error && <Message negative message={error} />}
            {loading && <Loader />}
            {data && (
                <div>
                    <Image className='detail-img' src={data.thumbnail} />
                    <h1 className='detail-header'>{data.title}</h1>
                    <h6 className='detail-date'>
                        {' '}
            Last updated at{' '}
                        {`${new Date(data.updated_at).toLocaleDateString()}`}
                    </h6>
                    <ReactMarkdown
                        className='detail-content'
                        source={data.content}
                        renderers={Renderers}
                    />
                    <Divider />
                    {data.is_author && (
                        <>
                            <Link to={`/posts/${props.postSlug}/update`}>
                                <Button className='btn-update btn'>Update</Button>
                            </Link>
                            <DeleteModal
                                postSlug={props.postSlug}
                                title={data.title}
                                thumbnail={data.thumbnail}
                            />
                        </>
                    )}
                </div>
            )}
        </Container>
    )
}

export default PostDetail
