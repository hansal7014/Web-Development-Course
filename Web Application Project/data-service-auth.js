var mongoose = require("mongoose");
var Schema = mongoose.Schema;
const bcrypt = require('bcryptjs');

var userSchema = new Schema({
"userName": {"type": String, "unique": true},
"password": String,
"email": String,
"loginHistory": [{"dateTime": Date, "userAgent": String}]
});
  
let User; // to be defined on new connection (see initialize)

module.exports.initialize = function () {
    return new Promise(function (resolve, reject) {
        let db = mongoose.createConnection("mongodb://hansal7014:assignment6@ds013956.mlab.com:13956/web322_a6");

        db.on('error', (err)=>{
            reject(err); // reject the promise with the provided error
        });
        db.once('open', ()=>{
           User = db.model("users", userSchema);
           resolve();
        });
    });
};

module.exports.registerUser = function(userData){
    return new Promise(function (resolve, reject) {
        if(userData.password !== userData.password2)
        {
            reject("Passwords do not match");
        }
        else{
            bcrypt.genSalt(10, function(err, salt) { // Generate a "salt" using 10 rounds
                bcrypt.hash(userData.password, salt, function(err, hash) { // encrypt the password: "myPassword123"
                    if(err)
                    {
                        reject("There was an error encrypting the password");
                    }
                    else{
                        userData.password = hash;
                        userData.password2 = hash;

                        let newUser = new User(userData); 
                        newUser.save((err)=>{
                            if(err)
                            {
                                if(err.code === 11000)
                                {
                                    reject("User Name already taken");
                                }
                                else{
                                    reject("There was an error creating the user: " + err);
                                }
                            }
                            else{
                                resolve();
                            }
                        });
                    }
                });
            });
        }
    });
};

module.exports.checkUser = function(userData){
    return new Promise(function (resolve, reject) {
        User.find({ userName: userData.userName }).exec()
        .then((users)=>{
            if(users.length == 0)
            {
                reject("Unable to find user: " + userData.userName);
            }
            
                bcrypt.compare(userData.password, users[0].password).then((res) => {
                    if(res === true)
                    {
                        users[0].loginHistory.push({dateTime: (new Date()).toString(), userAgent: userData.userAgent});
                        User.update({ userName: users[0].userName },
                                       { $set: { loginHistory: users[0].loginHistory } },
                                        { multi: false })
                        .exec().then(()=>{
                            resolve(users[0]);
                        }).catch((err)=>{
                            reject("There was an error verifying the user: " + err);
                        });
                    }
                    else
                    {
                        reject("Unable to find user: " + userData.userName);
                    }
                 });                 
                
        }).catch(()=>{
            reject("Unable to find user: " + userData.user);
        });
    });
};