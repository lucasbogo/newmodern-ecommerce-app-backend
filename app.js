const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler');
require('dotenv/config'); // importar .env (enviroment)

// Cors, necessário para testes backend server and front-end. VER DOCS para ter uma ideia mais clara
app.use(cors());
app.options('*', cors()) // * = HTTP method requests. Ou seja, todos os métodos serão aceitos na chamada da API para todas as origins


// Middlewares: verifica tudo que será enviado ao servido antes de ser executado 
app.use(express.json()); //  Ajudar express a compreender dados em formato json
app.use(morgan('tiny')); // Morgan: mostra os 'http requests no terminal'
app.use(authJwt());
app.use(errorHandler);
// Definir a pasta de imagens como estatica. Assim é possível ver a imagem usando a URL da mesma pelo navegador
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

// Rotas 
const categoriesRoutes = require("./routes/categories");
const ordersRoutes = require("./routes/orders");
const productsRoutes = require("./routes/products");
const usersRoutes = require("./routes/users");

// API_URL = /api/v1; ou seja: newmodern.com.br/api/v1/categories... 
const api = process.env.API_URL;

// Rotas api são definidas aqui
app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/orders`, ordersRoutes);
app.use(`${api}/products`, productsRoutes);
app.use(`${api}/users`, usersRoutes);



// Conectando MongoBD e rodando teste de conexão importa-se o .env acima e chama-se o connection_string...
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName: 'newmodern-ecommerce-app'
})
    .then(() => {
        console.log('Conexão com MongoDB bem sucedida')
    })
    .catch((err) => {
        console.log(err);
    })

// Se não quisermos trabalhar com servido em produção, descomentar...
// app.listen(3000, () => {
//     // Teste para verificar estado conexão com servidor
//     console.log('o servidor está rodando em http://localhost:3000');

// })


// Produção
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    // Teste Conexão
    console.log("O servidor está funcionando na porta " + port );
})


