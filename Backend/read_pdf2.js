const fs = require('fs');
const pdfModule = require('pdf-parse');

const pdf = typeof pdfModule === 'function' ? pdfModule : (pdfModule.default || pdfModule);

let dataBuffer = fs.readFileSync('D:/app_ticket/Frontend/src/assets/Presupuesto_Sergio_Martin_Garcia.pdf');

pdf(dataBuffer).then(function (data) {
    console.log("PDF TEXT:\n", data.text);
}).catch(err => {
    console.error("Error reading PDF:", err);
});
