import { Link } from "react-router-dom"

function Hero(){

    return(
        <div className="hero min-h-screen" style={{
            backgroundImage:
              "url(https://images.unsplash.com/photo-1516383274235-5f42d6c6426d?q=80&w=1748&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
          }}>
            <div className="hero-overlay"></div>
            <div className="hero-content text-neutral-content text-center ">
                <div className="max-w-md">
                <h1 className="mb-5 text-6xl font-bold text-primary">Lift Log</h1>
                <p className="mb-5">
                    Tracking your progress made simple.
                </p>
                <Link to="/login">
                    <button className="btn btn-secondary ">Get Started</button>
                </Link>
                
                </div>
            </div>
        </div>
    )
}

export default Hero;