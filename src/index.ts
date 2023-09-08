// index.ts

import { JsonDatabase } from './Providers/JsonDatabase';

const db = new JsonDatabase('users');

const createdRecord = db.create({ name: 'John', age: 30 });
console.log('Created:', createdRecord);

const createdRecord2 = db.create({ name: 'Doe', age: 89 });
console.log('Created:', createdRecord2);

const readRecord = db.find(createdRecord.id);
console.log('Read:', readRecord);

const updatedRecord = db.update(createdRecord2.id, { age: 31 });
console.log('Updated:', updatedRecord);

const isDeleted = db.delete(readRecord.id);
console.log('Deleted:', isDeleted);