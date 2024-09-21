import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import contractConfig from '../config/contract';

const useContracts = () => {
    const [provider, setProvider] = useState(null);
    const [signer, setSigner] = useState(null);
    const [contracts, setContracts] = useState({});

    useEffect(() => {
        const init = async () => {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                setProvider(provider);
                setSigner(signer);

                const senderContract = new ethers.Contract(
                    contractConfig.senderContract.address,
                    contractConfig.senderContract.abi,
                    signer
                );

                const receiverContract = new ethers.Contract(
                    contractConfig.receiverContract.address,
                    contractConfig.receiverContract.abi,
                    signer
                );

                const stakerContract = new ethers.Contract(
                    contractConfig.stakerContract.address,
                    contractConfig.stakerContract.abi,
                    signer
                );

                const messageContract = new ethers.Contract(
                    contractConfig.messageContract.address,
                    contractConfig.messageContract.abi,
                    signer
                );

                setContracts({
                    senderContract,
                    receiverContract,
                    stakerContract,
                    messageContract,
                });
            }
        };

        init();
    }, []);

    return { provider, signer, contracts };
};

export default useContracts;