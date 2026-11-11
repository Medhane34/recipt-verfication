import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'receipt',
    title: 'Receipt',
    type: 'document',
    fields: [
        defineField({
            name: 'merchant',
            title: 'Merchant',
            type: 'reference',
            to: [{ type: 'merchant' }],
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'receiptNumber',
            title: 'Receipt Number',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'uniqueToken',
            title: 'Unique Token (for QR Code)',
            type: 'string',
            description: 'Long unique ID used in the verification URL. Generate a random string (e.g. UUID or nanoid).',
            validation: (Rule) => Rule.required().min(16),
        }),
        defineField({
            name: 'receiptType',
            title: 'Receipt Type',
            type: 'string',
            initialValue: 'CASH SALES INVOICE/VAT',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'taxpayerTIN',
            title: 'Taxpayer TIN',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'taxpayerName',
            title: 'Taxpayer Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'taxCenter',
            title: 'Tax Center',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'vatId',
            title: 'VAT ID',
            type: 'string',
        }),
        defineField({
            name: 'vatNo',
            title: 'VAT No',
            type: 'string',
        }),
        defineField({
            name: 'printedBy',
            title: 'Printed By',
            type: 'string',
        }),
        defineField({
            name: 'issuedAt',
            title: 'Issued At',
            type: 'datetime',
            initialValue: () => new Date().toISOString(),
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Valid', value: 'valid' },
                    { title: 'Invalid', value: 'invalid' },
                    { title: 'Cancelled', value: 'cancelled' },
                ],
                layout: 'radio',
            },
            initialValue: 'valid',
            validation: (Rule) => Rule.required(),
        }),
        // Optional fields you can enable later
        // defineField({
        //   name: 'amount',
        //   title: 'Total Amount',
        //   type: 'number',
        // }),
    ],
    preview: {
        select: {
            title: 'receiptNumber',
            merchantName: 'merchant.name',
            status: 'status',
            issuedAt: 'issuedAt',
        },
        prepare({ title, merchantName, status, issuedAt }) {
            const date = issuedAt ? new Date(issuedAt).toLocaleDateString() : ''
            return {
                title: `Receipt #${title}`,
                subtitle: `${merchantName || 'No merchant'} • ${status?.toUpperCase()} • ${date}`,
            }
        },
    },
    orderings: [
        {
            title: 'Issued Date, New',
            name: 'issuedAtDesc',
            by: [{ field: 'issuedAt', direction: 'desc' }],
        },
    ],
})