// script.js
// Control simple de pasos, navegación y barra de progreso

document.addEventListener("DOMContentLoaded", () => {
    const steps = Array.from(document.querySelectorAll(".step-content"));
    const navLinks = Array.from(document.querySelectorAll("#step-navigation a"));
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
    const progressFill = document.getElementById("progress-fill");
    const progressText = document.getElementById("progress-text");

    let currentStep = 0;
    const totalSteps = steps.length; // 5

    function updateUI() {
        // Mostrar / ocultar bloques
        steps.forEach((step, index) => {
            step.classList.toggle("active", index === currentStep);
        });

        // Activar item del menú
        navLinks.forEach((link) => {
            const stepIndex = Number(link.dataset.step);
            link.classList.toggle("active", stepIndex === currentStep);
        });

        // Actualizar botones
        prevBtn.disabled = currentStep === 0;
        nextBtn.disabled = currentStep === totalSteps - 1;

        // Actualizar barra de progreso
        const percentage = Math.round((currentStep / (totalSteps - 1)) * 100);
        progressFill.style.width = percentage + "%";
        progressText.textContent = `Progreso: ${percentage}%`;
    }

    function goToStep(index) {
        if (index < 0 || index >= totalSteps) return;
        currentStep = index;
        updateUI();
        // scroll suave al inicio del contenido
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }

    // Eventos de botones
    prevBtn.addEventListener("click", () => {
        goToStep(currentStep - 1);
    });

    nextBtn.addEventListener("click", () => {
        goToStep(currentStep + 1);
    });

    // Eventos en el menú lateral
    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const stepIndex = Number(link.dataset.step);
            goToStep(stepIndex);
        });
    });

    // Inicializar
    updateUI();
});
