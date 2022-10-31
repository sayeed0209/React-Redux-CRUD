import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	tasks: [
		{
			id: '1',
			title: 'task 1',
			description: 'task 1 description',
			completed: false,
		},
		{
			id:'2',
			title: 'task 2',
			description: 'task 2 description',
			completed: false,
		},
		{
			id: '3',
			title: 'task 3',
			description: 'task 3 description',
			completed: false,
		},
	],
	isEditing: false,
	editId:null
};
export const taskSlice = createSlice({
	name: 'tasks',
	initialState,
	reducers: {
		addTask:(state,action)=>{
			state.tasks.push(action.payload);
			
		},
		deleteTask:(state,action)=>{
			state.tasks=state.tasks.filter(task=>task.id !== action.payload)
		},
		editTask:(state,action)=>{
			state.isEditing =true;
			state.editId = action.payload
		}
		,
		updateTask:(state,action)=>{
			const {title,description} = action.payload
			const foundTask = state.tasks.find(task=>task.id===state.editId)
			
			if(foundTask){
				foundTask.title=title
				foundTask.description=description
			}
			state.isEditing =false;
			state.editId = null
		},
		updateCompletedTask:(state,action)=>{
			const id= action.payload
			const foundTask = state.tasks.find(task=>task.id===id)
			if(foundTask){
				foundTask.completed = !foundTask.completed
			}
			
		}
	},
});
const taskReducer = taskSlice.reducer
export const {addTask,deleteTask,editTask,updateTask,updateCompletedTask} = taskSlice.actions
export default taskReducer;
export type RootState = ReturnType<typeof taskReducer>;