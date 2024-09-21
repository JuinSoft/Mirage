const schema = {
    schemaId: "0x274",
    fullSchemaId: "onchain_evm_11155111_0x274",
    description: "Decentralized email attestation service",
    createdAt: "September 22, 2024 04:55:12",
    maximumValidTimeframe: "No maximum time set",
    createdBy: "0xa7ccFF0d009999f67f609A7089a0941e0e2e08B5",
    network: "Sepolia",
    dataLocation: "Sepolia",
    transactionId: "0x09b008aa1e02bab7370c90b3e4cf1711581ac25c08265ac8e69cc3a3f325e655",
    revocableAttestations: false,
    fields: [
        { name: "senderEmail", type: "string" },
        { name: "receiverEmail", type: "string" },
        { name: "senderAddress", type: "string" },
        { name: "receiverAddress", type: "string" },
        { name: "attestationStatus", type: "bool" },
        { name: "messageId", type: "string" },
        { name: "timestamp", type: "string" }
    ]
};

export default schema;