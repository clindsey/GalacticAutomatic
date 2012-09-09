var on_load;
(function(window, undefined) {
  on_load = function() {
    // no err handling currently, sorry. need to add messages for missing/inappropriate variables
    var galactic_automatic = new GalacticAutomatic({
        'world_chunk_size': 8,
        'chunk_size': 9,
        'viewport_size': 40,
        'viewport_tile_size': 10,
        'minimap_tile_size': 2,

        'max_elevation': 10,
        'seed_val': (new Date()).getTime(), //20120907,
        'viewport_static_id': 'viewport_static_canvas', // viewport canvas size should be viewport_size * viewport_tile_size
        'minimap_static_id': 'minimap_static_canvas', // minimap canvas size should be world_chunk_size * chunk_size * minimap_tile_size
        'viewport_dynamic_id': 'viewport_dynamic_canvas',
        'minimap_dynamic_id': 'minimap_dynamic_canvas'
      });
  };
})(window);