const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class SiteController {
  home(req, res) {
    Course.find({})
      .then((course) => {
        res.render('home', { course: multipleMongooseToObject(course) });
      })
      .catch((error) => next(error));
  }

  search(req, res) {
    res.render('search');
  }
}

module.exports = new SiteController();
