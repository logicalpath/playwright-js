// readpayload.spec.js
const { test, expect } = require('@playwright/test');
const { handleResponse } = require('./testUtils');

test('html resp', async ({ page }) => {
  await page.goto('https://archive.org/details/texts');
  // await page.getByText('eBooks and Texts').waitFor({ state: 'visible' });

  // Wait for the specific blog URL request
  const requestPromise = page.waitForRequest('https://blog.archive.org/');

  // Click the Blog link
  await page.getByRole('link', { name: 'Blog' }).click();

  // Wait for the request to complete
  const request = await requestPromise;
  const response = await request.response();

  // Use the shared function to handle the response
  const { type, content } = await handleResponse(response);

  // You can now use 'type' and 'content' as needed in your test
  console.log(`Response type: ${type}`);
  if (type === 'html') {
    console.log(`HTML content length: ${content.length}`);
  }

  // Check for the presence of the "Internet Archive Blogs" link
  await expect(page.getByRole('link', { name: 'Internet Archive Blogs' })).toBeVisible();
});



test('json resp', async ({ page }) => {
  await page.goto('https://wayback-api.archive.org/');
  // await page.getByText('eBooks and Texts').waitFor({ state: 'visible' });

  // Wait for the specific blog URL request
  const requestPromise = page.waitForRequest('**/anchor?q=logicalpath');

  // Search 
  await page.getByPlaceholder('Enter a URL or words related').click();
  await page.getByPlaceholder('Enter a URL or words related').fill('logicalpath');
  await page.getByPlaceholder('Enter a URL or words related').press('Enter');

  // Wait for the request to complete
  const request = await requestPromise;
  const response = await request.response();

  // Use the shared function to handle the response
  const { type, content } = await handleResponse(response);

  // You can now use 'type' and 'content' as needed in your test
  console.log(`Response type: ${type}`);
  
  await expect(page.getByRole('link', { name: 'http://logicalpath.com/' })).toBeVisible();

});