import React from 'react';
import { anyNumber } from '../utils/numberTrans';
import { anyLetter } from '../utils/letterTrans';

function concatChunks(chunks){
    return chunks.map(chunk => {
                    if (chunk.text.indexOf('number') != -1) return anyNumber(chunk.text);
                    if (chunk.text.indexOf('letter') != -1) return anyLetter(chunk.text);
                    return chunk.text;
                 }).join('');
}

export const TranslatedRegex = (props) => {
    let {chunks} = props;
    
    return (
      <div className='regex'>
        {concatChunks(chunks)}
      </div>  
    );
}