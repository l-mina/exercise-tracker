import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"
import { userLogin } from "../store/userLogin"

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

            <div className="card bg-base-200 w-96 shadow-sm justify-self-center rounded-box m-4 p-3">
                <div className="card-body bg-base-100 rounded-box">
                    <h2 className="card-title">Card title</h2>
                    <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Error ipsum numquam quos ad, possimus, quidem dolorum explicabo voluptatibus, sint dicta asperiores beatae consequuntur officia. Nisi reiciendis magnam nostrum tempore doloribus?
                    </p>
                    <div className="card-actions justify-center">
                        <button className="btn btn-primary"> Action!</button>
                    </div>
                </div>
            </div>
            
            <div className="divider divider-secondary"></div>
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content

            </div>
            <div className="divider divider-secondary"></div>
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