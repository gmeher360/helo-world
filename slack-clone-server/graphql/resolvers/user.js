import bcrypt from 'bcrypt';
import { tryLogin } from '../../auth';

const formatErrors = (err) => {
    if (err.name == "SequelizeValidationError") {
        return err.errors.reduce((errorsArray, error) => {
            errorsArray.push({ message: error.message, path: error.path })
            return errorsArray
        }, []);
    } else if (err.name == "SequelizeUniqueConstraintError") {
        return err.errors.reduce((errorsArray, error) => {
            errorsArray.push({ message: error.message, path: error.path })
            return errorsArray
        }, []);
    }

}
export default {
    Query: {
        getUser: (parent, { id }, { models }) => models.User.fineOne({ where: { id } }),
        allUsers: (parent, args, { models }) => models.User.findAll(),
    },
    Mutation: {
        registerUser: async (parent, { password, ...args }, { models }) => {
            try {
                const hashedPassword = await bcrypt.hash(password, 12)
                const user = await models.User.create({ ...args, password: hashedPassword })
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