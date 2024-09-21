'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bell, Gift, Settings, User, MessageSquare, ChevronDown, Search, Paperclip, Send } from 'lucide-react'
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';

const sidebarItems = [
  {
    icon: <img src="/assets_png/traits-svg/3-heads/head-mailbox.svg" width="32" height="32" alt="Inbox" />, 
    label: 'Inbox'
  },
  {
    icon: <img src="/assets_png/traits-svg/3-heads/head-star-sparkles.svg" width="32" height="32" alt="Starred" />, 
    label: 'Starred'
  },
  {
    icon: <img src="/assets_png/traits-svg/3-heads/head-plane.svg" width="32" height="32" alt="Starred" />, 
   label: 'Sent'
  },
  {
    icon: <img src="/assets_png/traits-svg/3-heads/head-mixer.svg" width="32" height="32" alt="Starred" />, 
    label: 'Drafts'
  },
  {
    icon: <img src="/assets_png/traits-svg/3-heads/head-maze.svg" width="32" height="32" alt="Spam" />, 
    label: 'Spam'
  },
  {
  icon: <img src="/assets_png/traits-svg/3-heads/head-trashcan.svg" width="32" height="32" alt="Starred" />, 
   label: 'Trash'
  },
]

const dummyEmails = [
  { id: 1, from: 'alice@example.com', subject: 'Welcome to Mirage', preview: 'Hey there! Welcome to your new Mirage account...', date: '10:30 AM' },
  { id: 2, from: 'bob@example.com', subject: 'Web3 Conference Invitation', preview: 'You\'re invited to the annual Web3 Conference...', date: 'Yesterday' },
  { id: 3, from: 'charlie@example.com', subject: 'New NFT Drop', preview: 'Check out our latest NFT collection, launching soon...', date: '2 days ago' },
  { id: 4, from: 'dana@example.com', subject: 'DAO Proposal #42', preview: 'Please review and vote on the latest DAO proposal...', date: '3 days ago' },
  { id: 5, from: 'eve@example.com', subject: 'Crypto Market Update', preview: 'Here\'s your weekly crypto market analysis and insights...', date: '1 week ago' },
]

