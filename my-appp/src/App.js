// import logo from './logo.svg';
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import  {faCircleCheck, faPen, faTrashCan } from '@fortawesome/free-solid-svg-icons'
import './App.css';



  function App() {
    // task (tToDo List) State
    const [toDo, setToDo] = useState([
      {"id": 2, "title": "Task 2", "status": false},
      {"id": 1, "title": "Task 1", "status": false}
     
    ]);

    // Temp State
    const [newTask, setNewTask] = useState('');
    const [updateData, setUpdateData] = useState('');

    // Add task
//////////////////////////
    const addTask = () => {
      if(newTask) {
        let num = toDo.length +1;
        let newEntry = { id:num, title: newTask, status: false}
        setToDo([...toDo, newEntry])
        setNewTask('');
            }
    }

    //  Delete task
    //////////////////////////
    const deleteTask = (id) => {
    let newTasks =toDo.filter(task => task.id !== id)
    setToDo(newTasks);
  }

    //Mark task as or compeleted
    //////////////////////////
    const markDone = (id) => {
    let newTask = toDo.map(task => {
      if (task.id === id) {
        return({...task, status: !task.status})
      }
      return task;
    })
    setToDo(newTask)
    }

    
    //Cansale udate 
    //////////////////////////
    const cancelUpdate = () => {
      setUpdateData('');
    }

      //Change task for update  
    //////////////////////////
      const changeTask = (e) => {
        let newEntry ={
          id: updateData.id,
        title: e.target.value,
        status:updateData.status ? true : false
        } 
        setUpdateData(newEntry);
      }

       //Update task  
    //////////////////////////
       const updateTask = () => {
        let filterRecords = [...toDo].filter(task => task.id !== updateData.id);
        let updateObject = [...filterRecords, updateData]
        setToDo(updateObject);
        setUpdateData('');
      }
  return (
  <div className='container App'>
   
   <br></br>
   <h2>To Do List App (ReactJS)</h2>
   <br></br>
{/* Update Task */}
<div className='row'>
<div className='col'>
      < input 
      value={updateData && updateData.title}
      onChange={(e) => changeTask(e)}
      className='from-control from-control-lg'></input>
    </div>
    <div className='col-auto'>
   < button 
   onClick={updateTask}
   className='btn btn-lg btn-success mr-20'>Update </button>
   <button className='btn btn-lg btn-warning'>Cencel</button>
    </div>
</div>

{/* Add Task */}
   <div className='row'>
    <div className='col'>
      < input
      value={newTask}
      onChange={ (e) => setNewTask(e.target.value)}
      className='from-control from-control-lg'></input>
    </div>
    <div className='col-auto'>
   < button 
   onClick={addTask}
   className='btn btn-lg btn-success'>Add Task</button>
    </div>
   </div>
   


{/*  Display TodDos*/}
{ toDo && toDo.lenght ? '': 'No Tasks...'}
{ toDo && toDo
.sort((a,b) =>  a.id > b.id ? 1 : -1)
.map( (task, index) => {
 
  return(
  <React.Fragment key={task.id}>

<div className='col taskBg'>

  <div className={task.status ? 'done' : ''}>
     <span className='taskNumber'>{index + 1}</span>
     <span className='taskText'>{task.title}</span>
 </div>

 <div className='iconsWrap'>
  <span
  onClick={(e) => markDone(task.id)}
  title='Compeleta / Not Compeleted'>
    <FontAwesomeIcon icon={faCircleCheck}></FontAwesomeIcon>
  </span>
  {task.status ? null :(
     <span title='Edit'
     onClick={() => setUpdateData({
      id: task.id,
      title: task.title,
      status: task.status ? true : false})}> 
    <FontAwesomeIcon icon={faPen}></FontAwesomeIcon>
  </span>
  )}
 
  <span title='Delete'
  onClick={() => deleteTask(task.id)}>
    <FontAwesomeIcon icon={faTrashCan}></FontAwesomeIcon>
  </span>
 </div>
</div>


  </React.Fragment>
 )
 })
}


  </div>
  );}


export default App;
