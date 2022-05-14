var express = require('express');
var router = express.Router();
var dbCon = require('../lib/db');


router.get('/rating/(:id)', function(req, res, next) {
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
            res.render('rating', {
                name: result[0].name,
                user_id: rows[0].id,
                user_username: rows[0].username,
                user_phone: rows[0].phone,
                id: id
            });
          })
    } else {
        res.render('rating', {
            name: result[0].name,
            user_id: '',
            user_username: '',
            user_phone: '',
            id: id
        });
    }}
    
  });
    
  });

router.post('/rating/(:id)', function(req, res, next) {

  if(!req.session.user_login){
    req.flash('error', "โปรด Login ก่อนให้คะแนน");
    return res.redirect('/login');
  }

  let id = req.params.id;
  let rating = req.body.selected_rating;

  console.log(rating);
  console.log(id);

  dbCon.query('SELECT * FROM rating WHERE restaurant_id = ' + id + ' AND user_id = '+ req.session.user_login, (err, result) => {
    if (result.length > 0){
      req.flash('error', "คุณให้คะแนนแล้ว");
      res.redirect('/rating/'+id);
    } else {
      if (err){
        res.redirect('/');
    } else {
        if (req.session.user_login){
            dbCon.query('INSERT INTO rating (user_id, restaurant_id, rating) VALUES (?, ?, ?)', [req.session.user_login, id, rating], (err, rows) => {
                if (err){
                  req.flash('error', err);
                } 
                
                res.redirect('/');
              })

        } else {
          res.redirect('/');
        }

    }
    }
    
  })



});

module.exports = router;
