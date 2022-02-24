//import Task from "./task.js";

/*export */const TaskManager = {
	taskStack: [],
  doneTasks: [],
	idCount: 0,
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
	
	updateTasks() {
		this.taskStack[0].timeLeft -= 1;

		this.taskStack[0].timeLeft <= 0 ? this.taskFinished() : null;
	},

	taskFinished() {
		//run task finished funcs
    this.doneTasks.push(this.getTask());
		this.removeTask();
	},

	resetIds() {
		let idIndex = 0;
		for(let i=0; i < this.taskStack.length; i++) {
			this.taskStack[i].id = idIndex;
			idIndex++;
		}
		this.idCount = idIndex;
	},

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

	removeAllTasks() {
		this.taskStack = [];
	},

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

	getAllTasks() {
		return this.taskStack;
	},

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

  }
	
}
