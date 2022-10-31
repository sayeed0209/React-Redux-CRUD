import React ,{FC}from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {deleteTask,editTask,updateCompletedTask} from '../slices/tasks/taskSlice'

import { RootState } from "../store/store";
const TaskList: FC = () => {
    const dispatch=useDispatch()
    const {tasks}= useSelector((state:RootState) => state.tasks); 
    const removeTask=(id:string)=>{
        dispatch(deleteTask(id))
    }
    const editingTask = (id:string)=>{
        dispatch(editTask(id))
    }
    const completedTaskHandler  =(id:string)=>{
        dispatch(updateCompletedTask(id))
    }
    return <ul className="d-flex  flex-wrap align-item-center justify-content-center">
        {tasks.map(task=>{
            const {id,title,description,completed} = task
            return <li className="card text-dark m-2 p-4" key={id}>
                <div className="d-flex justify-content-evenly p-2">
                   <input type="checkbox" checked={completed} onChange={()=>completedTaskHandler(id.toString())}
                   className="form-check-input m-2"
                   />
                   
                   <div>
                    <h4 style={completed?{ textDecoration: 'line-through'}:{textDecoration: 'none'}}
                    className="text-capitalize"
                    >{title}</h4>
                    <p className="text-capitalize">{description}</p>
                   </div>
                   <div className="btnContainer">
                    <button 
                    onClick={()=>{editingTask(id.toString())}
                    }
                    disabled={completed}
                    className="btn btn-outline-warning m-2"
                    >Edit</button>
                    <button onClick={()=>removeTask(id.toString())}
                    className="btn btn-outline-danger"
                    >Delete</button>
                </div>
                    </div>
                </li>
                
            
        })}
    </ul>
  }

export default TaskList