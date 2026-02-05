/**
 * Navigation Engine for BA Dashboard
 * Handles page switching and sidebar interactions
 */

/**
 * Switch between different dashboard pages
 * @param {string} pageId - ID of the page to display
 * @param {HTMLElement} btn - Button element that was clicked
 */
function switchPage(pageId, btn) {
    // Toggle Pages
    document.querySelectorAll('.page-content').forEach(p => p.classList.remove('active'));
    document.getElementById(pageId).classList.add('active');

    // Toggle Sidebar Styling
    document.querySelectorAll('.sidebar-item').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    // Update Header Title
    const labels = {
        'summary': 'Executive Summary',
        'adstack': 'Ad Stack Efficiency',
        'usa': 'USA Deep-Dive',
        'uk': 'UK Deep-Dive',
        'germany': 'Germany Deep-Dive',
        'financial': 'Financial Recovery',
        'roadmap': 'Growth Roadmap'
    };
    document.getElementById('page-title').innerText = labels[pageId];
}
