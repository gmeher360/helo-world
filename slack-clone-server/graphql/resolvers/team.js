import { formatErrors } from '../../utils'
import { requiresAuth } from '../../permissions';

export default {
    Query: {
        getAllTeams: requiresAuth(async (parent, args, context) => {
            try {
                const allTeams = await context.models.Team.findAll({ where: { owner: context.user.id }, raw: true });

                return {
                    ok: true,
                    teams: allTeams
                }
            } catch (error) {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }
        })
    },
    Mutation: {
        createTeam: requiresAuth(async (parent, args, context) => {
            // passing a a random user from context as we have not setup JWT and user authentication yet
            try {
                const team = await context.models.Team.create({ ...args, owner: context.user.id });
                await context.models.Channel.create({ name: "General", teamId: team.id, public: true });
                return {
                    ok: true,
                    team,
                }
            } catch (error) {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }
        })
    },
    // Team: {
    //     Channels: async (parent, args, context) => {
    //         channels = await context.models.Channel.findAll({ where: { teamId: parent.id }, raw: true })
    //     }
    // }
};