const User = require('../models/User');
const { Op } = require('sequelize');

module.exports = {
    async index(req, res){
        const { username, password } = req.body;

        try{
            const auth = User.findOne({
                attributes: ['id'],
                where:{
                    [Op.or]:[
                        { username: username },
                        { email: username },
                    ]
                }
            });

            console.log({ id: auth})

            if(!auth)
                return res.status(400).json({ error: 'Dados informados estão incorretos'});

            const pass = password === password

            if(!pass)
                return res.status(400).json({ error: 'Dados informados estão incorretos' });
            
            return res.json({ id: auth.id });
        }catch(err){
            return res.status(400).json({ error: 'Erro ao efetuar login'});
        }

    },
    async store(req, res){
        const { username, real_name, email, password } = req.body;

        try{
            const auth_username = await User.findOne({attributes: ['username'], where: { username }});

            if(auth_username)
                return res.status(400).json({ error: 'Username já existe' });
            
            const auth_email = await User.findOne({attributes: ['email'],  where: { email } })

            if(auth_email)
                return res.status(400).json({ error: 'E-mail já existe' });
            
            const user = await User.create({ username, real_name, email, password });

            return res.json({ user });
        }catch(err){
            return res.status(400).json({ error: 'Erro ao efetuar o cadastro'});
        }
    },
};