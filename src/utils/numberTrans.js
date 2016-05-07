export function anyNumber(text){
    if (text.indexOf('any') != -1 || text.indexOf('all') != -1) return '[0-9]';
    return text;
}