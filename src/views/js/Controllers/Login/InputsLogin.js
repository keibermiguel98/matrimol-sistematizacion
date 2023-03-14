const Swal = require('sweetalert2')

const io = require('socket.io-client');
const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);


socket.on('connect', () => {
  console.log("connected sockeio"); 
});


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
  
   socket.emit('login', obj)

   Swal.fire({
    icon: 'error',
    title: '¡Lo sentimos!',
    text: 'Usuario o contraseña incorrectas!',
    footer: '<a href="">Olvido su contraseña?</a>',
  })
}
)



