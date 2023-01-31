/* Procuret JS - Instalment Link Open Type */


class PR_InstalmentLinkOpen {

    static get path() { return PR_InstalmentLink.path + '/open'; }

    constructor(
        sequence,    // Number (Integer)
        created      // String (encoded time)
    ) {

        this._sequence = sequence;
        this._created = created;

        return;

    }

    static optionallyDecode(data) {
        if (!data) { return null; }
        return new PR_InstalmentLinkOpen(
            data['sequence'],
            data['created']
        )
    }

    static decode(data) {
        const result = PR_InstalmentLinkOpen.optionallyDecode(data);
        if (!result) { throw Error('Unexpectedly null data'); }
        return result;
    }

    static decodeMany(data) {
        return data.map((d) => { return PR_InstalmentLinkOpen.decode(d); })
    }

}
