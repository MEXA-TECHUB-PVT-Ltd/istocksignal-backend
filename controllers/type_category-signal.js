

const mongoose=require("mongoose");
const type_category_signalModel = require("../models/type_category_signal");


exports.create_type_category_signal = (req,res)=>{
    const name= req.body.name;

    if(name){
        const new_type_category_signal = new type_category_signalModel({
            _id:mongoose.Types.ObjectId(),
            name:name,
            category_signal_id:req.body.category_signal_id,
        })

        new_type_category_signal.save(function(err,result){
            try{
                if(result){
                    res.json({
                        message:"successfully created type_category_signal",
                        result:result,
                        statusCode:201,
                        
                    })
                }
                else{
                    res.json({
                        message:"could not created type_category_signal",
                        result:result,
                        statusCode:400,
                        
                    })
                    
                }
            }
            catch(error){
                res.json({
                    message:"Error occurred while saving type_category_signal",
                    Error: error,
                    errorMessage:err.message,
                    statusCode:500,
                    
                })
            }
        });
    }
}

exports.getTypeCategorySignalByCategoryId= (req,res)=>{
    const category_signal_id = req.params.category_signal_id
    type_category_signalModel.find({category_signal_id:category_signal_id} , (err,result)=>{
        try{
        if(result){
            res.json({
                message:"successfully fetched type_category_signals",
                result:result,
                statusCode:200,
                
            })
        }
        else{
            res.json({
                message:"could not fetched  type_category_signal",
                result:result,
                statusCode:201,
                
            })
        }
    }
    catch(error){
        res.json({
            message:"Error occurred while fetching type_category_signals",
            Error: error,
            errorMessage:error.message,
            statusCode:500,
            
        })
    }
})
}

exports.getAllType_category_signals= (req,res)=>{
    
        type_category_signalModel.find({} , (err,result)=>{
            try{
            if(result){
                res.json({
                    message:"successfully fetched type_category_signals",
                    result:result,
                    statusCode:200,
                    
                })
            }
            else{
                res.json({
                    message:"could not fetched  type_category_signal",
                    result:result,
                    statusCode:201,
                    
                })
            }
        }
        catch(error){
            res.json({
                message:"Error occurred while fetching type_category_signals",
                Error: error,
                errorMessage:error.message,
                statusCode:500,
                
            })
        }
        })
    
   
}

exports.deleteTypeCategorySignals = (req,res)=>{
    const type_category_signal_id = req.params.type_category_signal_id;

    type_category_signalModel.deleteOne({_id:type_category_signal_id}, function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted type_category_signal",
                    result:result,
                    statusCode:200,
                    
                })
            }
            else{
                res.json({
                    message:"could not delete type_category_signal or type_category_signal with this id may not exist",
                    result:result,
                    statusCode:400,
                    
                })
            }
        }
        catch(error){
            res.json({
                message:"Error occurred while deleting type_category_signals",
                Error: error,
                errorMessage:error.message,
                statusCode:500,
                
            })
        }
    })
}

exports.updateType_CategorySignals =(req,res)=>{
    const type_category_signal_id = req.body.type_category_signal_id;

    if(type_category_signal_id){

        type_category_signalModel.findOneAndUpdate({_id:type_category_signal_id} , {name:req.body.name} , {new:true} ,
            function(err, result){
                try{
                    if(result){
                        res.json({
                            message:"successfully updated type_category_signal",
                            result:result,
                            statusCode:200,
                            
                        })
                    }
                    else{
                        res.json({
                            message:"could not update type_category_signal or type_category_signal with this id may not exist",
                            result:result,
                            statusCode:400,
                            
                        })
                    }
                }
                catch(error){
                    res.json({
                        message:"Error occurred while updating type_category_signals",
                        Error: error,
                        errorMessage:error.message,
                        statusCode:500,
                        
                    })
                }
            })
            }
            else{
                res.json({
                    message:"type_category_signal_id may be null or undefined",
                })
            }
    
}