const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    formId: {
        type: String,
        require: true,
        unique: 1,
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        require: true,
        minlength: 6
    },
    username: {
        type: String,
        require: true,
        maxlength: 20
    },
    token: {
        type: String
    },
    spotifytoken: {
        type: String
    },
    spotifyPlaylistId: {
        type: String
    },
    friendSongs: [{
        type: Schema.Types.ObjectId,
        ref: 'friendSong'
    }]
});

UserSchema.pre('save', async function (next) {
    try {
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(this.password, salt);
        this.password = hash;
        next();

    } catch (err) {
        next(err);
    }
});
const User = mongoose.model('User', UserSchema);

module.exports = { User }