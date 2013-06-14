SpreeStore.module('Models',function(Models, SpreeStore, Backbone,Marionette,$,_){

  Models.Order = Backbone.Model.extend({
    url: function() {
      return '/store/api/orders/' + this.id
    }
  })

  Models.LineItem = Backbone.Model.extend({
    url: function() {
      return '/store/api/orders/' + SpreeStore.current_order_id + '/line_items/' + this.id
    },

    setQuantity: function(quantity) {
      this.set('quantity', quantity);
      var total = quantity * this.get('price');
      this.set('display_total_amount', Spree.Money.format(total))
      this.set('total', total)
    },

    paramRoot: 'line_item'
  })

  Models.LineItems = Backbone.Collection.extend({
    model: Models.LineItem,
    url: function() {
      return '/store/api/orders/' + SpreeStore.current_order_id + '/line_items'
    }
  })
})