(function(window, undefined) {
  window.Entitymap = function(world_tile_width, world_tile_height) {
    this.creatures = [];
    this.world_tile_width = world_tile_width;
    this.world_tile_height = world_tile_height;
  };

  Entitymap.prototype.update = function() {
    this.creatures.map(function(creature, index) {
      creature.update();
    });
  };

  Entitymap.prototype.draw_to_minimap = function(drawing_context, tile_width, tile_height) {
    this.creatures.map(function(creature, index){
      drawing_context.save();
      drawing_context.translate(creature.map_x * tile_width, creature.map_y * tile_height);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();
    });
  };

  Entitymap.prototype.draw_to_viewport = function(drawing_context, tile_width, tile_height, offset_map_x, offset_map_y) {
    var self = this;
    this.creatures.map(function(creature, index){
      drawing_context.save();
      var c_px = creature.map_x * tile_width - offset_map_x * tile_width,
          c_py = creature.map_y * tile_height - offset_map_y * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save(); // I hate this, refactor
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) + self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height);
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) - self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height);
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width),
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) + self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width),
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) - self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) - self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) - self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) - self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) + self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) + self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) + self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();

      drawing_context.save();
      var c_px = (creature.map_x * tile_width - offset_map_x * tile_width) + self.world_tile_width * tile_width,
          c_py = (creature.map_y * tile_height - offset_map_y * tile_height) - self.world_tile_height * tile_height;
      drawing_context.translate(c_px, c_py);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();
    });
  };

  Entitymap.prototype.register_creature = function(creature) {
    this.creatures.push(creature);
  };
})(window);