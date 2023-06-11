const express = require('express');
const path = require("path")
const fs = require("fs")
const PORT = process.env.PORT || 3001;
const app = express();


app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static("public"))

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/index.html"))
})

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "/public/notes.html"))
})

app.get("/api/notes", (req, res) => {
    const savednotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    console.log("hello this is line 24 server.js ", savednotes)
    res.json(savednotes)
})

app.post("/api/notes", (req, res) => {
    const savednotes = JSON.parse(fs.readFileSync("./db/db.json", "utf-8"))
    console.log("hello this is line 30 server.js ", req.body)
    savednotes.push(req.body)
    fs.writeFileSync("./db/db.json", JSON.stringify(savednotes))
    res.send("Success")
})

app.listen(PORT, () =>
    console.log(`Example app listening at http://localhost:${PORT}`)
);
