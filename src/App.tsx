import React from "react";
import Kanbas from "./Kanbas";
import { HashRouter, Route, Routes, Navigate } from "react-router-dom";
import "./index.css";
import { Provider } from "react-redux";
import store from "./Kanbas/store";

function App() {
    return (
        <HashRouter>
            <div className="h-100">
                <Provider store={store}>
                    <Routes>
                        <Route path="/" element={<Navigate to="Kanbas" />} />
                        <Route path="/Kanbas/*" element={<Kanbas />} />
                    </Routes>
                </Provider>
            </div>
        </HashRouter>
    );
}

export default App;
