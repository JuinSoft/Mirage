'use client'

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bell, Gift, Settings, User, MessageSquare, ChevronDown, Search, Paperclip, Send } from 'lucide-react';
import { DynamicWidget, useDynamicContext } from '@dynamic-labs/sdk-react-core';
import { useRouter } from 'next/navigation';
import useContracts from './hooks/useContracts';
import { sendFileToIPFS } from './config/sendFileToIPFS';
import { ethers } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
];

export default function Home() {
  const [activeTab, setActiveTab] = useState('Inbox');
  const [showCompose, setShowCompose] = useState(false);
  const [selectedEmail, setSelectedEmail] = useState(null);
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum');
  const [to, setTo] = useState('0x1704e5Dc4Eff82c9218Ded9a5864B2080b6428be');
  const [subject, setSubject] = useState('Test');
  const [message, setMessage] = useState('Hello world');
  const [attachment, setAttachment] = useState(null);
  const [usdcAmount, setUsdcAmount] = useState('1');
  const { user, handleLogOut } = useDynamicContext();
  const router = useRouter();
  const { provider, signer, contracts } = useContracts();

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
  };


  const handleSendMessage = async () => {
    try {
      if (!to || !subject || !message) {
        toast.error('Please fill in all required fields.');
        return;
      }

      let attachmentUrl = '';
      if (attachment) {
        const { url } = await sendFileToIPFS(attachment);
        attachmentUrl = url;
      }

      if (usdcAmount) {
        // Switch to Avalanche Fuji network
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: '0xA869' }], // Avalanche Fuji chain ID in hexadecimal
        });

        const tx = await contracts.senderContract.sendMessagePayLINK(
          ethers.BigNumber.from("16015286601757825753"), // Ethereum Sepolia chain selector
          to,
          ethers.BigNumber.from("1000000") // 1 USDC
        );
        await tx.wait();
      }

      // Switch to Ethereum Sepolia network
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0xaa36a7' }], // Ethereum Sepolia chain ID in hexadecimal
      });

      let gasEstimate;
      try {
        gasEstimate = await contracts.messageContract.estimateGas.sendMessage(
          to,
          subject,
          message,
          attachmentUrl,
          !!usdcAmount,
          ethers.utils.parseUnits(usdcAmount || '0', 6)
        );
      } catch (error) {
        console.error('Error estimating gas:', error);
        toast.error('Error estimating gas. Please try again.');
        return;
      }

      const tx = await contracts.messageContract.sendMessage(
        to,
        subject,
        message,
        attachmentUrl,
        !!usdcAmount,
        ethers.utils.parseUnits(usdcAmount || '0', 6),
        { gasLimit: gasEstimate }
      );
      await tx.wait();

      toast.success('Message sent successfully!');
      setShowCompose(false);
      setTo('');
      setSubject('');
      setMessage('');
      setAttachment(null);
      setUsdcAmount('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Error sending message.');
    }
  };

  return (
    <>
      <div className="flex h-screen bg-[#D63C5E] text-white font-sans">
        <ToastContainer />
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
                      value={to}
                      onChange={(e) => setTo(e.target.value)}
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
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-[#121212]"
                  />
                  <textarea
                    placeholder="Message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={10}
                    className="w-full mb-4 p-2 border border-gray-300 rounded text-[#121212]"
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <div className="flex space-x-2">
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="flex items-center space-x-2 bg-gray-200 text-[#121212] px-4 py-2 rounded"
                        onClick={() => document.getElementById('attachment').click()}
                      >
                        <Paperclip size={16} />
                        <span>Attach</span>
                      </motion.button>
                      <input
                        type="file"
                        id="attachment"
                        style={{ display: 'none' }}
                        onChange={(e) => setAttachment(e.target.files[0])}
                      />
                      <input
                        type="number"
                        placeholder="USDC Amount"
                        value={usdcAmount}
                        onChange={(e) => setUsdcAmount(e.target.value)}
                        className="p-2 border border-gray-300 rounded text-[#121212]"
                      />
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className="bg-[#D63C5E] text-white px-4 py-2 rounded-full"
                      onClick={handleSendMessage}
                    >
                      <img src="/assets_png/traits-svg/3-heads/head-helicopter.svg" width="40" height="40" alt="Mirage" />
                      Send
                    </motion.button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-4 text-[#121212]">{activeTab}</h2>
                  {activeTab === 'Inbox' && (
                    <div>
                      {dummyEmails.map((email) => (
                        <motion.div
                          key={email.id}
                          whileHover={{ scale: 1.02 }}
                          onClick={() => setSelectedEmail(email)}
                          className="bg-white p-4 rounded-lg shadow mb-4 cursor-pointer"
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-bold text-[#121212]">{email.from}</h3>
                              <p className="text-sm text-gray-600">{email.subject}</p>
                            </div>
                            <span className="text-sm text-gray-400">{email.date}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-2">{email.preview}</p>
                        </motion.div>
                      ))}
                    </div>
                  )}
                  {/* Add other tabs content here */}
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
      <ToastContainer />
    </>
  );
}