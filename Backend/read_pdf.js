const fs = require('fs');
const pdf = require('pdf-parse');

let dataBuffer = fs.readFileSync('D:/app_ticket/Frontend/src/assets/Presupuesto_Sergio_Martin_Garcia.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(err => {
    console.error("Error reading PDF:", err);
});
