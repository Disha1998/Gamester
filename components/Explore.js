import React, { useEffect } from "react";

import { Web3Context } from "../context/Web3Context";
import Link from "next/link";
import { Avatar, Fab } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import { useRouter } from "next/router";
import Web3 from "web3";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 160,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function Explore() {
  const classes = useStyles();
  const router = useRouter();
  let web3 = new Web3();
  const web3Context = React.useContext(Web3Context);
  const {
    nfts,
    loadingState,
    loadNFTs,
    loader,
    buyNft,
    userAllData,
    loadSellerNfts,
    loadSellerCreatedNfts,
  } = web3Context;

  const [selectedValues, updateSelectedValues] = React.useState({
    category: "",
    nftType: "",
    chain: "",
  });
  const [nftsData, setNfts] = React.useState(nfts);

  // useEffect(() => {
  //   loadNFTs(selectedValues);
  // }, []);

  useEffect(() => {
    nfts && setNfts(nfts);
  }, [nfts]);

  useEffect(() => {
    loadNFTs();
  }, [selectedValues]);

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  const handleChangeNfttype = (event) => {
    setNftType(event.target.value);
  };

  const handleSellerProfile = (add) => {
    loadSellerNfts(add);
    loadSellerCreatedNfts(add);
  };

  return (
    <div className="no-bottom no-top" id="content">
      <div id="top" />
      {}
      <section className="text-light bg-container">
        <div className="center-y relative text-center">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="banner-text">
                  Rent and Earn passive Income from your Game NFT Assets!
                </h1>
                <p
                  className="text-white text-center"
                  style={{ fontWeight: "bold" }}
                >
                  Deployment state : Polygon Mumbai Testnet
                </p>
              </div>
              <div className="clearfix" />
            </div>
          </div>
        </div>
      </section>
      {}
      {}
      <div className="container">
        <div className="row wow fadeIn">
          {/* <div className="col-lg-2 col-sm-12 items_filter" style={{ marginTop: '20px' }}>
            <h5 style={{ textAlign: 'right' }}>Search By </h5>
          </div> */}
          {/* <div className="col-lg-4 col-sm-12 items_filter">
            <div className="form-group d-flex">
              <label
                style={{ fontSize: "14px", margin: "auto" }}
                htmlFor="exampleFormControlSelect1"
              >
                Search By:
              </label>
              <select
                className="form-control"
                style={{ width: "60%" }}
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  updateSelectedValues({
                    ...selectedValues,
                    category: e.target.value,
                  });
                }}
              >
                <option defaultValue="Category" value="">
                  Category
                </option>
                <option value="Christmas Gift">Christmas Gift</option>
                <option value="New Year Gift">New Year Gift</option>
                <option value="Bitcoin Day">Bitcoin Day</option>
                <option value="Valentines Gift">Valentines Gift</option>
                <option value="Birthday Gift">Birthday Gift</option>
                <option value="Annivarsary Gift">Annivarsary Gift</option>
              </select>
            </div>
          </div>
          <div className="col-lg-3 col-sm-12 items_filter">
            <div className="form-group ">
              <select
                className="form-control "
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  updateSelectedValues({
                    ...selectedValues,
                    nftType: e.target.value,
                  });
                }}
              >
                <option defaultValue=" Gift Type" value="">
                  Gift Type
                </option>
                <option value="Poetry">Poetry</option>
                <option value="Cryptocurrency">Cryptocurrency</option>
                <option value="Music">Music</option>
                <option value="Art">Art</option>
                <option value="Gamming Assets">Gamming Assets</option>
                <option value="Metaverse">Metaverse</option>
                <option value="Membership Subscription">
                  Membership Subscription
                </option>
                <option value="Event Ticket">Event Ticket</option>
              </select>
            </div>
          </div> */}
          {/* <div className="col-lg-3 col-sm-12 items_filter">
            <label
              style={{ fontSize: "14px", margin: "auto" }}
              htmlFor="exampleFormControlSelect1"
            >
              Search By:
            </label>
            <div className="form-group ">
              <select
                className="form-control "
                id="exampleFormControlSelect1"
                onChange={(e) => {
                  updateSelectedValues({
                    ...selectedValues,
                    chain: e.target.value,
                  });
                }}
              >
                <option defaultValue="Chain" value="">
                  Chain
                </option>
                <option value="Polygon">Polygon Network</option>
                <option value="Binance">Binance Smart Chain</option>
              </select>
            </div>
          </div> */}
        </div>
      </div>
      <section aria-label="section">
        <div className="container">
          {
            <div className="row wow fadeIn">
              {loadingState === true && !nftsData.length ? (
                <h1>No items in marketplace</h1>
              ) : (
                <>
                  {nftsData.map((nft, i) => {
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
                              page: "explore",
                            },
                          }}
                          passHref={false}
                        >
                          <div className="nft__item">
                            <div className="author_list_pp">
                              <a href="author.html">
                                <img
                                  className="lazy"
                                  src={`/img/author/author-${i + 1}.jpg`}
                                  alt="true"
                                />
                                <i className="fa fa-check" />
                              </a>
                            </div>
                            <div className="nft__item_wrap">
                              <a href="">
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
                              <div className="details-btn">
                                <div className="nft__item_action">
                                  <a href="#">Buy Now</a>
                                </div>
                                {nft.onRent == "true" ? (
                                  <div
                                    style={{ marginLeft: "10px" }}
                                    className="nft__item_action"
                                  >
                                    <a href="#">Rent Now</a>
                                  </div>
                                ) : (
                                  ""
                                )}
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
          }
        </div>
      </section>

      <section id="section-popular" className="pb-5">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="text-center">
                <h2>Top Sellers</h2>
                <div className="small-border bg-color-2" />
              </div>
            </div>
            <div className="col-lg-12 wow fadeIn">
              <ol className="author_list">
                {userAllData.length !== 0
                  ? userAllData.map((e) => {
                      return (
                        <li key={e.WalletAddress}>
                          <div className="author_list_pp">
                            {/* <a href=""> */}
                            <Fab
                              size="small"
                              color="secondary"
                              className="ml-3 font-weight-bold"
                            >
                              {e.Initials}
                            </Fab>
                          </div>
                          <div
                            onClick={() => handleSellerProfile(e.WalletAddress)}
                            className="author_list_info"
                          >
                            <p style={{ cursor: "pointer" }}>{e.Name}</p>
                          </div>
                        </li>
                      );
                    })
                  : ""}
              </ol>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Explore;
