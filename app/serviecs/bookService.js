class BookService {
    constructor(mongoose, elasticsearch, httpStatus, errs) {
        this.mongoose = mongoose;
        this.elasticsearch = elasticsearch;
        this.httpStatus = httpStatus;
        this.errs = errs;
    }

    async create(input) {
        const Book = this.mongoose.model('Book');
        let book = new Book();
        book.bookId = book._id;
        book.name = input.name;
        book.detail = input.detail;
        book.tags = input.tags;
        book.category = input.category;
        book.thumbnail = input.thumbnail;
        book.createOn = new Date();
        book = await book.save();
        console.info('Book Created Successfully');
        return book;
    } 

    async get(key, category, order, page = 1, rows = 10) {
        page = parseInt(page);
        rows = parseInt(rows);

        key = key == undefined ? '' : key;
        
        const Book = this.mongoose.model('Book');
        let skip = (page - 1) * rows;
        let docs = {
            page: page,
            itemsPerPage: rows
        };
        let option = { 
            from: skip,
            size: rows,
            hydrate: true,
            hydrateOptions: {
                select: 'bookId name detail tags category thumbnail createOn'
            }
        };
        if(order != undefined && order != '') {
            option.sort = getSort(order);
        }
        let must = [
            { query_string: { query: `*${getQuery(key)}*` } }
        ];
        if(category != undefined && category != '') {
            must.push({ match: { 'category': category } });
        }
        let query = {
            bool: {
                must: must
            }
        };

        let results = await this.elasticsearch.search(Book, query, option);
        let bookCount = await this.elasticsearch.count("books", query);
        if(bookCount.count > 0) {
            docs.count = results.hits.hits.length;
            docs.totalPage = Math.ceil(bookCount.count / rows);
            docs.data = results.hits.hits;
        } else {
            docs.count = 0;
            docs.totalPage = 0;
            docs.data = [];
        }
        console.info('Book Fetched Successfully');
        return docs;
    }

    async getById(id) {
        const Book = this.mongoose.model('Book');
        const book = await Book.findOne({ _id: id }, { _id: 0, __v: 0 });
        if (!book) {
          return new this.errs.NotFoundError(`Book with id - ${id} does not exists`);
        }
        console.info(`Book id ${id} Fetched Successfully`);
        return book;
    }

    async update(id, input) {
        const Book = this.mongoose.model('Book');
        let book = await Book.findById({ _id: id });
        if (book) {
            book.name = input.name;
            book.detail = input.detail;
            book.tags = input.tags;
            book.category = input.category;
            book.thumbnail = input.thumbnail;
            book.updateOn = new Date();
            book = await book.save();
            console.info('Book Updated Successfully');
            return book;
        } else {
            return `Book id ${id} does not exists`;
        }
    }

    async delete(id) {
        const Book = this.mongoose.model('Book');
        let book = await Book.findById({ _id: id });
        if (book) {
            let deleted = book.remove();
            if (deleted) {
                console.info(`Book Deleted Successfully`);
                return true;
            } else {
                console.info(`Book Deleted Error`);
                return false;
            }
        } else {
            return `Book id ${id} does not exists`;
        }
    }

    async synchronize() {
        const Book = this.mongoose.model('Book');
        let sync = await this.elasticsearch.synchronize(Book);
        return sync;
    }
}

const getSort = (order) => {
    let orders = order.split('-');
    let sortBy = orders[1] == undefined ? 'asc' : orders[1];
    let sort = [];
    if(orders[0] == 'name') {
        sort.push({'name': {'order': sortBy}});
    } else if(orders[0] == 'tags') {
        sort.push({'tags': {'order': sortBy}});
    } else if(orders[0] == 'createOn') {
        sort.push({'createOn': {'order': sortBy}});
    } else if(orders[0] == 'updateOn') {
        sort.push({'updateOn': {'order': sortBy}});
    }
    return sort;
}

const getQuery= (key) => {
    let keys = key.split(',');
    return keys.join('* or *');
}

module.exports = BookService;