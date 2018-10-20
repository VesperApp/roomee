const db = require('./index.js');

const userDummyData = [
  {
    name: 'Boseph Bun',
    email: 'slowcoder@yahoo.com',
    location: 'Los Angeles, CA',
    cover_photo:
      'https://images.pexels.com/photos/255379/pexels-photo-255379.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo: 'https://images.pexels.com/photos/21278/pexels-photo.jpg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '90024',
  },
  {
    name: 'Eric Night',
    email: 'nightanddai@yahoo.com',
    location: 'Washington DC',
    cover_photo:
      'https://images.pexels.com/photos/1755/purple-abstract-blur-bokeh.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/32976/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '90024',
  },
  {
    name: 'Wyclef Jean Fils',
    email: 'gonetilnovember@yahoo.com',
    location: 'New York, NY',
    cover_photo:
      'https://images.pexels.com/photos/1547/light-blur-blurred-background.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/6110/man-holiday-people-face.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '90024',
  },
  {
    name: 'Henry Hoff',
    email: 'donteatmypotato@yahoo.com',
    location: 'San Franciso, CA',
    cover_photo:
      'https://images.pexels.com/photos/1459/street-car-vehicle-blur.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/50855/pexels-photo-50855.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '90024',
  },
  {
    name: 'Johnny Appleseed',
    email: 'applepie@yahoo.com',
    location: 'Chicago, IL',
    cover_photo:
      'https://images.pexels.com/photos/9374/lights-night-lens-blur.jpg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/423364/pexels-photo-423364.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '90024',
  },
  {
    name: 'Lebronda James',
    email: 'nottheking@yahoo.com',
    location: 'Los Angeles, CA',
    cover_photo:
      'https://images.pexels.com/photos/159868/lost-cat-tree-sign-fun-159868.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/262391/pexels-photo-262391.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '80017',
  },
  {
    name: 'Carl Junior',
    email: '5thbestfastfoodchain@yahoo.com',
    location: 'Dallas, TX',
    cover_photo:
      'https://images.pexels.com/photos/161029/cottage-lake-water-nature-161029.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/1054685/pexels-photo-1054685.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '80017',
  },
  {
    name: 'Ronald McDonald',
    email: 'scaryclown@yahoo.com',
    location: 'Oak Brook, IL',
    cover_photo:
      'https://images.pexels.com/photos/68470/pexels-photo-68470.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/542282/pexels-photo-542282.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '80017',
  },
  {
    name: 'Cody Bot',
    email: 'idontmoonomore@yahoo.com',
    location: 'Los Angeles, CA',
    cover_photo:
      'https://images.pexels.com/photos/167976/pexels-photo-167976.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/372059/pexels-photo-372059.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '80017',
  },
  {
    name: 'George Curious',
    email: 'whatsthat@yahoo.com',
    location: 'Miami, FL',
    cover_photo:
      'https://images.pexels.com/photos/204867/pexels-photo-204867.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    profile_photo:
      'https://images.pexels.com/photos/952088/pexels-photo-952088.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
    description:
      'Lorem ipsum dolor sit amet, no porro tincidunt sit, malis nulla est ne. Per ad velit assentior, ex per laudem utamur dissentiet. Aliquid definiebas nec ne, ne sea congue iisque impedit. Eleifend accommodare interpretaris vix ei. Et usu simul tibique sententiae, antiopam euripidis constituto per et, quo sint denique accusamus ex.',
    zipCode: '80017',
  },
];

userDummyData.forEach(record => {
  db.FBUser.create({
    username: record.name,
    email: record.email,
    location: record.location,
    picture: record.profile_photo,
    coverPhoto: record.cover_photo,
    zipCode: record.zipCode,
  }).then(user => {
    console.log(user);
  });
});
