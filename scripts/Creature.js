(function(window, undefined) {
  window.Creature = function(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation) {
    var self = this,
        state = 'finding_path'; // finding_path, following_path, dead

    this.map_x = heightmap_x;
    this.map_y = heightmap_y;

    var vx = 0, //~~(Math.random() * 2) - 1,
        vy = 0, //~~(Math.random() * 2) - 1;
        result,
        start_x,
        start_y;

    this.update = function() {
      if(state === 'finding_path'){
        var pathfinding_range = 20,
            heightmap_data = heightmap.get_area(pathfinding_range, pathfinding_range, self.map_x, self.map_y),
            scrubbed_data = GalacticAutomatic.scrub_for_pathfinding(heightmap_data, max_elevation),
            dest_x,
            dest_y;
        start_x = scrubbed_data[0].length / 2;
        start_y = scrubbed_data.length / 2;
        give_up_counter = 20;
        while(give_up_counter -= 1){
          dest_y = ~~(Math.random() * scrubbed_data.length);
          dest_x = ~~(Math.random() * scrubbed_data[0].length);
          if(scrubbed_data[dest_y][dest_x] === 1){
            var graph = new Graph(scrubbed_data),
                start = graph.nodes[start_x][start_y],
                end = graph.nodes[dest_x][dest_y];
            result = astar.search(graph.nodes, start, end);
            if(result.length > 0){
              state = 'following_path';
              break;
            }
          }
          if(give_up_counter === 0){
            state = 'dead';
          }
        }
      }

      if(state === 'following_path'){
        var node = result.shift();
        vx = node.y - start_x;
        vy = node.x - start_y;
        start_x = node.y; // this is messed up but it works. due to the way Graph and astar handle their 2d arrays
        start_y = node.x;
        self.map_x = GalacticAutomatic.clamp(self.map_x + vx, heightmap_width);
        self.map_y = GalacticAutomatic.clamp(self.map_y + vy, heightmap_height);
        if(result.length === 0){
          state = 'finding_path';
        }
      }
    };
  };

  Creature.prototype.draw = function(drawing_context, tile_width, tile_height) {
    drawing_context.fillStyle = '#FF0000';
    drawing_context.fillRect(0, 0, tile_width, tile_height);
  };
})(window);