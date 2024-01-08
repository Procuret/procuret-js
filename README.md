# Introduction

Procuret API JavaScript (PJS) allows you to perform Procuret API operations in
JavaScript code. For example, you might like to look up the prices of Procuret
Instalment Plan products, and present them to customers in your e-commerce
software.

The only dependency PJS requires is a "typical" browser-like environment.
That is, it must run in an environment that has browser-like APIs available,
such as `XMLHTTPRequest`. This might be a literal web browser, or a browser
derivative like NodeJS.

PJS is provided as raw JavaScript files which you can manually package as you
see fit. For example, you might copy and paste relevant files for your use
case and include them in your software. You can also use included Python tools
to package PJS for include in HTML documents or for provision via a web server.
(See "Packaging Tools" below.)

Tests are provided for verification of functionality.

## Versioning and public interfaces

PJS follows [Semantic Versioning](https://semver.org) conventions. At any time,
the repository may included an undocumented type in the `source` directory.
These types should be considered unavailable and their function is not
guaranteed.

# Available Types

## `PR_ProspectivePayment`

A theoretical payment amount, and the number of months over which that payment
would be made, if an applicant successfully applied for a Procuret Instalment
Plan.

### Properties

- `.periods` - `Number` - The number of months over which payment would be made
- `.amount` - `PR_Amount` - The monthly payment amount
- `.supplierId` - `String` - The ID of the Procuret supplier for which this
price is valid.

### Static Methods

#### .retrieve

Retrieve a single `PR_ProspectivePayment` for given parameters. To use this
method, you must know a valid `months` value in advance. If you don't know
a valid `months` value in advance, prefer `.retrieveAllAvailable`.

##### Parameters

1. `callback` - `Function<Error?, PR_ProspectivePayment?>` - A function taking
optional error and result parameters, in which you can handle the API response.
2. `principal` - `String` - A string-encoded number representing the principal
value of the prospective loan. For example, a total invoice value. Minimum
value `500` currency units.
3. `supplierId` - `String` - Your Supplier ID. Consult your Procuret
partnership manager if you are unsure of this value.
4. `denomination` - `PR_Currency` - The monetary denomination of the `principal`
value.
5. `months` - `Number` - The integer number of months over which the instalment
plan would be paid.
6. `endpoint` - `Optional<String>` - Optionally override the API endpoint.
Useful in testing a demonstration environments.
7. [undocumented, do not use, do not provide a value]

##### Example Usage

```javascript
PR_ProspectivePayment.retrieve(
    (error, prospectivePayment) => {
    
        if (error) { console.log('An error occurred'); return; }
    
        console.log('A successful applicant would pay \
' + payment.amount.asDenominatedString + ' per month');

        return;

    },
    "600",            // $600
    "511291212",      // some Supplier ID
    PR_Currency.AUD,  // Australian dollars
    12                // 12 months
);
```

#### .retrieveAllAvailable

Retrieve all available `PR_ProspectivePayment` for given parameters. This is
a convenient way to display all potential instalment plan payment amounts to
a potential applicant.

##### Parameters

1. `callback` - `Function<Error?, PR_ProspectivePayment?>` - A function taking
optional error and result parameters, in which you can handle the API response.
2. `principal` - `String` - A string-encoded number representing the principal
value of the prospective loan. For example, a total invoice value. Minimum
value `500` currency units.
3. `denomination` - `PR_Currency` - The monetary denomination of the `principal`
value.
4. `supplierId` - `String` - Your Supplier ID. Consult your Procuret
partnership manager if you are unsure of this value.
5. `endpoint` - `Optional<String>` - Optionally override the API endpoint.
Useful in testing a demonstration environments.
6. [undocumented, do not use, do not provide a value]

##### Example Usage

```javascript
PR_ProspectivePayment.retrieveAllAvailable(
    (error, availablePayments) => {

        if (error) { console.log('An error occurred'); return; }
        
        const availablePayments = payments.map((p) => {
            return p.amount.asDenominatedString
        });

        console.log('Applicants may choose from the following payments \
' + availablePayments);

        return;
    
    },
    "600",            // $600
    PR_Currency.AUD,  // Australian dollars
    "511291212",      // some Supplier ID
    12                // 12 months
);
```
---
## `PR_Currency`

A unit of monetary denomination

### Properties

- `iso_4217` - `String` - The ISO 4217 code of this currency
- `symbol` - `String` - The common-use symbol for this currency
- `exponent` - `Number` - The integer exponent of the currency's subunits
- `name` - `String` - The full-form name of this currency
- `indexid` - `Number` - A unique integer identifier for the currency in the
Procure context

### Static Properties

- `.AUD` - `PR_Currency` - Australian dollars
- `.NZD` - `PR_Currency` - New Zealand dollars
- `.allAvailable` - `Array<PR_Currency>` - All available currencies

---
## `PR_Amount`

A monetary amount, a combination of magnitude and currency denomination

### Properties

- `asNumber` - `Number` - The amount magnitude cast to a JavaScript `Number`
- `asLocaleString` - `String` - A Locale-defined string representation
- `asSymbolisedString` - `String` - The amount prefixed by its currency symbol
- `asDenominatedString` - `String` - The amount prefixed by its ISO 4217 code
- `magnitude` - `String` - The undenominated magnitude of the amount
- `denomination` - `PR_Currency` - The denomination of the amount
- `isGreaterThanZero` - `Boolean` - `true` if the magnitude of the amount is
greater than zero, else `false`


# Packaging Tools

PJS includes built in Python tools for packaging. To compile the entire PJS
library into a single JavaScript file, invoke the following Python commands
from the `tools` directory:

```bash
$ cd tools
$ python3 compile.py
```

A `procuret.js` file will appear in the `tools` directory.

# Running Tests

PJS includes a built in test GUI.

<img width="1035" alt="Screenshot 2023-11-29 at 13 19 49" src="https://github.com/Procuret/procuret-js/assets/7691451/e7630153-663e-4454-9b18-aa0e062aab54">

To run the tests, first compile the test
tool:

```bash
$ cd tools
$ python3 compile_tests.py
```

A `test.html` document will appear in the `tools` directory. Serve `test.html`
from a web server, and then interact with the tool via a web browser. For
example, you can locally serve the tools directory using...

```bash
$ python3 -m http.server
```

... Whereupon the test tool is available at http://127.0.0.1:8000/test.html.

Note that you cannot open `test.html` in your browser from the file system
with a modern security-standards-compliant browser. All tests will fail due to browser's Cross-Origin-Resource-Sharing requirements being unmet.

# Get Help

To get help integrating PJS into your software, write to your Procuret
partnership manager, or write to our team at hello@procuret.com.
