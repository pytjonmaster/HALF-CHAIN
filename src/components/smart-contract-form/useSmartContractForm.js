
import { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { blockchains } from '@/components/smart-contract-form/formUtils.js';
import { getExplorerUrl, simulateTransactionHash } from '@/components/smart-contract-form/deploymentUtils.js';

const initialFormData = {
  contractName: '',
  contractType: '',
  blockchain: '',
  description: '',
  parties: '',
  terms: '',
  enableKYC: true,
  enableAudit: true,
};

export const useSmartContractForm = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState('');
  const [deploymentError, setDeploymentError] = useState('');
  const [contractGenerated, setContractGenerated] = useState(false);
  const [contractDeployed, setContractDeployed] = useState(false);
  const [transactionHash, setTransactionHash] = useState('');
  const [explorerUrl, setExplorerUrl] = useState('');
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSwitchChange = (name, checked) => {
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleGenerateContract = () => {
    if (!formData.contractName || !formData.contractType || !formData.blockchain) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setContractGenerated(true);
      setActiveTab('review');
      toast({
        title: "Contract Generated",
        description: "Your smart contract has been successfully generated.",
      });
    }, 2000);
  };

  const handleDeployContract = async () => {
    setIsDeploying(true);
    setDeploymentStatus('Initiating deployment...');
    setDeploymentError('');
    setContractDeployed(false);
    setTransactionHash('');
    setExplorerUrl('');

    const selectedBlockchainInfo = blockchains.find(b => b.value === formData.blockchain);

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setDeploymentStatus(`Connecting to ${selectedBlockchainInfo?.label} network...`);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeploymentStatus('Simulating wallet connection...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeploymentStatus('Estimating gas fees...');
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      setDeploymentStatus('Awaiting your confirmation in wallet (simulated)...');
      
      await new Promise(resolve => setTimeout(resolve, 2000)); 
      setDeploymentStatus('Processing transaction...');
      const simulatedTxHash = simulateTransactionHash();
      setTransactionHash(simulatedTxHash);

      await new Promise(resolve => setTimeout(resolve, 2500));
      setDeploymentStatus(`Submitting transaction ${simulatedTxHash.substring(0,10)}... to the blockchain...`);

      await new Promise(resolve => setTimeout(resolve, 3000));
      setDeploymentStatus('Transaction submitted. Waiting for confirmations (simulated 1/3)...');
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      setDeploymentStatus('Transaction confirmation (simulated 2/3)...');

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setIsDeploying(false);
      setContractDeployed(true);
      const url = getExplorerUrl(formData.blockchain, simulatedTxHash);
      setExplorerUrl(url);
      setDeploymentStatus('Deployment successful!');
      toast({
        title: "Contract Deployed",
        description: `Your smart contract "${formData.contractName}" has been successfully deployed. TxHash: ${simulatedTxHash}`,
      });

    } catch (error) {
      setIsDeploying(false);
      const errMsg = error.message || "An unexpected error occurred during deployment.";
      setDeploymentError(errMsg);
      setDeploymentStatus('Deployment failed.');
      toast({
        title: "Deployment Failed",
        description: errMsg,
        variant: "destructive",
      });
    }
  };

  return {
    activeTab,
    setActiveTab,
    isGenerating,
    isDeploying,
    deploymentStatus,
    deploymentError,
    contractGenerated,
    contractDeployed,
    transactionHash,
    explorerUrl,
    formData,
    handleChange,
    handleSelectChange,
    handleSwitchChange,
    handleGenerateContract,
    handleDeployContract,
  };
};
