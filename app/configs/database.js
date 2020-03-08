const serviceLocator = require('../helpers/service_locator');

class Database {
    constructor(dbUser, dbPass, port, host, name, authDB, option) {
        this.mongoose = serviceLocator.get('mongoose');
        this.connect(dbUser, dbPass, port, host, name, authDB, option);
    }

    connect(dbUser, dbPass, port, host, name, authDB, option) {
        this.mongoose.Promise = global.Promise;
        // this.mongoose.connect(`mongodb://${dbUser}:${dbPass}@${host}:${port}/${name}?authSource=${authDB}&w=1`, { useNewUrlParser: true, useFindAndModify: false });
        this.mongoose.connect(`mongodb://${host}:${port}/${name}`, option);
        const {connection} = this.mongoose;
        connection.on('connected', () =>
            console.info('Database Connection was Successful')
        );
            connection.on('error', (err) =>
            console.info('Database Connection Failed' + err)
        );
            connection.on('disconnected', () =>
            console.info('Database Connection Disconnected')
        );
        process.on('SIGINT', () => {
            connection.close();
            console.info(
                'Database Connection closed due to NodeJs process termination'
            );
            process.exit(0);
        });
    
        // initialize Model
        require('../models/bookModel');
    }
}

module.exports = Database;