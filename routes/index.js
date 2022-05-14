var express = require('express');
var router = express.Router();
var dbCon = require('../lib/db');

/* GET home page. */
router.get('/', function(req, res, next) {

  dbCon.query('SELECT * FROM restaurant', (err, rows_restaurant) => {
    if (err){
        res.render('index', {data: ''});
    } else {
        if (req.session.user_login){
            dbCon.query('SELECT * FROM users WHERE id = ?', [req.session.user_login], (err, rows) => {
                if (err){
                  req.flash('error', err);
                } 
                dbCon.query('SELECT * FROM rating', [req.session.user_login], (err, rating) => {
                    res.render('index', {
                        data: rows_restaurant,
                        rating: rating,
                        user_id: rows[0].id,
                        user_username: rows[0].username
                    });

                });
                
              })

        } else {
            dbCon.query('SELECT * FROM rating', [req.session.user_login], (err, rating) => {
                res.render('index', {
                    data: rows_restaurant,
                    rating: rating,
                    user_id: '',
                    user_username: ''
                });

            });
        }

    }
})
});

module.exports = router;
