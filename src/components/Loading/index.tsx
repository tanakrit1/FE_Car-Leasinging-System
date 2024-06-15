import "./index.css";
const Loading = () => {
  return (
    // <div v-show="status" style="z-index: 999;"
    // class="z-50 absolute  bg-cover  bg-center backdrop-blur-3xl backdrop-filter backdrop-grayscale backdrop-saturate-150 backdrop-opacity-50 h-screen w-screen flex items-center justify-center">
    <div
      style={{ zIndex: 999 }}
      className="z-50 absolute  bg-cover  bg-center backdrop-blur-3xl  backdrop backdrop-saturate-150 backdrop-opacity-75 h-screen w-screen flex items-center justify-center"
    >
      <div className="flex flex-col items-center space-y-3">
        <div className="loader"></div>
        <div className="loader2"></div>
      </div>
    </div>
  );
};

export default Loading;
