const rp = require('request-promise');
const config = require('../configs/config');

class Elasticsearch {
    constructor() {}

    async search(model, query, option) {
        return new Promise((resolve, reject) => {
            model.search(query, option, (err, results) => {
                if(err) {
                    resolve(err);
                } else {
                    resolve(results);
                }
            });
        });
    }

    async count(model, query) {
        let options = {
            method: 'GET',
            uri: `http://${config.elastic.host}:${config.elastic.port}/${model}/_count`,
            json: true,
            headers: {
                'content-type': 'application/json'
            },
            body: { query }
        };
        let count = await rp(options);
        return count;
    }

    async synchronize(model) {
        let stream = model.synchronize()
        , status = 'ok'
        , indexed = 0;

        return new Promise((resolve, reject) => {
            stream.on('data', (err, doc) => {
                indexed++;
            });
            stream.on('close', () => {
                resolve({ status, indexed });
            });
            stream.on('error', (err) => {
                resolve(err);
            });
        });
    }
}

module.exports = Elasticsearch;