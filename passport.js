const passport = require("passport");
const passportJWT = require("passport-jwt");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;


module.exports = (passport) => {
    passport.use(new JWTStrategy({
        jwtFromRequest: ExtractJWT.fromAuthHeader(),
        secretOrKey: "segredo",
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
