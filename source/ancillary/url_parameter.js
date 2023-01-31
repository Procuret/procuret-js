/* Procuret JS - Url Parameter Type */


class PR_UrlParameter {

    constructor(key, value) {
        this._key = key;
        this._value = PR_UrlParameter._interpretValue(value);
        return;
    }

    get string() {
        return this._key + '=' + encodeURIComponent(this._value);
    }

    static _interpretValue(value) {
        if (value === true) { return 'true' }
        if (value === false) { return 'false' }
        return value;
    }

    static compactPush(
        key,      // String
        value,    // Optional<Any>
        array     // Array<Self>
    ) { // -> Array<Self>

        if (value == null) { return array; }

        array.push(new PR_UrlParameter(key, value));

        return array;

    }

    static cp(k, v, a) { return PR_UrlParameter.compactPush(k, v, a); }

}
