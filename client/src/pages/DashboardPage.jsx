import { useEffect } from "react";
import axiosInstance from "../utils/axiosInstance"
import { userLogin } from "../store/userLogin"

import ExerciseCard from "../components/ExerciseCard"

function Dashboard (){

    useEffect(()=>{
        const loadDashboard = async() => {
            try {
                const response = await axiosInstance.get('/');
    
            } catch (error) {
                console.error('Error fetching protected data:', error);
                // The interceptor will handle 401 and token refresh
            }
        };
        loadDashboard();
    },[]);
    
    const {userInfo} = userLogin();
    const name = userInfo.name;
    const email = userInfo.email;

    return(
        <div className="min-h-screen flex-col m-6 p-6 md:m-10 p-10">
            <div className="card bg-base-300 rounded-box grid h-20 place-items-center">content

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