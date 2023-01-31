/* Procuret JS - Response Type */


class PR_Response {

    static decode(
        error,      // Error?
        data,       // Object?
        callback,   // Function(Error?, T?)
        outputType  // T<Having .decode(:Object<String: Any>) method>
    ) {
        let result = null;
        if (error != null) { callback(error, null); return; }
        if (!data) { callback(null, null); return; }
        try { result = outputType.decode(data); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
        return;
    }

    static decodeMany(
        error,      // Error?
        data,       // Array<Object>?
        callback,   // Function(Error?, T?)
        outputType  // T<Having .decode(:Object) method> 
    ) {

        let result = null;
        if (error != null) { callback(error, null); return; }
        if (data == null) { callback(null, null); return; }
        try { result = data.map((d) => { return outputType.decode(d); }); }
        catch (error) { callback(error, null); return; }
        callback(null, result);
        return;

    }
 
}