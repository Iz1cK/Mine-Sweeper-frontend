function Cell({ gameOver, rowIndex, blockIndex }) {
  return (
    <div
      className={`${gameOver ? styles.bomb : styles.noBomb} ${
        !block.shown && block.flagged && styles.flag
      }`}
      onClick={revealCell(1, rowIndex, blockIndex)}
      onContextMenu={flagCell(1, rowIndex, blockIndex)}
      key={rowIndex * 2 + blockIndex}
    ></div>
  );
}

export default Cell;
