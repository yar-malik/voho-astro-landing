document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('callForm');

  if (form) {
    form.addEventListener('submit', async (event) => {
      event.preventDefault();

      // Gather form data
      const phone = document.getElementById('phone').value.trim();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const language = document.getElementById('language').value;

      if (!phone || !name || !email) {
        alert('Please fill in all required fields.');
        return;
      }

      try {
        // Send data to the API endpoint
        const response = await fetch('/api/makeCall', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phone, name, email, language }),
        });

        const result = await response.json();

        if (response.ok) {
          alert('Call created successfully!');
          console.log(result);
        } else {
          alert(`Error: ${result.error}`);
          console.error(result);
        }
      } catch (error) {
        alert('An unexpected error occurred.');
        console.error('Frontend Error:', error);
      }
    });
  }
});
