import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { PR_InstalmentLink, PR_InstalmentLinkOrderBy } from '../../src/library/instalment_link.js';
import { PR_InstalmentLinkOpen } from '../../src/library/instalment_link_open.js';
import { PR_Currency } from '../../src/library/currency.js';
import { PR_Amount } from '../../src/ancillary/amount.js';
import { PR_Order } from '../../src/ancillary/order.js';
import { PR_ApiRequest } from '../../src/ancillary/request.js';

describe('PR_InstalmentLink', () => {
    describe('path constants', () => {
        it('should have correct path', () => {
            expect(PR_InstalmentLink.path).toBe('/instalment-link');
        });

        it('should have correct listPath', () => {
            expect(PR_InstalmentLink.listPath).toBe('/instalment-link/list');
        });
    });

    describe('decode', () => {
        const mockData = {
            public_id: 'abc123',
            supplier: {
                entity_id: '456',
                legal_entity_name: 'Test Supplier'
            },
            created: '2024-01-15T10:30:00Z',
            invitee_email: 'test@example.com',
            invoice_amount: '1000.00',
            invoice_identifier: 'INV-001',
            opens: [],
            disposition: null,
            sale_name: 1,
            allow_edit: true,
            denomination_id: 1
        };

        it('should decode instalment link data', () => {
            const link = PR_InstalmentLink.decode(mockData);

            expect(link.publicId).toBe('abc123');
            expect(link.invoiceAmount).toBe('1000.00');
            expect(link.inviteeEmail).toBe('test@example.com');
        });

        it('should decode supplier headline', () => {
            const link = PR_InstalmentLink.decode(mockData);

            expect(link.supplier.entityId).toBe('456');
            expect(link.supplier.legalEntityName).toBe('Test Supplier');
        });

        it('should decode created time', () => {
            const link = PR_InstalmentLink.decode(mockData);

            expect(link.created).not.toBeNull();
            expect(link.created.isoString).toBe('2024-01-15T10:30:00.000Z');
        });
    });

    describe('optionallyDecode', () => {
        it('should return null for falsy data', () => {
            expect(PR_InstalmentLink.optionallyDecode(null)).toBeNull();
            expect(PR_InstalmentLink.optionallyDecode(undefined)).toBeNull();
        });
    });

    describe('denomination', () => {
        it('should return currency by denomination_id', () => {
            const mockData = {
                public_id: 'abc123',
                supplier: { entity_id: '456', legal_entity_name: 'Test' },
                created: '2024-01-15T10:30:00Z',
                invitee_email: null,
                invoice_amount: '1000.00',
                invoice_identifier: 'INV-001',
                opens: [],
                disposition: null,
                sale_name: 1,
                allow_edit: true,
                denomination_id: 1
            };

            const link = PR_InstalmentLink.decode(mockData);

            expect(link.denomination.iso_4217).toBe('AUD');
        });
    });

    describe('amount', () => {
        it('should return PR_Amount from invoice amount and denomination', () => {
            const mockData = {
                public_id: 'abc123',
                supplier: { entity_id: '456', legal_entity_name: 'Test' },
                created: '2024-01-15T10:30:00Z',
                invitee_email: null,
                invoice_amount: '1000.00',
                invoice_identifier: 'INV-001',
                opens: [],
                disposition: null,
                sale_name: 1,
                allow_edit: true,
                denomination_id: 1
            };

            const link = PR_InstalmentLink.decode(mockData);
            const amount = link.amount;

            expect(amount).toBeInstanceOf(PR_Amount);
            expect(amount.magnitude).toBe('1000.00');
            expect(amount.denomination.iso_4217).toBe('AUD');
        });
    });

    describe('hasBeenOpened', () => {
        it('should return false when no opens', () => {
            const mockData = {
                public_id: 'abc123',
                supplier: { entity_id: '456', legal_entity_name: 'Test' },
                created: '2024-01-15T10:30:00Z',
                invitee_email: null,
                invoice_amount: '1000.00',
                invoice_identifier: 'INV-001',
                opens: [],
                disposition: null,
                sale_name: 1,
                allow_edit: true,
                denomination_id: 1
            };

            const link = PR_InstalmentLink.decode(mockData);

            expect(link.hasBeenOpened).toBe(false);
            expect(link.openCount).toBe(0);
        });

        it('should return true when has opens', () => {
            const mockData = {
                public_id: 'abc123',
                supplier: { entity_id: '456', legal_entity_name: 'Test' },
                created: '2024-01-15T10:30:00Z',
                invitee_email: null,
                invoice_amount: '1000.00',
                invoice_identifier: 'INV-001',
                opens: [
                    { sequence: 1, created: '2024-01-16T10:30:00Z' }
                ],
                disposition: null,
                sale_name: 1,
                allow_edit: true,
                denomination_id: 1
            };

            const link = PR_InstalmentLink.decode(mockData);

            expect(link.hasBeenOpened).toBe(true);
            expect(link.openCount).toBe(1);
        });
    });

    describe('create', () => {
        let originalMake;

        beforeEach(() => {
            originalMake = PR_ApiRequest.make;
        });

        afterEach(() => {
            PR_ApiRequest.make = originalMake;
        });

        it('should POST to correct endpoint', () => {
            const mockMake = vi.fn();
            PR_ApiRequest.make = mockMake;

            const amount = new PR_Amount('1000', PR_Currency.AUD);

            PR_InstalmentLink.create(
                () => {},
                123,
                amount,
                'INV-001',
                'test@example.com',
                true
            );

            expect(mockMake).toHaveBeenCalledWith(
                '/instalment-link',
                'POST',
                null,
                expect.objectContaining({
                    supplier_id: 123,
                    invoice_amount: '1000',
                    denomination: 1,
                    invoice_identifier: 'INV-001',
                    invitee_email: 'test@example.com',
                    communicate: true
                }),
                expect.any(Function),
                null
            );
        });
    });
});

