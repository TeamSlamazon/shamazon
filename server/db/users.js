const client = require('./client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

const getUserByUsername = async (username) => {
  try {
    const { rows: [user]} = await client.query(`
    SELECT *
    FROM users
    WHERE username = $1
    `, [username])
    return user;
  } catch (error) {
    console.error('error getting user by username')
  }
}

const createUser = async({ username, password, admin = false }) => {
  const saltRounds = 15;
  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds)

    const { rows: [user] } = await client.query(`
    INSERT INTO users(username, password, admin) 
    VALUES($1, $2, $3) 
    RETURNING id, username, admin;
  `, [username, hashedPassword, admin]);
  
  return user;
} catch (error) {
  console.error('error creating user')
  throw error;
}
}

const getUserByToken = async(token) => {
  const payload = await jwt.verify(token, process.env.JWT_SECRET);
  const SQL = `
    SELECT users.*
    FROM users
    WHERE id = $1 
  `;
  const response = await client.query(SQL, [ payload.id]);
  if(!response.rows.length){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  const user = response.rows[0];
  delete user.password;
  return user; 
}

const authenticate = async({ username, password }) => {
  const SQL = `
    SELECT id, username, password
    FROM users
    WHERE username = $1
  `;
  console.log(username);
  const response = await client.query(SQL, [ username]);
  console.log(response);
  if(!response.rows.length || !(await bcrypt.compare(password, response.rows[0].password))){
    const error = Error('not authorized');
    error.status = 401;
    throw error;
  }
  return jwt.sign({ id: response.rows[0].id, username: response.rows[0].username }, process.env.JWT_SECRET);
}

const getAllUsers = async () => {
  const {rows} = await client.query(`
  SELECT id, username
  FROM USERS
  `)
  return rows
}

module.exports = {
  getUserByUsername,
  createUser,
  authenticate,
  getUserByToken,
  getAllUsers
};

