// Solar system data
const METRIC_DEF = {
  Mass:
    "Mass is both a property of a physical body and a measure of its resistance to acceleration when a net force is applied.",
  Diameter:
    "In geometry, a diameter of a circle is any straight line segment that passes through the center of the circle and whose endpoints lie on the circle.",
  Density: "Density is a measure of mass per volume.",
  Gravity:
    "Gravity is the force by which a planet or other body draws objects toward its center. The force of gravity keeps all of the planets in orbit around the sun.",
  "Escape Velocity":
    "In physics (specifically, celestial mechanics), escape velocity is the minimum speed needed for a free, non-propelled object to escape from the gravitational influence of a massive body, that is, to achieve an infinite distance from it.",
  "Rotation Period":
    "Rotational period is the time it takes for that object to rotate just once. Rotational period is the term describing the length of time necessary for a space object to make one complete rotation.",
  "Length of Day":
    "Day, in astronomy, the average length of time between successive noons. Noon is defined as the instant when the sun is highest in the sky.",
  "Distance from Sun":
    "The astronomical unit (symbol: au,[1][2][3] or AU) is a unit of length, roughly the distance from Earth to the Sun and equal to about 150 million kilometres (93 million miles). The actual distance varies as Earth orbits the Sun, from a maximum (aphelion) to a minimum (perihelion) and back again once each year. The AU was originally conceived as the average of Earth's aphelion and perihelion; however, since 2012 it has been defined as exactly 149597870700 m.",
  Perihelion:
    "The perihelion is the point in the orbit of a planet, asteroid or comet that is nearest to the sun. It is the opposite of aphelion, which is the point farthest from the sun.",
  Aphelion:
    "The aphelion is the point in the orbit of an object where it is farthest from the Sun. The point in orbit where an object is nearest to the sun is called the perihelion. The word aphelion derives from the Greek words, apo meaning away, off, apart and Helios.",
  "Orbital Period":
    "The orbital period is the time a given astronomical object takes to complete one orbit around another object, and applies in astronomy usually to planets or asteroids orbiting the Sun, moons orbiting planets, exoplanets orbiting other stars, or binary stars.",
  "Orbital Velocity":
    "In gravitationally bound systems, the orbital speed of an astronomical body or object is the speed at which it orbits around either the barycenter or, if one object is much more massive than the other bodies in the system, its speed relative to the center of mass of the most massive body.",
  "Orbital Inclination":
    "Orbital inclination measures the tilt of an object's orbit around a celestial body. It is expressed as the angle between a reference plane and the orbital plane or axis of direction of the orbiting object. ",
  "Orbital Eccentricity":
    "The orbital eccentricity of an astronomical object is a dimensionless parameter that determines the amount by which its orbit around another body deviates from a perfect circle.",
  "Obliquity to Orbit":
    "In astronomy, axial tilt, also known as obliquity, is the angle between an object's rotational axis and its orbital axis, or, equivalently, the angle between its equatorial plane and orbital plane. It differs from orbital inclination.",
  "Mean Temperature":
    "The average temperature of the air as indicated by a properly exposed thermometer during a given time period, usually a day, month, or year.",
  "Surface Pressure":
    "Surface pressure is the atmospheric pressure at a location on a planet's surface (terrain and oceans). It is directly proportional to the mass of air over that location. For numerical reasons, atmospheric models such as general circulation models (GCMs) usually predict the nondimensional logarithm of surface pressure.",
  "Number of Moons": "Number of Moons",
  "Ring System":
    "A ring system is a disc or ring orbiting an astronomical object that is composed of solid material such as dust and moonlets, and is a common component of satellite systems around giant planets. A ring system around a planet is also known as a planetary ring system.",
  "Global Magnetic Field":
    "Magnetic field, a vector field in the neighbourhood of a magnet, electric current, or changing electric field, in which magnetic forces are observable. Magnetic fields such as that of Earth cause magnetic compass needles and other permanent magnets to line up in the direction of the field. ",
};

