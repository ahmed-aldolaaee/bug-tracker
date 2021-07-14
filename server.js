const express = require('express');
const mongoose = require('mongoose');
const app = express();
require('dotenv').config();
const userRoute = require("./routes/userRoute");
const bugRoute = require("./routes/bugRoute")
const cookieParser = require('cookie-parser');
const cors = require("cors");

mongoose.connect(process.env.MONGO_URI, {
    useUnifiedTopology: true, 
    useNewUrlParser: true,
    useCreateIndex: true
}); 

mongoose.connection.on('connected', ()=> {
    console.log('MongoDB Connected!')
}); 

mongoose.connection.on('error', ()=> {
    console.log('Error connecting to MongoDB')
})

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}));

app.use("/user", userRoute);
app.use("/bugs", bugRoute);

app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));