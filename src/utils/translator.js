export default class Translator {
    constructor(){}
    
    sortLetters(text){
        text = text.replace(/(capital|uppercase)\sletters?/i, '[A-Z]');
        text = text.replace(/(normal|lowercase)\sletters?/i, '[a-z]');
        return text.replace(/letters?/i, '[a-zA-Z]');
    }
    
    sortNumbers(text){
        return text.replace(/numbers?/i, '[0-9]');
    }
    
    sortAmount(amount, text){
        switch(amount){
            case 'one-or-more':
                return text + '+';
            case 'optionally-one':
                return text + '?';
            case 'optionally-many':
                return text + '*';
            default:
                return text;
        }
    }
    
    process(amount, text){
        if (text === undefined) return text;
        
        text = this.sortAmount(amount, text);
        
        text = this.sortLetters(text);
        text = this.sortNumbers(text);
        
        return text;
    }
}