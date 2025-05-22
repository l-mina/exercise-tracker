import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"
import { userLogin } from "../store/userLogin"

function LoginPage(){

    const { formData, setFormData, loading, submitForm } = userLogin();
    const navigate = useNavigate();
    const token = submitForm;

    useEffect(() => {

        if(token){
            navigate('/dashboard', { replace: true });
        } else {
            console.log("No token");
        }
    }, [submitForm]);
    

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
                        <form onSubmit={submitForm}>
                            <fieldset className="fieldset">
                                {/* email input */}
                                <label className="label text-base-content">Email</label>
                                <input type="email" className="input " placeholder="Email"  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })}/>
                                {/* password input */}
                                <label className="label text-base-content">Password</label>
                                <input type="password" className="input" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value })}/>
                                {/* password reset / register */}
                                <div>New to Lift Log? <Link to="/signup" className="no-underline hover:opacity-80 link text-accent">Join now</Link></div>
                                {/* submit button */}
                                <button className="btn btn-secondary mt-4" disabled={!formData.email || !formData.password || loading} type="submit">
                                    { loading? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : (
                                        <>Login</>
                                    )}
                                </button>
                            </fieldset>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginPage;