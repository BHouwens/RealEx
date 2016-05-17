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
    
    sortSpecialChars(text){
        console.log(text);
        switch(text){
            case 'fullstop':
                return '.';
            case 'period':
                return '.';
            case 'colon':
                return ':';
            case 'asterisk':
                return '*';
            case 'equals':
                return '=';
            case 'question mark':
                return '?';
            default:
                return text;
        }
    }
    
    sortAmount(amount, text){
        if (amount == 'literally'){
            let match = /[\\\-\?\.\,\/\:\;\'\"\[\]\{\}|\*\=]/.test(text);
            return match ? `\\${text}` : text;
        }else{
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
    }
    
    process(amount, text){
        if (text === undefined) return text;
        
        text = this.sortSpecialChars(text);
        text = this.sortAmount(amount, text);
        
        text = this.sortLetters(text);
        text = this.sortNumbers(text);
        
        return text;
    }
}