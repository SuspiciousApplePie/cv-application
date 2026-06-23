function Display({ renderGeneral, renderEduc, renderPrac }) {
  return (
    <div>
      {renderGeneral()}
      {renderEduc()}
      {renderPrac()}
    </div>
  );
}

export { Display };
