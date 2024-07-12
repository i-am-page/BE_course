'use strict'

const {model, Schema, Types} = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'apiKey';
const COLLECTION_NAME = 'apiKeys';

// Declare the Schema of the Mongo model
var apiKeySchema = new Schema({
    key: {
        type: String,
        required: true,
        unique: true
    },
    status: {
        type: Boolean,
        required: true,
    },
    permissions: {
        type: [String],
        required: true,
        enum: ['0000','1111','2222']
    }
}, {timestamps: true,collection: COLLECTION_NAME});

//Export the model
module.exports = model(DOCUMENT_NAME, apiKeySchema);