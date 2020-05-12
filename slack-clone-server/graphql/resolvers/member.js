import { formatErrors } from "../../utils";

export default {
    Mutation: {
        createMember: async (parent, { teamId, email }, { user, models }) => {
            try {
                const teamPromise = models.Team.findOne({ where: { id: teamId }, raw: true });
                const newMemberPromise = models.User.findOne({ where: { email }, raw: true });
                const [team, newMember] = await Promise.all([teamPromise, newMemberPromise]);
                if (team.owner !== user.id) {
                    return {
                        ok: false,
                        errors: [{ path: "email", message: "you are not allowed to create member in this team" }]
                    }
                }
                if (!newMember) {
                    return {
                        ok: false,
                        errors: [{ path: "email", message: "user does not exist" }]
                    }
                }
                await models.Member.create({ teamId, userId: newMember.id, });
                return {
                    ok: true,
                }
            } catch (error) {
                console.log(error)
                return {
                    ok: false,
                    errors: formatErrors(error)
                }

            }
        }
    }
}