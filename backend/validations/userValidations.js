const {body} =require('express-validator');
module.exports.registerValidations =[
    body('name').trim().not().escape().isEmpty().withMessage("Name is required"),
    body('email').isEmail().normalizeEmail().withMessage("Enter a valid Email"),
    body('password').trim().isLength({min:6}).withMessage("Password must be 5 characters long"),
];
module.exports.loginValidations =[
    body('email').isEmail().normalizeEmail().withMessage("Enter a valid Email"),
    body('password').not().isEmpty().withMessage("Password is required"),
];