const express = require("express");
const upload = require("express-fileupload")
var cors = require('cors');
const bodyParser = require("body-parser")
const app = express();
/*
const { docxToPdfFromPath, initIva } = require("iva-converter");
const { writeFileSync } = require("fs");
const { basename } = require("path");
*/
// GET YOUR API KEY AT https://app.iva-docs.com/auth/register
initIva("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1Yzk5MmU2ODJjMTAwMjkzYzcyZjMiLCJjcmVhdGVkQXQiOjE2MDk5NDYwMzgwNjAsImlhdCI6MTYwOTk0NjAzOH0.xOhHqgwkDLjA4FXF4CD3Rf4O-tvSMYizc1-aHJdLyrs");

app.use(cors());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))

app.post("/recive", (req, res) => {
    console.log("bbbb");
    console.log(req.body);
    console.log(req.body.file);
    const file = req.body.file;
    const filePath = file;
    const uploadpath = __dirname + "/uploads/" + req.body.file;
    console.log(uploadpath)
        /* file.mv(uploadpath, (err) => {
             if (err) {
                 console.log("error", err);
                 res.send("error")
             } else {
                 console.log("File uploaded successfully")
             }
         }) */

    res.set('Access-Control-Allow-Origin', '*');
    res.send("Root Page");
})

app.get("/about", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send("About Page");
})



app.listen(3001, () => {
    console.log("Server is running on port 3001")
});