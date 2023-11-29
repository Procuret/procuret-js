/* Procuret JS - API error class */

const PR_ERROR_INFO_KEY = 'error-information';
const PR_ERROR_CUSTOMER_INFORMATION = {
    400: "Procuret's servers could not understand the information sent by \
    your device. This likely indicates a bug in our application. Our support \
    team has been notified automatically, but please feel free to contact \
    us at support@procuret.com",
    500: "Procuret's servers encountered an error when processing information \
    sent by your device. There may be a bug in our systems, or they may be \
    experiencing a temporary service disruption. Our support team has been \
    notified automatically.",
    503: "Procuret's servers encountered a service disruption while processing \
    your request. This error may disappear if you try again in a few moments. \
    Our support team has been notified automatically. If this error persists, \
    please write to us at support@procuret.com.",
    401: "Procuret's servers could not identify you when processing \
    data sent by your device. This likely indicates a bug has crept into \
    our application. Please contact us at support@procuret.com.",
    403: "You don't appear to be authorised to perform the action you \
    were attempting.  This likely indicates a bug has crept into \
    our application. Please contact us at support@procuret.com.",
    429: "Procuret's servers have noticed unusually high activity levels \
    from your device or the network it is connected to. Please try again in \
    few minutes. If you continue to see this message, please contact \
    support@procuret.com",
    404: "Procuret's servers were unable to find a resource needed to \
    serve your request. This likely indicates a bug in our application. Our \
    support team has been notified automatically, but please feel free to \
    contact us at support@procuret.com",
    422: "Procuret was unable to process your request, due to a problem with \
the information sent by your device."
}
const PR_ERROR_FALLBACK_INFORMATION = "Procuret has encountered an error. There \
may be a bug in our systems, or they may be experiencing a temporary \
disruption. We will \
attempt to resolve the problem as quickly as possible";

class PR_ApiError extends Error {

    static get genericDescription() { return PR_ERROR_FALLBACK_INFORMATION; }

    constructor(
        code,                     // Integer
        data=null,                // Optional<Object>
        requestSummary=null       // Optional<Object> (Untyped)
    ) {

        const description = PR_ERROR_CUSTOMER_INFORMATION[code];
        let techInfo = (() => { 
            if (code != 0) { return 'Generic ' + String(code); }
            return 'Client side error';
        })();
        if (
            typeof(data) != 'undefined'
            && data != null
            && data[PR_ERROR_INFO_KEY]
        ) {
            techInfo = data[PR_ERROR_INFO_KEY];
        }
        const logMessage = 'API error (' + code + '), ' + techInfo;
        super(logMessage);

        const self = this;

        self._code = code;
        self._customerDescription = description
            || PR_ERROR_FALLBACK_INFORMATION;
        self._technicalDescription = techInfo;
        self._requestSummary = requestSummary;

        return

    }

    get code() { return this._code }
    get customerDescription() { return this._customerDescription }
    get technicalDescription() { return this._technicalDescription }


}
