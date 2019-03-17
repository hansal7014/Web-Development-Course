/*********************************************************************************
* WEB322 – Assignment 06
* I declare that this assignment is my own work in accordance with Seneca Academic Policy. No part
* of this assignment has been copied manually or electronically from any other source
* (including 3rd party web sites) or distributed to other students.
*
* Name: Hansal Bachkaniwala Student ID: 117990176 Date: 29th July 2018
*
* Online (Heroku) Link: https://shrouded-dawn-71327.herokuapp.com/
*
********************************************************************************/

const data_service = require("./data-service.js");
const dataServiceAuth = require("./data-service-auth.js");
const path = require("path");
const express = require("express");
const app = express();
const multer = require("multer");
const fs = require('fs');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const clientSessions = require('client-sessions');

app.use(clientSessions({
  cookieName: "session", 
  secret: "web322_Assignment6", 
  duration: 2 * 60 * 1000, 
  activeDuration: 1000 * 60
}));

app.use(function(req, res, next) {
  res.locals.session = req.session;
  next();
});

app.engine('.hbs', exphbs({ extname: '.hbs', helpers: {
  navLink: function(url, options){
    return '<li' + 
        ((url == app.locals.activeRoute) ? ' class="active" ' : '') + 
        '><a href="' + url + '">' + options.fn(this) + '</a></li>';
},
equal: function (lvalue, rvalue, options) {
  if (arguments.length < 3)
      throw new Error("Handlebars Helper equal needs 2 parameters");
  if (lvalue != rvalue) {
      return options.inverse(this);
  } else {
      return options.fn(this);
  }
}
}, 
defaultLayout: 'main'}));
app.set('view engine', '.hbs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(function(req,res,next){
  let route = req.baseUrl + req.path;
  app.locals.activeRoute = (route == "/") ? "/" : route.replace(/\/$/, "");
  next();
});
var HTTP_PORT = process.env.PORT || 8080;

function onHttpStart() {
  console.log("Express http server listening on port " + HTTP_PORT);
}

