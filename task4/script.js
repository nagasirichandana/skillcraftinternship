let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks(){
    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );
}

function addTask(){

    const taskText =
    document.getElementById("taskInput").value;

    const taskDate =
    document.getElementById("taskDate").value;

    const taskTime =
    document.getElementById("taskTime").value;

    if(taskText.trim() === ""){
        alert("Please enter a task");
        return;
    }

    const task = {
        text: taskText,
        date: taskDate,
        time: taskTime,
        completed: false
    };

    tasks.push(task);

    saveTasks();

    displayTasks();

    document.getElementById("taskInput").value="";
    document.getElementById("taskDate").value="";
    document.getElementById("taskTime").value="";
}

function displayTasks(){

    const taskList =
    document.getElementById("taskList");

    taskList.innerHTML="";

    tasks.forEach((task,index)=>{

        const li =
        document.createElement("li");

        li.innerHTML = `
            <div class="task-info ${task.completed ? 'completed' : ''}">
                <strong>${task.text}</strong><br>
                📅 ${task.date || "No Date"}
                &nbsp;&nbsp;
                🕒 ${task.time || "No Time"}
            </div>

            <div class="actions">
                <button onclick="toggleTask(${index})">
                    ${task.completed ? 'Undo' : 'Complete'}
                </button>

                <button onclick="editTask(${index})">
                    Edit
                </button>

                <button onclick="deleteTask(${index})">
                    Delete
                </button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

function toggleTask(index){

    tasks[index].completed =
    !tasks[index].completed;

    saveTasks();

    displayTasks();
}

function editTask(index){

    const updatedTask =
    prompt(
        "Edit Task",
        tasks[index].text
    );

    if(updatedTask !== null &&
       updatedTask.trim() !== ""){

        tasks[index].text =
        updatedTask;

        saveTasks();

        displayTasks();
    }
}

function deleteTask(index){

    if(confirm("Delete this task?")){

        tasks.splice(index,1);

        saveTasks();

        displayTasks();
    }
}

displayTasks();