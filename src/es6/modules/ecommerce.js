window.dataLayer = window.dataLayer || [];
let list = "Терри Пратчетт";

export default {
  'buy': function(data) {
    dataLayer.push({
        'ecommerce': {
            'currencyCode': 'RUB',
            'add': {
                'products': [{
                    'name': data.name,
                    'id': data.id,
                    'price': data.price,
                    'quantity': 1
                }]
            }
        },
        'event': 'gtm-ee-event',
        'gtm-ee-event-category': 'Enhanced Ecommerce',
        'gtm-ee-event-action': 'Adding a Product to a Shopping Cart',
        'gtm-ee-event-non-interaction': 'False',
    });
  },
  'link': function(data) {
    console.log(data.callback)
    dataLayer.push({
        'ecommerce': {
            'currencyCode': 'RUB',
            'click': {
                'actionField': {'list': list },
                'products': [{
                    'name': data.name,
                    'id': data.id,
                    'price': data.price,

                }]
            }
        },

        'event': 'gtm-ee-event',
        'gtm-ee-event-category': 'Enhanced Ecommerce',
        'gtm-ee-event-action': 'Product Clicks',
        'gtm-ee-event-non-interaction': 'False',
    });
    if (data.callback) data.callback();
  }
}