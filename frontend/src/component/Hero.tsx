import React, { useState, type ChangeEvent, type FormEvent } from "react";
//import { useAccount } from 'wagmi';
//import { useAppKit } from "@reown/appkit/react";
import { useAppKit } from '@reown/appkit/react';
import { useAccount, useWriteContract } from 'wagmi';
import { parseEther } from 'viem';
import abi from "../abi/MyNFT.json";


type Attribute = {
  trait_type: string;
  value: string;
};

type FormData = {
  name: string;
  description: string;
  image: File | null;
  externalLink: string;
   ethAmount: string; 
   mintAmount: string; 
  attributes: Attribute[];
};

const Hero: React.FC = () => {
//   const { open } = useAppKit();
//  const { isConnected } = useAccount(); // ✅ Correct hook to check wallet connection
 // const [amount, setAmount] = useState(1);
  const { open } = useAppKit();
  const { isConnected } = useAccount();
  const { writeContract } = useWriteContract();
  //const [amount] = useState(1);


  const CONTRACT_ADDRESS = "0x7F4Aa130C98B083e4aD0aD94D6b85CCB6e87179D";


  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    image: null,
    externalLink: "",
     ethAmount: "", 
      mintAmount: "", 
    attributes: [{ trait_type: "", value: "" }],
  });



  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, files } = e.target as HTMLInputElement;
    if (name === "image" && files) {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAttributeChange = (index: number, field: keyof Attribute, value: string) => {
    const newAttributes = [...formData.attributes];
    newAttributes[index][field] = value;
    setFormData({ ...formData, attributes: newAttributes });
  };

  const addAttribute = () => {
    setFormData({
      ...formData,
      attributes: [...formData.attributes, { trait_type: "", value: "" }],
    });
  };

    

   const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const { ethAmount, mintAmount } = formData;

    if (!isConnected) {
      await open();
      return;
    }

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi,
        functionName: "mint", // adjust if needed
        args: [BigInt(mintAmount)],
        value: parseEther((parseFloat(ethAmount) * parseInt(mintAmount)).toString()),
      });

      alert("🚀 Mint transaction sent!");
    } catch (err) {
      console.error("❌ Minting failed:", err);
      alert("Minting failed. See console for details.");
    }
  };


  return (
    <div className="max-w-2xl mx-auto my-12 bg-white shadow-2xl rounded-2xl p-8 border border-gray-200">
      <h2 className="text-3xl font-bold text-center text-[#0C4E86] mb-6">
        🎨 Vandana erc721
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-semibold mb-1">NFT Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            placeholder="e.g. Galaxy Ape #101"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Image Upload</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full border p-2 rounded-xl shadow-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#0C4E86] file:text-white hover:file:bg-blue-700"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">ETH Amount (per NFT)</label>
          <input
            type="number"
            name="ethAmount"
            min="0"
            step="0.0001"
            required
            value={formData.ethAmount}
            onChange={handleChange}
            placeholder="e.g. 0.01"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Amount to Mint</label>
          <input
            type="number"
            name="mintAmount"
            min="1"
            step="1"
            required
            value={formData.mintAmount}
            onChange={handleChange}
            placeholder="e.g. 3"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">Description</label>
          <textarea
            name="description"
            required
            value={formData.description}
            rows={3}
            onChange={handleChange}
            placeholder="What makes this NFT special?"
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-1">External Link (optional)</label>
          <input
            type="url"
            name="externalLink"
            value={formData.externalLink}
            placeholder="https://..."
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold mb-2">Attributes (Traits)</label>
          {formData.attributes.map((attr, index) => (
            <div key={index} className="flex gap-3 mb-2 items-center justify-between">
              <input
                type="text"
                placeholder="Trait Type"
                value={attr.trait_type}
                onChange={(e) => handleAttributeChange(index, "trait_type", e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Value"
                value={attr.value}
                onChange={(e) => handleAttributeChange(index, "value", e.target.value)}
                className="w-1/2 px-3 py-2 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          ))}
          <button
            type="button"
            onClick={addAttribute}
            className="text-sm text-blue-600 hover:underline mt-2"
          >
            + Add another attribute
          </button>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-[#0C4E86] text-white rounded-xl text-lg font-bold hover:bg-blue-800 transition duration-200"
        >
          🚀 Mint NFT
        </button>
      </form>
    </div>
  );
};

export default Hero;
