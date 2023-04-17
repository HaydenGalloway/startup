const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
  throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('Santata').collection('user');
const itemListCollection = client.db('Santata').collection('itemList');

function getUser(email) {
  return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
  // Hash the password before we insert it into the database
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  await userCollection.insertOne(user);

  return user;
}

async function addItem(token, item, link) {
  const user = await getUserByToken(token);
  if (!user) return null;

  const newItem = {
    userId: user._id,
    item: item,
    link: link,
  };
  await itemListCollection.insertOne(newItem);

  return newItem;
}

async function removeItem(token, itemId) {
  const user = await getUserByToken(token);
  if (!user) return null;

  return itemListCollection.deleteOne({ _id: itemId, userId: user._id });
}

async function getUserItems(token) {
  const user = await getUserByToken(token);
  if (!user) return null;

  return itemListCollection.find({ userId: user._id }).toArray();
}

async function getItemCounts() {
  return itemListCollection.aggregate([
    { $group: { _id: "$userId", count: { $sum: 1 } } },
    { $lookup: { from: "user", localField: "_id", foreignField: "_id", as: "user" } },
    { $project: { email: { $arrayElemAt: ["$user.email", 0] }, count: 1, _id: 0 } },
  ]).toArray();
}

module.exports = {
  getUser,
  getUserByToken,
  createUser,
  addItem,
  removeItem,
  getUserItems,
  getItemCounts,
};
