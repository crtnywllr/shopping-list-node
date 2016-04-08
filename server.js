var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();

var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', function(req, res){
  var itemId = parseInt(req.params.id);
  //Check for NaN
 if (itemId !== itemId) {
     var responseMsg = {"message": "Your item id should be a number."};
      res.status(400).json(responseMsg);
  } else {
    var deletedItem;
    storage.items.forEach(function(value, indexInArray, itemArray){
      if (value.id === itemId) {
          deletedItem = value;
        return itemArray.splice(indexInArray, 1);
              }
    });
   
    if(deletedItem !== undefined){ 
      res.status(200).json(deletedItem);
    } else{
      res.status(404).json({'message':'No item with this ID.'});
    }
  } 
});

app.put('/items/:id', function(req, res) {
  console.log(req);// yep, this one. 
  var itemId = parseInt(req.params.id);
  //Check for NaN
  if (itemId !== itemId) {
     var responseMsg = {"message": "Your item id should be a number."};
      res.status(400).json(responseMsg);
  } else {
  var updatedItem;
  storage.items.forEach(function(value, indexInArray, itemArray){
   // console.log('value:' + value);
    //console.log('item:' + itemId);
    if (value.id=== itemId) {
        // here, your finding the item you want to change in the array correctly, then you store it into updatedItem
      updatedItem = value;
      // then, here what do you want to put back into the array at this location?
      storage.items[indexInArray] = updatedItem;
   } 
    res.status(200).json(updatedItem);
   // use this for put    storage.items[indexInArray] = newObject
});
}
});

app.listen(process.env.PORT || 8080);