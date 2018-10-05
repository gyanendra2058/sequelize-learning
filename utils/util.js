var _ = require('lodash');
var utils = {};

utils.isValidSearchAndSortCriteria = function (book, searchCriteria, sortCriteria) {
   let sortOrder = sortCriteria.sortOrder.toLowerCase();
    if(!(sortOrder === 'asc' || sortOrder === 'desc')){
        return;
    }

    let searchCriteriaExits = true;
    let sortCriteriaExists = _.hasIn(book.rawAttributes, sortCriteria.sortField) ? true: false;
    
    for (let key in searchCriteria) {
        if (!_.hasIn(book.rawAttributes, key)) {
            searchCriteriaExits = false;
            break;
        }
    }
    let result = searchCriteriaExits && sortCriteriaExists;
    return result;
}

module.exports = utils;