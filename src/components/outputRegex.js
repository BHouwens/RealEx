import React from 'react';
import { translate } from '../utils/translator';
import styles from '../../styles/container__right.css';

function concatChunks(chunks){
    let finalRegex = [];
    
    for (let i = 0; i < chunks.length; i++){
        let text = chunks[i].text;
        
        switch(chunks[i].type){
            case "followed":
                text = '(?=' + text + ')';
                finalRegex.push(translate(chunks[i].amount, text));
                break;
                
            case "not-followed":
                text = '(?!' + text + ')';
                finalRegex.push(translate(chunks[i].amount, text));
                break;
                
            case "starts-with":
                text = translate(chunks[i].amount, text);
                finalRegex.push(chunks[i].id == 0 ? '^' + text : text);
                break;
                
            case "ends-with":
                text = translate(chunks[i].amount, text);
                finalRegex.push(chunks[i].id == chunks.length - 1 ? text + '$' : text);
                break;
                
            default:
                finalRegex.push(translate(chunks[i].amount, text));
        }
    }
    
    return finalRegex.join('');
}

export const OutputRegex = ({ inputs }) => {
    return (
        <div className={styles.container__right}>
            <div className={styles.container__right__output}>{concatChunks(inputs)}</div>
        </div>
    );
}