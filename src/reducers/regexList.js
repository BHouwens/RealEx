const initialState = {
    chunks: [
        {
            id: 0,
            text: '',
            type: 'starts-with',
            amount: 'a'
        }
    ]
};

function regex(state = [], action) {
    switch (action.type) {
        case 'CHANGE_DESCRIPTION':
            return state.chunks.map(chunk => {
                if (action.id == chunk.id) {
                    return {
                        id: chunk.id,
                        text: action.text,
                        type: chunk.type,
                        amount: chunk.amount
                    };
                }
                return chunk;
            });
        case 'CHANGE_TYPE':
            return state.chunks.map(chunk => {
                if (action.id == chunk.id) {
                    return {
                        id: chunk.id,
                        text: chunk.text,
                        type: action.followType,
                        amount: chunk.amount
                    };
                }
                return chunk;
            });
        case 'CHANGE_AMOUNT':
            return state.chunks.map(chunk => {
                if (action.id == chunk.id) {
                    return {
                        id: chunk.id,
                        text: chunk.text,
                        type: chunk.type,
                        amount: action.amount
                    };
                }
                return chunk;
            });
        default:
            return state;
    }
}

export function regexList(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_DESCRIPTION':
            return Object.assign({}, state, {
                chunks: regex(state, action)
            });
        case 'CHANGE_TYPE':
            return Object.assign({}, state, {
               chunks: regex(state, action)
            });
        case 'CHANGE_AMOUNT':
            return Object.assign({}, state, {
                chunks: regex(state, action) 
            });
        case 'ADD_CHUNK':
            return Object.assign({}, state, {
                        chunks: [
                            ...state.chunks,
                            {
                                id: state.chunks[state.chunks.length - 1].id + 1,
                                text: '',
                                type: 'then',
                                amount: 'a'
                            }
                        ]
                    });
        default:
            return state;
    }
}