const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const slug = require('mongoose-slug-updater');
const mongooseDelete = require('mongoose-delete');

const Course = new Schema(
  {
    name: { type: String, default: 'null' },
    description: String,
    thumbnail: String,
    kindOfBook: String,
    slug: { type: String, slug: 'name', unique: true },
  },
  {
    timestamps: true,
  },
);

mongoose.plugin(slug);
Course.plugin(mongooseDelete, { deletedAt: true, overrideMethods: 'all' });

module.exports = mongoose.model('Course', Course);
