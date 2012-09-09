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
    this.add_creatures(entitymap, heightmap, viewport_tile_size);

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

  GalacticAutomatic.prototype.add_creatures = function(entitymap, heightmap, viewport_tile_size) {
    while(entitymap.creatures.length < 10){
      var hm_width = heightmap.data[0].length,
          hm_height = heightmap.data.length,
          hm_x = ~~(Math.random() * hm_width),
          hm_y = ~~(Math.random() * hm_height);
      creature = new Creature(hm_x, hm_y, hm_width, hm_height);
      entitymap.register_creature(creature);
    }
  };

  GalacticAutomatic.prototype.generate_seed = function(seed_val) {
    var seed = 0;

    (seed_val + '').split('').map(function(c, i){ seed += c.charCodeAt(0) << i; }); // refactor?

    return seed;
  };

  GalacticAutomatic.clamp = function(index, size) {
    return (index + size) % size;
  };

  GalacticAutomatic.get_height_color = function(height, max_elevation) {
    var elev_factor = (height / max_elevation),
        color;
    if(elev_factor >= 0.6){
      color = '#209E55';
    } else if(elev_factor >= 0.5 && elev_factor < 0.6){
      color = '#FAE7A5';
    } else{
      color = '#0693F0';
    };
    return color;
  };
})(window);