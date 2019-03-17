const Sequelize = require('sequelize');
var sequelize = new Sequelize('decelvj6mf1ruo', 'fulrwvtfhvvpxz', '130924b035dba0318380fe91cc5866acf56084a3ea62b62fa1a03db69add8111', {
    host: 'ec2-107-22-169-45.compute-1.amazonaws.com',
    dialect: 'postgres',
    port: 5432,
    dialectOptions: {
        ssl: true
    }
});

var Employee = sequelize.define('Employee', {
    employeeNum: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName: Sequelize.STRING,
    lastName: Sequelize.STRING,
    email: Sequelize.STRING,
    SSN: Sequelize.STRING,
    addressStreet: Sequelize.STRING,
    addressCity: Sequelize.STRING,
    addressState: Sequelize.STRING,
    addressPostal: Sequelize.STRING,
    maritalStatus: Sequelize.STRING,
    isManager: Sequelize.BOOLEAN,
    employeeManagerNum: Sequelize.INTEGER,
    status: Sequelize.STRING,
    department: Sequelize.INTEGER,
    hireDate: Sequelize.STRING
});
var Department = sequelize.define('Department', {
    departmentId: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    departmentName: Sequelize.STRING
});

module.exports.initialize = function()
{
    return new Promise(function (resolve, reject) {
        sequelize.sync()
        .then(()=>{resolve();})
        .catch(()=>{reject("unable to sync the database");});
});

};

module.exports.getAllEmployees = function()
{
    return new Promise(function (resolve, reject) {
        Employee.findAll()
        .then((data)=>{resolve(data);})
        .catch(()=>{reject("no results returned");});
});
};
module.exports.getManagers = function()
{
    return new Promise(function (resolve, reject) {
        reject();
});

};

module.exports.getDepartments = function()
{
    return new Promise(function (resolve, reject) {
        Department.findAll()
        .then((data)=>{
            if(data.length != 0)
                resolve(data);
            else
             reject("no results returned");
        })
        .catch(()=>{reject("no results returned");});
});

};

module.exports.addEmployee = function(employeeData){
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(var i in employeeData)
        {
            if(employeeData[i] == '')
                employeeData[i] = null;
        }
        Employee.create(employeeData)
        .then(()=>{resolve();})
        .catch(()=>{reject("unable to create employee");});
});

};

module.exports.getEmployeesByStatus = function(empStatus){
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { status: empStatus }
        })
        .then((data)=>{resolve(data);})
        .catch(()=>{reject("no results returned");});
});

};

module.exports.getEmployeesByDepartment = function(empDepartment){
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { department: empDepartment }
        })
        .then((data)=>{resolve(data);})
        .catch(()=>{reject("no results returned");});
});

    };

    module.exports.getEmployeesByManager = function(empManager){
        return new Promise(function (resolve, reject) {
            Employee.findAll({
                where: { employeeManagerNum : empManager }
            })
            .then((data)=>{resolve(data);})
            .catch(()=>{reject("no results returned");});
    });
    
        };

module.exports.getEmployeeByNum = function(empNum){
    return new Promise(function (resolve, reject) {
        Employee.findAll({
            where: { employeeNum : empNum }
         })
         .then((data)=>{resolve(data[0]);})
        .catch(()=>{reject("no results returned");});
     });
        
};

module.exports.updateEmployee = function(employeeData) 
{
    return new Promise(function (resolve, reject) {
        employeeData.isManager = (employeeData.isManager) ? true : false;
        for(var i in employeeData)
        {
            if(employeeData[i] == '')
                employeeData[i] = null;
        }
        Employee.update(
            employeeData,
            {
                where: { employeeNum: employeeData.employeeNum}
            }
        ).then(()=>{resolve();})
        .catch(()=>{reject("unable to update employee");});

}); 
};

module.exports.addDepartment = function(departmentData) 
{
    return new Promise(function (resolve, reject) {
        
        for(var i in departmentData)
        {
            if(departmentData[i] == '')
                departmentData[i] = null;
        }
        Department.create(departmentData)
        .then(()=>{resolve();})
        .catch(()=>{reject("unable to create department");});
});
};

module.exports.updateDepartment = function(departmentData) 
{
    return new Promise(function (resolve, reject) {
        
        for(var i in departmentData)
        {
            if(departmentData[i] == '')
                departmentData[i] = null;
        }
        Department.update(
            departmentData,
            {
                where: { departmentId: departmentData.departmentId}
            }
        ).then(()=>{resolve();})
        .catch(()=>{reject("unable to update department");});

}); 
};

module.exports.getDepartmentById = function(id){
    return new Promise(function (resolve, reject) {
        Department.findAll({
            where: { departmentId : id }
        })
        .then((data)=>{resolve(data[0]);})
        .catch(()=>{reject("no results returned");});
    });
};

module.exports.deleteEmployeeByNum = function(empNum){
    return new Promise(function (resolve, reject) {
        Employee.destroy({
            where: { employeeNum : empNum }
        })
        .then(()=>{resolve();})
        .catch(()=>{reject();});
    });
};
