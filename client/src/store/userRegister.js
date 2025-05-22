import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:3000";

export const userRegister = create((set, get) =>({
    // states
    loading: false,
    error: null,

    // form state
    formData: {
        name:"",
        email:"",
        password:"",
    },

    setFormData: (formData) => set({formData}),

    resetForm: ()=>set({formData:{name:"",email:"",password:"",}}),

    registerSubmit: async(e) => {
        e.preventDefault();
        set({ loading: true });
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/auth/register`,formData);
            toast.success("Signup complete")
        } catch (error) {
            console.log("Error in registerSubmit function, ", error);
            toast.error("Signup failed");
        } finally {
            set({ loading: false });
        }
    },


}));