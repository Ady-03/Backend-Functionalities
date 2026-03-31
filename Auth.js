const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./Schema/person.js");

passport.use(
  new localStrategy(async (USERNAME, pwd, done) => {
    // Authentication Logic here
    try {
      console.log("Credentials Recieved:", USERNAME, pwd);
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "Incorrect Username." });

      const isPasswordMatch = user.password === pwd ? true : false;
      if (isPasswordMatch) return done(null, user);
      else {
        return done(null, false, { message: "Incorrect Password" });
      }
    } catch (err) {
      return done(err);
    }
  }),
);

module.exports = passport;
