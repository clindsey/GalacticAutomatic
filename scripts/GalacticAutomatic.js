(function(window, undefined) {
  window.GalacticAutomatic = function(options) {
    var self = this,
        seed_val = options.seed_val,
        viewport_id = options.viewport_id,
        minimap_id = options.minimap_id,
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

    var heightmap = new Heightmap(this.SEED, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation),
        viewport_x = 0,
        viewport_y = 0,
        tile_width = viewport_tile_size,
        tile_height = viewport_tile_size,
        viewport_drawing_context = document.getElementById(viewport_id).getContext('2d'),
        viewport = new Viewport(viewport_drawing_context, heightmap, viewport_width, viewport_height, viewport_x, viewport_y, tile_width, tile_height, world_chunk_width, world_chunk_height, chunk_width, chunk_height, max_elevation);

    var minimap_drawing_context = document.getElementById(minimap_id).getContext('2d'),
        minimap_tile_width = minimap_tile_size,
        minimap_tile_height = minimap_tile_size,
        minimap = new Minimap(minimap_drawing_context, heightmap, minimap_tile_width, minimap_tile_height, viewport, max_elevation);
  };

  GalacticAutomatic.prototype.generate_seed = function(seed_val) {
    var seed = 0;

    (seed_val + '').split('').map(function(c, i){ seed += c.charCodeAt(0) << i; }); // refactor?

    return seed;
  };

  GalacticAutomatic.clamp = function(index, size) {
    return (index + size) % size;
  };
  
  GalacticAutomatic.tween = function(a, b, f){
    return a + f * (b - a);
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