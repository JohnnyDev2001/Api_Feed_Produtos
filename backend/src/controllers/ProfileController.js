const Profile = require('../models/Profile');
const User = require('../models/User');

module.exports = {
    async update(req, res){
        const user_id = req.userId;
        const { bio, link } = req.body;

        try{
            const auth = await Profile.findOne({
                attributes: ['id'],
                where: user_id 
            });

            if(!auth)
                return res.status(400).json({ error: 'Ocorreu algum erro na hora de acessar o perfil'});

            const profile = await Profile.update({ bio, link },{
                where:{
                  id: auth.id
            }});

            return res.json({ profile });
        }catch(err){
            return res.status(400).json({ error: 'Ocorreu algum erro na hora de acessar o perfil'});
        }
    },
    async show(req, res){
        const id = req.userId;

        try{
            const perfil = await Profile.findOne({
                attributes: ['bio', 'link', 'photo'],
                where: {user_id : id}
            });

            if(!perfil)
                return res.status(400).json({ error: 'erro na hora de acessar o perfil'});

            const user = await User.findOne({
                where: {id : id}
            });

            if(!user)
                return res.status(400).json({ error: 'erro na hora de acessar o perfil'});
            
            user.password = undefined;

            return res.json({ perfil, user});
        }catch(err){
            return res.status(400).json({ error: 'Ocorreu algum erro na hora de acessar o perfil'});
        }
    }
}