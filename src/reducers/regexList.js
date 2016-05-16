const initialState = {
    chunks: [
        {
            id: 0,
            text: '',
            type: null
        }
    ]
};

function regex(state = [], action) {
    console.log(state);
    switch (action.type) {
        case 'CHANGE_DESCRIPTION':
            return state.chunks.map(chunk => {
                if (action.id == chunk.id) {
                    return {
                        id: chunk.id,
                        text: action.text,
                        type: chunk.type
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
                        type: action.followType
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
        default:
            return state;
    }
}