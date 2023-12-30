const express = require('express')
const productsRouter = require('./routes/products.router.js')
const cartsRouter = require('./routes/carts.router.js')
const handlebars = require('express-handlebars') // importo handlebars
const { Server: ServerIO }= require('socket.io')
const CartsManagerFS = require('./src/jsonDB/CartsManagerFS');

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))


app.engine('handlebars', handlebars.engine()) // configuro motor para plantillas
app.set('views',__dirname+'/views') //__dirname nos posiciona en src
app.set('view engine', 'handlebars')

const cartsManager = new CartsManagerFS();

// http://localhost:8080 /
app.get('/', async (req, res) => {
  try {
    const carts = await cartsManager.readFile();

    res.render('home', { carts });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor');
  }
});

app.use('./api/products', productsRouter)
app.use('/api/carts', cartsRouter)

const httpServer = app.listen(8080, () => {
  console.log('Escuchando en el puerto 8080')
})

// socket del lado del server
const socketServer = new ServerIO(httpServer)

socketServer.on('connection',socket=>{
  console.log('cliente conectado')

  socket.emit('message-server','Hola cliente')
  socket.on('message', data=>{
    console.log(data)
  })

})
