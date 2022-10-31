import React from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'

function App() {
  return (
    <main className="container-sm mt-3  m-auto d-flex justify-content-center flex-column align-items-center p-4">
          <TaskForm/>
          <TaskList />
    </main>
  );
}

export default App;
