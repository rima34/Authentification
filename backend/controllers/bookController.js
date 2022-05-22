const asyncHandler = require('express-async-handler')

const Book = require('../model/bookModel')
const User = require('../model/userModel')

//DESCRIPTION get Books (to get all Books ama baed ma naemlou authentification bsh yaaml get Book mtaa user wehed specific)
//ROUTE (get a request to api) GET /api/goals
//ACCESS private 
const getBooks= asyncHandler(async (req,res) =>
{
    const books = await Book.find({ user: req.user.id })
   // res.status(200).json({message:'GET books'})
   res.status(200).json(books) 

})

//DESCRIPTION    SET Book 
//ROUTE          POST(post request) /api/books
//ACCESS         private 
const setBook= asyncHandler(async (req,res) =>
{
    if((!req.body.ISBN)||(!req.body.Titre)||(!req.body.Auteur)||(!req.body.categorie))
    {
        res.status(400) //client error or a bad request
        throw new Error ('Please add a text field')
    }

    const book = await Book.create({
        user: req.user.id,
        ISBN: req.body.ISBN,
        Titre: req.body.Titre,
        Auteur: req.body.Auteur,
        categorie: req.body.categorie,
    })
    
    res.status(200).json(book)

})

//DESCRIPTION     update book (update a request)
//ROUTE           PUT /api/book/:id
//ACCESS private 
const updateBook= asyncHandler (async (req,res) =>
{
    const book =await Book.findById(req.params.id)

    if (!book)
    {
        res.status(400)
        throw new Error ('book not found') 
    }

    const user = await User.findById(req.user.id)
 
    // check for user
    if (!user)
    {
         res.status(400)
         throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if (book.user.toString() !==user.id)
    {
            res .status(401)
            throw new Error('User not authorized')
    }

    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body,{
        new : true,
    })

    res.status(200).json(updatedBook)

})

//DESCRIPTION delete book (delete a request)
//ROUTE (get a request ti api) GET /api/book/:id
//ACCESS private 
const deleteBook= asyncHandler (async (req,res) =>
{
    const book =await Book.findById(req.params.id)

    if (!book){
        res.status(400)
        throw new Error ('book not found') 
    }

    const user = await User.findById(req.user.id)
 
    // check for user
    if (!user)
    {
         res.status(400)
         throw new Error('User not found')
    }

    //make sure the logged in user matches the goal user
    if (book.user.toString() !==user.id)
    {
            res .status(401)
            throw new Error('User not authorized')
    }
    await book.remove()
    res.status(200).json({id: req.params.id})

})

module.exports={getBooks,setBook,updateBook,deleteBook,}