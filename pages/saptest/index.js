import { useState, useEffect } from "react";
const ChangePassword = () => {
  return (
    <div className="container">
      <div>
        <div className="mb-5">
          <h1>SAP System Scan Mockup</h1>
          <i>by Jonas Hauswurz</i>
        </div>
        <div className="mb-5">
          <h4>Materials by Type & Usage</h4>
          <iframe
            src="https://flo.uri.sh/visualisation/12402141/embed"
            title="Interactive or visual content"
            class="flourish-embed-iframe"
            frameborder="0"
            scrolling="no"
            style={{ width: "100%", height: "600px" }}
            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          ></iframe>
          <div
            style={{
              width: "100%",
              marginTop: "4px!important",
              textAlign: "right!important",
            }}
          ></div>
        </div>
        <div className="mb-5">
          <h4>Relationships between Company Codes, Purchasing Orgs & Plants</h4>
          <iframe
            src="https://flo.uri.sh/visualisation/12400048/embed"
            title="Interactive or visual content"
            class="flourish-embed-iframe"
            frameborder="0"
            scrolling="no"
            style={{ width: "100%", height: "600px" }}
            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          ></iframe>
          <div
            style={{
              width: "100%",
              marginTop: "4px!important",
              textAlign: "right!important",
            }}
          ></div>
        </div>
        <div className="mb-5">
          <h4>Purchase Orders by Company Code incl. Document Type</h4>
          <iframe
            src="https://flo.uri.sh/visualisation/12401644/embed"
            title="Interactive or visual content"
            class="flourish-embed-iframe"
            frameborder="0"
            scrolling="no"
            style={{ width: "100%", height: "600px" }}
            sandbox="allow-same-origin allow-forms allow-scripts allow-downloads allow-popups allow-popups-to-escape-sandbox allow-top-navigation-by-user-activation"
          ></iframe>
          <div
            style={{
              width: "100%",
              marginTop: "4px!important",
              textAlign: "right!important",
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
