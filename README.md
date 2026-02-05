# BA Dashboards - Automated Business Analytics Dashboard Generator

A powerful automation system that transforms Business Analysis summary documents (PDF/DOCX) into beautiful, interactive HTML dashboards with modern UI and visualizations.

## Overview

This project automates the generation of professional Business Analytics dashboards from uploaded summary documents. It features a modern glassmorphism design, dark theme, interactive charts, and multi-page navigation.

## Features

- **Automated Dashboard Generation**: Upload BA summary documents and automatically generate HTML dashboards
- **Modern UI**: Glassmorphism design with dark theme and smooth animations
- **Interactive Visualizations**: Chart.js powered graphs and data visualizations
- **Multi-Page Navigation**: Executive Summary, Ad Stack, Market Deep-Dives, Financial Recovery, and Growth Roadmap
- **Responsive Design**: Built with Tailwind CSS for optimal viewing on all devices
- **Template-Based System**: Easily customizable templates for consistent branding
- **Server-Ready**: Designed to be hosted on your server for client access

## Project Structure

```
GNOBADASHBOARDS/
├── src/
│   ├── assets/
│   │   ├── css/              # Stylesheets
│   │   │   └── dashboard.css
│   │   ├── js/               # JavaScript modules
│   │   │   ├── navigation.js
│   │   │   └── charts.js
│   │   └── images/           # Images, logos, icons
│   ├── templates/            # HTML templates
│   │   └── dashboard-template.html
│   └── generator/            # Generation scripts
│       ├── parser.js         # PDF/DOCX parser
│       └── generator.js      # HTML generator
├── uploads/                  # Uploaded BA summaries (PDF/DOCX)
├── generated/                # Generated HTML dashboards
├── docs/                     # Documentation
├── config/                   # Configuration files
│   └── template-config.json
├── .gitignore
├── package.json
└── README.md
```

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Styling**: Tailwind CSS (CDN)
- **Charts**: Chart.js
- **Typography**: Google Fonts (Plus Jakarta Sans)
- **Backend** (To be implemented): Node.js / Python
- **Document Parsing** (To be implemented): pdf-parse, mammoth, or similar libraries

## Getting Started

### Prerequisites

- Node.js (v14 or higher) OR Python (v3.8 or higher)
- npm or yarn (for Node.js)
- Basic understanding of web development

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd GNOBADASHBOARDS
   ```

2. Install dependencies (once generator is implemented):
   ```bash
   npm install
   # or
   pip install -r requirements.txt
   ```

### Usage

#### Viewing Existing Dashboards

1. Navigate to the `generated/` folder
2. Open any `.html` file in a web browser
3. Example: `generated/supersonic-brands.html`

#### Generating New Dashboards (To be implemented)

1. Place your BA summary document (PDF or DOCX) in the `uploads/` folder
2. Run the generator script:
   ```bash
   npm run generate <filename>
   # or
   python src/generator/generate.py <filename>
   ```
3. Find the generated HTML in the `generated/` folder

## Template System

The dashboard template (`src/templates/dashboard-template.html`) uses placeholder variables that are replaced during generation:

### Key Placeholders

- `{{COMPANY_NAME}}` - Client company name
- `{{ANALYST_NAME}}` - Business analyst name
- `{{ANNUAL_REVENUE}}` - Annual revenue figure
- `{{METRIC_X_LABEL}}` - KPI metric labels
- `{{METRIC_X_VALUE}}` - KPI metric values
- `{{CHART_DATA_JSON}}` - Dynamic chart data (JSON)
- `{{XXX_CONTENT}}` - Page-specific content sections

## Customization

### Styling

Edit `src/assets/css/dashboard.css` to customize:
- Colors and theme
- Glass card effects
- Animations
- Typography

### Charts

Modify `src/assets/js/charts.js` to:
- Change chart types
- Update default data
- Adjust chart styling

### Navigation

Update `src/assets/js/navigation.js` to:
- Add/remove pages
- Modify page labels
- Change navigation behavior

## Roadmap

- [ ] Implement PDF parser for extracting data
- [ ] Implement DOCX parser for extracting data
- [ ] Build automated dashboard generator
- [ ] Create web interface for uploading documents
- [ ] Add authentication system
- [ ] Implement server hosting setup
- [ ] Add PDF export functionality
- [ ] Create dashboard analytics tracking
- [ ] Build client management system
- [ ] Add multi-language support

## Development

### Adding a New Page

1. Add navigation button in the template
2. Create page content section with unique ID
3. Add page label to `navigation.js`
4. Style the page content

### Creating Custom Sections

Follow the existing pattern:
```html
<div id="custom-page" class="page-content">
    <div class="glass-card p-10 rounded-3xl">
        <!-- Your content here -->
    </div>
</div>
```

## Sample Dashboards

- **Supersonic Brands**: `generated/supersonic-brands.html`
  - E-commerce marketplace optimization
  - PPC efficiency analysis
  - Multi-market breakdown (USA, UK, Germany)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

[Add your license here]

## Support

For issues, questions, or contributions, please contact the development team.

## Acknowledgments

- Built with modern web technologies
- Designed for professional business analytics presentations
- Optimized for client-facing deliverables
