import React from 'react';

function concatChunks(chunks){
    return chunks.map(chunk => chunk.text).join('');
}

export function RegexOutput(props){
    let {chunks} = props;
    
    return (
      <div className='regex'>
        {concatChunks(chunks)}
      </div>  
    );
}