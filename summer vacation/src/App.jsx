import React from "react";
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/js/Home";
import SpecificCity from "./components/js/SpecificCity";
import DefaultPage from "./components/js/DefaultPage";
import Layout from "./components/js/Layout";

export default function App() {
  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<DefaultPage string={"welcom🥳"} />} />
        <Route path="/home" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="London" >
            <Route index element={<SpecificCity string={"London"} />} />
          </Route>
          <Route path="New_York" >
            <Route index element={<SpecificCity string={"New_York"} />} />
          </Route>
          <Route path="Eylat" >
            <Route index element={<SpecificCity string={"Eylat"} />} />
          </Route>
          <Route path="Alaska" >
            <Route index element={<SpecificCity string={"Alaska"} />} />
          </Route>
        </Route>
        <Route path="*" element={<DefaultPage string={"oops the page you want arn't found😚"} />} />
      </Routes >
      </BrowserRouter>
    </>
  )
}
