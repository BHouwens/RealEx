import React from 'react';
import Translator from '../utils/translator';
import '../../styles/container__right.css';

const translator = new Translator();

function concatChunks(chunks){
    let finalRegex = [];
    
    for (let i = 0; i < chunks.length; i++){
        let text = chunks[i].text;
        
        console.log('text', text);
        
        switch(chunks[i].type){
            case "followed":
                text = '(?=' + text + ')';
                finalRegex.push(translator.process(chunks[i].amount, text));
                break;
                
            case "not-followed":
                text = '(?!' + text + ')';
                finalRegex.push(translator.process(chunks[i].amount, text));
                break;
                
            case "starts-with":
                text = translator.process(chunks[i].amount, text);
                finalRegex.push(chunks[i].id == 0 ? '^' + text : text);
                break;
                
            case "ends-with":
                text = translator.process(chunks[i].amount, text);
                finalRegex.push(chunks[i].id == chunks.length - 1 ? text + '$' : text);
                break;
                
            default:
                finalRegex.push(translator.process(chunks[i].amount, text));
        }
    }
    
    return finalRegex.join('');
}

export const OutputRegex = ({ inputs }) => {
    return (
        <div className="container__right">
            <div className="container__right__output">{concatChunks(inputs)}</div>
        </div>
    );
}