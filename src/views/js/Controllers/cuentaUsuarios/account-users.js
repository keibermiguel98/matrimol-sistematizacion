const {ipcRenderer} = require('electron')
const Swal = require('sweetalert2')


const nombre = document.querySelector('#nombre')
const apellido = document.querySelector('#apellido')
const nombreUsuario = document.querySelector('#nombreusuario')
const contrasena = document.querySelector('#contrasena')
const identificacion = document.querySelector('#identificacion')
const rol = document.querySelector('#rol')
const statuss = document.querySelector('#status')


const btnGuardar = document.querySelector('#btnGuardar');

btnGuardar.addEventListener('click', (e)=>{
    e.preventDefault()

    const datosUsuario = {
        username: nombreUsuario.value,
        password: contrasena.value,
        nombre: nombre.value,
        apellido: apellido.value,
        identificacion: identificacion.value,
        status: statuss.value,
        rol: rol.value,
        eliminado: 0,
        created_at: new Date
    }

    console.log(datosUsuario)
   

    Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        text: 'Los datos fueron almacenados  exitosamente!'
      })
      window.location.pathname = './src/views/tables-usuario.html'

    ipcRenderer.invoke('User:Data', datosUsuario)
})




