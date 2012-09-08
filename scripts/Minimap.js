(function(window, undefined) {
  window.Minimap = function(minimap_drawing_context, heightmap, minimap_tile_width, minimap_tile_height, viewport, max_elevation) { // refactor, huge signature
    var self = this;

    self.render_tiles(heightmap.data, minimap_drawing_context, max_elevation, minimap_tile_width, minimap_tile_height, viewport);

    minimap_drawing_context.canvas.onmousedown = function(mouse_event) {
      var mouse_x = mouse_event.offsetX,
          mouse_y = mouse_event.offsetY,
          tile_x = Math.floor(mouse_x / minimap_tile_width),
          tile_y = Math.floor(mouse_y / minimap_tile_height);
      viewport_x = tile_x;
      viewport_y = tile_y;
      viewport.move_to(viewport_x, viewport_y);

      self.render_tiles(heightmap.data, minimap_drawing_context, max_elevation, minimap_tile_width, minimap_tile_height, viewport);
    };

    viewport.move_to_callback = function(){
      self.render_tiles(heightmap.data, minimap_drawing_context, max_elevation, minimap_tile_width, minimap_tile_height, viewport);
    };
  };

  Minimap.prototype.render_tiles = function(heightmap_data, drawing_context, max_elevation, tile_width, tile_height, viewport) {
    var cell,
        heightmap = heightmap_data,
        minimap_width = heightmap.length * tile_width,
        minimap_height = heightmap[0].length * tile_height;

    drawing_context.clearRect(0, 0, minimap_width, minimap_height);

    for(var y = 0, yl = heightmap.length, x, xl; y < yl; y += 1){
      for(x = 0, xl = heightmap[y].length; x < xl; x += 1){
        cell = heightmap[y][x];
        drawing_context.fillStyle = GalacticAutomatic.get_height_color(cell, max_elevation);
        drawing_context.fillRect(x * tile_width, y * tile_height, tile_width, tile_height);
      }
    }

    var area_width = viewport.viewport_width * tile_width,
        area_height = viewport.viewport_height * tile_height,
        area_x = viewport.x * tile_width - area_width / 2,
        area_y = viewport.y * tile_height - area_height / 2;

    // refactor
    drawing_context.fillStyle = 'rgba(255, 0, 0, 0.3)';
    drawing_context.fillRect(area_x, area_y, area_width, area_height);

    drawing_context.fillRect(area_x + minimap_width, area_y, area_width, area_height);
    drawing_context.fillRect(area_x - minimap_width, area_y, area_width, area_height);
    drawing_context.fillRect(area_x, area_y + minimap_height, area_width, area_height);
    drawing_context.fillRect(area_x, area_y - minimap_height, area_width, area_height);
    drawing_context.fillRect(area_x - minimap_width, area_y - minimap_height, area_width, area_height);
    drawing_context.fillRect(area_x + minimap_width, area_y - minimap_height, area_width, area_height);
    drawing_context.fillRect(area_x - minimap_width, area_y + minimap_height, area_width, area_height);
    drawing_context.fillRect(area_x + minimap_width, area_y + minimap_height, area_width, area_height);
  };
})(window);