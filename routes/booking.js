var express = require('express');
var router = express.Router();
var dbCon = require('../lib/db');

/* GET booking page. */
router.get('/booking/(:id)', function(req, res, next) {
  let id = req.params.id;
  dbCon.query('SELECT * FROM restaurant WHERE id = '+ id, (err, result, fields) => {
    if (err){
      console.log(err);
      res.redirect('/');
    } else {
      if (req.session.user_login){
        dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
            if (err){
              req.flash('error', err);
            } 
            res.render('booking', {
                name: result[0].name,
                user_id: rows[0].id,
                user_username: rows[0].username,
                user_phone: rows[0].phone,
                id: id
            });
          })
    } else {
        res.render('booking', {
            name: result[0].name,
            user_id: '',
            user_username: '',
            user_phone: '',
            id: id
        });
    }}
    
  });
    
  });

router.post('/booking/(:id)', function(req, res, next) {

  if(!req.session.user_login){
    return res.redirect('/login');
  }

  let id = req.params.id;
  let atdate = req.body.atDate;
  let attime = req.body.atTime;
  let tablenumber = req.body.tableNumber;
  dbCon.query("SELECT * FROM restaurant WHERE id = ?", id, (err, result) =>{
    if (err){
      req.flash('error', "มีบางอย่างผิดพลาด"+err);
      return res.redirect('/booking/'+id);
    } else {
      let form_data = {
        user_id: req.session.user_login,
        restaurant_id: id,
        restaurant_name: result[0].name,
        atDate: atdate,
        atTime: attime,
        tableNumber: tablenumber
        
      }
      console.log(form_data);
      dbCon.query("INSERT INTO booking SET ?", form_data, (err, result) =>{
        if (err){
          req.flash('error', "มีบางอย่างผิดพลาด"+err);
          return res.redirect('/booking/'+id);
        } else {
          req.flash('success', "จองเรียบร้อย");
          return res.redirect('/booking/'+id);
        }
      });
  
    }
  });


});


router.get('/booking_history', function(req, res, next) {
  dbCon.query('SELECT * FROM booking WHERE user_id = ?', [req.session.user_login], (err, rows_booking) => {
    if (err){
        res.redirect('/login');
    } else {
        if (req.session.user_login){
            dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
                if (err){
                  req.flash('error', err);
                } 
                if (rows_booking.length < 0){
                  res.render('booking_history', {
                    data: '',
                    user_id: rows[0].id,
                    user_username: rows[0].username
                });
                }
                console.log(rows_booking);
                res.render('booking_history', {
                    data: rows_booking,
                    user_id: rows[0].id,
                    user_username: rows[0].username
                });
              })

        } else {
            res.redirect('/login');
        }

    }
})
});

router.get('/booking_manage', function(req, res, next) {
  
    if (req.session.user_login){
          dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
              if (err){
                req.flash('error', err);
              } 
                
              res.render('booking_manage', {
                  user_id: rows[0].id,
                  user_username: rows[0].username,
                  user_urole: rows[0].urole
              });
            })

      } else {
          res.render('booking_manage', {
              data: '',
              user_id: '',
              user_username: '',
              user_urole: ''
          });
      }

});

router.post('/booking_manage', function(req, res, next) {
  let restaurant_id = req.body.restaurant;
  let tableNumber = req.body.tableNumber;
  dbCon.query('UPDATE restaurant SET table_numbers=? WHERE id=?', [tableNumber, restaurant_id], (err, result) => {
    if (err){
      req.flash('error', err);
    } else {
      console.log(result);
      req.flash('success', "ปรับจำนวนโต๊ะเรียบร้อย");
      res.redirect('/booking_manage');
    }
  });

});

module.exports = router;
