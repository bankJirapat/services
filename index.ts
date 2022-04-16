import app from './app';
// const app = require('./app');
import dayjs from "dayjs"
import { findDataService, findOneDataUser, findOneDataService, findOneDataUserWithID, findDataBookingWithID } from './method/queryDB';
import { encryptedPass, createUser, createToken, randomTokenKey, comparePassword, decodeJWT } from './method/auth_register';
import { createService } from './method/function_service'
import { createBooking, createData } from './method/function_booking'

const { API_PORT } = process.env
const port = process.env.PORT || API_PORT

// register user
app.post('/testBackend/v1/auth/register', async (req, res) => {
    try {
        console.log("req body : ", req.body);
        const { fullName, username, password } = req.body

        // Validate user input
        if (!(fullName && username && password)) {
            res.status(400).send("-- All input is required --");
        }

        // check if user already exist
        // Validate if user exist in our database
        const oldUser = await findOneDataUser(username)
        console.log("oldUser : " + oldUser)
        if (oldUser) {
            return res.status(400).send("-- User already exists. Please Login!! --");
        }

        // encrypted user password
        let encryptedPassword = await encryptedPass(password);
        console.log("encryptedPassword : ", encryptedPassword)

        // create user
        let user = await createUser(fullName, username, password)
        console.log("user : ", user)

        // random token key
        let randomToken = await randomTokenKey()
        console.log("randomTokenKey : ", randomToken)
        // create token
        let { userFinal, token } = await createToken(user, randomToken)
        console.log("token : ", token)
        console.log("user final : ", userFinal)

        //return new user
        res.status(200).json(userFinal.token)
    } catch (err) {
        console.log("error register : ", err)
        res.status(500).json(err)
    }

})

// login
app.post('/testBackend/v1/auth/signin', async (req, res) => {
    try {
        const { username, password } = req.body
        console.log("username: ", username, " password: ", password)
        if (!(username && password)) {
            res.status(400).send("-- All input is required --")
        }

        const user = await findOneDataUser(username)
        if (user) {
            console.log("user : ", user)
            // if (username == user.username)
            console.log("password : ", password, " user_password : ", user.password)
            let checkPass = await comparePassword(password, user.password)
            console.log("checkPass : ", checkPass)

            if (user && checkPass) {
                // random token key
                let randomToken = await randomTokenKey()
                console.log("randomTokenKey : ", randomToken)
                //create token
                let { userFinal, token } = await createToken(user, randomToken)
                console.log("userFinal : ", userFinal)
                console.log("token : ", token)
                res.status(200).json(userFinal.token)
            } else {
                res.status(400).json("-- Invalid Credentials!! --")
            }
        } else {
            res.status(400).json("-- Not User!! Please Register first --")
        }

    } catch (err) {
        console.log("error login : ", err)
    }
})

// show list services
app.get('/testBackend/v1/services', async (req, res) => {
    try {
        let result = await findDataService();
        console.log("result : ", result)
        if (result) res.status(200).json(result)
        else res.status(400).json("No Data Service")
    } catch (err) {
        console.log("error in show service : ", err)
        res.status(400).json("Not Data")
    }
})

// show description service
app.get('/testBackend/v1/services/:id', async (req, res) => {
    try {
        let id = req.params.id
        console.log("id : ", id)
        let result = await findOneDataService(id);
        console.log("result : ", result)
        if (result) res.status(200).json(result)
        else res.status(400).json("No Data Service")
    } catch (err) {
        console.log("error in show service : ", err)
        res.status(400).json("Not Data")
    }
})

// booking
app.post('/testBackend/v1/services/:id/booking', async (req, res) => {
    try {
        let id_service = req.params.id
        console.log("id_service : ", id_service)
        const auth = req?.headers?.authorization
        let service:any = await findOneDataService(id_service);
        console.log("service : ", service)
        console.log("auth : ", auth)
        let resultDecodeJWT = await decodeJWT(auth)
        let user_id = resultDecodeJWT.user_id
        console.log("user_id : ", user_id)
        let result_user = await findOneDataUserWithID(user_id)
        console.log("result_user : ", result_user)
        if (result_user) {
            let date = dayjs().format("YYYY-MM-DD_HH:mm:ss")
            console.log("date : ", date)
            let result_booking = await createBooking(id_service, service.name, result_user.username, date)
            console.log("result_booking : ", result_booking)
            if (result_booking) res.status(200).json(result_booking)
            else res.status(400).json("Not booking Service. Please Try Again")
        } else {
            throw "No user in db!! Please login again"
        }

    } catch (err) {
        console.log("error in show service : ", err)
        res.status(400).json(err)
    }
})

// show user booking
app.post('/testBackend/v1/orders', async (req, res) => {
    const auth = req?.headers?.authorization
    // console.log("auth : ", auth)
    let resultDecodeJWT = await decodeJWT(auth)
    let user_id = resultDecodeJWT.user_id
    // console.log("user_id : ", user_id)
    let result_user = await findOneDataUserWithID(user_id)
    // console.log("result_user : ", result_user)
    if (result_user) {
        let result_booking = await findDataBookingWithID(result_user)
        // console.log("result_booking in app : ", result_booking)
        let final_result = await createData(result_booking, result_user)
        // console.log("final_result : ", final_result)
        if (final_result) res.status(200).json(final_result)
        else res.status(400).json("Not booking Service. Please Try Again")
    } else {
        throw "No Data!! Please login again"
    }
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
