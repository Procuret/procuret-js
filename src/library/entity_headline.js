/* Procuret JS - Entity Headline Type */

/**
 * Brief entity information
 */
export class PR_EntityHeadline {

    /**
     * @param {string} entityId - String encoded integer
     * @param {string} legalEntityName - Legal entity name
     */
    constructor(entityId, legalEntityName) {
        /** @type {string} */
        this._entityId = entityId;
        /** @type {string} */
        this._legalEntityName = legalEntityName;
    }

    /** @type {string} */
    get entityId() { return this._entityId; }

    /** @type {string} */
    get legalEntityName() { return this._legalEntityName; }

    /**
     * Decode from raw data
     * @param {{entity_id: string, legal_entity_name: string}} data
     * @returns {PR_EntityHeadline}
     */
    static decode(data) {
        return new PR_EntityHeadline(
            data['entity_id'],
            data['legal_entity_name']
        );
    }

    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_EntityHeadline|null}
     */
    static optionallyDecode(data) {
        if (!data) { return null; }
        return PR_EntityHeadline.decode(data);
    }
}
