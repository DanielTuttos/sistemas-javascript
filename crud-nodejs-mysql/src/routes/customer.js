const express =require('express');
const router=express.Router();
const controlador=require('../controllers/customerController');

router.get('/', controlador.list);
router.post('/add', controlador.save);
router.get('/delete/:id', controlador.delete);
router.get('/update/:id', controlador.edit);
router.post('/update/:id', controlador.update);

module.exports=router;