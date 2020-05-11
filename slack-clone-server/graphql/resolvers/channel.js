import { formatErrors } from "../../utils";

export default {
    Query: {
        getAllChannelsByTeamId: async (parent, args, context) => {
            try {
                const channels = context.models.Channel.findAll({ where: { teamId: args.teamId }, raw: true });
                return {
                    ok: true,
                    channels
                }
            } catch (errors) {
                return {
                    ok: false,
                    errors: formatErrors(error)
                }
            }

        }
    },
    Mutation: {
        createChannel: async (patent, args, { models, user }) => {
            try {
                const team = await models.Team.findOne({ where: { id: args.teamId }, raw: true })
                if (team.owner !== user.id) {
                    return {
                        ok: false,
                        error: [{ path: "Auth", message: "You are not the owner of this Team" }]
                    }
                }
                const channel = await models.Channel.create(args)
                return {
                    ok: true,
                    channel
                }
            } catch (error) {
                console.log(error);
                if (formatErrors(error)) {
                    return {
                        ok: false,
                        error: formatErrors(error)
                    }
                }
                return {
                    ok: false,
                    error: [{ path: "Internal-server", message: error.message }]
                }
            }
        }
    }
};