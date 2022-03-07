const validateName = (input) => {
  let name = input.trim();
  if(!name || name == "") {
    return false;
  } else {
    return true;
  }
}

const validateDuration = (input) => {
  let duration = input.trim();
  if(!duration || duration == "") {
    return false;
  } else {
    duration = JSON.parse(duration);
    if(duration < 5 || duration > 150) {
      return false;
    } else {
      return true;
    }
  }
}

const validateUrgency = (input) => {
  let urgency = input.trim();
  if(!urgency || urgency == "") {
    return false;
  } else {
    urgency = JSON.parse(urgency);
    if(urgency < -2 || urgency > 2) {
      return false;
    } else {
      return true;
    }
  }
}

const convertUrgency = (num) => {
  switch(num) {
    case -2:
      return "lowest";
      break;
    case -1:
      return "low";
      break;
    case 0:
      return "none";
      break;
    case 1:
      return "high";
      break;
    case 2:
      return "highest";
      break;
    default:
      return false;
      break;
  }
}

const addTask = () => {
  let raw_name = document.getElementById("task-name").value;
  let raw_duration = document.getElementById("task-duration").value;
  let raw_urgency = document.getElementById("task-urgency").value;
  let name, urgency, duration;

  if(validateName(raw_name)) {
    name = raw_name.trim();
  }

  if(validateDuration(raw_duration)) {
    duration = JSON.parse(raw_duration.trim());
  }

  if(validateUrgency(raw_urgency)) {
    urgency = convertUrgency(JSON.parse(raw_urgency.trim()));
  }
  
  if(name == undefined || urgency == undefined || duration == undefined) {
    return [false, "Bad Input"];
  } else {
    let task = new Task(name.toLowerCase(), (duration * 60), urgency);
    TaskManager.addTask(task);
    return [true];
  }

}
