// Base class for Animal
class Animal {
    constructor(name, size, isCarnivore) {
      this.name = name;
      this.size = size; // e.g., 'small', 'medium', 'large'
      this.isCarnivore = isCarnivore; // true or false
    }
  
    eat() {
      if (this.isCarnivore) {
        return `${this.name} eats meat.`;
      } else {
        return `${this.name} eats plants.`;
      }
    }
  }
  
  // Derived classes for specific animals
  class Lion extends Animal {
    constructor() {
      super("Lion", "large", true); // Passing specific values to the base class constructor
    }
  
    roar() {
      return "The Lion roars loudly!";
    }
  }
  
  class Elephant extends Animal {
    constructor() {
      super("Elephant", "large", false);
    }
  
    trumpet() {
      return "The Elephant trumpets!";
    }
  }
  
  class Monkey extends Animal {
    constructor() {
      super("Monkey", "medium", false);
    }
  
    swing() {
      return "The Monkey swings from tree to tree!";
    }
  }
  
  class Crocodile extends Animal {
    constructor() {
      super("Crocodile", "large", true);
    }
  
    snap() {
      return "The Crocodile snaps its jaws!";
    }
  }
  
  // Zoo class to manage sections and animals
  class Zoo {
    constructor(name) {
      this.name = name;
      this.sections = []; // Zoo has sections
    }
  
    addSection(section) {
      this.sections.push(section);
    }
  
    listAnimals() {
      return this.sections.flatMap(section => section.animals.map(animal => animal.name));
    }
  }
  
  class Section {
    constructor(name) {
      this.name = name;
      this.animals = [];
    }
  
    addAnimal(animal) {
      this.animals.push(animal);
    }
  
    describeSection() {
      return `Section ${this.name} has the following animals: ${this.animals.map(a => a.name).join(", ")}.`;
    }
  }
  
  // Example usage
  const zoo = new Zoo("City Zoo");
  
  // Create sections
  const savannah = new Section("Savannah");
  const rainforest = new Section("Rainforest");
  const swamp = new Section("Swamp");
  
  // Add animals to sections
  const lion = new Lion();
  const elephant = new Elephant();
  const monkey = new Monkey();
  const crocodile = new Crocodile();
  
  savannah.addAnimal(lion);
  savannah.addAnimal(elephant);
  rainforest.addAnimal(monkey);
  swamp.addAnimal(crocodile);
  
  // Add sections to the zoo
  zoo.addSection(savannah);
  zoo.addSection(rainforest);
  zoo.addSection(swamp);
  
  // Interact with the zoo
  console.log(savannah.describeSection());
  console.log(rainforest.describeSection());
  console.log(swamp.describeSection());
  console.log(`Animals in the zoo: ${zoo.listAnimals().join(", ")}`);
  
  // Specific animal actions
  console.log(lion.roar());
  console.log(elephant.trumpet());
  console.log(monkey.swing());
  console.log(crocodile.snap());
  