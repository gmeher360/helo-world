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
        createChannel: async (patent, args, { models }) => {
            try {
                await models.Channel.create(args)
                return true
            } catch (err) {
                console.error(err);
                return false;
            }
        }
    }
};