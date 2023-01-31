/* Procuret JS - QueryString */

class PR_UrlQuery {

    constructor(
        url_parameters  // Array<PR_UrlParameter>
    ) {

        if (url_parameters.length === undefined) {
            throw Error('parameters do not appear to be an array')
        }
        this._parameters = url_parameters;
        return;

    }

    get query() { 
        let query = '?';
        for (let i = 0; i < this._parameters.length; i++) {
            if (i === 0) {
                query += this._parameters[i].string;
                continue;
            }
            query += '&' + this._parameters[i].string;
            continue;
        }
        return query;
    }

}
