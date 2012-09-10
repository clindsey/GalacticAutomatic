(function(window, undefined) {
  window.Heightmap = function(seed, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation) {
    this.SEED = seed;

    var chunks = this.build_chunks(world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation),
        heightmap = this.generate_heightmap(chunks, world_chunk_width * chunk_width, world_chunk_height * chunk_height, chunk_width, chunk_height);

    this.data = heightmap;
  };

  Heightmap.prototype.generate_heightmap = function(chunks, world_tile_width, world_tile_height, chunk_width, chunk_height) {
    var chunk,
        heightmap = [],
        cell,
        cells,
        y_index,
        x_index,
        cy, cyl, cx, cx;

    for(var y = 0, x, yl = chunks.length, xl; y < yl; y += 1){
      for(x = 0, xl = chunks[y].length; x < xl; x += 1){
        chunk = chunks[y][x];
        cells = chunk.cells;
        for(cy = 0, cyl = cells.length; cy < cyl; cy += 1){
          for(cx = 0, cxl = cells[cy].length; cx < cxl; cx += 1){
            cell = cells[cy][cx];
            y_index = cy + (y * cyl);
            x_index = cx + (x * cxl);
            if(heightmap[y_index] === undefined) heightmap[y_index] = [];
            heightmap[y_index][x_index] = cell;
          }
        }
      }
    }

    return heightmap;
  };

  Heightmap.prototype.get_area = function(slice_width, slice_height, center_x, center_y) {
    var data_out = [],
        heightmap_data = this.data,
        data_height = heightmap_data.length,
        data_width,
        x_offset = slice_width >> 1,
        y_offset = slice_height >> 1;
    for(var y = 0, x; y < slice_height; y += 1){
      data_width = heightmap_data[y].length;
      data_out[y] = [];
      for(x = 0; x < slice_width; x += 1){
        var x_index = GalacticAutomatic.clamp(x - x_offset + center_x, data_width),
            y_index = GalacticAutomatic.clamp(y - y_offset + center_y, data_height);
        data_out[y][x] = heightmap_data[y_index][x_index];
      }
    }

    return data_out;
  };

  Heightmap.prototype.build_chunks = function(world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation) {
    var chunks = [],
        world_tile_width = world_chunk_width * chunk_width,
        ne,
        nw,
        se,
        sw;
    for(var y = 0, x; y < world_chunk_height; y += 1){
      chunks[y] = [];
      for(x = 0; x < world_chunk_width; x += 1){
        nw = ~~((new Alea((y * world_tile_width + x) + this.SEED))() * max_elevation);

        if(x + 1 === world_chunk_width){
          ne = ~~((new Alea((y * world_tile_width + (0)) + this.SEED))() * max_elevation);
        } else{
          ne = ~~((new Alea((y * world_tile_width + (x + 1)) + this.SEED))() * max_elevation);
        }

        if(y + 1 === world_chunk_height){
          sw = ~~((new Alea(((0) * world_tile_width + x) + this.SEED))() * max_elevation);

          if(x + 1 === world_chunk_width){
            se = ~~((new Alea(((0) * world_tile_width + (0)) + this.SEED))() * max_elevation);
          } else{
            se = ~~((new Alea(((0) * world_tile_width + (x + 1)) + this.SEED))() * max_elevation);
          }
        } else{
          sw = ~~((new Alea(((y + 1) * world_tile_width + x) + this.SEED))() * max_elevation);

          if(x + 1 === world_chunk_width){
            se = ~~((new Alea(((y + 1) * world_tile_width + (0)) + this.SEED))() * max_elevation);
          } else{
            se = ~~((new Alea(((y + 1) * world_tile_width + (x + 1)) + this.SEED))() * max_elevation);
          }
        }

        chunks[y][x] = chunk = new Chunk(ne, nw, se, sw, chunk_width, chunk_height);
      }
    }

    return chunks;
  };
})(window);