import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader-container">
      <img src="/heroes.gif" alt="Loading..." className="loader-gif" />
    </div>
  );
}
