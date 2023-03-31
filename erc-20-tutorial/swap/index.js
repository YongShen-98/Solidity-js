import {ethers} from "./ethers.js"
import {abi1, contractAddress1} from "./constants1.js"
import {abi2, contractAddress2} from "./constants2.js"
import {constant_CPAMM_abi, constant_CPAMM_address} from "./constant_swap.js"

const connectButton = document.getElementById("connectButton")
const mintButton1 = document.getElementById("mintButton1")
const mintButton2 = document.getElementById("mintButton2")
const getbalanceButton1 = document.getElementById("getbalanceButton1")
const getbalanceButton2 = document.getElementById("getbalanceButton2")
const approveButton1 = document.getElementById("approveButton1")
const approveButton2 = document.getElementById("approveButton2")
const allowanceButton1 = document.getElementById("allowanceButton1")
const allowanceButton2 = document.getElementById("allowanceButton2")
const exchangeButton = document.getElementById("exchangeButton")
const addButton = document.getElementById("addButton")
const getreserve1 = document.getElementById("getreserve1")
const getreserve2 = document.getElementById("getreserve2")





connectButton.onclick = connect
mintButton1.onclick = mint1
mintButton2.onclick = mint2
approveButton1.onclick = approve1
approveButton2.onclick = approve2
allowanceButton1.onclick = allowance1
allowanceButton2.onclick = allowance2
exchangeButton.onclick = exchange
addButton.onclick = add
getbalanceButton1.onclick = getbalance1
getbalanceButton2.onclick = getbalance2
getreserve1.onclick = reserve1
getreserve2.onclick = reserve2


console.log(ethers)

async function reserve2(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(constant_CPAMM_address, constant_CPAMM_abi, signer)
    const a = await contract.reserve1()
    alert("池子中SOLBYEX2的数量为："+ a)
}

async function reserve1(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(constant_CPAMM_address,constant_CPAMM_abi,signer)
    const a = await contract.reserve0()
    alert("池子中SOLBYEX1的数量为："+a)
}

async function add(){
    const ethAmount = addFunction()
    //alert(ethAmount[1])
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(constant_CPAMM_address,constant_CPAMM_abi,signer)
        await contract.addLiquidity(ethAmount[0],ethAmount[1])
    }
}

async function exchange(){
    const ethAmount = myFunction()
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(constant_CPAMM_address,constant_CPAMM_abi,signer)
        await contract.swap(contractAddress1,ethAmount)
    }
}


async function connect() {
    if (typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        await window.ethereum.request({method: "eth_requestAccounts"})
        document.getElementById("connectButton").innerHTML = "You have connected !"
    } else {
        document.getElementById("connectButton").innerHTML = "You should have a metamsk !"
    }
}

async function mint1(){
    const ethAmount = prompt("请输入获取的SOLBYEX1 Token 的数量",1000000000000000000)
    console.log("ethAmount" + ""+ "is"+ethAmount)
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress1,abi1,signer)
        await contract.mint(ethAmount)
    }
}

async function mint2(){
    const ethAmount = prompt("请输入获取的SOLBYEX2 Token 的数量",1000000000000000000)
    console.log("ethAmount" + ""+ "is"+ethAmount)
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress2,abi2,signer)
        await contract.mint(ethAmount)
    }
}

async function getbalance1(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress1,abi1,signer)
    const accounts = await provider.send("eth_requestAccounts", [])
    const a = await contract.balanceOf(accounts[0])
    alert("当前钱包拥有的SOLBYEX1的数量："+a)
}

async function getbalance2(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress2,abi2,signer)
    const accounts = await provider.send("eth_requestAccounts", [])
    const a = await contract.balanceOf(accounts[0])
    alert("当前钱包拥有的SOLBYEX2的数量："+a)
}

async function approve1(){
    const ethAmount = prompt("请输入申请使用的SOLBYEX1 Token 的数量", 1000000000000000000)
    console.log("ethAmount" + "" + "is"+ethAmount)
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress1, abi1, signer)
        await contract.approve(constant_CPAMM_address, ethAmount)
    }
}

async function approve2(){
    const ethAmount = prompt("请输入申请使用的SOLBYEX2 Token 的数量", 1000000000000000000)
    console.log("ethAmount" + ""+ "is"+ethAmount)
    if(typeof window.ethereum !== "undefined") {
        console.log(window.ethereum)
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const signer = provider.getSigner()
        const contract = new ethers.Contract(contractAddress2, abi2, signer)
        await contract.approve(constant_CPAMM_address, ethAmount)
    }
}

async function allowance1(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress1,abi1,signer)
    const accounts = await provider.send("eth_requestAccounts", [])
    const a = await contract.allowance(accounts[0], constant_CPAMM_address)
    alert("当前钱包可以使用的SOLBYEX1数量:  "+a)
}

async function allowance2(){
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    const contract = new ethers.Contract(contractAddress2,abi2,signer)
    const accounts = await provider.send("eth_requestAccounts", [])
    const a = await contract.allowance(accounts[0], constant_CPAMM_address)
    alert("当前钱包可以使用的SOLBYEX2数量:  "+a)
}



