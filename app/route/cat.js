let Cat = require('../model/cat');

/**
 * GET /cat
 */
function getCats(req, res) {
    let query = Cat.find({});
    query.exec((err, cats) => {
        if (err) res.send(err);
        // if no errors, send it back to the client
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
            res.send(err);
        }
        else {
            res.json({message: "Cat saved", cat});
        }
    });
}

module.exports = { getCats, postCat };
