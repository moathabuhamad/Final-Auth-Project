"use strict";
function acl(action) {
  return (req, res, next) => {
    try {
      if (req.user.actions.includes(action)) {
        next();
      } else {
        next("access restricted");
      }
    } catch (err) {
        next("access restricted");
    }
  };
}

module.exports = acl;