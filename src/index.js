/* Procuret JS - Main Entry Point */

// Version (injected at build time)
export const PR_VERSION = __VERSION__;

// HTTP client (universal browser/Node.js support)
export {
    HttpClient,
    BrowserHttpClient,
    NodeHttpClient,
    createHttpClient,
    getHttpClient,
    setHttpClient
} from './http/client.js';

// Ancillary types (infrastructure)
export { PR_Enumeration } from './ancillary/enumeration.js';
export { PR_Order } from './ancillary/order.js';
export { PR_OrderBy } from './ancillary/order_by.js';
export { PR_Disposition } from './ancillary/disposition.js';
export { PR_Time } from './ancillary/time.js';
export { PR_QueryTerm } from './ancillary/query_term.js';
export { PR_QueryString } from './ancillary/query_string.js';
export { PR_ApiError, PR_ERROR_INFO_KEY, PR_ERROR_CUSTOMER_INFORMATION, PR_ERROR_FALLBACK_INFORMATION } from './ancillary/error.js';
export { PR_Response } from './ancillary/response.js';
export { PR_ApiRequest } from './ancillary/request.js';
export { PR_Amount } from './ancillary/amount.js';

// Library types (business logic)
export { PR_Currency } from './library/currency.js';
export { PR_EntityHeadline } from './library/entity_headline.js';
export { PR_InstalmentLinkOpen } from './library/instalment_link_open.js';
export { PR_InstalmentLink, PR_InstalmentLinkOrderBy } from './library/instalment_link.js';
export { PR_ProspectivePayment } from './library/prospective_payment.js';
