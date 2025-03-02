(() => {
  const userProfile = document.querySelector('.user-profile');
  const userProfileForm = userProfile.querySelector('form');
  const userProfileLSName = 'userProfileFormData';
  let userProfileLocalFormData = {};

  function getFormData() {
    const formElements = userProfileForm.elements;
    let isValid = true; // To track form validity

    for (const element of formElements) {
      const elementName = element.getAttribute('name');
      if (elementName) {
        const value = element.value;

        // Validate email field
        if (elementName === 'email') {
          const emailField = document.getElementById('email');
          const errorField = document.getElementById('erroEmail');
          if (!validateEmail(value)) {
            emailField.classList.add('error'); // Add error class
            errorField.style.display = 'block'; // Show error message
            isValid = false; // Mark form as invalid
          } else {
            emailField.classList.remove('error'); // Remove error class
            errorField.style.display = 'none'; // Hide error message
          }
        }

        // Store valid field data
        userProfileLocalFormData[elementName] = value;
      }
    }

    return isValid; // Return form validity
  }

  function validateEmail(email) {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  }

  window.addEventListener('load', () => {
    userProfileForm.addEventListener('submit', (event) => {
      event.preventDefault(); // Prevent default form submission
      const isFormValid = getFormData(); // Get and validate form data
      if (isFormValid) {
        localStorage.setItem(userProfileLSName, JSON.stringify(userProfileLocalFormData));
        alert('Form submitted successfully!');
      } else {
        alert('Please fix the errors before submitting.');
      }
    });

    userProfileForm.addEventListener('reset', () => {
      userProfileLocalFormData = {};
      localStorage.removeItem(userProfileLSName);

      // Reset email validation styles
      const emailField = document.getElementById('email');
      const errorField = document.getElementById('erroEmail');
      emailField.classList.remove('error'); // Remove error class
      errorField.style.display = 'none'; // Hide error message
    });
  });
})();
