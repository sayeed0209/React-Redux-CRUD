import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addTask, editTask } from '../slices/task/taskSlice';
import { useNavigate, useParams } from 'react-router-dom';
const TaskForm = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const params = useParams();
	const { tasks } = useSelector(state => state.tasks);

	const [task, setTask] = useState({
		title: '',
		description: '',
	});

	const onChangeHandler = e => {
		setTask(prev => {
			return { ...prev, [e.target.name]: e.target.value };
		});
	};

	const onSubmitHandler = e => {
		e.preventDefault();
		let obj = {
			...task,
			id: new Date().getTime().toString(),
			completed: false,
		};
		if (task.title === '' && task.description === '') return;
		else if (params.id) {
			dispatch(editTask(task));
		} else {
			dispatch(addTask(obj));
		}
		navigate('/');

		setTask({
			title: '',
			description: '',
		});
	};
	useEffect(() => {
		if (params.id) {
			const findTask = tasks.find(task => task.id == params.id);
			setTask(findTask);
		}
	}, [params, tasks]);
	return (
		<form onSubmit={onSubmitHandler} className="bg-zinc-800 max-w-sm p-4">
			<label htmlFor="title" className="block text-sm font-bold ms-2">
				Task:
			</label>
			<input
				type="text"
				placeholder="title"
				value={task.title}
				onChange={onChangeHandler}
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
				onChange={onChangeHandler}
				className="w-full p-2 rounded-md bg-zinc-600 mb-2 "
			>
				{task.description}
			</textarea>
			<button className="bg-blue-500 px-4 py-1 rounded-md ">{'Save'}</button>
		</form>
	);
};

export default TaskForm;
