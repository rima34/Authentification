const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true,'Please add a naame']
    },
    email: {
        type: String,
        required: [true,'Please add an Email']
    },
    password: {
        type: String,
        required: [true,'Please add a password']
    },

},
{
   timetamps:true 
})

module.exports=mongoose.model('User',userSchema)
