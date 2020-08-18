const database = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      const { password } = body;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject(err);
        }
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          const registerQuery = `INSERT INTO users SET ?`;
          if (err) {
            reject(err);
          }
          const newBody = { ...body, password: hashedPassword };
          database.query(registerQuery, [newBody], (err, data) => {
            if (!err) {
              resolve(data);
            } else {
              reject(err);
            }
          });
        });
      });
    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {
      const loginQuery =
        "SELECT email, password, level_id FROM users WHERE email=?";
      database.query(loginQuery, [body.email], (err, data) => {
        if (err) {
          reject(err);
        }
        if (data.length === 0) {
          const msg = "User not found. Please register first";
          reject(msg);
        } else {
          bcrypt.compare(body.password, data[0].password, (err, isSame) => {
            if (err) {
              reject(err);
            }
            if (isSame) {
              const { email, level_id } = data[0];
              const payload = {
                email,
                level_id,
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY, {
                expiresIn: "1d",
              });
              const msg = "successfully logged in";
              resolve({ msg, token });
            } else {
              reject({ msg: "Wrong password" });
            }
          });
        }
      });
    });
  },
};

module.exports = authModel;
