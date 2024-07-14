'use strict'

const mongoose = require('mongoose'); // Erase if already required

const DOCUMENT_NAME = 'KeyToken';
const COLLECTION_NAME = 'keyTokens';

// Declare the Schema of the Mongo model
var keyTokenSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    publicKey: {
        type: String,
        required: true
    },
    privateKey: {
        type: String,
        required: true
    },
    refreshTokensUsed: {
        type: Array,
        default: []//rt have been used
    },
    refreshToken: {
        type: String,
        required: true
    }
},
    {
        timestamps: true,
        collection: COLLECTION_NAME
    });

//Export the model
module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema);