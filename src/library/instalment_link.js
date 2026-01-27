/* Procuret JS - Instalment Link Type */

import { PR_Amount } from '../ancillary/amount.js';
import { PR_Time } from '../ancillary/time.js';
import { PR_QueryTerm } from '../ancillary/query_term.js';
import { PR_QueryString } from '../ancillary/query_string.js';
import { PR_ApiRequest } from '../ancillary/request.js';
import { PR_Response } from '../ancillary/response.js';
import { PR_Order } from '../ancillary/order.js';
import { PR_OrderBy } from '../ancillary/order_by.js';
import { PR_Disposition } from '../ancillary/disposition.js';
import { PR_Currency } from './currency.js';
import { PR_EntityHeadline } from './entity_headline.js';
import { PR_InstalmentLinkOpen } from './instalment_link_open.js';

/**
 * @typedef {Object} Session
 * @property {string} apiKey - API key
 * @property {string} sessionId - Session ID
 */

/**
 * Instalment link for sharing payment plans with customers
 */
export class PR_InstalmentLink {

    /** @type {string} */
    static get path() { return '/instalment-link'; }

    /** @type {string} */
    static get listPath() { return PR_InstalmentLink.path + '/list'; }

    /**
     * @param {string} publicId - Unique link identifier
     * @param {PR_EntityHeadline} supplier - Supplier information
     * @param {PR_Time|null} created - Creation timestamp
     * @param {string|null} inviteeEmail - Customer email
     * @param {string} invoiceAmount - Invoice amount (raw)
     * @param {string} invoiceIdentifier - Invoice reference
     * @param {PR_InstalmentLinkOpen[]} opens - Open records
     * @param {PR_Disposition|null} disposition - Pagination info
     * @param {number} saleName - Sale name ID
     * @param {boolean} allowEdit - Whether editing is allowed
     * @param {number} denominationId - Currency ID
     */
    constructor(
        publicId,
        supplier,
        created,
        inviteeEmail,
        invoiceAmount,
        invoiceIdentifier,
        opens,
        disposition,
        saleName,
        allowEdit,
        denominationId
    ) {
        /** @type {string} */
        this._publicId = publicId;
        /** @type {PR_EntityHeadline} */
        this._supplier = supplier;
        /** @type {PR_Time|null} */
        this._created = created;
        /** @type {string|null} */
        this._inviteeEmail = inviteeEmail;
        /** @type {string} */
        this._invoiceAmount = invoiceAmount;
        /** @type {string} */
        this._invoiceIdentifier = invoiceIdentifier;
        /** @type {PR_InstalmentLinkOpen[]} */
        this._opens = opens;
        /** @type {PR_Disposition|null} */
        this._disposition = disposition;
        /** @type {number} */
        this._saleName = saleName;
        /** @type {boolean} */
        this._allowEdit = allowEdit;
        /** @type {number} */
        this._denominationId = denominationId;
    }

    /** @type {string} */
    get publicId() { return this._publicId; }

    /** @type {PR_EntityHeadline} */
    get supplier() { return this._supplier; }

    /** @type {PR_Time|null} */
    get created() { return this._created; }

    /** @type {string|null} */
    get inviteeEmail() { return this._inviteeEmail; }

    /** @type {string} */
    get invoiceAmount() { return this._invoiceAmount; }

    /** @type {string} */
    get invoiceIdentifier() { return this._invoiceIdentifier; }

    /** @type {PR_InstalmentLinkOpen[]} */
    get opens() { return this._opens; }

    /** @type {PR_Disposition|null} */
    get disposition() { return this._disposition; }

    /** @type {number} */
    get saleName() { return this._saleName; }

    /** @type {boolean} */
    get allowEdit() { return this._allowEdit; }

    /** @type {number} */
    get denominationId() { return this._denominationId; }

    /**
     * Currency denomination
     * @type {PR_Currency}
     */
    get denomination() {
        return PR_Currency.withId(this._denominationId);
    }

    /**
     * Whether link has been opened
     * @type {boolean}
     */
    get hasBeenOpened() { return this._opens.length > 0; }

    /**
     * Number of times opened
     * @type {number}
     */
    get openCount() { return this._opens.length; }

