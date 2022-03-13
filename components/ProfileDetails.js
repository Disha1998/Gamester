import React, { useEffect, useState } from "react";
import { Web3Context } from "../context/Web3Context";
import { Avatar, Fab } from "@material-ui/core";
import { useRouter } from "next/router";
import Link from "next/link";

import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

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

function ProfileDetails() {
  const router = useRouter();
  const web3Context = React.useContext(Web3Context);
  const {
    sellerData,
    sellerNfts,
    currentAddress,
    myNftLoadingState,
    sellersCreatedNfts,
    createdNftLoadingState,
  } = web3Context;
  const [nfts, setNfts] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const [open, setOpen] = React.useState(false);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {}, [sellerData]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
                {/* <h1>My Items</h1> */}
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {}
      <Dialog open={open} fullWidth={"true"} onClose={handleClose}>
        <DialogTitle>Send Message</DialogTitle>
        <DialogContent>
          {/* <DialogContentText>
                        To subscribe to this website, please enter your email address here. We
                        will send updates occasionally.
                    </DialogContentText> */}
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Message"
            type="email"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleClose}>Send</Button>
        </DialogActions>
      </Dialog>
      {}
      <section aria-label="section">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="d_profile de-flex">
                <div className="de-flex-col">
                  <div className="profile_avatar">
                    <Fab
                      size="large"
                      color="primary"
                      className="ml-3 font-weight-bold"
                    >
                      {sellerData.Initials != undefined
                        ? sellerData.Initials
                        : "u"}
                    </Fab>

                    <div className="profile_name">
                      <h4>
                        {" "}
                        {sellerData.Name != undefined
                          ? sellerData.Name
                          : "User"}
                        <span className="profile_username">
                          {" "}
                          {`${
                            sellerData.Username != undefined
                              ? "@" + sellerData.Username
                              : "@username"
                          }`}
                        </span>
                        {sellerData.WalletAddress != undefined ? (
                          <>
                            <span id="wallet" className="profile_wallet">
                              {sellerData.WalletAddress
                                ? sellerData.WalletAddress
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
                  <div className="de-flex-col" onClick={handleClickOpen}>
                    <a href="#" className="btn-main">
                      Send Message
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
                </Tabs>
              </Box>
              <TabPanel value={value} index={0}>
                <div className="col-md-12">
                  <div className="de_tab">
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="row">
                          {createdNftLoadingState === true &&
                          !sellersCreatedNfts.length ? (
                            <h1>No assets Created</h1>
                          ) : (
                            <>
                              {sellersCreatedNfts.map((nft, i) => {
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
                                          price: nft.price,
                                          owner: nft.owner,
                                          token: nft.token,
                                          chain: nft.chain,
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
                                            {nft.price} {nft.token}
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
                          {myNftLoadingState === true && !sellerNfts.length ? (
                            <h1>No assets owned</h1>
                          ) : (
                            <>
                              {sellerNfts.map((nft, i) => {
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
                                          price: nft.price,
                                          owner: nft.owner,
                                          token: nft.token,
                                          chain: nft.chain,
                                          page: "myitems",
                                        },
                                      }}
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
                                            {nft.price} {nft.token}
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

export default ProfileDetails;
