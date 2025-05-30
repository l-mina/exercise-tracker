
function SessionPage() {

    return(
        <div className="min-h-screen bg-base-200 m-4 p-2">
            <h1 className="text-3xl font-bold mb-6 text-accent">Dashboard</h1>
            <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                <ExerciseCard exercise={{name:"hello mine"}} />
            </div>
        </div>
    )
}

export default SessionPage;