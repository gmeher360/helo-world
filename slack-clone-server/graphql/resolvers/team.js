import { formatErrors } from '../../utils'
import { requiresAuth } from '../../permissions';

export default {
    Mutation: {
        createTeam: requiresAuth(async (parent, args, context) => {
            // passing a a random user from context as we have not setup JWT and user authentication yet
            try {
                await context.models.Team.create({ ...args, owner: context.user.id });
                return {
                    ok: true,
                }
            } catch (error) {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }
        })
    }
};