/* Procuret API JS - Amount JS Class */


class PR_Amount {

    constructor(
        magnitude,  // String decimal number e.g. "4,000" or "4000"
        currency    // PR_Currency
    ) {

        if (!currency) { throw Error('Cannot init w/ falsey PR_Currency'); }

        this._magnitude = magnitude;
        this._currency = currency;

        return;
    }

    get asNumber() { return new Number(this._magnitude); }
    get asLocaleString() { 
        return this.asNumber.toLocaleString(undefined, {
            minimumFractionDigits: this._currency.exponent
        });
    }
    get asSymbolisedString() {
        return this._currency.symbol + this.asLocaleString;
    }
    get asDenominatedString() {
        return this._currency.iso_4217 + ' ' + this.asLocaleString;
    }

    get magnitude() { return this._magnitude; }
    get denomination() { return this._currency; }

    get isGreaterThanZero() { return Number(this._magnitude) > 0; }

    rounded(decimalPlaces) {
        return new PR_Amount(
            Number(this._magnitude).toFixed(decimalPlaces),
            this._currency
        );
    }

    magnitudeIsGreaterThan(value) {
        return Number(this._magnitude) > value;
    }

    encode() {
        return {
            'magnitude': this._magnitude,
            'denomination': this._currency.indexid
        }
    }

    static decode(data) {
        return new PR_Amount(
            data['magnitude'],
            PR_Currency.decode(data['denomination'])
        );
    }

    static optionallyDecode(data) {  // -> Optional<Self>
        if (!data) { return null; }
        return PR_Amount.decode(data);
    }

}
