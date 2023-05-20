    let nameInputField = document.getElementById('input_name');
    let emailInputField = document.getElementById('input_email');
    let nameUPdate = document.getElementById('update_name')
    let emailUpdate = document.getElementById('email_update')
    let cancelButton = document.getElementById('delete_btn')
    let updateButton = document.getElementById('update_btn')
    let addButton = document.getElementById('add_btn');
    let tableBody = document.getElementById('table_body');
    let updateContainer = document.getElementById('updateContainer')
    let users = JSON.parse(localStorage.getItem('users'))||[];
    let currentUserId = 1;

    function renderTable(){
        users = JSON.parse(localStorage.getItem('users'))||[];

        tableBody.innerHTML="";
        for(let i =0; i<users.length ;i++){
            let user =users[i];

        let tr = document.createElement('tr');
        tr.innerHTML = `
        <td>
        ${user.id}
        </td>
        <td>
        ${user.name}
        </td>
        <td>
        ${user.email}
        </td>
        <td>
        <button onClick=showUpdateForm(${user.id})>edit</button>
        <button onclick=deleteUser(${user.id})>delete</button>
        </td>
        
        `;
            tableBody.appendChild(tr)
        }
        
    }


    function addUser(){
        let userName = nameInputField.value;
        let userEmail = emailInputField.value;
        if(userName !='' && userEmail !=''){
            let id = 1;
            let val = users.map(function(x){return x.id}).indexOf(id)
               while(val !=-1){
                id++;
                val= users.map(function(x){return x.id}).indexOf(id)
               }
            let user={
                id:id,
                name:userName,
                email:userEmail
            }
            users.push(user);
            users.sort(function(a, b) {
                if (a.id !== b.id) {
                    return a.id - b.id
                }
                if (a.name === b.name) {
                  return 0;
                }
                return a.name > b.name ? 1 : -1;
            });
            localStorage.setItem('users',JSON.stringify(users));
            nameInputField.value='';
            emailInputField.value='';
            renderTable();
        }else{
            alert("input fields are required")
        }

    }
function deleteUser(userId){
        let deletedUser = users.filter((user)=>user.id !== userId);
        localStorage.setItem('users',JSON.stringify(deletedUser));
        renderTable();
   }
function showUpdateForm(userId){
        updateContainer.style.display="block"
        console.log(userId)
        let user = users.find((element)=>element.id === userId)
            if(user){
                nameUPdate.value = user.name
                emailUpdate.value = user.email
                currentUserId= user.id
            }

        updateButton.addEventListener('click',()=>{
            updateUser();
        })
        
        
   }
function updateUser(){
    let name = nameUPdate.value
    let email = emailUpdate.value
    let user = users.findIndex((user)=>user.id === currentUserId)
        if(user != -1){
            users[user].name=name
            users[user].email=email
            localStorage.setItem('users',JSON.stringify(users))
            cancelForm()
            renderTable()
        }
    
}
function cancelForm(){
    updateContainer.style.display="none"
}
cancelButton.addEventListener('click',()=>{
    cancelForm()
})
addButton.addEventListener('click',addUser);

renderTable();
