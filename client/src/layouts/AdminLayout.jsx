import { useEffect, useState } from 'react';
import {
    DesktopOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    UserOutlined,
    CommentOutlined
} from '@ant-design/icons';
import { Breadcrumb, Button, Layout, Menu, theme } from 'antd';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
const { Header, Content, Footer, Sider } = Layout;

function getItem(
    label,
    key,
    icon,
    children,
) {
    return {
        key,
        icon,
        children,
        label,
    }
}

const items = [
    getItem(<NavLink to={'/admin'}>Dashboard</NavLink>, '1', <PieChartOutlined />),
    getItem('Posts', '2', <DesktopOutlined />, [
        getItem(<NavLink to={'/admin/posts'}>Post List</NavLink>, '3'),
        getItem(<NavLink to={'/admin/posts/add'}>Add</NavLink>, '4'),
        getItem(<NavLink to={'/admin/posts/trash'}>Trash</NavLink>, '4.5'),
    ]),
    getItem('User', 'sub1', <UserOutlined />, [
        getItem(<NavLink to={'/admin/users'}>Users</NavLink>, '5'),
        getItem(<NavLink to={'/admin/users/add'}>Add</NavLink>, '6'),
    ]),
    getItem(<NavLink to={'/admin/comments'}>Comments</NavLink>, 'sub2', <CommentOutlined />)
];

const AdminLayout = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [history, setHistory] = useState('');
    const user = JSON.parse(localStorage.getItem("auth"));
    const navigate = useNavigate()

    useEffect(() => {
        setHistory(window.location.pathname)
    }, [window.location.pathname])

    useEffect(() => {
        if (!user || Object.keys(user).length == 0 || (user.role !== "admin" && user.role !== "contributor")) {
            navigate('/login')
        }
    }, [user])

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout style={{ minHeight: '100vh' }}>
            <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
                <div className="demo-logo-vertical" />
                <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} />
            </Sider>
            <Layout>
                <Header style={{ padding: 0, background: colorBgContainer }} >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            fontSize: '16px',
                            width: 64,
                            height: 64,
                        }}
                    />
                </Header>
                <Breadcrumb items={[{title: history}]}></Breadcrumb>
                <Content style={{ margin: '0 16px' }}>
                    <Outlet context={history} key={history}/>
                </Content>
                <Footer style={{ textAlign: 'center' }}>Post Hooker ©2023 Created by DevidMonster</Footer>
            </Layout>
        </Layout>
    );
};

export default AdminLayout;