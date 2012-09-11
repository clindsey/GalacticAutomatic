(function(window, undefined) {
  window.Wolf = Creature.extend({
    init: function(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation){
      this._super(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation);
      this.fill_style = '#545454';
    }
  });
})(window);