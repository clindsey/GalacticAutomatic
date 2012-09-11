(function(window, undefined) {
  window.Carrot = Creature.extend({
    init: function(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation){
      this._super(heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation);
      this.state = 'stopped';
      this.fill_style = '#FC7C05';
    }
  });
})(window);