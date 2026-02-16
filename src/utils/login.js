import express from "express"
import open from "open"
import pkceChallenge from "pkce-challenge"
import fs from "fs"
import path from "path"
import crypto from "crypto"
import { clientId, redirectUri, serverPort } from "../config/config.js"
import chalk from "chalk"

const CONFIG_DIR = path.join(process.env.HOME, ".config", "twitter-cli")
const CONFIG_FILE = path.join(CONFIG_DIR, "config.json")
const app = express()

export function loginUser() {

    return new Promise(async (resolve, reject) => {
        if (fs.existsSync(CONFIG_FILE)) {
            console.log(chalk.greenBright("Already logged in"))
            resolve()
            return
        }
        const { code_verifier, code_challenge } = await pkceChallenge()

        const scope = encodeURIComponent("tweet.read tweet.write users.read offline.access")
        const state = crypto.randomBytes(16).toString('hex')

        const authUrl =
            `https://twitter.com/i/oauth2/authorize` +
            `?response_type=code` +
            `&client_id=${clientId}` +
            `&redirect_uri=${redirectUri}` +
            `&scope=${scope}` +
            `&state=random123` +
            `&code_challenge=${code_challenge}` +
            `&code_challenge_method=S256`

        const server = app.listen(serverPort)
        
        const connections = new Set()
        server.on('connection', (conn) => {
            connections.add(conn)
            conn.on('close', () => connections.delete(conn))
        })
        
        const closeServer = () => {
            return new Promise((resolveClose) => {
                // Destroy all connections
                connections.forEach(conn => conn.destroy())
                
                server.close(() => {
                    resolveClose()
                })
            })
        }

        app.get('/callback', async (req, res) => {

            try {
                if (!req.query.code) {
                    res.send("Login failed.")
                    await closeServer()
                    reject(new Error("Login failed."))
                    return
                }

                const code = req.query.code

                const tokenRes = await fetch(
                    "https://api.twitter.com/2/oauth2/token",
                    {
                        method: "POST",

                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded",
                        },

                        body:
                            `client_id=${clientId}` +
                            `&grant_type=authorization_code` +
                            `&code=${code}` +
                            `&redirect_uri=${redirectUri}` +
                            `&code_verifier=${code_verifier}`
                    }
                )

                if (!tokenRes.ok) {
                    res.send("Token exchange failed")
                    await closeServer()
                    reject(new Error("Token exchange failed"))
                    return
                }

                const tokenData = await tokenRes.json()

                fs.mkdirSync(CONFIG_DIR, { recursive: true })
                fs.writeFileSync(CONFIG_FILE, JSON.stringify(tokenData, null, 2))

                res.send("Login successful. You can close this window.")
                console.log(chalk.greenBright("Login successful"))

                // Wait a bit for response to send, then close
                setTimeout(async () => {
                    await closeServer()
                    resolve()
                }, 100)
                
            } catch (err) {
                await closeServer()
                reject(err)
            }

        })

        await open(authUrl)

    })

}