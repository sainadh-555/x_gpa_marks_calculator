let gradesChartInstance = null;

function handleLoginKeyPress(e) {
    if (e.key === 'Enter') {
        checkLogin();
    }
}

function checkLogin() {
    const regInput = document.getElementById('reg_input').value.trim().toLowerCase();
    const errorMsg = document.getElementById('login_error');

    if (regInput.startsWith('251fa')) {
        errorMsg.style.display = 'none';

        // Hide login, show calculator with animation
        const loginSec = document.getElementById('login-section');
        const calcSec = document.getElementById('calculator-section');

        loginSec.style.opacity = '0';
        setTimeout(() => {
            loginSec.style.display = 'none';
            calcSec.style.display = 'block';
            calcSec.style.animation = 'slideUpFade 1s forwards';
        }, 300);
    } else {
        errorMsg.style.display = 'block';
        // Shake animation for error
        const box = document.querySelector('.login-box');
        box.style.transform = 'translateX(-10px)';
        setTimeout(() => box.style.transform = 'translateX(10px)', 100);
        setTimeout(() => box.style.transform = 'translateX(-10px)', 200);
        setTimeout(() => box.style.transform = 'translateX(0)', 300);
    }
}

// Helper function to get float value from input, defaulting to 0.0 if empty
function getVal(id) {
    let val = parseFloat(document.getElementById(id).value);
    return isNaN(val) ? 0.0 : val;
}

