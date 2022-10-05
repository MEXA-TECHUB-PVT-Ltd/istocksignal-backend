const userModel=require("../models/userModel")
const axios = require('axios');


function pushNotification(message){
const FCM_RESOURCE = 'https://fcm.googleapis.com/fcm/send';
const FCM_SERVER_KEY ="AAAAKnaO7CE:APA91bHtZPY29G8L80txnnfI2q_Yg_7FZ68wK0qAy7CnmbfHnkxo75PIgjaADTXlKK_1dgL6mGqyYpEYvJI0qAgAGu13Nf_UxGSkbl9_MTNf09JoieDQk7ddiRQoISBI4NjBPcTtToC-";
var userTokens=[];


userModel.find({},'fcmToken',function(err,result){
    if(result !== null || typeof result !== "undefined"){
      
      result.forEach(element => {
        userTokens.push(element.fcmToken)
      });
      
    
    var data = JSON.stringify({
        registration_ids: userTokens,
        collapse_key: 'type_a',
        notification: {
          title:"Notification received",
          body:message
        },
      });
      console.log(data)
      var config = {
        method: 'post',
        url: FCM_RESOURCE,
        headers: {
          Authorization: `key=${FCM_SERVER_KEY}`,
          'Content-Type': 'application/json',
        },
        data: data,
      };

      
      axios(config)
      .then(function (response) {
        console.log(response.data)
        const d= new Date(Date.now())
        console.log("server time is " +  d.toLocaleString())
        
       
      })
      .catch(function (e) {
        console.log(
            e
        )
      });
    }
    else{
       console.log("userId or company is not defined")
    }
  
})


}

module.exports= pushNotification
