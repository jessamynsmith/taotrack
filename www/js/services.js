angular.module('taotrack.services', [])

  .factory('Elements', function() {
    var elements = [{
      name: 'wood',
      color: 'green',
      spirit: 'hun',
      virtue: 'kindness',
      emotion: 'anger',
      sound: 'shout',
      yin_organ: 'liver',
      yang_organ: 'gallbladder',
      tissue: 'nerves & tendons',
      sense_organ: 'eyes',
      taste: 'sour',
      animal: 'green dragon',
      season: 'spring',
      affliction: 'wind'
    },
    {
      name: 'fire',
      color: 'red',
      spirit: 'shen',
      virtue: 'love',
      emotion: 'arrogance',
      sound: 'laugh',
      yin_organ: 'heart',
      yang_organ: 'small intestine',
      tissue: 'blood vessels',
      sense_organ: 'tongue',
      taste: 'bitter',
      animal: 'red phoenix',
      season: 'summer',
      affliction: 'heat'
    },
    {
      name: 'earth',
      color: 'yellow',
      spirit: 'yi',
      virtue: 'fairness',
      emotion: 'worry',
      sound: 'sing',
      yin_organ: 'spleen',
      yang_organ: 'stomach',
      tissue: 'muscles & fascia',
      sense_organ: 'mouth',
      taste: 'sweet',
      animal: 'yellow phoenix',
      season: 'late summer',
      affliction: 'damp'
    },
    {
      name: 'metal',
      color: 'white',
      spirit: 'po',
      virtue: 'courage',
      emotion: 'sadness',
      sound: 'weep',
      yin_organ: 'lungs',
      yang_organ: 'large intestine',
      tissue: 'skin & hair',
      sense_organ: 'nose',
      taste: 'pungent',
      animal: 'white tiger',
      season: 'autumn',
      affliction: 'dry'
    },
    {
      name: 'water',
      color: 'blue',
      spirit: 'zhi',
      virtue: 'wisdom',
      emotion: 'fear',
      sound: 'groan',
      yin_organ: 'kidneys',
      yang_organ: 'bladder',
      tissue: 'bones',
      sense_organ: 'ears',
      taste: 'salty',
      animal: 'blue tortoise',
      season: 'winter',
      affliction: 'cold'
    }];

    return {
      all: function() {
        return elements;
      },
      get: function(elementName) {
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].name === elementName) {
            return elements[i];
          }
        }
        return null;
      }
    };
  });
