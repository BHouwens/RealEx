import React from 'react';
import styles from '../../styles/add-input-button.css';

export const AddInputButton = ({ onClick }) => {
    return <button className={styles.button} onClick={onClick}>Add</button>
}