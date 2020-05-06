export default {
    Mutation: {
        createTeam: async (parent, args, { models, user }) => {
            // passing a a random user from context as we have not setup JWT and user authentication yet
            try {
                const team = await models.Team.create({ ...args, owner: user.id });
                return true;
            } catch (error) {
                console.log(error);
                return false;
            }
        }
    }
};