const newItemInput = document.getElementById("new-item-input");
const addItemBtn = document.getElementById("add-item-btn");
const list = document.getElementById("list");
const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

tasks.forEach(task => list.appendChild(generateItem(task)));

addItemBtn.addEventListener("click", addItem);
newItemInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        addItem();
    }
});


function generateItem(task) {
    const todoItem = document.createElement("li");
    todoItem.classList.add("to-do-item");

    const description = document.createElement("div");
    description.textContent = task.description;
    if (task.done)
        description.classList.add("cross-out");

    const itemBtn = document.createElement("button");
    itemBtn.classList.add("item-btn");
    if (task.done) {
        itemBtn.classList.add("selected");
        itemBtn.textContent = "✓";
    }
    itemBtn.addEventListener("click", () => toggleDone(task, itemBtn, description));

    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn");
    deleteBtn.textContent = "×";
    deleteBtn.addEventListener("click", () => removeItem(task, todoItem));

    todoItem.append(itemBtn, description, deleteBtn);

    return todoItem;
}

function addItem() {
    const input = newItemInput.value.trim();
    if (input === "")
        return;

    const newTask = {
        description: input,
        done: false,
    };

    tasks.push(newTask);
    list.appendChild(generateItem(newTask));
    saveTasks();
    newItemInput.value = "";
}

function removeItem(task, todoItem) {
    const index = tasks.indexOf(task);
    if (index > -1)
        tasks.splice(index, 1);

    todoItem.remove();
    saveTasks();
}

function toggleDone(task, itemBtn, description) {
    task.done = !task.done;

    itemBtn.classList.toggle("selected");
    itemBtn.textContent = task.done ? "✓" : "";
    description.classList.toggle("cross-out");

    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}