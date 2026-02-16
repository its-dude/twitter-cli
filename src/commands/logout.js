import { Command } from "commander";
import { logoutUser } from "../utils/logout.js";

const logout = new Command("logout")

logout
    .description("logout from the twitter")
    .action(logoutUser)

export {logout}
