const LoadingScreen = () => {
  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="row">
        <div className="col mb-3 align-self-center text-center">
          <span
            class="spinner-border"
            style={{ width: "3rem", height: "3rem" }}
            role="status"
          ></span>
        </div>
      </div>
    </main>
  );
};

export default LoadingScreen;
