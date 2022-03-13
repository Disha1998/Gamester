import React from "react";

function ItemDetails() {
    return (
      <div className="no-bottom no-top" id="content">
        <div id="top" />
        <section aria-label="section" className="mt90 sm-mt-0">
          <div className="container">
            <div className="row">
              <div className="col-md-6 text-center">
                <img
                  src="/img/items/big-1.jpg"
                  className="img-fluid img-rounded mb-sm-30"
                  alt="image"
                />
              </div>
              <div className="col-md-6">
                <div className="item_info">
                  Auctions ends in{" "}
                  <div
                    className="de_countdown"
                    data-year={2021}
                    data-month={9}
                    data-day={16}
                    data-hour={8}
                  />
                  <h2>Pinky Ocean</h2>
                  <div className="item_info_counts">
                    <div className="item_info_type">
                      <i className="fa fa-image" />
                      Art
                    </div>
                    <div className="item_info_views">
                      <i className="fa fa-eye" />
                      250
                    </div>
                    <div className="item_info_like">
                      <i className="fa fa-heart" />
                      18
                    </div>
                  </div>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                  <h6>Creator</h6>
                  <div className="item_author">
                    <div className="author_list_pp">
                      <a href="author.html">
                        <img
                          className="lazy"
                          src="/img/author/author-1.jpg"
                          alt="image"
                        />
                        <i className="fa fa-check" />
                      </a>
                    </div>
                    <div className="author_list_info">
                      <a href="author.html">Monica Lucas</a>
                    </div>
                  </div>
                  <div className="spacer-40" />
                  <div className="de_tab">
                    <ul className="de_nav">
                      <li className="active">
                        <span>Bids</span>
                      </li>
                      <li>
                        <span>History</span>
                      </li>
                    </ul>
                    <div className="de_tab_content">
                      <div className="tab-1">
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-1.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid accepted <b>0.005 ETH</b>
                            <span>
                              by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-2.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.005 ETH</b>
                            <span>
                              by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-3.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.004 ETH</b>
                            <span>
                              by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-4.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.003 ETH</b>
                            <span>
                              by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="tab-2">
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-5.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.005 ETH</b>
                            <span>
                              by <b>Jimmy Wright</b> at 6/14/2021, 6:40 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-1.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid accepted <b>0.005 ETH</b>
                            <span>
                              by <b>Monica Lucas</b> at 6/15/2021, 3:20 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-2.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.005 ETH</b>
                            <span>
                              by <b>Mamie Barnett</b> at 6/14/2021, 5:40 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-3.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.004 ETH</b>
                            <span>
                              by <b>Nicholas Daniels</b> at 6/13/2021, 5:03 AM
                            </span>
                          </div>
                        </div>
                        <div className="p_list">
                          <div className="p_list_pp">
                            <a href="author.html">
                              <img
                                className="lazy"
                                src="/img/author/author-4.jpg"
                                alt="image"
                              />
                              <i className="fa fa-check" />
                            </a>
                          </div>
                          <div className="p_list_info">
                            Bid <b>0.003 ETH</b>
                            <span>
                              by <b>Lori Hart</b> at 6/12/2021, 12:57 AM
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }


export default ItemDetails;
