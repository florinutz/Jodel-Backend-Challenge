let Cat = require('../model/cat');

/**
 * GET /cat
 * supports searching by ?q=...
 * and pagination by ?p=X
 * and items per page by ?n=X
 */
function getCats(req, res) {
    let perPage = 5;
    let catSearch = {};
    if (req.query.q) {
        catSearch.name = new RegExp(req.query.q, 'i');
    }
    let query = Cat.find(catSearch);
    if (limitInUrl = parseInt(req.query.n)) {
        perPage = limitInUrl;
    }
    query.limit(perPage);
    if (pageInUrl = parseInt(req.query.p)) {
        query.skip((pageInUrl-1) * perPage);
    }
    query.exec((err, cats) => {
        if (err) res.send(err);
        res.json(cats)
    });
}

/**
 * POST /cat to save a new cat
 */
function postCat(req, res) {
    let newCat = new Cat(req.body);
    newCat.save((err, cat) => {
        if (err) {
            res.status(400).send(err);
        }
        else {
            res.json({message: "Cat saved", cat});
        }
    });
}

module.exports = { getCats, postCat };
