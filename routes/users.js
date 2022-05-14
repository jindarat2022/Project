var express = require('express');
var router = express.Router();
var dbCon = require('../lib/db');

/* GET users listing. */
router.get('/logout', function(req, res, next) {
  req.session.destroy()
  res.redirect('/login');

});


router.get('/profile', function(req, res, next) {
  if(!req.session.user_login){
    res.redirect('/login');
  }

  dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
    if (rows.length > 0){
      if (err){
        req.flash('error', err);
      } else {
        res.render('users/profile', {
          user_id: rows[0].id,
          user_username: rows[0].username,
          user_password: rows[0].password,
          user_phone: rows[0].phone
      });
      }
    } else{
      res.redirect('/login');
    }


  });
});


router.get('/login', function(req, res, next) {
  if (req.session.user_login) {
    res.redirect('/');
  } else {
    res.render('users/user_login');
  }
  
});


router.post('/login', function(req, res, next) {

    let username = req.body.username_login;
    let password = req.body.password_login;
    dbCon.query('SELECT * FROM users WHERE username = ?', [username], (err, rows) => {
      if (rows.length > 0){
        if (err){
          req.flash('error', err);
        } else {
          if (rows[0].password == password){
            let id = rows[0].id;
            req.session.user_login = id;
            res.redirect('/');
          } else {
            req.flash('error', "username หรือ password ไม่ถูกต้อง");
            res.redirect('/login');
          }
        } 
      } else {
        req.flash('error', "username หรือ password ไม่ถูกต้อง");
        res.redirect('/login');
      }


    })
    
});


router.get('/register', function(req, res, next) {
  res.render('users/user_register', {
    username: "",
    password: "",
    c_password: "",
    phone: ""
  });

});


router.post('/register', function(req, res, next) {
  let username = req.body.username;
  let password = req.body.password;
  let c_password = req.body.c_password;
  let phone = req.body.phone;
  let error = false;

  if (username.length < 6){
    error = true;
    req.flash('error', "username น้อยกว่า 6 ตัว");
    res.redirect('/register');
  } else if (password.length < 6){
    error = true;
    req.flash('error', "password น้อยกว่า 6 ตัว");
    res.redirect('/register');
  } else if (password != c_password){
    error = true;
    req.flash('error', "password ไม่ตรงกัน");
    res.redirect('/register');
  }
  if (!error){

    let form_data = {
      username: username,
      password: password,
      phone: phone,
      urole: "user"
    }
    dbCon.query("INSERT INTO users SET ?", form_data, (err, result) =>{
      if (err){
        req.flash('error', "มี username นี้ในระบบ");
        console.log(err);
        res.redirect('/register');
      } else {
        req.flash('success', "สมัครสมาชิกเรียบร้อย");
        res.redirect('/register');
      }

    });
  }


});


module.exports = router;
