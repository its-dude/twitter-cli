import chalk from "chalk";

import fs from "fs/promises"
import path from "path"
import os from "os"

export async function logoutUser(){
    const folder_Path = path.join(os.homedir(), ".config", "twitter-cli")
    const file_Path = path.join(folder_Path, "config.json")
    
    try{
       await fs.unlink(file_Path)
       console.log(chalk.greenBright("Logged out."))
    }catch(err){
        if (err.code === 'ENOENT'){
            console.log( chalk.redBright("Already logged out."))
        }else {
            console.log(err.message)
        }
    }
} 