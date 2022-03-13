import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { Web3ContextProvider } from "../context/Web3Context";
function MyApp({ Component, pageProps }) {

  return (
    <Web3ContextProvider>
      <Layout>
        <Head>
          <link rel="stylesheet" type="text/css" href="css/app.min.css" />
          <link rel="stylesheet" type="text/css" href="css/custom.css" />
          <link
            rel="stylesheet"
            type="text/css"
            charSet="UTF-8"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
          />
          <link
            rel="stylesheet"
            type="text/css"
            href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
          />

          <link rel="stylesheet" type="text/css" href="css/app.min.css" />
          <link rel="stylesheet" type="text/css" href="css/custom.css" />

          <link
            id="bootstrap"
            href="css/bootstrap.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            id="bootstrap-grid"
            href="css/bootstrap-grid.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            id="bootstrap-reboot"
            href="css/bootstrap-reboot.min.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="css/animate.css" rel="stylesheet" type="text/css" />
          <link href="css/owl.carousel.css" rel="stylesheet" type="text/css" />
          <link href="css/owl.theme.css" rel="stylesheet" type="text/css" />
          <link
            href="css/owl.transitions.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="css/magnific-popup.css"
            rel="stylesheet"
            type="text/css"
          />
          <link
            href="css/jquery.countdown.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="css/style.css" rel="stylesheet" type="text/css" />

          <link
            id="colors"
            href="css/colors/scheme-01.css"
            rel="stylesheet"
            type="text/css"
          />
          <link href="css/coloring.css" rel="stylesheet" type="text/css" />
          <link
            href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
            rel="stylesheet"
          />

          <script src="js/jquery.min.js"></script>
          <script src="js/bootstrap.min.js"></script>
          <script src="js/bootstrap.bundle.min.js"></script>
          <script src="js/wow.min.js"></script>
          <script src="js/jquery.isotope.min.js"></script>
          <script src="js/easing.js"></script>
          <script src="js/owl.carousel.js"></script>
          <script src="js/validation.js"></script>
          <script src="js/jquery.magnific-popup.min.js"></script>
          <script src="js/enquire.min.js"></script>
          <script src="js/jquery.plugin.js"></script>
          <script src="js/jquery.countTo.js"></script>
          <script src="js/jquery.countdown.js"></script>
          <script src="js/jquery.lazy.min.js"></script>
          <script src="js/jquery.lazy.plugins.min.js"></script>
          <script src="js/designesia.js"></script>
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Web3ContextProvider>
  );
}

export default MyApp;
