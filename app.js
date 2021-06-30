var express = require('express')
var app = express()
app.set("view engine", "ejs")
var port = process.env.PORT || 3000;
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI||'mongodb://localhost:27017/newdb', { 
                                                                             
 useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false                    
      }).then(()=>{
consolse.log("database started")
}).catch((error)=>{
console.log(error);
});


mongoose.Promise = global.Promise;
var session = require('express-session')
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 1160000 } }))

var userController = require('./controllers/user.js')
var adController = require('./controllers/ad.js')

var Ad = require("./models/ad")
var _ =require("lodash")

app.get('/', (req, res) => {
    if(req&&req.session&&req.session.user&&req.session.user._id){
        let username =req.session.user._id;
        Ad.find({"postedBy": { "$ne":username } }, (err, docs) => {
            if (err) {
                // console.log(err, 'error')
                return res.send(err)
            }
            if (_.isEmpty(docs)) {
                res.render('index', { user: req.session.user, ads: []})
            } else {
                res.render('index', { user: req.session.user, ads: docs })
            }
        })
    }
    else{
        Ad.find({ }, (err, docs) => {
    
                res.render('index', { user: req.session.user, ads: docs })
   
        })
      
    }

})

app.use("/public", express.static("public"))
app.use('/user', userController)
app.use('/ad', adController)

app.listen(port, () => {
    console.log("Server is running")
})
