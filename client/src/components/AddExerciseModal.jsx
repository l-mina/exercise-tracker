import { PlusCircleIcon, TextCursorInputIcon } from "lucide-react"
import { exerciseStore } from "../store/exerciseStore"

function AddExerciseModal() {

    const { addExercise, exerciseData, setAddFormData, loading } = exerciseStore();

    return (
        <dialog id="add_exercise_modal" className="modal">
            <div className="modal-box">
                {/* */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h3 className="font-bold text-lg mb-6 mt-4 text-center text-primary">Add Exercise</h3>
                {/* Input Field */}
                <form onSubmit={addExercise} className="space-y-6 flex items-center justify-center ">
                    <div className="grid gap-6">
                        {/*  Name Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Name</span>
                                <input type="text" placeholder="Enter name" value={exerciseData.name} onChange={(e) => setAddFormData({...exerciseData, name:e.target.value})}></input>
                            </label>
                        </div>
                        {/*  Category Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Category</span>
                                <input type="text"  placeholder="Enter category" value={exerciseData.category} onChange={(e) => setAddFormData({...exerciseData, category:e.target.value})} ></input>
                            </label>
                        </div>
                        {/*  Equipment Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Equipment</span>
                                <input type="text"  placeholder="Enter equipment" value={exerciseData.equipment} onChange={(e) => setAddFormData({...exerciseData, equipment:e.target.value})}></input>
                            </label>
                        </div>
                        {/* Image Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Image</span>
                                <input type="text" placeholder="Image URL" value={exerciseData.image} onChange={(e)=>setAddFormData({...exerciseData, image:e.target.value})}></input>
                            </label>
                        </div>
                        {/* Button Actions */}
                        <div className="modal-action justify-between mt-2">
                            <button type="button" className="btn btn-ghost" onClick={() => document.getElementById('add_exercise_modal')?.close()}>Cancel</button>
                            <button className="btn btn-primary" type="submit" disabled={!exerciseData.name||!exerciseData.category||!exerciseData.equipment||!exerciseData.image || loading}>
                                {loading ? (
                                    <span className="loading loading-spinner loading0sm" />
                                ) : (
                                    <>
                                        <PlusCircleIcon className="size-5 mr-2" />
                                        Add Exercise
                                    </>
                                )}
                                
                            </button>
                        </div>
                    </div>

                </form>
                
            </div>
            {/* Backdrop close */}
            <form method="dialog" className="modal-backdrop">
                <button>close</button>
            </form>
        </dialog>
    );
};
export default AddExerciseModal;