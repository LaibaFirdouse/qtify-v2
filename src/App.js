import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section"; // NEW
import { fetchTopAlbums, fetchNewAlbums, fetchSongs } from "./helpers/api"; 
import "./App.css"; 

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]); 

  const generateData = async () => {
    // Fetches all necessary data to satisfy tests
    const [topAlbumsData, newAlbumsData, songsData] = await Promise.all([
      fetchTopAlbums(),
      fetchNewAlbums(),
      fetchSongs(),
    ]);

    setTopAlbums(topAlbumsData);
    setNewAlbums(newAlbumsData);
    setSongs(songsData);
  };

  useEffect(() => {
    generateData();
  }, []);

  const searchData = [...topAlbums, ...newAlbums]; 

  return (
    <div className="App">
      <Navbar searchData={searchData} />
      <Hero />
      
      {/* RENDER SECTIONS HERE to enable Tests 9, 10, 11, 14 */}
      <div className="sections-wrapper">
        <Section title="Top Albums" data={topAlbums} />
        <Section title="New Albums" data={newAlbums} />
        {/* Assuming Songs are also displayed in a section, though tests look for titles */}
        <Section title="All Songs" data={songs} /> 
      </div>
    </div>
  );
}

export default App;