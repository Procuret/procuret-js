/* Procuret JS - API request Type */


class PR_ApiRequest {

    static get _KEY_HEADER() { return 'x-procuret-api-key' }
    static get _SESSION_ID_HEADER() { return 'x-procuret-session-id' }
    static get _JSON_HEADER() { return 'application/json;charset=UTF-8'; }
    static get _LIVE_ENDPOINT() { 'https://procuret.com/api' }
    static get _QUOTE_EXPRESSION() { new RegExp(
        /(\b\d{13,128}\b)(?!\.)(?!\/)(?!\%)(?!")(?!:)(?!-)/g
    ); }

    static make(
        path,                // String e.g. '/humans'
        method,              // String e.g. 'GET'
        parameters=null,     // Optional<PR_UrlQueryString>
        data=null,           // Object e.g. {'hello': 'world' } (optional)
        callback,            // Function(ApiError?, Data?),
        session=null,        // Optional Session
        apiEndpoint=null,    // Optional String
        withoutAuth=false,   // Boolean (send request with no authentication)
        optionalAuth=false,  // Boolean (send with or without auth)
        suppressError=false, // Do not send ErrorReport on failure
        doNotEscapeInt=false,// Do not attempt to escape 64 bit integers
        throwOnGet404=false  // Throw an error on 404 rather than return null
    ) {

        const Self = PR_ApiRequest;

        try {

            if (!path) { throw Error('Cannot make request to falsy path'); }
            if (['GET', 'UPDATE', 'DELETE', 'POST', 'PUT'].indexOf(
                method
            ) < 0) {
                throw Error('Method appears invalid: ' + method);
            }
    
            const throwOn404 = (() => {
                if (method != 'GET') { return true; }
                return throwOnGet404;
            })();
    
            const request = new XMLHttpRequest();
    
            const summary = {
                requestData: data ? JSON.stringify(data) : null,
                requestParameters: parameters,
                requestPath: path,
                requestMethod: method,
                suppressError: suppressError
            }
    
            request.onreadystatechange = () => {
                Self._parseResponse(
                    request,
                    callback,
                    summary,
                    doNotEscapeInt,
                    throwOn404
                );
                return;
            }
    
            const endpoint = Self._chooseApiEndpoint(apiEndpoint);
            const url = Self._buildUrl(
                path,
                parameters,
                endpoint
            );
    
            request.open(method, url, true);
    
            function applyAuth(
                session   // Optional<Session>
            ) {
                if (withoutAuth) { return; }
                const apiKey = Self._chooseApiKey(session, optionalAuth);
                const sessionId = Self._chooseSessionId(session, optionalAuth);
                if ((!apiKey || !sessionId) && optionalAuth) { return }
                request.setRequestHeader(Self._SESSION_ID_HEADER, sessionId);
                request.setRequestHeader(Self._KEY_HEADER, apiKey);
                return; 
            }
    
            Self._applyCookieOverride(path, request);
    
            applyAuth(session);
    
            if (data) {
                request.setRequestHeader('content-type', Self._JSON_HEADER);
                request.send(JSON.stringify(data));
            } else {
                request.send();
            }
    
            return;
    

        } catch(error) { callback(error, null); return; }

    }

    static integerSafeJSONParse(string) {
        const quotedBody = string.replace(
            QUOTE_EXPRESSION,
            '\"$&\"'
        );
        return JSON.parse(quotedBody);
    }

    static _buildUrl(
        path,          // String
        parameters,    // PR_UrlQueryString
        apiEndpoint    // String
    ) {
        const base = apiEndpoint + path;
        if (parameters) { return base + parameters.query; }
        return base;
    }

    static _parseResponse(
        request,
        callback,
        summary,
        doNotEscapeInt,
        throwOn404
    ) {

        const state = request.readyState;
        const status = request.status;
        const Self = PR_ApiRequest;

        if (state === 4 && status === 200) {
            let result = null;
            try {
                const rawText = request.responseText;
                if (doNotEscapeInt) { result = JSON.parse(rawText); }
                else { result = Self.integerSafeJSONParse(rawText); }
            } catch(error) {
                callback(error, null);
                return;
            }

            callback(null, result);
            return;

        } else if (state === 4 && status === 404) {

            if (!throwOn404) { callback(null, null); return; }

            let errorContent = null;

            try {
                errorContent = Self.integerSafeJSONParse(request.responseText);
            } catch (error) {
                const e = new ApiError(
                    status,
                    null,
                    summary
                );
                e.dispatchEvent();
                callback(e, null);
                return
            }

            const error = new ApiError(status, errorContent, summary);
            error.dispatchEvent();
            callback(error, null);

            return;

        } else if (state === 4 && status !== 200 ) {

            let errorContent = null;

            try {
                errorContent = Self.integerSafeJSONParse(request.responseText);
            } catch (error) {
                const e = new ApiError(
                    status,
                    null,
                    summary
                );
                e.dispatchEvent();
                callback(e, null);
                return
            }

            const error = new ApiError(status, errorContent, summary);
            error.dispatchEvent();
            callback(error, null);
            return;
        }

        return;

    }

    static _chooseApiKey(override, optionalAuth=false) {
        if (override) { return override.apiKey; }
        if (optionalAuth) { return null; }
        throw Error('No API Key available. Supply Session instance to PR_ApiRe\
quest.make()');
    }

    static _chooseSessionId(override, optionalAuth=false) {
        if (override) { return override.sessionId; }
        if (optionalAuth) { return null; }
        throw Error('No Session ID available. Supply Session instance to PR_Ap\
iRequest.make()');
    }

    static _chooseApiEndpoint(override) {
        if (override) { return override; }
        return PR_ApiRequest._LIVE_ENDPOINT;
    }

}
