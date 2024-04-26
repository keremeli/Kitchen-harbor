require("dotenv").config();

module.exports = {
  development: {
    username: 'keremetskii',
    password: 'password',
    database: 'kitchenharbor',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
  },
  secretKey: 'iloveprague' // Replace 'your_secret_key_here' with your actual secret key
};

  
