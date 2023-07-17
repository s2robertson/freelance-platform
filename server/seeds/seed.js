require('../config/connection');
const { User, Service, Message, Project } = require('../models/')

const userData = require('./userData.json');
const serviceData = require('./serviceData.json');
const messageData = require('./messageData.json');
const projectData = require('./projectData.json');

const userPromise = User.deleteMany({}).then(() => {
    return User.insertMany(userData);
}).then(() => console.log('Users seeded'));

const servicePromise = Service.deleteMany({}).then(() => {
    return Service.insertMany(serviceData);
}).then(() => console.log('Services seeded'));

const messagePromise = Message.deleteMany({}).then(() => {
    return Message.insertMany(messageData);
}).then(() => console.log('Messages seeded'));

const projectPromise = Project.deleteMany({}).then(() => {
    return Project.insertMany(projectData);
}).then(() => console.log('Projects seeded'));

Promise.all([userPromise, servicePromise, messagePromise, projectPromise]).then(() => {
    process.exit(0);
})