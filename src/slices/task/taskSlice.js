import { createSlice } from '@reduxjs/toolkit';

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
};
export const taskSlice = createSlice({
	name: 'tasks',
	initialState,

	reducers: {
        
		addTask: (state, action) => {
			state.tasks.unshift(action.payload);
		},
		deleteTask: (state, action) => {
			state.tasks = state.tasks.filter(task => task.id !== action.payload);
		},
		editTask: (state, action) => {
			const { id, title, description } = action.payload;
			const foundTask = state.tasks.find(task => task.id === id);
			if (foundTask) {
				foundTask.title = title;
				foundTask.description = description;
			}
		},
	},
});
const taskReducer = taskSlice.reducer;
export const { addTask, deleteTask, editTask } = taskSlice.actions;
export default taskReducer;
