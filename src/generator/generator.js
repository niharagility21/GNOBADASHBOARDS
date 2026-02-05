/**
 * BA Dashboard Generator
 * Generates HTML dashboards from parsed BA summary data
 */

const fs = require('fs');
const path = require('path');
const { parseDocument } = require('./parser');

/**
 * Load configuration from config file
 * @returns {Object} Configuration object
 */
function loadConfig() {
    const configPath = path.join(__dirname, '../../config/template-config.json');
    const configData = fs.readFileSync(configPath, 'utf8');
    return JSON.parse(configData);
}

/**
 * Load HTML template
 * @param {string} templatePath - Path to template file
 * @returns {string} Template HTML content
 */
function loadTemplate(templatePath) {
    const fullPath = path.join(__dirname, '../..', templatePath);
    return fs.readFileSync(fullPath, 'utf8');
}

/**
 * Replace placeholders in template with actual data
 * @param {string} template - Template HTML string
 * @param {Object} data - Data object with values to replace
 * @returns {string} Processed HTML string
 */
function replacePlaceholders(template, data) {
    let html = template;

    // Replace all placeholders with format {{PLACEHOLDER}}
    Object.keys(data).forEach(key => {
        const placeholder = `{{${key}}}`;
        const value = data[key] || '';
        html = html.replace(new RegExp(placeholder, 'g'), value);
    });

    return html;
}

/**
 * Generate dashboard HTML from parsed data
 * @param {Object} parsedData - Parsed data from BA summary
 * @param {Object} config - Configuration object
 * @returns {string} Generated HTML content
 */
function generateDashboard(parsedData, config) {
    // Load template
    const template = loadTemplate(config.templatePath);

    // Prepare data for replacement
    const templateData = {
        // Company and analyst info
        COMPANY_NAME: parsedData.companyName || config.defaultValues.COMPANY_NAME,
        COMPANY_NAME_UPPER: (parsedData.companyName || config.defaultValues.COMPANY_NAME).toUpperCase().split(' ')[0],
        COMPANY_SUFFIX: (parsedData.companyName || config.defaultValues.COMPANY_NAME).toUpperCase().split(' ')[1] || 'BRANDS',
        ANALYST_NAME: parsedData.analystName || config.defaultValues.ANALYST_NAME,
        ANNUAL_REVENUE: parsedData.annualRevenue || config.defaultValues.ANNUAL_REVENUE,
        REPORT_DATE: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) + ' Audit Data',

        // Agency data
        AGENCY_SCORE: parsedData.agencyScore || config.defaultValues.AGENCY_SCORE,
        AGENCY_COST: parsedData.agencyCost || config.defaultValues.AGENCY_COST,

        // Metrics
        METRIC_1_LABEL: parsedData.metrics?.metric1?.label || 'Metric 1',
        METRIC_1_VALUE: parsedData.metrics?.metric1?.value || '0',
        METRIC_1_BADGE: parsedData.metrics?.metric1?.badge || 'Tag',

        METRIC_2_LABEL: parsedData.metrics?.metric2?.label || 'Metric 2',
        METRIC_2_VALUE: parsedData.metrics?.metric2?.value || '0',
        METRIC_2_SUFFIX: parsedData.metrics?.metric2?.suffix || '',
        METRIC_2_BADGE: parsedData.metrics?.metric2?.badge || 'Tag',

        METRIC_3_LABEL: parsedData.metrics?.metric3?.label || 'Metric 3',
        METRIC_3_VALUE: parsedData.metrics?.metric3?.value || '0',
        METRIC_3_BADGE: parsedData.metrics?.metric3?.badge || 'Tag',

        METRIC_4_LABEL: parsedData.metrics?.metric4?.label || 'Metric 4',
        METRIC_4_VALUE: parsedData.metrics?.metric4?.value || '0',
        METRIC_4_BADGE: parsedData.metrics?.metric4?.badge || 'Tag',

        // Content sections
        AD_STACK_CONTENT: parsedData.adStackData || '<p>No data available</p>',
        USA_CONTENT: parsedData.marketData?.usa || '<p>No data available</p>',
        UK_CONTENT: parsedData.marketData?.uk || '<p>No data available</p>',
        GERMANY_CONTENT: parsedData.marketData?.germany || '<p>No data available</p>',
        FINANCIAL_CONTENT: parsedData.financialData || '<p>No data available</p>',
        ROADMAP_CONTENT: parsedData.roadmapData || '<p>No data available</p>',

        // Chart data (as JSON string)
        CHART_DATA_JSON: parsedData.chartData ? JSON.stringify(parsedData.chartData) : 'null'
    };

    // Replace placeholders
    const html = replacePlaceholders(template, templateData);

    return html;
}

/**
 * Save generated HTML to file
 * @param {string} html - HTML content to save
 * @param {string} outputPath - Output file path
 */
function saveHTML(html, outputPath) {
    const fullPath = path.join(__dirname, '../..', outputPath);
    const dir = path.dirname(fullPath);

    // Create directory if it doesn't exist
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    fs.writeFileSync(fullPath, html, 'utf8');
    console.log(`✓ Dashboard generated successfully: ${outputPath}`);
}

/**
 * Main generation function
 * @param {string} inputFile - Path to input BA summary file (PDF/DOCX)
 * @param {string} outputName - Optional output filename (without extension)
 */
async function generate(inputFile, outputName = null) {
    try {
        console.log('Starting dashboard generation...');
        console.log(`Input file: ${inputFile}`);

        // Load configuration
        const config = loadConfig();

        // Parse the input document
        console.log('Parsing document...');
        const parsedData = await parseDocument(inputFile);

        // Generate HTML
        console.log('Generating dashboard...');
        const html = generateDashboard(parsedData, config);

        // Determine output filename
        const baseName = outputName || path.basename(inputFile, path.extname(inputFile));
        const outputFileName = `${baseName.toLowerCase().replace(/\s+/g, '-')}.html`;
        const outputPath = path.join(config.outputPath, outputFileName);

        // Save HTML
        saveHTML(html, outputPath);

        console.log('Dashboard generation completed!');
        return outputPath;

    } catch (error) {
        console.error('Error generating dashboard:', error);
        throw error;
    }
}

/**
 * CLI interface
 */
if (require.main === module) {
    const args = process.argv.slice(2);

    if (args.length === 0) {
        console.log(`
BA Dashboard Generator

Usage:
  node generator.js <input-file> [output-name]

Arguments:
  input-file    Path to BA summary document (PDF or DOCX)
  output-name   Optional output filename (without extension)

Examples:
  node generator.js uploads/company-summary.pdf
  node generator.js uploads/company-summary.pdf custom-name
        `);
        process.exit(0);
    }

    const inputFile = args[0];
    const outputName = args[1];

    generate(inputFile, outputName)
        .then(() => process.exit(0))
        .catch(err => {
            console.error('Fatal error:', err);
            process.exit(1);
        });
}

module.exports = {
    generate,
    generateDashboard,
    loadConfig,
    loadTemplate,
    replacePlaceholders
};
