const cloud = require('@google-cloud/storage')
const path = require('path')
const serviceKey = path.join(__dirname, 'serviceKey.json');

const { Storage } = cloud;

const storage = new Storage({
  keyFilename: serviceKey,
  projectId: 'fifth-base-371111',
});

module.exports = storage;

