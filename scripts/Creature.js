(function(window, undefined) {
  window.Creature = Class.extend({
    init: function(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation) {
      var self = this;

      this.map_x = heightmap_x;
      this.map_y = heightmap_y;
      this.fill_style = '#FF0000';
      this.state = 'finding_path'; // finding_path, following_path, stopped
      this.dead = false;
      this.energy = 400;
      this.energy_value = 100;
      this.move_energy_cost = 2;

      var vx = 0,
          vy = 0,
          result,
          start_x,
          start_y;

      this.update = function() {
        if(self.state === 'finding_path'){
          var pathfinding_range = 20,
              heightmap_data = heightmap.get_area(pathfinding_range, pathfinding_range, self.map_x, self.map_y),
              scrubbed_data = GalacticAutomatic.scrub_for_pathfinding(heightmap_data, max_elevation),
              dest_x,
              dest_y;
          start_x = scrubbed_data.length / 2;
          start_y = scrubbed_data[0].length / 2;
          var give_up_counter = 100; // this should be replaced by a list of possible indices, keep removing items until a valid path is found. should never hang
          while(true){
            dest_y = ~~(Math.random() * scrubbed_data[0].length);
            dest_x = ~~(Math.random() * scrubbed_data.length);
            if(scrubbed_data[dest_x][dest_y] === 1){
              var graph = new Graph(scrubbed_data),
                  start = graph.nodes[start_x][start_y],
                  end = graph.nodes[dest_x][dest_y];
              result = astar.search(graph.nodes, start, end);
              if(result.length > 0){
                self.state = 'following_path';
                break;
              }
            }
            give_up_counter -= 1;
            if(give_up_counter === 0){
              self.state = 'stopped';
              break;
            }
          }
        }

        if(self.state === 'following_path'){
          var node = result.shift();
          vx = node.y - start_x;
          vy = node.x - start_y;
          start_x = node.y; // this is messed up but it works. due to the way Graph and astar handle their 2d arrays
          start_y = node.x;
          self.map_x = GalacticAutomatic.clamp(self.map_x + vx, heightmap_width);
          self.map_y = GalacticAutomatic.clamp(self.map_y + vy, heightmap_height);
          self.energy -= self.move_energy_cost;
          if(self.energy <= 0){
            self.kill();
          }
          if(result.length === 0){
            self.state = 'finding_path';
          }
        }
      };

      this.draw = function(drawing_context, tile_width, tile_height) {
        drawing_context.fillStyle = self.fill_style;
        drawing_context.fillRect(0, 0, tile_width, tile_height);
      };
    },

    kill: function() {
      this.state = 'stopped';
      this.dead = true;
    }
  });
})(window);