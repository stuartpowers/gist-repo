function chunk(list, size) {
  for(var position, i = 0, chunk = -1, chunks = []; i < list.length; i++) {
    if (position = i % size) {
      chunks[chunk][position] = list[i]
    } else {
      chunk++;
      chunks[chunk] = [list[i]]
    }
  }
  return chunks;
}