const METRIC_DATA = {
  Mass: {
    data: {
      Mercury: 0.33,
      Venus: 4.87,
      Earth: 5.97,
      Moon: 0.073,
      Mars: 0.642,
      Jupiter: 1898,
      Saturn: 568,
      Uranus: 86.8,
      Neptune: 102,
      Pluto: 0.0146,
    },
    unit: "10^24 kg",
    decimals: 4,
  },
  Diameter: {
    data: {
      Mercury: 4879,
      Venus: 12104,
      Earth: 12756,
      Moon: 3475,
      Mars: 6792,
      Jupiter: 142984,
      Saturn: 120536,
      Uranus: 51118,
      Neptune: 49528,
      Pluto: 2370,
    },
    unit: "km",
    decimals: 0,
  },
  Density: {
    data: {
      Mercury: 5427,
      Venus: 5243,
      Earth: 5514,
      Moon: 3340,
      Mars: 3933,
      Jupiter: 1326,
      Saturn: 687,
      Uranus: 1271,
      Neptune: 1638,
      Pluto: 2095,
    },
    unit: "kg/m^3",
    decimals: 0,
  },
  Gravity: {
    data: {
      Mercury: 3.7,
      Venus: 8.9,
      Earth: 9.8,
      Moon: 1.6,
      Mars: 3.7,
      Jupiter: 23.1,
      Saturn: 9.0,
      Uranus: 8.7,
      Neptune: 11.0,
      Pluto: 0.7,
    },
    unit: "m/s^2",
    decimals: 1,
  },
  "Escape Velocity": {
    data: {
      Mercury: 4.3,
      Venus: 10.4,
      Earth: 11.2,
      Moon: 2.4,
      Mars: 5.0,
      Jupiter: 59.5,
      Saturn: 35.5,
      Uranus: 21.3,
      Neptune: 23.5,
      Pluto: 1.3,
    },
    unit: "km/s",
    decimals: 1,
  },
  "Rotation Period": {
    data: {
      Mercury: 1407.6,
      Venus: -5832.5,
      Earth: 23.9,
      Moon: 655.7,
      Mars: 24.6,
      Jupiter: 9.9,
      Saturn: 10.7,
      Uranus: -17.2,
      Neptune: 16.1,
      Pluto: -153.3,
    },
    unit: "hrs",
    decimals: 1,
  },
  "Length of Day": {
    data: {
      Mercury: 4222.6,
      Venus: 2802.0,
      Earth: 24.0,
      Moon: 708.7,
      Mars: 24.7,
      Jupiter: 9.9,
      Saturn: 10.7,
      Uranus: 17.2,
      Neptune: 16.1,
      Pluto: 153.3,
    },
    unit: "hrs",
    decimals: 1,
  },
  "Distance from Sun": {
    data: {
      Mercury: 57.9,
      Venus: 108.2,
      Earth: 149.6,
      Moon: 0.384,
      Mars: 227.9,
      Jupiter: 778.6,
      Saturn: 1433.5,
      Uranus: 2872.5,
      Neptune: 4495.1,
      Pluto: 5906.4,
    },
    unit: "×10^6km",
    decimals: 1,
  },
  Perihelion: {
    data: {
      Mercury: 46.0,
      Venus: 107.5,
      Earth: 147.1,
      Moon: 0.363,
      Mars: 206.6,
      Jupiter: 740.5,
      Saturn: 1352.6,
      Uranus: 2741.3,
      Neptune: 4444.5,
      Pluto: 4436.8,
    },
    unit: "10^6km",
    decimals: 1,
  },
  Aphelion: {
    data: {
      Mercury: 46.0,
      Venus: 107.5,
      Earth: 147.1,
      Moon: 0.363,
      Mars: 206.6,
      Jupiter: 740.5,
      Saturn: 1352.6,
      Uranus: 2741.3,
      Neptune: 4444.5,
      Pluto: 4436.8,
    },
    unit: "10^6km",
    decimals: 1,
  },
  "Orbital Period": {
    data: {
      Mercury: 88.0,
      Venus: 224.7,
      Earth: 365.2,
      Moon: 27.3,
      Mars: 687.0,
      Jupiter: 4331,
      Saturn: 10747,
      Uranus: 30589,
      Neptune: 59800,
      Pluto: 90560,
    },
    unit: "days",
    decimals: 1,
  },
  "Orbital Velocity": {
    data: {
      Mercury: 47.4,
      Venus: 35.0,
      Earth: 29.8,
      Moon: 1.0,
      Mars: 24.1,
      Jupiter: 13.1,
      Saturn: 9.7,
      Uranus: 6.8,
      Neptune: 5.4,
      Pluto: 4.7,
    },
    unit: "km/s",
    decimals: 1,
  },
  "Orbital Inclination": {
    data: {
      Mercury: 7.0,
      Venus: 3.4,
      Earth: 0.0,
      Moon: 5.1,
      Mars: 1.9,
      Jupiter: 1.3,
      Saturn: 2.5,
      Uranus: 0.8,
      Neptune: 1.8,
      Pluto: 17.2,
    },
    unit: "°",
    decimals: 1,
  },
  "Orbital Eccentricity": {
    data: {
      Mercury: 0.205,
      Venus: 0.007,
      Earth: 0.017,
      Moon: 0.055,
      Mars: 0.094,
      Jupiter: 0.049,
      Saturn: 0.057,
      Uranus: 0.046,
      Neptune: 0.011,
      Pluto: 0.244,
    },
    unit: "",
    decimals: 3,
  },
  "Obliquity to Orbit": {
    data: {
      Mercury: 0.034,
      Venus: 177.4,
      Earth: 23.4,
      Moon: 6.7,
      Mars: 25.2,
      Jupiter: 3.1,
      Saturn: 26.7,
      Uranus: 97.8,
      Neptune: 28.3,
      Pluto: 122.5,
    },
    unit: "°",
    decimals: 1,
  },
  "Mean Temperature": {
    data: {
      Mercury: 167,
      Venus: 464,
      Earth: 15,
      Moon: -20,
      Mars: -65,
      Jupiter: -110,
      Saturn: -140,
      Uranus: -195,
      Neptune: -200,
      Pluto: -225,
    },
    unit: "°C",
    decimals: 0,
  },
  "Surface Pressure": {
    data: {
      Mercury: 0,
      Venus: 92,
      Earth: 1,
      Moon: 0,
      Mars: 0.01,
      // Jupiter: 0,  // Unknown
      // Saturn: 0,   // Unknown
      // Uranus: 0,   // Unknown
      // Neptune: 0,  // Unknown
      Pluto: 0.00001,
    },
    unit: "bars",
    decimals: 0,
  },
  "Number of Moons": {
    data: {
      Mercury: 0,
      Venus: 0,
      Earth: 1,
      Moon: 0,
      Mars: 2,
      Jupiter: 79,
      Saturn: 82,
      Uranus: 27,
      Neptune: 14,
      Pluto: 5,
    },
    unit: "",
    decimals: 0,
  },
  // "Ring System": {
  //   data: {
  //     Mercury: 0,
  //     Venus: 0,
  //     Earth: 0,
  //     Moon: 0,
  //     Mars: 0,
  //     Jupiter: 1,
  //     Saturn: 1,
  //     Uranus: 1,
  //     Neptune: 1,
  //     Pluto: 0,
  //   },
  //   unit: "",
  //   decimals: 0,
  // },
  // "Global Magnetic Field": {
  //   data: {
  //     Mercury: 1,
  //     Venus: 0,
  //     Earth: 1,
  //     Moon: 0,
  //     Mars: 0,
  //     Jupiter: 1,
  //     Saturn: 1,
  //     Uranus: 1,
  //     Neptune: 1,
  //     // Pluto: 0,  // Unknown
  //   },
  //   unit: "",
  //   decimals: 0,
  // },
};