describe('PR_InstalmentLinkOrderBy', () => {
    describe('CREATED', () => {
        it('should have created key', () => {
            expect(PR_InstalmentLinkOrderBy.CREATED.key).toBe('created');
        });
    });

    describe('default', () => {
        it('should return CREATED', () => {
            expect(PR_InstalmentLinkOrderBy.default.key).toBe('created');
        });
    });

    describe('defaultOrder', () => {
        it('should return DESCENDING', () => {
            expect(PR_InstalmentLinkOrderBy.defaultOrder.key).toBe('descending');
        });
    });

    describe('withKey', () => {
        it('should find by key', () => {
            const result = PR_InstalmentLinkOrderBy.withKey('created');
            expect(result.key).toBe('created');
        });

        it('should throw for unknown key', () => {
            expect(() => PR_InstalmentLinkOrderBy.withKey('unknown')).toThrow();
        });
    });
});

describe('PR_InstalmentLinkOpen', () => {
    describe('path', () => {
        it('should have correct path', () => {
            expect(PR_InstalmentLinkOpen.path).toBe('/instalment-link/open');
        });
    });

    describe('decode', () => {
        it('should decode open data', () => {
            const data = {
                sequence: 1,
                created: '2024-01-15T10:30:00Z'
            };

            const open = PR_InstalmentLinkOpen.decode(data);

            expect(open._sequence).toBe(1);
            expect(open._created).toBe('2024-01-15T10:30:00Z');
        });
    });

    describe('decodeMany', () => {
        it('should decode array of opens', () => {
            const data = [
                { sequence: 1, created: '2024-01-15T10:30:00Z' },
                { sequence: 2, created: '2024-01-16T10:30:00Z' }
            ];

            const opens = PR_InstalmentLinkOpen.decodeMany(data);

            expect(opens).toHaveLength(2);
            expect(opens[0]._sequence).toBe(1);
            expect(opens[1]._sequence).toBe(2);
        });
    });
});
