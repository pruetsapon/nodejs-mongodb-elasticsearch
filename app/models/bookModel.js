const serviceLocator = require('../helpers/service_locator');
const mongoose = serviceLocator.get('mongoose');
const mongoosastic = serviceLocator.get('mongoosastic');
const config = require('../configs/config');

const bookSchema = new mongoose.Schema({
    bookId: {
        type: String,
        es_removed: true
    },
    name: {
        type: String,
        es_type: 'text',
        es_fielddata: true,
        es_indexed: true
    },
    detail: {
        type: String
    },
    tags: {
        type: [String],
        es_type: 'text',
        es_fielddata: true,
        es_indexed: true
    },
    category: {
        type: String,
        es_indexed: true,
    },
    thumbnail: {
        type: String
    },
    createOn: {
        type: Date,
        es_type: 'text',
        es_fielddata: true,
        es_indexed: true
    },
    updateOn: {
        type: Date,
        es_type: 'text',
        es_fielddata: true,
        es_indexed: true
    }
});

bookSchema.plugin(mongoosastic, {
    host: config.elastic.host,
    port: config.elastic.port
});

module.exports = mongoose.model('Book', bookSchema);