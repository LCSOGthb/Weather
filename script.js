catch (error) {
  console.error('Error fetching weather data:', error);
  const errorMessage = document.createElement('div');
  errorMessage.className = 'error-message';
  errorMessage.innerHTML = `
    <strong>Unable to fetch weather data.</strong><br>
    <ul>
      <li>Check the city name for typos.</li>
      <li>Ensure your internet connection is active.</li>
      <li>Weather service may be temporarily unavailable.</li>
    </ul>
    <p>Error details: ${error.message}</p>
  `;
  document.body.appendChild(errorMessage);
}
