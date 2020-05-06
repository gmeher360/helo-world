export default {
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