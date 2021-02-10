class TaskManager {
  constructor() {
    this.tasks = [];
    this.setSearchTask = [];
    
  }
  // the addTask method
  addTask(id, tName, tAssignedTo, tDescription, tDueDate, tStatus) {
    const task = {
      // the currentId property
      id,
      priority: 0,
      name: tName,
      dueDate: tDueDate,
      assignedTo: tAssignedTo,
      description: tDescription,
      status: tStatus,

    };
    this.tasks.push(task);
    location.reload();
  }

  // Function to get the tasks array 

  // getTasks(){
  //   return this.tasks;
  // }
  // Function to return the index number of the object
  getTaskIndex(taskId) {
    for (let i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id == taskId) {
        return i;
      }
    }
  }
  // Function to  remove the object from the tasks array
  getDelete(index) {
    this.tasks.splice(index, 1);
    if (this.tasks.length < 1) {
      document.location.reload();
    }
  }

  // Function to  set the display stautus 

  setListDisplayStatusTrue() {

    localStorage.setItem("displayStatus", JSON.stringify(true));


  }

  setListDisplayStatusFalse() {

    localStorage.setItem("displayStatus", JSON.stringify(false));
    taskManager.render();
  }



  // Function to clear the entire cartStorage
  clearTasks() {
    this.tasks = [];
    //localStorage.removeItem('cartStorage');
    location.reload();
  }
  // Function to return the  task object by taking index as parameter
  getTask(index) {
    return this.tasks[index];
  }
  /*///////////// Function to edit the task properties Start //////////////////*/
  setTaskName(editName, index) {
    this.tasks[index].name = editName;
    console.log(this.tasks[index].name);
  }
  setTaskDescription(editTaskDescription, index) {
    this.tasks[index].description = editTaskDescription;
    console.log(this.tasks[index].description);
  }
  setTaskAssignedTo(editAssignee, index) {
    this.tasks[index].assignedTo = editAssignee;
    console.log(editAssignee, index);
  }
  setTaskStatus(editStatus, index) {
    this.tasks[index].status = editStatus;
  }
  setTaskDueDate(editDate, index) {
    this.tasks[index].dueDate = editDate;
  }

  setTaskPriority(editPriority, index) {

    console.log(`edit priority ${editPriority}`);

    this.tasks[index].priority = editPriority;
  }

  // Function to  change the staus to done
  setStatusForDone(objectIndex) {
    const objectSelect = this.tasks[objectIndex];
    objectSelect.status = "DONE";
    this.render();
  }
  // Set priority badge for the task 

  priorityBadge(id, status) {

    let badgeHolderTask = document.querySelector("#badge" + id);

    if (status > 0 && status < 4) {
      badgeHolderTask.classList.remove("badge-warning")
      badgeHolderTask.classList.remove("badge-danger")
      badgeHolderTask.classList.remove("badge-secondary")


      badgeHolderTask.classList.add("badge-success");
      badgeHolderTask.innerText = "Low"

    } else if (status > 3 && status < 7) {

      badgeHolderTask.classList.remove("badge-warning")
      badgeHolderTask.classList.remove("badge-danger")
      badgeHolderTask.classList.remove("badge-success")
      badgeHolderTask.classList.remove("badge-light")


      badgeHolderTask.classList.add("badge-secondary")
      badgeHolderTask.innerText = "Medium"


    } else if (status > 6 && status < 9) {

      badgeHolderTask.classList.remove("badge-success")
      badgeHolderTask.classList.remove("badge-danger")
      badgeHolderTask.classList.remove("badge-secondary")
      badgeHolderTask.classList.remove("badge-light")

      badgeHolderTask.classList.add("badge-warning")
      badgeHolderTask.innerText = "High"


    } else if (status >= 9) {
      badgeHolderTask.classList.remove("badge-warning")
      badgeHolderTask.classList.remove("badge-success")
      badgeHolderTask.classList.remove("badge-secondary")
      badgeHolderTask.classList.remove("badge-light")

      badgeHolderTask.classList.add("badge-danger")
      badgeHolderTask.innerText = "Very High"

    }else{

      badgeHolderTask.classList.remove("badge-warning")
      badgeHolderTask.classList.remove("badge-success")
      badgeHolderTask.classList.remove("badge-secondary")
      badgeHolderTask.classList.remove("badge-danger")


      badgeHolderTask.classList.add("badge-dark")
      badgeHolderTask.innerText = "Not Set"

    }
  }




  /*///////////// Function to edit the task properties End //////////////////*/

  // Function to set the progress bar in the new task card
  setProgressBar(progressBarId, statusInput) {
    const progressBarIdTimeout = progressBarId;
    const statusTimeout = statusInput;
    setTimeout(() => {
      const progressBar = document.querySelector("#" + progressBarIdTimeout);
      if (statusTimeout == "TO DO") {
        progressBar.style.width = "30%";
        progressBar.innerHTML = "TASK TO DO";
      }
      if (statusTimeout == "PROGRESS") {
        progressBar.style.width = "50%";
        progressBar.innerHTML = "TASK IN PROGRESS";
      }
      if (statusTimeout == "REVIEW") {
        progressBar.style.width = "70%";
        progressBar.innerHTML = "TASK ON REVIEW";
      }
      if (statusTimeout == "DONE") {
        progressBar.style.width = "100%";
        progressBar.innerHTML = "TASK IS DONE";
      }
    }, 0);
  }

  // Function to return the remaining days for the task

  remainingDays(data) {
    const todaysDate = new Date();
    console.log(todaysDate);
    const dataValue = new Date(data);
    console.log(dataValue);
    const daysRemaining = dataValue.getTime() - todaysDate.getTime();

    const mins = Math.round(daysRemaining / 1000 / 60);
    const hours = Math.round(mins / 60);
    let days = Math.round(hours / 24);
    // console.log(days);
    days = days == 1 ? days : days;
    return days;
  }
  // Function to unload the local storage tasks previous task
  unloadCartStorage() {
    let oldTasks = [];
    oldTasks = JSON.parse(localStorage.getItem("cartStorage")) || [];
    this.loadTask(oldTasks);
    localStorage.removeItem("cartStorage");
    oldTasks = [];
  }

  // Function to set the task id
  setIdToTask() {
    if (localStorage.key("currentIdStore") == null) {
      localStorage.setItem("currentIdStore", JSON.stringify(0));
      return 0;
    } else {
      let nextId = Number(JSON.parse(localStorage.getItem("currentIdStore")));
      nextId++;

      localStorage.setItem("currentIdStore", JSON.stringify(nextId));
      return nextId;
    }
  }

  // Function to unload the local storage tasks previous task

  unloadCartStorage() {
    let oldTasks = [];
    oldTasks = JSON.parse(localStorage.getItem("cartStorage"));
    //localStorage.removeItem('cartStorage');
    this.loadTask(oldTasks);

    oldTasks = [];
  }

  // Function to push new tasks to oldTasks array

  loadTask(oldTasks) {
    oldTasks.forEach((task) => {
      this.tasks.push(task);
    });
  }

  //Function to save tasks to the local storage for tasks array

  setCartStorage() {
    localStorage.setItem("cartStorage", JSON.stringify(this.tasks));

    console.log(localStorage);
  }

  //Function to find the task

  findTask(text) {
    let taskIds = [];
    this.tasks.forEach((task) => {
      if (task.name.includes(text)) {
        console.log(`I am task id for search ${task.id}`);
        taskIds.push(task.id);
      }
      // return task.id;
    });
    return taskIds;
  }

  //function to get the searching task array
  setSearch(task) {
    this.searchTaskArray = [];
    this.searchTaskArray = task;
    console.log(
      `This is array lenght for search task ${this.searchTaskArray.length}`
    );
  }



  //Method to sort tasks with priority

  prioritySort() {
    this.tasks.sort((a, b) => {

      return (b.priority - a.priority)


    })
    this.render();
  }

  priorityDue() {
    console.log(`I am activated`);
    this.tasks.sort((a, b) => {
      let dateA = this.remainingDays(a.dueDate);
      let dateB = this.remainingDays(b.dueDate);
      return (dateA - dateB)
    })

    this.render();
  }



  //}

  // Function to render this.tasks array

  render(call = "") {
    //this.setListDisplayStatusFalse();

     let displayStatus = JSON.parse(localStorage.getItem("displayStatus"));

    this.setCartStorage();
   console.log(displayStatus)


    if (displayStatus == false || displayStatus == null) {

      if (call == "") {
        const newCardPlace = document.querySelector("#taskDisplayList");
        const cardCopy = document.querySelector("#newtaskCard");
        newCardPlace.classList.remove("hidden-list");
        newCardPlace.innerHTML = "";

        if (this.tasks.length > 0) {
          this.tasks.forEach((task) => {
            const dueDate = task.dueDate;
            // const formattedDate = this.dueDateFormate(dueDate);
            const remainingDays = this.remainingDays(dueDate);
            const cardCopyClone = cardCopy.cloneNode(true);
            cardCopyClone.children[0].children[0].innerText = `Assigned To:  ${task.assignedTo} `;
            cardCopyClone.children[0].children[1];
            cardCopyClone.children[1].firstElementChild.innerText = `${task.name}`;
            cardCopyClone.children[1].children[1].innerText = `${task.description}`;
            cardCopyClone.children[1].children[2].innerText = `Status: ${task.status}`;
            const statusBarClone =
              cardCopyClone.children[1].children[3].children[0];
            statusBarClone.id = `statusbar${task.id}`;
            //cardCopyClone.children[2].children[0].innerText = `Due Date: ${task.name} `;
            cardCopyClone.children[2].children[0].innerText = `Task Due in ${remainingDays} days`;
            let newLi = document.createElement("li");
            newLi.appendChild(cardCopyClone);
            newLi.className = "list-item col-lg-4";
            newLi.id = task.id;
            this.setProgressBar(statusBarClone.id, task.status);
            newCardPlace.appendChild(newLi);
          });
        } else {
          console.log(this.tasks.length);
          newCardPlace.innerHTML = `<div class="no-task-display"> <h1> NO TASK TO DISPLAY</h1></div>`;
        }
      }
      if (call == "search") {
        console.log(
          `This is inside search render ${this.searchTaskArray.length}`
        );

        const newCardPlace = document.querySelector("#taskDisplayList");
        const cardCopy = document.querySelector("#newtaskCard");
        newCardPlace.classList.remove("hidden-list");
        newCardPlace.innerHTML = "";
        //this.setCartStorage();

        if (
          this.searchTaskArray.length > 0 &&
          this.searchTaskArray.length != null
        ) {
          this.searchTaskArray.forEach((task) => {
            const dueDate = task.dueDate;
            // const formattedDate = this.dueDateFormate(dueDate);
            const remainingDays = this.remainingDays(dueDate);
            const cardCopyClone = cardCopy.cloneNode(true);
            cardCopyClone.children[0].children[0].innerText = `Assigned To:  ${task.assignedTo} `;
            cardCopyClone.children[0].children[1];
            cardCopyClone.children[1].firstElementChild.innerText = `${task.name}`;
            cardCopyClone.children[1].children[1].innerText = `${task.description}`;
            //cardCopyClone.children[1].children[2].innerText = `Status: ${task.status}`;
            const statusBarClone =
              cardCopyClone.children[1].children[3].children[0];
            statusBarClone.id = `statusbar${task.id}`;
            // cardCopyClone.children[2].children[0].innerText = `Due Date: ${formattedDate} `;
            cardCopyClone.children[2].children[0].innerText = `Task Due in ${remainingDays} days`;
            let newLi = document.createElement("li");
            newLi.appendChild(cardCopyClone);
            newLi.className = "list-item col-lg-4";
            newLi.id = task.id;
            this.setProgressBar(statusBarClone.id, task.status);
            newCardPlace.appendChild(newLi);
          });
        } else {
          console.log(this.tasks.length);
          newCardPlace.innerHTML = `<div class="no-task-display"> <h1> NO RESULT FOUND , WAIT UNTILL REARRANGING TASK</h1></div>`;
          setTimeout(() => {
            location.reload();
          }, 0);
        }
      }
    }


    if (displayStatus == true) {

      if (call == "") {

        const newCardPlace = document.querySelector("#taskDisplayList");
        let listDisplayLocation = document.querySelector('#displayinlist');
       
        listDisplayLocation.innerHTML = "";
        let inListDisplay;

        newCardPlace.style.display = 'none';
        this.tasks.forEach((task) => {



          inListDisplay = `<li class="col-lg-8 list-inline inlist-display  m-auto">
            <div class="card" id=${task.id}>
                <div class="card-header inlist-display-cardheader" id="taskcard${task.id}">
                    <h5 class="mb-0">
                        <button class="btn btn-link btn-inline-display" type="button" data-toggle="collapse" data-target="#taskbody${task.id}"
                            aria-expanded="true" aria-controls="collapseOne">
                            <h5>${task.name} : ${task.assignedTo}</h5>
                             <span id="badge${task.id}" class="badge badge-pill badge-urgency"> </span>


                              <i class="fas fa-trash-alt delete-button fa-2x "></i>

                             <i class="far fa-check-square done-button fa-2x "></i>
                           
                            <i class="fas fa-edit fa-2x edit-button" type="button" data-toggle="modal" data-target="#exampleModalLong "></i>



                            
                        </button>
                       
                    </h5>
                </div>
        
                <div id="taskbody${task.id}" class="collapse show" aria-labelledby="taskcard${task.id}" data-parent="#accordionExample">
                    <div class="card-body">
                       
                        <p class="card-text "> ${task.description}</p>
                        <label for="status-bar">STATUS : ${task.status} </label>
                    </div>
                </div>
            </div>
            </li>
      `


          listDisplayLocation.innerHTML += inListDisplay;
          this.priorityBadge(task.id, task.priority);

        });




      }

      if (call == "search") {



        const newCardPlace = document.querySelector("#taskDisplayList");
        let listDisplayLocation = document.querySelector('#displayinlist');
        listDisplayLocation.innerHTML = "";
        let inListDisplay;

        newCardPlace.style.display = 'none';
        this.searchTaskArray.forEach((task) => {

          inListDisplay = `<li class="col-lg-8 list-inline inlist-display  m-auto">
            <div class="card" id=${task.id}>
                <div class="card-header inlist-display-cardheader" id="taskcard${task.id}">
                    <h5 class="mb-0">
                        <button class="btn btn-link btn-inline-display" type="button" data-toggle="collapse" data-target="#taskbody${task.id}"
                            aria-expanded="true" aria-controls="collapseOne">
                            <h5>${task.name} : ${task.assignedTo}</h5>
                             <span id="badge${task.id}" class="badge badge-pill badge-urgency"> </span>


                              <i class="fas fa-trash-alt delete-button fa-2x "></i>

                             <i class="far fa-check-square done-button fa-2x "></i>
                           
                            <i class="fas fa-edit fa-2x edit-button" type="button" data-toggle="modal" data-target="#exampleModalLong "></i>



                            
                        </button>
                       
                    </h5>
                </div>
        
                <div id="taskbody${task.id}" class="collapse show" aria-labelledby="taskcard${task.id}" data-parent="#accordionExample">
                    <div class="card-body">
                       
                        <p class="card-text "> ${task.description}</p>
                        <label for="status-bar">Status : ${task.status}</label>
                    </div>
                </div>
            </div>
            </li>
      `


          listDisplayLocation.innerHTML += inListDisplay;
          this.priorityBadge(task.id, task.priority);

        });


      }
    };
  }




}
