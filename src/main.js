const { BrowserWindow, ipcMain, webContents } = require('electron')
const db = require('./database/database')
const path = require('path'); 

// --Ventanas--

const io = require('socket.io-client');
 var socket = io("http://localhost:8000");

socket.on('welcome', () => {
console.log('welcome received'); // displayed
  socket.emit('test')
 });
 socket.on('error', (e) => {
  console.log(e); // not displayed
});
  socket.on('ok', (e) => {
    console.log(e)
   console.log("OK received"); // not displayed
 });
 socket.on('connect', () => {
  console.log("connected"); // displayed
  socket.emit('test');
});



//(1)Ventana principal login
let winLogin;
const createLogin = ()=>{
        winLogin = new BrowserWindow({
        width: 2000,
        height:1000,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation:false,
            preload:path.join(__dirname, 'views/js/Controllers/InputsLogin.js')
            
        }
    })
    winLogin.loadFile('src/views/login.html')
}

//(2)Ventana Menu-dashboard
let winIndex
const createIndex = ()=>{
       winIndex = new BrowserWindow({
        width: 2000,
        height: 1000,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false
        }
    })
    winIndex.loadFile('src/views/index.html')
}

//(3)Ventana multiStep 
let winHistoryMedica;
const createHistoryMedica = ()=>{
  winHistoryMedica = new BrowserWindow({
    width:2000,
    height:1000,
    webPreferences:{
      nodeIntegration: true,
      contextIsolation: false
    }
  })
  winHistoryMedica.loadFile('src/views/historyMedica.html')
}

// ---Middlewares--

// (1)Recibir el objeto de los input login para el query
socket.on('login',(obj)=>{
  console.log('Inicio de session',obj)
  validatelogin(obj)
  socket.emit('info', 'informacion guardada')
})

// (2)Recibir el objeto de los input usuarios para el query 
ipcMain.handle('User:Data', (event,datosUsuario)=>{
  console.log(datosUsuario)
  inserDataUser(datosUsuario)
})


ipcMain.handle('clicked', (event,obj)=>{
    console.log(obj)
    VentanaHostoryMedica()
    winHistoryMedica.show()
})  



//-- Funciones --

//(1)Evento de init ventana de historia medica
function VentanaHostoryMedica(){
  createHistoryMedica()
}

// --Consultas mysql--   

// (1)Consulta de inicio de session
  function validatelogin(obj) {
   const { username, password } = obj 
   const sql = "SELECT * FROM usuarios WHERE username=? AND password=?"
    db.query(sql,[username,password], (error, results, fields) => {
      if(error){ console.log(error);}
  
      if(results.length > 0){
         createIndex()
         winIndex.show()
         winLogin.close()
       }else{
         console.log('Username o password faild!')
       }
      
    });
  }


  //(2)INSERTAR datos de usuarios
  function inserDataUser(datosUsuario){
    const sql = "INSERT INTO usuarios SET ?";
      db.query(sql, datosUsuario, (error, results, field)=>{
        if(error){
          console.log(error)
        }
        else{
          console.log(results)
        }
      })
  }

  //(3)Obtener datos de usuarios
  ipcMain.handle('get:User', ()=>{
    getUsuarios()
  })

  function getUsuarios(){
    sql = 'SELECT * FROM usuarios';
    db.query(sql,(error, results )=>{
      if(error){
        console.log(error)
        console.log('ocurrio un error al consultar usuario')
      }
       winIndex.webContents.send('usuarios', results)
    })
  }

// --Exportaciones--
module.exports = {
    createLogin,createHistoryMedica
}
