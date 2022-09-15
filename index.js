const express = require("express")
const mongoose = require("mongoose");
const bodyParser = require("body-parser")
const app= express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
require('dotenv').config()

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
app.use("/api/iStockSignal" , require("./routes/iStockSignalRoute"))
app.use("/api/optionSignal" , require("./routes/optionSignalRoute"))
app.use("/api/cryptoSignal" , require("./routes/cryptoSignalRoute"))
app.use("/api/notification" , require("./routes/NotificationRoute"))
app.use("/api/subscription" , require("./routes/subscriptionRoute"))
app.use("/api/guide" , require("./routes/guideRoute"))


app.get("/api/user/logout",(req,res)=>
{
  res.json("Delete jwt token you stored in your cookie/session/async etc")
})

const server=app.listen(PORT, () => console.log(`Running server on port: ${PORT}`));