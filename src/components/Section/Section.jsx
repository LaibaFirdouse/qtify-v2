import React, { useState } from 'react';
import Carousel from '../Carousel/Carousel';
import Card from '../Card/Card';
import styles from './Section.module.css';

// MUI Tabs Imports for Songs Section
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

function Section({ title, data, type, genres }) {
  // Use state only for Album Sections (type === 'album')
  const isAlbumSection = type === 'album';
  const hasToggle = isAlbumSection; 
  const [showAll, setShowAll] = useState(false);
  
  // State for Songs Section Tabs
  const [selectedGenre, setSelectedGenre] = useState(0);

  const handleToggle = () => {
    setShowAll((prevState) => !prevState);
  };
  
  // Filter data based on selected genre (Songs only)
  const filteredSongs = data.filter(song => {
    if (!genres || genres.length === 0 || selectedGenre === 0) {
      return true; // Show all for 'All' tab or if genres aren't loaded
    }
    const genreName = genres[selectedGenre].label;
    return song.genre.label === genreName;
  });

  const displayData = isAlbumSection ? data : filteredSongs;
  
  // Render the content: Carousel or Grid
  const renderContent = () => {
    if (isAlbumSection && showAll) {
      // Grid view for Albums (Show All state)
      return (
        <div className={styles.gridContainer}>
          {displayData.map((item) => (
            <Card key={item.id} data={item} />
          ))}
        </div>
      );
    } 
    // Carousel view (default for Albums, required for Songs)
    return <Carousel data={displayData} renderComponent={Card} />;
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {/* Toggle button for Albums (Tests 12, 13) */}
        {hasToggle && (
          <button className={styles.toggleButton} onClick={handleToggle}>
            {showAll ? "Collapse" : "Show All"}
          </button>
        )}
      </div>

      {/* Tabs for Songs Section */}
      {!isAlbumSection && genres && genres.length > 0 && (
        <Box className={styles.tabsWrapper}>
          <Tabs
            value={selectedGenre}
            onChange={(e, newValue) => setSelectedGenre(newValue)}
            // Apply custom styles via classes and props
            TabIndicatorProps={{ style: { backgroundColor: 'var(--color-primary)' } }}
          >
            {/* The first tab is "All" (value=0) */}
            <Tab label="All" className={styles.customTab} />
            {genres.map((genre, index) => (
              <Tab 
                key={genre.key} 
                label={genre.label} 
                className={styles.customTab}
              />
            ))}
          </Tabs>
        </Box>
      )}

      {renderContent()}
    </div>
  );
}

export default Section;