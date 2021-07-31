import React from "react";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";
import { AppContextProvider } from "./Context";
import Footer from "./components/Footer";
import AddCartModal from "./components/AddCartModal";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <AppContextProvider>
      <BrowserRouter>
        <div className="App">
          <ToastContainer />
          <AddCartModal />
          <Switch>
            <Route path={["/", "/home"]} exact component={Home} />
            <Route path={["/checkout"]} exact component={Checkout} />
          </Switch>
          <Footer />
        </div>
      </BrowserRouter>
    </AppContextProvider>
  );
}
