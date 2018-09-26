var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');

var allowerdFilterFields = ['title', 'author', 'releaseDate', 'price', 'publication', 'cover']
/* GET book listing. */
router.get('/', function (req, res, next) {
  models.Book.findAll()
    .then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

router.post('/:search', function (req, res, next) {
  const searchCriteria = req.body;
  const page = req.query.page || 0;
  const size = req.query.size || 10;

  let searchCriteriaExists = false;

  _.each(allowerdFilterFields, (field) => {
    if (_.has(searchCriteria, field)) {
      searchCriteriaExists = true;
    }
  });

  if (!searchCriteriaExists) {
    res.status(405).send('Invalid search criteria!');
    return;
  }

  let predicate = {};
  _.forEach(searchCriteria, (v, k) => {
    predicate[k] = {
      [models.Sequelize.Op.like]: '%' + v + '%'
    }
  });

  console.log(predicate);
  models.Book.findAndCountAll({
      where: predicate,
      offset: page * size,
      limit: size
    })
    .then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;