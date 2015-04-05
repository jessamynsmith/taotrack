angular.module('taotrack.services', [])

  .factory('Elements', function() {
    var elements = [{
      name: 'wood',
      data: [
        ['Name', 'Wood'],
        ['Color', 'Green'],
        ['Spirit', 'Hun'],
        ['Virtue', 'Kindness'],
        ['Emotion', 'Anger'],
        ['Sound', 'Shout'],
        ['Yin Organ', 'Liver'],
        ['Yang Organ', 'Gallbladder'],
        ['Tissue', 'Nerves & Tendons'],
        ['Sense Organ', 'Eyes'],
        ['Taste', 'Sour'],
        ['Animal', 'Green Dragon'],
        ['Season', 'Spring'],
        ['Affliction', 'Wind']
    ]}, {
      name: 'fire',
      data: [
        ['Name', 'Fire'],
        ['Color', 'Red'],
        ['Spirit', 'Shen'],
        ['Virtue', 'Patience'],
        ['Emotion', 'Worry'],
        ['Sound', 'Laugh'],
        ['Yin Organ', 'Heart'],
        ['Yang Organ', 'Small Intestine'],
        ['Tissue', 'Blood Vessels'],
        ['Sense Organ', 'Tongue'],
        ['Taste', 'Bitter'],
        ['Animal', 'Red Phoenix'],
        ['Season', 'Summer'],
        ['Affliction', 'Heat']
    ]}, {
      name: 'earth',
      data: [
        ['Name', 'Earth'],
        ['Color', 'Yellow'],
        ['Spirit', 'Yi'],
        ['Virtue', 'Fairness'],
        ['Emotion', 'Worry'],
        ['Sound', 'Sing'],
        ['Yin Organ', 'Spleen'],
        ['Yang Organ', 'Stomach'],
        ['Tissue', 'Muscles & Fascia'],
        ['Sense Organ', 'Mouth'],
        ['Taste', 'Sweet'],
        ['Animal', 'Yellow Phoenix'],
        ['Season', 'Late Summer'],
        ['Affliction', 'Damp']
    ]}, {
      name: 'metal',
      data: [
        ['Name', 'Metal'],
        ['Color', 'White'],
        ['Spirit', 'Po'],
        ['Virtue', 'Courage'],
        ['Emotion', 'Sadness'],
        ['Sound', 'Weep'],
        ['Yin Organ', 'Lungs'],
        ['Yang Organ', 'Large Intestine'],
        ['Tissue', 'Skin & Hair'],
        ['Sense Organ', 'Nose'],
        ['Taste', 'Pungent'],
        ['Animal', 'White Tiger'],
        ['Season', 'Autumn'],
        ['Affliction', 'Dry']
    ]}, {
      name: 'water',
      data: [
        ['Name', 'Water'],
        ['Color', 'Blue'],
        ['Spirit', 'Zhi'],
        ['Virtue', 'Wisdom'],
        ['Emotion', 'Fear'],
        ['Sound', 'Groan'],
        ['Yin Organ', 'Kidneys'],
        ['Yang Organ', 'Bladder'],
        ['Tissue', 'Bones'],
        ['Sense Organ', 'Ears'],
        ['Taste', 'Salty'],
        ['Animal', 'Blue Tortoise'],
        ['Season', 'Winter'],
        ['Affliction', 'Cold']
    ]}];

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
      },
      getValueFromData: function(element, key) {
        for (var i = 0; i < element.data.length; i++) {
          if (element.data[i][0] === key) {
            return element.data[i][1];
          }
        }
        return null;
      }
    };
  });
