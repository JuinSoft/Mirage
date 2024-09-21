import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react';
import { ethers } from 'ethers';
import useContracts from '../hooks/useContracts';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createEmailAttestation } from '../hooks/useSignProtocol';
import { useDynamicContext } from '@dynamic-labs/sdk-react-core';

export default function ContactManager() {
    const [contacts, setContacts] = useState([]);
    const [newContact, setNewContact] = useState({ account: '', email: '', chainId: '', verified: false });
    const [showVerified, setShowVerified] = useState(true);
    const [showUnverified, setShowUnverified] = useState(true);
    const [attestationRequests, setAttestationRequests] = useState([]);
    const [attestationStatuses, setAttestationStatuses] = useState([]);
    const { provider, signer, contracts } = useContracts();
    const { user } = useDynamicContext();
    const ETHEREUM_SEPOLIA_CHAIN_ID = 11155111;

    useEffect(() => {
        if (signer && contracts.messageContract) {
            fetchContacts();
            fetchAttestationRequests();
        }
    }, [signer, contracts]);

    const handleSwitchNetwork = async (networkId) => {
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: ethers.utils.hexValue(networkId) }],
            });
            return true;
        } catch (error) {
            console.error('Error switching network:', error);
            return false;
        }
    };

    const fetchContacts = async () => {
        try {
            const userAddress = await signer.getAddress();
            const contacts = await contracts.messageContract.getUserContacts(userAddress);
            setContacts(contacts);
            console.log("Fetched contacts: ", contacts);
        } catch (error) {
            console.error('Error fetching contacts:', error);
        }
    };

    const addContact = async () => {
        if (newContact.account && newContact.email && newContact.chainId) {
            try {
                const switched = await handleSwitchNetwork(ETHEREUM_SEPOLIA_CHAIN_ID);
                if (!switched) {
                    toast.error('Failed to switch to Sepolia network.');
                    return;
                }

                const tx = await contracts.messageContract.addUserContact(await signer.getAddress(), newContact);
                await tx.wait();
                setContacts([...contacts, newContact]);
                setNewContact({ account: '', email: '', chainId: '', verified: false });
                toast.success('Contact added successfully!');
            } catch (error) {
                console.error('Error adding contact:', error);
                toast.error('Error adding contact.');
            }
        }
    };

    const isContactVerified = async (email) => {
        try {
            const userAddress = await signer.getAddress();
            return await contracts.messageContract.isContactVerified(userAddress, email);
        } catch (error) {
            console.error('Error checking contact verification:', error);
            return false;
        }
    };

    const toggleVerification = async (index) => {
        try {
            const switched = await handleSwitchNetwork(ETHEREUM_SEPOLIA_CHAIN_ID);
            if (!switched) {
                toast.error('Failed to switch to Sepolia network.');
                return;
            }

            const contact = contacts[index];
            const tx = await contracts.messageContract.setContactVerified(await signer.getAddress(), contact.email, !contact.verified);
            await tx.wait();

            const updatedContacts = [...contacts];
            updatedContacts[index].verified = !updatedContacts[index].verified;
            setContacts(updatedContacts);
            toast.success('Verification status updated successfully!');
        } catch (error) {
            console.error('Error toggling verification:', error);
            toast.error('Error toggling verification.');
        }
    };

    const fetchAttestationRequests = async () => {
        try {
            const userAddress = await signer.getAddress();
            const requests = await contracts.messageContract.getVerificationRequests(userAddress);
            setAttestationRequests(requests);
            console.log("Fetched attestation requests: ", requests);
        } catch (error) {
            console.error('Error fetching attestation requests:', error);
        }
    };

    const handleAttestation = async (requester, receiverEmail) => {
        try {
            const verified = await isContactVerified(receiverEmail);
            if (verified) {
                toast.info('Contact is already verified.');
                return;
            }

            const userAddress = await signer.getAddress();
            const userEmail = user.email;
            const success = await createEmailAttestation(userEmail, receiverEmail, userAddress, requester, true, Math.floor(Math.random() * 1000000).toString(), Date.now(), signer);
            if (success) {
                await contracts.messageContract.setContactVerified(userAddress, receiverEmail, true);
                toast.success('Attestation provided and contact verified successfully!');
            } else {
                toast.error('Failed to provide attestation.');
            }
        } catch (error) {
            console.error('Error providing attestation:', error);
            toast.error('Error providing attestation.');
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-8 bg-white min-h-screen">
            <ToastContainer />
            <div className="bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Add New Contact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label htmlFor="account" className="block text-sm font-medium text-gray-300 mb-1">Account Address</label>
                        <input
                            id="account"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            value={newContact.account}
                            onChange={(e) => setNewContact({ ...newContact, account: e.target.value })}
                            placeholder="0x..."
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                        <input
                            id="email"
                            type="email"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            value={newContact.email}
                            onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
                            placeholder="example@example.com"
                        />
                    </div>
                    <div>
                        <label htmlFor="chainId" className="block text-sm font-medium text-gray-300 mb-1">Chain ID</label>
                        <input
                            id="chainId"
                            className="w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-700 text-white"
                            value={newContact.chainId}
                            onChange={(e) => setNewContact({ ...newContact, chainId: e.target.value })}
                            placeholder="1"
                        />
                    </div>
                </div>
                <button
                    onClick={addContact}
                    className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                    <Plus className="inline-block mr-2 h-4 w-4" /> Add Contact
                </button>
            </div>

            <div className="bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Contacts</h2>
                <div className="flex space-x-4 mb-4">
                    <button
                        className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showVerified ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowVerified(!showVerified)}
                    >
                        {showVerified ? <ChevronUp className="inline-block mr-2 h-4 w-4" /> : <ChevronDown className="inline-block mr-2 h-4 w-4" />}
                        Verified
                    </button>
                    <button
                        className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${showUnverified ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300"
                            }`}
                        onClick={() => setShowUnverified(!showUnverified)}
                    >
                        {showUnverified ? <ChevronUp className="inline-block mr-2 h-4 w-4" /> : <ChevronDown className="inline-block mr-2 h-4 w-4" />}
                        Unverified
                    </button>
                </div>
                <AnimatePresence>
                    {contacts.length === 0 ? (
                        <p className="text-gray-400">No contact found. Add new contacts.</p>
                    ) : (
                        contacts.map((contact, index) => (
                            ((contact.verified && showVerified) || (!contact.verified && showUnverified)) && (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="bg-gray-700 shadow-sm rounded-md mb-4 p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-gray-300">{contact.email}</p>
                                                <p className="text-sm text-gray-400">Chain ID: {contact.chainId}</p>
                                            </div>
                                            <div className="flex items-center space-x-4">
                                                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${contact.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                                                    }`}>
                                                    {contact.verified ? "Verified" : "Unverified"}
                                                </span>
                                                <button
                                                    className="p-1 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                                    onClick={() => toggleVerification(index)}
                                                >
                                                    {contact.verified ? (
                                                        <X className="h-4 w-4 text-red-500" />
                                                    ) : (
                                                        <Check className="h-4 w-4 text-green-500" />
                                                    )}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        ))
                    )}
                </AnimatePresence>
                <button
                    className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onClick={() => handleAttestation(user.email, user.email)}
                >
                    Attest Contact List
                </button>
            </div>

            <div className="bg-gray-800 shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4 text-white">Email Attestation Requests</h2>
                <AnimatePresence>
                    {attestationRequests.length === 0 ? (
                        <p className="text-gray-400">No new requests</p>
                    ) : (
                        attestationRequests.map((request, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <div className="bg-gray-700 shadow-sm rounded-md mb-4 p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="font-semibold text-gray-300">Requester: {request}</p>
                                            <p className="text-sm text-gray-400">Status: {attestationStatuses[index] ? "Approved" : "Pending"}</p>
                                        </div>
                                        <button
                                            className="p-1 rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            onClick={() => handleAttestation(request, user.email)}
                                        >
                                            <Check className="h-4 w-4 text-green-500" />
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}