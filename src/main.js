const { BrowserWindow, ipcMain, webContents } = require('electron')
const db = require('./database/database')
const path = require('path'); 

// --Ventanas--

process.env.SOCKET_PORT = 18092;

const io = require('socket.io')();
io.listen(18092);

io.on('connection', (client) => {
  console.log('Usuario conectado')

  client.on('login',(obj)=>{
    console.log('Inicio de session',obj)
    validatelogin(obj)
  })
  

  client.on('Add:Maquinarias', (maquinaria) => {
    console.log(maquinaria)
    socket.emit('informacion', 'maquinaria guardada')
  
    insertDataMaquinaria(maquinaria)
  })

  client.on('Add:Empresa', (empresa)=>{
    console.log(empresa)
    insertDataEmpresa(empresa)
  })
 

  client.on('get:Empresa', ()=>{
    function getEmpresa(){
      sql = 'SELECT * FROM empresas';
      db.query(sql,(error, results )=>{
        if(error){
          console.log(error)
          console.log('ocurrio un error al consultar usuario')
        }
         client.emit('set:Empresa', results)
      })
    }
    getEmpresa()
  })


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

// ---Middlewares--

// (1)Recibir el objeto de los input login para el query


// (2)Recibir el objeto de los input usuarios para el query 
ipcMain.handle('User:Data', (event,datosUsuario)=>{
  console.log(datosUsuario)
  inserDataUser(datosUsuario)
})


// (3)Recibir el objeto de los input maquinarias para el query 



//-- Funciones --

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
  
    //(2)INSERTAR datos de empresa
    function insertDataEmpresa(empresa){
      const sql = "INSERT INTO empresas SET ?";
        db.query(sql, empresa, (error, results, field)=>{
          if(error){
            console.log(error)
          }
          else{
            console.log(results)
          }
        })
    }

    //(2)INSERTAR datos de maquinarias
    function insertDataMaquinaria(maquinaria){
      const sql = "INSERT INTO maquinarias SET ?";
        db.query(sql, maquinaria, (error, results, field)=>{
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
    createLogin
}
