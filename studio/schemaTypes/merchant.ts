import { defineField, defineType } from 'sanity'

export default defineType({
    name: 'merchant',
    title: 'Merchant',
    type: 'document',
    fields: [
        defineField({
            name: 'name',
            title: 'Merchant Name',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'tin',
            title: 'TIN (Taxpayer Identification Number)',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'taxCenter',
            title: 'Tax Center / Branch',
            type: 'string',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'status',
            title: 'Status',
            type: 'string',
            options: {
                list: [
                    { title: 'Active', value: 'active' },
                    { title: 'Inactive', value: 'inactive' },
                ],
                layout: 'radio',
            },
            initialValue: 'active',
            validation: (Rule) => Rule.required(),
        }),
        defineField({
            name: 'phone',
            title: 'Phone',
            type: 'string',
        }),
        defineField({
            name: 'address',
            title: 'Address',
            type: 'text',
            rows: 2,
        }),
        defineField({
            name: 'notes',
            title: 'Notes',
            type: 'text',
            rows: 3,
        }),
    ],
    preview: {
        select: {
            title: 'name',
            subtitle: 'tin',
            status: 'status',
        },
        prepare({ title, subtitle, status }) {
            return {
                title: title,
                subtitle: `${subtitle} • ${status?.toUpperCase()}`,
            }
        },
    },
})
