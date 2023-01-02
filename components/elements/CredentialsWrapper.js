import Image from "next/image";
import CredentialForm from "./CredentialForm";

const CredentialsWrapper = (props) => {
  return (
    <main
      className="container d-flex align-items-center justify-content-center"
      style={{ minHeight: "85vh" }}
    >
      <div className="row">
        <div className="col-md-6 mb-3 align-self-center">
          <h1>{props.title}</h1>
          {props.children}
        </div>
        <div className="col-md-6 d-none d-md-block">
          <Image src={props.image} alt="" className="img-fluid" />
        </div>
      </div>
    </main>
  );
};
export default CredentialsWrapper;
