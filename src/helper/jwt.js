import jwt from "jsonwebtoken"
import 
const secret = "qwer123"

const command = process.argv[2]



const expiresIn = {expiresIn: 60 * 60 }

const token = jwt.sign(paypoad, secret, expiresIn)

console.log(token);


