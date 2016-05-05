import React from 'react';

export function Regex(props){
    let {chunks} = props;
    
    return (
      <div className='regex'>
        <ul>
            {chunks.map(chunk => (
                <li>{chunk.text}</li>
            ))}
        </ul>
      </div>  
    );
}