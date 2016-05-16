export function selectAdditionType(selection){
    return {
        type: 'SELECT_ADDITION_TYPE',
        selection
    }
}

export function addDescription(text){
    return {
        type: 'ADD_DESCRIPTION',
        text
    }
}

export function removeDescription(id){
    return {
        type: 'REMOVE_DESCRIPTION',
        id
    }
}

export function changeDescription(id, text){
    return {
        type: 'CHANGE_DESCRIPTION',
        id,
        text
    }
}