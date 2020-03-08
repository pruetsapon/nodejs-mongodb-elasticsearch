Nodejs-Mongodb-Elasticsearch

is a search data in mongodb using elasticsearch.

Prerequisites:
- nodejs 10.16


=====================================
Development Environment
=====================================

Run application:
- On any terminal move to the "nodejs-mongodb-elasticsearch-example" folder and execute these commands:

npm start


=====================================
Some Curl command examples
=====================================

curl -X POST -H 'Content-Type: application/json' -d '{"name" : "wall","detail" : "input.detail","tags" : ["x"],"category" : "A","thumbnail" : "intput.thumbnail"}' http://localhost:3001/book
curl -X GET http://localhost:3001/book