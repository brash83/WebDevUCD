document.addEventListener("DOMContentLoaded", async function () {
  const url = "https://dog.ceo/api/breeds/image/random"; // Correct API endpoint

  try {
    console.log("Fetching random dog image...");

    // Fetch the random dog image
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json(); // Parse JSON response
    console.log("Response data:", data); // Debug the response data

    const imageUrl = data.message; // Dog image URL
    console.log("Image URL:", imageUrl); // Debug the image URL

    // Replace content with the image
    document.getElementById("content").innerHTML = `
      <img src="${imageUrl}" alt="Random Dog Image">
      <p>Enjoy this random dog!</p>
    `;
  } catch (error) {
    console.error("Failed to fetch dog image:", error);
    document.getElementById("content").innerHTML = `
      <p style="color: red;">Failed to fetch the dog image. Please try again later.</p>
    `;
  }
});
