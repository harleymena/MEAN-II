const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const { mongoose } = require('./database');

//Settings
//Obtiene el puerto asignado, de lo contrario usa el puerto 3000
app.set('port', process.env.PORT || 3000);

//Middlewares
app.use(morgan('dev')); //Muestra mensajes por consola
app.use(express.json());  //Configura servidor para uso de json
app.use(cors({ origin: 'http://localhost:4242' }));

//Routes
app.use('/api/employees', require('./routes/employee.routes'));

//Starting the server
app.listen(app.get('port'), () => {
    console.log('Server port ', app.get('port'));
});