const storage = multer.diskStorage({
  destination: "./public/images/uploaded",
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

app.use(express.static('public'));

app.get("/", function(req, res){
    res.render('home', {});
});

app.get("/about", function(req,res){
  res.render('about', {});
  });

  app.get("/employees", ensureLogin, function(req,res){
    if(req.query.status != undefined)
    {
      data_service.getEmployeesByStatus(req.query.status)
      .then((data)=>{
        if(data.length > 0)
          res.render("employees", {employees: data});
          else
          res.render("employees", {message: "no results"});
      })
      .catch((err)=>{
        res.render("employees", {message: "no results"});
      });
    }
    else if(req.query.department != undefined)
    {
      data_service.getEmployeesByDepartment(req.query.department)
      .then((data)=>{
        if(data.length > 0)
         res.render("employees", {employees: data});
         else
         res.render("employees", {message: "no results"});
      })
      .catch((err)=>{
        res.render("employees", {message: "no results"});
      });
    }
    else if(req.query.manager != undefined)
    {
      data_service.getEmployeesByManager(req.query.manager) 
      .then((data)=>{
      if(data.length > 0)  
        res.render("employees", {employees: data});
        else
        res.render("employees", {message: "no results"});
      })
      .catch((err)=>{
        res.render("employees", {message: "no results"});
      });
    }
    else{
    data_service.getAllEmployees()
    .then((data)=>{
      if(data.length > 0)
       res.render("employees", {employees: data});
       else
       res.render("employees", {message: "no results"});
    })
    .catch((err)=>{
       res.render("employees", {message: "no results"});
    });
  }
});

app.get("/departments", ensureLogin, function(req,res){
  data_service.getDepartments()
  .then((data)=>{
    if(data.length > 0)
     res.render("departments", {departments: data});
     else
     res.render("departments", {message: "no results"});
  })
  .catch((err)=>{
    res.render("departments", {message: "no results"});
  });
});

app.get("/app", function(req,res){
  res.status(400).send("Page Not Found :(");
});

app.get("/employees/add", ensureLogin, (req, res)=>{
  data_service.getDepartments()
  .then((data)=>{
    res.render("addEmployee", {departments: data});
  })
  .catch(()=>{
    res.render("addEmployee", {departments: []}); 
  });
  
});

app.get("/images/add", ensureLogin, (req, res)=>{
  res.render('addImage', {});
  });

app.post("/images/add", ensureLogin, upload.single("imageFile"), (req, res)=>{
  res.redirect("/images");
});

app.get("/images", ensureLogin, (req, res)=>{
  fs.readdir(path.join(__dirname, "/public/images/uploaded"), (err, images)=>{
    res.render('images', {data: images});
  });
});

app.post("/employees/add", ensureLogin, (req, res)=>{
  data_service.addEmployee(req.body)
  .then(()=>{res.redirect("/employees");})
  .catch(()=>{
    res.status(500).send("Unable to Add Employee");
  });
});

app.post("/employee/update", ensureLogin, (req, res) => {
  data_service.updateEmployee(req.body)
  .then(()=>{res.redirect("/employees");})
  .catch(()=>{
    res.status(500).send("Unable to Update Employee");
  });
  
});

data_service.initialize()
.then(dataServiceAuth.initialize)
.then(()=>{
  app.listen(HTTP_PORT, onHttpStart)
})
.catch((err)=>{
  console.log("unable to start server: " + err);
});


app.get("/departments/add", ensureLogin, (req, res)=>{
  res.render('addDepartment', {});
});

app.post("/departments/add", ensureLogin, (req, res)=>{
  data_service.addDepartment(req.body)
  .then(()=>{res.redirect("/departments");})
  .catch(()=>{
    res.status(500).send("Unable to Add Department");
  });
});

app.post("/department/update", ensureLogin, (req, res) => {
  data_service.updateDepartment(req.body)
  .then(()=>{res.redirect("/departments");})
  .catch(()=>{
    res.status(500).send("Unable to Update Department");
  });
});

app.get("/department/:departmentId", ensureLogin, (req, res)=>{
  data_service.getDepartmentById(req.params.departmentId)
  .then((data)=>{
    if(data == undefined)
      res.status(404).send("Department Not Found");
    else
     res.render("department", { department: data }); 
  })
  .catch((err)=>{
    res.status(404).send("Department Not Found"); 
  });
});

app.get("/employee/:empNum", ensureLogin, (req, res) => {

  // initialize an empty object to store the values
  let viewData = {};

  data_service.getEmployeeByNum(req.params.empNum).then((data) => {
      if (data) {
          viewData.employee = data; //store employee data in the "viewData" object as "employee"
      } else {
          viewData.employee = null; // set employee to null if none were returned
      }
  }).catch(() => {
      viewData.employee = null; // set employee to null if there was an error 
  }).then(data_service.getDepartments)
  .then((data) => {
      viewData.departments = data; // store department data in the "viewData" object as "departments"

      // loop through viewData.departments and once we have found the departmentId that matches
      // the employee's "department" value, add a "selected" property to the matching 
      // viewData.departments object

      for (let i = 0; i < viewData.departments.length; i++) {
          if (viewData.departments[i].departmentId == viewData.employee.department) {
              viewData.departments[i].selected = true;
          }
      }

  }).catch(() => {
      viewData.departments = []; // set departments to empty if there was an error
  }).then(() => {
      if (viewData.employee == null) { // if no employee - return an error
          res.status(404).send("Employee Not Found");
      } else {
          res.render("employee", { viewData: viewData }); // render the "employee" view
      }
  });
});

app.get("/employees/delete/:empNum", ensureLogin, (req, res) => {
  data_service.deleteEmployeeByNum(req.params.empNum)
  .then(()=>
  {
      res.redirect("/employees");
  })
  .catch(()=>{
    res.status(500).send("Unable to Remove Employee / Employee not found");
  });
});

function ensureLogin(req, res, next) {
  if (!req.session.user) {
    res.redirect("/login");
  } else {
    next();
  }
}

app.get('/login', (req, res)=>{
  res.render('login', {});
});

app.get('/register', (req, res)=>{
  res.render('register', {});
});

app.post('/register', (req, res)=>{
  dataServiceAuth.registerUser(req.body)
  .then(()=>{
    res.render('register', {successMessage: "User created"});
  }).catch((err)=>{
    res.render('register', {errorMessage: err, userName: req.body.userName});
  });
});

app.post('/login', (req, res)=>{
  req.body.userAgent = req.get('User-Agent');
  dataServiceAuth.checkUser(req.body) 
  .then((user)=>{
        req.session.user = {
          userName: user.userName,
          email: user.email,
          loginHistory: user.loginHistory
      }
      res.redirect('/employees');
  }).catch((err)=>{
      res.render('login', {errorMessage: err, userName: req.body.userName});
  });
});

app.get('/logout', (req, res)=>{
  req.session.reset();
  res.redirect('/');
});

app.get('/userHistory', ensureLogin, (req, res)=>{
  res.render('userHistory', {});
});