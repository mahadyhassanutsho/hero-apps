import { Outlet, useLocation, useNavigation } from "react-router";
import Header from "../ui/Header";
import Footer from "../ui/Footer";
import LoadingPage from "../ui/LoadingPage";
import { ToastContainer } from "react-toastify";
import { useEffect } from "react";

function App() {
  const { state } = useNavigation();
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  if (state === "loading") {
    return <LoadingPage />;
  }

  return (
    <div>
      <header>
        <Header />
      </header>

      <main className="min-h-screen">
        <Outlet />
      </main>

      <footer>
        <Footer />
      </footer>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </div>
  );
}

export default App;
