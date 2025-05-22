import { Link } from "react-router-dom"
import { userRegister } from "../store/userRegister"

function RegisterPage() {

    const { formData, setFormData, loading, registerSubmit } = userRegister();

    return(
        <div className="min-h-screen max-w-6xl mx-auto px-4 py-10">
            <div className="flex-row justify-items-center">
                <div className="text-center max-w-2xl py-10">
                    <span className="text-5xl">Sign up</span>
                </div>
                <div className="card bg-base-100 w-full max-w-sm shadow-xl">
                    <div className="card-body">
                        <form onSubmit={registerSubmit}>
                            <fieldset className="fieldset">
                                {/* name input */}
                                <label className="label text-base-content">Name</label>
                                <input type="text" className="input " placeholder="Name"  value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value })}/>
                                {/* email input */}
                                <label className="label text-base-content">Email</label>
                                <input type="email" className="input " placeholder="Email"  value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value })}/>
                                {/* password input */}
                                <label className="label text-base-content">Password</label>
                                <input type="password" className="input" placeholder="Password" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value })}/>
                                {/* submit button */}
                                <button className="btn btn-secondary mt-4" disabled={!formData.name || !formData.email || !formData.password || loading} type="submit">
                                    { loading? (
                                        <span className="loading loading-spinner loading-sm" />
                                    ) : (
                                        <>Submit</>
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

export default RegisterPage;