    /**
     * Invoice amount with currency
     * @type {PR_Amount}
     */
    get amount() {
        return new PR_Amount(this._invoiceAmount, this.denomination);
    }

    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_InstalmentLink|null}
     */
    static optionallyDecode(data) {
        if (!data) { return null; }
        return new PR_InstalmentLink(
            data['public_id'],
            PR_EntityHeadline.decode(data['supplier']),
            PR_Time.decode(data['created']),
            data['invitee_email'],
            data['invoice_amount'],
            data['invoice_identifier'],
            PR_InstalmentLinkOpen.decodeMany(data['opens']),
            PR_Disposition.optionallyDecode(data['disposition']),
            data['sale_name'],
            data['allow_edit'],
            data['denomination_id']
        );
    }

    /**
     * Decode from raw data
     * @param {Object} data
     * @returns {PR_InstalmentLink}
     */
    static decode(data) {
        const result = PR_InstalmentLink.optionallyDecode(data);
        if (!result) { throw Error('Unexpectedly nil PR_InstalmentLink'); }
        return result;
    }

    /**
     * Retrieve a single instalment link by public ID
     * @param {string} publicId - Link public ID
     * @param {function(Error|null, PR_InstalmentLink|null): void} callback
     * @param {Session|null} [session] - Optional session
     */
    static retrieve(publicId, callback, session = null) {
        PR_InstalmentLink.retrieveMany(
            (e, links) => {
                if (e) { callback(e, null); return; }
                if (!links) { callback(null, null); return; }
                callback(null, links[0]);
            },
            1,
            0,
            PR_Order.DESCENDING,
            PR_InstalmentLinkOrderBy.CREATED,
            null,
            null,
            null,
            session,
            publicId
        );
    }

    /**
     * Retrieve multiple instalment links with filtering
     * @param {function(Error|null, PR_InstalmentLink[]|null): void} callback
     * @param {number} [limit=20] - Maximum results
     * @param {number} [offset=0] - Results offset
     * @param {PR_Order} [order] - Sort order
     * @param {PR_InstalmentLinkOrderBy} [orderBy] - Order by field
     * @param {string|null} [textFragment] - Text search (not implemented)
     * @param {boolean|null} [opened] - Filter by opened status
     * @param {string|null} [supplierId] - Filter by supplier
     * @param {Session|null} [session] - Optional session
     * @param {string|null} [publicId] - Filter by public ID
     * @param {string|null} [accessibleTo] - Filter by access
     */
    static retrieveMany(
        callback,
        limit = 20,
        offset = 0,
        order = PR_Order.DESCENDING,
        orderBy = PR_InstalmentLinkOrderBy.CREATED,
        textFragment = null,
        opened = null,
        supplierId = null,
        session = null,
        publicId = null,
        accessibleTo = null
    ) {
        try {
            if (textFragment) { throw Error('text search not implemented'); }

            const Self = PR_InstalmentLink;
            const UP = PR_QueryTerm;

            const parameters = [
                new UP('limit', limit),
                new UP('offset', offset),
                new UP('order', order.key),
                new UP('order_by', orderBy.key)
            ];

            UP.compactPush('opened', opened, parameters);
            UP.compactPush('supplier_id', supplierId, parameters);
            UP.compactPush('public_id', publicId, parameters);
            UP.compactPush('accessible_to', accessibleTo, parameters);

            PR_ApiRequest.make(
                PR_InstalmentLink.listPath,
                'GET',
                new PR_QueryString(parameters),
                null,
                (e, d) => { PR_Response.decodeMany(e, d, callback, Self); },
                session
            );
        } catch (error) {
            callback(error, null);
        }
    }

    /**
     * Create a new instalment link
     * @param {function(Error|null, PR_InstalmentLink|null): void} callback
     * @param {number} supplierId - Supplier ID
     * @param {PR_Amount} amount - Invoice amount
     * @param {string} identifier - Invoice identifier
     * @param {string} inviteeEmail - Customer email
     * @param {boolean} communicate - Send email notification
     * @param {string|null} [inviteePhone] - Customer phone
     * @param {{indexid: number}|null} [saleName] - Sale nomenclature
     * @param {Session|null} [session] - Optional session
     */
    static create(
        callback,
        supplierId,
        amount,
        identifier,
        inviteeEmail,
        communicate,
        inviteePhone = null,
        saleName = null,
        session = null
    ) {
        const Self = PR_InstalmentLink;

        const payload = {
            'supplier_id': supplierId,
            'invoice_amount': amount.magnitude,
            'denomination': amount.denomination.indexid,
            'invoice_identifier': identifier,
            'invitee_email': inviteeEmail,
            'communicate': communicate,
            'nomenclature': saleName ? saleName.indexid : null,
            'invitee_phone': inviteePhone
        };

        PR_ApiRequest.make(
            PR_InstalmentLink.path,
            'POST',
            null,
            payload,
            (e, d) => { PR_Response.decode(e, d, callback, Self); },
            session
        );
    }
}

/**
 * Order-by options for instalment link queries
 * @extends PR_OrderBy
 */
export class PR_InstalmentLinkOrderBy extends PR_OrderBy {

    /** @type {PR_InstalmentLinkOrderBy} */
    static get CREATED() { return new PR_InstalmentLinkOrderBy('created'); }

    /** @type {PR_InstalmentLinkOrderBy} */
    static get default() { return PR_InstalmentLinkOrderBy.CREATED; }

    /** @type {PR_Order} */
    static get defaultOrder() { return PR_Order.DESCENDING; }

    /** @type {PR_InstalmentLinkOrderBy[]} */
    static get enumerations() {
        return [PR_InstalmentLinkOrderBy.CREATED];
    }

    /**
     * Find order-by by key
     * @param {string} key
     * @returns {PR_InstalmentLinkOrderBy}
     */
    static withKey(key) {
        return PR_OrderBy.withKey(key, PR_InstalmentLinkOrderBy.enumerations);
    }
}
