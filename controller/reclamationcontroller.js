var reclamation=require('../model/reclamation');


exports.getreclamationsjson=async function (request, result) {
    reclamation.find(function (error,d_reclamation){
        if(error)
            throw error;
        result.json(d_reclamation)
    });
}

exports.getreclamations=async function (request, result) {
    reclamation.find(function (error,d_reclamation){
        if(error)
            throw error;
        result.render("getallreclamations.twig",{d_reclamation});
    });
}