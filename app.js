const express = require('express');
const app = express();
require('dotenv/config');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const api = process.env.API_URL;
const gkrolesRouter = require('./routers/gkroles');
const gkProgramRouter =  require('./routers/gkprograms');
const gkUserRouter = require('./routers/gkusers');
const gkTutorRouter = require('./routers/gktutors');
const gkAdmitRouter = require('./routers/gkadmits');



//Middleware
app.use(express.json());
app.use(morgan('tiny'));
app.options('*', cors());

//Routers
app.use(`${api}/gkroles`, gkrolesRouter);
app.use(`${api}/gkprograms`, gkProgramRouter);
app.use(`${api}/gkusers`, gkUserRouter);
app.use(`${api}/gktutors`, gkTutorRouter);
app.use(`${api}/gkadmits`, gkAdmitRouter)



mongoose.connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'gurukhoj-database'
})
.then(()=>{
    console.log('Gurukhoj Database Connection is ready...')
})
.catch((err)=> {
    console.log(err);
});

app.listen(3000, ()=>{
    console.log('server is running http://localhost:3000');
})