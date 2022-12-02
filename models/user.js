const mongoose = require('mongoose');

/**
 * Definição dos campos entidade usuário;
 * Não fiz nenhum referenciação neste modelo, ou seja, não há nenhuma fk.
 * 
 * Para diferenciar o usuário usual do admin, utilizar-se-á Jason Web Tokens (jwt)
 * 
 * EU costumo programar em inglês e comentar em ptbr...
 * como inglês é universal, acho melhor definir atributos, métodos, funções... em inglês
 * Espero que não se importem.
 * 
 */

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    // A senha será  criptografada. Isso é possível com a utilização da biblioteca bcrypt...
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    // se admin for true, mostrar token admin, caso contrário, false, token user.
    admin: {
        type: Boolean,
        default: false,
    },
    // Aqui começa os campos Manter Endereço (requisito funcional 3)
    street: {
        type: String,
        default: ''
    },
    number: {
        type: String,
        default: ''
    },
    district: {
        type: String,
        default: ''
    },
    zip: {
        type: String,
        default: ''
    },
    city: {
        type: String,
        default: ''
    },
    country: {
        type: String,
        default: ''
    },
    observations: {
        type: String,
        default: ''
    }

});

// Transformar _id to id and __v em objeto (elimina-se __v da resposta do json (front-end friendly)) 
userSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});;

// Exportação normal do módulo e schema. Isso será igual para todas as Models
exports.User = mongoose.model('User', userSchema);
exports.userSchema = userSchema;