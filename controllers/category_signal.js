

const mongoose=require("mongoose");
const category_signalModel = require("../models/category_signalModel");
const category_signal_model= require("../models/category_signalModel")


exports.create_category_signal = (req,res)=>{
    const name= req.body.name;

    if(name){
        const new_category_signal = new category_signal_model({
            _id:mongoose.Types.ObjectId(),
            name:name,
        })

        new_category_signal.save(function(err,result){
            try{
                if(result){
                    res.json({
                        message:"successfully created category_signal",
                        result:result,
                        statusCode:201,
                        
                    })
                }
                else{
                    res.json({
                        message:"could not created category_signal",
                        result:result,
                        statusCode:400,
                        
                    })
                    
                }
            }
            catch(error){
                res.json({
                    message:"Error occurred while saving category_signal",
                    Error: error,
                    errorMessage:err.message,
                    statusCode:500,
                    
                })
            }
        });
    }
}

exports.getAllCategory_Signals= (req,res)=>{
    
        category_signalModel.find({} , (err,result)=>{
            try{
            if(result){
                res.json({
                    message:"successfully fetched category_signals",
                    result:result,
                    statusCode:200,
                    
                })
            }
            else{
                res.json({
                    message:"could not fetched  category_signal",
                    result:result,
                    statusCode:201,
                    
                })
            }
        }
        catch(error){
            res.json({
                message:"Error occurred while fetching category_signals",
                Error: error,
                errorMessage:error.message,
                statusCode:500,
                
            })
        }
        })
    
   
}

exports.deleteCategorySignals = (req,res)=>{
    const category_signal_id = req.params.category_signal_id;

    category_signalModel.deleteOne({_id:category_signal_id}, function(err,result){
        try{
            if(result.deletedCount>0){
                res.json({
                    message:"successfully deleted category_signal",
                    result:result,
                    statusCode:200,
                    
                })
            }
            else{
                res.json({
                    message:"could not delete category_signal or Category_signal with thid id may not exist",
                    result:result,
                    statusCode:400,
                    
                })
            }
        }
        catch(error){
            res.json({
                message:"Error occurred while deleting category_signals",
                Error: error,
                errorMessage:error.message,
                statusCode:500,
                
            })
        }
    })
}

exports.updateCategorySignals =(req,res)=>{
    const category_signal_id = req.body.category_signal_id;

    if(category_signal_id){

        category_signalModel.findOneAndUpdate({_id:category_signal_id} , {name:req.body.name} , {new:true} ,
            function(err, result){
                try{
                    if(result){
                        res.json({
                            message:"successfully updated category_signal",
                            result:result,
                            statusCode:200,
                            
                        })
                    }
                    else{
                        res.json({
                            message:"could not update category_signal or Category_signal with this id may not exist",
                            result:result,
                            statusCode:400,
                            
                        })
                    }
                }
                catch(error){
                    res.json({
                        message:"Error occurred while updating category_signals",
                        Error: error,
                        errorMessage:error.message,
                        statusCode:500,
                        
                    })
                }
            })
            }
            else{
                res.json({
                    message:"category_signal_id may be null or undefined",
                })
            }
    
}