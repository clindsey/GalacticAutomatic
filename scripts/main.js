var on_load;
(function(window, undefined) {
  on_load = function() {
    // no err handling currently, sorry
    var galactic_automatic = new GalacticAutomatic({
        'world_chunk_size': 10,
        'chunk_size': 9,
        'viewport_size': 32,
        'viewport_tile_size': 10,
        'minimap_tile_size': 2.5,

        'max_elevation': 10,
        'seed_val': (new Date()).getTime(), //20120907,
        'viewport_id': 'viewport_canvas', // viewport canvas size should be viewport_size * viewport_tile_size
        'minimap_id': 'minimap_canvas' // minimap canvas size should be world_chunk_size * chunk_size * minimap_tile_size
      });
  };
})(window);