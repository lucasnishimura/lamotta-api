var mongoose = require('mongoose');

import User from './models/User';

// import databaseConfig from '../config/database';

const models = [User];

class Database {
  constructor() {
    this.init();
  }
  
  init() {
    mongoose.connect('mongodb+srv://lamotta_user:979899@cluster01-eif2j.mongodb.net/laMotta?retryWrites=true&w=majority', {useNewUrlParser: true});
  }
}

export default new Database();
