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
    static get path(): string;
    /** @type {string} */
    static get listPath(): string;
    /**
     * Optionally decode from raw data
     * @param {Object|null|undefined} data
     * @returns {PR_InstalmentLink|null}
     */
    static optionallyDecode(data: any | null | undefined): PR_InstalmentLink | null;
    /**
     * Decode from raw data
     * @param {Object} data
     * @returns {PR_InstalmentLink}
     */
    static decode(data: any): PR_InstalmentLink;
    /**
     * Retrieve a single instalment link by public ID
     * @param {string} publicId - Link public ID
     * @param {function(Error|null, PR_InstalmentLink|null): void} callback
     * @param {Session|null} [session] - Optional session
     */
    static retrieve(publicId: string, callback: (arg0: Error | null, arg1: PR_InstalmentLink | null) => void, session?: Session | null): void;
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
    static retrieveMany(callback: (arg0: Error | null, arg1: PR_InstalmentLink[] | null) => void, limit?: number, offset?: number, order?: PR_Order, orderBy?: PR_InstalmentLinkOrderBy, textFragment?: string | null, opened?: boolean | null, supplierId?: string | null, session?: Session | null, publicId?: string | null, accessibleTo?: string | null): void;
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
    static create(callback: (arg0: Error | null, arg1: PR_InstalmentLink | null) => void, supplierId: number, amount: PR_Amount, identifier: string, inviteeEmail: string, communicate: boolean, inviteePhone?: string | null, saleName?: {
        indexid: number;
    } | null, session?: Session | null): void;
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
    constructor(publicId: string, supplier: PR_EntityHeadline, created: PR_Time | null, inviteeEmail: string | null, invoiceAmount: string, invoiceIdentifier: string, opens: PR_InstalmentLinkOpen[], disposition: PR_Disposition | null, saleName: number, allowEdit: boolean, denominationId: number);
    /** @type {string} */
    _publicId: string;
    /** @type {PR_EntityHeadline} */
    _supplier: PR_EntityHeadline;
    /** @type {PR_Time|null} */
    _created: PR_Time | null;
    /** @type {string|null} */
    _inviteeEmail: string | null;
    /** @type {string} */
    _invoiceAmount: string;
    /** @type {string} */
    _invoiceIdentifier: string;
    /** @type {PR_InstalmentLinkOpen[]} */
    _opens: PR_InstalmentLinkOpen[];
    /** @type {PR_Disposition|null} */
    _disposition: PR_Disposition | null;
    /** @type {number} */
    _saleName: number;
    /** @type {boolean} */
    _allowEdit: boolean;
    /** @type {number} */
    _denominationId: number;
    /** @type {string} */
    get publicId(): string;
    /** @type {PR_EntityHeadline} */
    get supplier(): PR_EntityHeadline;
    /** @type {PR_Time|null} */
    get created(): PR_Time | null;
    /** @type {string|null} */
    get inviteeEmail(): string | null;
    /** @type {string} */
    get invoiceAmount(): string;
    /** @type {string} */
    get invoiceIdentifier(): string;
    /** @type {PR_InstalmentLinkOpen[]} */
    get opens(): PR_InstalmentLinkOpen[];
    /** @type {PR_Disposition|null} */
    get disposition(): PR_Disposition | null;
    /** @type {number} */
    get saleName(): number;
    /** @type {boolean} */
    get allowEdit(): boolean;
    /** @type {number} */
    get denominationId(): number;
    /**
     * Currency denomination
     * @type {PR_Currency}
     */
    get denomination(): PR_Currency;
    /**
     * Whether link has been opened
     * @type {boolean}
     */
    get hasBeenOpened(): boolean;
    /**
     * Number of times opened
     * @type {number}
     */
    get openCount(): number;
    /**
     * Invoice amount with currency
     * @type {PR_Amount}
     */
    get amount(): PR_Amount;
}
/**
 * Order-by options for instalment link queries
 * @extends PR_OrderBy
 */
export class PR_InstalmentLinkOrderBy extends PR_OrderBy {
    /** @type {PR_InstalmentLinkOrderBy} */
    static get CREATED(): PR_InstalmentLinkOrderBy;
    /**
     * Find order-by by key
     * @param {string} key
     * @returns {PR_InstalmentLinkOrderBy}
     */
    static withKey(key: string): PR_InstalmentLinkOrderBy;
}
export type Session = {
    /**
     * - API key
     */
    apiKey: string;
    /**
     * - Session ID
     */
    sessionId: string;
};
import { PR_EntityHeadline } from './entity_headline.js';
import { PR_Time } from '../ancillary/time.js';
import { PR_InstalmentLinkOpen } from './instalment_link_open.js';
import { PR_Disposition } from '../ancillary/disposition.js';
import { PR_Currency } from './currency.js';
import { PR_Amount } from '../ancillary/amount.js';
import { PR_Order } from '../ancillary/order.js';
import { PR_OrderBy } from '../ancillary/order_by.js';
//# sourceMappingURL=instalment_link.d.ts.map