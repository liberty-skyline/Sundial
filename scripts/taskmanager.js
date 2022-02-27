const TaskManager = {
	taskStack: [],
  doneTasks: [],
	idCount: 0,

  //Pretty self-explanatory
	addTask(task) {
		if(!(task instanceof Task)) {
			throw new Error("task must be of type Task");
		} else {
			task.id = this.idCount;
			this.idCount++;
			this.taskStack.push(task);
      this.resetOrder();
			this.resetIds();
		}
	},

  //Makes either a task's name or id, then removes it and updates taskStack
  //Note: no argument removes the top task
	removeTask(identifier=null) {
		if(identifier) {
			const type = typeof identifier;
			if(type == "number" || type == "string") {
				this.taskStack.every((task)=>{
					if(task.id == identifier || task.name == identifier) {
						const index = this.taskStack.indexOf(task);
						this.taskStack.splice(index, 1);
            this.resetOrder()
						this.resetIds();
						return false
					} else {
						return true;
					}
				});
			} else {
				throw new Error("identifier not of type 'number' or 'string'");
			}

		} else {
			this.taskStack.shift();
      this.resetOrder();
			this.resetIds();
		}
	},
	
  //Subtracts a second from current task, and if the task is done, run taskFinished()
	updateTasks() {
		this.taskStack[0].timeLeft -= 1;
		this.taskStack[0].timeLeft <= 0 ? this.taskFinished() : null;
	},

  //Put the finished task in doneTasks, then remove it
	taskFinished() {
		//run task finished funcs
    this.doneTasks.push(this.getTask());
		this.removeTask();
	},

  /** So the idea of resetting id's seemed like a good idea at the time,
   *  being late at night and frustrated at the code, so here we are, and
   *  id's are basically just the task's index
   */
	resetIds() {
		let idIndex = 0;
		for(let i=0; i < this.taskStack.length; i++) {
			this.taskStack[i].id = idIndex;
			idIndex++;
		}
		this.idCount = idIndex;
	},

  //This reorders the tasks by urgency
  resetOrder() {
    let taskBuffer = [];
    const urgencies = ["highest", "high", "none", "low", "lowest"];
    for(let i=0; i<urgencies.length; i++) {
      for(let j=0; j < this.taskStack.length; j++) {
        if(this.taskStack[j].urgency == urgencies[i]) {
          taskBuffer.push(this.taskStack[j]);
        }
      } 
    }
    this.taskStack = taskBuffer;
  },
  
  /** This was the result of another late night of late coding,
   *  so it's probably overly complicated, but it works, so it stays
   *  You can either use it normally, with the name/id of the task you wanna
   *  move, then the index of the place you wanna move it, or, there's a maybe
   *  useless other functionality which makes up most of its complicatedness.
   *
   *  You use the other functionality by supplying the name/id of the task you
   *  wanna move, then a string with a direction and relative task name/id like
   *  "above history" or "below 4"
   */
  moveTask(identifier, place) {
    try {
      let task = this.getTask(identifier)
      if(typeof place == "number") {
        if(place < task.id) {
          this.removeTask(identifier);
          this.taskStack.splice(place, 0, task);
        } else if(place > task.id) {
          this.removeTask(identifier);
          this.taskStack.splice(place, 0, task);
        }
      //This is where the alternate usage is
      } else if(typeof place == "string") {
        let command = place.split(" ")[0],
            dest = place.split(" ")[1],
            index;
        if((command != "above") && (command != "below")) {
          throw new Error('command must be either "above" or "below"');
        } else {
          let refTask;

          if(parseInt(dest)) {
            refTask = this.getTask(parseInt(dest));
          } else {
            refTask = this.getTask(dest);
          }

          this.removeTask(identifier);

          if(command == "above") {
            if((refTask.id - 1) < 0) {
              index = 0;
            } else {
              index = refTask.id;
            }
          } else {
            index = refTask.id + 1;
          } 
          this.taskStack.splice(index, 0, task); 
        }
      }
      //MAYBE RESETORDER()?
      this.resetIds();
    } catch(e) {
      return e;
    }
  },

  //Self explanatory
	removeAllTasks() {
		this.taskStack = [];
	},

  //Pretty self explanatory, just supply a name/id and it returns a task object
  //Note: no identifier will return the current task
	getTask(identifier) {
		if(identifier) {
			const type = typeof identifier;
			if(type == "number") {
				try {
					return this.taskStack[identifier];
				} catch(e) {
					throw new Error(`No task with id ${identifier} found`);
				}
			} else if(type == "string") {
				for(let i=0; i < this.taskStack.length; i++) {
					if(this.taskStack[i].name == identifier) {
						return this.taskStack[i];
					}
				}
				throw new Error(`${identifier} not found`);
			} else {
				throw new Error("identifier not of type 'number' or 'string'");
			}
		} else {
			return this.taskStack[0];
		}
	},

  //Self explanatory
	getAllTasks() {
		return this.taskStack;
	},

  /** This is exactly like getTask (I think I might've just copy and pasted it),
   *  but it gets a task from doneTasks
   */
  getCompletedTask(identifier) {
    if(identifier) {
			const type = typeof identifier;
			if(type == "number") {
				try {
					return this.doneTasks[identifier];
				} catch(e) {
					throw new Error(`No task with id ${identifier} found`);
				}
			} else if(type == "string") {
				for(let i=0; i < this.doneTasks.length; i++) {
					if(this.doneTasks[i].name == identifier) {
						return this.doneTasks[i];
					}
				}
				throw new Error(`${identifier} not found`);
			} else {
				throw new Error("identifier not of type 'number' or 'string'");
			}
		} else {
			return this.doneTasks[0];
		}

  },

  //Basically the doneTasks version of removeAllTasks()
  clearDoneTasks() {
    this.doneTasks = [];
  }
	
}
