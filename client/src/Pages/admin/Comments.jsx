import { Table, Image, Space, Button, Popconfirm, message } from 'antd';
import { Link } from 'react-router-dom';
import { useFetchAllCommentQuery, useRemoveCommentMutation } from '../../services/comment.service';
import { useEffect } from 'react';

const Comments = () => {
    const { data, isLoading, refetch } = useFetchAllCommentQuery()
    const [removeComment, {error}] = useRemoveCommentMutation()
    const confirm = (id) => {
        removeComment(id)
    };

    useEffect(() => {
        if(data) {
            refetch()
        }
    }, [window.location.pathname])

    useEffect(() => {
        if(error?.data?.error) {
            return message.error(error?.data?.error)
        }
    }, [error])

    const columns = [
        {
            title: 'User Name',
            dataIndex: 'userName',
            key: 'userName',
            render: (_, { userId }) => (
                <h3>{userId.userName}</h3>
            )
        },
        {
            title: 'Post',
            dataIndex: 'title',
            key: 'post',
            render: (_, { postId }) => (
                <Link to={'/admin/posts/edit/' + postId._id}>{postId.title}</Link>
            )
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
            render: (_, { content }) => (
                <p style={{ wordBreak: 'break-all' }}>{content}</p>
            ),
            width: 600
        },
        {
            title: 'Comment Time',
            dataIndex: 'createdAt',
            key: 'commentTime',
            render: (_, record) => (
                <p>{record.createdAt.slice(0, 10)}</p>
            )
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Popconfirm
                        title="Delete Comment"
                        description="Are you sure to delete this comment?"
                        onConfirm={() => confirm(record._id)}
                        onCancel={() => message.error('Cancel')}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return <div>
        <h1>Comments</h1>
        <Table loading={isLoading} columns={columns} dataSource={data?.data || []} />
    </div>
}
export default Comments;