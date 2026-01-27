/**
 * Brief entity information
 */
export class PR_EntityHeadline {
    /**
     * Decode from raw data
     * @param {{entity_id: string, legal_entity_name: string}} data
     * @returns {PR_EntityHeadline}
     */
    static decode(data: {
        entity_id: string;
        legal_entity_name: string;
    }): PR_EntityHeadline;
    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_EntityHeadline|null}
     */
    static optionallyDecode(data: any | null | undefined): PR_EntityHeadline | null;
    /**
     * @param {string} entityId - String encoded integer
     * @param {string} legalEntityName - Legal entity name
     */
    constructor(entityId: string, legalEntityName: string);
    /** @type {string} */
    _entityId: string;
    /** @type {string} */
    _legalEntityName: string;
    /** @type {string} */
    get entityId(): string;
    /** @type {string} */
    get legalEntityName(): string;
}
//# sourceMappingURL=entity_headline.d.ts.map