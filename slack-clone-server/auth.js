import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const createTokens = async (user) => {
    const currentToken = jwt.sign(
        {
            user: {
                id: user.id,
                username: user.name
            }
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '1h'
        }
    )

    const refreshToken = jwt.sign(
        {
            user: {
                id: user.id
            }
        },
        user.password + process.env.ACCESS_REFRESH_TOKEN_SECRET,
        {
            expiresIn: '7d'
        }
    )

    return [currentToken, refreshToken];
}

export const refreshTokens = async (currentToken, refreshToken, models) => {
    let userId = 0;
    try {
        const { user: { id } } = jwt.decode(refreshToken)
        userId = id;
    } catch (err) {
        return {} //failed decoding of refreshtoken
    }
    if (!userId) {
        return {}  // user does not exists
    }
    const user = await models.User.findOne({ where: { id: userId }, raw: true })

    try {
        jwt.verify(refreshToken, user.password + process.env.ACCESS_REFRESH_TOKEN_SECRET)
    } catch (err) {
        return {}
    }
    const [newCurrentToken, newRefreshToken] = await createTokens(user)
    return {
        currentToken: newCurrentToken,
        refreshToken: newRefreshToken,
        user,
    }
}

export const tryLogin = async (email, password, models) => {
    const user = await models.User.findOne({ where: { email }, raw: true })
    if (!user) {
        return {
            ok: false,
            errors: [{
                path: "email",
                message: 'Email does not exists'
            }]
        }
    }
    const matchPassword = await bcrypt.compare(password, user.password)
    if (!matchPassword) {
        return {
            ok: false,
            errors: [{
                path: "password",
                message: 'invalid password'
            }]
        }
    }

    const [currentToken, refreshToken] = await createTokens(user)
    return {
        ok: true,
        currentToken,
        refreshToken
    }
}