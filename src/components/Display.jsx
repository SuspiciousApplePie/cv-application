import { wrapper } from "./constant";
import "./global.css";
import "./Display.css";
function Display({ renderGeneral, renderEduc, renderPrac }) {
  return (
    <div className={wrapper.CV_WRAPPER}>
      <div className={wrapper.PAPER}>
        {renderGeneral()}
        {renderEduc()}
        {renderPrac()}
      </div>
    </div>
  );
}

export { Display };
