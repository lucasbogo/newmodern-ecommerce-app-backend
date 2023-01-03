// Importar Models e Bibliotecas
const { Product } = require('../models/product');
const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose'); // biblioteca para lidar com BD (tipo Eloquent ORM no Laravel)
const multer = require('multer'); // biblioteca de upload de imagens

/**
 * Engine DiskStorage, econtrado na documentação da biblioteca Multer em: https://www.npmjs.com/package/multer
 * 
 * A biblioteca Multer possibilita realizar o 'upload' de imagens no servidor.
 * 
 * Essa biblioteca é responsável por lidar com multipart/form-data, isto é, upload de imagens.
 * 
 * Para evitar futuros erros em relação aos nomes das imagens, principalmente, quando deve-se realizar
 * o update de imagens (trocar imagem antiga por imagens novas, onde deve-se realizar a troca no nome, etc.),
 * utiliza-se, portanto, o engine DiskStorage: esse engine traz mais controle ao desenvolvedor...
 * O código desse engine foi tirado da documentação do Multer, conforme mostra as linhas 22 a 32, (variável storage)
 * 
 * O código DiskStorage fornece o controle dos seguintes campos:
 *  
 * DESTINO(destination): onde será guardado os arquivos
 * 
 * destination possui uma função, o arquivo(file) e o callback(cb); 
 * o callback é retornado se existe algum erro de upload. O callback, além de fornecer os erros, caso ocorra
 * também específica o local onde as imagens devem ser armazenadas, por exemplo: cb(null, '/tmp/local-armazenamento);
 * No nosso caso, as imagens ficarão salvas na pasta 'public/uploads.
 * 
 * NOME_ARQUIVO(filename): controle sobre a como os arquivos devem ser nomeados
 * 
 * filename possui as mesmas caracteristicas que destination, isto é, funcão, requisição, o arquivo e o callback (cb)
 * o código tirado da documentação cria um sufixo único para o arquivo com a data e uma função matemática randômica.
 * 
 * ----------------------------------------------------------------------------------------------------------------------
 * 
 * TROQUEI LÓGICA RANDOM MATH DE FILENAME:
 * filename: function (req, file, cb) {
 *       const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
 *       cb(null, file.fieldname + '-' + uniqueSuffix)
 *   }
 *
 *   POR
 * 
 *   filename: function (req, file, cb) {
 *       const fileName = file.originalname.split(' ').join('-');
 *       cb(null, file.fieldname + '-' + uniqueSuffix)
 *   }
 *   
 * 
 * 
 * Achei melhor utilizar a mesma lógica que eu utilizei no projeto integrador 1.
 * 
 * OU SEJA, pega-se o nome original do arquivo, (file.originalname). Quando quiseremos realizar PUT (update)
 * de fotos, basta realizar a lógica de trocar originalname por newname...
 * 
 * Outro ponto importante, para evitar URL poluída (%2 quando há espaço no nome de arquivos), podemos utilizar a lógica explode
 * EXPLODE (função Laravel) que retira ponto e espaços dos nomes de arquivos.
 * Em Node.js, o 'explode' ocorre pelo o uso de .split e .join.
 * 
 * OU SEJA, file.originalname.split(' ').join('-');  = trocar espaços em branco (split(' ')) e unir esses
 * espaços com híphen ou digito (.join('-')). 
 * 
 * Essa prática serve para deixar a url elegante. Evita aquelas urls gingantescas, cheia de caracteres como %2 (espaços)
 * 
 * no CallBack (cb) de filename (linha 74) utilizamos o método Date.now(). Esse método pega a data atual da
 * criação,(upload) do arquivo.
 * 
 * A 'Constant' upload (linha 83) deve ser passado no PRODUCT POST REQUEST (linha 171). 
 * Ressalto que essa lógica foi tirada da documentação Multer, especificamente essa parte:
 * 
 * app.post('/profile', upload.single('avatar'), function (req, res, next) {
 * // req.file is the `avatar` file
 * // req.body will hold the text fields, if there were any
 * })
 * 
 * Para deixar mais elegante o nome e data do upload da imagem, passamos nomeArquivo-dataUpload.extensão
 * 
 * OU SEJA:
 * 
 * De: http://localhost:3000/public/uploadsimage-1664223557207",
 * PARA:...
 * 
 * É necessário, também, validar os tipos de arquivos que o usuário pode subir para o servidor.
 * Queremos aceitar apenas jpg e png. Portanto, precisamos validar jpg e png e recusar todas as outras 
 * extensões, como PDF, .DOC, XLS, .exe, etc...
 * 
 * const FILE_TYPE_MAP = {
 * image/png = key(chave) e 'png' = value(valor)
 * 
 * A chave e o valor servem para definir o 'mime type' (ver documentação mime type do mozzilla)
 * Ou seja, todo tipo de arquivo possui um mime type e a sintaxe é exatamente como passamos na lista de extensões
 * 
 *  // Incluirá o tipo da extensão da imagem/arquivo definadas em const FILE_TYPE_MAP
        file.mimetype
 *
 */

