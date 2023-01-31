/* Procuret JS - Entity Headline Type */


class PR_EntityHeadline {

    constructor(
        entityId,         // String encoded integer
        legalEntityName,  // String
    ) {

        this._entityId = entityId;
        this._legalEntityName = legalEntityName;

        return;

    }

    get entityId() { return this._entityId; }
    get legalEntityName() { return this._legalEntityName; }

    static decode(data) {
        return new PR_EntityHeadline(
            data['entity_id'],
            data['legal_entity_name']
        );
    }

    static optionallyDecode(data) {
        if (!data) { return null; }
        return PR_EntityHeadline.decode(data);
    }

}
