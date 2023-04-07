const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roomType = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: false
    },
});


const propertySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    destination: {
        type: String,
        required: false
    },
    // roomTypes: {
    //     type: Array,
    //     required: true,
    // },
    roomTypes: [{
        type: roomType
    }],
    status: {
        type: Boolean,
        required: true,
    },
    // parentID: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'Property'
    // },
    createdAt: {
        type: Date,
        default: Date.now
    },
    modifiedAt: {
        type: Date,
        default: Date.now
    },
    // createdBy: {
    //     type: mongoose.Types.ObjectId,
    //     required: true,
    //     ref: 'User'
    // },

});
// replace _id with id when return
propertySchema.method('toJSON', function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;
    return obj;
});

roomType.method('toJSON', function() {
    var obj = this.toObject();
    obj.id = obj._id;
    delete obj._id;

    return obj;
});


module.exports = mongoose.model('Property', propertySchema);
