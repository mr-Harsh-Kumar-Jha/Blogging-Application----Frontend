import Footer from "./components/Footer/footer";
import React, { useEffect, useContext } from "react";
import { UserContext } from "./userContext/userContext";
import {
  //   BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import Nav from "./components/navbar/navbar";
import Sponsor from "./components/Sponsor/sponsor";
import Newsletter from "./components/Newsletter/Newsletter";
import Home from "./components/Home/home";
import { v4 as uuid } from "uuid";
import LoginPage from "./components/modals/authentication/loginPage";
import BlogView from "./components/blogView/blogView";
window.jQuery = require("jquery");
const Blogeditor = require("./components/blogEditor/blogeditor").default;

function App() {
  const location = useLocation();
  const data = useContext(UserContext);
  const previousLocation = location.state && location.state.previousLocation;
  const getuser = async () => {
    const user = await fetch("http://127.0.0.1:4000/auth/getuser", {
      method: "GET",
      headers: {
        "auth-token": localStorage.getItem("userDetails"),
      },
    });
    let json = await user.json();
    data.dispatch({
      type: "signin",
      payload: {
        user: json,
        role: json._doc.role,
        history: "/",
      },
    });
  };
  useEffect(() => {
    if (localStorage.getItem("userDetails")){
      getuser();
    }
  }, []);

  useEffect(() => {
    // window.addEventListener('beforeunload', alertUser)
    let unique_id;
    if (localStorage.getItem("unique_id"))
      unique_id = localStorage.getItem("unique_id");
    else unique_id = uuid();

    window.onbeforeunload = async () => {
      unique_id = localStorage.getItem("unique_id");
      const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: unique_id,
          isActive: false,
        }),
      });
      const json = await hello.json();
    };
    //   window.addEventListener("pagehide", pageHideListener);
    //  document.onvisibilitychange = async function () {
    //    if (document.visibilityState === "hidden") {
    //      console.log("hello");
    //      const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
    //        method: "PUT",
    //        headers: {
    //          "Content-Type": "application/json",
    //        },
    //        body: JSON.stringify({
    //          user_id: "0000002",
    //          isActive: false,
    //        }),
    //      });
    //      const json = await hello.json();
    //      console.log(json);
    //    } else if (document.visibilityState === "visible") {
    //      console.log("visible");
    //      const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
    //        method: "PUT",
    //        headers: {
    //          "Content-Type": "application/json",
    //        },
    //        body: JSON.stringify({
    //          user_id: "0000007",
    //          isActive: true,
    //        }),
    //      });
    //      const json = await hello.json();
    //      console.log(json);
    //    }
    //  };

    window.onload = async () => {
      if (data.state.user != null) {
        let prevUnique_id = localStorage.getItem("unique_id");
        localStorage.setItem("unique_id", data.state.user._id);
        unique_id = data.state.user._id;
        const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: unique_id,
            isActive: true,
          }),
        });
        const json = await hello.json();

        const ans = await fetch(
          "http://127.0.0.1:4000/analytic/removeprevActive",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user_id: prevUnique_id,
            }),
          }
        );
      } else {
        localStorage.setItem("unique_id", unique_id);
        const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user_id: unique_id,
            isActive: true,
          }),
        });
        const json = await hello.json();
      }
    };

    //  (async()=>{
    //    if (data.state.user != null) {
    //    let prevUnique_id = localStorage.getItem("unique_id");
    //    localStorage.setItem("unique_id", "0000001");
    //    unique_id = "0000001";
    //    const hello = await fetch("http://127.0.0.1:4000/analytic/active", {
    //      method: "PUT",
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //      body: JSON.stringify({
    //        user_id: unique_id,
    //        isActive: true,
    //      }),
    //    });
    //    const json = await hello.json();
    //    console.log(json);
    //    const ans = await fetch("http://127.0.0.1:4000/analytic/removeprevActive", {
    //      method: "PUT",
    //      headers: {
    //        "Content-Type": "application/json",
    //      },
    //      body: JSON.stringify({
    //        user_id: prevUnique_id,
    //      }),
    //    });
    //    console.log(ans);
    //  }
    // })();
  }, [window.onbeforeunload, window.onload]);

  return (
    <>
      <Nav />
      <Routes location={previousLocation || location}>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/blogeditor" element={<Blogeditor />}></Route>
        <Route exact path="/sponsor" element={<Sponsor />}></Route>
        <Route exact path="/newsletter" element={<Newsletter />}></Route>
        <Route exact path="/blog/:id" element={<BlogView />}></Route>
        <Route path="*" element={<Navigate to="/" replace />}></Route>
      </Routes>
      <Footer />
      {previousLocation && (
        <Routes>
          <Route path="/signin" element={<LoginPage />} />
        </Routes>
      )}
    </>
  );
}

export default App;
