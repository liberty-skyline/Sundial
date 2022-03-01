//import Task from "./tasks.mjs";
//import TaskManager from "./taskmanager.mjs";

/*export */const Timer = {
	time: 1500,
	intervalID: null,
  timerRunning: false,

	startTimer() {
    this.time = (1500 > TaskManager.getTask().timeLeft ? TaskManager.getTask().timeLeft : 1500);
		this.intervalID = setInterval(this.timerLoop.bind(this), 1000);
    this.timerRunning = true;
	},

	stopTimer() {
		console.log("All done!");
    //So this should never come up on the web, but in node, intervalID is some funky object and this is how you get the id
    let primitiveID;
   // if(this.intervalID[Symbol.toPrimitive]()) {
     // primitiveID = this.intervalID[Symbol.toPrimitive]();
    //} else {
      primitiveID = this.intervalID;
    //}
    
		this.intervalID ? clearInterval(primitiveID) : null;
    this.timerRunning = false;
	},

	timerLoop() {
		if(TaskManager.taskStack.length <= 0) {
      this.stopTimer()
      return;
		} else {
			if(this.time <= 0) {
				this.runBreak();
				this.time = (1500 > TaskManager.getTask().timeLeft ? TaskManager.getTask().timeLeft : 1500);
				return;
			} else {
				TaskManager.updateTasks();
				this.time--;
			}
		}
	},

	runBreak() {
		//setTimeout or something that takes 5 min + other funcs
		console.log("Break done!");
	},
  
  getCurrentProgress() {
    if(this.timerRunning) {
      let left = this.time;
      let total = 1500;
      return Math.round(((total - left) / total) * 100);
    } else {
      return undefined;
    }
  },
  
  getTaskProgress() {
    if(this.timerRunning) {
      let left = TaskManager.getTask().timeLeft;
      let total = TaskManager.getTask().duration;
      return Math.round(((total - left) / total) * 100);
    } else {
      return undefined;
    }
  },

  getTotalProgress() {
    if(this.timerRunning) {
      let total = 0;
      let done = 0;
      for(let i=0; i < TaskManager.doneTasks.length; i++) {
        let duration = TaskManager.doneTasks[i].duration ? TaskManager.doneTasks[i].duration : 0;
        total += duration;
        done += duration;
      }

      for(let i=0; i < TaskManager.taskStack.length; i++) {
        total += TaskManager.taskStack[i].duration;  
      }
      done += TaskManager.getTask().duration - TaskManager.getTask().timeLeft;
      return Math.round((done / total) * 100);
    } else {
      return undefined;
    }
  }

  
}
