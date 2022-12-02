const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    // Passei "itens_pedido" dentro de um array, pois teremos multiplos itens e esses multiplos itens possuem multiplos produtos
    orderItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OrderItem',
        required: true
    }],
    street: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    division: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    zip: {
        type: String,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
    // phone: {
    //     type: String,
    //     required: true,
    // },
    observations: {
        type: String,
        default: 'Sem Observação',
    },
    status: {
        type: String,
        required: true,
        default: 'Pendente',
    },
    total_price: {
        type: Number,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    date_ordered: {
        type: Date,
        default: Date.now,
    },
})

// Transformar _id to id and __v para objeto
orderSchema.method('toJSON', function () {
    const { __v, ...object } = this.toObject();
    const { _id: id, ...result } = object;
    return { ...result, id };
});


exports.Order = mongoose.model('Order', orderSchema);