// Validar as extensões que serão aceitas no servidor NewModern
const FILE_TYPE_MAP = {
    // Aqui contém lista extensões que são aceitas p/ upload.
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/jpeg': 'jpeg'


}

// DiskStorage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Definir erro no CallBack: Verifica se o mimetype são compatíveis com os definidos onst FILE_TYPE_MAP (linha 100)
        const valid = FILE_TYPE_MAP[file.mimetype];
        // Mensagem de erro p/ upload de imagens fora dos definidos no MAP, linha 100
        let uploadError = new Error('tipo de imagem inválido. Aceiamos png, jpg e jpeg');
        // Se o arquivo é válido:
        if (valid) {
            // não mostra mensagem de erro e...
            uploadError = null
        }
        //realiza-se o callback com a mensagem de erro, ou inserção de imagem em public/uploads 
        cb(uploadError, 'public/uploads')
    },
    filename: function (req, file, cb) {

        const fileName = file.originalname.split(' ').join('-');
        // definir mimetype(extensões que serão aceitas)
        const extension = FILE_TYPE_MAP[file.mimetype];
        cb(null, `${fileName}-${Date.now()}.${extension}`)
    }
})

const upload = multer({ storage: storage })


// GET lista com todos os produtos e suas respectivas categorias filtradas 
router.get(`/`, async (req, res) => {
    // Criar a variável filter como um objeto vazio
    let filter = {};
    // Realizar a query para pegar todas as categorias 
    if (req.query.categories) {
        // Atribui todas as categorias à variável filter e separa-as por vírgula. Assim é possível buscar produtos passando o id na url
        // Exemplo: http://localhost:3000/api/v1/products?categories=63277cf7be98c07458bd271f,63277f44a9884c702e65d4e7
        filter = { category: req.query.categories.split(',') };
    }
    const productList = await Product.find().populate('category');

    // Teste: se não existe uma lista de produto, retorna 500 Internal Server Error como resposta.
    if (!productList) {
        res.status(500).json({ success: false })
    }
    // Caso contrário, retorna lista com todos os produtos
    res.send(productList);
})

// GET produto cespecífico pelo id
router.get(`/:id`, async (req, res) => {
    // Pegar o produto pelo o id e popular com a referencia categoria, assim mostrará os dados da categoria ao buscar o produto pelo id
    const product = await Product.findById(req.params.id).populate('category');

    // Teste: se não existe uma lista de produto, retorna 500 Internal Server Error como resposta.
    if (!product) {
        res.status(500).json({ success: false })
    }
    // Caso contrário, retorna lista com todos os produtos
    res.send(product);
})

/**
   * ROTA POST PRODUCT
   * 
   * Validar se a categoria existe ou não. Isso evitará dor de cabeça futuramente
   * Pois o produto depende da existência da categoria para subsistir.
   * 
   * Lógica: cria-se constante (variável) categoria (category) e espera-se por uma nova Model Category,após achar a mesma pelo id 
   * 
   * 
   * upload.single('image')...: faz parte da biblioteca Multer (upload imagens) Utilizei documentação
   * para implementar isso.
   * 
   * Explicação sobre a linha 159: const basePath = `${req.protocol}`
   * 
   * `${req.protocol}` = retorna o http:// (http protocol)
   * 
   *  ${req.get('host')}` = retorna o host.
   * 
   * const basePath = `${req.protocol}://${req.get('host')}`: http://localhost:3000/public/upload/nome-imagem
   * 
   * /public/upload` = retorna a estruta de pastas onde serão guardadas as imagen,
   * 
   * portanto: const basePath = `${req.protocol}://${req.get('host')}/public/uploads`; =
   * http://localhost:3000/public/upload/nome-imagem/public/upload
   * 
   * para realizar os teste API upload image, utiliza-se o forms-data no Postman
   * 
   * 
*/

