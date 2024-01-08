/* A theoretical payment amount, and the number of months over which that
payment would be made, if a customer successfully applied for a Procuret
Instalment Plan */
class PR_ProspectivePayment {

    static get path() { return '/credit/prospective-payment'; }
    static get listPath() { return PR_ProspectivePayment.path + '/list'; }

    constructor(
        payment,     // String (String encoded decimal number)
        rawCycle,    // Number (Integer)
        supplierId,  // String
        periods,     // Number (Integer)
        currency     // PR_Currency
    ) {

        this._payment = payment;
        this._rawCycle = rawCycle;
        this._supplierId = supplierId;
        this._periods = periods;
        this._currency = currency;
    
        return;
    }

    // Number (The number of months over which payment would be made)
    get periods() { return this._periods; }

    // PR_Amount (The monthly payment amount)
    get amount() {
        return new PR_Amount(
            this._payment,
            this._currency
        );
    }

    // The supplier for which this PR_ProspectivePayment is valid
    get supplierId() { return this._supplierId; }

    static decode(data) {
        return new PR_ProspectivePayment(
            data['payment'],
            data['cycle'],
            data['supplier_id'],
            data['periods'],
            PR_Currency.decode(data['currency'])
        );
    }

    /*
    Retrieve a single PR_ProspectivePayment for given parameters. To use this
    method, you must know a valid months value in advance. If you don't know a
    valid months value in advance, prefer .retrieveAllAvailable.
    */
    static retrieve(
        callback,     // Function<Error?, PR_ProspectivePayment?>
        principal,    // String - A number, the prospective loan princpal
        supplierId,   // String - A string-encoded 64-bit integer
        denomination, // PR_Currency - The loan principal denomination
        months,       // Number - integer number of months over which to pay
        endpoint=null,// Optional<String> - override the Procuret API endpoint
        session=null  // Optional<Session> (not required in this context)
    ) {

        try {

            const targets = [
                new PR_QueryTerm('cycle', 1),  // in advance
                new PR_QueryTerm('supplier_id', supplierId),
                new PR_QueryTerm('principle', principal),
                new PR_QueryTerm('periods', months),
                new PR_QueryTerm('denomination', denomination.indexid)
            ];
    
            const parameters = new PR_QueryString(targets);
    
            PR_ApiRequest.make(
                PR_ProspectivePayment.path,
                'GET',
                parameters,
                null,
                (error, data) => {
                    if (error != null) { callback(error, null); return; }
                    callback(null, PR_ProspectivePayment.decode(data));
                    return;
                },
                session,
                endpoint,
                null,
                true   // optionalAuth
            );
        
        } catch(error) {

            callback(error, null);

        }

        return;

    }

    /*
    Retrieve all available PR_ProspectivePayment for given parameters. This is
    a convenient way to display all potential instalment plan payment amounts
    to a potential applicant.
    */
    static retrieveAllAvailable(
        callback,     // Function<Error?, Array<ProspectivePayment>?>
        principal,    // String - A number, the prospective loan principal
        denomination, // PR_Currency - The principal denomination
        supplierId,   // String - a String-encoded 64-bit integer
        endpoint=null,// Optional<String> - override the Procuret API endpoint
        session=null  // Optional<Session> (not required in this context)
    ) {

        try {

            const targets = [
                new PR_QueryTerm('cycle', 1),  // in advance
                new PR_QueryTerm('supplier_id', supplierId),
                new PR_QueryTerm('principal_magnitude', principal),
                new PR_QueryTerm('denomination', denomination.indexid)
            ]

            const parameters = new PR_QueryString(targets);

            PR_ApiRequest.make(
                PR_ProspectivePayment.listPath,
                'GET',
                parameters,
                null,
                (error, data) => {
                    if (error != null) { callback(error, null); return; }
                    callback(
                        null,
                        data.map((d) => {
                            return PR_ProspectivePayment.decode(d);
                        })
                    );
                    return;
                },
                session,
                endpoint,
                null,
                true     // optionalAuth
            );

        } catch(error) {

            callback(error, null);

        }

        return;

    }

}
