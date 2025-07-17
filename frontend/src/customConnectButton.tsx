import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'wagmi';
import { FaWallet } from 'react-icons/fa';

const CustomConnectButton = () => {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount(); // ✅ Wagmi hook

  const shortenAddress = (addr: string) =>
    `${addr.slice(0, 6)}...${addr.slice(-4)}`;

  return (
    <button
      onClick={() => open()}
      className="flex items-center gap-2 px-5 py-2 bg-[#0C4E86] text-white rounded-full shadow-md hover:bg-[#093c65] transition duration-300"
    >
      <FaWallet className="text-lg" />
      <span className="font-medium">
        {isConnected && address ? shortenAddress(address) : 'Connect Wallet'}
      </span>
    </button>
  );
};

export default CustomConnectButton;



/*
import { useAppKit } from '@reown/appkit/react';
import { FaWallet } from 'react-icons/fa';

const CustomConnectButton = () => {
  const { open } = useAppKit();

  return (
    <button
      onClick={() => open()} 
      className="flex items-center gap-2 px-5 py-2 bg-[#0C4E86] text-white rounded-full shadow-md hover:bg-[#093c65] transition duration-300"
    >
      <FaWallet className="text-lg" />
      <span className="font-medium">Connect Wallet</span>
    </button>
  );
};

export default CustomConnectButton;

*/