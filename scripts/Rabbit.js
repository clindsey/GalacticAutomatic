(function(window, undefined) {
  window.Rabbit = Creature.extend({
    init: function(entitymap, heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation){
      this._super(entitymap, heightmap, heightmap_x, heightmap_y, heightmap_width, heightmap_height, max_elevation);
      this.fill_style = '#91B396';
      this.target_food = Carrot;
    }
  });
})(window);