import { Command } from "commander"
import { loginUser } from "../utils/login.js"

const login = new Command('login')

    login
        .description("login to twitter")
        .action(loginUser)

export {login}