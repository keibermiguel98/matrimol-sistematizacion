const Swal = require('sweetalert2')

const io = require('socket.io-client');
const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);

const descripcion = document.querySelector('#descripcion')
const nit = document.querySelector('#nit')
const direccion = document.querySelector('#direccion')

const btnGuardar = document.querySelector('#btnGuardar');


btnGuardar.addEventListener('click', (e)=>{
    e.preventDefault()

    const dataEmpresa = {
        descripcion: descripcion.value,
        nit: nit.value,
        direccion: direccion.value,
    }

    console.log(dataEmpresa)
     
    socket.emit('Add:Empresa', dataEmpresa)

    Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        text: 'Los datos fueron almacenados  exitosamente!'
      })
      window.location.pathname = './src/views/tables-empresa.html'

})
