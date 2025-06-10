import ExerciseCard from "../components/ExerciseCard"

function SessionPage() {

    return(
        <div className="min-h-screen bg-base-200 m-2 p-2 md:m-4 p-4 flex-col">
            <div className="flex justify-between items-center ">
                <div>
                    <div className="flex m-2 p-2 items-baseline">
                        <h1 className="text-3xl font-bold  text-accent">Session</h1>
                        <h1 className="text-xl text-primary-content">: Monday, June 14</h1>    
                    </div>
                    <div className="m-2 p-2">
                        <form className="filter">
                            <input className="btn btn-square btn-soft" type="reset" value="x"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="Favorites"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="Catalog"/>
                            <input className="btn btn-soft btn-secondary" type="radio" name="viewFilter" aria-label="New"/>
                        </form>
                    </div>
                </div>
                <div className="ml-2 pl-2  justify-center flex gap-x-2">
                    <div className="radial-progress bg-primary text-primary-content border-primary border-4"
                     style={{"--value":60}} aria-valuenow={60} role="progressbar">60%</div>
                </div>
            </div>
            

            <div className="m-2 p-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                <ExerciseCard exercise={{name:"Help"}} />
                <ExerciseCard exercise={{name:"hello mine"}} />
                <ExerciseCard exercise={{name:"hello mine"}} />
                <ExerciseCard exercise={{name:"hello mine"}} />
            </div>
        </div>
    )
}

export default SessionPage;