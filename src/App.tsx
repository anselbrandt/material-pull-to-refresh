import { useEffect, useRef, useState } from "react";
import "scrollyfills";
import "./App.css";

export default function App() {
  const [message, setMessage] = useState("Pull to refresh");
  // const ptr_scrollport = document.querySelector("html");
  // const ptr = document.querySelector("#refresh");
  // const main = document.querySelector("#refresh-main");
  const ptr_scrollport = useRef<HTMLDivElement>(null);
  const ptr = useRef<HTMLDivElement>(null);
  const main = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!main.current) return;
    main.current.scrollIntoView();
  }, []);

  useEffect(() => {
    const handlePullToRefresh = () => {
      if (!ptr.current || !ptr_scrollport.current) return;
      if (ptr_scrollport.current.scrollTop <= 0) {
        setMessage("refreshing...");
        ptr.current.setAttribute("loading-state", "loading");

        setTimeout(() => {
          if (!ptr.current) return;
          setMessage("done!");

          setTimeout(() => {
            if (!ptr.current || !main.current) return;
            ptr.current.removeAttribute("loading-state");
            main.current.scrollIntoView({ behavior: "smooth" });

            window.addEventListener(
              "scrollend",
              () => {
                setMessage("Pull to refresh");
              },
              { once: true }
            );
          }, 500);
        }, 1000);
      }
    };

    window.addEventListener("scrollend", handlePullToRefresh);
  });

  return (
    <div className="container" ref={ptr_scrollport}>
      <header id="refresh" ref={ptr}>
        <svg viewBox="0 0 24 24" width="24" height="24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M19 9l-7 7-7-7"
          />
        </svg>
        <span>{message}</span>
      </header>
      <main id="refresh-main" ref={main}>
        <h1>Conversation</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora
          laborum illo autem asperiores. Numquam voluptate facilis odit impedit
          non autem magni architecto, placeat voluptatum dolorem nemo doloremque
          velit, iure id.
        </p>
      </main>
    </div>
  );
}
