
export const requiresAuth = (resolver => {
    return (parent, args, context) => {

        if (!context.user || !context.user.id) {
            return {
                ok: false,
                errors: [{ message: "You are not Authenticated", path: "auth" }]
            }
        }
        return resolver(parent, args, context)
    }
})


