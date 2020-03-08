const serviceLocator = require('../helpers/service_locator');

serviceLocator.register('httpStatus', () => {
  return require('http-status');
});

serviceLocator.register('mongoose', () => {
  return require('mongoose');
});

serviceLocator.register('mongoosastic', () => {
  return require('mongoosastic');
});

serviceLocator.register('errs', () => {
  return require('restify-errors');
});

serviceLocator.register('elasticsearch', () => {
  const Elasticsearch = require('../helpers/elasticsearch');
  return new Elasticsearch();
});

serviceLocator.register('bookService', (serviceLocator) => {
  const mongoose = serviceLocator.get('mongoose');
  const httpStatus = serviceLocator.get('httpStatus');
  const errs = serviceLocator.get('errs');
  const BookService = require('../serviecs/bookService');
  const elasticsearch = serviceLocator.get('elasticsearch');
  return new BookService(mongoose, elasticsearch, httpStatus, errs);
});

serviceLocator.register('bookController', (serviceLocator) => {
  const httpStatus = serviceLocator.get('httpStatus');
  const bookService = serviceLocator.get('bookService');
  const BookController = require('../controllers/bookController');
  return new BookController(bookService, httpStatus);
});

module.exports = serviceLocator;