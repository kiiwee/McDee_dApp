import { ethers } from 'ethers'
import { acceptHMRUpdate, defineStore } from 'pinia'
import contractABI from '../../MacDee.sol/MacDeeContract.json'
const contractAddress = '0x35708b2605A08A471a80059a8D89d3E1B098FB06'

export const useCryptoStore = defineStore('user', () => {
	const account = ref(null)
	const loading = ref(false)

	async function payForMeal() {
		console.log('setting loader')
		//setLoader(true)
		try {
			const { ethereum } = window
			if (ethereum) {
				// create provider object from ethers library, using ethereum object injected by metamask
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const MacDee = new ethers.Contract(contractAddress, contractABI.abi, signer)

				const overrides = {
					value: ethers.utils.parseEther('.1'), // sending one ether
					gasLimit: 200000, // optional
				}
				/*
				* Execute the actual wave from your smart contract
				*/
				const waveTxn = await MacDee.payForMeal(overrides)
				console.log('Mining...', waveTxn.hash)
				await waveTxn.wait()
				console.log('Mined -- ', waveTxn.hash)
			}
			else {
				console.log('Ethereum object doesn\'t exist!')
			}
		}
		catch (error) {
			//setLoader(false)
			console.log(error)
		}
	}
	async function connectWallet() {
		try {
			const { ethereum } = window
			if (!ethereum) {
				alert('Must connect to MetaMask!')
				return
			}
			const myAccounts = await ethereum.request({ method: 'eth_requestAccounts' })

			console.log('Connected: ', myAccounts[0])
			account.value = myAccounts[0]

		}
		catch (error) {
			console.log(error)
		}
	}
	async function addSupplier(address: number, amount: number) {
		console.log('setting loader')
		//setLoader(true)
		try {
			const { ethereum } = window
			if (ethereum) {
				// create provider object from ethers library, using ethereum object injected by metamask
				const provider = new ethers.providers.Web3Provider(ethereum)
				const signer = provider.getSigner()
				const MacDee = new ethers.Contract(contractAddress, contractABI.abi, signer)

				const overrides = {
					value: ethers.utils.parseEther('.1'), // sending one ether
					gasLimit: 200000, // optional
				}
				/*
				* Execute the actual wave from your smart contract
				*/
				const waveTxn = await MacDee.addSupplier(address, amount)
				console.log('Mining...', waveTxn.hash)
				await waveTxn.wait()
				console.log('Mined -- ', waveTxn.hash)
			}
			else {
				console.log('Ethereum object doesn\'t exist!')
			}
		}
		catch (error) {
			//setLoader(false)
			console.log('Eroor')
			console.log(error)
		}
	}
	return {

		payForMeal,
		connectWallet,
		addSupplier,
		account,

	}
});
// contract adress 0x35708b2605A08A471a80059a8D89d3E1B098FB06
if (import.meta.hot)
	import.meta.hot.accept(acceptHMRUpdate(useCryptoStore, import.meta.hot))