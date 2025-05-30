import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:3000";

//import.meta.env.MODE==="development" ? "http://localhost:3000": "";

export const userLogin = create((set, get) => ({
    
    // states
    loading: false,
    error: null,

    // user's data
    userInfo:{
        name:"",
        email:"",
    },

    // login form state
    loginData:{
        email:"",
        password:"",
    },

    setLoginForm: (loginData) => set({loginData}),

    resetLoginForm: ()=>set({loginData:{email:"",password:"",}}),

    submitLogin: async(e) => {
        //e.preventDefault();
        set({ loading: true });
        try {
            const { loginData } = get();
            const user = await axios.post(`${BASE_URL}/api/auth/login`,loginData, {withCredentials: true});

            toast.success("User signed in");

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

    accessToken:"",

    clearAuth: () => {
        set({ accessToken: null, isAuthenticated: false, loading: false, error: null });
    },

    logout: async() => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
            userLogin.getState().clearAuth();
            if (response.data.success) toast.success("User signed out");

          } catch (error) {
            console.error('Logout failed', error);
          } 
    },

    initialized: false,

    user:null,
    
    // initialized at refresh(app opened)
    checkAuth: async () => {
        set({ loading: true });
        try {
          const response = await axios.get(`${BASE_URL}/api/auth/check-auth`,{ withCredentials: true} ); 
          set({ isAuthenticated: true, initialized: true, userInfo:{ name:response.data.data.name, email:response.data.data.email }, loading: false }); 
        } catch (error) {
          set({ isAuthenticated: false, initialized: true, user: null, loading: false });
          console.error('Error in checkAuth ', error);
        } finally {
            set({loading: false });
        }
      },

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
}));