function calculateGPA() {
    // PSUP
    let psup_internal = getVal('psup_int');
    let psup_lab = getVal('psup_lab');
    let psup_sem = getVal('psup_sem');

    // TEC
    let tec_internal = getVal('tec_int');
    let tec_lab = getVal('tec_lab');
    let tec_sem = getVal('tec_sem');

    // EP
    let ep_internal = getVal('ep_int');
    let ep_lab = getVal('ep_lab');
    let ep_sem = getVal('ep_sem');

    // EGD
    let egd_internal = getVal('egd_int');
    let egd_lab = getVal('egd_lab');

    // ES
    let es_internal = getVal('es_int');
    let es_lab = getVal('es_lab');

    // CS
    let cs_internal = getVal('cs_int');
    let cs_lab = getVal('cs_lab');

    // CODE
    let code_internal = getVal('code_int');
    let code_sem = getVal('code_sem');

    // Your calculations exactly translated from Python
    let psup_grade = (psup_internal + (psup_lab * (16 / 40)) + (psup_sem * (24 / 60))) / 10;
    let tec_grade = (tec_internal + (tec_lab * (16 / 40)) + (tec_sem * (24 / 60))) / 10;
    let ep_grade = (ep_internal + (ep_lab * (16 / 40)) + (ep_sem * (24 / 60))) / 10;
    let egd_grade = (egd_internal + egd_lab) / 10;
    let es_grade = (es_internal + es_lab) / 10;
    let cs_grade = (cs_internal + cs_lab) / 10;
    let code_grade = (code_internal + (code_sem * 40 / 60)) / 10;

    let final_grade = ((4 * (ep_grade + code_grade)) + (3 * (psup_grade + es_grade + egd_grade)) + (2 * (tec_grade)) + (1 * (cs_grade))) / 20;

    let max_score = 10;
    let percentage = (final_grade / max_score) * 100;

    // Display results, formatting to 2 decimal places for neatness
    document.getElementById('res_psup').innerText = psup_grade.toFixed(2);
    document.getElementById('res_tec').innerText = tec_grade.toFixed(2);
    document.getElementById('res_ep').innerText = ep_grade.toFixed(2);
    document.getElementById('res_egd').innerText = egd_grade.toFixed(2);
    document.getElementById('res_es').innerText = es_grade.toFixed(2);
    document.getElementById('res_cs').innerText = cs_grade.toFixed(2);
    document.getElementById('res_code').innerText = code_grade.toFixed(2);
    document.getElementById('res_final').innerText = final_grade.toFixed(2);
    document.getElementById('res_total').innerText = `${final_grade.toFixed(1)} / ${max_score}`;
    document.getElementById('res_percentage').innerText = `${percentage.toFixed(2)}%`;

    // Show the results section with a nice fade in
    document.getElementById('results-section').style.display = 'block';

    // Draw the chart
    drawChart([psup_grade, tec_grade, ep_grade, egd_grade, es_grade, cs_grade, code_grade]);

    // Scroll down to results smoothly
    document.getElementById('results-section').scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

// Cosmos Glitter Mouse Trail Effect
document.addEventListener('mousemove', function (e) {
    // Only spawn occasionally for performance and aesthetic spacing
    if (Math.random() > 0.3) return;

    const glitter = document.createElement('div');
    glitter.className = 'cosmos-glitter';

    // Add scroll offset so it stays under the cursor when scrolling
    const scrollX = window.scrollX || document.documentElement.scrollLeft;
    const scrollY = window.scrollY || document.documentElement.scrollTop;

    const offsetX = (Math.random() - 0.5) * 30;
    const offsetY = (Math.random() - 0.5) * 30;

    glitter.style.left = `${e.clientX + scrollX + offsetX}px`;
    glitter.style.top = `${e.clientY + scrollY + offsetY}px`;

    // Random cosmos colors
    const colors = ['#8b5cf6', '#ec4899', '#3b82f6', '#ffffff', '#c084fc', '#fbcfe8'];
    glitter.style.color = colors[Math.floor(Math.random() * colors.length)];
    glitter.style.background = glitter.style.color;

    // Random size
    const size = Math.random() * 4 + 2;
    glitter.style.width = `${size}px`;
    glitter.style.height = `${size}px`;

    document.body.appendChild(glitter);

    // Clean up
    setTimeout(() => {
        glitter.remove();
    }, 1000);
});

function downloadPDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Background Color
    doc.setFillColor(248, 250, 252);
    doc.rect(0, 0, 210, 297, 'F');

    // Header Shape
    doc.setFillColor(139, 92, 246);
    doc.rect(0, 0, 210, 40, 'F');

    // Adding Title
    doc.setFont("helvetica", "bold");
    doc.setFontSize(26);
    doc.setTextColor(255, 255, 255);
    doc.text("Academic Performance Report", 105, 22, null, null, "center");

    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(220, 220, 255);
    doc.text("Subject-wise Grades and Final SGPA", 105, 30, null, null, "center");

    // Get table data
    const tableData = [
        ["PSUP", "3 Credits", document.getElementById('res_psup').innerText],
        ["TEC", "2 Credits", document.getElementById('res_tec').innerText],
        ["EP", "4 Credits", document.getElementById('res_ep').innerText],
        ["EGD", "3 Credits", document.getElementById('res_egd').innerText],
        ["ES", "3 Credits", document.getElementById('res_es').innerText],
        ["CS", "1 Credit", document.getElementById('res_cs').innerText],
        ["CODE", "4 Credits", document.getElementById('res_code').innerText],
    ];

    doc.autoTable({
        startY: 55,
        head: [['Subject', 'Credits', 'Calculated Grade']],
        body: tableData,
        theme: 'striped',
        headStyles: {
            fillColor: [59, 130, 246],
            textColor: 255,
            fontStyle: 'bold',
            halign: 'center',
            fontSize: 14
        },
        bodyStyles: {
            halign: 'center',
            fontSize: 12,
            textColor: [50, 50, 50]
        },
        alternateRowStyles: {
            fillColor: [241, 245, 249]
        },
        margin: { left: 25, right: 25 }
    });

    const finalGrade = document.getElementById('res_final').innerText;
    const finalPercentage = document.getElementById('res_percentage').innerText;

    // Add final score section in a nice box
    const finalY = doc.lastAutoTable.finalY + 20;

    doc.setDrawColor(16, 185, 129); // emerald-500
    doc.setFillColor(236, 253, 245); // emerald-50
    doc.setLineWidth(1);
    doc.roundedRect(45, finalY, 120, 30, 5, 5, 'FD');

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text("Weighted SGPA Score", 75, finalY + 12, null, null, "center");

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(16, 185, 129);
    doc.text(finalGrade, 75, finalY + 22, null, null, "center");

    doc.setFontSize(16);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(50, 50, 50);
    doc.text("Overall Percentage", 145, finalY + 12, null, null, "center");

    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(59, 130, 246);
    doc.text(finalPercentage, 145, finalY + 22, null, null, "center");

    // Add footer
    const date = new Date().toLocaleDateString();
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.setFont("helvetica", "italic");
    doc.text(`Generated by Dynamic GPA Calculator on ${date}`, 105, 285, null, null, "center");

    // Save the PDF
    doc.save(`GPA_Result.pdf`);
}

function drawChart(gradesData) {
    const ctx = document.getElementById('gradesChart').getContext('2d');

    if (gradesChartInstance) {
        gradesChartInstance.destroy();
    }

    gradesChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['PSUP', 'TEC', 'EP', 'EGD', 'ES', 'CS', 'CODE'],
            datasets: [{
                label: 'Calculated Grade',
                data: gradesData,
                backgroundColor: [
                    'rgba(139, 92, 246, 0.7)',
                    'rgba(236, 72, 153, 0.7)',
                    'rgba(59, 130, 246, 0.7)',
                    'rgba(16, 185, 129, 0.7)',
                    'rgba(245, 158, 11, 0.7)',
                    'rgba(14, 165, 233, 0.7)',
                    'rgba(99, 102, 241, 0.7)'
                ],
                borderColor: [
                    'rgba(139, 92, 246, 1)',
                    'rgba(236, 72, 153, 1)',
                    'rgba(59, 130, 246, 1)',
                    'rgba(16, 185, 129, 1)',
                    'rgba(245, 158, 11, 1)',
                    'rgba(14, 165, 233, 1)',
                    'rgba(99, 102, 241, 1)'
                ],
                borderWidth: 2,
                borderRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true
                }
            },
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    });
}
