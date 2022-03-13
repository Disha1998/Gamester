import React, { useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { create as ipfsHttpClient } from "ipfs-http-client";
import { db, auth, storage } from "../firebase/clientApp";

import web3 from 'web3'
import { useRouter } from 'next/router';
import { Avatar, Fab } from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getFirestore, collection, addDoc, getDocs, Timestamp, updateDoc, doc, where, query, } from "firebase/firestore";
const client = ipfsHttpClient("https://ipfs.infura.io:5001/api/v0");


function Profile() {
  const router = useRouter();
  const web3Context = React.useContext(Web3Context);
  const { currentAddress, userProfiles, userData, getUserData, firebaseData, userId,connectWallet } = web3Context;
  const [fileUrl, setFileUrl] = useState(null)
  const [formInput, updateFormInput] = useState({ name: 'User', bio: '', username: 'username', initial: 'U' });
  const [isRefreshing, setIsRefreshing] = useState(false);


  useEffect(() => { 
    if (userData.Name != undefined && userData.WalletAddress == currentAddress) {
      updateFormInput({ name: userData.Name, bio: userData.Bio, username: userData.Username, initial: userData.Initials })
      refreshData();
    } else {
      updateFormInput({ name: 'User', bio: '', username: 'username', initial: 'u' });
    }
    setIsRefreshing(false);
  }, [userData, currentAddress])

  const metadata = {
    contentType: 'image/jpeg',
  };

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  async function submitProfile() {
    const { name, bio, username } = formInput 
    if (currentAddress == "" && currentAddress == 'null') {
       alert("please connect wallet!!"); 
    }

    if (currentAddress != "" && currentAddress !== "null" && currentAddress !== 'undefined' && userData.WalletAddress !== currentAddress) {
      const docRef = await addDoc(collection(db, 'Nft-Marketplace'), {
        Bio: bio,
        Name: name,
        Username: username,
        Initials: name[0],
        WalletAddress: currentAddress,
        createdAt: Timestamp.fromDate(new Date()).toDate(),
        updatedAt: '',
      });
      toast.success("Profile data is successfully Submited!!!");
      // updateFormInput({ ...formInput, bio:'',name:'',username:''})
    } else if (currentAddress != "" && currentAddress !== "null" && userData.WalletAddress === currentAddress) {
      const updateData = doc(db, "Nft-Marketplace", userId);
      await updateDoc(updateData, {
        Bio: bio,
        Name: name,
        Username: username,
        Initials: name[0],
        WalletAddress: currentAddress,
        updatedAt: Timestamp.fromDate(new Date()).toDate(),
      });
      toast.success("Profile data is successfully Updated!!!");
      // updateFormInput({ ...formInput, bio:'',name:'',username:''});
    } else {
      toast.error("something went wrong!!! Please Connect Wallet",{delay:1000}); 
      connectWallet();
    }
  }

  // async function createProfile(url) {
  //   console.log("url ipfs", url);
  // }

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      <ToastContainer />
      { }
      <section
        id="subheader"
        className="text-light bg-container"

      >
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>Edit profile</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      { }
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-6 offset-md-3">
              {/* <button className="btn btn-primary" onClick={getUserData}>get user data</button> */}
              <form
                name="userProfile"
                id="userProfile"
                className="form-border"

              >
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <Fab size="large" color="primary" className="ml-3 font-weight-bold">
                      {formInput.initial}
                    </Fab>
                    {/* <img
                      src={fileUrl !== null ? fileUrl : "/img/author_single/author_thumbnail.jpg"}
                      alt="image"
                    /> */}
                    {/* <i className="fa fa-check"></i> */}
                    <div className="profile_name">
                      <h4>
                        {formInput.name}
                        <span className="profile_username"> {`${"@" + formInput.username}`}</span>
                        {/* <span className="profile_username"> {` ${formInput.username.length !== 0 ? "@" + formInput.username.toLocaleLowerCase().split(' ').join('') : "username"}`}</span> */}
                        <span id="wallet" className="profile_wallet">
                          {currentAddress}
                        </span>
                        <button type="button" id="btn_copy" title="Copy Text">
                          Copy
                        </button>
                      </h4>
                    </div>
                  </div>
                </div>
                <br />
                <div className="field-set">
                  {/* <h5>Upload Profile</h5>
                  <div className="d-create-file">
                    <p id="file_name">PNG, JPG</p>
                    <label
                      htmlFor="files"
                      id="get_file"
                      name="Asset"
                      className="btn-main"
                      style={{ color: "white" }}
                    >
                      Browse
                    </label>
                    <input id="files" onChange={onChange} style={{ display: "none" }} type="file" />

                  </div> */}
                  <label>Display name</label>
                  <input
                    type="text"
                    name="name"
                    id="dname"
                    value={formInput.name}
                    className="form-control"
                    placeholder="Enter your display name"
                    onChange={(e) => {
                      const init = e.target.value.trim();
                      updateFormInput({ ...formInput, name: e.target.value, initial: init[0] });
                    }
                    }
                  />
                </div>
                <div className="field-set">
                  <label>User Name</label>
                  <input
                    type="text"
                    name="username"
                    id="username"
                    value={formInput.username}
                    className="form-control"
                    placeholder="Enter Your Username"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, username: e.target.value })
                    }
                  />
                </div>
                <div className="field-set">
                  <label>Bio</label>
                  <input
                    type="text"
                    name="bio"
                    id="bio"
                    value={formInput.bio}
                    className="form-control"
                    placeholder="Tell about yourself in few words"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, bio: e.target.value })
                    }
                  />
                </div>
                {/* <div className="field-set">
                  <label>Email</label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    defaultValue={userData != null ? userData.Email : ' '}
                    className="form-control"
                    placeholder="Enter your email"
                    onChange={(e) =>
                      updateFormInput({ ...formInput, email: e.target.value })
                    }
                  />
                </div> */}
                <div id="submit">
                  <input
                    type="button"
                    defaultValue={userData.WalletAddress == currentAddress ? "Update Profile" : "Create Profile"}
                    className="btn btn-main color-2"
                    onClick={submitProfile}
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


export default Profile;
