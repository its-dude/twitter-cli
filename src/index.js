#!/usr/bin/env node
import { Command } from "commander"
import { login } from "./commands/login.js"

const  program = new Command()

program.name("twitter")
       .description("Twitter CLI")
       .version("1.0.0")

program.addCommand(login)

program.parse()



