import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTask, editTask } from '../slices/task/taskSlice';
import { Link } from 'react-router-dom';
const TaskList = () => {
	const { tasks } = useSelector(state => state.tasks);
	const dispatch = useDispatch();

	const deleteTaskHandler = id => {
		dispatch(deleteTask(id));
	};

	return (
		<section className="w-4/6">
			<div className="flex justify-between items-center py-4">
				<h1>
					Tasks{' '}
					{tasks.length ? tasks.length : 'You have no task please add one'}
				</h1>
				<Link
					to="/add-task"
					className="bg-indigo-600 px-2 py-1 rounded-sm text-sm"
				>
					Add Task
				</Link>
			</div>
			<article className="grid grid-cols-3 gap-4">
				{tasks.length > 0 &&
					tasks.map(task => {
						return (
							<div key={task.id} className="bg-neutral-800 p-3">
								<div className="content">
									<h3>{task.title}</h3>
									<p>{task.description}</p>
								</div>
								<div className="flex gap-4 mt-3">
									<Link
										to={`/edit-task/${task.id}`}
										className="bg-blue-500 px-2 py-1 rounded-md "
									>
										Edit
									</Link>
									<button
										onClick={() => deleteTaskHandler(task.id)}
										className="bg-red-500 px-2 py-1 rounded-md "
									>
										Delete
									</button>
								</div>
							</div>
						);
					})}
			</article>
		</section>
	);
};

export default TaskList;
