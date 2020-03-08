class BookController {
    constructor(bookService, httpSatus) {
        this.bookService = bookService;
        this.httpSatus = httpSatus;
    }

    async create(req, res) {
        try {
            const { body } = req;
            const result = await this.bookService.create(body);
            res.send(result);
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }

    async get(req, res) {
        try{
            const { key, category, order, page, rows } = req.query;
            const result = await this.bookService.get(key, category, order, page, rows);
            res.send(result);
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }

    async getById(req, res) {
        try{
            const { id } = req.params;
            const result = await this.bookService.getById(id);
            res.send(result);
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }

    async delete(req, res) {
        try {
            const { id } = req.params;
            const result = await this.bookService.delete(id);
            res.send(result);
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }

    async synchronize(req, res) {
        try{
            const result = await this.bookService.synchronize();
            res.send(result);
        } catch (err) {
            console.error(err.message);
            res.send(err);
        }
    }
}

module.exports = BookController;