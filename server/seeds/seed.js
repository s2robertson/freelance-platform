require('../config/connection');
const { User, Service, Message } = require('../models/')

const userData = require('./userData.json');
const serviceData = require('./serviceData.json');
const messageData = require('./messageData.json');

const userPromise = User.deleteMany({}).then(() => {
    return User.insertMany(userData);
}).then(() => console.log('Users seeded'));

const servicePromise = Service.deleteMany({}).then(() => {
    return Service.insertMany(serviceData);
}).then(() => console.log('Services seeded'));

const messagePromise = Message.deleteMany({}).then(() => {
    return Message.insertMany(messageData);
}).then(() => console.log('Messages seeded'));

Promise.all([userPromise, servicePromise, messagePromise]).then(() => {
    process.exit(0);
})