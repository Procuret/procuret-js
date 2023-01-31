/* Procuret JS - PR_Currency Type */


class PR_Currency extends PR_Enumeration {

    static get enumerations() { return [
        _CURRENCY_AUD,
        _CURRENCY_NZD
    ];}

    constructor(
        indexid,       // Number (Integer)
        iso_4217,      // String
        name,          // String
        exponent,      // Number (Integer)
        symbol         // String
    ) {

        super(indexid, name)

        this._iso_4217 = iso_4217.toUpperCase();
        this._exponent = exponent;
        this._symbol = symbol;

        return;
    }

    get iso_4217() { return this._iso_4217; }
    get symbol() { return this._symbol; }
    get exponent() { return this._exponent; }

    static get AUD() { return _CURRENCY_AUD; }
    static get NZD() { return _CURRENCY_NZD; }

    static get allAvailable() {  // -> Array<Self>
        return [
            _CURRENCY_AUD,
            _CURRENCY_NZD
        ];
    }

    static decode(
        data  // Object<String, Any>
    ) {  // -> Self
        return new PR_Currency(
            data['indexid'],
            data['iso_4217'],
            data['name'],
            data['exponent'],
            data['symbol']
        );
    }

    static withId(
        indexid  // Integer
    ) {  // -> Self
        const Self = PR_Currency;
        if (indexid == Self.AUD.indexid) { return Self.AUD; }
        if (indexid == Self.NZD.indexid) { return Self.NZD; }
        throw Error('Unknown currency ' + indexid);
    }

}

const _CURRENCY_AUD = new PR_Currency(1, 'aud', 'Australian Dollar', 2, '$');
const _CURRENCY_NZD = new PR_Currency(2, 'nzd', 'New Zealand Dollar', 2, '$');
