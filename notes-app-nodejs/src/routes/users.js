//registrar y autenticar el usuario
const express=require('express');
const passport=require('passport');
const router=express.Router();

const User=require('../models/User');

router.get('/users/signin',(req,res)=>{//para ingresar
    res.render('users/signin');
});

router.post('/users/signin',passport.authenticate('local',{
    successRedirect:'/notes',
    failureRedirect:'/users/signin',
    failureFlash:true
}));

router.get('/users/signup',(req,res)=>{//para registrar
    res.render('users/signup');
});

router.post('/users/signup', async (req,res)=>{
    const {nombre,email, password, confirmacion_password} = req.body;
    const errors=[];
    if(password!=confirmacion_password){
        errors.push({text:'Las contraseñas con coinciden'});
    }
    if(password.length<4){
        errors.push({text:'La contraseña debe ser mayor a 4 caracteres'});
    } 
    if(errors.length>0){
        res.render('users/signup',{errors,nombre,email, password, confirmacion_password});
    }else{
        const EmailUser= await User.findOne({email:email});
        if(EmailUser){
            req.flash('error_msg','El email ya esta en uso');
            res.redirect('/users/signup');

        }
        const newUser=new User({nombre, email, password});
        newUser.password=await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg','Estas registrado');
        res.redirect('/users/signin');
    }
    
});

router.get('/users/logout',(req,res)=>{
    req.logout();
    res.redirect('/');
});

module.exports=router;