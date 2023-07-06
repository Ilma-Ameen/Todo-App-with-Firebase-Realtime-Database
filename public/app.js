// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-analytics.js";
import { getDatabase, set, push, ref, onValue, remove} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCSDxG1losV0FBcJYz1L1cstQ6QWbI0YyA",
  authDomain: "todo-app-121d4.firebaseapp.com",
  databaseURL: "https://todo-app-121d4-default-rtdb.firebaseio.com",
  projectId: "todo-app-121d4",
  storageBucket: "todo-app-121d4.appspot.com",
  messagingSenderId: "163767523387",
  appId: "1:163767523387:web:ccff9aa6194fcc51e2641e",
  measurementId: "G-T39QJ3530M"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase();



var inp = document.getElementById('input');
var ul = document.getElementById('ul');
var arr = [];

window.add = function(){
    var reference = ref(db, "tasks/");
    var keyTasks = push(reference);

    var obj = {
        inputVal: inp.value,
        id: keyTasks.key,
    }
    arr.push(obj);
    set(keyTasks, obj);

    renderList();
    inp.value = "";
}

function renderList(){
    
    const reference = ref(db, "tasks/");
    onValue(reference, (res) => {
    const data = Object.values(res.val());
    console.log(data); 
    // if(data === []){
    //     ul.innerHTML = ""
    // }
    ul.innerHTML = "";
    for(var i = 0; i < data.length; i++){
        var dataObj = data[i];
        console.log(dataObj.id);
        ul.innerHTML += `<li class="mb-4 py-3 fs-4 border rounded w-100 bg-body-tertiary">
        <div class="w-100 d-flex justify-content-between">
            <div class="w-75">
                <span class="ms-2">${dataObj.inputVal}</span>
            </div>
            <div>
                <button type="button" class="btn btn-outline-danger" onclick="del('${dataObj.id}')">
                    <i class="fa-regular fa-trash-can me-1"></i>
                    Delete
                </button>
                <button type="button" class="btn btn-outline-success me-2" onclick="edit('${dataObj.id}')">
                    <i class="fa-regular fa-pen-to-square"></i>
                    Edit
                </button>
            </div>
        </div>
    </li>`
    }
    });

}

window.del = function(obj){
    remove(ref(db, 'tasks/' + obj));
    renderList();
}

window.edit = function(obj){
    var editObj = prompt("Edit Task", "enter your task here");
    var refer = ref(db, 'tasks/' + obj + "/");
    var refer1 = refer.key;
    remove(ref(db, 'tasks/' + obj + "/"));
    set(refer, {
        inputVal : editObj,
        id: refer1
    })
    renderList()
}