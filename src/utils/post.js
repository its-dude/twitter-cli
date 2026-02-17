import fs from 'fs'
import path  from 'path'
import os from 'os'
import chalk from 'chalk'

export async function postTweet(text) {

    const folder_Path = path.join(os.homedir(), ".config", "twitter-cli")
    const file_Path = path.join(folder_Path, "config.json")
    const file_Data = fs.readFileSync(file_Path)

    const token = JSON.parse(file_Data)

    const res = await fetch( "https://api.twitter.com/2/tweets",
        {
            method: "POST",
            headers: {
                'Authorization': `Bearer ${token.access_token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                text
            })
        }
    )
    
    if (!res.ok) {
        console.log(chalk.redBright("No credits"))
    }else {
        console.log(chalk.greenBright("Tweet submitted."))
    }

}