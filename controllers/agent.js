const agentModel = require('../model/agentModel');

const bcrypt = require('bcrypt');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');


class agentController {
    async register(req,res){
        try{
        const {name, email, password, role} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const agent = new agentModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role
        }); 

        await agent.save();
        console.log(agent);
        res.status(200).json({message: "Agent Created Successfully", success: true, status: 200});
        }catch(error) {
            console.log("Error@createAgent", error);
            res.status(500).json({message: "Something went wrong please try again later"});
        }
    }

    async login(req,res){
        try{
            const {email, password} = req.body;
            const agent = await agentModel.find({email: email});
            const isPasswordMatched = await bcrypt.compare(password, agent[0].password);
            if(isPasswordMatched){
                const jwtToken = jwt.sign({ agent: agent._id}, 'MY_SECRET_TOKEN');
                return res.status(200).cookie('jwt', jwtToken, {message: 360000}).json({ message: 'jwtToken created', jwtToken});
            }
        }catch(error) {
            console.log("Error@loginAdmin", error);
            return res.status(500).json({message: error.message});
        }
    }
}

module.exports = new agentController();

