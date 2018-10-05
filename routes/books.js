var express = require('express');
var router = express.Router();
var models = require('../models');
var _ = require('lodash');

var utils = require('../utils/util');

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
  const page = _.isNil(req.query.page) ? 0: req.query.page;
  const size = _.isNil(req.query.size) ? 10: req.query.size;
  const sortField = _.isNil(req.query.sortField) ? 'id': req.query.sortField;
  const sortOrder = _.isNil(req.query.sortOrder) ? 'asc': req.query.sortOrder;
  const sortCriteria = {sortField: sortField, sortOrder: sortOrder};

  if (!utils.isValidSearchAndSortCriteria(models.Book, searchCriteria, sortCriteria)) {
    res.status(405).send('Invalid search or filter criteria!');
    return;
  }

  let predicate = {};
  _.forEach(searchCriteria, (v, k) => {
    predicate[k] = {
      [models.Sequelize.Op.like]: '%' + v + '%'
    }
  });

  models.Book.findAndCountAll({
      where: predicate,
      offset: page * size,
      limit: size,
      order: [[sortField, sortOrder]]
    })
    .then((result) => {
      res.status(200).send(result);
    }).catch((err) => {
      res.status(500).send(err);
    });
});

module.exports = router;