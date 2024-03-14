// // MainPage.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
// import "../assets/style/mainpage.css";

// const MainPage = () => {
//   const [todo, setTodo] = useState([]);
//   const [processing, setProcessing] = useState([]);
//   const [running, setRunning] = useState([]);
//   const [complete, setComplete] = useState([]);
//   const [done, setDone] = useState([]);
//   const [newTask, setNewTask] = useState("");

//   useEffect(() => {
//     fetchTodo();
//   }, []);

//   const fetchTodo = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/todo");
//       setTodo(response.data);
//     } catch (error) {
//       console.error("Error fetching todo:", error);
//     }
//   };

//   const handleAddTask = async () => {
//     if (newTask.trim() !== "") {
//       try {
//         const response = await axios.post("http://localhost:5000/todo", {
//           task: newTask,
//         });
//         setTodo([...todo, response.data]);
//         setNewTask("");
//       } catch (error) {
//         console.error("Error adding task:", error);
//       }
//     }
//   };

//   const handleDragEnd = (result, source, destination, setSource, setDestination) => {
//     if (!result.destination) return;
//     const sourceList = source.filter((_, index) => index !== result.source.index);
//     const destinationList = [...destination];
//     destinationList.splice(result.destination.index, 0, source[result.source.index]);
//     setSource(sourceList);
//     setDestination(destinationList);
//   };

//   return (
//     <div className="container">
//       <div className="app-title">
//         <i className="fa fa-check bg-primary text-white rounded p-2" />
//         <u>My Todo</u>
//       </div>

//       {/* Create todo section */}
//       <div className="add-todo-wrapper">
//         <input
//           className="add-todo-input"
//           type="text"
//           placeholder="Add new task..."
//           value={newTask}
//           onChange={(e) => setNewTask(e.target.value)}
//         />
//         <button className="add-button" onClick={handleAddTask}>
//           Add
//         </button>
//       </div>

//       {/* Table section */}
//       <DragDropContext onDragEnd={handleDragEnd}>
//         <div className="tables-container">
//           <Droppable droppableId="todo">
//             {(provided) => (
//               <div className="table" ref={provided.innerRef}>
//                 <h3>To-Do List</h3>
//                 <div className="task-list">
//                   {todo.map((task, index) => (
//                     <Draggable key={task.id} draggableId={task.id} index={index}>
//                       {(provided) => (
//                         <div
//                           ref={provided.innerRef}
//                           {...provided.draggableProps}
//                           {...provided.dragHandleProps}
//                           className="task-item"
//                         >
//                           {task.task}
//                         </div>
//                       )}
//                     </Draggable>
//                   ))}
//                 </div>
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>

//           {/* Repeat the same structure for other tables */}
//           {["processing", "running", "complete", "done"].map((category) => (
//             <Droppable key={category} droppableId={category}>
//               {(provided) => (
//                 <div className="table" ref={provided.innerRef}>
//                   <h3>{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
//                   <div className="task-list">
//                     {category === "processing" && processing.map((task, index) => (
//                       <div key={index} className="task-item">
//                         {task}
//                       </div>
//                     ))}
//                     {category === "running" && running.map((task, index) => (
//                       <div key={index} className="task-item">
//                         {task}
//                       </div>
//                     ))}
//                     {category === "complete" && complete.map((task, index) => (
//                       <div key={index} className="task-item">
//                         {task}
//                       </div>
//                     ))}
//                     {category === "done" && done.map((task, index) => (
//                       <div key={index} className="task-item">
//                         {task}
//                       </div>
//                     ))}
//                   </div>
//                   {provided.placeholder}
//                 </div>
//               )}
//             </Droppable>
//           ))}
//         </div>
//       </DragDropContext>
//     </div>
//   );
// };

// export default MainPage;




// MainPage.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import "../assets/style/mainpage.css";

const MainPage = () => {
  const [todo, setTodo] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [running, setRunning] = useState([]);
  const [complete, setComplete] = useState([]);
  const [done, setDone] = useState([]);
  const [newTask, setNewTask] = useState("");

  useEffect(() => {
    fetchTodo();
  }, []);

  const fetchTodo = async () => {
    try {
      const response = await axios.get("http://localhost:5000/todo");
      setTodo(response.data);
    } catch (error) {
      console.error("Error fetching todo:", error);
    }
  };

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      try {
        const response = await axios.post("http://localhost:5000/todo", {
          task: newTask,
        });
        setTodo([...todo, response.data]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const handleDragEnd = (
    result,
    source,
    destination,
    setSource,
    setDestination
  ) => {
    if (!result.destination) return;
    const sourceList = source.filter(
      (_, index) => index !== result.source.index
    );
    const destinationList = [...destination];
    destinationList.splice(
      result.destination.index,
      0,
      source[result.source.index]
    );
    setSource(sourceList);
    setDestination(destinationList);
  };

  return (
    <div className="container">
      <div className="app-title">
        <i className="fa fa-check bg-primary text-white rounded p-2" />
        <u>My Todo</u>
      </div>

      {/* Create todo section */}
      <div className="add-todo-wrapper">
        <input
          className="add-todo-input"
          type="text"
          placeholder="Add new task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="add-button" onClick={handleAddTask}>
          Add
        </button>
      </div>

      {/* Table section */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="tables-container">
          <Droppable droppableId="todo">
            {(provided) => (
              <div className="table" ref={provided.innerRef}>
                <h3>To-Do List</h3>
                <div className="task-list">
                  {todo.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="task-item"
                        >
                          {task.task}
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Repeat the same structure for other tables */}
          {["processing", "running", "complete", "done"].map((category) => (
            <Droppable key={category} droppableId={category}>
              {(provided) => (
                <div className="table" ref={provided.innerRef}>
                  <h3>
                    {category.charAt(0).toUpperCase() + category.slice(1)}
                  </h3>
                  <div className="task-list">
                    {category === "processing" &&
                      processing.map((task, index) => (
                        <div key={index} className="task-item">
                          {task}
                        </div>
                      ))}
                    {category === "running" &&
                      running.map((task, index) => (
                        <div key={index} className="task-item">
                          {task}
                        </div>
                      ))}
                    {category === "complete" &&
                      complete.map((task, index) => (
                        <div key={index} className="task-item">
                          {task}
                        </div>
                      ))}
                    {category === "done" &&
                      done.map((task, index) => (
                        <div key={index} className="task-item">
                          {task}
                        </div>
                      ))}
                  </div>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default MainPage;
