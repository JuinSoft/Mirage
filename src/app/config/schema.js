const schema = {
    schemaId: "0x26c",
    fullSchemaId: "onchain_evm_11155111_0x26c",
    description: "Decentralized email attestation service",
    createdAt: "September 22, 2024 03:15:36",
    maximumValidTimeframe: "No maximum time set",
    createdBy: "0xa7ccFF0d009999f67f609A7089a0941e0e2e08B5",
    network: "Sepolia",
    dataLocation: "Sepolia",
    transactionId: "0x2286662fe2975ab49d6c75b893ae8205d1b5c5d853e286ed041ff54f9f05c5d8",
    revocableAttestations: false,
    fields: [
        { name: "senderEmail", type: "string" },
        { name: "receiverEmail", type: "string" },
        { name: "senderAddress", type: "string" },
        { name: "receiverAddress", type: "string" },
        { name: "attestationStatus", type: "boolean" },
        { name: "messageId", type: "uint256" },
        { name: "timestamp", type: "string" }
    ]
};

export default schema;