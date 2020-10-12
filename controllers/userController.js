const { User } = require('./../models/user.model');
const uuid = require('uuid').v4;

module.exports.register = (req, res) => {
    const newUser = new User();
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    newUser.username = req.body.username;
    newUser.formId = uuid();

    User.findOne({ 'email': req.body.email }, (err, user) => {
        if (!user) {
            newUser.save((err, doc) => {
                if (err) {
                    console.log(err);
                    res.json({
                        sucess: false, err: err
                    })
                }
                else {
                    res.status(200).json({
                        succuss: true,
                        userData: doc
                    })
                };
            });
        }
        else {
            res.status(409).json({
                message: "Email name already exist",
                sucess: false
            })
        }
    })

};
