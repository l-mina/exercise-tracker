import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../store/userLogin"

function LoginPage(){

    const { loading, loginData, setLoginForm, submitLogin, isAuthenticated } = userLogin();
    const navigate = useNavigate();

    useEffect(()=>{
        if(isAuthenticated){
            navigate('/dashboard', { replace: true });
        }
    },[isAuthenticated]);

    const handleLogin = async(e) => {
        e.preventDefault();
        submitLogin();
    };

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
                        <form onSubmit={handleLogin}>
                            <fieldset className="fieldset">
                                {/* email input */}
                                <label className="label text-base-content">Email</label>
                                <input type="email" className="input " placeholder="Email"  value={loginData.email} onChange={(e) => setLoginForm({...loginData, email: e.target.value })}/>
                                {/* password input */}
                                <label className="label text-base-content">Password</label>
                                <input type="password" className="input" placeholder="Password" value={loginData.password} onChange={(e) => setLoginForm({...loginData, password: e.target.value })}/>
                                {/* password reset / register */}
                                <div>New to Lift Log? <Link to="/signup" className="no-underline hover:opacity-80 link text-accent">Join now</Link></div>
                                {/* submit button */}
                                <button className="btn btn-secondary mt-4" disabled={!loginData.email || !loginData.password || loading} type="submit">
                                    { loading? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : (
                                        <>Login</>
                                    )}
                                </button>
                                <Link to="/dashboard">dash</Link>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;