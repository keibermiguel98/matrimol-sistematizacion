const {createLogin} = require('./main')
const {app} = require('electron')
const path = require('path')

require('electron-reload')(__dirname,{
    electron: path.join(__dirname, '../node_modules', '.bin', 'electron')
})

app.whenReady().then(createLogin)

