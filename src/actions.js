export function changeDescription(id, text){
    return {
        type: 'CHANGE_DESCRIPTION',
        id,
        text
    }
}

export function changeType(id, type){
    return {
        type: 'CHANGE_TYPE',
        followType: type,
        id
    }
}

export function changeAmount(id, amount){
    return {
        type: 'CHANGE_AMOUNT',
        id,
        amount
    }
}

export function addChunk(){
    return {
        type: 'ADD_CHUNK'
    }
}