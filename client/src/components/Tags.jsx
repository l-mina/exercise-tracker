{/* Tags */}
                            
<div className="form-control">
<label className="label">
    <span className="label-text text-base font-medium">Tags</span>
</label>
{/* Preview */}
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

{/* Insert Tags */}
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