const Course = require('../models/Course');
const { multipleMongooseToObject } = require('../../util/mongoose');

class UserController {
  storedCourses(req, res, next) {
    let coursesQuery = Course.find({});

    if (req.query.hasOwnProperty('_sort')) {
      coursesQuery = coursesQuery.sort({
        [req.query.column]: req.query.type,
      });
    }

    Promise.all([coursesQuery, Course.countDocumentsDeleted()])
      .then(([courses, deletedCount]) =>
        res.render('user/storedCourses', {
          deletedCount,
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }

  trashCourses(req, res, next) {
    Course.findDeleted({})
      .then((courses) =>
        res.render('user/trashCourses', {
          courses: multipleMongooseToObject(courses),
        }),
      )
      .catch(next);
  }
}

module.exports = new UserController();
