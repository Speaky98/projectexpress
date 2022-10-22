var express = require('express');
var router = express.Router();
var reclamation=require('../model/reclamation');
var reclamationcontroller=require("../controller/reclamationcontroller")

router.post('/', async function (req, res)  {
    if (req.body.id_c) {
        reclamation.findById(req.body.id_c,function (error, docreclamation) {
            if(error)
                throw error;
            res.render("modifyreclamation.twig", {docreclamation});
        });
    }
    else{
        res.render("addreclamation.twig");
    }
});

router.post('/add',async function (req, res) {
    try {
        var rec= new reclamation(
            {
                Date_de_creation:req.body.datecreation,
                Description:req.body.desc,
                Valide: req.body.val
            }

        );
        rec.save();
        res.json({msg: "Added!"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
});

router.post('/update',async function (req, res) {
    try {
        const findreclamation = reclamation.findByIdAndUpdate(req.body.id_c,
            {
                Date_de_creation:req.body.datecreation,
                Description:req.body.desc,
                Valide: req.body.val
            });
        const docreclamation = await findreclamation.exec();
        await docreclamation.save();
        res.json({msg: "Updated!"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
});

router.post('/delete', async function (req, res) {
    try {
        await reclamation.findByIdAndDelete(req.body.id_c).exec();
        res.json({msg: "Deleted!"})
    }catch(err){
        return res.status(500).json({msg: err.message})
    }
});


router.get('/get',reclamationcontroller.getreclamations);
router.get('/getjson', reclamationcontroller.getreclamationsjson);

module.exports = router;