import React,{useState,useEffect} from 'react'
import {useSelector,useDispatch} from 'react-redux'
import {addTask,updateTask} from '../slices/tasks/taskSlice'
import { RootState } from "../store/store";

interface Task {
    id?:string | number,
    title?:string,
    description?:string
}
const TaskForm:React.FC = () => {

    const dispatch=useDispatch()
    const {tasks,isEditing,editId}= useSelector((state:RootState) => state.tasks);
    const [task,setTask] = useState<Task>({
        id:new Date().getTime().toString(),
        title:'',
        description:'',
    }) 
    const onChangeHandler = ( e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>)=>{
        setTask(prevTask=>{
            return {
                ...prevTask,
                [e.target.name]:e.target.value
            }
        })
    }
    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if(task.title ==='' || task.description ==='') return;
        else if(editId){
            dispatch(updateTask(task))
        }else{
            dispatch(addTask({
                ...task,
                id:new Date().getTime().toString(),
            }))

        }
        setTask({
         title:'',description:''
        })

      };
      useEffect(()=>{
        if(editId){
            const findTask = tasks.find(task => task.id === editId)
          setTask(findTask!)
        }
      },[editId,tasks])
  return (
    <>
    <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text"  name="title" value={task.title} onChange={onChangeHandler}
        className="form-control form-control-lg"
        id="title"
        />
        </div>
        <div className="mb-3">
        <label htmlFor="desc" className="form-label">Description</label>
        <textarea name="description" onChange={onChangeHandler} value={task.description}
        className="form-control form-control-lg"
        id="desc"
        >{task.description}</textarea>

        </div>
        <button type="submit" className={`${isEditing ? 'btn  btn-outline-info':'btn btn-outline-success'}`}>{isEditing?'update':'save'}</button>
    </form>
    </>
  )
}

export default TaskForm