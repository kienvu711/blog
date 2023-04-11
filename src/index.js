const express = require('express');
const path = require('path');
const app = express();
const { engine } = require('express-handlebars');
const morgan = require('morgan');
const port = 3000;
const route = require('./routes');
const db = require('./config/db');
const methodOverride = require('method-override');
const SortMiddleware = require('./app/middlewares/SortMiddleware');

db.connect();

// app.use(morgan('combined'));
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(SortMiddleware);
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(express.json());

app.engine(
  'hbs',
  engine({
    extname: '.hbs',
    helpers: {
      sum: (a, b) => a + b,
      sortable: (field, sort) => {
        const sortType = field === sort.column ? sort.type : 'default';
        const icons = {
          default: 'bi bi-arrow-down-up',
          asc: 'bi bi-sort-down-alt',
          desc: 'bi bi-sort-down',
        };

        const types = {
          default: 'desc',
          asc: 'desc',
          desc: 'asc',
        };
        const icon = icons[sortType];
        const type = types[sortType];

        return `<a href="?_sort&column=${field}&type=${type}"><i class="${icon}"></i></a>  `;
      },
    },
  }),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'view'));
route(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
