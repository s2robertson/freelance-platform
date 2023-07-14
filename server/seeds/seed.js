require('../config/connection');
const { User, Service } = require('../models/')

const userData = require('./userData.json');
const serviceData = require('./serviceData.json');

const userPromise = User.deleteMany({}).then(() => {
    return User.insertMany(userData);
}).then(() => console.log('Users seeded'));

const servicePromise = Service.deleteMany({}).then(() => {
    return Service.insertMany(serviceData);
}).then(() => console.log('Services seeded'));

Promise.all([userPromise, servicePromise]).then(() => {
    process.exit(0);
})