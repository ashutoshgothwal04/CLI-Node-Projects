import readline from "readline";

// Create readline interface
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const Todos = [];

// Show options to the user
const showOpt = () => {
  console.log(`\n📝 To-Do List Options:`);
  console.log(`1️⃣  Add a new task`);
  console.log(`2️⃣  View tasks`);
  console.log(`3️⃣  Update a task`);
  console.log(`4️⃣  Delete a task`);
  console.log(`5️⃣  Exit\n`);
  rl.question("👉 Choose an option: ", handleInput);
};

// Handle user input
const handleInput = (opt) => {
  if (opt === "1") {
    rl.question("✍️  Enter the task: ", (task) => {
      Todos.push(task);
      console.log(`✅ Task added: "${task}"`);
      showOpt();
    });
  } 
  
  else if (opt === "2") {
    if (Todos.length === 0) {
      console.log("\n📭 No tasks found.");
    } else {
      console.log("\n📝 Your To-Do List:");
      Todos.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
      });
    }
    showOpt();
  } 
  
  else if (opt === "3") {
    if (Todos.length === 0) {
      console.log("\n⚠️ No tasks available to update.");
      return showOpt();
    }
    rl.question("🔄 Enter the task number to update: ", (index) => {
      const taskIndex = parseInt(index) - 1;
      if (taskIndex < 0 || taskIndex >= Todos.length) {
        console.log("❌ Invalid task number.");
        return showOpt();
      }
      rl.question("✍️ Enter the updated task: ", (newTask) => {
        Todos[taskIndex] = newTask;
        console.log(`✅ Task updated: "${newTask}"`);
        showOpt();
      });
    });
  } 
  
  else if (opt === "4") {
    if (Todos.length === 0) {
      console.log("\n⚠️ No tasks available to delete.");
      return showOpt();
    }
    rl.question("🗑️ Enter the task number to delete: ", (index) => {
      const taskIndex = parseInt(index) - 1;
      if (taskIndex < 0 || taskIndex >= Todos.length) {
        console.log("❌ Invalid task number.");
        return showOpt();
      }
      const deletedTask = Todos.splice(taskIndex, 1);
      console.log(`🗑️ Task deleted: "${deletedTask}"`);
      showOpt();
    });
  } 
  
  else if (opt === "5") {
    console.log("👋 Exiting... Goodbye!");
    rl.close();
  } 
  
  else {
    console.log("❌ Invalid option. Please choose between 1-5.");
    showOpt();
  }
};

// Start the app
showOpt();
