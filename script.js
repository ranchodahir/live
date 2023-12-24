document.addEventListener("DOMContentLoaded", function () {
    const timerElement = document.getElementById("timer");
    const registerButton = document.getElementById("registerButton");
    const registrationModal = document.getElementById("registrationModal");
    const closeButton = document.querySelectorAll(".close");
    const cancelButton = document.getElementById("cancelButton");
    const resetButton = document.getElementById("resetButton");

    const paymentModal = document.getElementById("paymentModal");
   const paymentForm = document.getElementById("paymentForm");
    const cancelPaymentButton = document.getElementById("cancelPaymentButton");


    // Get the initial timestamp from localStorage
    let initialTimestamp = localStorage.getItem("initialTimestamp");

    // If the initial timestamp is not set, set it now
    if (!initialTimestamp) {
        initialTimestamp = new Date().getTime();
        localStorage.setItem("initialTimestamp", initialTimestamp);
    }

    // Update the timer every second
    setInterval(updateTimer, 1000);

    function updateTimer() {
        const currentTime = new Date().getTime();
        const elapsedMilliseconds = currentTime - initialTimestamp;

        // Calculate remaining time
        const remainingMilliseconds = 3600000 - elapsedMilliseconds;

        // If the timer has reached zero, display "Time's up!"
        if (remainingMilliseconds <= 0) {
            timerElement.textContent = "live video Start soon...";
            registerButton.disabled = false;
			
        } else {
            // Convert remaining milliseconds to minutes and seconds
            const minutes = Math.floor(remainingMilliseconds / 60000);
            const seconds = Math.floor((remainingMilliseconds % 60000) / 1000);

            // Format and display the time
            timerElement.textContent = `${String(minutes).padStart(2, '0')} : ${String(seconds).padStart(2, '0')}`;
        }
		
		
		/**if (--timer < 0) {
            clearInterval(countdown); // Clear the interval when the timer reaches 0
            startTimer(duration); // Restart the timer
        }*/
	
    }

    // Event listener for the Register button
    registerButton.addEventListener("click", function () {
        registrationModal.style.display = "block";
    });

    // Event listeners for the close buttons
    closeButton.forEach(function (button) {
        button.addEventListener("click", function () {
            registrationModal.style.display = "none";
            paymentModal.style.display = "none";
        });
    });

    // Event listener for the Cancel button in the registration form
    cancelButton.addEventListener("click", function () {
        registrationModal.style.display = "none";
    });

    // Event listener for the Reset button in the registration form
    resetButton.addEventListener("click", function () {
        document.getElementById("registrationForm").reset();
    });

    // Event listener for the form submission in the registration form
    document.getElementById("registrationForm").addEventListener("submit", function (event) {
        event.preventDefault();
        registrationModal.style.display = "none";
        paymentModal.style.display = "block";
    });

    // Event listener for the Cancel button in the payment form
   cancelPaymentButton.addEventListener("click", function () {
        paymentModal.style.display = "none";
    });

    // Initial update
    updateTimer();
});
