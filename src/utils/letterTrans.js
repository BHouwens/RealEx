export function anyLetter(text){
    if (text.indexOf('any') != -1) return '[a-zA-Z]';
    return text;
}