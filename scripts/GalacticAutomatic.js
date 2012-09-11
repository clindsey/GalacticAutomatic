(function(window, undefined) {
  window.GalacticAutomatic = function(options) {
    var self = this,
        seed_val = options.seed_val,
        viewport_static_id = options.viewport_static_id,
        minimap_static_id = options.minimap_static_id,
        viewport_dynamic_id = options.viewport_dynamic_id,
        minimap_dynamic_id = options.minimap_dynamic_id,
        world_chunk_width = options.world_chunk_size,
        world_chunk_height = options.world_chunk_size,
        chunk_width = options.chunk_size,
        chunk_height = options.chunk_size,
        max_elevation = options.max_elevation,
        viewport_width = options.viewport_size,
        viewport_height = options.viewport_size,
        viewport_tile_size = options.viewport_tile_size,
        minimap_tile_size = options.minimap_tile_size;

    this.SEED = this.generate_seed(seed_val);

    var heightmap = new Heightmap(this.SEED, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation);

    var entitymap = new Entitymap(world_chunk_width * chunk_width, world_chunk_height * chunk_height);
    this.add_creatures(entitymap, heightmap, viewport_tile_size, max_elevation);

    var viewport_x = ~~((chunk_width * world_chunk_width) / 2),
        viewport_y = ~~((chunk_height * world_chunk_height) / 2),
        tile_width = viewport_tile_size,
        tile_height = viewport_tile_size,
        viewport_static_drawing_context = document.getElementById(viewport_static_id).getContext('2d'),
        viewport_dynamic_drawing_context = document.getElementById(viewport_dynamic_id).getContext('2d'),
        viewport = new Viewport(viewport_static_drawing_context, viewport_dynamic_drawing_context, heightmap, viewport_width, viewport_height, viewport_x, viewport_y, tile_width, tile_height, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation, entitymap);

    var minimap_static_drawing_context = document.getElementById(minimap_static_id).getContext('2d'),
        minimap_dynamic_drawing_context = document.getElementById(minimap_dynamic_id).getContext('2d'),
        minimap_tile_width = minimap_tile_size,
        minimap_tile_height = minimap_tile_size,
        minimap = new Minimap(minimap_static_drawing_context, minimap_dynamic_drawing_context, heightmap, minimap_tile_width, minimap_tile_height, viewport, max_elevation, entitymap);

    var update_timer = setInterval(function() {
      entitymap.update();
      viewport.draw_dynamic();
      minimap.draw_dynamic();
    }, 1000 / 2);

    /*
    var draw_timer = setInterval(function() {
      viewport.draw_dynamic();
      minimap.draw_dynamic();
    }, 1000 / 20);
    */
  };

  GalacticAutomatic.prototype.add_creatures = function(entitymap, heightmap, viewport_tile_size, max_elevation) { // refactor
    var carrot_count = 0;
    while(carrot_count < 128){
      var hm_width = heightmap.data[0].length,
          hm_height = heightmap.data.length,
          hm_x = ~~(Math.random() * hm_width),
          hm_y = ~~(Math.random() * hm_height);
      if(heightmap.data[hm_y][hm_x] / max_elevation >= 0.25){
        var carrot = new Carrot(heightmap, hm_x, hm_y, hm_width, hm_height, max_elevation, this.SEED);
        entitymap.register_creature(carrot);
        carrot_count += 1;
      }
    }

    var rabbit_count = 0;
    while(rabbit_count < 32){
      var hm_width = heightmap.data[0].length,
          hm_height = heightmap.data.length,
          hm_x = ~~(Math.random() * hm_width),
          hm_y = ~~(Math.random() * hm_height);
      if(heightmap.data[hm_y][hm_x] / max_elevation >= 0.25){
        var rabbit = new Rabbit(heightmap, hm_x, hm_y, hm_width, hm_height, max_elevation, this.SEED);
        entitymap.register_creature(rabbit);
        rabbit_count += 1;
      }
    }

    var wolf_count = 0;
    while(wolf_count < 8){
      var hm_width = heightmap.data[0].length,
          hm_height = heightmap.data.length,
          hm_x = ~~(Math.random() * hm_width),
          hm_y = ~~(Math.random() * hm_height);
      if(heightmap.data[hm_y][hm_x] / max_elevation >= 0.25){
        var wolf = new Wolf(heightmap, hm_x, hm_y, hm_width, hm_height, max_elevation, this.SEED);
        entitymap.register_creature(wolf);
        wolf_count += 1;
      }
    }
  };

  GalacticAutomatic.prototype.generate_seed = function(seed_val) {
    var seed = 0;
    (seed_val + '').split('').map(function(c, i){ seed += c.charCodeAt(0) << i; });
    return seed;
  };

  GalacticAutomatic.clamp = function(index, size) {
    return (index + size) % size;
  };

  GalacticAutomatic.scrub_for_pathfinding = function(heightmap_data, max_elevation) {
    var data_out = [];
    for(var y = 0, yl = heightmap_data.length, x, xl; y < yl; y += 1){
      data_out[y] = [];
      for(x = 0, xl = heightmap_data[0].length; x < xl; x += 1){
        data_out[y][x] = heightmap_data[y][x] / max_elevation >= 0.25 ? 1 : 0; // refactor
      }
    }
    return data_out;
  };

  GalacticAutomatic.get_height_color = function(height, max_elevation) {
    var elev_factor = (height / max_elevation),
        color;
    if(elev_factor >= 0.36){
      color = '#209E55';
    } else if(elev_factor >= 0.25 && elev_factor < 0.36){
      color = '#E8DCB2';
    } else{
      color = '#0693F0';
    };
    return color;
  };
})(window);