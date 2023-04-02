import {ethers} from "./ethers.js"
import {FlashLoanAddressAbi, FlashLoanAddress} from "./Flashloan.js"

const connectButton = document.getElementById("connectButton")
const getBalanceButton = document.getElementById("getBalance")
const requestFlashLoanButton = document.getElementById("requestFlashLoan")
const withdrawButton = document.getElementById("withdrawButton")

connectButton.onclick = connect
getBalanceButton.onclick = getBalance
requestFlashLoanButton.onclick = requestFlashLoan
withdrawButton.onclick = withdraw

async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        await window.ethereum.request({method: "eth_requestAccounts"})
        document.getElementById("connectButton").innerHTML = "You have connected !"
    } else {
        document.getElementById("connectButton").innerHTML = "You should have a metamsk !"
    }
}

async function getBalance() {
    const ethAddress = prompt("请输入查询代币的地址")
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(FlashLoanAddress,FlashLoanAddressAbi,signer)

        const balance = await contract.getBalance(ethAddress)
        alert(balance.toString())
    }
}

async function requestFlashLoan(){
    const result = addFunction()
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(FlashLoanAddress,FlashLoanAddressAbi,signer)

        await contract.requestFlashLoan(result[0], result[1])
    }
}

async function withdraw(){
    const ethAddress = prompt("请输入取款代币的地址")
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)

        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(FlashLoanAddress,FlashLoanAddressAbi,signer)

        await contract.withdraw(ethAddress)
    }
}