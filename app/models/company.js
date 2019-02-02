const mongoose = require('mongoose')
const Schema = mongoose.Schema

const companySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String
    }
})


const Company = mongoose.model('Company', companySchema);

module.exports = {
    Company
}