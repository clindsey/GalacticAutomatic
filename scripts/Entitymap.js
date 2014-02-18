(function(window, undefined) {
  window.Entitymap = function(heightmap, world_tile_width, world_tile_height) {
    this.creatures = [];
    this.world_tile_width = world_tile_width;
    this.world_tile_height = world_tile_height;
    this.neighbors = {};
    this.heightmap = heightmap;
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
    this.creatures.map(function(creature, index) { // refactor, maybe this should be handled by individual creatures
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

  Entitymap.prototype.get_creatures_in_area = function(slice_width, slice_height, center_x, center_y, creature_type) {
    var data_out = [],
        heightmap_data = this.heightmap.data,
        data_height = heightmap_data.length,
        data_width,
        x_offset = slice_width >> 1,
        y_offset = slice_height >> 1;
    for(var y = 0, x; y < slice_height; y += 1){
      data_width = heightmap_data[y].length;
      for(x = 0; x < slice_width; x += 1){
        var x_index = GalacticAutomatic.clamp(x - x_offset + center_x, data_width),
            y_index = GalacticAutomatic.clamp(y - y_offset + center_y, data_height),
            neighbors = this.neighbors[x_index + '_' + y_index];
        //data_out[y][x] = heightmap_data[y_index][x_index];
        if(!!neighbors){
          for(var i = 0, il = neighbors.length; i < il; i += 1){
            data_out.push({'creature': neighbors[i], 'x': x, 'y': y});
          }
        }
      }
    }

    return data_out;
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