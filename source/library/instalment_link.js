/* Procuret JS - Instalment Link Type */


class PR_InstalmentLink {

    static get path() { return '/instalment-link'; }
    static get listPath() { return PR_InstalmentLink.path + '/list'; }

    constructor(
        publicId,          // String
        supplier,          // PR_EntityHeadline
        created,           // String encoded time
        inviteeEmail,      // Optional<String>
        invoiceAmount,     // String
        invoiceIdentifier, // String
        opens,             // Array<PR_InstalmentLinkOpen>
        disposition,       // Optional<PR_Disposition>
        saleName,          // Number (Integer)
        allowEdit,         // Boolean
        denominationId     // Number (Integer)
    ) {

        this._publicId = publicId;
        this._supplier = supplier;
        this._created = created;
        this._inviteeEmail = inviteeEmail;
        this._invoiceAmount = invoiceAmount;
        this._invoiceIdentifier = invoiceIdentifier;
        this._opens = opens;
        this._disposition = disposition;
        this._saleName = saleName;
        this._allowEdit = allowEdit;
        this._denominationId = denominationId;

        return;

    }

    get publicId() { return this._publicId; }
    get supplier() { return this._supplier; }
    get created() { return this._created; }
    get inviteeEmail() { return this._inviteeEmail; }
    get invoiceAmount() { return this._invoiceAmount; }
    get invoiceIdentifier() { return this._invoiceIdentifier; }
    get opens() { return this._opens; }
    get disposition() { return this._disposition; }
    get saleName() { return this._saleName; }
    get allowEdit() { return this._allowEdit; }
    get denominationId() { return this._denominationId; }

    get denomination() {
        return PR_Currency.withId(this._denominationId);
    }

    get hasBeenOpened() { return this._opens.length > 0; }
    get openCount() { return this._opens.length; }

    get amount() { return new Amount(
        this._invoiceAmount,
        this.denomination
    ); }

    static optionallyDecode(data) {
        if (!data) { return null; }
        return new PR_InstalmentLink(
            data['public_id'],
            PR_EntityHeadline.decode(data['supplier']),
            ProcuretTime.decode(data['created']),
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

    static decode(data) {
        const result = PR_InstalmentLink.optionallyDecode(data);
        if (!result) { throw Error('Unexpededly nil PR_InstalmentLink'); }
        return result;
    }

    static retrieve(
        publicId,      // String
        callback,      // Function<Error?, PR_InstalmentLink?> -> Void
        session=null   // Optional<Session>
    ) {

        PR_InstalmentLink.retrieveMany(
            (e, links) => {
                if (e) { callback(e, null); return; }
                if (!links) { callback(null, null); return; }
                callback(null, links[0]);
                return;
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

        return;

    }

    static retrieveMany(
        callback,           // Function<Error?, Array<PR_InstalmentLink>> -> Void
        limit=20,           // Integer
        offset=0,           // Integer
        order=PR_Order.DESCENDING,
        orderBy=PR_InstalmentLinkOrderBy.CREATED,
        textFragment=null,  // Optional<String>
        opened=null,        // Optional<Bool>
        supplierId=null,    // Optional<String>
        session=null,       // Optional<Session>
        publicId=null,      // Optional<String>
        accessibleTo=null   // Optional<String>
    ) {

        try {

            if (textFragment) { throw Error('text search not implemented'); }

            const Self = PR_InstalmentLink; const UP = PR_UrlParameter;
    
            const parameters = [
                new UP('limit', limit),
                new UP('offset', offset),
                new UP('order', order.key),
                new UP('order_by', orderBy.key)
            ]
    
            UP.compactPush('opened', opened, parameters);
            UP.compactPush('supplier_id', supplierId, parameters);
            UP.compactPush('public_id', publicId, parameters);
            UP.compactPush('accessible_to', accessibleTo, parameters);
    
            PR_ApiRequest.make(
                PR_InstalmentLink.listPath,
                'GET',
                new PR_UrlQueryString(parameters),
                null,
                (e, d) => { PR_Response.decodeMany(e, d, callback, Self); },
                session
            );
    
            return;
    

        } catch (error) { callback(error, null); return; }

        return;

    }

    static create(
        callback,            // Function<Error?, PR_InstalmentLink?>
        supplierId,          // Integer
        amount,              // Amount
        identifier,          // String
        inviteeEmail,        // String
        communicate,         // Bool
        inviteePhone=null,   // Optional<String>
        saleName=null,       // Optional<SaleNomenclature>
        session=null         // Optional<Session>
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
        }

        PR_ApiRequest.make(
            PR_InstalmentLink.path,
            'POST',
            null,
            payload,
            (e, d) => { PR_Response.decode(e, d, callback, Self); },
            session
        );

        return;
    }

}



class PR_InstalmentLinkOrderBy extends PR_OrderBy {

    static get CREATED() { return new PR_InstalmentLinkOrderBy('created'); }

    static get default() { return PR_InstalmentLinkOrderBy.CREATED; }
    static get defaultOrder() { return PR_Order.DESCENDING; }

    static get enumerations() { return [
        PR_InstalmentLinkOrderBy.CREATED,
    ]}

    static withKey(
        key  // String
    ) {  // -> PR_InstalmentLinkOrderBy
        return PR_OrderBy.withKey(key, PR_InstalmentLinkOrderBy.enumerations);
    }
}
