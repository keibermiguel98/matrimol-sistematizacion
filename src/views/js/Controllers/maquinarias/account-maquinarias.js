const Swal = require('sweetalert2')

codigo = document.getElementById("codigo")
descripcion = document.getElementById("descripcion")
button = document.getElementById("btnGuardar")

const io = require('socket.io-client');
const socket = io(`http://localhost:${process.env.SOCKET_PORT}`);

button.addEventListener("click", (e)=>{
    e.preventDefault()

    const maquinaria = {
        codigo: codigo.value,
        descripcion: descripcion.value,
        status: 1,
        created_at: new Date,
        eliminado: 0
    }

    socket.emit('Add:Maquinarias', maquinaria)
    window.location.pathname = './src/views/tables-usuario.html'

    Swal.fire({
        icon: 'success',
        title: '¡Felicidades!',
        text: 'Los datos fueron almacenados  exitosamente!'
      })

})

  