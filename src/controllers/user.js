const { User } = require('../db.js');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const config = require('../configs/config.js');
// const verifyUser = require('../routes/security')

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
  login(req, res) {
    User.findOne({
      where: {
        username: req.body.username
      }
    }).then(user => {
      if (bcrypt.compareSync(req.body.password, user.dataValues.password)) {
        const payload = {
          check: true
        };
        const token = jwt.sign(payload, config.key, {
           expiresIn: 900
        });
        res.json({
          message: 'All is ok.',
          token: token
        });
      } else {
        res.send({ message: 'Wrong username or password' })
      }
    })
  },
  datos(req,res) {
    const datos = [
      { id: 1, nombre: "Asfo" },
      { id: 2, nombre: "Denisse" },
      { id: 3, nombre: "Carlos" }
    ];
    
    res.json(datos);
  },

}