const express = require('express')
const app = express()
const PORT = 3000
const multer = require('multer')
const path = require('path')

// Multer configuration for storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory for uploads
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname); // Use the original file name
    }
});

const upload = multer({ storage: storage });

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Serve uploaded files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Handle file uploads
app.post('/profileUpload', upload.array('profile-files', 12),(req, res)=> {
    let response = '<a href="/">Home</a><br>';
    response += "Files uploaded successfully.<br>";
    req.files.forEach(file => {
        response += `<img src="/uploads/${file.filename}" style="width:200px;" /><br>`;
    });
    res.send(response);
});

app.listen(PORT, ()=>{
    console.log(`server is running on port ${PORT}`);
    
})