import { Spin } from "antd";
import PostCard from "../components/PostCard";
import { useFetchAllPostQuery } from "../services/post.service";
import Banner from "../components/Banner";

function HomePage() {
    const { data, isLoading } = useFetchAllPostQuery()
    return <div>

        {isLoading ? <Spin /> :
            (
                <>
                    <Banner></Banner>
                    <div style={{ padding: '0 30px' }}>
                        <h1>Posts</h1>
                        <PostCard data={data?.posts} />
                    </div>
                </>
            )}
    </div>;
}

export default HomePage;