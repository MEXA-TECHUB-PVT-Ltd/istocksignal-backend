const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()

mongoose.set('strictQuery', false);
const cors = require('cors')
app.use(cors({
  methods: ['GET','POST','DELETE','UPDATE','PUT','PATCH']
}));


//connect to db
mongoose.connect(
    process.env.DB_CONNECTION, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    },
    () => console.log("Connected to DB")
);

//middleware
app.use(express.json());


//Routes

app.use("/api/user" , require("./routes/userRoute"))
app.use("/api/admin" , require("./routes/adminRoute"))
app.use("/api/forgetPassword" , require("./routes/userForgetRoute"))
app.use("/api/company" , require("./routes/companyRoute"))
app.use("/api/signal" , require("./routes/signalRoute"))
app.use("/api/notification" , require("./routes/NotificationRoute"))
app.use("/api/subscription" , require("./routes/subscriptionRoute"))
app.use("/api/guide" , require("./routes/guideRoute"))
app.use("/api/category_signal" , require("./routes/category_signal_route"))
app.use("/api/type_category_signal" , require("./routes/type-category_signal_route"))
app.use("/api/subscription_feature" , require("./routes/subscriptionFeatureRoute"))
app.use("/api/userSubscription" , require("./routes/userSubscriptionRoute"))
app.use("/api/sent_notification" , require("./routes/sentNotificationRoute"))



app.use("/api/trash" , require("./routes/trashRoute"))

app.get("/api/user/logout",(req,res)=>
{
  res.json("Delete jwt token you stored in your cookie/session/async etc")
})

const server=app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));