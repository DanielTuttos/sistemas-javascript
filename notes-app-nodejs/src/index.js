// archivo principal de mi aplicacion para arrancar el servidor 

const express=require('express');

//Inicializaciones
const app=express(); //me devuelve un objeto
const path=require('path');
const exphbs=require('express-handlebars');
const methodOverride=require('method-override');
const expressSesion=require('express-session');

const flash=require('connect-flash');

const passport =require('passport');

//Settings
app.set('port', process.env.PORT || 3001);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'),'layouts'),
    partialsDir: path.join(app.get('views'),'partials'),
    extname:'.hbs'

}));

app.set('view engine','.hbs');

require('./database');
require('./config/passport');

//Middlewares
app.use(express.urlencoded({extended: false}));//sirve para recibir determinado dato
app.use(methodOverride('_method'));
app.use(expressSesion({
    secret:'misecreto',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

//Global Variables
app.use((req,res,next)=>{
   res.locals.success_msg=req.flash('success_msg');
   res.locals.error_msg=req.flash('error_msg');
   res.locals.error=req.flash('error');
   res.locals.user=req.user||null;
    next(); 
});

//Routes
app.use(require('./routes/index'));
app.use(require('./routes/notes'));
app.use(require('./routes/users'));

//Static Files
app.use(express.static(path.join(__dirname,'public')));

//Server is Listenning
app.listen(app.get('port'),()=>{
    console.log('Servidor inicializado en el puerto ', app.get('port'));
});
