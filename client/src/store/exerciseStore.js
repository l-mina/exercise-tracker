import { create } from "zustand"
import axios from "axios"
import toast from "react-hot-toast"

const BASE_URL = "http://localhost:3000";

export const exerciseStore = create((set,get) => ({

    // States
    exercises: [],
    favorites: [],
    loading: false,
    error: null,
    currentExercise: null,

    // exercise form state
    exerciseData: {
        name: "",
        category: "",
        equipment: "",
        image: "",
        tags: [],
        tagInput:""
    },

    favoritesData: {},

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
            const fetchedData = response.data.data;
            set((state) => ({
                currentExercise: fetchedData,
                exerciseData: {
                    ...state.exerciseData,
                    ...fetchedData
                },
                error:null
            }));
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

    updateExercise: async (id) => {
        set({ loading: true });
      
        try {
          const { exerciseData } = get();
          const { tagInput, tags = [], ...exercisePartition } = exerciseData;
      
          // 1. Update core exercise
          const response = await axios.put(`${BASE_URL}/api/exercise/exercises/${id}`, exercisePartition);
      
          // 2. Get tags from DB
          const dbTags = await axios.get(`${BASE_URL}/api/exercise/exercises/${id}/tags`);
          const existingTags = dbTags.data.data || [];
      
          // 3. Normalize tag names
          const normalizeTagName = (t) =>
            typeof t === "string" ? t.toLowerCase() :
            typeof t?.name === "string" ? t.name.toLowerCase() :
            "";
      
          const currentTagNames = tags.map(normalizeTagName).filter(Boolean);
          const dbTagNames = existingTags.map(normalizeTagName).filter(Boolean);
      
          // 4. Compute diffs
          const tagsToAdd = currentTagNames
            .filter(name => !dbTagNames.includes(name))
            .map(name => ({ name }));
      
          const tagsToRemove = existingTags.filter(
            t => t?.name && !currentTagNames.includes(t.name.toLowerCase())
          );
      
          // 5. Sync tags
          await Promise.all(
            tagsToAdd.map(tag =>
              axios.post(`${BASE_URL}/api/exercise/exercises/${id}/tags`, { name: tag.name })
            )
          );
      
          await Promise.all(
            tagsToRemove.map(tag =>
              axios.delete(`${BASE_URL}/api/exercise/exercises/${id}/tags/${tag.id}`)
            )
          );
      
          // 6. Refresh updated tags
          const tagsResponse = await axios.get(`${BASE_URL}/api/exercise/exercises/${id}/tags`);
          const refreshedTags = tagsResponse.data.data || [];
      
          // 7. Update state
          set((state) => ({
            currentExercise: response.data.data,
            exerciseData: {
              ...state.exerciseData,
              ...response.data.data,
              tags: refreshedTags,
              tagInput: ""
            }
          }));
      
          toast.success("Exercise updated successfully");
        } catch (error) {
          console.log("Error in updateExercise function", error);
          toast.error("Something went wrong");
        } finally {
          set({ loading: false });
        }
    },

    fetchFavorites : async(id) => {
      if (!id) return set({error:"User ID is required"});
      set({loading: true});
      try {
        const response = await axios.get(`${BASE_URL}/api/exercises/users/${id}/bookmark/exercises`);
        const fetchedData = response.data.data;
        set((state) => ({
          favoritesData: {
            ...state.favoritesData,
            [id]: fetchedData
          },
          error: null
        }))
      } catch (error) {
        console.error("Error in fetchFavorites:", error);
        toast.error("Something went wrong");
      } finally {
        set({loading: false});
      }
    },

    addFavorite: async() => {

    },

    deleteFavorite: async(id) => {

    },

}));