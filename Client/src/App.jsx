import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "./Components/Routing/Home";
import Final from "./Components/Routing/Final";
import Trails from "./Components/Secondpage/Trails";
import Navbar from "./Components/navbar/Navbar";
import Footer from "./Components/navbar/Footer";
import Blog from "./Components/Blog/Blog";
import ViewBlog from "./Components/Blog/ViewBlog";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import DashboardLayout from "./Components/adminpanel/DashboardLayout ";
import AddCategory from "./Components/Category/AddCategory";
import ViewCategory from "./Components/Category/ViewCategory";
import AddPlace from "./Components/Place/AddPlace";
import Viewdetails from "./Components/Details/Viewdetails";
import Viewplace from "./Components/Place/Viewplace";
import AddDetails from "./Components/Details/AddDetails";
import ErrorBoundary from "./Components/ErrorBoundary";
import { Toaster } from "react-hot-toast";
import MapOfNepal from "./Components/firstpage/MapofNepal";
import FrontBlog from "./Components/Blog/FrontBlog";
import ViewFrontBlog from "./Components/Blog/ViewFrontBlog";
import Nav from "./Components/navbar/Nav";
import ProtectedRoute from "./ProtectedRoute";
import useAuthStore from "./Components/store/AuthStore"; 
import Chatbot from "./Components/Blog/Chatbot";
import Dash from "./Components/adminpanel/Dash";
const queryClient = new QueryClient();

function App() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {isAuthenticated ? <Nav /> : <Navbar />}
        <Chatbot /> {/* ✅ Add Chatbot here */}
        <Toaster />
        <div className={isAuthenticated ? "pt-16" : ""}> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/trails" element={<Trails />} />
            <Route path="/details/:id" element={<Final />} />
            <Route path="/details" element={<Final />} />
            <Route
            path="/categories/:categoryId/places/:placeId"
            element={<Final />}
          />
            <Route path="/categories/:categoryId/trails" element={<Trails />} />
            <Route path="/MapofNepal" element={<MapOfNepal />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin/blogs" element={<ViewBlog />} />
            <Route path="/admin/blog/edit/:id" element={<ViewBlog />} />
            <Route path="/footer" element={<Footer />} />
            <Route path="/navbar" element={<Navbar />} />
            <Route path="/dash" element={<Dash/> } />
            <Route path="/nav" element={<Nav />} />
            <Route path="/blogging" element={<FrontBlog />} />
            <Route path="/ViewFrontBlog" element={<ViewFrontBlog />} />
            <Route path="/about" element={<div>About Page</div>} /> 
            <Route path="/destinations" element={<div>Destinations Page</div>} /> 

            <Route element={<ProtectedRoute />}>
              <Route
                path="/dashboard"
                element={
                  <DashboardLayout>
                    <h1><Dash/></h1>
                  </DashboardLayout>
                }
              />
              <Route
                path="/add-category"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <AddCategory />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/viewCategory"
                element={
                  <DashboardLayout>
                    <QueryClientProvider client={queryClient}>
                      <ViewCategory />
                    </QueryClientProvider>
                  </DashboardLayout>
                }
              />
              <Route
                path="/add-place"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <AddPlace />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/viewPlace"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Viewplace />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/viewblog"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <ViewBlog />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/add-details"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <AddDetails />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/viewDetails"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Viewdetails />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
              <Route
                path="/blogs"
                element={
                  <DashboardLayout>
                    <ErrorBoundary>
                      <Blog />
                    </ErrorBoundary>
                  </DashboardLayout>
                }
              />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;