import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import Hero from "./components/Hero/Hero";
import Section from "./components/Section/Section"; 
import { fetchTopAlbums, fetchNewAlbums, fetchSongs, fetchGenres } from "./helpers/api"; 
import "./App.css"; 

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setNewAlbums] = useState([]);
  const [songs, setSongs] = useState([]); 
  const [genres, setGenres] = useState([]);

  const generateData = async () => {
    // Fetch all necessary data 
    const [topAlbumsData, newAlbumsData, songsData, genresData] = await Promise.all([
      fetchTopAlbums(),
      fetchNewAlbums(),
      fetchSongs(),
      fetchGenres(), // NEW
    ]);

    setTopAlbums(topAlbumsData);
    setNewAlbums(newAlbumsData);
    setSongs(songsData);
    
    // Genres need to include the 'All' tab's filtering requirement:
    // Filter out the 'All' genre since we add it manually as the first tab
    const filteredGenres = genresData.data ? genresData.data.filter(g => g.key !== 'all') : [];
    setGenres(filteredGenres);
  };

  useEffect(() => {
    generateData();
  }, []);

  const searchData = [...topAlbums, ...newAlbums]; 

  return (
    <div className="App">
      <Navbar searchData={searchData} />
      <Hero />
      
      <div className="sections-wrapper">
        {/* Top Albums Section (type='album' enables toggle) */}
        {topAlbums.length > 0 && <Section title="Top Albums" data={topAlbums} type="album" />}
        
        {/* New Albums Section (type='album' enables toggle) */}
        {newAlbums.length > 0 && <Section title="New Albums" data={newAlbums} type="album" />}

        {/* Songs Section (type=undefined disables toggle, enables tabs) */}
        {songs.length > 0 && <Section title="Songs" data={songs} genres={genres} />}
      </div>
    </div>
  );
}

export default App;