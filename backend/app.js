const express = require("express");
const upload = require("express-fileupload")
var cors = require('cors');
const bodyParser = require("body-parser")
const app = express();
const morgan = require('morgan');
const _ = require('lodash');
const { docxToPdfFromPath, initIva } = require("iva-converter");
const { writeFileSync } = require("fs");
const { basename } = require("path");
var nodemailer = require('nodemailer');
var fs = require('fs')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

require('dotenv').config();



initIva("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZmY1Yzk5MmU2ODJjMTAwMjkzYzcyZjMiLCJjcmVhdGVkQXQiOjE2MDk5NDYwMzgwNjAsImlhdCI6MTYwOTk0NjAzOH0.xOhHqgwkDLjA4FXF4CD3Rf4O-tvSMYizc1-aHJdLyrs")
app.use(morgan('dev'));

app.use(cors());
app.use(upload());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static(__dirname + "converted"))


app.post("/recive", (req, res) => {
    const file = req.files.files;
    const fileName = file.name.replace(/ /g, "");
    const pdf = fileName.replace(".docx", ".pdf");
    const path = __dirname + "/" + pdf;
    var oldPath = path;
    var newPath = __dirname + "/converted/" + pdf;
    console.log(newPath)
    file.mv('./upload/' + fileName, (err) => {
        if (err) {
            console.log("error");
        } else {
            const filePath = __dirname + "/upload/" + fileName;
            docxToPdfFromPath(filePath)
                .then((pdfFile) => {
                    writeFileSync(basename(filePath).replace(".docx", ".pdf"), pdfFile);


                    fs.rename(oldPath, newPath, function(err) {
                        if (err) {
                            console.log("premjestanje pdf nije uspjelo")
                        } else {
                            console.log('uspjesno premjesten fajl')
                        }
                    })

                }).then(() => {
                    console.log("then")
                    res.send(pdf)

                })
                .catch((err) => {
                    console.log("greska")
                });
            /* var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'mladenkandic1802@gmail.com',
                    pass: process.env.PASSWORD
                }
            });

            var mailOptions = {
                 from: 'mladenkandic1802@gmail.com',
                 to: 'mladenkandic1802@gmail.com',
                 subject: 'Sending Email using Node.js',
                 attachments: [{
                     path
                 }]
             };

             transporter.sendMail(mailOptions, function(error, info) {
                 if (error) {
                     console.log(error);
                 } else {
                     console.log('Email sent: ' + info.response);
                 }
             });*/
        }
        console.log("File uploaded successfully");



    })



    res.set('Access-Control-Allow-Origin', '*');
})

app.get("/about", (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.send("About Page");
})



app.listen(3001, () => {
    console.log("Server is running on port 3001")
});