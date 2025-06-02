
const ExerciseCard = ({ exercise }) => {

    return(
        <div className="card bg-base-100 w-96 shadow-sm">
            <figure>
                <img 
                    src="w"
                    alt="alt cap"
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">Card title</h2>
                <p> a card body</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Add</button>
                </div>
            </div>

        </div>
    )
}

export default ExerciseCard;