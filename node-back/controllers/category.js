const Category = require('../models/category')
const slugify = require('slugify')
const formdidable = require('formidable')
const AWS = require('aws-sdk')
const { v4: uuidv4 } = require('uuid');
const fs = require('fs')

//S3
const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION
})

exports.create = (req, res) => {
    console.log(req.body)
    const { name, image, content } = req.body
    
    //image data
    const base64Data = new Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64')
    const type = image.split(';')[0].split('/')[1];


    const slug = slugify(name)
    let category = new Category({ name, content, slug })

    const params = {
        Bucket: 'hackor',
        Key: `category/${uuidv4()}.${type}`,
        Body: base64Data,
        ACL: 'public-read',
        ContentEncoding: 'base64',
        ContentType: `image/${type}`
    }

    s3.upload(params, function(err, data) {
        if(err) {
            res.status(400).json({
                error: 'Upload to s3 failed'
            })
        }
        console.log('AWS UPLOAD RES DATA', data)
        category.image.url = data.Location
        category.image.key = data.Key
        category.postedBy = req.user._id


        //save to database
        category.save((err, success) => {
            if(err){
                res.status(400).json({
                    error: 'Error saving category to db'
                })
            }
            return res.json(success)
        })
    })

}

// exports.create = (req, res) => {
//     let form = new formdidable.IncomingForm()
//     form.parse(req, (err, fields, files) => {
//         if(err){
//             return res.status(400).json({
//                 error: 'Image couldnt be uploaded'
//             })
//         }
//         // console.table({err, fields, files})

//         const {name, content} = fields
//         const {image} = files

//         const slug = slugify(name)
//         let category = new Category({name, content, slug})

//         if(image.size > 2000000){
//             return res.status(400).json({
//                 error: 'Image should be less than 2mb'
//             })
//         }
//         //upload image to s3
//         const params = {
//             Bucket: 'hackor',
//             Key: `category/${uuidv4()}`,
//             Body: fs.readFileSync(image.path),
//             ACL: 'public-read',
//             ContentType: 'image/jpg'
//         }

//         s3.upload(params, function(err, data) {
//             if(err) {
//                 res.status(400).json({
//                     error: 'Upload to s3 failed'
//                 })
//             }
//             console.log('AWS UPLOAD RES DATA', data)
//             category.image.url = data.Location
//             category.image.key = data.Key

//             //save to database
//             category.save((err, success) => {
//                 if(err){
//                     res.status(400).json({
//                         error: 'Error saving category to db'
//                     })
//                 }
//                 return res.json(success)
//             })
//         })

//     })
// }


exports.list = (req, res) => {
    Category.find({}).exec((err, data) => {
        if (err) {
            return res.status(400).json({
                error: 'Category could not load'
            })
        }
        res.json(data)
    })
}

exports.read = (req, res) => {

}

exports.update = (req, res) => {

}

exports.remove = (req, res) => {

}