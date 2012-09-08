(function(window, undefined) {
  window.Chunk = function(ne, nw, se, sw, chunk_width, chunk_height) {
    this.cells = this.bilinear_interpolation(ne, nw, se, sw, chunk_width, chunk_height);
  };

  Chunk.prototype.bilinear_interpolation = function(ne, nw, se, sw, chunk_width, chunk_height) {
    var lng_lookup = [],
        lng_step,
        lat_step,
        top_height,
        bottom_height,
        cell_height,
        cells = [];
    for(var y = 0, x; y < chunk_height; y += 1){
      cells[y] = [];
      lat_step = y / (chunk_height - 1);
      for(x = 0; x < chunk_width; x += 1){
        if(lng_lookup[x] !== undefined){
          lng_step = lng_lookup[x];
        } else{
          lng_step = lng_lookup[x] = x / (chunk_width - 1);
        }
        top_height = nw + lng_step * (ne - nw);
        bottom_height = sw + lng_step * (se - sw);
        cell_height = top_height + lat_step * (bottom_height - top_height);
        cells[y][x] = cell_height;
      }
    }

    return cells;
  };
})(window);