(function(window, undefined) {
  window.Creature = function(heightmap_x, heightmap_y, heightmap_width, heightmap_height) {
    var self = this;

    this.map_x = heightmap_x;
    this.map_y = heightmap_y;

    var vx = ~~(Math.random() * 2) - 1,
        vy = ~~(Math.random() * 2) - 1;

    this.update = function() {
      self.map_x = GalacticAutomatic.clamp(self.map_x + vx, heightmap_width);
      self.map_y = GalacticAutomatic.clamp(self.map_y + vy, heightmap_height);
    };
  };

  Creature.prototype.draw = function(drawing_context, tile_width, tile_height) {
    drawing_context.fillStyle = '#FF0000';
    drawing_context.fillRect(0, 0, tile_width, tile_height);
  };
})(window);