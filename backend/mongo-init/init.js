db = db.getSiblingDB('mydb');

db.createCollection('users');

db.users.insertMany([
  { name: 'Alice', age: 30 },
  { name: 'Bob', age: 25 }
]);

print('✅ Initialized mydb with sample users');
