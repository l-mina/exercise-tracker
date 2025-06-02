import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"
import { userLogin } from "../store/userLogin"
import { Link } from "react-router-dom"

import ExerciseCard from "../components/ExerciseCard"

function Dashboard (){

    useEffect(()=>{
        const loadDashboard = async() => {
            try {
                //const response = await axiosInstance.get('/api/users');
    
            } catch (error) {
                console.error('Error fetching protected data:', error);
                // The interceptor will handle 401 and token refresh
            }
        };
        loadDashboard();
    },[]);
    /* Silent refresh every 14 min before 15 min expires access token
    useEffect(() => {
        const interval = setInterval(() => {
          // call refresh API silently
          axiosInstance.post('/api/auth/refresh', {}, { withCredentials: true })
            .then(res => {
              userLogin.getState().setTokens({ accessToken: res.data.accessToken });
            })
            .catch(() => {
              userLogin.getState().logout();
            });
        }, 14 * 60 * 1000); // every 14 minutes for 15-min tokens
      
        return () => clearInterval(interval);
      }, []);
    */
    
    const {userInfo} = userLogin();
    const name = userInfo.name;
    const email = userInfo.email;

    return(
        <div className="min-h-screen flex-col m-6 p-6 md:m-10 p-10">

            <div className="card bg-base-200 w-96 shadow-sm justify-self-center rounded-box card-border">
                <div className="card-body bg-base-100 rounded-box">
                    <h2 className="card-title text-accent">Log Session</h2>
                    <p>Start a new session</p>
                    <p>Record all your exercises including the sets and reps</p>
                    
                    
                    <div className="card-actions justify-center mt-4">
                        <Link to='/session'>
                            <button className="btn btn-primary w-25">Start</button>
                        </Link>
                    </div>
                </div>
            </div>
            
            <div className="divider divider-secondary"><h2>View your previous sessions information below</h2></div>
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content

            </div>
            <div className="divider divider-secondary"></div>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
                <div className="divider divider-horizontal divider-accent"></div>
                <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
            </div>
        </div>
    )
}

export default Dashboard;