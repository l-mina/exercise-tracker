import { Navigate, Outlet } from "react-router-dom"
import { userLogin } from "../store/userLogin"

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = userLogin();
    if(loading){
        return <div>Loading...</div>
    }
    return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
}
export default ProtectedRoute;