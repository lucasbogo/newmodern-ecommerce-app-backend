/**
 * COPIEI E COLEI A MESMA LÓGICA DA ROTA PRODUTOS; 
 */

const { Category } = require('../models/category');
const express = require('express');
const router = express.Router();

// GET lista categoria
router.get(`/`, async (req, res) => {
    const categoryList = await Category.find();

    // Se não econtrar a lista categoria: passar mensagem de erro,
    if (!categoryList) {
        res.status(500).json({ success: false })
    }
    // Caso contrário, se achar, mostrar 200: ok.
    res.status(200).send(categoryList);
})

// GET categoria específica pelo o id
router.get('/:id', async (req, res) => {
    const category = await Category.findById(req.params.id);

    // Se não achar a categoria pelo o id, passar mensagem
    if (!category) {
        res.status(500).json({ message: 'Não econtramos essa categoria.' })
    }
    // Caso contrário, ok.
    res.status(200).send(category);

})

// CRIAR categoria com RESTful API utilizando await and async
router.post('/', async (req, res) => {
    let category = new Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })

    /**
     * espera-se até salvar a categoria. 
     * A categoria salva, então, retorna uma 'promessa' com o Documento. 
     * (Promise returns a Document)
     * 
     */
    category = await category.save();
   
    // Após o 'await', checa-se se a categoria foi criada
 
    // Se a categoria não foi criada
    if (!category)

        // Retorna mensagem de erro
        return res.status(404).send('A categoria não foi criada!')

    // Se a categoria foi criada com sucesso, então: retorna a categoria criada
    res.send(category);
})

// PUT categoria: Atualizar categoria 
router.put('/:id', async (req, res) => {
    const category = await Category.findByIdAndUpdate(

        req.params.id,
        {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color,
        }, 
        // Mostrar dados novos
        { new: true}
    )

    // Se a categoria não foi encontrada
    if (!category)

        // Retorna mensagem de erro
        return res.status(404).send('Essa categoria não foi encontrada.')

    // Se a categoria foi criada com sucesso, então: retorna a categoria criada
    res.send(category);
})


// DELETAR categoria: 
router.delete('/:id', (req, res) => {
    // Achar id Model Categoria e remover. Acha-se o id via request parameter id
    // Retorna, então, uma 'promessa' Document chamado categoria deletada...
    Category.findByIdAndRemove(req.params.id).then(category => {

        // Se achar a categoria, retorna status 200: ok e passa a mensagem ao cliente
        if (category) {
            return res.status(200).json({ success: true, message: 'Categoria excluída com sucesso' })
            // Se não achar a categoria, retorna 404 e passa mensagem
        } else {
            return res.status(404).json({ success: false, message: 'Não conseguimos encontrar essa categoria' })
        }
    })
        // Mensagens de erro para erros de conexão e dados equivocados
        .catch(err => {
            return res.status(400).json({ success: false, error: err })
        })
})

module.exports = router;