function Display({ renderGeneral, renderEduc }) {
  return (
    <div>
      {renderGeneral()}
      <div>
        <h1>Education Experience</h1>
        <section>{renderEduc()}</section>
      </div>
    </div>
  );
}

export { Display };
