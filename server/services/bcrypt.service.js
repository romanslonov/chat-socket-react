const bcrypt = require('bcrypt-nodejs');

module.exports.password = password => {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

module.exports.comparePassword = (pw, hash) => bcrypt.compareSync(pw, hash);
