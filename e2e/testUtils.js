// testUtils.js

async function handleResponse(response) {
    if (response === null) {
      throw new Error('Response is null.');
    }
  
    const contentType = response.headers()['content-type'];
    console.log(`Content-Type: ${contentType}`);
  
    if (contentType.includes('application/json')) {
      const payload = await response.json();
      console.log('JSON payload:', payload);
      return { type: 'json', content: payload };
    } else if (contentType.includes('text/html')) {
      const htmlContent = await response.text();
      console.log('HTML content length:', htmlContent.length);
      return { type: 'html', content: htmlContent };
    } else {
      console.log('Unexpected content type');
      const textContent = await response.text();
      return { type: 'unknown', content: textContent };
    }
  }
  
  module.exports = {
    handleResponse
  };