import './home.css';
import Navbardown from './navbardown';
import { Outlet, Link } from "react-router-dom";
import { CommentSection } from './commentSection';


const Home = () => {
    return (
        <>
            <div className='Home'>

                <h2>Jawhar El Harrak El Yousfi</h2>
                <p>Welcome to <span style={{ "fontWeight": "bold" }}>MyWebsite</span> </p>
                <p>Click the links above to access my resume</p>
            </div>
        <CommentSection/>
            <Navbardown />
        </>
    );
}

export default Home;
