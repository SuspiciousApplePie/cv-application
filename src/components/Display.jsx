function Display({ renderGeneral, renderEduc }) {
  return (
    <div>
      {renderGeneral()}
      {renderEduc()}
    </div>
  );
}

export { Display };
