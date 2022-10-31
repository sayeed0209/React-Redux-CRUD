import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import {getLocalStorageData }from './slices/task/taskSlice';
function App() {
	const dispatch = useDispatch();
	dispatch(getLocalStorageData());
	return (
		<div className="bg-zinc-900 h-screen text-white">
			<div className="flex items-center justify-center h-full">
				<BrowserRouter>
					<TaskForm />
					<TaskList />
					{/* <Routes>
						<Route path="/" element={<TaskList />} />
						<Route path="/add-task" element={<TaskForm />} />
						<Route path="/edit-task/:id" element={<TaskForm />} />
					</Routes> */}
				</BrowserRouter>
			</div>
		</div>
	);
}

export default App;
