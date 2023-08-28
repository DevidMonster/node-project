import { useNavigate, useParams } from "react-router-dom";
import { useFetchOneQuery } from "../services/post.service";
import { Divider } from "antd";
import PostComment from "../components/PostComment";
import { useEffect } from "react";

function PostDetail() {
    const { id } = useParams()
    const { data, isLoading } = useFetchOneQuery(id)
    const navigate = useNavigate()
    console.log(data);
    useEffect(() => {
        if (data?.error) {
            navigate('/')
        }
    }, [data])

    return <div>
        {!isLoading ? <div style={{ width: '80%', margin: '0 auto' }}>
            <div style={{ border: '1px solid rgba(0,0,0,0.1)', borderRadius: '15px', padding: '10px' }}>
                <Divider orientation="left" orientationMargin="0">
                    {data.post?.title}
                </Divider>
                {data.post.thumbnail === "" ? <img alt="example" style={{ width: '300px', margin: '0 auto' }} src={data.post.thumbnail} /> : ''}
                <div style={{ padding: '0 20px' }}>
                    <h3>{data.post?.subTitle}</h3>
                    <p dangerouslySetInnerHTML={{ __html:  data.post?.content}}></p>
                </div>
            </div>
            <Divider orientation="left" orientationMargin="0">Comment</Divider>
            <PostComment postId={data?.post.id} />
        </div> : <></>}
    </div>;
}

export default PostDetail;