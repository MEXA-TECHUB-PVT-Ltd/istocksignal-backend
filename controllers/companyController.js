
const mongoose = require("mongoose")
const companyModel = require("../models/companyModel")

exports.createCompany = (req,res)=>{
    const companyName = req.body.companyName
    const companyLogo = req.body.companyLogo
    const description = req.body.description

    const company = new companyModel({
        _id:mongoose.Types.ObjectId(),
        companyName: companyName,
        companyLogo: companyLogo,
        description: description,
    })

    company.save(function(err,result){
        try{
            if(result){
                res.json({
                    message:"Company Saved successfully",
                    statusCode: 201,
                    result: result
                })
            }else{
                res.json({
                    message:"Couldn't save company",
                    statusCode:400
                    
                })
            }
        }
        catch(err){
            res.json({
                 message:"error Occurred in saving company",
                 error:err,
            })
        }
        
    })
}

exports.getAllCompanies = (req,res)=>{
    companyModel.find({isDeleted:false} , function(err,result){
        try{
            if(result){
                res.json({
                    message:"successfully fetched",
                    result:result,
                    statusCode:200
                })
            }else{
                res.json({
                    message:"failed to fetch",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in fetching results",
                statusCode:500
            })
        }
    })
}
exports.getCompanyById =(req,res)=>{
    const companyId = req.params.companyId
    companyModel.findOne({_id:companyId} , function(err,result){
        try{
            if(result){
                res.json({
                    message:"successfully fetched",
                    result:result,
                    statusCode:200
                })
            }else{
                res.json({
                    message:"failed to fetch",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Error occurred in fetching results",
                statusCode:500
            })
        }
    })
}

exports.deleteCompany= (req,res)=>{
    const companyId= req.params.companyId;

    companyModel.deleteOne({_id: companyId} , function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted company",
                    result:result,
                    statusCode:200
                })
            }
            else{
                res.json({
                    message:"Not any resource found for deleted",
                    statusCode:404
                })
            }
        }
        catch(err){
            res.json({
                message:"Failed to delete company",
                error:err.message,
                statusCode:404
            })
        }
    })
}

exports.deleteTemporaryAndRestored= (req,res)=>{ 
    var isDeleted =req.query.isDeleted;
    const companyId=req.body.companyId;
    isDeleted= JSON.parse(isDeleted);
    
    var message;
    if(isDeleted == false){
        message= "company restored"
    }
    else if(isDeleted == true){
        message = "company deleted temporarily"
    }

    console.log(message)
    companyModel.findOneAndUpdate({_id: companyId},
        {
            isDeleted:isDeleted,
        },
        {
            new: true,
        },
        function(err,result){
            try{
                if (result){
                    res.json({
                        message:message,
                        updatedResult: result,
                        statusCode:200
                    })
                }
                else{
                    res.json({
                        message:"No any company deleted or restored  , company with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to delete or restore company ",
                    error:err.message,
                    statusCode:500
                })
             }
        }
        )
}

exports.updateCompany = (req,res)=>{

    const companyId = req.body.companyId
    const companyName = req.body.companyName
    const companyLogo = req.body.companyLogo
    const description = req.body.description

    companyModel.findOneAndUpdate({_id: companyId},
        {
            companyName: companyName,
            companyLogo: companyLogo,
            description: description,
        },
        {
            new: true,
        }, function(err,result){
             try{
                if (result){
                    res.json({
                        message:"successfully updated",
                        updatedResult: result,
                        statusCode:200
                    })
                }
                else{
                    res.json({
                        message:"No any company Updated , company with this Id may not exist",
                        statusCode:404
                    })
                }
             }
             catch(err){
                res.json({
                    message:"Failed to update company",
                    error:err.message,
                    statusCode:500
                })
             }

        })
    

}

 