//These are temporary for testing purposes
//task1 = new Task("math", 80);
//TaskManager.addTask(task1);
//TaskManager.addTask((new Task("english", 90)));

//The progress bar at the bottom of the main page
let progressTotal = undefined; 

//Converts seconds to a min:sec format (as a string)
const convertTime = (time) => {
  let mins = Math.floor(time / 60);
  let secs = time - (mins * 60);
  secs = (secs.toString().length == 1 ? ("0" + secs.toString()) : secs.toString());
  return (mins.toString() + ":" + secs);
}

//Updates main timer at the top of main page based on Timer.time
const updateTimerText = () => {
  let time = TaskManager.getTask().timeLeft;
  document.getElementById("timer-text").innerHTML = convertTime(time);
}

//Updates both the task list, if title is true, it also displays the currenttask
const updateTasks = (title=true) => {
  
  //Displays the current task name and duration if title is true
  if(title) {
    document.getElementById("current-task-name").innerHTML = (TaskManager.getTask().name.charAt(0).toUpperCase() + TaskManager.getTask().name.slice(1));
    document.getElementById("header-subheader-3").innerHTML = `<span id="current-task-duration" >${convertTime(TaskManager.getTask().duration)}</span> Minute Sprint`;
  }

  /** HTML templates for the task list
   *  temT (template top) is the text that says "Your upcoming tasks"
   *  temF (template first) is the HTML before the task name
   *  temM (template middle) is the HTML between the task name and duration
   *  temE (template end) is the HTML after the task duration
   *  Uncreatively named? Yes, it is, deal with it
   */
  const temT = `<span class="upcoming-tasks-2">Your Upcoming Tasks</span>`;
  const temF = `<div class="upcoming-tasks-3"><div class="upcoming-tasks-4"><span class="upcoming-tasks-5">`;
  const temM = `</span></div><div class="upcoming-tasks-6"> <span class="upcoming-tasks-7">`;
  const temE = `</span></div></div>`;

  //Task string that later gets popped into DOM
  let taskString = "";

  //List of tasks that are currently in taskStack
  const tasks = TaskManager.getAllTasks();

  //Iterates through each task, uses the templates to create HTML for each task, then appends it to taskString
  for(i=1; i<tasks.length;i++) { 
    let mins = Math.floor(tasks[i].timeLeft / 60); 
    let secs = tasks[i].timeLeft - (mins * 60);
    secs = (secs.toString().length == 1 ? ("0" + secs.toString()) : secs.toString());

    let time = mins.toString() + ":" + secs;
    let taskHTML = temF + time + temM + (tasks[i].name.charAt(0).toUpperCase() + tasks[i].name.slice(1)) + temE;
    taskString += taskHTML;
  }

  //Because I designed this with the main page in mind and I didn't want to change too much, this is here to add the first task in taskStack to the top of taskString
  if(!title) {
    taskString = (temF + convertTime(TaskManager.taskStack[0].timeLeft) + temM + (TaskManager.taskStack[0].name.charAt(0).toUpperCase() + TaskManager.taskStack[0].name.slice(1)) + temE) + taskString;

  }

  taskString = temT + taskString;

  document.getElementById("upcoming-tasks-1").innerHTML = taskString;

}

const updateProgressBar = () => {
  document.getElementById("progress-total").innerHTML = Timer.getTotalProgress().toString() + "%";
  document.getElementById("progress-bar-4").style["width"] = Timer.getTotalProgress().toString() + "%";
}

const checkLocalStorage = () => {
  if(!localStorage.getItem("taskStack")) {
    localStorage.setItem("taskStack", JSON.stringify([]));
  }

  if(!localStorage.getItem("time")) {
    localStorage.setItem("time", JSON.stringify(0));
  }
}

const updateLocalStorage = () => {
  localStorage.setItem("taskStack", JSON.stringify(TaskManager.taskStack));
  localStorage.setItem("time", JSON.stringify(Timer.time));
} 

const finishedTasks = () => {
  updateLocalStorage();
  //Progress bar & text
  document.getElementById("progress-total").innerHTML = "100%";
  document.getElementById("progress-bar-4").style["width"] = "100%"
  
  document.getElementById("current-task-name").innerHTML = "All Done!";
  document.getElementById("header-subheader-3").innerHTML = "";

  document.getElementById("timer-text").innerHTML = "0:00";
  
}
