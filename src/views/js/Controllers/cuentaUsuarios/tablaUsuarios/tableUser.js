const {ipcRenderer} = require('electron')

let mylist; 
document.addEventListener('DOMContentLoaded', ()=>{
mylist = document.getElementById('mylist')

 renderGetUsuarios()

})

async function renderGetUsuarios(){
    await ipcRenderer.invoke('get:User')
}

ipcRenderer.on('usuarios',(event,results)=>{
    let template ="";
    let userList = results;
    console.log('Estos son los datos:',userList)

    userList.forEach(element=>{
      template+=`
   <tr> 
     <td><i class="fab fa-angular fa-lg text-danger me-2"></i> <strong>${element.id}</strong></td>
       <td>${element.rol}</td>
       <td>${element.nombre}</td>
       <td> ${element.apellido} </td>
       <td>${element.identificacion}</td>
       <td><span class="badge bg-label-info me-1">${element.status}</span></td>
    
    <td>
     <div class="dropdown">
       <button type="button" class="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
         <i class="bx bx-dots-vertical-rounded"></i>
     </button>
     <div class="dropdown-menu">
      <a class="dropdown-item" href="javascript:void(0)";>
      <i class="bx bx-edit-alt me-1"></i> Edit</a>
      <a class="dropdown-item" href="javascript:void(0)";>
      <i class="bx bx-trash me-1"></i> Delete</a >
    </div>
  </div>
 </td>
 </tr>
 `;
    })

    mylist.innerHTML= template;
})
