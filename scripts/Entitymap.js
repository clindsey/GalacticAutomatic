(function(window, undefined) {
  window.Entitymap = function(world_tile_width, world_tile_height) {
    this.creatures = [];
    this.world_tile_width = world_tile_width;
    this.world_tile_height = world_tile_height;
    this.neighbors = {};
  };

  Entitymap.prototype.update = function() {
    var self = this;
    this.neighbors = {};
    this.creatures.map(function(creature, index) {
      if(creature.dead) return; // refactor
      creature.update();
      var index = creature.map_x + '_' + creature.map_y;
      if(self.neighbors[index] === undefined) self.neighbors[index] = [];
      self.neighbors[index].push(creature);
    });
    this.creatures.map(function(creature, index) { // refactor
      if(creature.dead) return; // refactor
      var index = creature.map_x + '_' + creature.map_y,
          neighbors = self.neighbors[index];
      neighbors.map(function(neighbor, n_index) {
        if(creature instanceof Rabbit){
          if(neighbor instanceof Carrot){
            neighbor.kill();
            creature.energy += neighbor.energy_value;
          }
        }
        if(creature instanceof Wolf){
          if(neighbor instanceof Rabbit){
            neighbor.kill();
            creature.energy += neighbor.energy_value;
          }
        }
      });
    });
  };

  Entitymap.prototype.draw_to_minimap = function(drawing_context, tile_width, tile_height) {
    this.creatures.map(function(creature, index){
      if(creature.dead) return; // refactor
      drawing_context.save();
      drawing_context.translate(creature.map_x * tile_width, creature.map_y * tile_height);
      creature.draw(drawing_context, tile_width, tile_height);
      drawing_context.restore();
    });
  };

  Entitymap.prototype.draw_to_viewport = function(drawing_context, tile_width, tile_height, offset_map_x, offset_map_y) {
    var self = this;
    this.creatures.map(function(creature, index){
      if(creature.dead) return; // refactor
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

    var index = creature.map_x + '_' + creature.map_y;
    if(this.neighbors[index] === undefined) this.neighbors[index] = [];
    this.neighbors[index].push(creature);
  };
})(window);