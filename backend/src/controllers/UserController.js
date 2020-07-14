const User = require('../models/User');
const Profile = require('../models/Profile');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { Op } = require('sequelize');

const AuthConfig = require('../config/auth');

function generateToken(params = {}){
    return jwt.sign(params, AuthConfig.secret,{
        expiresIn: 86400,
    });
}

module.exports = {
    async index(req, res){
        const { username, password } = req.body;

        try{
            const auth = await User.findOne({
                attributes: ['id', 'password'],
                where:{
                    [Op.or]:[
                        { username: username },
                        { email: username },
                    ]
                }
            });

            if(!auth)
                return res.status(400).json({ error: 'Dados informados estão incorretos'});

            const pass = await bcrypt.compare(password, auth.password);

            if(!pass)
                return res.status(400).json({ error: 'Dados informados estão incorretos' });
            
            return res.json({
                id: auth.id,
                token: generateToken({ id: auth.id }),
            });
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

            const hash = await bcrypt.hash(password, 10);
            
            const user = await User.create({ username, real_name, email, password: hash });
            const profile = await Profile.create({ user_id : user.id });

            user.password = undefined;

            return res.json({
                user,
                token: generateToken({ id: user.id }),
                profile
            });
        }catch(err){
            return res.status(400).json({ error: 'Erro ao efetuar o cadastro'});
        }
    },
};