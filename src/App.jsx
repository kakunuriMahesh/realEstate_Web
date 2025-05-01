import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";
import Navbar from "./Components/NavbarMain";
import Chatbot from "./Components/ChatbotModel";
import Footer from "./Components/FooterSection";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServicesSubPage from "./pages/ServicesSubPage";
import Contact from "./pages/ContactForm";
import Testimonials from "./pages/Testimonials";
import DetailedView from "./pages/DetailedView";
import SearchHouses from "./Components/SearchHouses";

function App() {
 
  return (
    <Provider store={store}>
      <Router>
        <div className="min-h-screen bg-gray-100 flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              {/* <Route path="/services" element={<Services />} /> */}
              <Route path="/services/:tab?" element={<Services />} />
              {/* <Route
                path="/services/sell"
                element={<ServicesSubPage type="sell" />}
              />
              <Route
                path="/services/purchase"
                element={<ServicesSubPage type="purchase" />}
              />
              <Route
                path="/services/rental"
                element={<ServicesSubPage type="rental" />}
              />
              <Route
                path="/services/management"
                element={<ServicesSubPage type="management" />}
              /> */}
              <Route path="/contact" element={<Contact />} />
              <Route path="/testimonials" element={<Testimonials />} />
              <Route path="/houses/:id" element={<DetailedView />} />
              <Route path="/properties" element={<SearchHouses/>}/>
            </Routes>
          </main>
          <Chatbot />
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;

// TODO: creating house and its house:id

// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Chatbot from "./components/Chatbot";
// import Home from "./pages/Home";
// import About from "./pages/About";
// import Services from "./pages/Services";
// import Contact from "./pages/Contact";
// import Testimonials from "./pages/Testimonials";
// import store from "./store/store";
// import { Provider } from "react-redux";
// import Footer from "./Components/Footer";

// function App() {
//   return (
//     <Provider store={store}>
//       <Router>
//         <div className="min-h-screen bg-gray-100">
//           <Navbar />
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/about" element={<About />} />
//             <Route path="/services" element={<Services />} />
//             <Route path="/contact" element={<Contact />} />
//             <Route path="/testimonials" element={<Testimonials />} />
//           </Routes>
//           <Chatbot />
//           <Footer/>
//         </div>
//       </Router>
//     </Provider>
//   );
// }

// export default App;
