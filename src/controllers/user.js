const { User } = require('../db.js');
const bcrypt = require("bcrypt");

module.exports = {
    createUser(req, res) {
        const { username, password, name, surname, currency } = req.body;

        if (!username || !password || !name || !surname) {
          return res.send("The fields are required");
        }
      
        User.findOne({ where: { username } }).then((user) => {
          if (!user) {
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(password, salt);
            User.create({
              username,
              password: hash,
              name,
              surname,
              currency
            })
              .then((user) => {
                res.send(user).status(202);
              })
              .catch((err) => console.log(err));
          } else {
            res.status(500).send("User exists");
          }
        });
    },
    
}