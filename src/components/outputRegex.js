import React from 'react';
import Translator from '../utils/translator';
import '../../styles/container__right.css';

const translator = new Translator();

function concatChunks(chunks){
    return chunks.map(chunk => {
                    return translator.process(chunk.type, chunk.amount, chunk.text);
                 }).join('');
}

export const OutputRegex = ({ inputs }) => {
    return (
        <div className="container__right">
            <div className="container__right__output">{concatChunks(inputs)}</div>
        </div>
    );
}