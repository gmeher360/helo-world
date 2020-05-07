import bcrypt from 'bcrypt';

// const formatErrors = (e, models) => {
//     if (e instanceof models.sequelize.ValidationError) {
//         //  _.pick({a: 1, b: 2}, 'a') => {a: 1}
//         return e.errors.map(x => _.pick(x, ['path', 'message']));
//     }
//     return [{ path: 'name', message: 'something went wrong' }];
// };

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
    }
}