import type { StructureResolver } from 'sanity/structure'

export const structure: StructureResolver = (S) =>
    S.list()
        .title('Content')
        .items([
            // ======================
            // MERCHANTS
            // ======================
            S.listItem()
                .title('Merchants')
                .schemaType('merchant')
                .child(
                    S.documentTypeList('merchant')
                        .title('Merchants')
                        .child((merchantId) =>
                            S.list()
                                .title('Merchant')
                                .items([
                                    // Edit the merchant itself
                                    S.listItem()
                                        .title('Merchant Details')
                                        .child(
                                            S.document()
                                                .schemaType('merchant')
                                                .documentId(merchantId)
                                        ),

                                    // Receipts belonging to this merchant
                                    S.listItem()
                                        .title('Receipts')
                                        .schemaType('receipt')
                                        .child(
                                            S.documentTypeList('receipt')
                                                .title('Receipts')
                                                .filter('_type == "receipt" && merchant._ref == $merchantId')
                                                .params({ merchantId })
                                                .canHandleIntent((intentName, params) =>
                                                    intentName === 'create' && params.type === 'receipt'
                                                )
                                                .initialValueTemplates([
                                                    S.initialValueTemplateItem('receipt-by-merchant', {
                                                        merchantId,
                                                    }),
                                                ])
                                        ),
                                ])
                        )
                ),

            S.divider(),

            // ======================
            // RECEIPTS (Filtered)
            // ======================
            S.listItem()
                .title('Receipts')
                .child(
                    S.list()
                        .title('Receipts')
                        .items([
                            // All Receipts
                            S.listItem()
                                .title('All Receipts')
                                .schemaType('receipt')
                                .child(
                                    S.documentTypeList('receipt')
                                        .title('All Receipts')
                                        .defaultOrdering([{ field: 'issuedAt', direction: 'desc' }])
                                ),

                            // Valid Receipts
                            S.listItem()
                                .title('Valid Receipts')
                                .schemaType('receipt')
                                .child(
                                    S.documentTypeList('receipt')
                                        .title('Valid Receipts')
                                        .filter('_type == "receipt" && status == "valid"')
                                        .defaultOrdering([{ field: 'issuedAt', direction: 'desc' }])
                                ),

                            // Invalid / Cancelled
                            S.listItem()
                                .title('Invalid / Cancelled')
                                .schemaType('receipt')
                                .child(
                                    S.documentTypeList('receipt')
                                        .title('Invalid / Cancelled')
                                        .filter('_type == "receipt" && status in ["invalid", "cancelled"]')
                                        .defaultOrdering([{ field: 'issuedAt', direction: 'desc' }])
                                ),

                            S.divider(),

                            // By Merchant (grouped view)
                            S.listItem()
                                .title('By Merchant')
                                .child(
                                    S.documentTypeList('merchant')
                                        .title('Receipts by Merchant')
                                        .child((merchantId) =>
                                            S.documentTypeList('receipt')
                                                .title('Receipts')
                                                .filter('_type == "receipt" && merchant._ref == $merchantId')
                                                .params({ merchantId })
                                                .defaultOrdering([{ field: 'issuedAt', direction: 'desc' }])
                                        )
                                ),
                        ])
                ),
        ])