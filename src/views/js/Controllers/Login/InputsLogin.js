const {ipcRenderer} = require('electron')
const Swal = require('sweetalert2')


username = document.querySelector("#username");
password = document.querySelector("#password");
btnLogin = document.querySelector("#btnLogin");

btnLogin.addEventListener('click',(e)=>{
  e.preventDefault()
  
  const obj = {
    username: username.value,
    password: password.value
  }
  console.log(obj)
  
   ipcRenderer.invoke('login', obj)

   Swal.fire({
    icon: 'error',
    title: '¡Lo sentimos!',
    text: 'Usuario o contraseña incorrectas!',
    footer: '<a href="">Olvido su contraseña?</a>',
  })
}
)
