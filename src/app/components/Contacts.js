"use client"

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Check, X, ChevronDown, ChevronUp } from 'lucide-react'

export default function ContactManager() {
  const [contacts, setContacts] = useState([])
  const [newContact, setNewContact] = useState({ account: '', email: '', chainId: '', verified: false })
  const [showVerified, setShowVerified] = useState(true)
  const [showUnverified, setShowUnverified] = useState(true)

  const addContact = () => {
    if (newContact.account && newContact.email && newContact.chainId) {
      setContacts([...contacts, newContact])
      setNewContact({ account: '', email: '', chainId: '', verified: false })
    }
  }

  const toggleVerification = (index) => {
    const updatedContacts = [...contacts]
    updatedContacts[index].verified = !updatedContacts[index].verified
    setContacts(updatedContacts)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Add New Contact</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="account" className="block text-sm font-medium text-gray-700 mb-1">Account Address</label>
            <input
              id="account"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newContact.account}
              onChange={(e) => setNewContact({ ...newContact, account: e.target.value })}
              placeholder="0x..."
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              id="email"
              type="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={newContact.email}
              onChange={(e) => setNewContact({ ...newContact, email: e.target.value })}
              placeholder="example@example.com"
            />
          </div>
          <div>
            <label htmlFor="chainId" className="block text-sm font-medium text-gray-700 mb-1">Chain ID</label>
            <input
              id="chainId"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
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

      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Contacts</h2>
        <div className="flex space-x-4 mb-4">
          <button
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              showVerified ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setShowVerified(!showVerified)}
          >
            {showVerified ? <ChevronUp className="inline-block mr-2 h-4 w-4" /> : <ChevronDown className="inline-block mr-2 h-4 w-4" />}
            Verified
          </button>
          <button
            className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
              showUnverified ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-800"
            }`}
            onClick={() => setShowUnverified(!showUnverified)}
          >
            {showUnverified ? <ChevronUp className="inline-block mr-2 h-4 w-4" /> : <ChevronDown className="inline-block mr-2 h-4 w-4" />}
            Unverified
          </button>
        </div>
        <AnimatePresence>
          {contacts.map((contact, index) => (
            ((contact.verified && showVerified) || (!contact.verified && showUnverified)) && (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-gray-50 shadow-sm rounded-md mb-4 p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold">{contact.email}</p>
                      <p className="text-sm text-gray-500">Chain ID: {contact.chainId}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        contact.verified ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                      }`}>
                        {contact.verified ? "Verified" : "Unverified"}
                      </span>
                      <button
                        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}