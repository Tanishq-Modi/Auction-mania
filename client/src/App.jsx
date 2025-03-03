import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout, Home, ProductDetails} from "./routes/index";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/details"
          element={
            <Layout>
              <ProductDetails />
            </Layout>
          }
        />
        </Routes>
    </BrowserRouter>
  );
}

export default App;
