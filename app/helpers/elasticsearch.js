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