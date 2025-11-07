import React, { useState } from 'react';
import Card from '../Card/Card'; // Assuming you have a Card component
import styles from './Section.module.css';

function Section({ title, data }) {
  // State to control showing all items or only a limited subset
  const [carouselToggle, setCarouselToggle] = useState(true);

  // Determine which items to display
  const itemsToShow = carouselToggle ? data.slice(0, 7) : data;
  
  const handleToggle = () => {
    setCarouselToggle((prevState) => !prevState);
  };

  return (
    <div className={styles.sectionContainer}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {/* Toggle button for 'Show All' / 'Collapse' - crucial for Test 10 */}
        <button className={styles.toggleButton} onClick={handleToggle}>
          {carouselToggle ? "Show All" : "Collapse"}
        </button>
      </div>

      <div className={styles.cardContainer}>
        {itemsToShow.map((item) => (
          <Card 
            key={item.id} 
            data={item} 
            // Assuming your Card component handles album vs song formatting internally
          />
        ))}
      </div>
    </div>
  );
}

export default Section;