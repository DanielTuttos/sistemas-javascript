//requiere el modulo express
const express =require('express');
const path=require('path'); //se encarga de unir directorios
const morgan=require('morgan');
const mysql=require('mysql');
const myConnection=require('express-myconnection');

//importando rutas
const customerRoutes=require('./routes/customer');

const app=express();
//configurar express settings
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname, 'views' ));


//middlewares
app.use(morgan('dev'));
//conectar a mysql
app.use(myConnection(mysql,{
    host:'localhost',
    user:'root',
    password:'',
    port: 3306,
    database:'crudnodejs'
},'single')); 
app.use(express.urlencoded({extended:false}));

//rutas
app.use('/', customerRoutes);

//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));


//inicializar el servidor 
app.listen(app.get('port'),()=>{
    console.log('Server on port '+app.get('port'));
});