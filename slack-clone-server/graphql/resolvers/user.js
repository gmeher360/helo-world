import bcrypt from 'bcrypt';
import { tryLogin } from '../../auth';
import { formatErrors } from '../../utils'

export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.fineOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
        authenticateUser: async (parent, args, context) => {
            if (!context.user || !context.user.id) {
                return {
                    ok: false
                }
            } else {
                return {
                    ok: true
                }
            }
        }
    },
    Mutation: {
        registerUser: async (parent, args, { models }) => {
            try {

                const user = await models.User.create(args)
                return {
                    ok: true,
                    user
                }
            } catch (err) {
                console.error(err)
                return {
                    ok: false,
                    errors: formatErrors(err)
                };
            }
        },
        loginUser: async (parent, { email, password }, { models }) => tryLogin(email, password, models)
    }
}