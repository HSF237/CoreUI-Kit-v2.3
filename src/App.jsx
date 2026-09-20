import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage.jsx";
import ComponentDetailPage from "./pages/ComponentDetailPage.jsx";
import DocsLayout from "./pages/docs/DocsLayout.jsx";
import DocsPage from "./pages/docs/DocsPage.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="components/:slug" element={<ComponentDetailPage />} />
        <Route path="docs" element={<DocsLayout />}>
          <Route index element={<DocsPage />} />
          <Route path=":slug" element={<DocsPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
