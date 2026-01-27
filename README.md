# Procuret JS SDK

Official JavaScript SDK for the Procuret API. Retrieve instalment plan pricing, create payment links, and integrate Procuret into your e-commerce platform.

## Installation

```bash
npm install procuret-js
```

**Requirements:** Node.js 20+ (for Node.js usage) or any modern browser.

## Quick Start

### ES Modules (Recommended)

```javascript
import { PR_ProspectivePayment, PR_Currency } from 'procuret-js';

PR_ProspectivePayment.retrieveAllAvailable(
    (error, payments) => {
        if (error) {
            console.error('Error:', error);
            return;
        }

        payments.forEach(payment => {
            console.log(`${payment.periods} months: ${payment.amount.asDenominatedString}/month`);
        });
    },
    '1000',              // Principal amount
    PR_Currency.AUD,     // Currency
    'YOUR_SUPPLIER_ID'   // Your Procuret Supplier ID
);
```

### CommonJS

```javascript
const { PR_ProspectivePayment, PR_Currency } = require('procuret-js');

// Same API as above
```

### Browser (Script Tag)

```html
<script src="https://unpkg.com/procuret-js/dist/procuret.browser.js"></script>
<script>
    // Classes are available globally
    PR_ProspectivePayment.retrieveAllAvailable(
        (error, payments) => {
            if (error) { alert('Error: ' + error.message); return; }
            console.log('Available payments:', payments);
        },
        '1000',
        PR_Currency.AUD,
        'YOUR_SUPPLIER_ID'
    );
</script>
```

## API Reference

### PR_ProspectivePayment

Calculate theoretical instalment payments for a given principal amount.

#### `.retrieve(callback, principal, supplierId, denomination, months, [endpoint], [session])`

Retrieve a single payment option for a specific term length.

```javascript
PR_ProspectivePayment.retrieve(
    (error, payment) => {
        if (error) { console.error(error); return; }
        console.log(`Monthly payment: ${payment.amount.asSymbolisedString}`);
    },
    '600',                // Principal: $600
    'YOUR_SUPPLIER_ID',
    PR_Currency.AUD,
    12                    // 12 months
);
```

#### `.retrieveAllAvailable(callback, principal, denomination, supplierId, [endpoint], [session])`

Retrieve all available payment terms for a principal amount.

```javascript
PR_ProspectivePayment.retrieveAllAvailable(
    (error, payments) => {
        if (error) { console.error(error); return; }

        // Display all options to customer
        payments.forEach(p => {
            console.log(`${p.periods} months: ${p.amount.asDenominatedString}`);
        });
    },
    '1500',
    PR_Currency.AUD,
    'YOUR_SUPPLIER_ID'
);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `periods` | `number` | Number of monthly payments |
| `amount` | `PR_Amount` | Monthly payment amount |
| `supplierId` | `string` | Supplier ID this quote is valid for |

---

### PR_Currency

Monetary currency enumeration.

```javascript
import { PR_Currency } from 'procuret-js';

// Available currencies
PR_Currency.AUD  // Australian Dollar
PR_Currency.NZD  // New Zealand Dollar

// All available currencies
PR_Currency.allAvailable  // [PR_Currency.AUD, PR_Currency.NZD]

// Lookup by ID
PR_Currency.withId(1)  // PR_Currency.AUD
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `indexid` | `number` | Unique identifier |
| `iso_4217` | `string` | ISO 4217 code (e.g., 'AUD') |
| `name` | `string` | Full name (e.g., 'Australian Dollar') |
| `symbol` | `string` | Currency symbol (e.g., '$') |
| `exponent` | `number` | Decimal places (e.g., 2) |

---

### PR_Amount

Monetary amount with magnitude and currency.

```javascript
import { PR_Amount, PR_Currency } from 'procuret-js';

const amount = new PR_Amount('1234.56', PR_Currency.AUD);

amount.magnitude           // '1234.56'
amount.denomination        // PR_Currency.AUD
amount.asNumber            // 1234.56
amount.asLocaleString      // '1,234.56'
amount.asSymbolisedString  // '$1,234.56'
amount.asDenominatedString // 'AUD 1,234.56'
amount.isGreaterThanZero   // true

// Round to decimal places
amount.rounded(0).magnitude  // '1235'
```

---

### PR_InstalmentLink

Create and manage payment links for customers.

