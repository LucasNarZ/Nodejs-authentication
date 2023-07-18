const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


module.exports = (passport) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
        secretOrKey: "a~sçd.la~sdç.~32ç.eãç.d~.a/.3qwç23~qeç.a;/s~d.~wç3.dç.a~d.as;/da.d",
    }, (jwtPayload, done) => { 
        const user = {
            id:jwtPayload.id,
            name:jwtPayload.name,
            email:jwtPayload.email,
            password:jwtPayload.password
        }
        return done(null, user);
    }
    
    ))
}
