const restify = require('restify');

module.exports.register = (server, serviceLocator) => {
    server.post(
        {
            path: '/book',
            name: 'Create book'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').create(req, res, next)
    );

    server.get(
        {
            path: '/book',
            name: 'Get book'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').get(req, res, next)
    );

    server.put(
        {
            path: '/book/:id',
            name: 'Update book by id'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').update(req, res, next)
    );

    server.del(
        {
            path: '/book/:id',
            name: 'Delete book by id'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').delete(req, res, next)
    );

    server.get(
        {
            path: '/book/:id',
            name: 'Get book by id'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').getById(req, res, next)
    );

    server.get(
        {
            path: '/book/synchronize',
            name: 'Synchronize book'
        },
        (req, res, next) =>
            serviceLocator.get('bookController').synchronize(req, res, next)
    );
};