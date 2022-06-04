const firebaseConfig = {
  apiKey: "AIzaSyD9n4OetjZFQusojHNRx6zwIyruerNd6Cc",
  authDomain: "todo-app-9486e.firebaseapp.com",
  databaseURL: "https://todo-app-9486e-default-rtdb.firebaseio.com",
  projectId: "todo-app-9486e",
  storageBucket: "todo-app-9486e.appspot.com",
  messagingSenderId: "843874428578",
  appId: "1:843874428578:web:55d3bd390864b6825e59fb"
};
  var app = firebase.initializeApp(firebaseConfig);

  console.log(app);

 firebase.database().ref('todo').on('child_added',function(data){
   console.log(data.val())


   var table = document.getElementById("table");
   var val = document.getElementById("item");   
  
   var tr = document.createElement("tr");
   var txttd = document.createElement("td");
   var editbtntd = document.createElement("td");
   var delebtntd = document.createElement("td");

   var btnedit = document.createElement("button");
   var btndele = document.createElement("button");

   btnedit.setAttribute("class","editBtn");
   btndele.setAttribute("class","delBtn");
   btndele.setAttribute("id",data.val().key);
   btnedit.setAttribute("id",data.val().key);

   btnedit.setAttribute("onclick","edit_item(this)");
   btndele.setAttribute("onclick","dele_item(this)");    

   var itemval = document.createTextNode(data.val().value);
   var txtedi = document.createTextNode("Edit");
   var txtdele = document.createTextNode("delete");


   txttd.appendChild(itemval);
   btnedit.appendChild(txtedi);
   btndele.appendChild(txtdele);

   editbtntd.appendChild(btnedit);
   delebtntd.appendChild(btndele);

   tr.appendChild(txttd);
   tr.appendChild(editbtntd);
   tr.appendChild(delebtntd);
   

   txttd.setAttribute("class","firstTd");
   editbtntd.setAttribute("class","secondTd");
   delebtntd.setAttribute("class","thirdTd");

   table.appendChild(tr);
   val.value = "";
 })


function addItem() {
      var todoitm = document.getElementById("item");
      var database = firebase.database().ref("todo");
      var key = database.push().key
      // console.log(key)

      var toto = {
        value : todoitm.value,
        key : key
      }
      database.child(key).set(toto);    
      
}

function dele_item(e){
  // console.log(e.id)
  firebase.database().ref("todo").child(e.id).remove();

  e.parentNode.parentNode.remove(); 
}

function deleteAll(){
   firebase.database().ref("todo").remove();
   var tb = document.getElementById("table");
   tb.innerText  = ""; 
}
function edit_item(e){
  var val = e.parentNode.previousSibling.innerText;
  var uptal = prompt("enter new text",val);
  var edittodo = {
     value : uptal,
     key : e.id 
  }
  // console.log(edit_todo);
  firebase.database().ref("todo").child(e.id).set(edittodo);
  e.parentNode.previousSibling.innerText = uptal;
}

















