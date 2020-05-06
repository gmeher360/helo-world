import bcrypt from 'bcrypt';

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.fineOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        registerUser: async (parent, { password, ...args }, { models }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 12)
                await models.User.create({ ...args, password: hashedPassword })
                return true
            } catch (err) {
                console.error(err)
                return false
            }
        },
    }
}