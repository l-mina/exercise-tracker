import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:3000";

export const userRegister = create((set, get) =>({
    // states
    loading: false,
    error: null,
    success: false,

    // form state
    formData: {
        name:"",
        email:"",
        password:"",
    },

    setFormData: (formData) => set({formData}),

    resetForm: ()=>set({formData:{name:"",email:"",password:"",}}),

    registerSubmit: async(e) => {
        set({ loading: true });
        try {
            const { formData } = get();
            await axios.post(`${BASE_URL}/api/auth/register`,formData);
            toast.success("Signup complete");
            set({ success: true });
        } catch (error) {
            console.log("Error in registerSubmit function, ", error);
            toast.error("Signup failed");
            get().resetForm();
            set({ success: false });
        } finally {
            set({ loading: false });
        }
    },


}));