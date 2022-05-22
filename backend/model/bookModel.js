const mongoose = require('mongoose')

const bookSchema = mongoose.Schema(
  {
    user:{
      type:mongoose.Schema.Types.ObjectId,
      required: true,
      ref:'User'
    },
    ISBN: {
      type: String,
      required: [true, 'Please add a ISBN value'],
    },
    Titre: {
      type: String,
      required: [true, 'Please add a Titre value'],
    },
    Auteur: {
      type: String,
      required: [true, 'Please add a Auteur value'],
    },
    categorie: {
      type: String,
      required: [true, 'Please add a categorie value'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('Book', bookSchema)