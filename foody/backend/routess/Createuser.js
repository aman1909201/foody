//router= in code we use multiple request
const express = require('express')
const router = express.Router()
const User = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt=require("jsonwebtoken")
const secretkey="abcdefghijklmnopqrstuvwxyz&*()$#"

const bcrypt = require("bcryptjs")


router.post("/createuser", [
    body('email').isEmail(),
    body('name', 'incorrect name').isLength({ min: 5 }),
    body('password', 'incorrect password').isLength({ min: 5 })]
    , async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const salt = await bcrypt.genSalt(10)
        let secure = await bcrypt.hash(req.body.password, salt)

        try {// we will create user in this and req= request, res= response
            await User.create({

                "name": req.body.name,
                "location": req.body.location,
                "email": req.body.email,
                "password": secure

            })
            res.json({ success: true })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })

router.post("/loginuser", [
    body('email').isEmail(),
    body('password', 'incorrect password').isLength({ min: 5 })],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        let email = req.body.email;
        try {// we will create user in this and req= request, res= response
            let userdata = await User.findOne({ email })
            if (!userdata) {
                return res.status(400).json({ errors: "try logging with correct data" });
            }
            const pwdcompare = await bcrypt.compare(req.body.password, userdata.password)
            if (!pwdcompare) {
                return res.status(400).json({ errors: "try logging with correct data" });
            }

            const data={
                user:{
                    id:userdata.id
                }
            }
            const authtoken=jwt.sign(data,secretkey)

            return res.json({ success: true, authtoken:authtoken })
        } catch (error) {
            console.log(error)
            res.json({ success: false })
        }

    })


module.exports = router;