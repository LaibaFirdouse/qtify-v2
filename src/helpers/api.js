// helpers/api.js

// 💡 FIX: Use the full absolute URL for production/deployment.
// The proxy works locally, but production code must be explicit.
export const BACKEND_ENDPOINT = "https://qtify-backend.labs.crio.do";

// Helper function to handle the fetch request and JSON parsing
const fetchAndParse = async (path) => {
  // Construct the full URL using the absolute endpoint for deployment
  const url = `${BACKEND_ENDPOINT}${path}`; 
  
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Log the full URL being used
      console.error(`HTTP error! Status: ${response.status} for URL: ${url}`);
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Error fetching data from ${url}:`, e);
    return [];
  }
};

export const fetchTopAlbums = async () => {
  // Pass only the path segment
  return fetchAndParse(`/albums/top`);
};

export const fetchNewAlbums = async () => {
  // Pass only the path segment
  return fetchAndParse(`/albums/new`);
};

export const fetchSongs = async () => {
  // Pass only the path segment
  return fetchAndParse(`/songs`);
};

export const fetchGenres = async () => {
  // Pass only the path segment
  return fetchAndParse(`/genres`);
};