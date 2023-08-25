import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import PostDetail from '../Pages/PostDetail';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import DefaultLayout from '../layouts/DefaultLayout';
import AdminLayout from '../layouts/AdminLayout';
import PostList from '../Pages/admin/post/PostList';
import AddPost from '../Pages/admin/post/AddPost';
import EditPost from '../Pages/admin/post/EditPost';
import UserList from '../Pages/admin/user/UserList';
import AddUser from '../Pages/admin/user/AddUser';
import EditUser from '../Pages/admin/user/EditUser';
import TrashPage from '../Pages/admin/post/TrashPage';
import Comments from '../Pages/admin/Comments';

const router = createBrowserRouter([
    {path: '/', element: <DefaultLayout/>, children: [
        {path: '/', element: <HomePage/>},
        {path: '/post/:slug', element: <PostDetail/>},
        {path: '/login', element: <LoginPage/>},
        {path: '/signup', element: <SignupPage/>},
    ]},
    {path: '/admin', element: <AdminLayout/>, children: [
        {path: 'posts', element: <PostList/>},
        {path: 'posts/trash', element: <TrashPage/>},
        {path: 'posts/add', element: <AddPost/>},
        {path: 'posts/edit/:id', element: <EditPost/>},
        {path: 'users', element: <UserList/>},
        {path: 'users/add', element: <AddUser/>},
        {path: 'users/edit/:id', element: <EditUser/>},
        {path: 'comments', element: <Comments/>},
    ]},
])

export default router