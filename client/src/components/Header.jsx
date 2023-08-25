import { Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteTokenAndUser } from "../slices/authSlice";
import { useClearTokenMutation } from "../services/auth.service";

function Header() {
    const user = useSelector(state => state.authReducer.user)
    const navigate = useNavigate()
    const [clearToken] = useClearTokenMutation()
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(deleteTokenAndUser())
        clearToken()
        navigate('/login')
    }

    return <div style={{ display: 'flex', justifyContent: "space-between", padding: "10px", height: "40px", borderBottom: '1px solid rgba(0,0,0,0.2)', alignItems: 'center' }}>
        <Link style={{ fontSize: '20px', color: 'black' }} to={'/'}>Đăng</Link>
        <div>
            <Link to={'/'}><Button type="link">Home</Button></Link>
            {Object.keys(user).length > 0 ? 
                <Button onClick={handleLogout}>Logout</Button>
            :
                <>
                    <Link to={'/login'}><Button type="link">Login</Button></Link>
                    <Link to={'/signup'}><Button type="link">Signup</Button></Link>
                </>
            }
        </div>
    </div>;
}

export default Header;