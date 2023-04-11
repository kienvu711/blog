const newsRouter = require('./news');
const siteRouter = require('./site');
const usersRouter = require('./user');
const courseRouter = require('./courses');

function route(app) {
  app.use('/user', usersRouter);

  app.use('/news', newsRouter);

  app.use('/courses', courseRouter);

  app.use('/', siteRouter);
}
module.exports = route;
