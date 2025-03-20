import { useEffect, useRef } from "react";

const Chatbot = () => {
  const isLoaded = useRef(false);

  useEffect(() => {
    if (isLoaded.current) return;

    console.log("Attempting to load OpenWidget script...");

    // Define window.__ow before loading the script


      window.__ow = window.__ow || {};
      window.__ow.organizationId = "862f667c-b8c6-4f01-b387-c426aeba58c0";
      window.__ow.template_id = "21c50b4c-7dfe-46e9-84ca-49ec9ddacaf7";
      window.__ow.integration_name = "manual_settings";
      window.__ow.product_name = "chatbot";   
      


    const script = document.createElement("script");
    script.async = true;
    script.type = "text/javascript";
    script.src = "https://cdn.openwidget.com/openwidget.js";

    script.onload = () => {
      console.log("OpenWidget script loaded successfully!");
      isLoaded.current = true;
    };

    script.onerror = (error) => {
      console.error("Failed to load OpenWidget script:", error);
    };

    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        console.log("Cleaning up OpenWidget script...");
        document.body.removeChild(script);
      }
    };
  }, []);

  return null;
};

export default Chatbot;