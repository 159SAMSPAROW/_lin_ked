
const PasswordValidator = require("password-validator");

const passwordSchema = new PasswordValidator();

passwordSchema// Pré-requis mot de passe
  .is()
  .min(8) // Minimum caractère 8
  .is()
  .max(16) // Maximum caractère 16
  .has()
  .uppercase(1) // Doit contenir 1 lettre majuscule
  .has()
  .lowercase() 
  .has()
  .digits(2) // Doit contenir 2 chiffres
  .has()
  .not()
  .spaces() 
  .is()
  .not()
  .oneOf(["Password", "Password123"]); // Interdire ces valeurs

// Validation du mot de passe en fonction de son schéma pour le SignUp
module.exports = (req, res, next) => {
  if (passwordSchema.validate(req.body.password)) {
    next();
  } else {
    return (
      res.writeHead(
        400,
        "Votre mot de passe doit contenir une majuscule, entre 8 et 16 caractères et 2 chiffres"
      ),
      res.end(
        "Votre mot de passe doit contenir une majuscule, entre 8 et 16 caractères et 2 chiffres"
      )
    );
  }
};
