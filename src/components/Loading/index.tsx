import "./index.css";
const Loading = () => {
  return (
    <div
      style={{ zIndex: 9999 }}
      className="fixed top-0 left-0 bg-cover bg-center backdrop-blur-3xl backdrop backdrop-saturate-150 backdrop-opacity-75 w-full min-h-screen h-full flex items-center justify-center"
    >
      <div className="px-10 py-10 bg-white rounded-lg">
        <div className="flex flex-col items-center space-y-3">
          <div className="loader"></div>
          {/* <div className="loader2"></div> */}
        </div>
      </div>
    </div>
  );
};

export default Loading;
