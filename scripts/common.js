task1 = new Task("math", 80);
TaskManager.addTask(task1);
TaskManager.addTask((new Task("english", 90)));
Timer.startTimer();
const progressTotal = document.getElementById("progress-total");

const convertTime = (time) => {
  let mins = Math.floor(time / 60);
  let secs = time - (mins * 60);
  secs = (secs.toString().length == 1 ? ("0" + secs.toString()) : secs.toString());
  return (mins.toString() + ":" + secs);
}

const updateTimerText = () => {
  let time = Timer.time;
  let mins = Math.floor(time / 60);
  let secs = time - (mins * 60);
  secs = (secs.toString().length == 1 ? ("0" + secs.toString()) : secs.toString());
  document.getElementById("timer-text").innerHTML = mins.toString() + ":" + secs;
}

const updateTasks = () => {
  
  document.getElementById("current-task-name").innerHTML = (TaskManager.getTask().name.charAt(0).toUpperCase() + TaskManager.getTask().name.slice(1));
  document.getElementById("header-subheader-3").innerHTML = `<span id="current-task-duration" >${convertTime(TaskManager.getTask().timeLeft)}</span> Minute Sprint`;


  //convertTime(TaskManager.getTask().timeLeft);

  const temF = `<div class="upcoming-tasks-3"><div class="upcoming-tasks-4"><span class="upcoming-tasks-5">`;
  const temM = `</span></div><div class="upcoming-tasks-6"> <span class="upcoming-tasks-7">`;
  const temE = `</span></div></div>`;

  let taskString = "";
  const tasks = TaskManager.getAllTasks();
  for(i=1; i<tasks.length;i++) { 
    let mins = Math.floor(tasks[i].timeLeft / 60); 
    let secs = tasks[i].timeLeft - (mins * 60);
    secs = (secs.toString().length == 1 ? ("0" + secs.toString()) : secs.toString());

    let time = mins.toString() + ":" + secs;
    let taskHTML = temF + time + temM + (tasks[i].name.charAt(0).toUpperCase() + tasks[i].name.slice(1)) + temE;
    taskString += taskHTML;
  }
  document.getElementById("upcoming-tasks-1").innerHTML = taskString;

}

