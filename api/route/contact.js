const express = require('express');
const router= express.Router();
const db = require('mongodb');
const mongoose = require('mongoose')
const Contact = require('../model/contact')
const checkAuth= require('../middleware/check-auth')
// get all the contacts
router.get('/',checkAuth,(req, res, next) =>{
    Contact.find()
    .exec()
    .then(result=>{
        res.status(200).json({
            Contact:result
        })
    })
})

// get with pagnition
router.get('/paginition',checkAuth,(req, res, next) =>{
    const {page=1, limit=5,}=req.query
    Contact.find().limit(limit *1).skip((page-1)*limit)
    .exec()
    .then(result=>{
        res.status(200).json({
            Contact:result
        })
    })
})

// get by id
router.get('/:id',checkAuth,(req, res, next)=>{
    Contact.findById(req.params.id)
    .then(result=>{
            res.status(200).json({
                    product:result
            })
    })
    .catch(err=>{
       console.log(err);
       res.status(500).json({
            error:err
       })
    })
})

//  post one contact
router.post('/',(req, res, next)=>{
    const contact= new Contact({
        _id: new mongoose.Types.ObjectId,
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email
    })
    contact.save()
            .then(result=>{
                res.status(200).json({
                    newContact:result
                })
               })
            .catch(err=>{
                res.status(500).json({
                    error:err
                })
               })
    })

    router.post('/manyContact',(req, res, next)=>{
        // var bulk = db.Contact.initializeOrderedBulkOp()
        // var len = Contact.size();
        // for(let i=0; i< len; i++){
        //     bulk.insert(contact : req.body.contact[i])
        //     bulk.execute()
        // }

        var len = req.body.length
        for(let i=0; i<len; i++){
          const contact = new Contact({
            name:req.body[i].name,
            phone:req.body[i].phone,
            email:req.body[i].email
          })
            contact.save()
                .then(result=>{
                    res.status(200).json({
                        newContact:result
                    })
                   })
                .catch(err=>{
                    res.status(500).json({
                        error:err
                    })
                   })
        }
        })


      
    //    delete the contact by id
        router.delete('/:id',(req, res, next)=>{
            Contact.remove({_id:req.params.id})
            .then(result=>{
                    res.status(200).json({
                            msg:'Contact has been deleted',
                            result:result
                    })
            })
            .catch(err=>{
               console.log(err);
               res.status(500).json({
                    error:err
               })
            })
        })


        // update by id 
        router.put('/:id', (req, res, next)=>{
            Contact.findOneAndUpdate({_id:req.params.id},{
                $set:{
                  name:req.body.name,
                  phone:req.body.phone,
                  email:req.body.email
                }
            })
            .then(result=>{
                res.status(200).json({
                    update_contact:result
                })
               })
            .catch(err=>{
                console.log(err);
                res.status(500).json({
                    error:err
                })
               })
        })
    module.exports = router;