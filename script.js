

const inventory = [

  INSERT INTO inventory (name, price, quantity, image, perishable, description)
  VALUES ("Ham", 26.90, 3, "./img/ham.jpg", true, "a pork product");
  
  INSERT INTO inventory (name, price, quantity, image, perishable, description)
  VALUES ("Ham Radio", 26.00, 1, "./img/hamradio.jpg", true, "communicate with yo homies in da forest");
  
  INSERT INTO inventory (name, price, quantity, image, perishable, description)
  VALUES ("Hammock", 19.90, 12, "./img/hammock.jpg", true, "Get that relaxation on");
  
  INSERT INTO inventory (name, price, quantity, image, perishable, description)
  VALUES ("Hamster", 12.50, 86, "./img/hamster.jpg", true, "A fuckin rodent");
  
  INSERT INTO inventory (name, price, quantity, image, perishable, description)
  VALUES ("Hammer", 2700.00, 0, "./img/hammmer.jpg", false, "Can't Touch This");

  ham = {
    name: "Ham",
    price: 26.90,
    quantity: 3,
    image: "./img/ham.jpg",
    perishable: true
  },

  hamradio = {
    name: "Ham Radio",
    price: 54.20,
    quantity: 3,
    image: "./img/hamradio.jpg",
    perishable: false

  },

  hammock = {
    name: "Hammock",
    price: 12.77,
    quantity: 2,
    image: "./img/hammock.jpg",
    perishable: false

  },

  hamster = {
    name: "Hamster",
    price: 12.77,
    quantity: 8,
    image: "./img/hamster.jpg",
    perishable: true

  },

  hammer = {
    name: "Hammer",
    price: 12.77,
    quantity: 0,
    image: "./img/hammer.jpg",
    perishable: false
  }
]

console.log(inventory[4].perishable)
