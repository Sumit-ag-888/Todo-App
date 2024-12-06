showTable()
const getFieldValue = (fildId) => {
  return document.getElementById(fildId).value;
}
const emptyFieldValues = () => {
  document.getElementById("title").value = "";
  document.getElementById("location").value = "";
  document.getElementById("description").value = "";
  document.getElementById("ddlViewBy").value = "Active";
  
}

const setFieldValue = (fildeId, idValue) => {
  document.getElementById(fildeId).value = idValue;
}


// code execute 
const handleSubmit = () => {
  event.preventDefault();

  let title = getFieldValue("title"), location = getFieldValue("location"), description = getFieldValue("description"), status = getFieldValue("ddlViewBy");

  title = title.trim();
  location = location.trim();
  description = description.trim();

  if (title.length < 3) {
    return alert("Plese input your Title correctly")
  }
  if (location.length < 3) {
    return alert("Plese input your Location correctly")
  }
  if (description.length < 10) {
    return alert("Plese input your description correctly")
  }

  let todo = {
    title,
    location,
    description,
    id: Math.random().toString(36).slice(2),
    dateCreation: new Date().getTime(),
    status
  }

  const todos = JSON.parse(localStorage.getItem("todos")) || []; //
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos));
  alert("A new todo Has been successfully added ");
  emptyFieldValues();
  showTable()

}

function showTable() {

  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  if (!todos.length) {
    document.getElementById("output").innerHTML = "<h5> HURRAY! No Task Available 😀</h5>";
    return;
  }
  let tableStartingCode = '<div class="table-responsive"><table class="table">'
  let tableEndingCode = '</table></div>'
  let tableHead = '<thrad><th scope = "col"> #</th><th scope ="col">Title</th><th scope ="col">Location</th><th scope ="col" >Description</th><th scope ="col" >Status</th><th scope ="col" >Action</th></thrad>'
  let tableBody = '';

  for (let i = 0; i < todos.length; i++) {

    let todo = todos[i];

    // tableBody += '<tr><th scope="row">' + (i + 1) + '</th><td>' + todos[i].title + '</td><td>' + todos[i].location + '</td><td>' + todos[i].description + '</td></tr>'
    tableBody += `<tr>
    <th scope="row">${i + 1}</th>
    <td>${todo.title}</td>
    <td>${todo.location}</td>
    <td>${todo.description}</td>
    <td>${todo.status}</td>
    <td><button class='btn btn-primary text-white' data-value ="${todo.id}" onclick="editTodo(event)">Edit</button>
    <button class='btn btn-danger text-white' data-value ="${todo.id}" onclick="deleteTodo(event)">Delete</button></td>
    </tr>
    `
  }
  let table = tableStartingCode + tableHead + "<tbody>" + tableBody + "</tbody>" + tableEndingCode;

  document.getElementById("output").innerHTML = table;
}


const deleteTodo = (event) => {
  let todoId = event.target.getAttribute("data-value");
  const todos = JSON.parse(localStorage.getItem("todos"));

  let todosAfterDelete = todos.filter((todo) => {
    return todo.id !== todoId
  })

  localStorage.setItem("todos", JSON.stringify(todosAfterDelete));
  alert("A todo Has been successfully deleted ")
  showTable();
}



const editTodo = (event) => {

  let todoId = event.target.getAttribute("data-value");
  const todos = JSON.parse(localStorage.getItem("todos"));

  let todo = todos.find((todo) => {
    return todo.id === todoId
  })

  const { title, location, description, status } = todo;

  setFieldValue("title", title);
  setFieldValue("location", location);
  setFieldValue("description", description);
  setFieldValue("ddlViewBy", status);


  localStorage.setItem("todoForEdit", JSON.stringify(todo))

  document.getElementById("addTaskButton").style.display = "none";
  document.getElementById("updateTaskButton").style.display = "block";


}


const handleUpdate = () => {
  event.preventDefault();
  const todoForEdit = JSON.parse(localStorage.getItem("todoForEdit"))
  let updateTitle = getFieldValue("title")
  let updateLocation = getFieldValue("location")
  let updateDescription = getFieldValue("description")
  let updateStatus  = getFieldValue("ddlViewBy")

  const updateTodo = { ...todoForEdit, title: updateTitle, location: updateLocation, description: updateDescription , status :updateStatus}
  updateTodo.dateCreation = new Date().getTime()
  console.log(updateTodo)

  const todos = JSON.parse(localStorage.getItem("todos"));

  let todosAfterUpdated = todos.map((todo) => {
    if (todo.id === todoForEdit.id)
      return updateTodo
    return todo
  })

  localStorage.setItem("todos", JSON.stringify(todosAfterUpdated))
  alert("A todo has been successfuly updated")

  showTable()
  emptyFieldValues()

  document.getElementById("addTaskButton").style.display = "block";
  document.getElementById("updateTaskButton").style.display = "none";
}