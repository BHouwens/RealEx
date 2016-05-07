export function SELECT_ADDITION_TYPE(selection){
    return {
        type: 'SELECT_ADDITION_TYPE',
        selection
    }
}

export function ADD_DESCRIPTION(text){
    return {
        type: 'ADD_DESCRIPTION',
        text
    }
}

export function REMOVE_DESCRIPTION(id){
    return {
        type: 'REMOVE_DESCRIPTION',
        id
    }
}