import React, { useState, createContext, useEffect } from "react";

import Web3Modal from "web3modal";
import Web3 from "web3";
import axios from "axios";
import NFT from "../artifacts/contracts/NFT.sol/NFT.json";
import Market from "../artifacts/contracts/NFTMarket.sol/NFTMarket.json";
import Rent from "../artifacts/contracts/Rent.sol/Rent.json";
// import User from "../artifacts/contracts/UserProfile.sol/UserProfile.json";
import { ethers } from "ethers";
import {
  bscAddress,
  bscMarketAddress,
  nftaddress,
  nftmarketaddress,
  useraddresss,
  userTokenAddress,
} from "../config";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  query,
  where,
  addDoc,
  getDocs,
  deleteDoc,
  Timestamp,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";

import { db, auth, storage } from "../firebase/clientApp";
export const Web3Context = createContext(undefined);

export const Web3ContextProvider = (props) => {
  const router = useRouter();
  const [nfts, setNfts] = useState([]);
  const [myNfts, setMyNfts] = useState([]);
  const [createdNfts, setCreatedNfts] = useState([]);
  const [loadingState, setLoadingState] = useState(false);
  const [myNftLoadingState, setMyNftLoadingState] = useState(false);
  const [createdNftLoadingState, setCreatedNftLoadingState] = useState(false);
  const [currentAddress, setCurrentAddress] = useState("");
  const [userData, setUserData] = useState([]);
  const [firebaseData, setfirebaseData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState("");
  const [userAllData, setuserAllData] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [creator, setCreator] = useState("");

  const [sellerNfts, setSellerNfts] = useState([]);
  const [sellersCreatedNfts, setSellersCreatedNfts] = useState([]);
  const [sellerData, setSellerData] = useState([]);
  const [nftDetails, setNftDetails] = useState();
  const [rentLoading, setRentLoading] = useState(false);
  const [rentedNfts, setRentedNfts] = useState([]);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  useEffect(() => {
    let web3 = new Web3();
    window.onunload = () => {
      // Clear the local storage
      window.Storage.clear();
    };
    // window.ethereum.enable().then(function (accounts) {
    //   setCurrentAddress(accounts[0]);
    // });
    // let account = localStorage.getItem("account");
    // if (account !== null) {
    //   setCurrentAddress(account);
    // }

    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        // window.ethereum.enable().then(function (accounts) {
        //   setCurrentAddress(accounts[0]);
        //   localStorage.setItem("account", accounts[0]);
        window.ethereum.on("accountsChanged", function (accounts) {
          setCurrentAddress(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          setIsRefreshing(false);
          // loadMyNfts();
        });
        // });
      } catch (e) {
        alert("User rejected the MetaMask connection request !");
        localStorage.setItem("account", null);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    }

    // window.ethereum.on("accountsChanged", function (accounts) {
    //   if (accounts.length > 0) {
    //     setCurrentAddress(accounts[0]);
    //     localStorage.setItem("account", accounts[0]);
    //   } else {
    //     setCurrentAddress("");
    //     localStorage.setItem("account", null);
    //   }
    //   setIsRefreshing(false);
    //   loadMyNfts();
    // });
    getAllUserFirebaseData();
    getUserFirebaseData(currentAddress);
    refreshData();
  }, [currentAddress]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  async function getAllUserFirebaseData() {
    const userData = collection(db, "Nft-Marketplace");
    const userSnapshot = await getDocs(userData);
    const tempUserList = userSnapshot.docs.map((doc) => doc.data());
    setuserAllData(tempUserList);
  }

  async function getUserFirebaseData(address) {
    try {
      const q = query(
        collection(db, "Nft-Marketplace"),
        where("WalletAddress", "==", address)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUserData(doc.data());
        setUserId(doc.id);
      });
    } catch (error) {
      alert("Please Reconnect Your Wallet!!");
    }
  }

  async function getCreatorData(address) {
    const q = query(
      collection(db, "Nft-Marketplace"),
      where("WalletAddress", "==", address)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCreator(doc.data());
    });
  }

  async function getNftDataByTokenId(tokenId) {
    const q = query(
      collection(db, "rent-NFT"),
      where("tokenId", "==", parseInt(tokenId))
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setNftDetails(doc.data());
    });
  }

  async function connectWallet() {
    if (window.ethereum) {
      web3 = new Web3(window.ethereum);
      try {
        window.ethereum.enable().then(function (accounts) {
          setCurrentAddress(accounts[0]);
          localStorage.setItem("account", accounts[0]);
          window.ethereum.on("accountsChanged", function (accounts) {
            setCurrentAddress(accounts[0]);
            localStorage.setItem("account", accounts[0]);
          });
        });
      } catch (e) {
        alert("User rejected the MetaMask connection request !");
        localStorage.setItem("account", null);
      }
    } else if (window.web3) {
      web3 = new Web3(window.web3.currentProvider);
    } else {
      alert("You have to install MetaMask!");
    }
  }
  async function loadNFTs(filterobj) {
    setLoadingState(false);
    let tempNftlist = [];
    const nftData = collection(db, "rent-NFT");
    const userSnapshot = await getDocs(nftData);
    if (
      filterobj.category !== "" &&
      filterobj.nftType === "" &&
      filterobj.chain === ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("category", "==", filterobj.category),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category === "" &&
      filterobj.nftType !== "" &&
      filterobj.chain === ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("nftType", "==", filterobj.nftType),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category === "" &&
      filterobj.nftType === "" &&
      filterobj.chain !== ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("chain", "==", filterobj.chain),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category !== "" &&
      filterobj.nftType !== "" &&
      filterobj.chain !== ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("chain", "==", filterobj.chain),
        where("nftType", "==", filterobj.nftType),
        where("category", "==", filterobj.category),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category !== "" &&
      filterobj.nftType !== "" &&
      filterobj.chain === ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("nftType", "==", filterobj.nftType),
        where("category", "==", filterobj.category),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category !== "" &&
      filterobj.nftType === "" &&
      filterobj.chain !== ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("chain", "==", filterobj.chain),
        where("category", "==", filterobj.category),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else if (
      filterobj.category === "" &&
      filterobj.nftType !== "" &&
      filterobj.chain !== ""
    ) {
      const q = query(
        collection(db, "rent-NFT"),
        where("chain", "==", filterobj.chain),
        where("nftType", "==", filterobj.nftType),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    } else {
      const q = query(
        collection(db, "rent-NFT"),
        where("rented", "==", false),
        where("renter", "==", ""),
        where("purchased", "==", false),
        where("buyer", "==", "")
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        tempNftlist.push(doc.data());
      });
    }

    setNfts(tempNftlist);
    setLoadingState(true);
  }

  async function loadRentedNFTs() {
    let tempNftlist = [];
    const q = query(
      collection(db, "rent-NFT"),
      where("rented", "==", true),
      where("renter", "==", currentAddress.toString())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempNftlist.push(doc.data());
    });
    setRentedNfts(tempNftlist);
  }

  async function loadMyNfts() {
    const netId = window.ethereum.networkVersion;
    let conAdd;
    let marAdd;
    if (netId == "97") {
      conAdd = bscAddress;
      marAdd = bscMarketAddress;
    } else if (netId == "80001") {
      conAdd = nftaddress;
      marAdd = nftmarketaddress;
    }
    let tempNftlist = [];
    const q = query(
      collection(db, "rent-NFT"),
      where("purchased", "==", true),
      where("buyer", "==", currentAddress.toString())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempNftlist.push(doc.data());
    });
    // let web3 = new Web3();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    // const marketContract = new ethers.Contract(marAdd, Market.abi, signer);
    // const tokenContract = new ethers.Contract(conAdd, NFT.abi, provider);
    // const data = await marketContract.fetchMyNFTs();
    // console.log(data, "data");

    // const items = await Promise.all(
    //   data.map(async (i) => {
    //     console.log(i, "i");
    //     const tokenUri = await tokenContract.tokenURI(i.tokenId);
    //     console.log(tokenUri, "tokenUri");
    //     const meta = await axios.get(tokenUri);
    //     let price = web3.utils.fromWei(i.price.toString(), "ether");
    //     let item = {
    //       price,
    //       name: meta.data.name,
    //       tokenId: i.tokenId.toNumber(),
    //       description: meta.data.description,
    //       seller: i.seller,
    //       owner: i.owner,
    //       image: meta.data.image,
    //       token: meta.data.token,
    //       chain: meta.data.chain,
    //       onRent: meta.data.onRent,
    //       rentingAmount: meta.data.rentingAmount,
    //     };
    //     return item;
    //   })
    // );
    setMyNfts(tempNftlist);
    setMyNftLoadingState(true);
  }

  async function loadCreatedNfts() {
    const netId = window.ethereum.networkVersion;
    let conAdd;
    let marAdd;
    if (netId == "97") {
      conAdd = bscAddress;
      marAdd = bscMarketAddress;
    } else if (netId == "80001") {
      conAdd = nftaddress;
      marAdd = nftmarketaddress;
    }
    setCreatedNftLoadingState(false);
    // let web3 = new Web3();
    // const provider = new ethers.providers.Web3Provider(window.ethereum);
    // const signer = provider.getSigner();

    // const marketContract = new ethers.Contract(marAdd, Market.abi, signer);
    // const tokenContract = new ethers.Contract(conAdd, NFT.abi, provider);
    // const data = await marketContract.fetchCreateNFTs();

    // const items = await Promise.all(
    //   data.map(async (i) => {
    //     const tokenUri = await tokenContract.tokenURI(i.tokenId);
    //     const meta = await axios.get(tokenUri);
    //     console.log("metaa", tokenUri);

    //     let price = web3.utils.fromWei(i.price.toString(), "ether");
    //     let item = {
    //       price,
    //       name: meta.data.name,
    //       tokenId: i.tokenId.toNumber(),
    //       description: meta.data.description,
    //       seller: i.seller,
    //       owner: i.owner,
    //       image: meta.data.image,
    //       token: meta.data.token,
    //       chain: meta.data.chain,
    //       onRent: meta.data.onRent,
    //       rentingAmount: meta.data.rentingAmount,
    //     };
    //     return item;
    //   })
    // );
    let tempNftlist = [];
    const q = query(
      collection(db, "rent-NFT"),
      where("seller", "==", currentAddress.toString())
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tempNftlist.push(doc.data());
    });
    setCreatedNfts(tempNftlist);
    setCreatedNftLoadingState(true);
  }

  async function getSellerFirebaseData(address) {
    const q = query(
      collection(db, "Nft-Marketplace"),
      where("WalletAddress", "==", address)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSellerData(doc.data());
    });
  }

  async function loadSellerNfts(sellerAddress) {
    const networkId = window.ethereum.networkVersion;

    if (sellerAddress) {
      getSellerFirebaseData(sellerAddress);
    }
    let conAdd;
    let marAdd;
    if (networkId == "97") {
      conAdd = bscAddress;
      marAdd = bscMarketAddress;
    } else if (networkId == "80001") {
      conAdd = nftaddress;
      marAdd = nftmarketaddress;
    }
    let web3 = new Web3();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(marAdd, Market.abi, signer);
    const tokenContract = new ethers.Contract(conAdd, NFT.abi, provider);
    const data = await marketContract.fetchSellerNFTs(sellerAddress);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = web3.utils.fromWei(i.price.toString(), "ether");
        let item = {
          price,
          name: meta.data.name,
          tokenId: i.tokenId.toNumber(),
          description: meta.data.description,
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          token: meta.data.token,
          chain: meta.data.chain,
          onRent: meta.data.onRent,
          rentingAmount: meta.data.rentingAmount,
        };
        return item;
      })
    );
    setSellerNfts(items);
    setMyNftLoadingState(true);
    router.push("/profile-details");
  }

  async function loadSellerCreatedNfts(sellerAddress) {
    const networkId = window.ethereum.networkVersion;
    setCreatedNftLoadingState(false);
    if (sellerAddress) {
      getSellerFirebaseData(sellerAddress);
    }
    let conAdd;
    let marAdd;
    if (networkId == "97") {
      conAdd = bscAddress;
      marAdd = bscMarketAddress;
    } else if (networkId == "80001") {
      conAdd = nftaddress;
      marAdd = nftmarketaddress;
    }
    let web3 = new Web3();
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const marketContract = new ethers.Contract(marAdd, Market.abi, signer);
    const tokenContract = new ethers.Contract(conAdd, NFT.abi, provider);
    const data = await marketContract.fetchSellersCreateNFTs(sellerAddress);

    const items = await Promise.all(
      data.map(async (i) => {
        const tokenUri = await tokenContract.tokenURI(i.tokenId);
        const meta = await axios.get(tokenUri);
        let price = web3.utils.fromWei(i.price.toString(), "ether");
        let item = {
          price,
          name: meta.data.name,
          tokenId: i.tokenId.toNumber(),
          description: meta.data.description,
          seller: i.seller,
          owner: i.owner,
          image: meta.data.image,
          token: meta.data.token,
          chain: meta.data.chain,
          onRent: meta.data.onRent,
          rentingAmount: meta.data.rentingAmount,
        };
        return item;
      })
    );
    setSellersCreatedNfts(items);
    setCreatedNftLoadingState(true);
    router.push("/profile-details");
  }

  async function buyNft(nft) {
    const networkId = window.ethereum.networkVersion;
    let web3 = new Web3();

    if (nft.token == "BSC" && networkId !== "97") {
      alert(
        "Please connect to the BSC Testnet network in Metamask to continue!"
      );
    } else if (nft.token == "MATIC" && networkId !== "80001") {
      alert(
        "Please connect to the Polygon Mumbai Testnet network in Metamask to continue!"
      );
    } else {
      try {
        setLoader(true);
        connectWallet();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          nftmarketaddress,
          Market.abi,
          signer
        );
        const price = web3.utils.toWei(nft.price.toString(), "ether");

        console.log(price);
        const transaction = await contract.createMarketSale(
          nftaddress,
          nft.tokenId,
          {
            value: price,
          }
        );

        // await updateDoc(updateData, {
        //   Bio: bio,
        //   Name: name,
        //   Username: username,
        //   Initials: name[0],
        //   WalletAddress: currentAddress,
        //   updatedAt: Timestamp.fromDate(new Date()).toDate(),
        // });

        const q = query(
          collection(db, "rent-NFT"),
          where("tokenId", "==", parseInt(nft.tokenId)),
          where("chain", "==", nft.chain)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (e) => {
          await updateDoc(doc(db, "rent-NFT", e.id), {
            purchased: true,
            buyer: currentAddress.toString(),
          });
        });
        await transaction.wait();
        loadNFTs({
          category: "",
          nftType: "",
          chain: "",
        });
        loadMyNfts(networkId);
        setLoader(false);
        router.push("/my-items");
      } catch (error) {
        const price = web3.utils.toWei(nft.price.toString(), "ether");
        console.log(price);
        setLoader(false);
        alert(error.data?.message);
        console.log("err", error);
      }
    }
  }

  async function rentNft(nft) {
    const networkId = window.ethereum.networkVersion;

    if (nft.token == "BSC" && networkId !== "97") {
      alert(
        "Please connect to the BSC Testnet network in Metamask to continue!"
      );
    } else if (nft.token == "MATIC" && networkId !== "80001") {
      alert(
        "Please connect to the Polygon Mumbai Testnet network in Metamask to continue!"
      );
    } else {
      try {
        setRentLoading(true);
        connectWallet();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          nft.rentContractAdd,
          Rent.abi,
          signer
        );

        const price = nft.rentingAmount + 100000000000000000; // Added 0.1 eth extra to add in contract balance.

        const transaction = await contract.rentToken(
          currentAddress,
          nft.rentingAmount,
          {
            value: price.toString(),
          }
        );
        const q = query(
          collection(db, "rent-NFT"),
          where("tokenId", "==", parseInt(nft.tokenId)),
          where("chain", "==", nft.chain)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (e) => {
          await updateDoc(doc(db, "rent-NFT", e.id), {
            rented: true,
            renter: currentAddress.toString(),
          });
        });

        await transaction.wait();
        loadNFTs({
          category: "",
          nftType: "",
          chain: "",
        });
        loadMyNfts(networkId);
        setRentLoading(false);
        router.push("/my-items");
      } catch (error) {
        setRentLoading(false);
        alert(error.data?.message);
        console.log("err", error);
      }
    }
  }

  async function withdrawNft(nft) {
    const networkId = window.ethereum.networkVersion;

    if (nft.token == "BSC" && networkId !== "97") {
      alert(
        "Please connect to the BSC Testnet network in Metamask to continue!"
      );
    } else if (nft.token == "MATIC" && networkId !== "80001") {
      alert(
        "Please connect to the Polygon Mumbai Testnet network in Metamask to continue!"
      );
    } else {
      try {
        setWithdrawLoading(true);
        connectWallet();
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);

        const signer = provider.getSigner();
        const contract = new ethers.Contract(
          nft.rentContractAdd,
          Rent.abi,
          signer
        );

        const latestTime = Math.floor(Date.now() / 1000);
        const transaction = await contract.withdrawToken();

        const q = query(
          collection(db, "rent-NFT"),
          where("tokenId", "==", parseInt(nft.tokenId)),
          where("chain", "==", nft.chain)
        );

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async (e) => {
          await updateDoc(doc(db, "rent-NFT", e.id), {
            rented: false,
            renter: "",
            expiryTime: latestTime + 900, // Increased expiry time to 15 minutes to do renting again
          });
        });

        await transaction.wait();
        loadNFTs({
          category: "",
          nftType: "",
          chain: "",
        });
        let tokencontract = new ethers.Contract(nftaddress, NFT.abi, signer);

        await tokencontract.approve(await contract.wrappedToken(), nft.tokenId);
        loadMyNfts(networkId);
        loadCreatedNfts();
        setWithdrawLoading(false);
        router.push("/");
      } catch (error) {
        setWithdrawLoading(false);
        alert(error.data?.message);
        console.log("err", error);
      }
    }
  }

  return (
    <Web3Context.Provider
      value={{
        loadNFTs,
        buyNft,
        userId,
        userAllData,
        nfts,
        loader,
        loadingState,
        myNfts,
        createdNfts,
        createdNftLoadingState,
        myNftLoadingState,
        loadMyNfts,
        loadCreatedNfts,
        loadSellerCreatedNfts,
        sellersCreatedNfts,
        currentAddress,
        // userProfiles,
        userData,
        sellerNfts,
        sellerData,
        getSellerFirebaseData,
        loadSellerNfts,
        getUserFirebaseData,
        getCreatorData,
        // getUserData,
        connectWallet,
        getNftDataByTokenId,
        rentNft,
        rentLoading,
        loadRentedNFTs,
        rentedNfts,
        withdrawNft,
        withdrawLoading,
        firebaseData,
        creator,
        nftDetails,
      }}
      {...props}
    >
      {props.children}
    </Web3Context.Provider>
  );
};
