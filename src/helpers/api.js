// helpers/api.js
// Removed: import axios from "axios";

export const BACKEND_ENDPOINT = "https://qtify-backend-labs.crio.do";

// Helper function to handle the fetch request and JSON parsing
const fetchAndParse = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (e) {
    console.error(`Error fetching data from ${url}:`, e);
    return [];
  }
};

export const fetchTopAlbums = async () => {
  const url = `${BACKEND_ENDPOINT}/albums/top`;
  return fetchAndParse(url);
};

export const fetchNewAlbums = async () => {
  const url = `${BACKEND_ENDPOINT}/albums/new`;
  return fetchAndParse(url);
};

export const fetchSongs = async () => {
  const url = `${BACKEND_ENDPOINT}/songs`;
  return fetchAndParse(url);
};
// helpers/api.js (Add this function)

// ... existing code ...

export const fetchGenres = async () => {
  const url = `${BACKEND_ENDPOINT}/genres`;
  return fetchAndParse(url);
};