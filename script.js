document.addEventListener('DOMContentLoaded', () => {
    const steps = document.querySelectorAll('.step-content');
    const navLinks = document.querySelectorAll('#step-navigation a');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressFill = document.getElementById('progress-fill');
    const progressText = document.getElementById('progress-text');
    
    let currentStep = 0; // Empieza en el paso de Introducción (0)

    const totalSteps = steps.length;

    function updateManual() {
        // 1. Ocultar todos los pasos y desmarcar enlaces
        steps.forEach(step => step.classList.remove('active'));
        navLinks.forEach(link => link.classList.remove('active'));

        // 2. Mostrar el paso actual
        const activeStep = document.getElementById(`step-${currentStep}`);
        activeStep.classList.add('active');

        // 3. Marcar el enlace de navegación activo
        const activeNavLink = document.querySelector(`#step-navigation a[data-step="${currentStep}"]`);
        if (activeNavLink) {
            activeNavLink.classList.add('active');
        }

        // 4. Actualizar botones de navegación
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === totalSteps - 1;

        // 5. Actualizar barra de progreso
        const progressPercentage = Math.round((currentStep / (totalSteps - 1)) * 100);
        progressFill.style.width = `${progressPercentage}%`;
        progressText.textContent = `Progreso: ${progressPercentage}%`;
    }

    // Manejadores de Eventos
    nextBtn.addEventListener('click', () => {
        if (currentStep < totalSteps - 1) {
            currentStep++;
            updateManual();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 0) {
            currentStep--;
            updateManual();
        }
    });

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const stepIndex = parseInt(link.getAttribute('data-step'));
            currentStep = stepIndex;
            updateManual();
        });
    });

    // Inicializar el manual al cargar
    updateManual();
});