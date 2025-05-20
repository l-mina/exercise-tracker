import Hero from "../components/Hero"

function HomePage() {

    return(
        <div>
            <Hero />
            {/* content: about section/ feature display */}
            <div className="max-w-6xl  mx-auto my-auto px-4 py-10 text-center">
                <div className="my-6  text-3xl ">
                    <span>use <span className="bg-gradient-to-r from-primary to-secondary text-transparent bg-clip-text text-4xl ">Lift Log</span> to keep track of your workouts</span>
                </div>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="card bg-base-100 rounded-box grid h-64 grow place-items-center">
                        <div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal divider-accent"></div>
                    <div className="card bg-base-100 rounded-box grid h-64 grow place-items-center">
                        <div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                    <div className="divider lg:divider-horizontal divider-accent"></div>
                    <div className="card bg-base-100 rounded-box grid h-64 grow place-items-center">
                        <div className="flex w-52 flex-col gap-4">
                            <div className="skeleton h-32 w-full"></div>
                            <div className="skeleton h-4 w-28"></div>
                            <div className="skeleton h-4 w-full"></div>
                            <div className="skeleton h-4 w-full"></div>
                        </div>
                    </div>
                </div>
            </div>    
        </div>
        
        
    )
}

export default HomePage;