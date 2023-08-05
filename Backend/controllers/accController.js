const express = require("express");
const powerlogss = require("../models/powerlogs");
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const storeds = require("../models/storeds");

exports.signup = async(req,res)=>{
  console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await powerlogss.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})

    await storeds.create({
      name: req.body.name,
			email: req.body.email,
    })
    
    const token={name:req.body.name,email:req.body.email};
      
		res.json({user:token});
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
   
}

exports.login = async (req, res) => {
  try {
    const user = await powerlogss.findOne({
      email: req.body.email,
    });

    if (!user) {
      return res.status(401).json({ status: 'error', error: 'Invalid login' });
    }

    const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

    if (isPasswordValid) {
      const token = jwt.sign(
        {
          name: user.name,
          email: user.email,
        },
        'secret123'
      );

      return res.json({ status: 'ok', user: token });
    } else {
      return res.status(401).json({ status: 'error', error: 'Invalid login' });
    }
  } catch (error) {
    console.error('Error during login:', error);
    return res.status(500).json({ status: 'error', error: 'Internal server error' });
  }

   
}