const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Employee = require('./models/Employee');

passport.use(new LocalStrategy(
    {
        usernameField: 'name',
        passwordField: 'password'
    }, async (name,password,done) => {
        //check name in database
        const user = await Employee.findOne({name});
        if(!user){
            return done(null, false, { message: "Name is not registered in the system" });
        }
        //check user's password
        const match = await bcrypt.compare(password, user.password);
        if(!match){
            return done(null, false, { message: "Incorrect password" });
        }

        return done(null, user)
    }
));

passport.serializeUser((user, done) => {
    return done(null, user.id);
});

passport.deserializeUser((id, done) => {
    Employee.findById(id, (err, user) => {
        return done (err, user);
    })
})