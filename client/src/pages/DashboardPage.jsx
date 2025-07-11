import { useEffect } from "react"
import axiosInstance from "../utils/axiosInstance"
import { userLogin } from "../store/userLogin"
import { Link } from "react-router-dom"
import { ListPlusIcon, PlusCircleIcon } from "lucide-react"

import { exerciseStore } from "../store/exerciseStore"
import ExerciseCard from "../components/ExerciseCard"
import AddExerciseModal from "../components/AddExerciseModal"

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

    const { loading, error, fetchExercises, exercises } = exerciseStore();
    useEffect(() => {
        fetchExercises();
    },[fetchExercises]);

    return(
        <div className="min-h-screen flex-col m-6 p-6 md:m-10 p-10">

            <div className="card bg-base-200 w-96 shadow-sm justify-self-center rounded-box card-border">
                <div className="card-body bg-base-100 rounded-box">
                    <h2 className="card-title text-accent">Log Session</h2>
                    <p>Start a new session</p>
                    <p>Record all your exercises including the sets and reps</p>
                    
                    
                    <div className="card-actions justify-center mt-4">
                        <Link to='/session'>
                            <button className="btn btn-primary w-40">Start</button>
                        </Link>
                    </div>
                </div>
            </div>
            <AddExerciseModal />
            <div className="divider divider-secondary"></div>

            <div className="card bg-base-300 rounded-box grid h-auto place-items-center">
                <div className="text-left w-full px-12 py-8 text-primary flex flex-col gap-y-4">
                    <div className="text-3xl font-bold  text-primary">Exercises</div>
                    <div>
                        <button className="btn btn-secondary" onClick={() => { document.getElementById("add_exercise_modal").showModal() }}>
                                <PlusCircleIcon className="size-5"/>
                                Add Exercise
                            </button>
                    </div>
                </div>
                {exercises.length === 0 && !loading && (
                    <div className="flex flex-col justify-center items-center h-96 space-y-4">
                        <div className="bg-base-100 rounded-full p-6">
                            <ListPlusIcon className="size-10"/>
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-xl font-semibold">No exercises found</h3>
                            <p className="text-secondary-neutral max-w-sm">
                                Get started by adding your first exercise to the catalog
                            </p>
                        </div>
                    </div>
                )}

                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="loading loading-spinner loading-lg" />
                    </div>
                ) : (
                    <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {exercises.map((ex) => (
                            <ExerciseCard key={ex.id} exercise={ex} />
                        ))}
                    </div>
                )}
            </div>
            <div className="divider divider-secondary"><h2 className="text-lg">View your previous sessions information below</h2></div>
            <div className="flex w-full">
                <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
                <div className="divider divider-horizontal divider-accent"></div>
                <div className="card bg-base-300 rounded-box grid h-20 grow place-items-center">content</div>
            </div>
        </div>
    )
}

export default Dashboard;