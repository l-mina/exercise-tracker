import { exerciseStore } from "../store/exerciseStore"
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from "lucide-react"
import { useNavigate, useParams } from "react-router-dom"
import { useEffect } from "react"

function ExercisePage(){
    const { loading, error, fetchExercise, deleteExercise, exerciseData, setAddFormData, currentExercise, updateExercise, tags, tagInput } = exerciseStore();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(()=> {
        fetchExercise(id);
    },[fetchExercise, id]);

    const handleDelete = async () => {
        if (window.confirm("Are you sure you to delete this exercise?")){
            await deleteExercise(id);
            navigate("/dashboard")
        }
    }

    if (loading){
        return(
            <div className="flex justify-center items-center min-h-screen">
                <div className="loading loading-spinner loading-lg" />
            </div>
        );
    }

    if (error){
        return(
            <div className="container mx-auto px-4 py-8">
                <div className="alert alert-error">{error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-base-200 m-2 p-2 md:m-4 p-4 flex-col">
            <button onClick={() => navigate(-1)} className="btn btn-ghost mb-8">
                <ArrowLeftIcon className="size-4 mr-2" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/*  Image */}
                <div className="rounded-lg overflow-hidden shadow-lg bg-base-100">
                    <img src={currentExercise?.image} alt={currentExercise?.name} className="size-full object-cover"/>
                </div>
                {/* Form */}
                <div className="card bg-base-100 shadow-lg">
                    <div className="card-body">
                        <h2 className="card-title text-2xl mb-6">Edit Exercise</h2>
                        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); updateExercise(id); }}>
                            {/* Name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Exercise Name</span> 
                                </label>
                                <input
                                    type="text" 
                                    placeholder="Enter exercise name"
                                    className="input input-bordered w-full"
                                    value={exerciseData.name}
                                    onChange={(e) => setAddFormData({...exerciseData, name: e.target.value})}
                                />
                            </div>
                            {/* Category */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Category</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder="Enter exercise category"
                                    className="input input-bordered w-full"
                                    value={exerciseData.category}
                                    onChange={(e) => setAddFormData({...exerciseData, category: e.target.value})}
                                />
                            </div>
                            {/* Equipment */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Equipment</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder="Enter exercise equipment"
                                    className="input input-bordered w-full"
                                    value={exerciseData.equipment}
                                    onChange={(e) => setAddFormData({...exerciseData, equipment: e.target.value})}
                                />
                            </div>
                            {/* Image */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text text-base font-medium">Image URL</span>
                                </label>
                                <input 
                                    type="text"
                                    placeholder="https://example.com/image.jpg"
                                    className="input input-bordered w-full"
                                    value={exerciseData.image}
                                    onChange={(e) => setAddFormData({...exerciseData, image: e.target.value})}
                                />
                            </div>
                            
                            {/* Tags */}
                            
                            <div className="form-control">
                                {/*
                                <label className="label">
                                    <span className="label-text text-base font-medium">Tags</span>
                                </label>
                                // Preview //
                                <div className="flex flex-wrap gap-2 mb-3 mt-2">
                                    {exerciseData.tags && exerciseData.tags.map((tag,index) => (
                                        <span key={index} className="badge badge-outline badge-primary flex items-center gap=1">
                                            {tag}
                                            <button
                                            type="button"
                                            className="text-secondary hover:opacity-75"
                                            onClick={() => setAddFormData({...exerciseData, tags: exerciseData.tags.filter((_,i) => i != index),})}>
                                                x
                                            </button>
                                        </span>
                                    ))}
                                </div>
                        
                                {/* Insert Tags 
                                { exerciseData && (
                                    <input 
                                        type="text"
                                        placeholder="Enter tags"
                                        className="input input-bordered w-full"
                                        value={exerciseData.tagInput}
                                        onChange={(e) => setAddFormData({...exerciseData, tagInput: e.target.value})}
                                        onKeyDown={(e) => {
                                            const input = exerciseData.tagInput;
                                            if((e.key === "Enter" || e.key === ",") && input){
                                                e.preventDefault();
                                                const lowerTag = input.toLowerCase();
                                                if (!exerciseData.tags.includes(lowerTag)){
                                                    setAddFormData({...exerciseData, tags: [...exerciseData.tags,lowerTag], tagInput:"",})
                                                } else {
                                                    setAddFormData({...exerciseData, tagInput:""})
                                                }
                                            }
                                        }}
                                    />
                                )}
                                */}
                                {/* Form Actions*/}
                                <div className="flex justify-between mt-8">
                                    <button type="button" onClick={handleDelete} className="btn btn-error">
                                        <Trash2Icon className="size-4 mr-2" />
                                        Delete Exercise
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={loading || !exerciseData.name || !exerciseData.category || !exerciseData.image}
                                    >
                                        {loading ? (
                                            <span className="loading loading-spinner loading-sm" />
                                        ) : (
                                            <>
                                            <SaveIcon className="size-4 mr-2" />
                                            Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </div>

    );
};

export default ExercisePage;