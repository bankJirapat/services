// importing user profile context
const userProfile = require("../model/user_profile");
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const encryptedPass = async (password) => {
    return await bcrypt.hash(password, 10)
}

const createUser = async (fullName, username, password) => {
    return await userProfile.create({
        fullName,
        username,
        password
    })
}

const createToken = async (user, tokenKey) => {
    let userFinal = JSON.parse(JSON.stringify(user));
    let token = jwt.sign({
        user_id: user._id
    },
        tokenKey,
        {
            expiresIn: "2h"
        }
    )
    userFinal["token"] = token
    return { userFinal: userFinal, token: token }
}

const randomTokenKey = async () => {
    let string_length = 10
    return [...Array(string_length)].map(i => (~~(Math.random() * 36)).toString(36)).join('')
}

const comparePassword = async (password, passDB) => {
    return bcrypt.hash(passDB, 10).then((hash) => {
        return bcrypt.compare(password, hash).then((value) => {
            console.log("value : " + value)
            return value
        })
    })
}

const decodeJWT = async (jwt) => {
    let base64url = jwt.split(".")[1]
    let base64 = base64url.replace(/-/g, '+').replace(/_/g, '/');
    let jsonPayload = decodeURIComponent(Buffer.from(base64, 'base64').toString().split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    console.log("jsonPayload : ", JSON.parse(jsonPayload))
    return JSON.parse(jsonPayload)
}

module.exports = {
    encryptedPass,
    createUser,
    createToken,
    randomTokenKey,
    comparePassword,
    decodeJWT
}