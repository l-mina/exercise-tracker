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

    // form state
    formData:{
        email:"",
        password:"",
    },

    // user info
    userInfo:[],

    setFormData: (formData) => set({formData}),

    // reset form to blank
    resetForm: ()=>set({formData:{email:"",password:"",}}),

    submitForm: async(e) => {
        e.preventDefault();
        const navigate = useNavigate();
        set({ loading: true });
        try {
            const { formData } = get();
            const user = await axios.post(`${BASE_URL}/api/auth/login`,formData);
            //const user = await get().fetchUserInfo();
            //console.log(user);  
            toast.success("User logged in");
            console.log(user.data);
            return user.data.accessToken;
        } catch (error) {
            console.log("Error in submitForm function ", error);
            toast.error("Login is invalid")
        } finally {
            set({ loading: false })
        }
    },

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

    refreshToken:[],

    refresh: async() => {
        set({loading: true });
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/refresh`,{},{ withCredentials: true });
            set({refreshToken: response.data.accessToken});
        } catch (error) {
            console.log("Error in refreshAccessToken ", error);
        } finally {
            set({loading: false });
        }
    },

    logout: async() => {
        try {
            const response = await axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true });
            //navigate('/login'); // Redirect to login page
            set({ refreshToken: null });
          } catch (error) {
            console.error('Logout failed', error);
          }
    },

}));