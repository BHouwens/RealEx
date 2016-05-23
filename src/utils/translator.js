String.prototype.sortLetters = function(){
    return this.replace(/(capital|uppercase)\sletters?/i, '[A-Z]')
               .replace(/(normal|lowercase)\sletters?/i, '[a-z]')
               .replace(/letters?/i, '[a-zA-Z]');
}

String.prototype.sortNumbers = function(){
    return this.replace(/numbers?/i, '[0-9]');
}

String.prototype.sortSpecialChars = function(){
    switch (this) {
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
            return this;
    }
}

String.prototype.sortAmount = function(amount){
    if (amount == 'literally') {
        let match = /[\\\-\?\.\,\/\:\;\'\"\[\]\{\}|\*\=]/.test(this);
        return match ? `\\${this}` : this;
    } else {
        switch (amount) {
            case 'one-or-more':
                return this + '+';
            case 'optionally-one':
                return this + '?';
            case 'optionally-many':
                return this + '*';
            default:
                return this;
        }
    }
}

export function translate(amount, text){
    if (text === undefined) return text;

    return text.sortSpecialChars()
               .sortAmount(amount)
               .sortLetters()
               .sortNumbers();
}