var express = require('express');
var router = express.Router();
var dbCon = require('../lib/db');

/* GET admin listing. */
router.get('/dashboard', function(req, res, next) {
  dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
    if (rows.length > 0){
    if (err){
      req.flash('error', err);
    } 
    else{
      if (rows[0].urole != 'admin'){
        res.redirect('/');
      }
    }
  } else {
    res.redirect('/');
  }

  });

  dbCon.query('SELECT * FROM users', (err, rows) => {
    if (rows.length > 0){
      if (err){
        res.redirect('/');
      } else {
        res.render('admin/dashboard', {
          data: rows,
        });
      }
    } else {
      res.render('admin/dashboard', {
        data: '',
      });
    }
    
  })
});

router.get('/employee_login', function(req, res, next) {
  res.render('admin/employee_login');
});

router.post('/employee_login', function(req, res, next) {

  let username = req.body.username;
  let password = req.body.password;

  dbCon.query('SELECT * FROM users WHERE username = ? AND urole = ?', [username, "admin"], (err, rows) => {
    if (rows.length > 0){
      if (err){
        req.flash('error', err);
      } else {
        if (rows[0].password == password){
          let id = rows[0].id;
          req.session.user_login = id;
          res.redirect('/dashboard');
        } else {
          req.flash('error', "username หรือ password ไม่ถูกต้อง");
          res.redirect('/employee_login');
        }
      } 
    } else {
      req.flash('error', "username หรือ password ไม่ถูกต้อง");
      res.redirect('/employee_login');
    }
  })
  
});

router.get('/employee_register', function(req, res, next) {
  res.render('admin/employee_register');
});

router.post('/employee_register', function(req, res, next) {

let username = req.body.username;
let password = req.body.password;
let c_password = req.body.c_password;
let phone = req.body.phone;
let error = false;

if (username.length < 6){
  error = true;
  req.flash('error', "username น้อยกว่า 6 ตัว");
  res.redirect('/employee_register');
} else if (password.length < 6){
  error = true;
  req.flash('error', "password น้อยกว่า 6 ตัว");
  res.redirect('/employee_register');
} else if (password != c_password){
  error = true;
  req.flash('error', "password ไม่ตรงกัน");
  res.redirect('/employee_register');
}
if (!error){

  let form_data = {
    username: username,
    password: password,
    phone: phone,
    urole: "admin"
  }
  dbCon.query("INSERT INTO users SET ?", form_data, (err, result) =>{
    if (err){
      req.flash('error', "มี username นี้ในระบบ");
      console.log(err);
      res.redirect('/employee_register');
    } else {
      req.flash('success', "สมัครสมาชิกเรียบร้อย");
      res.redirect('/employee_register');
    }

  });
}


});

module.exports = router;
