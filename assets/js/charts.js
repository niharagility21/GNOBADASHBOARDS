/**
 * Chart.js Configuration and Initialization
 * Handles all dashboard charts and visualizations
 */

/**
 * Initialize all charts on page load
 * @param {Object} chartData - Data object containing chart configurations
 */
function initializeCharts(chartData = null) {
    // Common chart options
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { display: false } },
        scales: {
            x: {
                grid: { display: false },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Plus Jakarta Sans', size: 10 }
                }
            },
            y: {
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: {
                    color: '#64748b',
                    font: { family: 'Plus Jakarta Sans', size: 10 }
                }
            }
        }
    };

    // Default data (can be overridden by chartData parameter)
    const defaultBarData = {
        labels: ['USA', 'UK', 'Germany'],
        datasets: [
            { label: 'PPC Reliance', data: [76, 62, 55], backgroundColor: '#3b82f6', borderRadius: 6 },
            { label: 'Spend Dilution', data: [89, 62, 68], backgroundColor: '#ef4444', borderRadius: 6 }
        ]
    };

    const defaultLineData = {
        labels: ['Wk 1', 'Wk 4', 'Wk 8', 'Wk 12'],
        datasets: [{
            data: [24, 38, 55, 82],
            borderColor: '#10b981',
            borderWidth: 4,
            tension: 0.4,
            fill: true,
            backgroundColor: 'rgba(16, 185, 129, 0.05)'
        }]
    };

    // Bar Chart: PPC Efficiency
    const barChartElement = document.getElementById('barChart');
    if (barChartElement) {
        new Chart(barChartElement, {
            type: 'bar',
            data: chartData?.barChart || defaultBarData,
            options: commonOptions
        });
    }

    // Line Chart: Organic Growth
    const lineChartElement = document.getElementById('lineChart');
    if (lineChartElement) {
        new Chart(lineChartElement, {
            type: 'line',
            data: chartData?.lineChart || defaultLineData,
            options: commonOptions
        });
    }
}

// Initialize charts when DOM is ready
window.addEventListener('DOMContentLoaded', () => {
    initializeCharts();
});
