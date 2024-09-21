const senderContract = {
    name: "Sender",
    address: "0xBb95A888B4EBF96f8A7279Ea7A49A69cd4b12Ac9",  // Deployed on Avalanche Fuji
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_link",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usdcToken",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "AmountIsZero",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidDestinationChain",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidGasLimit",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidLinkToken",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidReceiverAddress",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidRouter",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidUsdcToken",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "NoGasLimitOnDestinationChain",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "NoReceiverOnDestinationChain",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "currentBalance",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "calculatedFees",
                    "type": "uint256"
                }
            ],
            "name": "NotEnoughBalance",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NothingToWithdraw",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "uint64",
                    "name": "destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "receiver",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "beneficiary",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "feeToken",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "fees",
                    "type": "uint256"
                }
            ],
            "name": "MessageSent",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_destinationChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "deleteReceiverForDestinationChain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "name": "s_gasLimits",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "name": "s_receivers",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_beneficiary",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "sendMessagePayLINK",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "uint256",
                    "name": "_gasLimit",
                    "type": "uint256"
                }
            ],
            "name": "setGasLimitForDestinationChain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_destinationChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_receiver",
                    "type": "address"
                }
            ],
            "name": "setReceiverForDestinationChain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_beneficiary",
                    "type": "address"
                }
            ],
            "name": "withdrawLinkToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_beneficiary",
                    "type": "address"
                }
            ],
            "name": "withdrawUsdcToken",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
};

const receiverContract = {
    name: "Receiver",
    address: "0xDdb519279A8F567375aC9fC46a69F32F49E32150",  // Deployed on Ethereum Sepolia
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_router",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_usdcToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "_staker",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "CallToStakerFailed",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "router",
                    "type": "address"
                }
            ],
            "name": "InvalidRouter",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidSenderAddress",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidSourceChain",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidStaker",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidUsdcToken",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                }
            ],
            "name": "MessageNotFailed",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NoReturnDataExpected",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "sourceChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "NoSenderOnSourceChain",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "OnlySelf",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "usdcToken",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "receivedToken",
                    "type": "address"
                }
            ],
            "name": "WrongReceivedToken",
            "type": "error"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "sourceChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "WrongSenderForSourceChain",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "reason",
                    "type": "bytes"
                }
            ],
            "name": "MessageFailed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "indexed": true,
                    "internalType": "uint64",
                    "name": "sourceChainSelector",
                    "type": "uint64"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "sender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                },
                {
                    "indexed": false,
                    "internalType": "address",
                    "name": "token",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "tokenAmount",
                    "type": "uint256"
                }
            ],
            "name": "MessageReceived",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                }
            ],
            "name": "MessageRecovered",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferRequested",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "OwnershipTransferred",
            "type": "event"
        },
        {
            "inputs": [],
            "name": "acceptOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "messageId",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint64",
                            "name": "sourceChainSelector",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes",
                            "name": "sender",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Client.EVMTokenAmount[]",
                            "name": "destTokenAmounts",
                            "type": "tuple[]"
                        }
                    ],
                    "internalType": "struct Client.Any2EVMMessage",
                    "name": "any2EvmMessage",
                    "type": "tuple"
                }
            ],
            "name": "ccipReceive",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_sourceChainSelector",
                    "type": "uint64"
                }
            ],
            "name": "deleteSenderForSourceChain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint256",
                    "name": "offset",
                    "type": "uint256"
                },
                {
                    "internalType": "uint256",
                    "name": "limit",
                    "type": "uint256"
                }
            ],
            "name": "getFailedMessages",
            "outputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "messageId",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "enum Receiver.ErrorCode",
                            "name": "errorCode",
                            "type": "uint8"
                        }
                    ],
                    "internalType": "struct Receiver.FailedMessage[]",
                    "name": "",
                    "type": "tuple[]"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "getRouter",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "owner",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "components": [
                        {
                            "internalType": "bytes32",
                            "name": "messageId",
                            "type": "bytes32"
                        },
                        {
                            "internalType": "uint64",
                            "name": "sourceChainSelector",
                            "type": "uint64"
                        },
                        {
                            "internalType": "bytes",
                            "name": "sender",
                            "type": "bytes"
                        },
                        {
                            "internalType": "bytes",
                            "name": "data",
                            "type": "bytes"
                        },
                        {
                            "components": [
                                {
                                    "internalType": "address",
                                    "name": "token",
                                    "type": "address"
                                },
                                {
                                    "internalType": "uint256",
                                    "name": "amount",
                                    "type": "uint256"
                                }
                            ],
                            "internalType": "struct Client.EVMTokenAmount[]",
                            "name": "destTokenAmounts",
                            "type": "tuple[]"
                        }
                    ],
                    "internalType": "struct Client.Any2EVMMessage",
                    "name": "any2EvmMessage",
                    "type": "tuple"
                }
            ],
            "name": "processMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "internalType": "address",
                    "name": "beneficiary",
                    "type": "address"
                }
            ],
            "name": "retryFailedMessage",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes32",
                    "name": "",
                    "type": "bytes32"
                }
            ],
            "name": "s_messageContents",
            "outputs": [
                {
                    "internalType": "bytes32",
                    "name": "messageId",
                    "type": "bytes32"
                },
                {
                    "internalType": "uint64",
                    "name": "sourceChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "bytes",
                    "name": "sender",
                    "type": "bytes"
                },
                {
                    "internalType": "bytes",
                    "name": "data",
                    "type": "bytes"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "",
                    "type": "uint64"
                }
            ],
            "name": "s_senders",
            "outputs": [
                {
                    "internalType": "address",
                    "name": "",
                    "type": "address"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "uint64",
                    "name": "_sourceChainSelector",
                    "type": "uint64"
                },
                {
                    "internalType": "address",
                    "name": "_sender",
                    "type": "address"
                }
            ],
            "name": "setSenderForSourceChain",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "bytes4",
                    "name": "interfaceId",
                    "type": "bytes4"
                }
            ],
            "name": "supportsInterface",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "pure",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                }
            ],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
};