router.post(`/`, upload.single('image'), async (req, res) => {

    // Verificar se existe categoria em produto antes de cadastrar
    const category = await Category.findById(req.body.category);
    // Se não existir categoria, retorna erro 400 'bad request' e passa a mensagem para o usuário.
    if (!category) return res.status(400).send('Categoria inválida');

    // Verificar se existe arquivo imagem antes de cadastrar produto
    const file = req.file;
    if (!file) return res.status(400).send('Não existe arquivo');

    // Chamar 'const' filename do Multer. Ver linha: 84 e passar a variável 'fileName' no campo thumbnail
    const fileName = req.file.filename

    // Contruir String URL, isto é, o caminha da base, (Base Path: http:localhost...nome-imagem.jpg)
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;

    let product = new Product({
        name: req.body.name,
        description: req.body.description,
        long_description: req.body.long_description,
        image: `${basePath}${fileName}`, // URL finalmente constuída!
        brand: req.body.brand, // Não está sendo usado no front-end pois categoria foi trocada para marca
        price: req.body.price,
        category: req.body.category,
        qty: req.body.qty,
        rating: req.body.rating,
        number_reviews: req.body.number_reviews,
        featured: req.body.featured,
        chip: req.body.chip,
        color: req.body.color,
        weight: req.body.weight,
        system: req.body.system,
        ram: req.body.ram,
        internal_memory: req.body.internal_memory,
        processor: req.body.processor,
        digital: req.body.digital,
        connectivity: req.body.connectivity,
        front_camera_resolution: req.body.front_camera_resolution,
        back_camera_resolution: req.body.back_camera_resolution,
        front_camera_resources: req.body.front_camera_resources,
        battery: req.body.battery,
    })

    // espera-se até salvar o produto, parte do async. Elimina bastante linhas de código. Alternativa à product.save().then()...
    product = await product.save();

    // Se não achar o produto:
    if (!product)
        // Retorna resposta 500: Internal Server Error.
        return res.status(404).send('Não foi possível criar o produto');
    // Caso contrário, se tudo ocorrer bem, retorna o produto criado.
    res.send(product);

})
/**
 * Reutilei o código referente ao upload de imagens
 * Ou seja, agora será possível alterar as imagens de um produto ja existente.
 * 
 * Se o usuário da API deseja alterar dados do produto mas não quer alterar as imagens,
 * então, mantém-se o nome imagem antigo. Se o mesmo deseja alterar imagem, então será 
 * necessário realizar novamente o upload da imagem e alterar a URL no banco de dados.
 * 
 */

// PUT produtos: Atualizar produtos: Copiei e Colei a lógica put method definida na rotas categorias. 
router.put('/:id', upload.single('image'), async (req, res) => {
    // Validar o id do produto antes de continuar com a atualização: Isso impede que o servidor busque infinitamente por um produto que não existe
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Id Produto inválido')
    };
    // Explicação da lógica da const (variável) category, está em no post method product. reutilização de código
    const category = await Category.findById(req.body.category);
    if (!category) return res.status(400).send('Categoria inválida')

    // Achar o produto pelo o id...
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).send(' Produto Inválido');

    const file = req.file;
    // Definir o caminho do arquivo/imagem
    let imagepath;
    // Se o cliente da API deseja atualizar a imagem do produto
    if (file) {
        // Chamar 'const' filename do Multer. Ver linha: 84 e passar a variável 'fileName' no campo thumbnail
        const fileName = req.file.filename
        // Contruir String URL, isto é, o caminha da base, (Base Path: http:localhost...nome-imagem.jpg)
        const basePath = `${req.protocol}://${req.get('host')}/public/uploads`;
        // Caminho da imagem: reutilizei código da linha
        imagepath = `${basePath}${fileName}`
        // Caso contrário, se o clite não irá alterar imagem produto. Mantém-se o mesmo caminho da imagem
    } else {
        // definir que o caminho da imagem é o mesmo que definido anteriormente, na criação do produto
        imagepath = product.image;
    }

    const productUpdated = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            description: req.body.description,
            long_description: req.body.long_description,
            image: req.body.imagepath,
            brand: req.body.brand,
            price: req.body.price,
            category: req.body.category,
            qty: req.body.qty,
            rating: req.body.rating,
            number_reviews: req.body.number_reviews,
            featured: req.body.featured,
            chip: req.body.chip,
            color: req.body.color,
            weight: req.body.weight,
            system: req.body.system,
            ram: req.body.ram,
            internal_memory: req.body.internal_memory,
            processor: req.body.processor,
            digital: req.body.digital,
            connectivity: req.body.connectivity,
            front_camera_resolution: req.body.front_camera_resolution,
            back_camera_resolution: req.body.back_camera_resolution,
            front_camera_resources: req.body.front_camera_resources,
            battery: req.body.battery,
        },
        // Mostrar dados novos
        { new: true }
    )

    // Se o produto não foi criado ainda (não encontrado)
    if (!productUpdated)

        // Retorna mensagem de erro
        return res.status(404).send('Produto não encontrado!')

    // Se o produto foi criado com sucesso, então: retorna o produto atualizado
    res.send(productUpdated);
})

