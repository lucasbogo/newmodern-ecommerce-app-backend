const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    // Nome é obrigatório
    name: {
        type: String,
        required: true
    },
    // Ícone: não é obrigatório. Mas, para deixar o front-end mais bonito, podemos utilizar ícones da google.
    icon: {
        type: String
    },
    // Cor em formato hash: #0... Serve para deixar o front-end mais vivo e bonito. 
    // Utilizarei 'pills' para os campos categorias e essas pills terão cores diversas   
    color: {
        type: String     
    },
})

// Transformar _id to id and __v para objeto/ mostra id ao invés de _id (front-end friedly)
categorySchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Category = mongoose.model('Category', categorySchema);
