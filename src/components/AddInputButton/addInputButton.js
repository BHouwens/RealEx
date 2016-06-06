import React from 'react';
import styles from './addInputButton.css';

export const AddInputButton = ({ onClick }) => {
    return <button className={styles.button} onClick={onClick}>Add</button>
}