export default function Home() {
  const [activeTab, setActiveTab] = useState('Inbox')
  const [showCompose, setShowCompose] = useState(false)
  const [selectedEmail, setSelectedEmail] = useState(null)
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum')
  const { user, handleLogOut } = useDynamicContext();
  const router = useRouter();


  useEffect(() => {
    if (!user) {
      console.log("Not authenticated, redirecting to login");
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    handleLogOut();
    router.push('/login');
  }

  return (
    <div className="flex h-screen bg-[#D63C5E] text-white font-sans">
      <motion.div
        initial={{ x: -250 }}
        animate={{ x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-64 bg-[#121212] p-4 flex flex-col"
      >
        <div className="flex items-center mb-8">
          {/* <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="mr-2">
            <rect width="32" height="32" rx="4" fill="#D63C5E" />
            <path d="M8 8H24V24H8V8Z" fill="white" />
            <path d="M12 12H20V20H12V12Z" fill="#D63C5E" />
          </svg> */}
          <img src="/assets_png/traits-svg/3-heads/head-crystalball.svg" width="50" height="50" alt="Mirage" />
          <h1 className="text-2xl font-bold">Mirage</h1>
        </div>
        <span className="text-sm text-gray-400">Decentralized Transactional Mail Service</span>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowCompose(true)}
          className="bg-[#D63C5E] text-white py-2 px-4 rounded-full mb-6 font-bold"
        >
          Compose
        </motion.button>
        <nav>
          {sidebarItems.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ x: 5 }}
              onClick={() => setActiveTab(item.label)}
              className={`flex items-center py-2 px-4 rounded-lg mb-2 cursor-pointer ${activeTab === item.label ? 'bg-[#D63C5E]' : ''}`}
            >
              {item.icon}
              <span className="ml-2">{item.label}</span>
            </motion.div>
          ))}
        </nav>
      </motion.div>
      <div className="flex-1 flex flex-col">
        <motion.header
          initial={{ y: -50 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white text-[#121212] p-4 flex justify-between items-center"
        >
          <div className="flex space-x-4">
            <button className="px-4 py-2 rounded-full flex items-center bg-gray-200">
              <img src="/assets_png/traits-svg/3-heads/head-cordlessphone.svg" width="32" height="32" alt="Spam" style={{ transform: 'rotate(90deg)' }} className="mr-2" />
              Contacts
            </button>
            {/* <button
              className={`px-4 py-2 rounded-full ${activeTab === 'Subscription' ? 'bg-[#D63C5E] text-white' : 'bg-gray-200'}`}
              onClick={() => setActiveTab('Subscription')}
            >
              Subscription
            </button> */}
          </div>
          <div className="flex items-center space-x-4">
          {/* {randomImage && <img src={randomImage} alt="Random Profile" width={24} height={24} />} */}
          <User size={24} />
            {/* <MessageSquare size={24} />
            <Bell size={24} />
            <Gift size={24} /> */}
            {/* <Settings size={24} /> */}
            <div className="bg-gray-200 text-[#121212] px-4 py-2 rounded-full text-sm">
            <DynamicWidget />
            </div>
          </div>
        </motion.header>
        <main className="flex-1 p-8 bg-gray-100 overflow-auto">
          <AnimatePresence>
            {showCompose ? (
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ duration: 0.5 }}
                className="bg-white rounded-lg p-6 shadow-lg"
              >
                <h2 className="text-2xl font-bold mb-4 text-[#121212] flex items-center">
                  <img src="/assets_png/traits-svg/3-heads/head-factory-dark.svg" width="60" height="60" alt="Compose" className="mr-2" />
                  Compose Email
                </h2>
                <div className="flex items-center mb-4">
                  <input
                    type="text"
                    placeholder="To"
                    className="flex-grow p-2 border border-gray-300 rounded mr-2 text-[#121212]"
                  />
                  <div className="relative">
                    <select
                      value={selectedNetwork}
                      onChange={(e) => setSelectedNetwork(e.target.value)}
                      className="appearance-none bg-gray-200 text-[#121212] px-4 py-2 pr-8 rounded"
                    >
                      <option>Ethereum</option>
                      <option>Polygon</option>
                      <option>Optimism</option>
                    </select>
                    <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 pointer-events-none" size={16} />
                  </div>
                </div>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full mb-4 p-2 border border-gray-300 rounded text-[#121212]"
                />
                <textarea
                  placeholder="Message"
                  rows={10}
                  className="w-full mb-4 p-2 border border-gray-300 rounded text-[#121212]"
                ></textarea>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-2">
                    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      {/* <Paperclip size={20} className="text-gray-500" /> */}
                      <img src="/assets_png/traits-svg/3-heads/head-paperclip.svg" width="50" height="50" alt="Mirage" />      
                    </motion.button>
                  </div>
                  <div className="flex space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setShowCompose(false)}
                      className="bg-gray-200 text-[#121212] px-4 py-2 rounded"
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-[#D63C5E] text-white px-4 py-2 rounded flex items-center"
                    >
                      <img src="/assets_png/traits-svg/3-heads/head-helicopter.svg" width="40" height="40" alt="Mirage" />
                      Send
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex h-full"
              >
                <div className="w-1/3 bg-white rounded-lg shadow-lg mr-4 overflow-auto">
                  <div className="p-4 border-b border-gray-200">
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search emails"
                        className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded text-[#121212]"
                      />
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                    </div>
                  </div>
                  {dummyEmails.map((email) => (
                    <motion.div
                      key={email.id}
                      whileHover={{ backgroundColor: '#f3f4f6' }}
                      onClick={() => setSelectedEmail(email)}
                      className={`p-4 border-b border-gray-200 cursor-pointer ${selectedEmail?.id === email.id ? 'bg-gray-100' : ''}`}
                    >
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-[#121212]">{email.from}</span>
                        <span className="text-sm text-gray-500">{email.date}</span>
                      </div>
                      <div className="text-[#121212] font-medium">{email.subject}</div>
                      <div className="text-sm text-gray-600 truncate">{email.preview}</div>
                    </motion.div>
                  ))}
                </div>
                <div className="flex-1 bg-white rounded-lg shadow-lg overflow-auto">
                  {selectedEmail ? (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="p-6"
                    >
                      <h2 className="text-2xl font-bold mb-4 text-[#121212]">{selectedEmail.subject}</h2>
                      <div className="flex justify-between items-center mb-4">
                        <div className="text-[#121212]">From: {selectedEmail.from}</div>
                        <div className="text-gray-500">{selectedEmail.date}</div>
                      </div>
                      <div className="text-[#121212] whitespace-pre-wrap">
                        {selectedEmail.preview}
                        {'\n\n'}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae nunc. Sed euismod, nunc id aliquam tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae nunc.
                      </div>
                    </motion.div>
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-500">
                      Select an email to view its contents
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
