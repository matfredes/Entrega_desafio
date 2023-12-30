const socket = io() // config para poder usar socket del lado del cliente

socket.emit('message','Hola como estas server')
socket.on('message-server',data=>{
    console.log(data)
})

socket.emit('solo-individual','Solo para el server')

// NECESITO AYUDA