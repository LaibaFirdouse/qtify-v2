// helpers/api.js

// 💡 FIX: Set BACKEND_ENDPOINT to an empty string. 
// The browser will now treat requests starting with '/' as relative to the base URL (which the proxy maps to the backend).
export const BACKEND_ENDPOINT = "";

// Helper function to handle the fetch request and JSON parsing
const fetchAndParse = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    // 💡 Logging the URL helps debug if the proxy failed
    console.error(`Error fetching data from ${url}:`, e);
    return [];
  }
};

export const fetchTopAlbums = async () => {
  // 💡 FIX: Use only the relative path
  const url = `/albums/top`;
  return fetchAndParse(url);
};

export const fetchNewAlbums = async () => {
  // 💡 FIX: Use only the relative path
  const url = `/albums/new`;
  return fetchAndParse(url);
};

export const fetchSongs = async () => {
  // 💡 FIX: Use only the relative path
  const url = `/songs`;
  return fetchAndParse(url);
};

export const fetchGenres = async () => {
  // 💡 FIX: Use only the relative path
  const url = `/genres`;
  return fetchAndParse(url);
};