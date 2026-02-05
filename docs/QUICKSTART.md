# Quick Start Guide

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Create environment file** (optional):
   ```bash
   cp .env.example .env
   # Edit .env with your settings
   ```

## Usage

### Method 1: CLI Generator (Node.js)

Generate a dashboard from a BA summary document:

```bash
node src/generator/generator.js uploads/your-document.pdf
```

Or with a custom output name:

```bash
node src/generator/generator.js uploads/your-document.pdf custom-name
```

The generated dashboard will be saved in the `generated/` folder.

### Method 2: Web Server

1. **Start the server**:
   ```bash
   npm start
   # or
   node server.js
   ```

2. **Open your browser**:
   - Navigate to `http://localhost:3000`

3. **Upload a document**:
   - Use the web interface to upload a PDF or DOCX file
   - The system will automatically generate and display the dashboard

4. **View dashboards**:
   - Access generated dashboards at `http://localhost:3000/dashboards/<filename>.html`

### Method 3: Direct File Viewing

Simply open any `.html` file in the `generated/` folder with your web browser:

```bash
# Example for viewing the sample dashboard
open generated/supersonic-brands.html
# or on Windows
start generated/supersonic-brands.html
```

## Development

### Project Structure

```
GNOBADASHBOARDS/
├── src/
│   ├── assets/          # Frontend assets (CSS, JS)
│   ├── templates/       # HTML templates
│   └── generator/       # Generation logic
│       ├── parser.js    # Document parser
│       └── generator.js # Dashboard generator
├── uploads/             # Upload BA summaries here
├── generated/           # Generated dashboards appear here
└── config/              # Configuration files
```

### Customizing Templates

1. Edit `src/templates/dashboard-template.html` to modify the layout
2. Update `src/assets/css/dashboard.css` for styling changes
3. Modify `config/template-config.json` for default values and settings

### Adding New Sections

1. Add a new page section in the template
2. Update `src/assets/js/navigation.js` with the page label
3. Add the corresponding placeholder to the config
4. Update the parser to extract the relevant data

## Troubleshooting

### Dependencies Not Installing

Make sure you have Node.js v14 or higher:
```bash
node --version
```

### File Upload Fails

Check that:
- File is PDF or DOCX format
- File size is under 10MB (default limit)
- You have write permissions in the `uploads/` folder

### Generated Dashboard Looks Broken

Ensure that:
- The `src/assets/` folder structure is intact
- CSS and JS files are properly linked
- You're viewing the file through the server (for relative paths)

## Next Steps

1. **Test the sample**: Generate a dashboard from the sample documents in `uploads/`
2. **Customize**: Modify the template to match your branding
3. **Enhance parser**: Improve the document parsing logic in `src/generator/parser.js`
4. **Deploy**: Host the server on your production environment

For more details, see the main [README.md](../README.md).
