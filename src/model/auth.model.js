const database = require("../config/config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const authModel = {
  register: (body) => {
    return new Promise((resolve, reject) => {
      const { password } = body;
      bcrypt.genSalt(10, (err, salt) => {
        if (err) {
          reject({ msg: "unknown error" });
        }
        bcrypt.hash(password, salt, (err, hashedPassword) => {
          const registerQuery =
            "INSERT INTO users SET ?;SELECT first_name, last_name, level_id FROM users WHERE users.email=?;";
          if (err) {
            reject({ msg: "unknown error" });
          }
          const newBody = { ...body, password: hashedPassword };
          database.query(registerQuery, [newBody, body.email], (err, data) => {
            if (!err) {
              const payload = {
                email: body.email,
                level_id: body.level_id,
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY);
              const { first_name, last_name, level_id } = data[1][0];
              const msg = "Account Registered";
              resolve({ first_name, last_name, level_id, msg, token });
            } else {
              reject({ msg: "account exist" });
            }
          });
        });
      });
    });
  },
  login: (body) => {
    return new Promise((resolve, reject) => {
      const loginQuery =
        "SELECT first_name, last_name, email, password, level_id FROM users WHERE email=?;";
      database.query(loginQuery, [body.email], (err, data) => {
        if (err) {
          reject({ msg: "query error" });
        }
        if (data.length === 0) {
          const msg = "User not found. Please register first";
          reject({ msg });
        } else {
          bcrypt.compare(body.password, data[0].password, (err, isSame) => {
            if (err) {
              reject({ msg: "unknown error" });
            }
            if (isSame) {
              const { first_name, last_name, email, level_id } = data[0];
              const payload = {
                email,
                level_id,
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY);
              const msg = "Successfully log in";
              resolve({ first_name, last_name, level_id, msg, token });
            } else {
              reject({ msg: "Wrong password" });
            }
          });
        }
      });
    });
  },
  userData: (body) => {
    return new Promise((resolve, reject) => {
      const userQuery = `SELECT first_name, last_name, level_id FROM users WHERE users.email=?`;
      database.query(userQuery, [body.email], (err, data) => {
        if (err) {
          reject({ msg: "User not found" });
        }
        resolve(data);
      });
    });
  },
};

module.exports = authModel;
