
const TaskManager = require('../js/taskManager');
const assert = require('assert');

/* code for testing the add task feature  */
describe("TaskManager", () => {
  it("should add a task", function () {
  const taskManager = new TaskManager(0);
  //setup
  let len = taskManager.tasks.length;
    //Exercise
    taskManager.addTask(0,"name", "description", "assignedTo", "dueDate");
    //Verify
    assert.ok(len < taskManager.tasks.length);
  });
/* code for testing the deleting task  */

  it("should delete a task", function () {
    //Setup
    const taskManager = new TaskManager(0);
    taskManager.tasks[1]={
      id: 1,
      name: 'make website',
      description:"make website with html and css",
      assignedTo: "Ardra",
      dueDate: '2021-09-27',
    }
    len = taskManager.tasks.length;
    //console.log(len);
    //Exercise
    taskManager.getDelete(1);
   // console.log(taskManager.tasks.length);
    //Verify
    assert.ok(len > taskManager.tasks.length);
  });

 /* code for testing the getTaskIndex() function   */
  it("will check for the task id", function(){
   
    const taskManager = new TaskManager(0);
    taskManager.addTask(1,"getIndex", "description", "assignedTo", "dueDate");
    let name = "getIndex";
    let id = 1;
    //console.log(name);
    let taskId = taskManager.getTaskIndex(id);
    //console.log(taskId);
    assert.ok(name === taskManager.tasks[taskId].name);

  })
  it("will check for task for a given index", () => {
    const taskManager = new TaskManager();

    const task = {
      id:2,
      name: "test",
      assignedTo: "test",
      description: "description",
      dueDate: 2021-12-15,
      status:"PROGRESS",
    };

    taskManager.addTask(
      task.id,
      task.name,
      task.assignedTo,
      task.description,
      task.dueDate,
      task.status,
    );

    const result = taskManager.getTask(0);
    assert.deepStrictEqual(result, task);
 
  }) 
})