const stakerContract = {
    name: "Staker",
    address: "0x3E0976091E5006Ce6f30D8c6120f21ddf907ff74",  // Deployed on Ethereum Sepolia
    abi: [
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_usdcToken",
                    "type": "address"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "constructor"
        },
        {
            "inputs": [],
            "name": "InvalidAmount",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidBeneficiary",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidNumberOfDecimals",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "InvalidUsdcToken",
            "type": "error"
        },
        {
            "inputs": [],
            "name": "NothingToRedeem",
            "type": "error"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Approval",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "value",
                    "type": "uint256"
                }
            ],
            "name": "Transfer",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "beneficiary",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "UsdcRedeemed",
            "type": "event"
        },
        {
            "anonymous": false,
            "inputs": [
                {
                    "indexed": true,
                    "internalType": "address",
                    "name": "beneficiary",
                    "type": "address"
                },
                {
                    "indexed": false,
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "UsdcStaked",
            "type": "event"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "owner",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                }
            ],
            "name": "allowance",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "approve",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "account",
                    "type": "address"
                }
            ],
            "name": "balanceOf",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "decimals",
            "outputs": [
                {
                    "internalType": "uint8",
                    "name": "",
                    "type": "uint8"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "subtractedValue",
                    "type": "uint256"
                }
            ],
            "name": "decreaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "spender",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "addedValue",
                    "type": "uint256"
                }
            ],
            "name": "increaseAllowance",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "name",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "redeem",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "_beneficiary",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "_amount",
                    "type": "uint256"
                }
            ],
            "name": "stake",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "symbol",
            "outputs": [
                {
                    "internalType": "string",
                    "name": "",
                    "type": "string"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [
                {
                    "internalType": "uint256",
                    "name": "",
                    "type": "uint256"
                }
            ],
            "stateMutability": "view",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transfer",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        },
        {
            "inputs": [
                {
                    "internalType": "address",
                    "name": "from",
                    "type": "address"
                },
                {
                    "internalType": "address",
                    "name": "to",
                    "type": "address"
                },
                {
                    "internalType": "uint256",
                    "name": "amount",
                    "type": "uint256"
                }
            ],
            "name": "transferFrom",
            "outputs": [
                {
                    "internalType": "bool",
                    "name": "",
                    "type": "bool"
                }
            ],
            "stateMutability": "nonpayable",
            "type": "function"
        }
    ],
};

const messageContract = {
    name: "Message",
    address: "",
    abi: abi,
};

export default { senderContract, receiverContract, stakerContract, messageContract };