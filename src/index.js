#!/usr/bin/env node
import { Command } from "commander"
import { login } from "./commands/login.js"
import { logout } from "./commands/logout.js"
import { tweet } from "./commands/post.js"

const  program = new Command()

program.name("twitter")
       .description("Twitter CLI")
       .version("1.0.0")

program.addCommand(login)
       .addCommand(logout)
       .addCommand(tweet)
       
program.parse()



