import express, {Express} from "express"
import cors from "cors"
import { AddressInfo } from "net"
import dotenv from "dotenv";
import fs from "fs";
import readline from "readline";
import { google } from "googleapis";

dotenv.config();

const SCOPES = ["https://www.googleapis.com/auth/drive.metadata.readonly"];
const TOKEN_PATH = "token.json";

declare global {
    var drive: any
}

fs.readFile("credentials.json", (err: any, content: any) => {
    if (err) return console.log("Error loading client secret file:", err);
  
    authorize(JSON.parse(content), exportAuth);
  });
  
  function authorize(credentials: any, callback: any) {
    const { client_secret, client_id, redirect_uris } = credentials.installed;
    const oAuth2Client = new google.auth.OAuth2(
      client_id,
      client_secret,
      redirect_uris[0]
    );
  
    fs.readFile(TOKEN_PATH, (err, token: any) => {
      if (err) return getAccessToken(oAuth2Client, callback);
      oAuth2Client.setCredentials(JSON.parse(token));
      callback(oAuth2Client);
    });
  }
  
  function getAccessToken(oAuth2Client: any, callback: any) {
    const authUrl = oAuth2Client.generateAuthUrl({
      access_type: "offline",
      scope: SCOPES,
    });
    console.log("Authorize this app by visiting this url:", authUrl);
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
    rl.question("Enter the code from that page here: ", (code) => {
      rl.close();
      oAuth2Client.getToken(code, (err: any, token: any) => {
        if (err) return console.error("Error retrieving access token", err);
        oAuth2Client.setCredentials(token);
  
        fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
          if (err) return console.error(err);
          console.log("Token stored to", TOKEN_PATH);
        });
        callback(oAuth2Client);
      });
    });
  }
  
  function exportAuth (auth: any){
      global.drive = google.drive({version:'v3', auth});
  }
  

const app: Express = express()

app.use(express.json())
app.use(cors())

const server = app.listen(process.env.PORT || 3333, () => {
if (server) {
    const address = server.address() as AddressInfo;
    console.log(`Server is running in http://localhost:${address.port}`);
} else {
    console.error(`Failure upon starting server.`);
}
})

export default app 