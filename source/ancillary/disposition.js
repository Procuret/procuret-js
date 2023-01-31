/* Procuret JS - Disposition Type */


class PR_Disposition {

    constructor(
        count,  // Integer
        limit,  // Integer
        offset,  // Integer
        sequence  // Integer
    ) {

        this._count = count;
        this._limit = limit;
        this._offset = offset;
        this._sequence = sequence;

        return;

    }

    get count() { return this._count; }
    get limit() { return this._limit; }
    get offset() { return this._offset; }
    get sequence() { return this._sequence; }

    static decode(data) {
        return new PR_Disposition(
            data['count'],
            data['limit'],
            data['offset'],
            data['sequence']
        );
    }

    static optionallyDecode(data) {
        if (data == null) { return null; }
        return PR_Disposition.decode(data);
    }

}
