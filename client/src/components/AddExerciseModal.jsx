import { PlusCircleIcon, TextCursorInputIcon } from "lucide-react"

function AddExerciseModal() {

    return (
        <dialog id="add_exercise_modal" className="modal">
            <div className="modal-box">
                {/* */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h3 className="font-bold text-lg mb-6 mt-4 text-center text-primary">Add Exercise</h3>
                {/* Input Field */}
                <form onSubmit={()=>{console.log("added exercise")}} className="space-y-6 flex items-center justify-center ">
                    <div className="grid gap-6">
                        {/*  Name Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Name</span>
                                <input type="text" placeholder="Enter name" ></input>
                            </label>
                        </div>
                        {/*  Category Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Category</span>
                                <input type="text"  placeholder="Enter category" ></input>
                            </label>
                        </div>
                        {/*  Equipment Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24 text-secondary">Equipment</span>
                                <input type="text"  placeholder="Enter equipment" ></input>
                            </label>
                        </div>
                        {/* Button Actions */}
                        <div className="modal-action justify-between mt-2">
                            <button className="btn btn-ghost">Cancel</button>
                            <button className="btn btn-primary" type="submit" disabled="true">
                                <PlusCircleIcon className="size-5 mr-2" />
                                Add Exercise
                            </button>
                        </div>
                    </div>

                </form>
                
            </div>
        </dialog>
    );
};
export default AddExerciseModal;