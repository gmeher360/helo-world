import { formatErrors } from '../../utils'

export default {
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            // passing a a random user from context as we have not setup JWT and user authentication yet
            try {
                await models.Team.create({ ...args, owner: user.id });
                return {
                    ok: true,
                }
            } catch (error) {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }
        }
    }
};