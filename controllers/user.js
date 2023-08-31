const userModel = require('../model/userModel');


exports.create = async (req,res) => {
        try{
            const {username, email, phone} = req.body;
            const user = new userModel({
                username: username,
                email: email,
                phone: phone
            });

            await user.save()
            console.log(user);
            return res.status(200).json({message: "User created Successfully", success: true, data: user, status: 200});
        }catch(error) {
            console.log('Error@createUser', error);
            return res.status(500).json({message: "Someting Went Wrong, please try again later", success: true});
        }
    }

