import axios from "axios";
import React, { useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { Avatar, Fab } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import web3 from "web3";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function MyItems() {
  const router = useRouter();
  const web3Context = React.useContext(Web3Context);
  const {
    myNfts,
    myNftLoadingState,
    loadMyNfts,
    currentAddress,
    userData,
    createdNfts,
    createdNftLoadingState,
    loadCreatedNfts,
    loadRentedNFTs,
    rentedNfts,
  } = web3Context;
  const [nfts, setNfts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    console.log(currentAddress, "address");

    // window.ethereum.enable().then(function (accounts) {
    //   setCurrentAddress(accounts[0]);
    // });
    // let account = localStorage.getItem("account");
    // if (account !== null) {
    //   setCurrentAddress(account);
    // }
    refreshData();
    if (
      currentAddress !== "null" &&
      currentAddress !== "" &&
      currentAddress !== "undefined"
    ) {
      loadMyNfts();
      loadCreatedNfts();
      loadRentedNFTs();
    }
    if (
      userData.Name != undefined &&
      userData.WalletAddress == currentAddress
    ) {
      refreshData();
    }
    setIsRefreshing(false);
  }, [userData, currentAddress]);

  const refreshData = () => {
    router.replace(router.asPath);
    setIsRefreshing(true);
  };

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      {}
      <section id="subheader" className="text-light bg-container">
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1>My Items</h1>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {}
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  {/* {
                      userData.name != "" ? <div className="profile_avatar">
                      <img src={userData.email} alt />
                      <i className="fa fa-check" />
                      <div className="profile_name">
                        <h4>
                            {userData.name}
                          <span className="profile_username">{userData.userImage}</span>
                          <span id="wallet" className="profile_wallet">
                            {userData.userAddress}
                          </span>
                          <button type="button" id="btn_copy" title="Copy Text">
                            Copy
                          </button>
                        </h4>
                      </div>
                    </div> : */}
                  <div className="profile_avatar">
                    <Fab
                      size="large"
                      color="primary"
                      className="ml-3 font-weight-bold"
                    >
                      {userData.Initials != undefined ? userData.Initials : "u"}
                    </Fab>
                    {/* <img src="/img/author/author-1.jpg" alt /> */}
                    {/* <i className="fa fa-check" /> */}
                    <div className="profile_name">
                      <h4>
                        {" "}
                        {userData.Name != undefined ? userData.Name : "User"}
                        <span className="profile_username">
                          {" "}
                          {`${
                            userData.Username != undefined
                              ? "@" + userData.Username
                              : "@username"
                          }`}
                        </span>
                        {userData.WalletAddress != undefined ? (
                          <>
                            <span id="wallet" className="profile_wallet">
                              {userData.WalletAddress
                                ? userData.WalletAddress
                                : currentAddress}
                            </span>
                            <button
                              type="button"
                              id="btn_copy"
                              title="Copy Text"
                            >
                              Copy
                            </button>
                          </>
                        ) : (
                          ""
                        )}
                      </h4>
                    </div>
                  </div>
                  {/* }  */}
                </div>
                <div className="profile_follow de-flex">
                  <div className="de-flex-col">
                    <div className="profile_follower">500 followers</div>
                  </div>
                  <div className="de-flex-col">
                    <a href="#" className="btn-main">
                      Follow
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <Box sx={{ width: "100%" }}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  textColor="secondary"
                  indicatorColor="secondary"
                  aria-label="secondary tabs example"
                >
                  <Tab label="Created" {...a11yProps(0)} />
                  <Tab label="Purchased" {...a11yProps(1)} />
                  <Tab label="Rented" {...a11yProps(2)} />
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="col-md-12">
                  <div className="de_tab">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {createdNftLoadingState === true &&
                          !createdNfts.length ? (
                            <h1>No assets Created</h1>
                          ) : (
                            <>
                              {createdNfts.map((nft, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <Link
                                      href={{
                                        pathname: "details",
                                        query: {
                                          image: nft.image,
                                          description: nft.description,
                                          seller: nft.seller,
                                          tokenId: nft.tokenId,
                                          name: nft.name,
                                          price: web3.utils.fromWei(
                                            nft.price.toString(),
                                            "ether"
                                          ),
                                          owner: nft.owner,
                                          token: nft.token,
                                          chain: nft.chain,
                                          onRent: nft.onRent,
                                          rentingAmount: nft.rentingAmount,
                                          rented: nft.rented,
                                          expiryTime: nft.expiryTime,
                                          page: "myitems",
                                        },
                                      }}
                                      passHref={false}
                                    >
                                      <div className="nft__item">
                                        <div className="author_list_pp">
                                          <a href="#">
                                            <img
                                              className="lazy"
                                              src="/img/author/author-1.jpg"
                                              alt="true"
                                            />
                                            <i className="fa fa-check" />
                                          </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                          <a href="#">
                                            <img
                                              src={nft.image}
                                              className="lazy nft__item_preview"
                                              alt="true"
                                            />
                                          </a>
                                        </div>
                                        <div className="nft__item_info">
                                          <h4>{nft.name}</h4>

                                          <div className="nft__item_price">
                                            {web3.utils.fromWei(
                                              nft.price.toString(),
                                              "ether"
                                            )}
                                            {nft.token}
                                            <span>1/20</span>
                                          </div>

                                          <div className="nft__item_like">
                                            <i className="fa fa-heart" />
                                            <span>50</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={1}>
                <div className="col-md-12">
                  <div className="de_tab">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {myNftLoadingState === true && !myNfts.length ? (
                            <h1>No assets owned</h1>
                          ) : (
                            <>
                              {myNfts.map((nft, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <Link
                                      href={{
                                        pathname: "details",
                                        query: {
                                          image: nft.image,
                                          description: nft.description,
                                          seller: nft.seller,
                                          tokenId: nft.tokenId,
                                          name: nft.name,
                                          price: web3.utils.fromWei(
                                            nft.price.toString(),
                                            "ether"
                                          ),
                                          owner: nft.owner,
                                          token: nft.token,
                                          chain: nft.chain,
                                          onRent: nft.onRent,
                                          rentingAmount: nft.rentingAmount,
                                          page: "myitems",
                                        },
                                      }}
                                      passHref={false}
                                    >
                                      <div className="nft__item">
                                        <div className="author_list_pp">
                                          <a href="#">
                                            <img
                                              className="lazy"
                                              src="/img/author/author-1.jpg"
                                              alt="true"
                                            />
                                            <i className="fa fa-check" />
                                          </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                          <a href="#">
                                            <img
                                              src={nft.image}
                                              className="lazy nft__item_preview"
                                              alt="true"
                                            />
                                          </a>
                                        </div>
                                        <div className="nft__item_info">
                                          <h4>{nft.name}</h4>

                                          <div className="nft__item_price">
                                            {web3.utils.fromWei(
                                              nft.price.toString(),
                                              "ether"
                                            )}{" "}
                                            {nft.token}
                                            <span>1/20</span>
                                          </div>

                                          <div className="nft__item_like">
                                            <i className="fa fa-heart" />
                                            <span>50</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel value={value} index={2}>
                <div className="col-md-12">
                  <div className="de_tab">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {!rentedNfts.length ? (
                            <h1>No assets rented</h1>
                          ) : (
                            <>
                              {rentedNfts.map((nft, i) => {
                                return (
                                  <div
                                    key={i}
                                    className="col-lg-3 col-md-6 col-sm-6 col-xs-12"
                                  >
                                    <Link
                                      href={{
                                        pathname: "details",
                                        query: {
                                          image: nft.image,
                                          description: nft.description,
                                          seller: nft.seller,
                                          tokenId: nft.tokenId,
                                          name: nft.name,
                                          price: web3.utils.fromWei(
                                            nft.price.toString(),
                                            "ether"
                                          ),
                                          owner: nft.owner,
                                          token: nft.token,
                                          chain: nft.chain,
                                          onRent: nft.onRent,
                                          rentingAmount: nft.rentingAmount,
                                          page: "myitems",
                                        },
                                      }}
                                      passHref={false}
                                    >
                                      <div className="nft__item">
                                        <div className="author_list_pp">
                                          <a href="#">
                                            <img
                                              className="lazy"
                                              src="/img/author/author-1.jpg"
                                              alt="true"
                                            />
                                            <i className="fa fa-check" />
                                          </a>
                                        </div>
                                        <div className="nft__item_wrap">
                                          <a href="#">
                                            <img
                                              src={nft.image}
                                              className="lazy nft__item_preview"
                                              alt="true"
                                            />
                                          </a>
                                        </div>
                                        <div className="nft__item_info">
                                          <h4>{nft.name}</h4>

                                          <div className="nft__item_price">
                                            {web3.utils.fromWei(
                                              nft.price.toString(),
                                              "ether"
                                            )}
                                            {nft.token}
                                            <span>1/20</span>
                                          </div>

                                          <div className="nft__item_like">
                                            <i className="fa fa-heart" />
                                            <span>50</span>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </div>
                                );
                              })}
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Box>
          </div>
        </div>
      </section>
    </div>
  );
}

export default MyItems;
