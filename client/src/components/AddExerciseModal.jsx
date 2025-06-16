import { TextCursorInputIcon } from "lucide-react"

function AddExerciseModal() {

    return (
        <dialog id="add_exercise_modal" className="modal">
            <div className="modal-box">
                {/* */}
                <form method="dialog">
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">X</button>
                </form>
                <h3 className="font-bold text-lg mb-6">Add Exercise</h3>
                {/* Input Field */}
                <form onSubmit={()=>{console.log("added exercise")}} className="space-y-6">
                    <div className="grid gap-6">
                        {/*  Name Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24">Name</span>
                                
                                <input type="text" placeholder="Enter name" ></input>
                            </label>
                        </div>
                        {/*  Category Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24">Category</span>
                                <input type="text"  placeholder="Enter category" ></input>
                            </label>
                        </div>
                        {/*  Equipment Input */}
                        <div className="form-control">
                            <label className="input">
                                <span className="label min-w-24">Equipment</span>
                                <input type="text"  placeholder="Enter equipment" ></input>
                            </label>
                        </div>
                    </div>

                </form>
                
            </div>
        </dialog>
    );
};
export default AddExerciseModal;