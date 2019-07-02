
const express=require('express');
const router=express.Router();

//rutas del servidor
router.get('/',(req, res)=>{
    res.render('index.html',{ titulo:'Sitio web usando nodeJS'});
    
});

router.get('/contacto',(req, res)=>{
    res.render('contacto.html',{ titulo:'Pagina de contacto'});
    
});


module.exports=router;