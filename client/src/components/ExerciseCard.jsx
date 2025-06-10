import { HeartIcon } from 'lucide-react'
import { useState } from 'react'

const ExerciseCard = ({ exercise }) => {
    const [bookmarked, setBookmarked] = useState(false);
    const bookmarkExercise = () => {
        setBookmarked(prev => !prev);
    };

    return(
        <div className="card bg-base-100 w-full h-full shadow-sm  opacity-75">
            <figure className='overflow-hidden'>
                <img className='w-full h-48 object-cover'
                    src="https://images.unsplash.com/photo-1652363722833-509b3aac287b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YmVuY2glMjAlMjBwcmVzc3xlbnwwfHwwfHx8Mg%3D%3D"
                    alt="alt cap"
                />
            </figure>
            <div className="card-body space-y-1">
                <h2 className="card-title text-primary">Bench Press</h2>

                {/* Tags */}
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Tags #:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-soft">Push</span>
                    <span className="badge badge-sm badge-soft">Upper</span>
                    <span className="badge badge-sm badge-soft">{exercise.name}</span>
                    </div>
                </div>

                {/* Category */}
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Category:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-ghost">Chest</span>
                    </div>
                </div>

                {/* Equipment */}
                <div className="grid grid-cols-1 sm:grid-cols-[6rem_1fr] gap-x-2 items-start">
                    <span className="text-secondary font-medium">Equipment:</span>
                    <div className="flex flex-wrap gap-1 sm:ml-0 ml-6">
                    <span className="badge badge-sm badge-ghost">Bench</span>
                    <span className="badge badge-sm badge-ghost">Barbell</span>
                    </div>
                </div>

                <div className="card-actions flex items-center">
                    <button className="btn btn-sm btn-soft btn-neutral-content" onClick={bookmarkExercise}>
                        <HeartIcon className="w-5 h-5 text-accent" fill={bookmarked? 'currentColor' : 'none'} stroke="currentColor" />
                    </button>
                    <button className="btn btn-sm btn-primary ml-auto" onClick={()=>document.getElementById('exercise_modal').showModal()}>Start</button>
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