const PLANET_IMG = {
  Mercury: [
    {
      name: "Global Mosaic",
      img:
        "https://www.universetoday.com/wp-content/uploads/2011/12/mercury-global-mosaic.png",
      description:
        "Until relatively recently, Mercury was one of the most poorly understood planets in the inner solar system. The MESSENGER mission to Mercury, is changing all of the that. New results from the Mercury Laser Altimeter (MLA) and gravity measurements are showing us that the planet closest to our sun is thin skinned and wrinkled, which is very different from what we originally thought.",
      link:
        "https://www.universetoday.com/94571/thin-skinned-and-wrinkled-mercury-is-full-of-surprises/",
    },
    {
      name: "Messenger Orbit",
      img:
        "https://www.nasa.gov/sites/default/files/thumbnails/image/728322main_messenger_orbit_image20130218_2.jpg",
      description:
        "This colorful view of Mercury was produced by using images from the color base map imaging campaign during MESSENGER's primary mission. These colors are not what Mercury would look like to the human eye, but rather the colors enhance the chemical, mineralogical, and physical differences between the rocks that make up Mercury's surface.",
      link:
        "https://www.nasa.gov/mediacast/gravity-assist-podcast-mercury-with-faith-vilas",
    },
  ],
  Venus: [
    {
      name: "Venus",
      img:
        "https://www.nasa.gov/sites/default/files/thumbnails/image/venus20191211-16.jpg",
      description:
        "Venus hides a wealth of information that could help us better understand Earth and exoplanets. NASA's JPL is designing mission concepts to survive the planet's extreme temperatures and atmospheric pressure. This image is a composite of data from NASA's Magellan spacecraft and Pioneer Venus Orbiter.",
      link:
        "https://www.nasa.gov/feature/jpl/the-return-to-venus-and-what-it-means-for-earth",
    },
    {
      name: "Newly Processed View",
      img:
        "https://upload.wikimedia.org/wikipedia/commons/a/a9/PIA23791-Venus-NewlyProcessedView-20200608.jpg",
      description: "Venus in contrast-enhanced false colour, February 1974",
      link: "https://en.wikipedia.org/wiki/Venus",
    },
  ],
  Earth: [
    {
      name: "Earth",
      img:
        "https://cdn.mos.cms.futurecdn.net/9SrdMYXahhJoc2Ye24wCxe-1024-80.jpg.webp",
      description: "Earth day is on the 22nd of April.",
      link: "https://www.space.com/earth-day-amazing-nasa-photos.html",
    },
    {
      name: "Blue Marble",
      img:
        "https://eoimages.gsfc.nasa.gov/images/imagerecords/0/565/BlueMarble.jpg",
      description:
        "Recalling the famous Apollo-era pictures of Earth taken by lunar astronauts, this digital image is a spectacular portrait of the Western Hemisphere at the time of one of the strongest hurricanes ever observed in the Eastern Pacific.",
      link:
        "https://earthobservatory.nasa.gov/images/565/earth-the-blue-marble",
    },
  ],
  // Moon: [
  //     {
  //         name: "Moon",
  //         img:
  //             "https://cdn.mos.cms.futurecdn.net/j5yBK37PKVoS3bJWBwN9qc-1024-80.jpg.webp",
  //         description:
  //             "The near-side of the moon, as seen by NASA's robotic Lunar Reconnaissance Orbiter.",
  //         link: "https://www.space.com/nasa-buy-moon-dirt-private-companies.html",
  //     },
  //     {
  //         name: "Moon",
  //         img:
  //             "https://www.nasa.gov/sites/default/files/thumbnails/image/main_image.jpg",
  //         description:
  //             "Commercial landers will carry NASA-provided science and technology payloads to the lunar surface, paving the way for NASA astronauts to land on the Moon by 2024.",
  //         link:
  //             "https://www.nasa.gov/press-release/nasa-selects-first-commercial-moon-landing-services-for-artemis-program",
  //     },
  // ],
  Mars: [
    {
      name: "Mars",
      img: "https://www.jpl.nasa.gov/images/mars/20160421/PIA00407-16.jpg",
      description:
        "Six major missions are planned in this decade as part of a scientific tapestry that will weave a tale of new understanding of Earth's sometimes enigmatic and surprising neighbor.",
      link: "https://www.jpl.nasa.gov/news/news.php?feature=4870",
    },
    {
      name: "Mars",
      img:
        "https://cdn.mos.cms.futurecdn.net/5boWV7QPgeCo4LaCNZHeDc-1024-80.jpg.webp",
      description:
        "NASA's Perseverance rover will store rock and soil samples in sealed tubes on the Martian surface for future missions to retrieve and bring back to Earth.",
      link: "https://www.space.com/mars-rover-perseverance-100-days-landing",
    },
  ],
  Jupiter: [
    {
      name: "Jupiter",
      img:
        "https://www.nasa.gov/sites/default/files/thumbnails/image/stsci-h-p1936a-m-1999x2000.png",
      description:
        "This new Hubble Space Telescope view of Jupiter, taken on June 27, 2019, reveals the giant planet's trademark Great Red Spot, and a more intense color palette in the clouds swirling in Jupiter's turbulent atmosphere than seen in previous years. The colors, and their changes, provide important clues to ongoing processes in Jupiter's atmosphere. The new image was taken in visible light as part of the Outer Planets Atmospheres Legacy program, or OPAL. The program provides yearly Hubble global views of the outer planets to look for changes in their storms, winds and clouds. Hubble's Wide Field Camera 3 observed Jupiter when the planet was 400 million miles from Earth, when Jupiter was near \"opposition\" or almost directly opposite the Sun in the sky.",
      link:
        "https://www.nasa.gov/feature/goddard/2019/hubble-new-portrait-of-jupiter/",
    },
    {
      name: "Juno",
      img:
        "https://i2.wp.com/www.intelligentliving.co/wp-content/uploads/2020/03/juno6-1.jpg?w=1000&ssl=1",
      description:
        "NASA has an incredible $1 Billion Spacecraft that flies around Jupiter, taking breathtaking photos with its JunoCam instrument traveling at speeds up to 130,000 mph. Juno, as it is called, is getting relatively close to the gas giant, capturing the images approximately every 53 days and sending them back to Earth – a process that can take days or sometimes weeks for NASA to receive.",
      link: "https://www.intelligentliving.co/mind-bending-photos-of-jupiter/",
    },
  ],
  Saturn: [
    {
      name: "Saturn",
      img:
        "https://www.sciencealert.com/images/2019-09/stsci-h-p1943a-f-2076x1484.png",
      description:
        "This image of the ringed-planet was captured when Saturn was at its closest to Earth, some 1.36 billion km away (845 million miles) on June 20th, 2019. The crisp image was captured with Hubble's Wide Field Camera 3 (WFC3.)",
      link:
        "https://www.sciencealert.com/behold-our-latest-view-of-saturn-from-hubble-in-all-its-stunning-glory",
    },
    {
      name: "Saturn and Titan",
      img:
        "https://solarsystem.nasa.gov/system/resources/detail_files/17747_Saturn_and_Titan.jpg",
      description:
        "NASA’s Cassini spacecraft has explored the Saturn system since 2004, re-writing our understanding of the giant planet, its rings, moons and magnetosphere. For 13 years the spacecraft’s incredible, truly otherworldly images have revealed the wonder of Saturn in surprising, often awe-inspiring ways. Cassini is planetary exploration at its finest, proving that to truly reveal the grandeur of a world, there is no substitute for actually going there.",
      link:
        "https://solarsystem.nasa.gov/resources/17747/cassini-the-wonder-of-saturn-video/",
    },
  ],
  Uranus: [
    {
      name: "Uranus Voyager",
      img: "https://miro.medium.com/max/1050/1*F04NVRyBDRuLwPkD0rBN9w.jpeg",
      description:
        "This is an image of the planet Uranus taken by the spacecraft Voyager 2 in 1986. This iconic image of Uranus appears to make it the most boring planet of all, but it’s only truly boring sometimes. (NASA / JPL-CALTECH)",
      link:
        "https://medium.com/starts-with-a-bang/why-is-uranus-the-only-planet-without-interesting-features-on-it-8745511ece78",
    },
    {
      name: "Uranus Orbits",
      img:
        "https://images.news18.com/ibnlive/uploads/2020/04/1586186064_uranus.jpg?impolicy=website&width=534&height=356",
      description:
        "Unlike all the other planets, Uranus' orbit is tipped over by 98 degrees, causing the planet and even its moons to spin in a unique way.",
      link:
        "https://www.news18.com/news/tech/uranus-weird-tilted-orbit-may-have-been-caused-by-collision-with-icy-dwarf-planet-2567121.html",
    },
  ],
  Neptune: [
    {
      name: "Neptune",
      img: "https://scx2.b-cdn.net/gfx/news/2019/7-nextgenerati.jpg",
      description:
        "NASA's Voyager 2 spacecraft gave humanity its first glimpse of Neptune and its moon, Triton, in the summer of 1989. This image, taken at a range of 4.4 million miles from the planet, shows the Great Dark Spot and its companion bright smudge. These clouds were seen to persist for as long as Voyager's cameras could resolve them. Credit: NASA",
      link:
        "https://phys.org/news/2019-04-next-generation-nasa-instrument-advanced-atmospheres.html",
    },
    {
      name: "165 years to orbit",
      img:
        "https://specials-images.forbesimg.com/imageserve/648792456/960x0.jpg?fit=scale",
      description:
        "Which planet takes 165 years to orbit the Sun, has 14 moons all named after sea nymphs, is ravaged by supersonic winds, and has only been photographed once up-close by a spacecraft?",
      link:
        "https://www.forbes.com/sites/jamiecartereurope/2019/08/29/its-time-we-went-back-to-neptune-nasas-photos-are-30-years-old/?sh=192371221e7c",
    },
  ],
  Pluto: [
    {
      name: "Colorful Pluto",
      img:
        "https://www.nasa.gov/sites/default/files/thumbnails/image/nh_pluto_10.png",
      description:
        "Enhanced color global view of Pluto, taken when NASA’s New Horizons spacecraft was 280,000 miles (450,000 kilometers) away.",
      link:
        "https://www.nasa.gov/feature/five-years-after-new-horizons-historic-flyby-here-are-10-cool-things-we-learned-about-plut-0/",
    },
    {
      name: "Infared",
      img:
        "https://s23527.pcdn.co/wp-content/uploads/2018/06/pluto-infrared.jpg.optimal.jpg",
      description:
        "It was three years ago when NASA shared the first image of Pluto taken with a camera named Ralph. An enhanced image showed us rich and wonderful color variations, and now there’s an infrared image as well. It’s amazingly rich in details, and the colors are just gorgeous.",
      link:
        "https://www.diyphotography.net/this-is-how-no-longer-a-planet-pluto-looks-like-in-infrared/",
    },
  ],
};

const PLANET_FACTS = [
  "Hot",
  "No-moony",
  "Human",
  "Elon-land",
  "Comet-catcher",
  "The flattest",
  "Supersonic winds",
  "Smallest gas giant",
  "Fired",
];

export { PLANET_IMG, PLANET_FACTS, METRIC_DATA, METRIC_DEF };
