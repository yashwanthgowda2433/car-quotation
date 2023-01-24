const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

checkDuplicateMobileOrEmail = async (req, res, next) => {
  
  try {
    // Username
    let user = await User.findOne({
      where: {
        mobile: req.body.mobile
      }
    });

    if (user) {
      return res.status(200).send({
        status: "Failed! Mobile Number is already in use!"
      });
    }

    // Email
    user = await User.findOne({
      where: {
        email: req.body.email
      }
    });

    if (user) {
      return res.status(200).send({
        status: "Failed! Email is already in use!"
      });
    }

    next();
  } catch (error) {
    return res.status(200).send({
      status: error.message
    });
  }
};

checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(200).send({
          status: "Failed! Role does not exist = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateMobileOrEmail,
  checkRolesExisted
};

module.exports = verifySignUp;
