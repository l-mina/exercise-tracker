import { HeartIcon, EditIcon, Trash2Icon } from 'lucide-react'
import { useState } from 'react'
import { exerciseStore } from '../store/exerciseStore'
import { Link } from 'react-router-dom'

const ExerciseCard = ({ exercise }) => {
    const [bookmarked, setBookmarked] = useState(false);
    const bookmarkExercise = () => {
        setBookmarked(prev => !prev);
    };
    const { deleteExercise } = exerciseStore();

    return(
        <div className="card bg-base-100 w-full h-full shadow-sm  opacity-75">
            <figure className='overflow-hidden'>
                <img className='w-full h-48 object-cover'
                    src={exercise.image}
                    alt={exercise.name}
                />
            </figure>
            <div className="card-body space-y-1">
                <h2 className="card-title text-primary">{exercise.name}</h2>

                {/* Tags 
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Tags #:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-soft">{exercise.category}</span>
                    <span className="badge badge-sm badge-soft">{exercise.equipment}</span>
                    </div>
                </div>
                */}
                {/* Category */}
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Category:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-ghost">{exercise.category}</span>
                    </div>
                </div>

                {/* Equipment */}
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Equipment:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-ghost">{exercise.equipment}</span>
                    </div>
                </div>

                <div className="card-actions flex items-center">
                    <button className="btn btn-sm btn-soft btn-neutral-content" onClick={bookmarkExercise}>
                        <HeartIcon className="w-5 h-5 text-accent" fill={bookmarked? 'currentColor' : 'none'} stroke="currentColor" />
                    </button>
                    <Link to={`/exercise/${exercise.id}`}>
                        <button className="btn btn-sm btn-ghost btn-neutral-content">
                            <EditIcon className="w-5 h-5 text-accent" />
                        </button>
                    </Link>
                    <button className="btn btn-sm btn-ghost btn-neutral-content" onClick={() => deleteExercise(exercise.id)}>
                        <Trash2Icon className="w-5 h-5 text-error" />
                    </button>
                    <button className="btn btn-sm btn-primary ml-auto min-w-20" onClick={()=>document.getElementById('exercise_modal').showModal()}>Start</button>
                    <dialog id="exercise_modal" className='modal modal-middle sm:modal-middle'>
                        <div className='modal-box'>
                            <h3 className='text-primary'>Hello!</h3>
                            <p className='py-4'>Press something</p>
                            <div className='modal-action'>
                                <form method="dialog">
                                    <button className='btn btn-sm'>Close</button>
                                </form>
                            </div>
                        </div>
                    </dialog>
                </div>
            </div>

        </div>
    )
}

export default ExerciseCard;