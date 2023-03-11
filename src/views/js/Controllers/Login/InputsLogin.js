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
  
   io.emit('login', obj)

   Swal.fire({
    icon: 'error',
    title: '¡Lo sentimos!',
    text: 'Usuario o contraseña incorrectas!',
    footer: '<a href="">Olvido su contraseña?</a>',
  })
}
)


const io = require('socket.io')();
io.listen(8000);

io.on('connection', (client) => {
  io.emit('welcome');

  client.on("test", () => {
    console.log("received test"); // not displayed
    io.emit("ok", keiber = {hola:'keiber'}
    );
  })
});