#### `.create(callback, supplierId, amount, identifier, inviteeEmail, communicate, [inviteePhone], [saleName], [session])`

```javascript
import { PR_InstalmentLink, PR_Amount, PR_Currency } from 'procuret-js';

const amount = new PR_Amount('2500', PR_Currency.AUD);

PR_InstalmentLink.create(
    (error, link) => {
        if (error) { console.error(error); return; }
        console.log('Link created:', link.publicId);
    },
    123456,                    // Supplier ID
    amount,                    // Invoice amount
    'INV-2024-001',           // Invoice identifier
    'customer@example.com',   // Customer email
    true                      // Send email notification
);
```

#### `.retrieve(publicId, callback, [session])`

```javascript
PR_InstalmentLink.retrieve(
    'abc123',
    (error, link) => {
        if (error) { console.error(error); return; }
        console.log('Invoice:', link.invoiceIdentifier);
        console.log('Amount:', link.amount.asDenominatedString);
        console.log('Opened:', link.hasBeenOpened);
    }
);
```

#### Properties

| Property | Type | Description |
|----------|------|-------------|
| `publicId` | `string` | Unique link identifier |
| `supplier` | `PR_EntityHeadline` | Supplier information |
| `created` | `PR_Time` | Creation timestamp |
| `invoiceAmount` | `string` | Invoice amount (raw) |
| `amount` | `PR_Amount` | Invoice amount with currency |
| `invoiceIdentifier` | `string` | Your invoice reference |
| `inviteeEmail` | `string \| null` | Customer email |
| `hasBeenOpened` | `boolean` | Whether link was opened |
| `openCount` | `number` | Number of times opened |

---

## TypeScript Support

Full TypeScript definitions are included. Import types directly:

```typescript
import {
    PR_ProspectivePayment,
    PR_Currency,
    PR_Amount,
    Session
} from 'procuret-js';

const session: Session = {
    apiKey: 'your-api-key',
    sessionId: 'your-session-id'
};

PR_ProspectivePayment.retrieve(
    (error: Error | null, payment: PR_ProspectivePayment | null) => {
        if (payment) {
            const amount: PR_Amount = payment.amount;
            console.log(amount.asDenominatedString);
        }
    },
    '1000',
    'supplier-id',
    PR_Currency.AUD,
    12,
    null,
    session
);
```

---

## Node.js Support

The SDK works in both browser and Node.js environments. Environment detection is automatic.

```javascript
// Works the same in Node.js
import { PR_ProspectivePayment, PR_Currency } from 'procuret-js';

// For custom HTTP handling (e.g., testing), you can inject a custom client:
import { setHttpClient, HttpClient } from 'procuret-js';

class CustomHttpClient extends HttpClient {
    request(method, url, headers, body, callback) {
        // Your custom implementation
    }
}

setHttpClient(new CustomHttpClient());
```

---

## Distribution Formats

| Format | File | Use Case |
|--------|------|----------|
| ES Module | `dist/procuret.js` | Modern bundlers, Node.js 20+ |
| CommonJS | `dist/procuret.cjs` | Older Node.js, require() |
| Browser IIFE | `dist/procuret.browser.js` | `<script>` tags |
| Minified | `dist/procuret.min.js` | Production browser use |

---

## Development

### Building

```bash
npm install
npm run build
```

### Testing

```bash
npm test              # Run tests once
npm run test:watch    # Watch mode
npm run test:coverage # With coverage report
```

### Legacy Tools

The original Python build tools are preserved in `legacy/tools/` for reference.

---

## Error Handling

All API methods use Node.js-style callbacks: `(error, result) => void`

```javascript
PR_ProspectivePayment.retrieve(
    (error, payment) => {
        if (error) {
            // Handle error
            if (error instanceof PR_ApiError) {
                console.log('HTTP Status:', error.code);
                console.log('User message:', error.customerDescription);
                console.log('Technical:', error.technicalDescription);
            } else {
                console.log('Error:', error.message);
            }
            return;
        }

        // Success - use payment
        console.log(payment.amount.asDenominatedString);
    },
    // ... other parameters
);
```

---

## Support

- **Documentation:** Contact your Procuret partnership manager
- **Email:** hello@procuret.com
- **Issues:** [GitHub Issues](https://github.com/Procuret/procuret-js/issues)

---

## License

MIT License - see [LICENSE](LICENSE) for details.

Copyright 2023-2024 Procuret Operating Pty Ltd
