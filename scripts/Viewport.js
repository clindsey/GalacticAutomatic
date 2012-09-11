(function(window, undefined) {
  window.Viewport = function(viewport_static_drawing_context, viewport_dynamic_drawing_context, heightmap, viewport_width, viewport_height, x, y, tile_width, tile_height, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation, entitymap) { // refactor, huge signature
    var self = this;

    this.data = [];
    this.viewport_width = viewport_width;
    this.viewport_height = viewport_height;
    this.x = x;
    this.y = y;

    viewport_dynamic_drawing_context.canvas.onmousedown = function(mouse_event) {
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

    this.draw_dynamic = function() {
      viewport_dynamic_drawing_context.clearRect(0, 0, this.data.length * tile_width, this.data[0].length * tile_height);
      entitymap.draw_to_viewport(viewport_dynamic_drawing_context, tile_width, tile_height, self.x - ~~(viewport_width / 2), self.y - ~~(viewport_height / 2));
    };

    this.move_to = function(x, y) {
      self.x = x;
      self.y = y;

      self.data = heightmap.get_area(viewport_width, viewport_height, self.x, self.y);

      self.render_tiles(viewport_static_drawing_context, viewport_dynamic_drawing_context, max_elevation, tile_width, tile_height);
      entitymap.draw_to_viewport(viewport_dynamic_drawing_context, tile_width, tile_height, self.x - ~~(viewport_width / 2), self.y - ~~(viewport_height / 2));

      if(self.move_to_callback !== undefined){
        self.move_to_callback();
      };
    };

    this.move_to(this.x, this.y);
  };

  Viewport.prototype.render_tiles = function(drawing_context, dynamic_drawing_context, max_elevation, tile_width, tile_height) {
    var cell,
        heightmap = this.data;

    drawing_context.clearRect(0, 0, heightmap.length * tile_width, heightmap[0].length * tile_height);
    dynamic_drawing_context.clearRect(0, 0, heightmap.length * tile_width, heightmap[0].length * tile_height);

    for(var y = 0, yl = heightmap.length, x, xl; y < yl; y += 1){
      for(x = 0, xl = heightmap[y].length; x < xl; x += 1){
        cell = heightmap[y][x];
        drawing_context.fillStyle = GalacticAutomatic.get_height_color(cell, max_elevation);
        drawing_context.fillRect(x * tile_width, y * tile_height, tile_width, tile_height);
      }
    }
  };
})(window);