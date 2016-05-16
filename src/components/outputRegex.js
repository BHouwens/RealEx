import React from 'react';
import { anyNumber } from '../utils/numberTrans';
import { anyLetter } from '../utils/letterTrans';
import '../../styles/container__right.css';

function concatChunks(chunks){
    return chunks.map(chunk => {
                    if (chunk.text.indexOf('number') != -1) return anyNumber(chunk.text);
                    if (chunk.text.indexOf('letter') != -1) return anyLetter(chunk.text);
                    return chunk.text;
                 }).join('');
}

export const OutputRegex = ({ inputs }) => {
    return (
        <div className="container__right">
            <div className="container__right__output">{concatChunks(inputs)}</div>
        </div>
    );
}