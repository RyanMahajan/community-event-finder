db = db.getSiblingDB('mydb');

db.createCollection('users', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['name', 'age', 'email'],
      properties: {
        name: {
          bsonType: 'string',
          description: "must be a string and is required"
        },
        age: {
          bsonType: 'int',
          minimum: 18,
          description: "must be an integer and is required"
        },
        email: {
          bsonType: 'string',
          pattern: '^.+@.+\\..+$',
          description: 'must be a string and match email pattern'
        },
        /*
        isActive: {
          bsonType: 'bool',
          description: "must be a boolean and is optional"
        }
        */
      }
    }
  }
});

db.users.insertMany([
  { name: 'Alice', age: 30, email: "alicethegoat@gmail.com" },
  { name: 'Bob', age: 25, email: "bobthelame@gmail.com" },
  { name: 'Conner', age: 18, email: 'connerwinning@gmail.com' }
]);

db.createCollection('events', {
  validator: {
    $jsonSchema: {
      bsonType: 'object',
      required: ['title', 'description', 'date', 'members'],
      properties: {
        title: {
          bsonType: 'string',
          description: "must be a string and is required"
        },
        description: {
          bsonType: 'string',
          description: "must be a string and is required"
        },
        date: {
          bsonType: 'Date',
          description: "must be a Date and is required"
        },
        members: {
          bsonType: 'string',
          description: 'must be a string and is required'
        }
      }
    }
  }
});

db.events.insertMany([
  { title: 'Diddy party', description: 'Come get fucked by Mr. Diddler himself, no poor brokies', date: new Date(), members: 'Bob, Alice, Conner' },
  { name: 'SA Orgy', description: '', date: new Date(), members: 'Conner, Alice' }
]);

print('✅ Initialized mydb with sample users and events');
