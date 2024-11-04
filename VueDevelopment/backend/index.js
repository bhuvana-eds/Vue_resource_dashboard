const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require('path');
const axios = require('axios');
const https = require('https');
const FormData = require('form-data');
const multer = require('multer'); // Add multer for file uploads

const app = express();
const port = 8081;

app.use(cors());
app.use(express.json());

// Setup multer for file upload
const upload = multer({ dest: 'D://Devika/widgetdownloadedfiles' }); // Adjust the path as needed

app.get("/status", (req, res) => {
    res.json(books);
});

// app.post('/uploadWatermarked', upload.single('file'), (req, res) => {
//     const file = req.file;
//     if (file) {
//         const fullFilePath = path.join(file.destination, file.originalname);
//         fs.renameSync(file.path, fullFilePath);
//         res.status(200).send('File received and saved successfully');
//     } else {
//         res.status(400).send('No file received');
//     }
// });

app.post("/download", async (req, res) => {
    const fileUrl = req.body.ticketurl; // URL is sent in the body of a POST request
    const fileName = req.body.filename;
    const filePath = path.resolve("D://WatermarkedFiles");

    if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath);
        console.log(`Folder created at: ${filePath}`);
    } else {
        console.log("Folder already exists");
    }

    const targetUrl = "https://edstdev.com:8443/ApplyWatermark/File/Apply";
    // const targetUrl = "https://localhost:8085/ApplyWatermark/File/Apply";

    // const targetUrl = "http://192.168.30.182:8085/WaterMark/File/Apply";

    try {
        // Ensure the directory exists
        fs.mkdirSync(filePath, { recursive: true });

        // Make a request to the file URL
        const response = await axios({
            url: fileUrl,
            method: 'GET',
            responseType: 'arraybuffer', // Set responseType to arraybuffer for binary data
        });

        // Save the file with .pdf extension
        const fullFilePath = path.join(filePath, fileName + '.pdf');
        fs.writeFileSync(fullFilePath, response.data); // Write the buffer directly to the file

        // Read the downloaded file
        const fileStream = fs.createReadStream(fullFilePath);

        // Create a FormData instance to send the file
        const form = new FormData();
        form.append('file', fileStream, fileName + '.pdf');

        // Send the file to the target server
        const resp = await axios.post(targetUrl, form, {
            headers: {
                ...form.getHeaders()
            },
            responseType: 'stream' // Important to handle the file stream
        });

        // Delete the original file after it has been sent
        fs.unlinkSync(fullFilePath);

        // Save the response file
        const savedFilePath = path.join(filePath, fileName + "_watermarked.pdf");
        const writer = fs.createWriteStream(savedFilePath);

        resp.data.pipe(writer);

        writer.on('finish', () => {
            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=${fileName}_watermarked.pdf`);

            // Send the watermarked file to the client
            res.sendFile(savedFilePath, (err) => {
                if (err) {
                    res.status(500).send('Error sending the file');
                } else {
                    // Delete the watermarked file after it has been sent
                    fs.unlink(savedFilePath, (err) => {
                        if (err) {
                            console.error('Error deleting the watermarked file', err);
                        } else {
                            console.log('Watermarked file deleted successfully');
                        }
                    });
                }
            });
        });

        writer.on('error', (err) => {
            res.status(500).send('Error saving the file');
        });

    } catch (error) {
        console.error('Error downloading or sending the file', error);
        res.status(500).send('Error downloading or sending the file');
    }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});
