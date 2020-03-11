Nodejs-Mongodb-Elasticsearch

is a search data in mongodb using elasticsearch.

Prerequisites:
- nodejs 10.16

=====================================
Elasticsearch Settings
=====================================

Result window is too large (index.max_result_window: 2147483647)
- curl -XPUT --header 'Content-Type:application/json' "http://localhost:9200/my_index/_settings" -d '{"index.max_result_window" : 50000}'
- elasticsearch.yml add "index.max_result_window: 50000"

Disable the real memory circuit breaker (indices.breaker.total.use_real_memory)
- elasticsearch.yml add "indices.breaker.total.use_real_memory : false"

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