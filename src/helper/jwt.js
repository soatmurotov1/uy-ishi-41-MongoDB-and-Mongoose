import jwt from "jsonwebtoken"

const secret = "qwer123"
const command = process.argv[2] || "default_user"

const options = { expiresIn: `20s` }

const payload = {
  name: "Alibek",
  age: 20,
  location: "Tashkent",
  user: command
}

const token = jwt.sign(payload, secret, options)

console.log("Generated Token:", token)
