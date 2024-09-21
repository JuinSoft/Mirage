import { BigNumber, Contract, ethers } from "ethers";
import schema from "../config/schema";
const { SignProtocolClient, SpMode, EvmChains } = require("@ethsign/sp-sdk");

const client = new SignProtocolClient(SpMode.OnChain, {
    chain: EvmChains.sepolia,
});

async function createEmailAttestation(senderEmail="not required", receiverEmail, senderAddress, receiverAddress, attestationStatus, messageId, timestamp, signer) {
    const res = await client.createAttestation({
        schemaId: schema.schemaId,
        data: {
            senderEmail,
            receiverEmail,
            senderAddress,
            receiverAddress,
            attestationStatus,
            messageId,
            timestamp
        },
        indexingValue: signer.toString().toLowerCase()
    });

    if(res.attestationId){
        console.log("Email attestation created successfully: ", res.attestationId)
        return true
    }
    else{
        console.log("Error creating email attestation: ", res.error)
        return false
    }
}

import axios from "axios";

// requests to the Sign Protocol Indexing Service
async function makeAttestationRequest(endpoint, options) {
  const url = `https://testnet-rpc.sign.global/api/${endpoint}`;
  const res = await axios.request({
    url,
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    ...options,
  });
  // Throw API errors
  if (res.status !== 200) {
    throw new Error(JSON.stringify(res));
  }
  // Return original response
  return res.data;
}

async function queryAttestations(attester, indexingValue) {
    const response = await makeAttestationRequest("index/attestations", {
      method: "GET",
      params: {
        mode: "onchain", // Data storage location
        schemaId: schema.fullSchemaId, // schema ID
        attester: attester, // attester address
        indexingValue: indexingValue.toLowerCase(), // indexing value
      },
    });
  
    if (!response.success) {
      return {
        success: false,
        message: response?.message ?? "Attestation query failed.",
      };
    }
  
    // Return a message if no attestations are found.
    if (response.data?.total === 0) {
      return {
        success: false,
        message: "No attestation for this address found.",
      };
    }
  
    // Return all attestations that match our query.
    return {
      success: true,
      attestations: response.data.rows,
    };
}

export { createEmailAttestation, queryAttestations };