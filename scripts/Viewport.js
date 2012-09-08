(function(window, undefined) {
  window.Viewport = function(viewport_drawing_context, heightmap, viewport_width, viewport_height, x, y, tile_width, tile_height, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation) { // refactor, huge signature
    var self = this;

    this.data = [];
    this.heightmap = heightmap;
    this.viewport_width = viewport_width;
    this.viewport_height = viewport_height;
    this.drawing_context = viewport_drawing_context;
    this.max_elevation = max_elevation;
    this.tile_width = tile_width;
    this.tile_height = tile_height;
    this.x = x;
    this.y = y;

    this.move_to(this.x, this.y);

    self.render_tiles(viewport_drawing_context, max_elevation, tile_width, tile_height);

    viewport_drawing_context.canvas.onmousedown = function(mouse_event) { // refactor
      var mouse_x = mouse_event.offsetX,
          mouse_y = mouse_event.offsetY,
          tile_x = Math.floor(mouse_x / tile_width),
          tile_y = Math.floor(mouse_y / tile_height),
          dx = tile_x - Math.floor(viewport_width / 2),
          dy = tile_y - Math.floor(viewport_height / 2);
      self.x = GalacticAutomatic.clamp(self.x + dx, world_chunk_width * chunk_width);
      self.y = GalacticAutomatic.clamp(self.y + dy, world_chunk_height * chunk_height);
      self.move_to(self.x, self.y);

      return false;
    };
  };

  Viewport.prototype.render_tiles = function(drawing_context, max_elevation, tile_width, tile_height) {
    var cell,
        heightmap = this.data;

    drawing_context.clearRect(0, 0, heightmap.length * tile_width, heightmap[0].length * tile_height);

    for(var y = 0, yl = heightmap.length, x, xl; y < yl; y += 1){
      for(x = 0, xl = heightmap[y].length; x < xl; x += 1){
        cell = heightmap[y][x];
        drawing_context.fillStyle = GalacticAutomatic.get_height_color(cell, max_elevation);
        drawing_context.fillRect(x * tile_width, y * tile_height, tile_width, tile_height);
      }
    }
  };

  Viewport.prototype.move_to = function(x, y) {
    this.x = x;
    this.y = y;

    this.data = this.get_area(this.heightmap.data, this.viewport_width, this.viewport_height, this.x, this.y);

    this.render_tiles(this.drawing_context, this.max_elevation, this.tile_width, this.tile_height);

    if(this.move_to_callback !== undefined){
      this.move_to_callback();
    };
  };

  Viewport.prototype.get_area = function(heightmap_data, viewport_width, viewport_height, cursor_x, cursor_y) {
    var data_out = [],
        data_height = heightmap_data.length,
        data_width,
        x_offset = viewport_width >> 1,
        y_offset = viewport_height >> 1;
    for(var y = 0, x; y < viewport_height; y += 1){
      data_width = heightmap_data[y].length;
      data_out[y] = [];
      for(x = 0; x < viewport_width; x += 1){
        var x_index = GalacticAutomatic.clamp(x - x_offset + cursor_x, data_width),
            y_index = GalacticAutomatic.clamp(y - y_offset + cursor_y, data_height);
        data_out[y][x] = heightmap_data[y_index][x_index];
      }
    }

    return data_out;
  };
})(window);