import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../store/AuthStore";
import TopBar from "../firstpage/TopBar";
import Design from "../firstpage/desing";
import Features from "../firstpage/Feature";
import MapofNepal from "../firstpage/MapofNepal";
import Footer from '../navbar/Footer';
import Navbar from '../navbar/Navbar'
import FrontBlog from "../Blog/FrontBlog";
import Nav from "../navbar/Nav";

function Home() {
  const { isAuthenticated } = useAuthStore(state => state);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');  // Redirect to login if not authenticated
    }
  }, [isAuthenticated, navigate]);

  return (
    <>   
      <TopBar />
      <Design />
      <Features />
      <MapofNepal />
      <FrontBlog />
      <Footer />
    </>
  );
}

export default Home;
