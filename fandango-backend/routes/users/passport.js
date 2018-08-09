var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var kafka = require('../../kafka/client');
var bcrypt = require("bcrypt");

passport.use('local', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, function (username , password, done) {
    //TODO: Find user in the system and check valid password logic
    kafka.make_request('request', 'getUserByEmail',
        {
            email: username,
        },
        async function (err, results) {

            if (err) {
                 done(err,null,null)
            }else if(results){
                try{
                    const password_hash = results["password_hash"];
                    const check = await bcrypt.compare(password, password_hash);

                    if(check){
                        done(null, {
                            "userId": results.userId,
                            "role": results.role,
                            "hall_id":results.hall_id,
                            "email":results.email
                        });
                    }else{
                        done(null, false, 'Incorrect Email or Password');
                    }
                }catch (err) {
                    done(err,null,null);
                }
            }else{
                done(null, false, 'Incorrect Email or Password');
            }
        }
    );
}));

passport.serializeUser(function (user, done) {
    done(null, user);
});

passport.deserializeUser(function (user, done) {
    done(null, user);
});

module.exports = passport;