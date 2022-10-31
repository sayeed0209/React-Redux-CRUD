import { createSlice } from '@reduxjs/toolkit';
const setLocalStorage = state => {
	console.log(state);
	localStorage.setItem('tasks', JSON.stringify(state.tasks));
	console.log(JSON.stringify(state.tasks));
};

const initialState = {
	tasks: [
		{
			id: 1,
			title: 'task 1',
			description: 'task 1 description',
			completed: false,
		},
		{
			id: 2,
			title: 'task 2',
			description: 'task 2 description',
			completed: false,
		},
		{
			id: 3,
			title: 'task 3',
			description: 'task 3 description',
			completed: false,
		},
	],
	isEditing: false,
	task: {
		id: null,
		title: '',
		description: '',
	},
};

export const taskSlice = createSlice({
	name: 'tasks',
	initialState,

	reducers: {
		getLocalStorageData: (state, action) => {
			state.tasks = JSON.parse(localStorage.getItem('tasks'));
			console.log(state.tasks);
		},
		addTask: (state, action) => {
			state.tasks.unshift(action.payload);
			setLocalStorage(state);
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
			setLocalStorage(state);
		},
		showEditing: (state, action) => {
			state.isEditing = true;
		},
		hideEditing: (state, action) => {
			state.isEditing = false;
		},
		editTask: (state, action) => {
			showEditing(state);
			state.task = { ...action.payload };
		},
		taskInputsHandler: (state, action) => {
			state.task.title = action.payload.title;
			state.task.description = action.payload.description;
		},
		updateTask: (state, action) => {
			const { id, title, description } = action.payload;
			const foundTask = state.tasks.find(task => task.id === id);
			if (foundTask) {
				foundTask.title = title;
				foundTask.description = description;
			}
			hideEditing(state);
			setLocalStorage(state);
			state.task = { id: null, title: '', description: '' };
		},
	},
});
const taskReducer = taskSlice.reducer;
export const {
	addTask,
	deleteTask,
	editTask,
	showEditing,
	hideEditing,
	updateTask,
	taskInputsHandler,
	getLocalStorageData
} = taskSlice.actions;
export default taskReducer;
