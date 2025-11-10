import React from 'react';
import styles from './Card.module.css';
import Chip from '@mui/material/Chip'; // Using MUI Chip

function Card({ data }) {
    const { image, title, follows, likes } = data;
    
    // Determine card type based on data for reusability (Songs vs Albums)
    const isAlbum = follows !== undefined;
    const count = isAlbum ? follows : likes;
    const label = isAlbum ? 'Follows' : 'Likes';

    return (
        // The card structure must be precise for tests to count them (Tests 11, 14)
        <div className={styles.card}>
            <div className={styles.cardWrapper}>
                <img className={styles.cardImage} src={image} alt={title} loading="lazy" />
                
                {/* MUI Chip for follow/like count */}
                <Chip 
                    label={`${count} ${label}`} 
                    size="small"
                    className={styles.chip}
                />
            </div>
            <p className={styles.cardTitle}>{title}</p>
        </div>
    );
}

export default Card;