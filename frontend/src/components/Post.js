import React from 'react';
import { List } from 'antd';

const Post = (props) => {
    console.log("datataaa", props.data)

    return (
        <div>
            <List
                itemLayout="vertical"
                pagination={{
                    onChange: page => {
                        console.log(page);
                    },
                    pageSize: 5,
                }}
                dataSource={props.data}
                renderItem={item => (
                    <List.Item
                        className="list-block"
                        key={item.title}
                    >
                        <List.Item.Meta
                            title={<a className='text-white block-header' href={`/posts/${item.slug}`}>{item.title}</a>}
                            description={<h6 className="block-desc">{item.description}</h6>}
                        />
                    </List.Item>
                )}
            />
        </div>
    );
}

export default Post;
