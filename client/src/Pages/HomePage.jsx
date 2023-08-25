import { Spin } from "antd";
import PostCard from "../components/PostCart";
import { useFetchAllPostQuery } from "../services/post.service";
import Banner from "../components/Banner";

function HomePage() {
    const { data, isLoading } = useFetchAllPostQuery()
    console.log(data);
    return <div>

        {isLoading ? <Spin /> :
            (
                <>
                    <Banner></Banner>
                    <div div style={{ padding: '0 30px' }}>
                        <h1>Posts</h1>
                        <PostCard data={data?.data} />
                    </div>
                </>
            )}
    </div>;
}

export default HomePage;