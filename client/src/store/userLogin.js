import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3000";

//import.meta.env.MODE==="development" ? "http://localhost:3000": "";

export const userLogin = create((set, get) => ({
    
    // states
    loading: false,
    error: null,

    // login form state
    loginData:{
        email:"",
        password:"",
    },

    // user's data
    userInfo:{
        name:"",
        email:"",
    },

    setLoginForm: (loginData) => set({loginData}),

    resetLoginForm: ()=>set({loginData:{email:"",password:"",}}),

    submitLogin: async(e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            const { loginData } = get();
            const user = await axios.post(`${BASE_URL}/api/auth/login`,loginData, {withCredentials: true});

            toast.success("User logged in");

            set({userInfo:{ name:user.data.data[0].name, email:user.data.data[0].email }});
            set({isAuthenticated:true});
            set({accessToken: user.data.accessToken});
            // TODO: reset login form
        } catch (error) {
            console.log("Error in submitForm function ", error);
            toast.error("Login is invalid")

        } finally {
            set({ loading: false })
        }
    },

    /*
    fetchUserInfo: async() => {
        set({ loading: true });
        try {
            const response = await axios.get(`${BASE_URL}/api/users`);
            set({ userInfo: response.data.data, error: null });
        } catch (error) {
            if(error.status == 429){
                set({ error: "Rate limit exceeded", userInfo:[] });
            } else {
                set({ error: "Something went wrong", userInfo:[] });
            }
        } finally {
            set({ loading: false });
        }
    },
    */
    // TODO: register form state

    // JWT 
    isAuthenticated: false,
    setIsAuthenticated: (status) => set({ isAuthenticated: status }),

    refreshToken:"",
    accessToken:"",

    refresh: async() => {
        set({loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/refresh`,{},{ withCredentials: true });
            set({accessToken: response.data.accessToken});
        } catch (error) {
            console.log("Error in refreshAccessToken ", error);
        } finally {
            set({loading: false });
        }
    },

    clearAuth: () => {
        set({ accessToken: null, refreshToken: null, isAuthenticated: false, loading: false, error: null });
    },

    logout: async() => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
            userLogin.getState().clearAuth();
          } catch (error) {
            console.error('Logout failed', error);
          } 
    },

    initialized: false,

    initAuth : async() => {
        //set({ loading: true });
        try {
            const res = await axios.post(`${BASE_URL}/api/auth/refresh`,null, { withCredentials: true });
            console.log()
            set({
                accessToken: res.data.accessToken,
                //userInfo: { name: res.data.data[0].name, email: res.data.data[0].email } ?? null,
                initialized: true,
                isAuthenticated: true,
            });
        } catch (error) {
            set({ initialized: true });
        } finally {
            //set({ loading: false });
        }
    },

}));