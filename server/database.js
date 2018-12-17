const mongoose = require('mongoose');
const URI = 'mongodb://localhost/mean-crud-employees';
mongoose.connect(URI)
    .then(db => console.log('DB conect'))
    .catch(err => console.log(err));
module.exports = mongoose;