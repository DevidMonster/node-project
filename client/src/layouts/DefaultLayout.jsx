import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import { useGetTokenQuery } from "../services/auth.service";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { saveTokenAndUser } from "../slices/authSlice";

function DefaultLayout() {
    const { data, isLoading } = useGetTokenQuery()

    const dispatch = useDispatch()
    useEffect(() => {
        const user = localStorage.getItem('auth') ? JSON.parse(localStorage.getItem('auth')) : {}
        if(!isLoading && data && user) {
            dispatch(saveTokenAndUser({ user, token: data.token }))
        }
    }, [data, isLoading])
    return <div>
        <Header></Header>
        <div style={{ padding: '20px 0' }}><Outlet /></div>
    </div>;
}

export default DefaultLayout;