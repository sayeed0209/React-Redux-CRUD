import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
	addTask,
	editTask,
	updateTask,
	taskInputsHandler,
} from '../slices/task/taskSlice';

const TaskForm = () => {
	const dispatch = useDispatch();

	const { tasks, isEditing, task } = useSelector(state => state.tasks);

	// const [task, setTask] = useState({
	// 	title: taskObj.title,
	// 	description: taskObj.description,
	// });

	const onChangeHandler = (title, des) => {
		dispatch(taskInputsHandler({ title, description: des }));
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		let obj = {
			...task,
			id: new Date().getTime().toString(),
			completed: false,
		};
		if (task.title === '' && task.description === '') return;
		else if (task.id) {
			dispatch(updateTask(task));
		} else {
			dispatch(addTask(obj));
		}
	};

	return (
		<form onSubmit={onSubmitHandler} className="bg-zinc-800 max-w-sm p-4">
			<label htmlFor="title" className="block text-sm font-bold ms-2">
				Task:
			</label>
			<input
				type="text"
				placeholder="title"
				value={task.title}
				onChange={e => {
					onChangeHandler(e.target.value, task.description);
				}}
				name="title"
				className="w-full p-2 rounded-md bg-zinc-600 mb-2 "
			/>
			<label htmlFor="title" className="block text-sm font-bold mb-2">
				Description:
			</label>
			<textarea
				name="description"
				id=""
				cols="30"
				rows="10"
				value={task.description}
				onChange={e => {
					onChangeHandler(task.title, e.target.value);
				}}
				className="w-full p-2 rounded-md bg-zinc-600 mb-2 "
			>
				{task.description}
			</textarea>
			<button className="bg-blue-500 px-4 py-1 rounded-md ">
				{isEditing ? 'update' : 'Save'}
			</button>
		</form>
	);
};

export default TaskForm;
