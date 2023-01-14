import Image from "next/image";
import cuteEmoji from "../../public/images/cute-emoji.png";

const UnauthorizedScreen = () => {
  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="row">
        <div className="col mb-3 align-self-center text-center">
          <p>I'm sowwy, but you're not authorized</p>
          <Image src={cuteEmoji} alt="" width={250} />
        </div>
      </div>
    </main>
  );
};

export default UnauthorizedScreen;
