# API NewModern Ecommerce App 

### Sobre:

Aplicativo desenvolvido como trabalho obrigatório para a disciplina de **Projeto Integrador II** do curso de **Tecnologia em Ánalise e Desenvolvimento de Sistemas**. Este é repositório referente ao **BACK-END** da nossa aplicação. Portanto, eis aqui a **API NewModern Ecommerce**.
<br>
O repositório referente às telas da aplicação newmodern econtra-se neste repositório: [NewModern Ecommerce App Screens](https://github.com/lucasbogo/newmodern-ecommerce-app-screens)

### Ferramentas, Tecnologias e Padrões utilizados neste projeto:

-  **Node JS v18.9.0**
-  **Node Monitor : nodemon**
-  **Express JS**
-  **React Native**
-  **Expo CLI** 
-  **MongoDB**
-  **Mongoose**
-  **Morgan library**
-  **Cors**
-  **BcryptJS**
-  **Express-JWT**
-  **RESTful API**
-  **Postman**



---------------------------------------------------------------------------------------------------------------------------------------------------------
# Node.js v18.9.0
[Documentação Oficial](https://nodejs.org/en/)

### Sobre:

Como um ambiente de execução JavaScript assíncrono orientado a eventos, o Node.js é projetado para desenvolvimento de aplicações escaláveis de rede. No exemplo a seguir, diversas conexões podem ser controladas ao mesmo tempo. Em cada conexão a função de callback é chamada. Mas, se não houver trabalho a ser realizado, o Node.js ficará inativo.

### Instalação:

#### Instalar a versão estável do Node.js
```
sudo apt install nodejs -y
```
#### Instalar NPM
```
sudo apt install npm -y
```
#### Verificar versão instalada Node.js
```
nodejs --version
```
#### Verificar versão instalada NPM
```
npm --version
```
---------------------------------------------------------------------------------------------------------------------------------------------------------
# ExpoCLI
[Documentação Oficial](https://docs.expo.dev/workflow/expo-cli/)

### Sobre:

O Expo é uma ferramenta que facilita no desenvolvimento de aplicativos mobile com React Native, já que ele abstrai todas as partes complexas de configuração do ambiente e te permite acesso rápido e fácil a várias API’s nativas.

Com o Expo, é possível usar a API de câmera e notificações, por exemplo, sem muita dificuldade, já que não é necessário fazer nenhuma configuração de API.

Além disso, é possível programar para iOS sem precisar de um macOS, apenas um dispositivo físico com iOS. Isso tudo é possível porque a Expo disponibiliza um aplicativo móvel, que pode ser baixado pelas lojas da Play Store ou Apple Store, que já contém todo o código nativo para iniciar a aplicação React Native.

Com essas facilidades, o programador só precisa basicamente se preocupar com o código Javascript, sem ter que instalar SDK do Android ou Xcode para iOS. Dessa forma, em poucos minutos já é possível ver uma aplicação rodando diretamente no celular ou em um emulador ou simulador.

### Instalação:

#### Depois de instalar o Node.js crie o diretorio do seu projeto, exemplo:
```
mkdir newmodern-app
```
#### Entre:
```
cd newmodern-app
```
#### Instale expo cli globalmente ( -g )
```
npm install -g expo -cli
```
#### Use Expo
```
expo init --npm
```
#### Insira as informações do seu projeto conforme a sua demanda. Exemplo:
```
name app: newmodern-ecommerce-app
```
#### Escolha o Template: No meu caso, escolhi blank (template limpo)
```
blank
```
#### O NPM instalará os templates e as dependencias do JavaScript

#### Entre no projeto recém criado
```
cd newmodern-ecommer-app
```
#### START EXPO
```
npm start
```

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Node Monitor (nodemon)
[Documentação Oficial](https://www.npmjs.com/package/node-monitor)

### Sobre:

nodemon é uma ferramenta que ajuda a desenvolver node. js, reiniciando automaticamente o aplicativo do nó quando as alterações de arquivo no diretório são detectadas. Para usar o nodemon, substitua a palavra node na linha de comando ao executar seu script. No terminal, em vez de digitar node app.js, você pode digitar: npm start.

### Instalação:

#### RODAR comando:
```
npm install nodemon
```
#### No pacote json ```package.json``` editar o ```"scripts"``` assim:
```
"scripts": {
    "start": "nodemon app.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```
#### TESTAR:
```
npm start
```
---------------------------------------------------------------------------------------------------------------------------------------------------------

# Mongoose
[Documentação Oficial](https://mongoosejs.com/)

### Sobre:
Mongoose é uma biblioteca de programação orientada a objetos JavaScript que cria uma conexão entre o MongoDB e o ambiente de tempo de execução JavaScript Node.js.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm install mongoose
```
#### Criar constante em app.js:
```
const mongoose = require('mongoose');
```


---------------------------------------------------------------------------------------------------------------------------------------------------------
# MongoDB - Conexão
[Documentação Oficial](https://www.mongodb.com/pt-br/what-is-mongodb)

### Sobre:

MongoDB é um banco de dados de documentos com a escalabilidade e flexibilidade que você deseja junto com a consulta e indexação que você precisa. O modelo documental do MongoDB é simples para os desenvolvedores aprenderem e utilizarem, ao mesmo tempo em que oferece todas as capacidades necessárias para atender aos requisitos mais complexos em qualquer escala. Fornecemos drivers para mais de 10 idiomas, e a comunidade construiu muitos mais.

### Características de um banco de dados NoSQL

- Banco de dados NoSQL como o MongoDB não seguem restrições como o SQL.
- As Tabelas (tables) são chamadas de **Collections**
- Ao invés de *Model* e *Migrations Tables*, trabalha-se com **Schemas**

#### PORTANTO: criamos **Schemas** para criar **Collections** no MongoDB

### INSTALAÇÃO:


#### Não é ncessário instalar o MongoDB. Basta acessar: ```https://www.mongodb.com/``` e criar uma conta.

#### Após a criação da conta em MongoDB e configuração do ambiente de desenvolvimento em uma IDE de sua preferência, seguir o tutorial abaixo:

#### Criar Um Banco de Dados (Create a Database). Por exemplo:
```
newmodern-ecommerce-app 
```
#### Escolher a forma de *deployment* em nuvem (Deploy a cloud database). Escolher o gratutito ja que se trata de um trabalho acadêmico... ```shared``` 

#### Escolher a região do servidor ```Sao Paulo (sa-east-1)``` é a mais próxima.

#### Nomear o Cluster. Por exemplo: ```newmodern-app```

#### Criar Usuário (Security Quickstart): ``` basta inserir a informação solicitada``` 

#### Escolher como deseja se conectar (Where would you like to connect from?) *meu ambiente local (My local enviroment)* ou *ambiente nuvem (cloud enviroment)*. No meu caso, escolhi ``` local enviroment``` 

#### Adicionar entradas à sua lista de acesso IP (Add entries to your IP Access List). Basta clicar em ```Add My Current IP Adress``` para adicionar seu IP automaticamente.
```
Exemplo tirado de random IPs: 113.84.246.70
```
#### PRONTO. Você Agora possui um *cluster*, isto é: coleção de conjuntos de dados distribuídos em vários shards (servidores) para obter escalabilidade horizontal e melhor desempenho em operações de leitura e gravação.

### CONECTAR DRIVER MongoDB ao seu projeto:

#### VÁ PARA (GO TO):
```
connect -> connect your application...
```
#### SELECIONE O DRIVER E A VERSÃO
```
node.js 

4.1 or later
```

#### Adicione sua string de conexão ao código do aplicativo (Add your connection string into your application code)
```
mongodb+srv://<nome_usuario>:<password>@cluster0.jsjjdjdjdjdsss.mongodb.net/?retryWrites=true&w=majority
``` 
#### Crie a variável do ambiente (enviroment variable)[.env] e passe a String MongoDB ```CONNECTION_STRING``` :
```
CONNECTION_STRING = mongodb+srv://<nome_usuario>:<password>@cluster0.jsjjdjdjdjdsss.mongodb.net/?retryWrites=true&w=majority
```
#### TROQUE  *nome_usuario* e *password* de acordo com os seus dados inseridos no momento da criação do cluster.

#### Após isso, passe a variável .env no *connect method* do framework **mongoose** em ```app.js```
```
// Conectando MongoBD e rodando teste de conexão importa-se o .env acima e chama-se o connection_string...
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName:'newmodern-ecommerce-app'
})
```
#### Para verificar se a conexão foi bem sucedida, escreva o seguinte código no *main* do seu projeto, o meu caso é ```app.js```
```
// Conectando MongoBD e rodando teste de conexão importa-se o .env acima e chama-se o connection_string...
mongoose.connect(process.env.CONNECTION_STRING, {
    dbName:'newmodern-ecommerce-app'
})
.then(()=>{
    console.log('Conexão com MongoDB bem sucedida') 
})
.catch((err)=> {
    console.log(err);
})
```
#### Pronto. A conexão com BD foi estabelecida.

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Express.JS
[Documentação Oficial](https://expressjs.com/en/starter/installing.html)

### Sobre:

Express.js é um framework para Node.js que fornece recursos mínimos para construção de servidores web. Foi lançado como software livre e de código aberto sob a Licença MIT. É um dos mais populares frameworks para servidores em Node.js.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm install express
```
#### Criar constante em app.js:
```
const express = require('express');
```
#### PRONTO!

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Morgan
[Documentação Oficial](https://www.npmjs.com/package/morgan)

### Sobre:
HTTP request logger middleware for node.js | Middleware do registrador de solicitações HTTP para node.js

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm install morgan
```
#### Criar constante em app.js:
```
const morgan = require('morgan');
```
#### PRONTO!

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Cors
[Documentação Oficial](https://developer.mozilla.org/pt-BR/docs/Web/HTTP/CORS)

### Sobre:
CORS - Cross-Origin Resource Sharing (Compartilhamento de recursos com origens diferentes) é um mecanismo que usa cabeçalhos adicionais HTTP para informar a um navegador que permita que um aplicativo Web seja executado em uma origem (domínio) com permissão para acessar recursos selecionados de um servidor em uma origem distinta. Um aplicativo Web executa uma requisição cross-origin HTTP ao solicitar um recurso que tenha uma origem diferente (domínio, protocolo e porta) da sua própria origem.

Um exemplo de requisição cross-origin: o código JavaScript frontend de um aplicativo web disponível em http://domain-a.com usa XMLHttpRequest para fazer uma requisição para http://api.domain-b.com/data.json.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm install cors
```
#### Criar constante em app.js:
```
const cors = require('cors');
```


---------------------------------------------------------------------------------------------------------------------------------------------------------
# BcryptJS
[Documentação Oficial](https://www.npmjs.com/package/bcryptjs)

### Sobre:
O bcryptjs é uma biblioteca para encriptação de dados. Neste caso, o dado a ser criptografado é o password. No método hash, recebemos o password como um dos parâmetros e um número inteiro (10), que indica a quantidade de caracteres que será acrescentado aleatoriamente na senha.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm install bcryptjs
```
#### Criar constante em users.js:
```
const bcrypt = require('bcryptjs');
```
#### Exemplo:
```
password: bcrypt.hashSync(req.body.password, 10), 
```
---------------------------------------------------------------------------------------------------------------------------------------------------------
# JsonWebToken
[Documentação Oficial](https://jwt.io/) 
[Outras Docs](https://www.npmjs.com/package/jsonwebtoken)

### Sobre:
O JSON Web Token é um padrão da Internet para a criação de dados com assinatura opcional e/ou criptografia cujo payload contém o JSON que afirma algum número de declarações. Os tokens são assinados usando um segredo privado ou uma chave pública/privada.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm i jsonwebtoken
```

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Express JWT
[Documentação Oficial](https://www.npmjs.com/package/express-jwt) 


### Sobre:

Este módulo fornece middleware Express para validar JWTs (JSON Web Tokens) por meio do módulo jsonwebtoken. A carga útil JWT decodificada está disponível no objeto de solicitação.

**JWT**, resumidamente, é uma string de caracteres que, caso cliente e servidor estejam sob HTTPS, permite que somente o servidor que conhece o ‘segredo’ possa validar o conteúdo do token e assim confirmar a autenticidade do cliente. O token não é “criptografado”, mas “assinado”, de forma que só com o secret essa assinatura possa ser comprovada, o que impede que hackers “criem” tokens por conta própria.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm i express-jwt
```

---------------------------------------------------------------------------------------------------------------------------------------------------------
# Multer
[Documentação Oficial](https://www.npmjs.com/package/multer) 


### Sobre:

A biblioteca Multer possibilita realizar *upload* de imagens no servidor. Essa biblioteca é responsável por lidar com **multipart/form-data**, isto é, upload de imagens.

### Instalação:

#### Dentro do diretório do projeto, RODAR o comando:
```
npm i multer
```
#### Importar a biblioteca Multer em ```routes/product/js```
```
const multer = require('multer');
```
#### Para obter mais controle em relação ao armazenamento è possível utilizar o engine DiskStorage da biblioteca Multer. Ou seja, no arquivo product.js, basta copiar e colar o engine DiskStorage:
```
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
```







