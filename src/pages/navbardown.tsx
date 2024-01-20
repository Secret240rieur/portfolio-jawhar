import { Outlet, Link } from "react-router-dom";
import "./navbardown.css";

const Navbardown = () => {
  return (
    <div className="footerPart overflow-hidden">
      <div className="flex flex-wrap justify-around gap-7 p-4">
        <div className="footerLinks">
          <Link to="/" className="flex flex-col justify-center">
            Home
            <div id="icon" className="flex mx-auto">
              <img
                src={require("../Assets/multimedia/home_logo.png")}
                alt="home logo"
                id="iconLogo"
              />
            </div>
          </Link>
        </div>
        <div className="footerDescription">
          <span className="footerDescriptionTitle">My website</span>
          <p className="footerDescriptionText">
            My website help me practice what i learn in JavaScript and html
          </p>
        </div>
        <div className="footerLogo">
          <span className="footerLogoTitle">MyWebsite</span>
          <div className="flex flex-row mt-1">
            <a
              href="https://www.facebook.com/jawhar.elharrak/"
              target="_blank"
              rel="noreferrer"
              className="m-1 w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[aquamarine]"
            >
              <img
                src={require("../Assets/multimedia/fb_logo.png")}
                alt="fb logo"
                id="iconLogo"
              />
            </a>
            <a
              href="https://mobile.twitter.com/harrakjawhar"
              target="_blank"
              rel="noreferrer"
              className="m-1 w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[aquamarine]"
            >
              <img
                src={require("../Assets/multimedia/twitter_logo.png")}
                alt="twitter logo"
                id="iconLogo"
              />
            </a>
            <a
              href="https://www.instagram.com/jawhar_elharrak/"
              target="_blank"
              rel="noreferrer"
              className="m-1 w-[40px] h-[40px] rounded-full flex justify-center items-center bg-[aquamarine]"
            >
              <img
                src={require("../Assets/multimedia/instagram_logo.png")}
                alt="instagram logo"
                id="iconLogo"
              />
            </a>
          </div>
        </div>
      </div>
      {/* <div className="row"> */}
      <div className="footerModalTriggers flex flex-wrap justify-center gap-3 pb-4">
        <Link to="/about">About my website</Link>
        <Link to="/general_conditions">General conditions</Link>
      </div>
      {/* </div> */}
      <Outlet />
    </div>
  );
};

export default Navbardown;