// DELETAR produto: 
router.delete('/:id', (req, res) => {
    // Achar id Model Produto e remover. Acha-se o id via request parameter id
    // Retorna, então, uma 'promessa' Document chamado categoria deletada...
    Product.findByIdAndRemove(req.params.id).then(product => {

        // Se achar o produto, retorna staus 200: ok
        if (product) {
            return res.status(200).json({ success: true, message: 'Produto excluído com sucesso' })
            // Se não achar o produto
        } else {
            return res.status(404).json({ success: false, message: 'Não conseguimos encontrar esse produto' })
        }
    })
        // Mensagens de erro para erros de conexão e dados equivocados
        .catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
})

// GET quantidade de produtos no banco de dados utilizando método countDocuments do mongoose
router.get(`/get/count`, async (req, res) => {
    // Utilizei método do mongoose .countDocuments. Conta todos os objetos dentro da Tabela instanciada pela Model
    let productCount = await Product.countDocuments();

    if (!productCount) {
        res.status(500).json({ success: false, message: 'Não foi cadastrado nenhum produto ainda' });
    }
    res.send({
        quantidadeProdutos: productCount,
    });
})

// GET produtos destaque 
router.get(`/get/featured/:count`, async (req, res) => {
    // Utilizando a função count, é possível agora definir a quantidade de produtos destaque passando quantidade específica como limite na uri
    const count = req.params.count ? req.params.count : 0
    // Utilizei método do mongoose .countDocuments. Conta todos os objetos dentro da Tabela instanciada pela Model
    let featuredProducts = await Product.find({ featured: true }).limit(+count);

    if (!featuredProducts) {
        res.status(500).json({ success: false });
    }
    res.send(featuredProducts);

})

/**
   * UPLOAD IMAGE GALLERY (MULTIPLAS IMAGENS). 
   * 
   * Normalmente, realiza-se o upload de imagens na galeria do produto após o cadastro do mesmo.
   * Como não é um campo obrigatório no banco de dados, e não é algo essencial para o cadastro do produto,
   * acho interessante deixar assim, inserir imagens galeria após o cadastro de produtos.
   * 
   * IMPLMENTAÇÃO: reutilizei o código encontrado na documentação Multer referente ao upload de imagens, isto é.
   * upload.single('image') -> upload.array('images')
   * 
   * como será feito o upload de imagens (plural) então passa-se as imagens em um array ao invés de single.
   * 
   * 
   * @param maxCount — Optional. Maximum number of files to process. (default: Infinity).: ver proxima linha
   * Aqui é possível configurar a quantidade máxima de arquivos uploads; nosso casao, colocarei quantidade máxima
   * 10
   * 
   * Multiplas imagems, portanto, será como um Put Method do produto. Porém, como já temos os dados do mesmo
   * aqui, passaremos somente o campo 'images'.
   * 
   * Implementação: como no Método Put Produtos, é necessário validar o produto (se existe ou não)
   * 
   * é necessário definir a caminho dessas imagens. Chamarei de imagespath ('caminho imagens')
   * 
   * 
* */

router.put('/gallery/:id', upload.array('images', 10), async (req, res) => {

    // Validar o id do produto antes de continuar com a atualização: Isso impede que o servidor busque infinitamente por um produto que não existe
    if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).send('Id Produto inválido')
    }

    // requerir arquivos (plural) utilizand método do express.js
    const files = req.files;
    // Como será multiplas imagens, é ncessário defina-la dentro de um 'array'
    let images = [];
    // Reutilizar código caminho base imagem: linha 273
    const basePath = `${req.protocol}://${req.get('host')}/public/uploads/`;

    // verificar se existe arquivos (plural); se existir, realizar loop utilizando .map
    if (files) {
        files.map((file) => {
            images.push(`${basePath}${file.filename}`);
        });
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            images: images,
        },
        { new: true }
    );
    // Se não achar o produto:
    if (!product)
        // Retorna resposta 500: Internal Server Error.
        return res.status(500).send('Não foi possível criar o produto');
    // Caso contrário, se tudo ocorrer bem, retorna o produto criado.
    res.send(product);
})

// Exportar o modulo router: semelhante à exportação do model
module.exports = router;
