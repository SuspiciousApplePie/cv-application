import { wrapper } from "./constant";

function Display({ renderGeneral, renderEduc, renderPrac }) {
  return (
    <div className={wrapper.CV_WRAPPER}>
      {renderGeneral()}
      {renderEduc()}
      {renderPrac()}
    </div>
  );
}

export { Display };
