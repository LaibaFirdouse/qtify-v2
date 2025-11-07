import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
// Corrected import path for API functions:
import { fetchTopAlbums, fetchNewAlbums, fetchSongs } from "./helpers/api"; 
import "./App.css"; // global styles

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]); // Necessary for test 14

  const generateData = async () => {
    // Fetch and set data to satisfy API-related tests
    const topAlbumsData = await fetchTopAlbums();
    setTopAlbums(topAlbumsData);

    const newAlbumsData = await fetchNewAlbums();
    setNewAlbums(newAlbumsData);

    const songsData = await fetchSongs();
    setSongs(songsData);
  };

  useEffect(() => {
    generateData();
  }, []);

  // Concatenate topAlbums and newAlbums to form the search data for the Navbar (Test 3 indirectly relies on this for proper component initialization)
  const searchData = [...topAlbums, ...newAlbums]; 

  return (
    <div className="App">
      <Navbar searchData={searchData} />
      <Hero />
      
      {/* You must ensure your Sections component (where you display Top Albums, New Albums, and Songs) 
      are also rendered here and passed the respective data to fully pass tests 9, 11, 12, 14. 
      Example: 
      <AlbumSection title="Top Albums" data={topAlbums} />
      <AlbumSection title="New Albums" data={newAlbums} />
      <SongsSection data={songs} />
      */}
    </div>
  );
}

export default App;