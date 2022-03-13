import React from "react";

import { faArrowRight } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Footer() {
  return (
    <footer className="footer-light">
      <div className="subfooter" style={{ backgroundColor: "#FF355C" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="de-flex">
                <div className="de-flex-col">
                  <a href="#">
                    <h2 className="footer-logo">
                      <i className="fa fa-gift"></i> Gamester
                    </h2>
                  </a>
                </div>
                <div className="de-flex-col">
                  <div className="social-icons">
                    <a href="#">
                      <i
                        style={{ backgroundColor: "white" }}
                        className="fa fa-twitter fa-lg"
                      />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
