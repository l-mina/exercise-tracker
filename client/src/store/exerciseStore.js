import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:3000";

export const exerciseStore = create((set,get) => ({

    // States
    exercises: [],
    loading: false,
    error: null,
    currentExercise: null,

    // exercise form state
    exerciseData: {
        name: "",
        category: "",
        equipment: "",
        image: ""
    },

    setAddFormData: (exerciseData) => set({exerciseData}),

    resetAddForm: () => set({exerciseData:{name:"",category:"",equipment:"",image:""}}),

    fetchExercises: async() => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/exercise/exercises`);
            set({exercises: response.data.data, error:null});
        } catch (err) {
            if (err.status == 429) set({error:"Rate limit exceeded", exercises:[]});
            else set({error:"Something went wrong"});
            console.log("Error in fetchExercises function ",err);
        } finally {
            set({loading:false})
        }
    },

    fetchExercise: async(id) => {
        set({loading:true});
        try {
            const response = await axios.get(`${BASE_URL}/api/exercise/exercises/${id}`);
            set({currentExercise: response.data.data, exerciseData: response.data.data, error:null})
        } catch (error) {
            console.log("Error in fetchExercise function ", error);
            toast.error("Something went wrong");
        } finally {
            set({loading:false});
        }
    },

    addExercise: async(e) => {
        e.preventDefault();
        set({loading:true});
        try {
            const { exerciseData } = get();
            await axios.post(`${BASE_URL}/api/exercise/exercises`, exerciseData);
            await get().fetchExercises();
            get().resetAddForm();
            toast.success("Exercise added successfully");
            document.getElementById("add_exercise_modal").close();
        } catch (error) {
            console.log("Error in addExercise function ", error);
            toast.error("Something went wrong")
        } finally {
            set({loading:false});
        }
    },

    deleteExercise: async(id) => {
        set({loading:true});
        try {
            await axios.delete(`${BASE_URL}/api/exercise/exercises/${id}`);
            set(prev => ({exercises: prev.exercises.filter(exercise=>exercise.id != id)}));
            toast.success("Exercise deleted successfully")
        } catch (error) {
            console.log("Error in deleteExercise function ", error);
            toast.error("Something went wrong");
        } finally {
            set({loading:false});
        }
    },

    updateExercise: async(id) => {
        set({loading:true});
        try {
            const { exerciseData } = get();
            const response = await axios.put(`${BASE_URL}/api/exercise/exercises/${id}`,exerciseData);
            set({currentExercise:response.data.data})
            toast.success("Exercise updated successfully");
        } catch (error) {
            console.log("Error in updateExercise function ", error);
            toast.error("Something went wrong");
        } finally {
            set({loading:false});
        }
    }
}));