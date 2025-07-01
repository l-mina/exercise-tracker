import { PlusCircleIcon, Trash2Icon, ListPlusIcon } from "lucide-react"
import AddExerciseModal from "../components/AddExerciseModal"
import ExerciseCard from "../components/ExerciseCard"
import { exerciseStore } from "../store/exerciseStore"
import { useEffect } from "react"

function SessionPage() {
    
    const { loading, error, fetchExercises, exercises } = exerciseStore();

    useEffect(() => {
        fetchExercises();
    },[fetchExercises]);

    return(
        <div className="min-h-screen bg-base-200 m-2 p-2 md:m-4 p-4 flex-col">
            <div className="flex justify-between items-center ">
                <div>
                    <div className="flex m-2 p-2 items-baseline">
                        <h1 className="text-3xl font-bold  text-accent">Session</h1>
                        <h1 className="text-xl text-primary-content">: Monday, June 14</h1>    
                    </div>
                    <div className="m-2 p-2 flex w-full  items-center">
                        <form className="filter">
                            <input className="btn btn-square btn-soft" type="reset" value="x"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="Favorites"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="Catalog"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="New"/>
                        </form>
                    </div>
                    <div className="m-2 p-2">
                        <div className="flex gap-2 text-secondary-content ">
                            <button className="btn btn-secondary" onClick={() => { document.getElementById("add_exercise_modal").showModal() }}>
                                <PlusCircleIcon className="size-5"/>
                                Add Exercise
                            </button>
                        </div>
                    </div>
                </div>
                <div className="ml-2 pl-2  justify-center flex gap-x-2">
                    <div className="radial-progress bg-primary text-primary-content border-primary border-4"
                     style={{"--value":60}} aria-valuenow={60} role="progressbar">60%</div>
                </div>
            </div>
            <AddExerciseModal />
            
            {error && <div className="alert alert-error mb-8">{error}</div>}

            {exercises.length === 0 && !loading && (
                <div className="flex flex-col justify-center items-center h-96 space-y-4">
                    <div className="bg-base-100 rounded-full p-6">
                        <ListPlusIcon className="size-12"/>
                    </div>
                    <div className="text-center space-y-2">
                        <h3 className="text-2xl font-semibold">No exercises found</h3>
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
                <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {exercises.map((ex) => (
                        <ExerciseCard key={ex.id} exercise={ex} />
                    ))}
                </div>
            )}

            <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ExerciseCard exercise={{name:"Help"}} />
 
            </div>
        </div>
    )
}

export default SessionPage;