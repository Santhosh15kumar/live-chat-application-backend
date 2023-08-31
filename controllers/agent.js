const agentModel = require('../model/agentModel');

const bcrypt = require('bcrypt');



class agentController {
    async register(req,res){
        try{
        const {name, email, password, role, organizationId} = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);
        const agent = new agentModel({
            name: name,
            email: email,
            password: hashedPassword,
            role: role,
            organizationId: organizationId
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
            const {email, password, organizationId} = req.body;
            
        }
    }
}

module.exports = new agentController();

