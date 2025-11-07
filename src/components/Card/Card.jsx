import React from 'react';
import styles from './Card.module.css';
// Placeholder image import (assuming you have one, or using a fallback)
// import albumCover from '../../assets/album_cover_placeholder.png'; 

function Card({ data }) {
    const { image, title, follows, likes } = data;
    
    // Determine the count to display (follows for albums, likes for songs)
    const count = follows !== undefined ? follows : likes;
    const label = follows !== undefined ? 'Follows' : 'Likes';

    return (
        <div className={styles.card}>
            <div className={styles.cardWrapper}>
                <img className={styles.cardImage} src={image} alt={title} loading="lazy" />
                <div className={styles.banner}>
                    <p>{count} {label}</p>
                </div>
            </div>
            <p className={styles.cardTitle}>{title}</p>
        </div>
    );
}

export default Card;