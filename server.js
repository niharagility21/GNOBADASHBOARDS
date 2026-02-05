/**
 * Simple Express Server for BA Dashboards
 * Serves generated dashboards and provides upload endpoint
 */

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { generate } = require('./src/generator/generator');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir, { recursive: true });
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname);
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: process.env.MAX_FILE_SIZE || 10 * 1024 * 1024 // 10MB default
    },
    fileFilter: (req, file, cb) => {
        const ext = path.extname(file.originalname).toLowerCase();
        const allowedExts = (process.env.ALLOWED_EXTENSIONS || '.pdf,.docx').split(',');

        if (allowedExts.includes(ext)) {
            cb(null, true);
        } else {
            cb(new Error(`File type not allowed. Allowed types: ${allowedExts.join(', ')}`));
        }
    }
});

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Serve generated dashboards
app.use('/dashboards', express.static(path.join(__dirname, 'generated')));

// Serve assets for generated dashboards
app.use('/assets', express.static(path.join(__dirname, 'src/assets')));

// Home page
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>BA Dashboard Generator</title>
            <style>
                body {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
                    max-width: 800px;
                    margin: 50px auto;
                    padding: 20px;
                    background: #f5f5f5;
                }
                .container {
                    background: white;
                    padding: 40px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }
                h1 { color: #333; }
                .upload-form {
                    margin: 30px 0;
                    padding: 20px;
                    background: #f9f9f9;
                    border-radius: 5px;
                }
                input[type="file"] {
                    margin: 10px 0;
                }
                button {
                    background: #3b82f6;
                    color: white;
                    padding: 10px 20px;
                    border: none;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 16px;
                }
                button:hover {
                    background: #2563eb;
                }
                .dashboards {
                    margin-top: 30px;
                }
                .dashboard-link {
                    display: block;
                    padding: 15px;
                    margin: 10px 0;
                    background: #f0f9ff;
                    border-left: 4px solid #3b82f6;
                    text-decoration: none;
                    color: #1e40af;
                    border-radius: 4px;
                }
                .dashboard-link:hover {
                    background: #dbeafe;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <h1>📊 BA Dashboard Generator</h1>
                <p>Upload a Business Analysis summary document (PDF or DOCX) to generate an interactive dashboard.</p>

                <div class="upload-form">
                    <h3>Upload Document</h3>
                    <form action="/api/generate" method="POST" enctype="multipart/form-data">
                        <input type="file" name="document" accept=".pdf,.docx" required>
                        <br>
                        <button type="submit">Generate Dashboard</button>
                    </form>
                </div>

                <div class="dashboards">
                    <h3>Available Dashboards</h3>
                    <a href="/dashboards/supersonic-brands.html" class="dashboard-link">
                        Supersonic Brands Dashboard
                    </a>
                </div>
            </div>
        </body>
        </html>
    `);
});

// API endpoint to generate dashboard
app.post('/api/generate', upload.single('document'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log('Received file:', req.file.filename);

        // Generate dashboard
        const outputPath = await generate(req.file.path);

        // Return success response
        const dashboardUrl = `/dashboards/${path.basename(outputPath)}`;

        res.json({
            success: true,
            message: 'Dashboard generated successfully',
            dashboardUrl: dashboardUrl,
            fileName: path.basename(outputPath)
        });

    } catch (error) {
        console.error('Error generating dashboard:', error);
        res.status(500).json({
            error: 'Failed to generate dashboard',
            message: error.message
        });
    }
});

// List all generated dashboards
app.get('/api/dashboards', (req, res) => {
    const generatedDir = path.join(__dirname, 'generated');

    fs.readdir(generatedDir, (err, files) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read dashboards' });
        }

        const htmlFiles = files.filter(f => f.endsWith('.html'));

        res.json({
            dashboards: htmlFiles.map(file => ({
                name: file,
                url: `/dashboards/${file}`
            }))
        });
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║                                                        ║
║   BA Dashboard Generator Server                       ║
║                                                        ║
║   Server running at: http://localhost:${PORT}         ║
║                                                        ║
║   Endpoints:                                           ║
║   - GET  /                  Home page                  ║
║   - POST /api/generate      Upload & generate          ║
║   - GET  /api/dashboards    List dashboards            ║
║   - GET  /dashboards/*      View dashboards            ║
║                                                        ║
╚════════════════════════════════════════════════════════╝
    `);
});

module.exports = app;
