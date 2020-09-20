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
          let registerQuery = "";
          if (body.notLoggingIn) {
            registerQuery = "INSERT INTO users SET ?";
          } else {
            registerQuery =
              "INSERT INTO users SET ?;SELECT id, first_name, last_name, phone_number, profile_image, level_id FROM users WHERE users.email=?;";
          }
          const { notLoggingIn, ...updatedBody } = body;
          if (err) {
            reject({ msg: "unknown error" });
          }
          const newBody = { ...updatedBody, password: hashedPassword };
          database.query(registerQuery, [newBody, body.email], (err, data) => {
            if (!err) {
              try {
                const payload = {
                  email: body.email,
                  level_id: body.level_id,
                };
                const token = jwt.sign(payload, process.env.SECRET_KEY);
                const {
                  id,
                  first_name,
                  last_name,
                  phone_number,
                  profile_image,
                  level_id,
                } = data[1][0];
                const msg = "Register success";
                resolve({
                  id,
                  first_name,
                  last_name,
                  phone_number,
                  profile_image,
                  level_id,
                  msg,
                  token,
                });
              } catch (e) {
                console.log(e);
                const msg = "Account Registered";
                reject({ msg });
              }
            } else {
              console.log(err);
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
        "SELECT id, first_name, last_name, phone_number, profile_image, email, password, level_id FROM users WHERE email=?;";
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
              const {
                id,
                first_name,
                last_name,
                phone_number,
                profile_image,
                email,
                level_id,
              } = data[0];
              const payload = {
                email,
                level_id,
              };
              const token = jwt.sign(payload, process.env.SECRET_KEY);
              const msg = "Successfully log in";
              resolve({
                id,
                first_name,
                last_name,
                phone_number,
                profile_image,
                level_id,
                msg,
                token,
              });
            } else {
              reject({ msg: "Wrong password" });
            }
          });
        }
      });
    });
  },
  userData: (id) => {
    return new Promise((resolve, reject) => {
      const userQuery = `SELECT id, first_name, last_name, profile_image, phone_number, level_id FROM users WHERE users.id=?`;
      database.query(userQuery, [id], (err, data) => {
        if (err) {
          reject({ msg: "User not found" });
        }
        resolve(data);
      });
    });
  },
  updateUser: (id, body) => {
    return new Promise((resolve, reject) => {
      const userQuery = `START TRANSACTION;UPDATE users SET ? WHERE users.id=?; SELECT id,first_name, last_name, profile_image, phone_number, level_id FROM users WHERE users.id=?;COMMIT;`;
      database.query(userQuery, [body, id, id], (err, data) => {
        if (err) {
          reject({ msg: "User not found" });
        }
        resolve(data[2][0]);
      });
    });
  },
};

module.exports = authModel;
