import { Link, useResolvedPath, useNavigate } from "react-router-dom"
import ThemeSelector from "./ThemeSelector"
import { DumbbellIcon ,LogInIcon, LogOutIcon } from "lucide-react"
import { userLogin } from "../store/userLogin"
import { useEffect } from "react"

function Navbar(){
    const { logout, refreshToken } = userLogin();
    const { pathname } = useResolvedPath();
    const isHomePage = pathname === "/";
    
    const navigate = useNavigate();

    useEffect(() => {

        if(refreshToken == null){
            navigate('/login', { replace: true });
        } else {
            console.log("No token");
        }
    }, [refreshToken]);

    return(
        <div className="bg-base-100/70 backdrop-blur-lg border-b border-base-content/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto">
                <div className="navbar px-4 min-h[4rem] justify-between">
                    {/* LOGO */}
                    <div className="flex-1 lg:flex-none">
                        <Link to="/" className="hover:opacity-80 transition-opacity">
                            <div className="flex items-center gap-2">
                            <DumbbellIcon className="size-8 text-primary"/>
                            <span className="font-semibold tracking-widest text-2xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
                                Lift Log
                            </span>
                            </div>
                        </Link>
                    </div>
                    {/* RIGHT SECTION */}
                    <div className="flex items-center gap-4">
                        <ThemeSelector className="font-normal" />
                        <Link to="/login">
                            <button className="btn btn-primary btn-ghost font-sans font-semibold">
                                Log in
                                <LogInIcon className=" size-5"/>
                            </button>
                        </Link>
                        <button className="btn btn-primary btn-ghost font-sans font-semibold" onClick={logout}>
                            Log out
                            <LogOutIcon className=" size-5"/>
                        </button>
    
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar;

