import { configureStore } from '@reduxjs/toolkit';
import taskReducers from '../slices/task/taskSlice';
export const store = configureStore({
	reducer: {
		tasks: taskReducers,
	},
});
