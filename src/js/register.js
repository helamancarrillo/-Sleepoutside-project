document.addEventListener('DOMContentLoaded', function () {
    const modal = document.getElementById('register-modal');
    const closeModal = document.querySelector('.close');
    const registerNow = document.getElementById('register-now');
  
    // Check if the user is visiting for the first time
    if (!localStorage.getItem('hasVisited')) {
      // Show the modal
      modal.style.display = 'block';
      localStorage.setItem('hasVisited', 'true'); // Mark the user as having visited
    }
  
    // Close modal when user clicks on the close button
    closeModal.addEventListener('click', function () {
      modal.style.display = 'none';
    });
  
    // Close modal if user clicks on "Register Now"
    registerNow.addEventListener('click', function () {
      modal.style.display = 'none';
      // Redirect to registration page (optional)
      window.location.href = 'register.html'; // Replace with your registration page URL
    });
  
    // Optional: Close the modal if user clicks outside of the modal content
    window.onclick = function (event) {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };
  });