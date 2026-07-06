import { wrapper } from "./constant";
import "./global.css";
import "./Display.css";
function Display({ renderGeneral, renderEduc, renderPrac, isFormVisible }) {
  return (
    <div
      className={
        (isFormVisible && wrapper.CV_WRAPPER) ||
        (!isFormVisible && `${wrapper.CV_WRAPPER} expand`)
      }
    >
      <div className={wrapper.PAPER}>
        {renderGeneral()}
        {renderEduc()}
        {renderPrac()}
      </div>
    </div>
  );
}

export { Display };
