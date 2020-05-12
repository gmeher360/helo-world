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
        }),
        getInvitedTeams: async (parent, args, context) => {
            try {
                console.log("hello")
                const allTeams = await context.models.sequelize.query('select * from teams join members on id = team_id where user_id = ?', {
                    replacements: [context.user.id],
                    model: context.models.Team,
                })
                console.log(allTeams);
                return {
                    ok: true,
                    teams: allTeams
                }
            } catch (error) {
                console.log(error)
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }
        },
    },
    Mutation: {
        createTeam: requiresAuth(async (parent, args, { models, user }) => {
            // passing a a random user from context as we have not setup JWT and user authentication yet
            try {
                const response = await models.sequelize.transaction(async (t) => {
                    const team = await models.Team.create({ ...args, owner: user.id }, { transaction: t });
                    await models.Channel.create({ name: "General", teamId: team.id, public: true }, { transaction: t });
                    return team
                })

                return {
                    ok: true,
                    team: response
                }
            } catch (error) {
                console.log(error)
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