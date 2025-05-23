import axiosInstance from "../utils/axiosInstance"
import { userLogin } from "../store/userLogin"

function Dashboard (){

    const loadDashboard = async() => {
        try {
            const response = await axiosInstance.get('/');

        } catch (error) {
            console.error('Error fetching protected data:', error);
            // The interceptor will handle 401 and token refresh
        }
    };
    const {userInfo} = userLogin();
    const name = userInfo.name;
    const email = userInfo.email; 

    return(
        <div>hello {name}, your email is {email} </div>
    )
}

export default Dashboard;