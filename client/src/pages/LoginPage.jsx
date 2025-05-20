import { Link } from "react-router-dom"

function LoginPage(){

    return(
        <div className="hero bg-base-200 min-h-screen">
            <div className="hero-content flex-col lg:flex-row">
                <div className="text-center lg:text-left max-w-2xl">
                    <h1 className="text-5xl font-bold text-primary">Login now!</h1>
                    <p className="py-6">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusantium iusto nemo doloribus quos praesentium, eum unde magni repellendus assumenda cupiditate saepe autem perspiciatis corporis, adipisci possimus dolore optio? Corrupti, ad.
                    </p>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-xl">
                    <div className="card-body">
                        <fieldset className="fieldset">
                            <label className="label">Email</label>
                            <input type="email" className="input " placeholder="Email" />
                            <label className="label">Password</label>
                            <input type="password" className="input" placeholder="Password" />
                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-secondary mt-4">Login</button>
                        </fieldset>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;