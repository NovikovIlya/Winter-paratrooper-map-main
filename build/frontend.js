/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/Map.jsx":
/*!*********************!*\
  !*** ./src/Map.jsx ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/projection/mercator.js");
/* harmony import */ var d3_geo__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-geo */ "./node_modules/d3-geo/src/path/index.js");
/* harmony import */ var d3_zoom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-zoom */ "./node_modules/d3-zoom/src/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/select.js");
/* harmony import */ var _cities__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cities */ "./src/cities.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/useQuery.js");
/* harmony import */ var _citiesTwo__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./citiesTwo */ "./src/citiesTwo.js");








const cities = _cities__WEBPACK_IMPORTED_MODULE_2__.citiesAll.map(item => ({
  ...item,
  coordinates: [Number(item.coordinates.lon), Number(item.coordinates.lat)]
})).concat(_citiesTwo__WEBPACK_IMPORTED_MODULE_3__.citiesTwo).filter((city, index, self) => index === self.findIndex(c => c.coordinates[0] === city.coordinates[0] && c.coordinates[1] === city.coordinates[1]));
function Map() {
  const [slug, setSlug] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)('pohod-1989-g-snezhnogo-desanta-istoricheskogo-fakulteta-2');
  //   const [slug,setSlug] = useState(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
  const [selectedCity, setSelectedCity] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [russiaGeoJson, setRussiaGeoJson] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showRoute, setShowRoute] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const svgRef = (0,react__WEBPACK_IMPORTED_MODULE_0__.useRef)(null);
  const {
    isPending,
    error,
    data,
    isFetching
  } = (0,_tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.useQuery)({
    queryKey: ['repoData', slug],
    queryFn: async () => {
      const response = await fetch(`https://sneg.kpfu.ru/wp-json/wp/v2/campaign?slug=${slug}`);
      return await response.json();
    }
  });
  const array = Array.isArray(data) && data.length > 0 ? data[0]?.route_new.value : [];
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/asia.geojson').then(response => response.json()).then(data => setRussiaGeoJson(data));
  }, []);
  (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (svgRef.current && russiaGeoJson) {
      const svg = (0,d3_selection__WEBPACK_IMPORTED_MODULE_5__["default"])(svgRef.current);
      const zoomBehavior = (0,d3_zoom__WEBPACK_IMPORTED_MODULE_1__.zoom)().scaleExtent([1, 8]).on('zoom', event => {
        svg.select('g').attr('transform', event.transform);
      });
      svg.call(zoomBehavior);
    }
  }, [russiaGeoJson]);
  const width = 1200;
  const height = 600;
  const projection = (0,d3_geo__WEBPACK_IMPORTED_MODULE_6__["default"])().center([65, 57]).scale(500).translate([width / 2, height / 2]);
  const path = (0,d3_geo__WEBPACK_IMPORTED_MODULE_7__["default"])().projection(projection);
  const routeCoordinates = array.length > 0 ? array?.map(cityName => cities.find(city => city.name === cityName)?.coordinates).filter(coords => coords !== undefined) : [];
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "min-h-screen bg-gray-100 p-8 flex flex-col items-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "bg-white rounded-lg shadow-lg p-6 w-[1200px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "border border-gray-300 rounded-lg overflow-hidden flex justify-center w-[1200px]"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("svg", {
    ref: svgRef,
    width: width,
    height: height
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", null, russiaGeoJson && russiaGeoJson.features.map((feature, index) => (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    key: index,
    d: path(feature) || '',
    fill: "#EAEAEC",
    stroke: "#D6D6DA"
  })), showRoute && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("path", {
    d: `M${routeCoordinates?.map(coord => projection(coord).join(',')).join('L')}`,
    fill: "none",
    stroke: "#FF0000",
    strokeWidth: "2"
  }), array?.length > 0 && cities.filter(city => array?.includes(city.name)).map(city => {
    const [x, y] = projection(city.coordinates) || [0, 0];
    return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("g", {
      key: city.name
    }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("circle", {
      cx: x,
      cy: y,
      r: selectedCity?.name === city.name ? 8 : 5,
      fill: array?.includes(city.name) ? "#FF0000" : "#000000",
      stroke: "#FFFFFF",
      strokeWidth: "2"
    }), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("text", {
      x: x,
      y: y - 10,
      textAnchor: "middle",
      fill: "#000000",
      fontSize: "12px"
    }, city.name));
  })))), selectedCity && (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("div", {
    className: "mt-4 text-center"
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "font-semibold text-lg text-blue-700"
  }, "\u0412\u044B\u0431\u0440\u0430\u043D\u043D\u044B\u0439 \u0433\u043E\u0440\u043E\u0434: ", selectedCity.name), (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)("p", {
    className: "text-gray-600"
  }, "\u041A\u043E\u043E\u0440\u0434\u0438\u043D\u0430\u0442\u044B: ", selectedCity.coordinates.join(', ')))));
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Map);

/***/ }),

/***/ "./src/cities.js":
/*!***********************!*\
  !*** ./src/cities.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   citiesAll: () => (/* binding */ citiesAll)
/* harmony export */ });
const citiesAll = [{
  "coordinates": {
    "lat": "52.65",
    "lon": "90.083333333333"
  },
  "district": "Сибирский",
  "name": "Абаза",
  "population": 12272,
  "subject": "Хакасия"
}, {
  "coordinates": {
    "lat": "53.71667",
    "lon": "91.41667"
  },
  "district": "Сибирский",
  "name": "Абакан",
  "population": 184769,
  "subject": "Хакасия"
}, {
  "coordinates": {
    "lat": "53.68333",
    "lon": "53.65"
  },
  "district": "Приволжский",
  "name": "Абдулино",
  "population": 17274,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "44.86667",
    "lon": "38.16667"
  },
  "district": "Южный",
  "name": "Абинск",
  "population": 39511,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "55.9",
    "lon": "53.93333"
  },
  "district": "Приволжский",
  "name": "Агидель",
  "population": 14219,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "56.51667",
    "lon": "52.98333"
  },
  "district": "Приволжский",
  "name": "Агрыз",
  "population": 19991,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "44.884525",
    "lon": "39.19202"
  },
  "district": "Южный",
  "name": "Адыгейск",
  "population": 13175,
  "subject": "Адыгея"
}, {
  "coordinates": {
    "lat": "54.85",
    "lon": "53.06667"
  },
  "district": "Приволжский",
  "name": "Азнакаево",
  "population": 34750,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "47.1",
    "lon": "39.41667"
  },
  "district": "Южный",
  "name": "Азов",
  "population": 81924,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "51.16667",
    "lon": "90.6"
  },
  "district": "Сибирский",
  "name": "Ак-Довурак",
  "population": 12456,
  "subject": "Тыва"
}, {
  "coordinates": {
    "lat": "47.26667",
    "lon": "39.86667"
  },
  "district": "Южный",
  "name": "Аксай",
  "population": 48372,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "43.04167",
    "lon": "44.21056"
  },
  "district": "Северо-Кавказский",
  "name": "Алагир",
  "population": 21550,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "57.85",
    "lon": "61.7"
  },
  "district": "Уральский",
  "name": "Алапаевск",
  "population": 36189,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "54.85",
    "lon": "46.58333"
  },
  "district": "Приволжский",
  "name": "Алатырь",
  "population": 32265,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "58.6",
    "lon": "125.38333"
  },
  "district": "Дальневосточный",
  "name": "Алдан",
  "population": 21590,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "52.5",
    "lon": "82.78333"
  },
  "district": "Сибирский",
  "name": "Алейск",
  "population": 25380,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "56.39361",
    "lon": "38.715"
  },
  "district": "Центральный",
  "name": "Александров",
  "population": 57053,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "50.9",
    "lon": "142.15"
  },
  "district": "Дальневосточный",
  "name": "Александровск-Сахалинский",
  "population": 8854,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "59.16667",
    "lon": "57.58333"
  },
  "district": "Приволжский",
  "name": "Александровск",
  "population": 10780,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "50.63",
    "lon": "38.68639"
  },
  "district": "Центральный",
  "name": "Алексеевка",
  "population": 36578,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "54.5",
    "lon": "37.06667"
  },
  "district": "Центральный",
  "name": "Алексин",
  "population": 60842,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "55.55",
    "lon": "98.66667"
  },
  "district": "Сибирский",
  "name": "Алзамай",
  "population": 5373,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "44.41972",
    "lon": "34.04306"
  },
  "district": "Южный",
  "name": "Алупка",
  "population": 9063,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "44.66722",
    "lon": "34.39778"
  },
  "district": "Южный",
  "name": "Алушта",
  "population": 31364,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "54.9",
    "lon": "52.3"
  },
  "district": "Приволжский",
  "name": "Альметьевск",
  "population": 163512,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "50.21667",
    "lon": "136.9"
  },
  "district": "Дальневосточный",
  "name": "Амурск",
  "population": 38606,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "64.73333",
    "lon": "177.51667"
  },
  "district": "Дальневосточный",
  "name": "Анадырь",
  "population": 13202,
  "subject": "Чукотский АО"
}, {
  "coordinates": {
    "lat": "44.893857",
    "lon": "37.317481"
  },
  "district": "Южный",
  "name": "Анапа",
  "population": 81863,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "52.56667",
    "lon": "103.91667"
  },
  "district": "Сибирский",
  "name": "Ангарск",
  "population": 221296,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "56.65",
    "lon": "32.26667"
  },
  "district": "Центральный",
  "name": "Андреаполь",
  "population": 6956,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "56.08333",
    "lon": "86.03333"
  },
  "district": "Сибирский",
  "name": "Анжеро-Судженск",
  "population": 66583,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "46.71667",
    "lon": "142.51667"
  },
  "district": "Дальневосточный",
  "name": "Анива",
  "population": 9638,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "67.5675",
    "lon": "33.39333"
  },
  "district": "Северо-Западный",
  "name": "Апатиты",
  "population": 49647,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "55.53333",
    "lon": "37.05"
  },
  "district": "Центральный",
  "name": "Апрелевка",
  "population": 35514,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "44.46083",
    "lon": "39.74056"
  },
  "district": "Южный",
  "name": "Апшеронск",
  "population": 40289,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "56.7",
    "lon": "60.83333"
  },
  "district": "Уральский",
  "name": "Арамиль",
  "population": 19013,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "43.292095",
    "lon": "45.876622"
  },
  "district": "Северо-Кавказский",
  "name": "Аргун",
  "population": 41622,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "54.85",
    "lon": "46.23333"
  },
  "district": "Приволжский",
  "name": "Ардатов",
  "population": 8857,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "43.17278",
    "lon": "44.29222"
  },
  "district": "Северо-Кавказский",
  "name": "Ардон",
  "population": 18956,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "55.38333",
    "lon": "43.8"
  },
  "district": "Приволжский",
  "name": "Арзамас",
  "population": 104908,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "51.93333",
    "lon": "43.5"
  },
  "district": "Приволжский",
  "name": "Аркадак",
  "population": 10990,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "44.99464",
    "lon": "41.12946"
  },
  "district": "Южный",
  "name": "Армавир",
  "population": 187177,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "46.10694",
    "lon": "33.69306"
  },
  "district": "Южный",
  "name": "Армянск",
  "population": 20692,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "44.16667",
    "lon": "133.26667"
  },
  "district": "Дальневосточный",
  "name": "Арсеньев",
  "population": 47937,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "56.09056",
    "lon": "49.87639"
  },
  "district": "Приволжский",
  "name": "Арск",
  "population": 20421,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "43.35",
    "lon": "132.18333"
  },
  "district": "Дальневосточный",
  "name": "Артём",
  "population": 109556,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "54.35",
    "lon": "93.43333"
  },
  "district": "Сибирский",
  "name": "Артёмовск",
  "population": 1510,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "57.33639",
    "lon": "61.89194"
  },
  "district": "Уральский",
  "name": "Артёмовский",
  "population": 28943,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "64.55",
    "lon": "40.53333"
  },
  "district": "Северо-Западный",
  "name": "Архангельск",
  "population": 301199,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "57.01027679",
    "lon": "61.45639038"
  },
  "district": "Уральский",
  "name": "Асбест",
  "population": 57317,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "57",
    "lon": "86.15"
  },
  "district": "Сибирский",
  "name": "Асино",
  "population": 24913,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "46.33333",
    "lon": "48.03333"
  },
  "district": "Южный",
  "name": "Астрахань",
  "population": 475629,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "51.86667",
    "lon": "45"
  },
  "district": "Приволжский",
  "name": "Аткарск",
  "population": 22709,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "48.28333",
    "lon": "46.16667"
  },
  "district": "Южный",
  "name": "Ахтубинск",
  "population": 35635,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "56.26667",
    "lon": "90.5"
  },
  "district": "Сибирский",
  "name": "Ачинск",
  "population": 100621,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "43.189155",
    "lon": "45.284741"
  },
  "district": "Северо-Кавказский",
  "name": "Ачхой-Мартан",
  "population": 30739,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "55",
    "lon": "57.25"
  },
  "district": "Уральский",
  "name": "Аша",
  "population": 27890,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "59.38333",
    "lon": "35.95"
  },
  "district": "Северо-Западный",
  "name": "Бабаево",
  "population": 11739,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "51.71667",
    "lon": "105.86667"
  },
  "district": "Сибирский",
  "name": "Бабушкин",
  "population": 4368,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "54.4",
    "lon": "53.25"
  },
  "district": "Приволжский",
  "name": "Бавлы",
  "population": 21628,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "54.38333",
    "lon": "20.63333"
  },
  "district": "Северо-Западный",
  "name": "Багратионовск",
  "population": 6417,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "51.51722",
    "lon": "104.15611"
  },
  "district": "Сибирский",
  "name": "Байкальск",
  "population": 13199,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "52.58333",
    "lon": "58.31667"
  },
  "district": "Приволжский",
  "name": "Баймак",
  "population": 17833,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "54.93333",
    "lon": "58.8"
  },
  "district": "Уральский",
  "name": "Бакал",
  "population": 16345,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "43.683333",
    "lon": "43.533333"
  },
  "district": "Северо-Кавказский",
  "name": "Баксан",
  "population": 39593,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "55.18333",
    "lon": "36.65"
  },
  "district": "Центральный",
  "name": "Балабаново",
  "population": 29029,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "44.5",
    "lon": "33.6"
  },
  "district": "Южный",
  "name": "Балаклава",
  "population": 35919,
  "subject": "Севастополь"
}, {
  "coordinates": {
    "lat": "52.03333",
    "lon": "47.78333"
  },
  "district": "Приволжский",
  "name": "Балаково",
  "population": 184466,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "56.48083",
    "lon": "43.54028"
  },
  "district": "Приволжский",
  "name": "Балахна",
  "population": 48569,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "55.8",
    "lon": "37.93333"
  },
  "district": "Центральный",
  "name": "Балашиха",
  "population": 520962,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.55",
    "lon": "43.16667"
  },
  "district": "Приволжский",
  "name": "Балашов",
  "population": 74057,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "51.57694",
    "lon": "116.64917"
  },
  "district": "Сибирский",
  "name": "Балей",
  "population": 10286,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "54.65",
    "lon": "19.91667"
  },
  "district": "Северо-Западный",
  "name": "Балтийск",
  "population": 26796,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.35",
    "lon": "78.35"
  },
  "district": "Сибирский",
  "name": "Барабинск",
  "population": 27648,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "53.347361",
    "lon": "83.77833"
  },
  "district": "Сибирский",
  "name": "Барнаул",
  "population": 630877,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "53.65",
    "lon": "47.11667"
  },
  "district": "Приволжский",
  "name": "Барыш",
  "population": 14924,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "47.13333",
    "lon": "39.75"
  },
  "district": "Южный",
  "name": "Батайск",
  "population": 126988,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "44.75278",
    "lon": "33.86083"
  },
  "district": "Южный",
  "name": "Бахчисарай",
  "population": 28609,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "57.78333",
    "lon": "36.7"
  },
  "district": "Центральный",
  "name": "Бежецк",
  "population": 21466,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "48.17472",
    "lon": "40.79306"
  },
  "district": "Южный",
  "name": "Белая Калитва",
  "population": 40448,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "58.83333",
    "lon": "50.85"
  },
  "district": "Приволжский",
  "name": "Белая Холуница",
  "population": 9659,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "50.6",
    "lon": "36.6"
  },
  "district": "Центральный",
  "name": "Белгород",
  "population": 339978,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "54.1",
    "lon": "54.13333"
  },
  "district": "Приволжский",
  "name": "Белебей",
  "population": 59195,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "52.96667",
    "lon": "43.41667"
  },
  "district": "Приволжский",
  "name": "Белинский",
  "population": 8656,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "54.416666666667",
    "lon": "86.3"
  },
  "district": "Сибирский",
  "name": "Белово",
  "population": 68542,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "50.91667",
    "lon": "128.48333"
  },
  "district": "Дальневосточный",
  "name": "Белогорск",
  "population": 61440,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "45.05444",
    "lon": "34.60222"
  },
  "district": "Южный",
  "name": "Белогорск",
  "population": 17445,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "60.03333",
    "lon": "37.78333"
  },
  "district": "Северо-Западный",
  "name": "Белозерск",
  "population": 8375,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "52",
    "lon": "84.98333"
  },
  "district": "Сибирский",
  "name": "Белокуриха",
  "population": 14735,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "64.51667",
    "lon": "34.76667"
  },
  "district": "Северо-Западный",
  "name": "Беломорск",
  "population": 7708,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "55.46139",
    "lon": "38.44222"
  },
  "district": "Центральный",
  "name": "Белоозёрский",
  "population": 13737,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.96667",
    "lon": "58.4"
  },
  "district": "Приволжский",
  "name": "Белорецк",
  "population": 64525,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "44.76667",
    "lon": "39.86667"
  },
  "district": "Южный",
  "name": "Белореченск",
  "population": 55870,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "55.09167",
    "lon": "36.66667"
  },
  "district": "Центральный",
  "name": "Белоусово",
  "population": 10946,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "63.71667",
    "lon": "66.66667"
  },
  "district": "Уральский",
  "name": "Белоярский",
  "population": 19994,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "55.83333",
    "lon": "32.93333"
  },
  "district": "Центральный",
  "name": "Белый",
  "population": 3125,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "53.8",
    "lon": "36.13333"
  },
  "district": "Центральный",
  "name": "Белёв",
  "population": 12846,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "54.75",
    "lon": "83.1"
  },
  "district": "Сибирский",
  "name": "Бердск",
  "population": 102850,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "59.40806",
    "lon": "56.80528"
  },
  "district": "Приволжский",
  "name": "Березники",
  "population": 138069,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.66667",
    "lon": "86.25"
  },
  "district": "Сибирский",
  "name": "Берёзовский",
  "population": 44932,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "56.9",
    "lon": "60.8"
  },
  "district": "Уральский",
  "name": "Берёзовский",
  "population": 59698,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "43.18889",
    "lon": "44.521691"
  },
  "district": "Северо-Кавказский",
  "name": "Беслан",
  "population": 35929,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "52.51667",
    "lon": "85.16667"
  },
  "district": "Сибирский",
  "name": "Бийск",
  "population": 183852,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "46.81667",
    "lon": "134.25"
  },
  "district": "Дальневосточный",
  "name": "Бикин",
  "population": 16240,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "68.05",
    "lon": "166.45"
  },
  "district": "Дальневосточный",
  "name": "Билибино",
  "population": 5546,
  "subject": "Чукотский АО"
}, {
  "coordinates": {
    "lat": "48.78333",
    "lon": "132.93333"
  },
  "district": "Дальневосточный",
  "name": "Биробиджан",
  "population": 70064,
  "subject": "Еврейская АО"
}, {
  "coordinates": {
    "lat": "55.41667",
    "lon": "55.53333"
  },
  "district": "Приволжский",
  "name": "Бирск",
  "population": 44295,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "55.95",
    "lon": "97.81667"
  },
  "district": "Сибирский",
  "name": "Бирюсинск",
  "population": 8632,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "50.65",
    "lon": "38.4"
  },
  "district": "Центральный",
  "name": "Бирюч",
  "population": 7114,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "50.25778",
    "lon": "127.53639"
  },
  "district": "Дальневосточный",
  "name": "Благовещенск",
  "population": 241437,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "55.03333",
    "lon": "55.98333"
  },
  "district": "Приволжский",
  "name": "Благовещенск",
  "population": 35481,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "45.1029039",
    "lon": "43.4251513"
  },
  "district": "Северо-Кавказский",
  "name": "Благодарный",
  "population": 30827,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "51.09444",
    "lon": "40.03222"
  },
  "district": "Центральный",
  "name": "Бобров",
  "population": 20871,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "56.78333",
    "lon": "62.05"
  },
  "district": "Уральский",
  "name": "Богданович",
  "population": 30142,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.76667",
    "lon": "38.13333"
  },
  "district": "Центральный",
  "name": "Богородицк",
  "population": 29560,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "56.09972",
    "lon": "43.50722"
  },
  "district": "Приволжский",
  "name": "Богородск",
  "population": 35068,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.2",
    "lon": "89.51667"
  },
  "district": "Сибирский",
  "name": "Боготол",
  "population": 18206,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "49.93333",
    "lon": "40.55"
  },
  "district": "Центральный",
  "name": "Богучар",
  "population": 14370,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "57.85",
    "lon": "114.2"
  },
  "district": "Сибирский",
  "name": "Бодайбо",
  "population": 8921,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "59.473576",
    "lon": "33.847675"
  },
  "district": "Северо-Западный",
  "name": "Бокситогорск",
  "population": 16185,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "54.96667",
    "lon": "49.03333"
  },
  "district": "Приволжский",
  "name": "Болгар",
  "population": 8285,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "57.87083",
    "lon": "34.07361"
  },
  "district": "Центральный",
  "name": "Бологое",
  "population": 20234,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "55.66667",
    "lon": "84.4"
  },
  "district": "Сибирский",
  "name": "Болотное",
  "population": 15644,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "54.08333",
    "lon": "37.81667"
  },
  "district": "Центральный",
  "name": "Болохово",
  "population": 9339,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "53.45",
    "lon": "36"
  },
  "district": "Центральный",
  "name": "Болхов",
  "population": 9495,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "43.11667",
    "lon": "132.35"
  },
  "district": "Дальневосточный",
  "name": "Большой Камень",
  "population": 41825,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "56.36028",
    "lon": "44.05917"
  },
  "district": "Приволжский",
  "name": "Бор",
  "population": 78372,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "50.38333",
    "lon": "116.53333"
  },
  "district": "Сибирский",
  "name": "Борзя",
  "population": 29596,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "51.36667",
    "lon": "42.08333"
  },
  "district": "Центральный",
  "name": "Борисоглебск",
  "population": 60687,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "58.38694",
    "lon": "33.91139"
  },
  "district": "Северо-Западный",
  "name": "Боровичи",
  "population": 47883,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "55.2",
    "lon": "36.48333"
  },
  "district": "Центральный",
  "name": "Боровск",
  "population": 12598,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.9",
    "lon": "94.9"
  },
  "district": "Сибирский",
  "name": "Бородино",
  "population": 15174,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "56.152",
    "lon": "101.633"
  },
  "district": "Сибирский",
  "name": "Братск",
  "population": 224071,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "55.42278",
    "lon": "38.25889"
  },
  "district": "Центральный",
  "name": "Бронницы",
  "population": 21831,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.25",
    "lon": "34.36667"
  },
  "district": "Центральный",
  "name": "Брянск",
  "population": 379152,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "54.53333",
    "lon": "52.78333"
  },
  "district": "Приволжский",
  "name": "Бугульма",
  "population": 81677,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "53.61667",
    "lon": "52.41667"
  },
  "district": "Приволжский",
  "name": "Бугуруслан",
  "population": 43593,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "44.79",
    "lon": "44.14"
  },
  "district": "Северо-Кавказский",
  "name": "Будённовск",
  "population": 58103,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "52.76667",
    "lon": "52.26667"
  },
  "district": "Приволжский",
  "name": "Бузулук",
  "population": 88341,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "54.96667",
    "lon": "48.28333"
  },
  "district": "Приволжский",
  "name": "Буинск",
  "population": 19968,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "58.48333",
    "lon": "41.51667"
  },
  "district": "Центральный",
  "name": "Буй",
  "population": 20564,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "42.81667",
    "lon": "47.11667"
  },
  "district": "Северо-Кавказский",
  "name": "Буйнакск",
  "population": 68121,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "50.825",
    "lon": "40.58889"
  },
  "district": "Центральный",
  "name": "Бутурлиновка",
  "population": 24397,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "57.96667",
    "lon": "33.25"
  },
  "district": "Северо-Западный",
  "name": "Валдай",
  "population": 14074,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "50.18333",
    "lon": "38.11667"
  },
  "district": "Центральный",
  "name": "Валуйки",
  "population": 33032,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "55.6",
    "lon": "31.2"
  },
  "district": "Центральный",
  "name": "Велиж",
  "population": 6293,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "56.35",
    "lon": "30.51667"
  },
  "district": "Северо-Западный",
  "name": "Великие Луки",
  "population": 86711,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "58.525",
    "lon": "31.275"
  },
  "district": "Северо-Западный",
  "name": "Великий Новгород",
  "population": 224286,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "60.75889",
    "lon": "46.30389"
  },
  "district": "Северо-Западный",
  "name": "Великий Устюг",
  "population": 28670,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "61.06667",
    "lon": "42.1"
  },
  "district": "Северо-Западный",
  "name": "Вельск",
  "population": 21613,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "54.35",
    "lon": "38.26667"
  },
  "district": "Центральный",
  "name": "Венёв",
  "population": 12668,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "58.06667",
    "lon": "54.65"
  },
  "district": "Приволжский",
  "name": "Верещагино",
  "population": 22239,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.33333",
    "lon": "36.18333"
  },
  "district": "Центральный",
  "name": "Верея",
  "population": 4906,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.88333",
    "lon": "59.21667"
  },
  "district": "Уральский",
  "name": "Верхнеуральск",
  "population": 8929,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "57.38333",
    "lon": "59.93333"
  },
  "district": "Уральский",
  "name": "Верхний Тагил",
  "population": 10113,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "56.05",
    "lon": "60.23333"
  },
  "district": "Уральский",
  "name": "Верхний Уфалей",
  "population": 22981,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "56.966666666667",
    "lon": "60.583333333333"
  },
  "district": "Уральский",
  "name": "Верхняя Пышма",
  "population": 71335,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.05",
    "lon": "60.55"
  },
  "district": "Уральский",
  "name": "Верхняя Салда",
  "population": 41034,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.3574333",
    "lon": "59.8224444"
  },
  "district": "Уральский",
  "name": "Верхняя Тура",
  "population": 8554,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.86667",
    "lon": "60.8"
  },
  "district": "Уральский",
  "name": "Верхотурье",
  "population": 6706,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "67.55",
    "lon": "133.38333"
  },
  "district": "Дальневосточный",
  "name": "Верхоянск",
  "population": 828,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "58.65",
    "lon": "37.26667"
  },
  "district": "Центральный",
  "name": "Весьегонск",
  "population": 6330,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "57.85556",
    "lon": "45.78111"
  },
  "district": "Приволжский",
  "name": "Ветлуга",
  "population": 7681,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "55.55",
    "lon": "37.7"
  },
  "district": "Центральный",
  "name": "Видное",
  "population": 101490,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "63.75",
    "lon": "121.61667"
  },
  "district": "Дальневосточный",
  "name": "Вилюйск",
  "population": 10032,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "52.93333",
    "lon": "158.4"
  },
  "district": "Дальневосточный",
  "name": "Вилючинск",
  "population": 21774,
  "subject": "Камчатский край"
}, {
  "coordinates": {
    "lat": "56.11667",
    "lon": "101.16667"
  },
  "district": "Сибирский",
  "name": "Вихоревка",
  "population": 21719,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "57.2",
    "lon": "41.91667"
  },
  "district": "Центральный",
  "name": "Вичуга",
  "population": 30694,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "43.116666666667",
    "lon": "131.9"
  },
  "district": "Дальневосточный",
  "name": "Владивосток",
  "population": 603519,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "43.01667",
    "lon": "44.683315"
  },
  "district": "Северо-Кавказский",
  "name": "Владикавказ",
  "population": 295830,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "56.13333",
    "lon": "40.41667"
  },
  "district": "Центральный",
  "name": "Владимир",
  "population": 349951,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "48.71167",
    "lon": "44.51389"
  },
  "district": "Южный",
  "name": "Волгоград",
  "population": 1028036,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "47.54",
    "lon": "42.20722"
  },
  "district": "Южный",
  "name": "Волгодонск",
  "population": 168048,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "57.43333",
    "lon": "41.16667"
  },
  "district": "Центральный",
  "name": "Волгореченск",
  "population": 14355,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "55.86667",
    "lon": "48.35"
  },
  "district": "Приволжский",
  "name": "Волжск",
  "population": 53013,
  "subject": "Марий Эл"
}, {
  "coordinates": {
    "lat": "48.783333333333",
    "lon": "44.766666666667"
  },
  "district": "Южный",
  "name": "Волжский",
  "population": 321479,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "59.216666666667",
    "lon": "39.9"
  },
  "district": "Северо-Западный",
  "name": "Вологда",
  "population": 313944,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "56.23333",
    "lon": "43.2"
  },
  "district": "Приволжский",
  "name": "Володарск",
  "population": 9705,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.03333",
    "lon": "35.95"
  },
  "district": "Центральный",
  "name": "Волоколамск",
  "population": 26389,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "59.447275",
    "lon": "29.484819"
  },
  "district": "Северо-Западный",
  "name": "Волосово",
  "population": 11931,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.900543",
    "lon": "32.352681"
  },
  "district": "Северо-Западный",
  "name": "Волхов",
  "population": 38511,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.93333",
    "lon": "60.05"
  },
  "district": "Уральский",
  "name": "Волчанск",
  "population": 8573,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "52.05",
    "lon": "47.38333"
  },
  "district": "Приволжский",
  "name": "Вольск",
  "population": 55035,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "67.5",
    "lon": "64.03333"
  },
  "district": "Северо-Западный",
  "name": "Воркута",
  "population": 56985,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "51.67167",
    "lon": "39.21056"
  },
  "district": "Центральный",
  "name": "Воронеж",
  "population": 1057681,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "55.98333",
    "lon": "43.26667"
  },
  "district": "Приволжский",
  "name": "Ворсма",
  "population": 10162,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "55.32333",
    "lon": "38.68056"
  },
  "district": "Центральный",
  "name": "Воскресенск",
  "population": 95495,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.05",
    "lon": "54"
  },
  "district": "Приволжский",
  "name": "Воткинск",
  "population": 97471,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "60.021321",
    "lon": "30.654084"
  },
  "district": "Северо-Западный",
  "name": "Всеволожск",
  "population": 79038,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "63.86667",
    "lon": "57.31667"
  },
  "district": "Северо-Западный",
  "name": "Вуктыл",
  "population": 9322,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "60.710496",
    "lon": "28.749781"
  },
  "district": "Северо-Западный",
  "name": "Выборг",
  "population": 72530,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "55.31944",
    "lon": "42.17306"
  },
  "district": "Приволжский",
  "name": "Выкса",
  "population": 45240,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.31667",
    "lon": "36.55"
  },
  "district": "Центральный",
  "name": "Высоковск",
  "population": 13081,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "60.625604",
    "lon": "28.568277"
  },
  "district": "Северо-Западный",
  "name": "Высоцк",
  "population": 1129,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "61",
    "lon": "36.45"
  },
  "district": "Северо-Западный",
  "name": "Вытегра",
  "population": 10386,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "57.58333",
    "lon": "34.56667"
  },
  "district": "Центральный",
  "name": "Вышний Волочёк",
  "population": 45830,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "47.53333",
    "lon": "134.75"
  },
  "district": "Дальневосточный",
  "name": "Вяземский",
  "population": 12775,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "56.24333",
    "lon": "42.12917"
  },
  "district": "Центральный",
  "name": "Вязники",
  "population": 36203,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "55.21028",
    "lon": "34.285"
  },
  "district": "Центральный",
  "name": "Вязьма",
  "population": 51950,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "56.218417",
    "lon": "51.068583"
  },
  "district": "Приволжский",
  "name": "Вятские Поляны",
  "population": 29742,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "56.56667",
    "lon": "40.11667"
  },
  "district": "Центральный",
  "name": "Гаврилов Посад",
  "population": 5429,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "57.3",
    "lon": "39.85"
  },
  "district": "Центральный",
  "name": "Гаврилов-Ям",
  "population": 16084,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "55.55",
    "lon": "35"
  },
  "district": "Центральный",
  "name": "Гагарин",
  "population": 26500,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "69.25528",
    "lon": "33.31667"
  },
  "district": "Северо-Западный",
  "name": "Гаджиево",
  "population": 9297,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "51.46667",
    "lon": "58.45"
  },
  "district": "Приволжский",
  "name": "Гай",
  "population": 33280,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "58.38333",
    "lon": "42.35"
  },
  "district": "Центральный",
  "name": "Галич",
  "population": 12856,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "59.56841",
    "lon": "30.122892"
  },
  "district": "Северо-Западный",
  "name": "Гатчина",
  "population": 94377,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "54.65",
    "lon": "21.06667"
  },
  "district": "Северо-Западный",
  "name": "Гвардейск",
  "population": 14122,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "58.73333",
    "lon": "27.81667"
  },
  "district": "Северо-Западный",
  "name": "Гдов",
  "population": 3455,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "44.560999",
    "lon": "38.076949"
  },
  "district": "Южный",
  "name": "Геленджик",
  "population": 80204,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "44.15",
    "lon": "43.46667"
  },
  "district": "Северо-Кавказский",
  "name": "Георгиевск",
  "population": 63221,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "58.14083",
    "lon": "52.67417"
  },
  "district": "Приволжский",
  "name": "Глазов",
  "population": 87762,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "55.61472",
    "lon": "36.98722"
  },
  "district": "Центральный",
  "name": "Голицыно",
  "population": 22733,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.13333",
    "lon": "43.06667"
  },
  "district": "Приволжский",
  "name": "Горбатов",
  "population": 2009,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "51.96",
    "lon": "85.96"
  },
  "district": "Сибирский",
  "name": "Горно-Алтайск",
  "population": 65342,
  "subject": "Алтай"
}, {
  "coordinates": {
    "lat": "58.38333",
    "lon": "58.31667"
  },
  "district": "Приволжский",
  "name": "Горнозаводск",
  "population": 11073,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "50.993028",
    "lon": "81.467934"
  },
  "district": "Сибирский",
  "name": "Горняк",
  "population": 10112,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "56.65028",
    "lon": "43.47028"
  },
  "district": "Приволжский",
  "name": "Городец",
  "population": 28660,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "53.26667",
    "lon": "45.7"
  },
  "district": "Приволжский",
  "name": "Городище",
  "population": 7796,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "46.08333",
    "lon": "41.93333"
  },
  "district": "Южный",
  "name": "Городовиковск",
  "population": 8285,
  "subject": "Калмыкия"
}, {
  "coordinates": {
    "lat": "56.20278",
    "lon": "42.6925"
  },
  "district": "Центральный",
  "name": "Гороховец",
  "population": 12666,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "44.633284",
    "lon": "39.133287"
  },
  "district": "Южный",
  "name": "Горячий Ключ",
  "population": 40903,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "50.48333",
    "lon": "35.66667"
  },
  "district": "Центральный",
  "name": "Грайворон",
  "population": 6179,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "58.56667",
    "lon": "57.83333"
  },
  "district": "Приволжский",
  "name": "Гремячинск",
  "population": 8360,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "43.31667",
    "lon": "45.7"
  },
  "district": "Северо-Кавказский",
  "name": "Грозный",
  "population": 328533,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "52.5",
    "lon": "39.93333"
  },
  "district": "Центральный",
  "name": "Грязи",
  "population": 43908,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "58.88333",
    "lon": "40.25"
  },
  "district": "Северо-Западный",
  "name": "Грязовец",
  "population": 14505,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "58.86667",
    "lon": "57.58333"
  },
  "district": "Приволжский",
  "name": "Губаха",
  "population": 23397,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "51.28333",
    "lon": "37.55"
  },
  "district": "Центральный",
  "name": "Губкин",
  "population": 85225,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "64.43333",
    "lon": "76.5"
  },
  "district": "Уральский",
  "name": "Губкинский",
  "population": 33273,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "43.34861",
    "lon": "46.09611"
  },
  "district": "Северо-Кавказский",
  "name": "Гудермес",
  "population": 64376,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "48.05",
    "lon": "39.93333"
  },
  "district": "Южный",
  "name": "Гуково",
  "population": 60361,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "45.36028",
    "lon": "40.69444"
  },
  "district": "Южный",
  "name": "Гулькевичи",
  "population": 33357,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "54.76667",
    "lon": "20.6"
  },
  "district": "Северо-Западный",
  "name": "Гурьевск",
  "population": 26760,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "54.28333",
    "lon": "85.93333"
  },
  "district": "Сибирский",
  "name": "Гурьевск",
  "population": 22134,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "54.58333",
    "lon": "22.2"
  },
  "district": "Северо-Западный",
  "name": "Гусев",
  "population": 29234,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "51.28556",
    "lon": "106.52917"
  },
  "district": "Сибирский",
  "name": "Гусиноозёрск",
  "population": 24451,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "55.61667",
    "lon": "40.65"
  },
  "district": "Центральный",
  "name": "Гусь-Хрустальный",
  "population": 51552,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "54.21667",
    "lon": "55.03333"
  },
  "district": "Приволжский",
  "name": "Давлеканово",
  "population": 21834,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "42.11667",
    "lon": "48.2"
  },
  "district": "Северо-Кавказский",
  "name": "Дагестанские Огни",
  "population": 31412,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "56.26667",
    "lon": "62.91667"
  },
  "district": "Уральский",
  "name": "Далматово",
  "population": 11584,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "44.56667",
    "lon": "135.61667"
  },
  "district": "Дальневосточный",
  "name": "Дальнегорск",
  "population": 33655,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "45.93333",
    "lon": "133.73333"
  },
  "district": "Дальневосточный",
  "name": "Дальнереченск",
  "population": 23613,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "58.18333",
    "lon": "40.18333"
  },
  "district": "Центральный",
  "name": "Данилов",
  "population": 13677,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "53.25",
    "lon": "39.15"
  },
  "district": "Центральный",
  "name": "Данков",
  "population": 19726,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "56.7",
    "lon": "60.1"
  },
  "district": "Уральский",
  "name": "Дегтярск",
  "population": 15497,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.86667",
    "lon": "37.13333"
  },
  "district": "Центральный",
  "name": "Дедовск",
  "population": 30731,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.26667",
    "lon": "31.51667"
  },
  "district": "Центральный",
  "name": "Демидов",
  "population": 6326,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "42.069825",
    "lon": "48.295025"
  },
  "district": "Северо-Кавказский",
  "name": "Дербент",
  "population": 124953,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "54.1530861",
    "lon": "33.2902917"
  },
  "district": "Центральный",
  "name": "Десногорск",
  "population": 25345,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "45.70861",
    "lon": "34.39333"
  },
  "district": "Южный",
  "name": "Джанкой",
  "population": 37014,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "56.23333",
    "lon": "43.45"
  },
  "district": "Приволжский",
  "name": "Дзержинск",
  "population": 218630,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "55.63333",
    "lon": "37.85"
  },
  "district": "Центральный",
  "name": "Дзержинский",
  "population": 57918,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.95",
    "lon": "92.38333"
  },
  "district": "Сибирский",
  "name": "Дивногорск",
  "population": 27477,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "43.15",
    "lon": "44.15"
  },
  "district": "Северо-Кавказский",
  "name": "Дигора",
  "population": 9922,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "54.23333",
    "lon": "49.58333"
  },
  "district": "Приволжский",
  "name": "Димитровград",
  "population": 110968,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "52.12889",
    "lon": "35.07556"
  },
  "district": "Центральный",
  "name": "Дмитриев",
  "population": 6317,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "56.34667",
    "lon": "37.52167"
  },
  "district": "Центральный",
  "name": "Дмитров",
  "population": 65574,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.505504",
    "lon": "35.141478"
  },
  "district": "Центральный",
  "name": "Дмитровск",
  "population": 5202,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "57.83333",
    "lon": "29.96667"
  },
  "district": "Северо-Западный",
  "name": "Дно",
  "population": 7850,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "58.45",
    "lon": "56.41667"
  },
  "district": "Приволжский",
  "name": "Добрянка",
  "population": 28782,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.93333",
    "lon": "37.5"
  },
  "district": "Центральный",
  "name": "Долгопрудный",
  "population": 120907,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "47.31667",
    "lon": "142.8"
  },
  "district": "Дальневосточный",
  "name": "Долинск",
  "population": 11740,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "55.44389",
    "lon": "37.75806"
  },
  "district": "Центральный",
  "name": "Домодедово",
  "population": 152404,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "48.33694",
    "lon": "39.945"
  },
  "district": "Южный",
  "name": "Донецк",
  "population": 46623,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "53.96667",
    "lon": "38.31667"
  },
  "district": "Центральный",
  "name": "Донской",
  "population": 63837,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "54.92",
    "lon": "33.307777777778"
  },
  "district": "Центральный",
  "name": "Дорогобуж",
  "population": 9528,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "55.74444",
    "lon": "38.84944"
  },
  "district": "Центральный",
  "name": "Дрезна",
  "population": 12295,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.75",
    "lon": "37.15"
  },
  "district": "Центральный",
  "name": "Дубна",
  "population": 74183,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "49.05",
    "lon": "44.83333"
  },
  "district": "Южный",
  "name": "Дубовка",
  "population": 14779,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "69.4",
    "lon": "86.18333"
  },
  "district": "Сибирский",
  "name": "Дудинка",
  "population": 19556,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "55.2",
    "lon": "32.41667"
  },
  "district": "Центральный",
  "name": "Духовщина",
  "population": 3990,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "55.48333",
    "lon": "54.86667"
  },
  "district": "Приволжский",
  "name": "Дюртюли",
  "population": 31185,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "53.6",
    "lon": "34.33333"
  },
  "district": "Центральный",
  "name": "Дятьково",
  "population": 25255,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "45.2",
    "lon": "33.35833"
  },
  "district": "Южный",
  "name": "Евпатория",
  "population": 107877,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "55.38333",
    "lon": "39.03361"
  },
  "district": "Центральный",
  "name": "Егорьевск",
  "population": 71686,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "46.71056",
    "lon": "38.27778"
  },
  "district": "Южный",
  "name": "Ейск",
  "population": 82943,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "56.83333",
    "lon": "60.58333"
  },
  "district": "Уральский",
  "name": "Екатеринбург",
  "population": 1544376,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.76667",
    "lon": "52.03333"
  },
  "district": "Приволжский",
  "name": "Елабуга",
  "population": 73630,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "52.61667",
    "lon": "38.46667"
  },
  "district": "Центральный",
  "name": "Елец",
  "population": 99875,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "53.18333",
    "lon": "158.38333"
  },
  "district": "Дальневосточный",
  "name": "Елизово",
  "population": 36240,
  "subject": "Камчатский край"
}, {
  "coordinates": {
    "lat": "54.56667",
    "lon": "33.16667"
  },
  "district": "Центральный",
  "name": "Ельня",
  "population": 8332,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "54.75",
    "lon": "61.31667"
  },
  "district": "Уральский",
  "name": "Еманжелинск",
  "population": 27632,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "62.58333",
    "lon": "50.85"
  },
  "district": "Северо-Западный",
  "name": "Емва",
  "population": 10994,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "58.46667",
    "lon": "92.13333"
  },
  "district": "Сибирский",
  "name": "Енисейск",
  "population": 17537,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "55.20556",
    "lon": "36.57"
  },
  "district": "Центральный",
  "name": "Ермолино",
  "population": 10809,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "51.35",
    "lon": "48.28333"
  },
  "district": "Приволжский",
  "name": "Ершов",
  "population": 18095,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "44.04306",
    "lon": "42.86417"
  },
  "district": "Северо-Кавказский",
  "name": "Ессентуки",
  "population": 119658,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "53.149167",
    "lon": "38.082585"
  },
  "district": "Центральный",
  "name": "Ефремов",
  "population": 36545,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "44.13333",
    "lon": "43.03333"
  },
  "district": "Северо-Кавказский",
  "name": "Железноводск",
  "population": 22863,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "56.58333",
    "lon": "104.11667"
  },
  "district": "Сибирский",
  "name": "Железногорск-Илимский",
  "population": 21621,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "56.25",
    "lon": "93.53333"
  },
  "district": "Сибирский",
  "name": "Железногорск",
  "population": 82723,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "52.339174",
    "lon": "35.351582"
  },
  "district": "Центральный",
  "name": "Железногорск",
  "population": 97038,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "51.83333",
    "lon": "41.46667"
  },
  "district": "Центральный",
  "name": "Жердевка",
  "population": 13883,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "53.4",
    "lon": "49.5"
  },
  "district": "Приволжский",
  "name": "Жигулёвск",
  "population": 50466,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "53.75028",
    "lon": "34.73611"
  },
  "district": "Центральный",
  "name": "Жиздра",
  "population": 5545,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "50.98028",
    "lon": "44.78083"
  },
  "district": "Южный",
  "name": "Жирновск",
  "population": 15555,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "55.03333",
    "lon": "36.75"
  },
  "district": "Центральный",
  "name": "Жуков",
  "population": 16224,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "53.53333",
    "lon": "33.73333"
  },
  "district": "Центральный",
  "name": "Жуковка",
  "population": 17628,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "55.60111",
    "lon": "38.11611"
  },
  "district": "Центральный",
  "name": "Жуковский",
  "population": 111222,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "50.11667",
    "lon": "129.43333"
  },
  "district": "Дальневосточный",
  "name": "Завитинск",
  "population": 9615,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "56.5",
    "lon": "66.55"
  },
  "district": "Уральский",
  "name": "Заводоуковск",
  "population": 27100,
  "subject": "Тюменская область"
}, {
  "coordinates": {
    "lat": "57.48333",
    "lon": "42.13333"
  },
  "district": "Центральный",
  "name": "Заволжск",
  "population": 8896,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "56.6425",
    "lon": "43.39278"
  },
  "district": "Приволжский",
  "name": "Заволжье",
  "population": 36763,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "52.38333",
    "lon": "38.91667"
  },
  "district": "Центральный",
  "name": "Задонск",
  "population": 9887,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "55.3",
    "lon": "52.01667"
  },
  "district": "Приволжский",
  "name": "Заинск",
  "population": 39739,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "50.38333",
    "lon": "103.28333"
  },
  "district": "Сибирский",
  "name": "Закаменск",
  "population": 11365,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "55.96667",
    "lon": "94.7"
  },
  "district": "Сибирский",
  "name": "Заозёрный",
  "population": 10573,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "69.4",
    "lon": "32.45"
  },
  "district": "Северо-Западный",
  "name": "Заозёрск",
  "population": 7762,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "56.26667",
    "lon": "32.08333"
  },
  "district": "Центральный",
  "name": "Западная Двина",
  "population": 7869,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "69.41667",
    "lon": "30.8"
  },
  "district": "Северо-Западный",
  "name": "Заполярный",
  "population": 14791,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "54.76528",
    "lon": "38.88361"
  },
  "district": "Центральный",
  "name": "Зарайск",
  "population": 20736,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.2",
    "lon": "45.16667"
  },
  "district": "Приволжский",
  "name": "Заречный",
  "population": 58510,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "56.81667",
    "lon": "61.31667"
  },
  "district": "Уральский",
  "name": "Заречный",
  "population": 28112,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.7",
    "lon": "84.91667"
  },
  "district": "Сибирский",
  "name": "Заринск",
  "population": 41272,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "55.96667",
    "lon": "48.01667"
  },
  "district": "Приволжский",
  "name": "Звенигово",
  "population": 10994,
  "subject": "Марий Эл"
}, {
  "coordinates": {
    "lat": "55.73333",
    "lon": "36.85"
  },
  "district": "Центральный",
  "name": "Звенигород",
  "population": 35842,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "48.01667",
    "lon": "40.11667"
  },
  "district": "Южный",
  "name": "Зверево",
  "population": 19353,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "56.1",
    "lon": "94.58333"
  },
  "district": "Сибирский",
  "name": "Зеленогорск",
  "population": 54279,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "60.2",
    "lon": "29.7"
  },
  "district": "Северо-Западный",
  "name": "Зеленогорск",
  "population": 15613,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "55.997917",
    "lon": "37.190417"
  },
  "district": "Центральный",
  "name": "Зеленоград",
  "population": 256775,
  "subject": "Москва"
}, {
  "coordinates": {
    "lat": "54.95",
    "lon": "20.48333"
  },
  "district": "Северо-Западный",
  "name": "Зеленоградск",
  "population": 16625,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.85",
    "lon": "48.51667"
  },
  "district": "Приволжский",
  "name": "Зеленодольск",
  "population": 99137,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "44.4070115",
    "lon": "43.8731235"
  },
  "district": "Северо-Кавказский",
  "name": "Зеленокумск",
  "population": 33187,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "46.846525",
    "lon": "40.3040333"
  },
  "district": "Южный",
  "name": "Зерноград",
  "population": 24076,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "53.73333",
    "lon": "127.25"
  },
  "district": "Дальневосточный",
  "name": "Зея",
  "population": 19414,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "53.91667",
    "lon": "102.05"
  },
  "district": "Сибирский",
  "name": "Зима",
  "population": 30640,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "55.16667",
    "lon": "59.66667"
  },
  "district": "Уральский",
  "name": "Златоуст",
  "population": 161774,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "52.43333",
    "lon": "31.73333"
  },
  "district": "Центральный",
  "name": "Злынка",
  "population": 5270,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "51.16667",
    "lon": "82.16667"
  },
  "district": "Сибирский",
  "name": "Змеиногорск",
  "population": 9410,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "48.58333",
    "lon": "45.75"
  },
  "district": "Южный",
  "name": "Знаменск",
  "population": 24628,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "56.16667",
    "lon": "34.58333"
  },
  "district": "Центральный",
  "name": "Зубцов",
  "population": 6217,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "58.403333",
    "lon": "51.130361"
  },
  "district": "Приволжский",
  "name": "Зуевка",
  "population": 9767,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "59.37649",
    "lon": "28.219712"
  },
  "district": "Северо-Западный",
  "name": "Ивангород",
  "population": 9861,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "56.99667",
    "lon": "40.98194"
  },
  "district": "Центральный",
  "name": "Иваново",
  "population": 361644,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "55.97",
    "lon": "37.92"
  },
  "district": "Центральный",
  "name": "Ивантеевка",
  "population": 82827,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "60.68333",
    "lon": "60.43333"
  },
  "district": "Уральский",
  "name": "Ивдель",
  "population": 14306,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "67.46667",
    "lon": "86.56667"
  },
  "district": "Сибирский",
  "name": "Игарка",
  "population": 3634,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "56.85306",
    "lon": "53.21222"
  },
  "district": "Приволжский",
  "name": "Ижевск",
  "population": 623472,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "42.56667",
    "lon": "47.86667"
  },
  "district": "Северо-Кавказский",
  "name": "Избербаш",
  "population": 55996,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "45.36667",
    "lon": "41.71667"
  },
  "district": "Северо-Кавказский",
  "name": "Изобильный",
  "population": 38614,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "56.23333",
    "lon": "96.06667"
  },
  "district": "Сибирский",
  "name": "Иланский",
  "population": 15945,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "53.85",
    "lon": "46.35"
  },
  "district": "Приволжский",
  "name": "Инза",
  "population": 16293,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "44.61417",
    "lon": "33.60833"
  },
  "district": "Южный",
  "name": "Инкерман",
  "population": 13858,
  "subject": "Севастополь"
}, {
  "coordinates": {
    "lat": "55.763633",
    "lon": "48.736553"
  },
  "district": "Приволжский",
  "name": "Иннополис",
  "population": 3955,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "53.86667",
    "lon": "44.36667"
  },
  "district": "Приволжский",
  "name": "Инсар",
  "population": 7920,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "66.0398139",
    "lon": "60.1315194"
  },
  "district": "Северо-Западный",
  "name": "Инта",
  "population": 20271,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "55.91667",
    "lon": "32.08333"
  },
  "district": "Холм-Жирковский",
  "name": "Холм-Жирковский",
  "population": 26122,
  "subject": "Холм-Жирковский"
}, {
  "coordinates": {
    "lat": "45.71667",
    "lon": "42.9"
  },
  "district": "Северо-Кавказский",
  "name": "Ипатово",
  "population": 26122,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "57.66667",
    "lon": "63.06667"
  },
  "district": "Уральский",
  "name": "Ирбит",
  "population": 37009,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "52.28333",
    "lon": "104.3"
  },
  "district": "Сибирский",
  "name": "Иркутск",
  "population": 617264,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "54.90889",
    "lon": "71.26056"
  },
  "district": "Сибирский",
  "name": "Исилькуль",
  "population": 20515,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "54.63333",
    "lon": "83.3"
  },
  "district": "Сибирский",
  "name": "Искитим",
  "population": 57147,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "55.91667",
    "lon": "36.86667"
  },
  "district": "Центральный",
  "name": "Истра",
  "population": 37474,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.11667",
    "lon": "69.5"
  },
  "district": "Уральский",
  "name": "Ишим",
  "population": 67614,
  "subject": "Тюменская область"
}, {
  "coordinates": {
    "lat": "53.45444",
    "lon": "56.04389"
  },
  "district": "Приволжский",
  "name": "Ишимбай",
  "population": 64041,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "56.632777777778",
    "lon": "47.895833333333"
  },
  "district": "Приволжский",
  "name": "Йошкар-Ола",
  "population": 281248,
  "subject": "Марий Эл"
}, {
  "coordinates": {
    "lat": "59.5",
    "lon": "40.33333"
  },
  "district": "Северо-Западный",
  "name": "Кадников",
  "population": 4106,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "55.79083",
    "lon": "49.11444"
  },
  "district": "Приволжский",
  "name": "Казань",
  "population": 1308660,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "48.68333",
    "lon": "43.53333"
  },
  "district": "Южный",
  "name": "Калач-на-Дону",
  "population": 24277,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "55.9204",
    "lon": "37.9929"
  },
  "district": "Южный",
  "name": "Щелково",
  "population": 24277,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "50.42583",
    "lon": "41.01556"
  },
  "district": "Центральный",
  "name": "Калач",
  "population": 17624,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "55.05",
    "lon": "74.58333"
  },
  "district": "Сибирский",
  "name": "Калачинск",
  "population": 21378,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "54.71667",
    "lon": "20.5"
  },
  "district": "Северо-Западный",
  "name": "Калининград",
  "population": 490449,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "51.5",
    "lon": "44.45"
  },
  "district": "Приволжский",
  "name": "Калининск",
  "population": 14949,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "53.51667",
    "lon": "87.26667"
  },
  "district": "Сибирский",
  "name": "Калтан",
  "population": 21752,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "54.53333",
    "lon": "36.26667"
  },
  "district": "Центральный",
  "name": "Калуга",
  "population": 337058,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "57.23333",
    "lon": "37.85"
  },
  "district": "Центральный",
  "name": "Калязин",
  "population": 12621,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "56.26667",
    "lon": "54.2"
  },
  "district": "Приволжский",
  "name": "Камбарка",
  "population": 10080,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "53.18333",
    "lon": "44.05"
  },
  "district": "Приволжский",
  "name": "Каменка",
  "population": 33491,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "60.95081",
    "lon": "29.130882"
  },
  "district": "Северо-Западный",
  "name": "Каменногорск",
  "population": 7160,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "56.4",
    "lon": "61.93333"
  },
  "district": "Уральский",
  "name": "Каменск-Уральский",
  "population": 164192,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "48.31667",
    "lon": "40.26667"
  },
  "district": "Южный",
  "name": "Каменск-Шахтинский",
  "population": 86365,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "53.79194",
    "lon": "81.34861"
  },
  "district": "Сибирский",
  "name": "Камень-на-Оби",
  "population": 32385,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "56.34917",
    "lon": "40.99778"
  },
  "district": "Центральный",
  "name": "Камешково",
  "population": 12028,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "46.11556",
    "lon": "48.07694"
  },
  "district": "Южный",
  "name": "Камызяк",
  "population": 16154,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "50.08333",
    "lon": "45.4"
  },
  "district": "Южный",
  "name": "Камышин",
  "population": 107927,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "56.85",
    "lon": "62.71667"
  },
  "district": "Уральский",
  "name": "Камышлов",
  "population": 27117,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.50694",
    "lon": "47.49139"
  },
  "district": "Приволжский",
  "name": "Канаш",
  "population": 44354,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "67.15694",
    "lon": "32.41167"
  },
  "district": "Северо-Западный",
  "name": "Кандалакша",
  "population": 29138,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "56.2",
    "lon": "95.7"
  },
  "district": "Сибирский",
  "name": "Канск",
  "population": 86816,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "56.30889",
    "lon": "38.70139"
  },
  "district": "Центральный",
  "name": "Карабаново",
  "population": 13150,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "55.48333",
    "lon": "60.2"
  },
  "district": "Уральский",
  "name": "Карабаш",
  "population": 10514,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "43.306285",
    "lon": "44.909763"
  },
  "district": "Северо-Кавказский",
  "name": "Карабулак",
  "population": 43037,
  "subject": "Ингушетия"
}, {
  "coordinates": {
    "lat": "53.73333",
    "lon": "78.03333"
  },
  "district": "Сибирский",
  "name": "Карасук",
  "population": 24890,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "43.769713",
    "lon": "41.911369"
  },
  "district": "Северо-Кавказский",
  "name": "Карачаевск",
  "population": 23867,
  "subject": "Карачаево-Черкесия"
}, {
  "coordinates": {
    "lat": "53.11667",
    "lon": "34.98333"
  },
  "district": "Центральный",
  "name": "Карачев",
  "population": 17449,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "55.2",
    "lon": "80.28333"
  },
  "district": "Сибирский",
  "name": "Каргат",
  "population": 8316,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "61.5",
    "lon": "38.93333"
  },
  "district": "Северо-Западный",
  "name": "Каргополь",
  "population": 8849,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "59.76667",
    "lon": "60"
  },
  "district": "Уральский",
  "name": "Карпинск",
  "population": 25879,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.05",
    "lon": "60.65"
  },
  "district": "Уральский",
  "name": "Карталы",
  "population": 27103,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "54.95",
    "lon": "41.39722"
  },
  "district": "Центральный",
  "name": "Касимов",
  "population": 28443,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "55.88333",
    "lon": "60.75"
  },
  "district": "Уральский",
  "name": "Касли",
  "population": 15383,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "42.88333",
    "lon": "47.63333"
  },
  "district": "Северо-Кавказский",
  "name": "Каспийск",
  "population": 121140,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "54.75",
    "lon": "58.2"
  },
  "district": "Уральский",
  "name": "Катав-Ивановск",
  "population": 14663,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "56.3",
    "lon": "62.56667"
  },
  "district": "Уральский",
  "name": "Катайск",
  "population": 11881,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "58.7",
    "lon": "59.48333"
  },
  "district": "Уральский",
  "name": "Качканар",
  "population": 37307,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "57.35",
    "lon": "37.61667"
  },
  "district": "Центральный",
  "name": "Кашин",
  "population": 14113,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "54.83333",
    "lon": "38.15"
  },
  "district": "Центральный",
  "name": "Кашира",
  "population": 45922,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.56667",
    "lon": "79.56667"
  },
  "district": "Сибирский",
  "name": "Кедровый",
  "population": 1818,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "55.35417",
    "lon": "86.08972"
  },
  "district": "Сибирский",
  "name": "Кемерово",
  "population": 557119,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "64.95",
    "lon": "34.6"
  },
  "district": "Северо-Западный",
  "name": "Кемь",
  "population": 10018,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "45.33861",
    "lon": "36.46806"
  },
  "district": "Южный",
  "name": "Керчь",
  "population": 154621,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "59.05",
    "lon": "57.65"
  },
  "district": "Приволжский",
  "name": "Кизел",
  "population": 15619,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "43.2",
    "lon": "46.86667"
  },
  "district": "Северо-Кавказский",
  "name": "Кизилюрт",
  "population": 38335,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "43.850245",
    "lon": "46.71698"
  },
  "district": "Северо-Кавказский",
  "name": "Кизляр",
  "population": 49999,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "53.96667",
    "lon": "38.53333"
  },
  "district": "Центральный",
  "name": "Кимовск",
  "population": 26475,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "56.86667",
    "lon": "37.35"
  },
  "district": "Центральный",
  "name": "Кимры",
  "population": 40875,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "59.378053",
    "lon": "28.601209"
  },
  "district": "Северо-Западный",
  "name": "Кингисепп",
  "population": 49716,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "53.23333",
    "lon": "50.61667"
  },
  "district": "Приволжский",
  "name": "Кинель",
  "population": 36729,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "57.45",
    "lon": "42.15"
  },
  "district": "Центральный",
  "name": "Кинешма",
  "population": 77694,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "53.93333",
    "lon": "37.93333"
  },
  "district": "Центральный",
  "name": "Киреевск",
  "population": 25560,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "57.78333",
    "lon": "108.1"
  },
  "district": "Сибирский",
  "name": "Киренск",
  "population": 10998,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "56.15",
    "lon": "38.86667"
  },
  "district": "Центральный",
  "name": "Киржач",
  "population": 27318,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "59.86667",
    "lon": "38.38333"
  },
  "district": "Северо-Западный",
  "name": "Кириллов",
  "population": 7149,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "59.449695",
    "lon": "32.008716"
  },
  "district": "Северо-Западный",
  "name": "Кириши",
  "population": 51028,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "54.08333",
    "lon": "34.3"
  },
  "district": "Центральный",
  "name": "Киров",
  "population": 28097,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "58.6",
    "lon": "49.65"
  },
  "district": "Приволжский",
  "name": "Киров",
  "population": 468212,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "57.43333",
    "lon": "60.06667"
  },
  "district": "Уральский",
  "name": "Кировград",
  "population": 18698,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.55",
    "lon": "50.01667"
  },
  "district": "Приволжский",
  "name": "Кирово-Чепецк",
  "population": 66651,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "59.87533",
    "lon": "30.981457"
  },
  "district": "Северо-Западный",
  "name": "Кировск",
  "population": 27238,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "67.61417",
    "lon": "33.67167"
  },
  "district": "Северо-Западный",
  "name": "Кировск",
  "population": 24857,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "59.337167",
    "lon": "52.245472"
  },
  "district": "Приволжский",
  "name": "Кирс",
  "population": 8982,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "52.65",
    "lon": "42.73333"
  },
  "district": "Центральный",
  "name": "Кирсанов",
  "population": 16164,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "53.98333",
    "lon": "86.7"
  },
  "district": "Сибирский",
  "name": "Киселёвск",
  "population": 83431,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "43.90333",
    "lon": "42.72444"
  },
  "district": "Северо-Кавказский",
  "name": "Кисловодск",
  "population": 127521,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "56.33389",
    "lon": "36.7125"
  },
  "district": "Центральный",
  "name": "Клин",
  "population": 88511,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.75278",
    "lon": "32.23611"
  },
  "district": "Центральный",
  "name": "Клинцы",
  "population": 63059,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "55.81667",
    "lon": "45.03333"
  },
  "district": "Приволжский",
  "name": "Княгинино",
  "population": 6447,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "67.55944",
    "lon": "30.46667"
  },
  "district": "Северо-Западный",
  "name": "Ковдор",
  "population": 15770,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "56.36056",
    "lon": "41.31972"
  },
  "district": "Центральный",
  "name": "Ковров",
  "population": 132417,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "54.03333",
    "lon": "43.91667"
  },
  "district": "Приволжский",
  "name": "Ковылкино",
  "population": 19793,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "62.26667",
    "lon": "74.48333"
  },
  "district": "Уральский",
  "name": "Когалым",
  "population": 61441,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "58.6",
    "lon": "99.18333"
  },
  "district": "Сибирский",
  "name": "Кодинск",
  "population": 13324,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "54.03333",
    "lon": "35.78333"
  },
  "district": "Центральный",
  "name": "Козельск",
  "population": 16759,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.83333",
    "lon": "48.25"
  },
  "district": "Приволжский",
  "name": "Козловка",
  "population": 7781,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "56.33333",
    "lon": "46.56667"
  },
  "district": "Приволжский",
  "name": "Козьмодемьянск",
  "population": 19731,
  "subject": "Марий Эл"
}, {
  "coordinates": {
    "lat": "68.88306",
    "lon": "33.02194"
  },
  "district": "Северо-Западный",
  "name": "Кола",
  "population": 9016,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "58.8252278",
    "lon": "44.311444"
  },
  "district": "Центральный",
  "name": "Кологрив",
  "population": 2468,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "55.09389",
    "lon": "38.76806"
  },
  "district": "Центральный",
  "name": "Коломна",
  "population": 134850,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "58.31667",
    "lon": "82.91667"
  },
  "district": "Сибирский",
  "name": "Колпашево",
  "population": 20824,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "59.75",
    "lon": "30.6"
  },
  "district": "Северо-Западный",
  "name": "Колпино",
  "population": 142108,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "59.932919",
    "lon": "30.655377"
  },
  "district": "Северо-Западный",
  "name": "Колтуши",
  "population": 14052,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "56.3",
    "lon": "39.38333"
  },
  "district": "Центральный",
  "name": "Кольчугино",
  "population": 39410,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "59.621609",
    "lon": "30.393483"
  },
  "district": "Северо-Западный",
  "name": "Коммунар",
  "population": 25793,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "50.55",
    "lon": "137"
  },
  "district": "Дальневосточный",
  "name": "Комсомольск-на-Амуре",
  "population": 238505,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "57.03333",
    "lon": "40.38333"
  },
  "district": "Центральный",
  "name": "Комсомольск",
  "population": 8364,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "56.7",
    "lon": "36.76667"
  },
  "district": "Центральный",
  "name": "Конаково",
  "population": 33560,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "62.2",
    "lon": "34.26667"
  },
  "district": "Северо-Западный",
  "name": "Кондопога",
  "population": 25851,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "54.8",
    "lon": "35.93333"
  },
  "district": "Центральный",
  "name": "Кондрово",
  "population": 15734,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "47.58333",
    "lon": "41.1"
  },
  "district": "Южный",
  "name": "Константиновск",
  "population": 17207,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "55.1",
    "lon": "61.61667"
  },
  "district": "Уральский",
  "name": "Копейск",
  "population": 147806,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "53.91667",
    "lon": "40.01667"
  },
  "district": "Центральный",
  "name": "Кораблино",
  "population": 10334,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "45.46667",
    "lon": "39.45"
  },
  "district": "Южный",
  "name": "Кореновск",
  "population": 41826,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "54.88333",
    "lon": "61.4"
  },
  "district": "Уральский",
  "name": "Коркино",
  "population": 37224,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "55.91667",
    "lon": "37.81667"
  },
  "district": "Центральный",
  "name": "Королёв",
  "population": 228095,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "50.81361",
    "lon": "37.18139"
  },
  "district": "Центральный",
  "name": "Короча",
  "population": 5623,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "46.63333",
    "lon": "142.76667"
  },
  "district": "Дальневосточный",
  "name": "Корсаков",
  "population": 33950,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "61.3",
    "lon": "47.16667"
  },
  "district": "Северо-Западный",
  "name": "Коряжма",
  "population": 34523,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "55.93333",
    "lon": "39.63333"
  },
  "district": "Центральный",
  "name": "Костерёво",
  "population": 7113,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "64.58333",
    "lon": "30.6"
  },
  "district": "Северо-Западный",
  "name": "Костомукша",
  "population": 26048,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "57.76667",
    "lon": "40.93333"
  },
  "district": "Центральный",
  "name": "Кострома",
  "population": 267481,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "55.6625",
    "lon": "37.86722"
  },
  "district": "Центральный",
  "name": "Котельники",
  "population": 63728,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "47.63333",
    "lon": "43.13333"
  },
  "district": "Южный",
  "name": "Котельниково",
  "population": 22016,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "58.3",
    "lon": "48.33333"
  },
  "district": "Приволжский",
  "name": "Котельнич",
  "population": 20144,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "61.25",
    "lon": "46.65"
  },
  "district": "Северо-Западный",
  "name": "Котлас",
  "population": 56093,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "50.31667",
    "lon": "44.8"
  },
  "district": "Южный",
  "name": "Котово",
  "population": 21028,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "52.58333",
    "lon": "41.5"
  },
  "district": "Центральный",
  "name": "Котовск",
  "population": 26694,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "56.93333",
    "lon": "41.08333"
  },
  "district": "Центральный",
  "name": "Кохма",
  "population": 30940,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "60.96667",
    "lon": "46.48333"
  },
  "district": "Северо-Западный",
  "name": "Красавино",
  "population": 5601,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "56.12278",
    "lon": "38.14611"
  },
  "district": "Центральный",
  "name": "Красноармейск",
  "population": 26492,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.01667",
    "lon": "45.7"
  },
  "district": "Приволжский",
  "name": "Красноармейск",
  "population": 21350,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "60.4",
    "lon": "57.06667"
  },
  "district": "Приволжский",
  "name": "Красновишерск",
  "population": 14460,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.81667",
    "lon": "37.33333"
  },
  "district": "Центральный",
  "name": "Красногорск",
  "population": 187634,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "45.03333",
    "lon": "38.98333"
  },
  "district": "Южный",
  "name": "Краснодар",
  "population": 1099344,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "59.733745",
    "lon": "30.086205"
  },
  "district": "Северо-Западный",
  "name": "Красное Село",
  "population": 56533,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "56.43806",
    "lon": "38.22944"
  },
  "district": "Центральный",
  "name": "Краснозаводск",
  "population": 14639,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "54.95",
    "lon": "22.5"
  },
  "district": "Северо-Западный",
  "name": "Краснознаменск",
  "population": 3419,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.6",
    "lon": "37.03333"
  },
  "district": "Центральный",
  "name": "Краснознаменск",
  "population": 43868,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "50.1",
    "lon": "118.03333"
  },
  "district": "Сибирский",
  "name": "Краснокаменск",
  "population": 51137,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "58.08333",
    "lon": "55.75"
  },
  "district": "Приволжский",
  "name": "Краснокамск",
  "population": 48778,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "45.955306",
    "lon": "33.795"
  },
  "district": "Южный",
  "name": "Красноперекопск",
  "population": 25569,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "48.7",
    "lon": "44.566666666667"
  },
  "district": "Южный",
  "name": "Краснослободск",
  "population": 16545,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "54.43333",
    "lon": "43.78333"
  },
  "district": "Приволжский",
  "name": "Краснослободск",
  "population": 8910,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "59.76667",
    "lon": "60.2"
  },
  "district": "Уральский",
  "name": "Краснотурьинск",
  "population": 55875,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.35",
    "lon": "60.05"
  },
  "district": "Уральский",
  "name": "Красноуральск",
  "population": 21507,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "56.61667",
    "lon": "57.76667"
  },
  "district": "Уральский",
  "name": "Красноуфимск",
  "population": 37301,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "56.012083",
    "lon": "92.871295"
  },
  "district": "Сибирский",
  "name": "Красноярск",
  "population": 1187771,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "50.95",
    "lon": "46.96667"
  },
  "district": "Приволжский",
  "name": "Красный Кут",
  "population": 14296,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "47.88333",
    "lon": "40.06667"
  },
  "district": "Южный",
  "name": "Красный Сулин",
  "population": 35697,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "58.06329",
    "lon": "37.122983"
  },
  "district": "Центральный",
  "name": "Красный Холм",
  "population": 4998,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "54.88917",
    "lon": "37.12333"
  },
  "district": "Центральный",
  "name": "Кремёнки",
  "population": 11745,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "60",
    "lon": "29.76667"
  },
  "district": "Северо-Западный",
  "name": "Кронштадт",
  "population": 44399,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "45.43333",
    "lon": "40.56667"
  },
  "district": "Южный",
  "name": "Кропоткин",
  "population": 75858,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "44.93333",
    "lon": "38"
  },
  "district": "Южный",
  "name": "Крымск",
  "population": 54597,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "56.15167",
    "lon": "44.19556"
  },
  "district": "Приволжский",
  "name": "Кстово",
  "population": 63646,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "55.57639",
    "lon": "36.69472"
  },
  "district": "Центральный",
  "name": "Кубинка",
  "population": 23146,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.48333",
    "lon": "57.35"
  },
  "district": "Приволжский",
  "name": "Кувандык",
  "population": 26596,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "57.03333",
    "lon": "34.16667"
  },
  "district": "Центральный",
  "name": "Кувшиново",
  "population": 9262,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "59.908489",
    "lon": "30.513569"
  },
  "district": "Северо-Западный",
  "name": "Кудрово",
  "population": 60791,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.01667",
    "lon": "54.66667"
  },
  "district": "Приволжский",
  "name": "Кудымкар",
  "population": 28293,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "53.11667",
    "lon": "46.6"
  },
  "district": "Приволжский",
  "name": "Кузнецк",
  "population": 78390,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "55.45028",
    "lon": "78.3075"
  },
  "district": "Сибирский",
  "name": "Куйбышев",
  "population": 41946,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "56.1825",
    "lon": "50.90639"
  },
  "district": "Приволжский",
  "name": "Кукмор",
  "population": 17886,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "55.41667",
    "lon": "42.51667"
  },
  "district": "Приволжский",
  "name": "Кулебаки",
  "population": 32184,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "52.76667",
    "lon": "55.78333"
  },
  "district": "Приволжский",
  "name": "Кумертау",
  "population": 57949,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "57.43333",
    "lon": "56.93333"
  },
  "district": "Приволжский",
  "name": "Кунгур",
  "population": 62673,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "54.36667",
    "lon": "77.3"
  },
  "district": "Сибирский",
  "name": "Купино",
  "population": 15065,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "55.44083",
    "lon": "65.34111"
  },
  "district": "Уральский",
  "name": "Курган",
  "population": 310911,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "44.88333",
    "lon": "40.6"
  },
  "district": "Южный",
  "name": "Курганинск",
  "population": 47305,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "45.25",
    "lon": "147.883333"
  },
  "district": "Дальневосточный",
  "name": "Курильск",
  "population": 2530,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "55.45",
    "lon": "40.61667"
  },
  "district": "Центральный",
  "name": "Курлово",
  "population": 6309,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "55.58333",
    "lon": "38.91667"
  },
  "district": "Центральный",
  "name": "Куровское",
  "population": 19857,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.71667",
    "lon": "36.18333"
  },
  "district": "Центральный",
  "name": "Курск",
  "population": 440052,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "54.9",
    "lon": "64.43333"
  },
  "district": "Уральский",
  "name": "Куртамыш",
  "population": 14806,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "43.20444",
    "lon": "46.087812"
  },
  "district": "Северо-Кавказский",
  "name": "Курчалой",
  "population": 23425,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "51.66667",
    "lon": "35.65"
  },
  "district": "Центральный",
  "name": "Курчатов",
  "population": 40318,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "55.33333",
    "lon": "59.43333"
  },
  "district": "Уральский",
  "name": "Куса",
  "population": 17136,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "58.28333",
    "lon": "59.73333"
  },
  "district": "Уральский",
  "name": "Кушва",
  "population": 27306,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "51.7",
    "lon": "94.36667"
  },
  "district": "Сибирский",
  "name": "Кызыл",
  "population": 125241,
  "subject": "Тыва"
}, {
  "coordinates": {
    "lat": "55.7",
    "lon": "60.55"
  },
  "district": "Уральский",
  "name": "Кыштым",
  "population": 36045,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "50.35",
    "lon": "106.45"
  },
  "district": "Сибирский",
  "name": "Кяхта",
  "population": 17877,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "44.633338",
    "lon": "40.733311"
  },
  "district": "Южный",
  "name": "Лабинск",
  "population": 57428,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "66.65806",
    "lon": "66.38389"
  },
  "district": "Уральский",
  "name": "Лабытнанги",
  "population": 25501,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "45.3925",
    "lon": "47.355"
  },
  "district": "Южный",
  "name": "Лагань",
  "population": 13834,
  "subject": "Калмыкия"
}, {
  "coordinates": {
    "lat": "54.56667",
    "lon": "20.16667"
  },
  "district": "Северо-Западный",
  "name": "Ладушкин",
  "population": 3666,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.4",
    "lon": "49.55"
  },
  "district": "Приволжский",
  "name": "Лаишево",
  "population": 9076,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "56.01694",
    "lon": "39.94944"
  },
  "district": "Центральный",
  "name": "Лакинск",
  "population": 12861,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "61.25",
    "lon": "75.16667"
  },
  "district": "Уральский",
  "name": "Лангепас",
  "population": 42701,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "61.51667",
    "lon": "30.2"
  },
  "district": "Северо-Западный",
  "name": "Лахденпохья",
  "population": 5952,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "53.0115528",
    "lon": "39.1281167"
  },
  "district": "Центральный",
  "name": "Лебедянь",
  "population": 20049,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "54.5988694",
    "lon": "52.4422722"
  },
  "district": "Приволжский",
  "name": "Лениногорск",
  "population": 60993,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "54.65",
    "lon": "86.16667"
  },
  "district": "Сибирский",
  "name": "Ленинск-Кузнецкий",
  "population": 92244,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "48.7",
    "lon": "45.2"
  },
  "district": "Южный",
  "name": "Ленинск",
  "population": 13391,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "60.71667",
    "lon": "114.9"
  },
  "district": "Дальневосточный",
  "name": "Ленск",
  "population": 21392,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "44.10528",
    "lon": "42.97167"
  },
  "district": "Северо-Кавказский",
  "name": "Лермонтов",
  "population": 22444,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "58.63333",
    "lon": "59.78333"
  },
  "district": "Уральский",
  "name": "Лесной",
  "population": 48261,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "45.46667",
    "lon": "133.4"
  },
  "district": "Дальневосточный",
  "name": "Лесозаводск",
  "population": 35433,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "58.23333",
    "lon": "92.48333"
  },
  "district": "Сибирский",
  "name": "Лесосибирск",
  "population": 55730,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "52.425306",
    "lon": "37.608306"
  },
  "district": "Центральный",
  "name": "Ливны",
  "population": 43549,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "55.71528",
    "lon": "38.95778"
  },
  "district": "Центральный",
  "name": "Ликино-Дулёво",
  "population": 34191,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.61667",
    "lon": "39.6"
  },
  "district": "Центральный",
  "name": "Липецк",
  "population": 496403,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "53.95",
    "lon": "37.7"
  },
  "district": "Центральный",
  "name": "Липки",
  "population": 8325,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "50.98222",
    "lon": "39.49944"
  },
  "district": "Центральный",
  "name": "Лиски",
  "population": 54147,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "57.11667",
    "lon": "35.46667"
  },
  "district": "Центральный",
  "name": "Лихославль",
  "population": 11017,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "56.01194",
    "lon": "37.47444"
  },
  "district": "Центральный",
  "name": "Лобня",
  "population": 82764,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "60.734305",
    "lon": "33.543183"
  },
  "district": "Северо-Западный",
  "name": "Лодейное Поле",
  "population": 18905,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.91074",
    "lon": "29.776466"
  },
  "district": "Северо-Западный",
  "name": "Ломоносов",
  "population": 39147,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "55.86667",
    "lon": "38.2"
  },
  "district": "Центральный",
  "name": "Лосино-Петровский",
  "population": 29000,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "58.733333333333",
    "lon": "29.85"
  },
  "district": "Северо-Западный",
  "name": "Луга",
  "population": 38407,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "60.61667",
    "lon": "47.28333"
  },
  "district": "Приволжский",
  "name": "Луза",
  "population": 9122,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "55.03833",
    "lon": "44.49778"
  },
  "district": "Приволжский",
  "name": "Лукоянов",
  "population": 12652,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "54.96667",
    "lon": "39.025"
  },
  "district": "Центральный",
  "name": "Луховицы",
  "population": 29889,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.01278",
    "lon": "45.02528"
  },
  "district": "Приволжский",
  "name": "Лысково",
  "population": 21657,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "58.1003806",
    "lon": "57.8043278"
  },
  "district": "Приволжский",
  "name": "Лысьва",
  "population": 53855,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.58361",
    "lon": "37.90556"
  },
  "district": "Центральный",
  "name": "Лыткарино",
  "population": 65212,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.66667",
    "lon": "35.26667"
  },
  "district": "Центральный",
  "name": "Льгов",
  "population": 17557,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "59.349301",
    "lon": "31.24858"
  },
  "district": "Северо-Западный",
  "name": "Любань",
  "population": 4565,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "55.68139",
    "lon": "37.89389"
  },
  "district": "Центральный",
  "name": "Люберцы",
  "population": 224195,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "58.35",
    "lon": "40.7"
  },
  "district": "Центральный",
  "name": "Любим",
  "population": 5037,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "53.86667",
    "lon": "34.46667"
  },
  "district": "Центральный",
  "name": "Людиново",
  "population": 35874,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "61.61667",
    "lon": "72.16667"
  },
  "district": "Уральский",
  "name": "Лянтор",
  "population": 40977,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "59.56667",
    "lon": "150.8"
  },
  "district": "Дальневосточный",
  "name": "Магадан",
  "population": 90757,
  "subject": "Магаданская область"
}, {
  "coordinates": {
    "lat": "43.16667",
    "lon": "44.81667"
  },
  "district": "Северо-Кавказский",
  "name": "Магас",
  "population": 15271,
  "subject": "Ингушетия"
}, {
  "coordinates": {
    "lat": "53.38333",
    "lon": "59.03333"
  },
  "district": "Уральский",
  "name": "Магнитогорск",
  "population": 410594,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "44.611",
    "lon": "40.111"
  },
  "district": "Южный",
  "name": "Майкоп",
  "population": 143385,
  "subject": "Адыгея"
}, {
  "coordinates": {
    "lat": "43.630508",
    "lon": "44.067733"
  },
  "district": "Северо-Кавказский",
  "name": "Майский",
  "population": 26632,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "48.61667",
    "lon": "142.78333"
  },
  "district": "Дальневосточный",
  "name": "Макаров",
  "population": 5848,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "57.88333",
    "lon": "43.8"
  },
  "district": "Центральный",
  "name": "Макарьев",
  "population": 5528,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "55.2",
    "lon": "67.25"
  },
  "district": "Уральский",
  "name": "Макушино",
  "population": 6827,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "58.85",
    "lon": "32.21667"
  },
  "district": "Северо-Западный",
  "name": "Малая Вишера",
  "population": 9996,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "43.508882",
    "lon": "44.585563"
  },
  "district": "Северо-Кавказский",
  "name": "Малгобек",
  "population": 36480,
  "subject": "Ингушетия"
}, {
  "coordinates": {
    "lat": "56.52278",
    "lon": "50.68083"
  },
  "district": "Приволжский",
  "name": "Малмыж",
  "population": 6931,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "52.4",
    "lon": "36.5"
  },
  "district": "Центральный",
  "name": "Малоархангельск",
  "population": 3609,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "55",
    "lon": "36.46667"
  },
  "district": "Центральный",
  "name": "Малоярославец",
  "population": 41836,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.7",
    "lon": "51.4"
  },
  "district": "Приволжский",
  "name": "Мамадыш",
  "population": 15726,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "54.46667",
    "lon": "19.93333"
  },
  "district": "Северо-Западный",
  "name": "Мамоново",
  "population": 8314,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "58.33333",
    "lon": "44.76667"
  },
  "district": "Центральный",
  "name": "Мантурово",
  "population": 13043,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "56.21667",
    "lon": "87.75"
  },
  "district": "Сибирский",
  "name": "Мариинск",
  "population": 40779,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "56.11667",
    "lon": "47.71667"
  },
  "district": "Приволжский",
  "name": "Мариинский Посад",
  "population": 7851,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "51.7",
    "lon": "46.75"
  },
  "district": "Приволжский",
  "name": "Маркс",
  "population": 28749,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "42.98333",
    "lon": "47.5"
  },
  "district": "Северо-Кавказский",
  "name": "Махачкала",
  "population": 623254,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "53.06111",
    "lon": "32.84833"
  },
  "district": "Центральный",
  "name": "Мглин",
  "population": 6919,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "61.033055555556",
    "lon": "76.109722222222"
  },
  "district": "Уральский",
  "name": "Мегион",
  "population": 52887,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "62.91667",
    "lon": "34.45"
  },
  "district": "Северо-Западный",
  "name": "Медвежьегорск",
  "population": 11962,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "51.422085",
    "lon": "57.595296"
  },
  "district": "Приволжский",
  "name": "Медногорск",
  "population": 23693,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "54.96667",
    "lon": "35.86667"
  },
  "district": "Центральный",
  "name": "Медынь",
  "population": 8200,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "54.24167",
    "lon": "57.96778"
  },
  "district": "Приволжский",
  "name": "Межгорье",
  "population": 15697,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "53.68333",
    "lon": "88.05"
  },
  "district": "Сибирский",
  "name": "Междуреченск",
  "population": 96174,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "65.85",
    "lon": "44.23333"
  },
  "district": "Северо-Западный",
  "name": "Мезень",
  "population": 2874,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "55.33333",
    "lon": "41.63333"
  },
  "district": "Центральный",
  "name": "Меленки",
  "population": 13407,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "52.95",
    "lon": "55.93333"
  },
  "district": "Приволжский",
  "name": "Мелеуз",
  "population": 56505,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "55.9",
    "lon": "52.316666666667"
  },
  "district": "Приволжский",
  "name": "Менделеевск",
  "population": 22875,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "55.71667",
    "lon": "53.08333"
  },
  "district": "Приволжский",
  "name": "Мензелинск",
  "population": 16008,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "54.31667",
    "lon": "35.28333"
  },
  "district": "Центральный",
  "name": "Мещовск",
  "population": 3810,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.05",
    "lon": "60.1"
  },
  "district": "Уральский",
  "name": "Миасс",
  "population": 147995,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "62.35",
    "lon": "50.06667"
  },
  "district": "Северо-Западный",
  "name": "Микунь",
  "population": 8527,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "48.91667",
    "lon": "40.4"
  },
  "district": "Южный",
  "name": "Миллерово",
  "population": 34841,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "44.20083",
    "lon": "43.1125"
  },
  "district": "Северо-Кавказский",
  "name": "Минеральные Воды",
  "population": 70485,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "53.7",
    "lon": "91.68333"
  },
  "district": "Сибирский",
  "name": "Минусинск",
  "population": 70089,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "55.06667",
    "lon": "57.55"
  },
  "district": "Уральский",
  "name": "Миньяр",
  "population": 8500,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "62.76028",
    "lon": "40.33528"
  },
  "district": "Северо-Западный",
  "name": "Мирный",
  "population": 27262,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "62.53333",
    "lon": "113.95"
  },
  "district": "Дальневосточный",
  "name": "Мирный",
  "population": 34045,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "54.23333",
    "lon": "39.03333"
  },
  "district": "Центральный",
  "name": "Михайлов",
  "population": 10303,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "50.06667",
    "lon": "43.23333"
  },
  "district": "Южный",
  "name": "Михайловка",
  "population": 56031,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "56.43333",
    "lon": "59.11667"
  },
  "district": "Уральский",
  "name": "Михайловск",
  "population": 9756,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "45.130012",
    "lon": "42.027487"
  },
  "district": "Северо-Кавказский",
  "name": "Михайловск",
  "population": 114133,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "52.89222",
    "lon": "40.49278"
  },
  "district": "Центральный",
  "name": "Мичуринск",
  "population": 90451,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "53.73333",
    "lon": "119.76667"
  },
  "district": "Сибирский",
  "name": "Могоча",
  "population": 12390,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "55.5",
    "lon": "36.03333"
  },
  "district": "Центральный",
  "name": "Можайск",
  "population": 33880,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.45",
    "lon": "52.21667"
  },
  "district": "Приволжский",
  "name": "Можга",
  "population": 44345,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "43.736575",
    "lon": "44.652834"
  },
  "district": "Северо-Кавказский",
  "name": "Моздок",
  "population": 36784,
  "subject": "Северная Осетия"
}, {
  "coordinates": {
    "lat": "67.93944",
    "lon": "32.91556"
  },
  "district": "Северо-Западный",
  "name": "Мончегорск",
  "population": 39962,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "48.35",
    "lon": "41.833333333333"
  },
  "district": "Южный",
  "name": "Морозовск",
  "population": 24258,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "53.45",
    "lon": "41.8"
  },
  "district": "Центральный",
  "name": "Моршанск",
  "population": 39023,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "54.48333",
    "lon": "34.98333"
  },
  "district": "Центральный",
  "name": "Мосальск",
  "population": 4234,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.755833333333",
    "lon": "37.617777777778"
  },
  "district": "Центральный",
  "name": "Москва",
  "population": 13010112,
  "subject": "Москва"
}, {
  "coordinates": {
    "lat": "55.6",
    "lon": "37.35"
  },
  "district": "Центральный",
  "name": "Московский",
  "population": 65417,
  "subject": "Москва"
}, {
  "coordinates": {
    "lat": "63.79444",
    "lon": "74.49722"
  },
  "district": "Уральский",
  "name": "Муравленко",
  "population": 29233,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "59.38333",
    "lon": "48.96667"
  },
  "district": "Приволжский",
  "name": "Мураши",
  "population": 5700,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "60.051284",
    "lon": "30.438578"
  },
  "district": "Северо-Западный",
  "name": "Мурино",
  "population": 89083,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "68.96667",
    "lon": "33.08333"
  },
  "district": "Северо-Западный",
  "name": "Мурманск",
  "population": 270384,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "55.5725",
    "lon": "42.05139"
  },
  "district": "Центральный",
  "name": "Муром",
  "population": 107497,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "53.27833",
    "lon": "36.575"
  },
  "district": "Центральный",
  "name": "Мценск",
  "population": 36960,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "53.7",
    "lon": "87.81667"
  },
  "district": "Сибирский",
  "name": "Мыски",
  "population": 40109,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "55.91667",
    "lon": "37.73333"
  },
  "district": "Центральный",
  "name": "Мытищи",
  "population": 255429,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.78333",
    "lon": "38.45"
  },
  "district": "Центральный",
  "name": "Мышкин",
  "population": 5621,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "55.7",
    "lon": "52.33333"
  },
  "district": "Приволжский",
  "name": "Набережные Челны",
  "population": 548434,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "55.53333",
    "lon": "42.2"
  },
  "district": "Приволжский",
  "name": "Навашино",
  "population": 14664,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "57.46667",
    "lon": "41.96667"
  },
  "district": "Центральный",
  "name": "Наволоки",
  "population": 8167,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "65.53333",
    "lon": "72.51667"
  },
  "district": "Уральский",
  "name": "Надым",
  "population": 45973,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "56.00639",
    "lon": "90.39139"
  },
  "district": "Сибирский",
  "name": "Назарово",
  "population": 45333,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "43.21667",
    "lon": "44.76667"
  },
  "district": "Северо-Кавказский",
  "name": "Назрань",
  "population": 122350,
  "subject": "Ингушетия"
}, {
  "coordinates": {
    "lat": "55.56667",
    "lon": "71.35"
  },
  "district": "Сибирский",
  "name": "Называевск",
  "population": 10434,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "43.485259",
    "lon": "43.607072"
  },
  "district": "Северо-Кавказский",
  "name": "Нальчик",
  "population": 247054,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "46.68333",
    "lon": "47.85"
  },
  "district": "Южный",
  "name": "Нариманов",
  "population": 11104,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "55.38333",
    "lon": "36.73333"
  },
  "district": "Центральный",
  "name": "Наро-Фоминск",
  "population": 71121,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "43.556734",
    "lon": "43.862222"
  },
  "district": "Северо-Кавказский",
  "name": "Нарткала",
  "population": 33203,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "67.63778",
    "lon": "53.00667"
  },
  "district": "Северо-Западный",
  "name": "Нарьян-Мар",
  "population": 23399,
  "subject": "Ненецкий АО"
}, {
  "coordinates": {
    "lat": "42.81667",
    "lon": "132.88333"
  },
  "district": "Дальневосточный",
  "name": "Находка",
  "population": 139931,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "56.01667",
    "lon": "29.93333"
  },
  "district": "Северо-Западный",
  "name": "Невель",
  "population": 13980,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "46.65",
    "lon": "141.86667"
  },
  "district": "Дальневосточный",
  "name": "Невельск",
  "population": 10608,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "44.63333",
    "lon": "41.93333"
  },
  "district": "Северо-Кавказский",
  "name": "Невинномысск",
  "population": 117562,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "57.48333",
    "lon": "60.2"
  },
  "district": "Уральский",
  "name": "Невьянск",
  "population": 22061,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "56.21667",
    "lon": "32.78333"
  },
  "district": "Центральный",
  "name": "Нелидово",
  "population": 18603,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "55.03333",
    "lon": "22.03333"
  },
  "district": "Северо-Западный",
  "name": "Неман",
  "population": 9255,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "57.45",
    "lon": "40.58333"
  },
  "district": "Центральный",
  "name": "Нерехта",
  "population": 19977,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "51.98333",
    "lon": "116.58333"
  },
  "district": "Сибирский",
  "name": "Нерчинск",
  "population": 15290,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "56.65833",
    "lon": "124.725"
  },
  "district": "Дальневосточный",
  "name": "Нерюнгри",
  "population": 53409,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "54.63333",
    "lon": "22.56667"
  },
  "district": "Северо-Западный",
  "name": "Нестеров",
  "population": 3336,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "52.8",
    "lon": "51.16667"
  },
  "district": "Приволжский",
  "name": "Нефтегорск",
  "population": 18076,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "56.08889",
    "lon": "54.24639"
  },
  "district": "Приволжский",
  "name": "Нефтекамск",
  "population": 131942,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "44.75056",
    "lon": "44.97972"
  },
  "district": "Северо-Кавказский",
  "name": "Нефтекумск",
  "population": 23137,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "61.1",
    "lon": "72.6"
  },
  "district": "Уральский",
  "name": "Нефтеюганск",
  "population": 124732,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "58.29444",
    "lon": "43.87806"
  },
  "district": "Центральный",
  "name": "Нея",
  "population": 7816,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "60.93389",
    "lon": "76.58111"
  },
  "district": "Уральский",
  "name": "Нижневартовск",
  "population": 283256,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "55.63333",
    "lon": "51.81667"
  },
  "district": "Приволжский",
  "name": "Нижнекамск",
  "population": 241479,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "54.9",
    "lon": "99.01667"
  },
  "district": "Сибирский",
  "name": "Нижнеудинск",
  "population": 29995,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "56.66667",
    "lon": "59.3"
  },
  "district": "Уральский",
  "name": "Нижние Серги",
  "population": 8009,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.53333",
    "lon": "43.68333"
  },
  "district": "Приволжский",
  "name": "Нижний Ломов",
  "population": 20421,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "56.32694",
    "lon": "44.0075"
  },
  "district": "Приволжский",
  "name": "Нижний Новгород",
  "population": 1226076,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "57.91667",
    "lon": "59.96667"
  },
  "district": "Уральский",
  "name": "Нижний Тагил",
  "population": 338966,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.08333",
    "lon": "60.71667"
  },
  "district": "Уральский",
  "name": "Нижняя Салда",
  "population": 16505,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "58.62083",
    "lon": "59.84778"
  },
  "district": "Уральский",
  "name": "Нижняя Тура",
  "population": 18392,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.15",
    "lon": "140.73333"
  },
  "district": "Дальневосточный",
  "name": "Николаевск-на-Амуре",
  "population": 18631,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "50.02722",
    "lon": "45.46306"
  },
  "district": "Южный",
  "name": "Николаевск",
  "population": 13460,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "59.53333",
    "lon": "45.45"
  },
  "district": "Северо-Западный",
  "name": "Никольск",
  "population": 7661,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "53.71667",
    "lon": "46.08333"
  },
  "district": "Приволжский",
  "name": "Никольск",
  "population": 19873,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "59.704642",
    "lon": "30.788975"
  },
  "district": "Северо-Западный",
  "name": "Никольское",
  "population": 22355,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "60.106401",
    "lon": "32.316183"
  },
  "district": "Северо-Западный",
  "name": "Новая Ладога",
  "population": 7432,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.05",
    "lon": "60.6"
  },
  "district": "Уральский",
  "name": "Новая Ляля",
  "population": 10684,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "45.49333",
    "lon": "41.21694"
  },
  "district": "Северо-Кавказский",
  "name": "Новоалександровск",
  "population": 26767,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "53.4",
    "lon": "83.93333"
  },
  "district": "Сибирский",
  "name": "Новоалтайск",
  "population": 73049,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "50.51667",
    "lon": "42.66667"
  },
  "district": "Южный",
  "name": "Новоаннинский",
  "population": 15351,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "51.31667",
    "lon": "39.21667"
  },
  "district": "Центральный",
  "name": "Нововоронеж",
  "population": 30658,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "64.41667",
    "lon": "40.81667"
  },
  "district": "Северо-Западный",
  "name": "Новодвинск",
  "population": 33294,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "52.53333",
    "lon": "31.93333"
  },
  "district": "Центральный",
  "name": "Новозыбков",
  "population": 38680,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "45.1",
    "lon": "41.05"
  },
  "district": "Южный",
  "name": "Новокубанск",
  "population": 34000,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "53.73333",
    "lon": "87.08333"
  },
  "district": "Сибирский",
  "name": "Новокузнецк",
  "population": 537480,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "53.1",
    "lon": "49.91667"
  },
  "district": "Приволжский",
  "name": "Новокуйбышевск",
  "population": 98306,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "54.03333",
    "lon": "39.75"
  },
  "district": "Центральный",
  "name": "Новомичуринск",
  "population": 16900,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "54.03333",
    "lon": "38.26667"
  },
  "district": "Центральный",
  "name": "Новомосковск",
  "population": 119697,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "43.96361",
    "lon": "43.63944"
  },
  "district": "Северо-Кавказский",
  "name": "Новопавловск",
  "population": 20781,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "57.03333",
    "lon": "29.33333"
  },
  "district": "Северо-Западный",
  "name": "Новоржев",
  "population": 3222,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "44.71667",
    "lon": "37.76667"
  },
  "district": "Южный",
  "name": "Новороссийск",
  "population": 262293,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "55.01667",
    "lon": "82.91667"
  },
  "district": "Сибирский",
  "name": "Новосибирск",
  "population": 1633595,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "52.96667",
    "lon": "37.05"
  },
  "district": "Центральный",
  "name": "Новосиль",
  "population": 2912,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "56.33333",
    "lon": "30.15"
  },
  "district": "Северо-Западный",
  "name": "Новосокольники",
  "population": 6895,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "51.20667",
    "lon": "58.32806"
  },
  "district": "Приволжский",
  "name": "Новотроицк",
  "population": 75960,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "50.45",
    "lon": "48.15"
  },
  "district": "Приволжский",
  "name": "Новоузенск",
  "population": 15216,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "54.15",
    "lon": "48.38333"
  },
  "district": "Приволжский",
  "name": "Новоульяновск",
  "population": 13673,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "57.25",
    "lon": "60.08333"
  },
  "district": "Уральский",
  "name": "Новоуральск",
  "population": 78479,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "51.1",
    "lon": "41.61667"
  },
  "district": "Центральный",
  "name": "Новохопёрск",
  "population": 5948,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "56.12194",
    "lon": "47.4925"
  },
  "district": "Приволжский",
  "name": "Новочебоксарск",
  "population": 120375,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "47.43583",
    "lon": "40.09861"
  },
  "district": "Южный",
  "name": "Новочеркасск",
  "population": 163674,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "47.76667",
    "lon": "39.91667"
  },
  "district": "Южный",
  "name": "Новошахтинск",
  "population": 103480,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "50.76667",
    "lon": "37.86667"
  },
  "district": "Центральный",
  "name": "Новый Оскол",
  "population": 18359,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "66.08472",
    "lon": "76.67889"
  },
  "district": "Уральский",
  "name": "Новый Уренгой",
  "population": 107251,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "55.85",
    "lon": "38.43333"
  },
  "district": "Центральный",
  "name": "Ногинск",
  "population": 103891,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.55722",
    "lon": "49.93417"
  },
  "district": "Приволжский",
  "name": "Нолинск",
  "population": 8262,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "69.33333",
    "lon": "88.21667"
  },
  "district": "Сибирский",
  "name": "Норильск",
  "population": 174453,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "63.20167",
    "lon": "75.45167"
  },
  "district": "Уральский",
  "name": "Ноябрьск",
  "population": 100188,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "54.43333",
    "lon": "50.8"
  },
  "district": "Приволжский",
  "name": "Нурлат",
  "population": 33990,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "57.93333",
    "lon": "55.33333"
  },
  "district": "Приволжский",
  "name": "Нытва",
  "population": 16675,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "63.28333",
    "lon": "118.33333"
  },
  "district": "Дальневосточный",
  "name": "Нюрба",
  "population": 10138,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "62.13333",
    "lon": "65.38333"
  },
  "district": "Уральский",
  "name": "Нягань",
  "population": 63034,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "56.05",
    "lon": "59.6"
  },
  "district": "Уральский",
  "name": "Нязепетровск",
  "population": 10379,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "61.666666666667",
    "lon": "40.2"
  },
  "district": "Северо-Западный",
  "name": "Няндома",
  "population": 18473,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "49",
    "lon": "131.05"
  },
  "district": "Дальневосточный",
  "name": "Облучье",
  "population": 7959,
  "subject": "Еврейская АО"
}, {
  "coordinates": {
    "lat": "55.1",
    "lon": "36.61667"
  },
  "district": "Центральный",
  "name": "Обнинск",
  "population": 125376,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "51.21111",
    "lon": "36.27639"
  },
  "district": "Центральный",
  "name": "Обоянь",
  "population": 11844,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "54.99167",
    "lon": "82.7125"
  },
  "district": "Сибирский",
  "name": "Обь",
  "population": 30369,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "55.67333",
    "lon": "37.27333"
  },
  "district": "Центральный",
  "name": "Одинцово",
  "population": 180530,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "54.41667",
    "lon": "22.01667"
  },
  "district": "Северо-Западный",
  "name": "Озёрск",
  "population": 4152,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.75",
    "lon": "60.71667"
  },
  "district": "Уральский",
  "name": "Озёрск",
  "population": 76896,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "54.857875",
    "lon": "38.5438194"
  },
  "district": "Центральный",
  "name": "Озёры",
  "population": 24359,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.16667",
    "lon": "48.66667"
  },
  "district": "Приволжский",
  "name": "Октябрьск",
  "population": 20703,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "54.48333",
    "lon": "53.48333"
  },
  "district": "Приволжский",
  "name": "Октябрьский",
  "population": 115557,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "58.38333",
    "lon": "33.3"
  },
  "district": "Северо-Западный",
  "name": "Окуловка",
  "population": 9949,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "68.15",
    "lon": "33.28333"
  },
  "district": "Северо-Западный",
  "name": "Оленегорск",
  "population": 21438,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "60.98333",
    "lon": "32.96667"
  },
  "district": "Северо-Западный",
  "name": "Олонец",
  "population": 7663,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "60.38333",
    "lon": "120.43333"
  },
  "district": "Дальневосточный",
  "name": "Олёкминск",
  "population": 8398,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "54.96667",
    "lon": "73.38333"
  },
  "district": "Сибирский",
  "name": "Омск",
  "population": 1125695,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "58.66667",
    "lon": "52.18333"
  },
  "district": "Приволжский",
  "name": "Омутнинск",
  "population": 19629,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "63.91667",
    "lon": "38.08333"
  },
  "district": "Северо-Западный",
  "name": "Онега",
  "population": 16947,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "56.71667",
    "lon": "28.65"
  },
  "district": "Северо-Западный",
  "name": "Опочка",
  "population": 9928,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "51.76667",
    "lon": "55.1"
  },
  "district": "Приволжский",
  "name": "Оренбург",
  "population": 543654,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "55.8",
    "lon": "38.96667"
  },
  "district": "Центральный",
  "name": "Орехово-Зуево",
  "population": 105745,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "58.53889",
    "lon": "48.89861"
  },
  "district": "Приволжский",
  "name": "Орлов",
  "population": 5508,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "51.2",
    "lon": "58.61667"
  },
  "district": "Приволжский",
  "name": "Орск",
  "population": 189195,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "52.96667",
    "lon": "36.08333"
  },
  "district": "Центральный",
  "name": "Орёл",
  "population": 303169,
  "subject": "Орловская область"
}, {
  "coordinates": {
    "lat": "57.28333",
    "lon": "55.45"
  },
  "district": "Приволжский",
  "name": "Оса",
  "population": 19523,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "53.61667",
    "lon": "87.33333"
  },
  "district": "Сибирский",
  "name": "Осинники",
  "population": 40367,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "57.15",
    "lon": "33.1"
  },
  "district": "Центральный",
  "name": "Осташков",
  "population": 16674,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "57.33333",
    "lon": "28.35"
  },
  "district": "Северо-Западный",
  "name": "Остров",
  "population": 20923,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "68.05306",
    "lon": "39.51306"
  },
  "district": "Северо-Западный",
  "name": "Островной",
  "population": 1487,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "50.86667",
    "lon": "39.06667"
  },
  "district": "Центральный",
  "name": "Острогожск",
  "population": 31699,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "59.77409",
    "lon": "30.794553"
  },
  "district": "Северо-Западный",
  "name": "Отрадное",
  "population": 25706,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "53.36667",
    "lon": "51.35"
  },
  "district": "Приволжский",
  "name": "Отрадный",
  "population": 46984,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "53.58333",
    "lon": "142.95"
  },
  "district": "Дальневосточный",
  "name": "Оха",
  "population": 20357,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "57.71667",
    "lon": "55.38333"
  },
  "district": "Приволжский",
  "name": "Оханск",
  "population": 6430,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "57.88333",
    "lon": "54.71667"
  },
  "district": "Приволжский",
  "name": "Очёр",
  "population": 14385,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "55.96194",
    "lon": "43.09"
  },
  "district": "Приволжский",
  "name": "Павлово",
  "population": 57116,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "50.45",
    "lon": "40.06667"
  },
  "district": "Центральный",
  "name": "Павловск",
  "population": 22384,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "59.68333",
    "lon": "30.43333"
  },
  "district": "Северо-Западный",
  "name": "Павловск",
  "population": 17463,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "55.78333",
    "lon": "38.65"
  },
  "district": "Центральный",
  "name": "Павловский Посад",
  "population": 65098,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "50.05",
    "lon": "46.88333"
  },
  "district": "Южный",
  "name": "Палласовка",
  "population": 14966,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "43.13333",
    "lon": "133.13333"
  },
  "district": "Дальневосточный",
  "name": "Партизанск",
  "population": 33832,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "69.7",
    "lon": "170.31667"
  },
  "district": "Дальневосточный",
  "name": "Певек",
  "population": 4015,
  "subject": "Чукотский АО"
}, {
  "coordinates": {
    "lat": "53.2",
    "lon": "45"
  },
  "district": "Приволжский",
  "name": "Пенза",
  "population": 501109,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "54.86667",
    "lon": "43.8"
  },
  "district": "Приволжский",
  "name": "Первомайск",
  "population": 13223,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.91667",
    "lon": "59.95"
  },
  "district": "Уральский",
  "name": "Первоуральск",
  "population": 114450,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.6",
    "lon": "44.55"
  },
  "district": "Приволжский",
  "name": "Перевоз",
  "population": 8999,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.41667",
    "lon": "38.175"
  },
  "district": "Центральный",
  "name": "Пересвет",
  "population": 11752,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.7381333",
    "lon": "38.8561528"
  },
  "district": "Центральный",
  "name": "Переславль-Залесский",
  "population": 37738,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "58.01389",
    "lon": "56.24889"
  },
  "district": "Приволжский",
  "name": "Пермь",
  "population": 1034002,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "58.6",
    "lon": "35.81667"
  },
  "district": "Северо-Западный",
  "name": "Пестово",
  "population": 14032,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "59.88333",
    "lon": "29.9"
  },
  "district": "Северо-Западный",
  "name": "Петергоф",
  "population": 80814,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "50.13333",
    "lon": "45.21667"
  },
  "district": "Южный",
  "name": "Петров Вал",
  "population": 12526,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "51.28333",
    "lon": "108.83333"
  },
  "district": "Сибирский",
  "name": "Петровск-Забайкальский",
  "population": 15015,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "52.31667",
    "lon": "45.38333"
  },
  "district": "Приволжский",
  "name": "Петровск",
  "population": 26319,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "61.79611",
    "lon": "34.34917"
  },
  "district": "Северо-Западный",
  "name": "Петрозаводск",
  "population": 234897,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "53.01667",
    "lon": "158.65"
  },
  "district": "Дальневосточный",
  "name": "Петропавловск-Камчатский",
  "population": 164900,
  "subject": "Камчатский край"
}, {
  "coordinates": {
    "lat": "55.06667",
    "lon": "67.88333"
  },
  "district": "Уральский",
  "name": "Петухово",
  "population": 8502,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "55.93333",
    "lon": "39.46667"
  },
  "district": "Центральный",
  "name": "Петушки",
  "population": 13317,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "65.11667",
    "lon": "57.11667"
  },
  "district": "Северо-Западный",
  "name": "Печора",
  "population": 35254,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "57.81667",
    "lon": "27.6"
  },
  "district": "Северо-Западный",
  "name": "Печоры",
  "population": 10247,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "59.512684",
    "lon": "34.177483"
  },
  "district": "Северо-Западный",
  "name": "Пикалёво",
  "population": 20388,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "54.95",
    "lon": "20.21667"
  },
  "district": "Северо-Западный",
  "name": "Пионерский",
  "population": 12794,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "61.56667",
    "lon": "31.48333"
  },
  "district": "Северо-Западный",
  "name": "Питкяранта",
  "population": 8340,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "53.7",
    "lon": "37.3"
  },
  "district": "Центральный",
  "name": "Плавск",
  "population": 16893,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "54.36667",
    "lon": "60.81667"
  },
  "district": "Уральский",
  "name": "Пласт",
  "population": 18379,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "57.45",
    "lon": "41.5"
  },
  "district": "Центральный",
  "name": "Плёс",
  "population": 1896,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "51.2",
    "lon": "42.25"
  },
  "district": "Центральный",
  "name": "Поворино",
  "population": 16417,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "55.42972",
    "lon": "37.54444"
  },
  "district": "Центральный",
  "name": "Подольск",
  "population": 314934,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "60.912097",
    "lon": "34.167952"
  },
  "district": "Северо-Западный",
  "name": "Подпорожье",
  "population": 16123,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "61.75",
    "lon": "75.58333"
  },
  "district": "Уральский",
  "name": "Покачи",
  "population": 16040,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "55.91778",
    "lon": "39.175"
  },
  "district": "Центральный",
  "name": "Покров",
  "population": 17747,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "61.48333",
    "lon": "129.15"
  },
  "district": "Дальневосточный",
  "name": "Покровск",
  "population": 12021,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "56.45",
    "lon": "60.18333"
  },
  "district": "Уральский",
  "name": "Полевской",
  "population": 55182,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "54.86667",
    "lon": "21.1"
  },
  "district": "Северо-Западный",
  "name": "Полесск",
  "population": 6926,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "54.6",
    "lon": "86.28333"
  },
  "district": "Сибирский",
  "name": "Полысаево",
  "population": 25631,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "67.36583",
    "lon": "32.49806"
  },
  "district": "Северо-Западный",
  "name": "Полярные Зори",
  "population": 14146,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "69.19833",
    "lon": "33.45611"
  },
  "district": "Северо-Западный",
  "name": "Полярный",
  "population": 12293,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "49.21667",
    "lon": "143.1"
  },
  "district": "Дальневосточный",
  "name": "Поронайск",
  "population": 16026,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "57.76667",
    "lon": "29.55"
  },
  "district": "Северо-Западный",
  "name": "Порхов",
  "population": 7309,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "53.65",
    "lon": "52.13333"
  },
  "district": "Приволжский",
  "name": "Похвистнево",
  "population": 27333,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "52.93333",
    "lon": "33.45"
  },
  "district": "Центральный",
  "name": "Почеп",
  "population": 14991,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "54.4",
    "lon": "32.45"
  },
  "district": "Центральный",
  "name": "Починок",
  "population": 7575,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "58.5",
    "lon": "39.11667"
  },
  "district": "Центральный",
  "name": "Пошехонье",
  "population": 5150,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "54.45",
    "lon": "21.01667"
  },
  "district": "Северо-Западный",
  "name": "Правдинск",
  "population": 3986,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "57.38333",
    "lon": "41.28333"
  },
  "district": "Центральный",
  "name": "Приволжск",
  "population": 14332,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "54.73333",
    "lon": "20"
  },
  "district": "Северо-Западный",
  "name": "Приморск",
  "population": 1436,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "60.366014",
    "lon": "28.613561"
  },
  "district": "Северо-Западный",
  "name": "Приморск",
  "population": 6537,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "46.05",
    "lon": "38.18333"
  },
  "district": "Южный",
  "name": "Приморско-Ахтарск",
  "population": 31087,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "61.035979",
    "lon": "30.115589"
  },
  "district": "Северо-Западный",
  "name": "Приозерск",
  "population": 18777,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "53.88333",
    "lon": "86.71667"
  },
  "district": "Сибирский",
  "name": "Прокопьевск",
  "population": 177819,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "46.70306",
    "lon": "41.71917"
  },
  "district": "Южный",
  "name": "Пролетарск",
  "population": 18983,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "54.87944",
    "lon": "37.21389"
  },
  "district": "Центральный",
  "name": "Протвино",
  "population": 37735,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "43.750055",
    "lon": "44.033333"
  },
  "district": "Северо-Кавказский",
  "name": "Прохладный",
  "population": 59938,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "57.81667",
    "lon": "28.33333"
  },
  "district": "Северо-Западный",
  "name": "Псков",
  "population": 193082,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "52.01667",
    "lon": "48.8"
  },
  "district": "Приволжский",
  "name": "Пугачёв",
  "population": 40127,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "61.8",
    "lon": "36.53333"
  },
  "district": "Северо-Западный",
  "name": "Пудож",
  "population": 7356,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "56.33333",
    "lon": "29.36667"
  },
  "district": "Северо-Западный",
  "name": "Пустошка",
  "population": 4070,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "56.98333",
    "lon": "43.16667"
  },
  "district": "Центральный",
  "name": "Пучеж",
  "population": 6879,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "59.71667",
    "lon": "30.41667"
  },
  "district": "Северо-Западный",
  "name": "Пушкин",
  "population": 107223,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "56.01667",
    "lon": "37.85"
  },
  "district": "Центральный",
  "name": "Пушкино",
  "population": 110868,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "54.83333",
    "lon": "37.61667"
  },
  "district": "Центральный",
  "name": "Пущино",
  "population": 19578,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.066666666667",
    "lon": "27.916666666667"
  },
  "district": "Северо-Западный",
  "name": "Пыталово",
  "population": 5263,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "60.75",
    "lon": "72.78333"
  },
  "district": "Уральский",
  "name": "Пыть-Ях",
  "population": 40180,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "44.0499664",
    "lon": "43.0600548"
  },
  "district": "Северо-Кавказский",
  "name": "Пятигорск",
  "population": 146473,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "55.99778",
    "lon": "40.32972"
  },
  "district": "Центральный",
  "name": "Радужный",
  "population": 17569,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "62.13333",
    "lon": "77.46667"
  },
  "district": "Уральский",
  "name": "Радужный",
  "population": 43577,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "49.8",
    "lon": "129.4"
  },
  "district": "Дальневосточный",
  "name": "Райчихинск",
  "population": 15797,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "55.56667",
    "lon": "38.21667"
  },
  "district": "Центральный",
  "name": "Раменское",
  "population": 114537,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.66667",
    "lon": "41.88333"
  },
  "district": "Центральный",
  "name": "Рассказово",
  "population": 47644,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "56.8",
    "lon": "59.91667"
  },
  "district": "Уральский",
  "name": "Ревда",
  "population": 60200,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "57.36667",
    "lon": "61.4"
  },
  "district": "Уральский",
  "name": "Реж",
  "population": 36585,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.760611",
    "lon": "37.855194"
  },
  "district": "Центральный",
  "name": "Реутов",
  "population": 113871,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "56.26556",
    "lon": "34.3275"
  },
  "district": "Центральный",
  "name": "Ржев",
  "population": 55757,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "57.1",
    "lon": "41.73333"
  },
  "district": "Центральный",
  "name": "Родники",
  "population": 24101,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "53.949166666667",
    "lon": "32.856944444444"
  },
  "district": "Центральный",
  "name": "Рославль",
  "population": 45416,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "50.2",
    "lon": "39.58333"
  },
  "district": "Центральный",
  "name": "Россошь",
  "population": 60879,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "47.24056",
    "lon": "39.71056"
  },
  "district": "Южный",
  "name": "Ростов-на-Дону",
  "population": 1142162,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "57.18333",
    "lon": "39.41667"
  },
  "district": "Центральный",
  "name": "Ростов",
  "population": 28122,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "55.66361",
    "lon": "39.865"
  },
  "district": "Центральный",
  "name": "Рошаль",
  "population": 21401,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.25",
    "lon": "43.78333"
  },
  "district": "Приволжский",
  "name": "Ртищево",
  "population": 37850,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "51.52722",
    "lon": "81.218806"
  },
  "district": "Сибирский",
  "name": "Рубцовск",
  "population": 126834,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "54.95",
    "lon": "31.06667"
  },
  "district": "Центральный",
  "name": "Рудня",
  "population": 8908,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "55.698888888889",
    "lon": "36.195277777778"
  },
  "district": "Центральный",
  "name": "Руза",
  "population": 16014,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "54.06667",
    "lon": "44.95"
  },
  "district": "Приволжский",
  "name": "Рузаевка",
  "population": 42989,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "58.05",
    "lon": "38.83333"
  },
  "district": "Центральный",
  "name": "Рыбинск",
  "population": 177295,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "54.73333",
    "lon": "39.51667"
  },
  "district": "Центральный",
  "name": "Рыбное",
  "population": 21069,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "51.56667",
    "lon": "34.68333"
  },
  "district": "Центральный",
  "name": "Рыльск",
  "population": 15069,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "53.71667",
    "lon": "40.06667"
  },
  "district": "Центральный",
  "name": "Ряжск",
  "population": 20634,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "54.61667",
    "lon": "39.71667"
  },
  "district": "Центральный",
  "name": "Рязань",
  "population": 528599,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "45.13361",
    "lon": "33.57722"
  },
  "district": "Южный",
  "name": "Саки",
  "population": 24285,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "53.36667",
    "lon": "55.93333"
  },
  "district": "Приволжский",
  "name": "Салават",
  "population": 148575,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "54.23333",
    "lon": "85.8"
  },
  "district": "Сибирский",
  "name": "Салаир",
  "population": 7088,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "66.53333",
    "lon": "66.63333"
  },
  "district": "Уральский",
  "name": "Салехард",
  "population": 47910,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "46.48333",
    "lon": "41.53333"
  },
  "district": "Южный",
  "name": "Сальск",
  "population": 57937,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "53.18333",
    "lon": "50.11667"
  },
  "district": "Приволжский",
  "name": "Самара",
  "population": 1173299,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "59.95",
    "lon": "30.31667"
  },
  "district": "Северо-Западный",
  "name": "Санкт-Петербург",
  "population": 5601911,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "59.95",
    "lon": "30.31667"
  },
  "district": "Северо-Западный",
  "name": "Ленинград",
  "population": 5601911,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "54.18333",
    "lon": "45.18333"
  },
  "district": "Приволжский",
  "name": "Саранск",
  "population": 314871,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "56.46667",
    "lon": "53.8"
  },
  "district": "Приволжский",
  "name": "Сарапул",
  "population": 91115,
  "subject": "Удмуртия"
}, {
  "coordinates": {
    "lat": "51.53333",
    "lon": "46"
  },
  "district": "Приволжский",
  "name": "Саратов",
  "population": 901361,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "54.93333",
    "lon": "43.31667"
  },
  "district": "Приволжский",
  "name": "Саров",
  "population": 93357,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "54.35",
    "lon": "41.91667"
  },
  "district": "Центральный",
  "name": "Сасово",
  "population": 21628,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "55.05",
    "lon": "59.05"
  },
  "district": "Уральский",
  "name": "Сатка",
  "population": 42597,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "55.1",
    "lon": "33.25"
  },
  "district": "Центральный",
  "name": "Сафоново",
  "population": 38403,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "53.1",
    "lon": "91.4"
  },
  "district": "Сибирский",
  "name": "Саяногорск",
  "population": 44872,
  "subject": "Хакасия"
}, {
  "coordinates": {
    "lat": "54.11667",
    "lon": "102.16667"
  },
  "district": "Сибирский",
  "name": "Саянск",
  "population": 35561,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "54.9394",
    "lon": "20.1565"
  },
  "district": "Северо-Западный",
  "name": "Светлогорск",
  "population": 16207,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "45.33083",
    "lon": "42.85111"
  },
  "district": "Северо-Кавказский",
  "name": "Светлоград",
  "population": 35703,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "54.68333",
    "lon": "20.13333"
  },
  "district": "Северо-Западный",
  "name": "Светлый",
  "population": 21114,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "61.10833",
    "lon": "28.85833"
  },
  "district": "Северо-Западный",
  "name": "Светогорск",
  "population": 13784,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "53.08333",
    "lon": "103.33333"
  },
  "district": "Сибирский",
  "name": "Свирск",
  "population": 15485,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "51.38333",
    "lon": "128.13333"
  },
  "district": "Дальневосточный",
  "name": "Свободный",
  "population": 48517,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "56.28333",
    "lon": "28.48333"
  },
  "district": "Северо-Западный",
  "name": "Себеж",
  "population": 6246,
  "subject": "Псковская область"
}, {
  "coordinates": {
    "lat": "44.6",
    "lon": "33.53333"
  },
  "district": "Южный",
  "name": "Севастополь",
  "population": 547820,
  "subject": "Севастополь"
}, {
  "coordinates": {
    "lat": "50.66667",
    "lon": "156.11667"
  },
  "district": "Дальневосточный",
  "name": "Северо-Курильск",
  "population": 2374,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "55.63333",
    "lon": "109.31667"
  },
  "district": "Сибирский",
  "name": "Северобайкальск",
  "population": 24233,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "64.56667",
    "lon": "39.85"
  },
  "district": "Северо-Западный",
  "name": "Северодвинск",
  "population": 157213,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "69.06917",
    "lon": "33.41667"
  },
  "district": "Северо-Западный",
  "name": "Североморск",
  "population": 43327,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "60.15",
    "lon": "59.93333"
  },
  "district": "Уральский",
  "name": "Североуральск",
  "population": 24428,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "56.6",
    "lon": "84.85"
  },
  "district": "Сибирский",
  "name": "Северск",
  "population": 106648,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "52.15",
    "lon": "34.49389"
  },
  "district": "Центральный",
  "name": "Севск",
  "population": 6732,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "63.73333",
    "lon": "34.31667"
  },
  "district": "Северо-Западный",
  "name": "Сегежа",
  "population": 23543,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "53.36944",
    "lon": "34.1"
  },
  "district": "Центральный",
  "name": "Сельцо",
  "population": 15906,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "47.51667",
    "lon": "40.8"
  },
  "district": "Южный",
  "name": "Семикаракорск",
  "population": 21719,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "51.68333",
    "lon": "39.03333"
  },
  "district": "Центральный",
  "name": "Семилуки",
  "population": 27938,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "56.78944",
    "lon": "44.49056"
  },
  "district": "Приволжский",
  "name": "Семёнов",
  "population": 25075,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "53.96667",
    "lon": "48.8"
  },
  "district": "Приволжский",
  "name": "Сенгилей",
  "population": 6407,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "49.58333",
    "lon": "42.73333"
  },
  "district": "Южный",
  "name": "Серафимович",
  "population": 8633,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "55.53333",
    "lon": "45.46667"
  },
  "district": "Приволжский",
  "name": "Сергач",
  "population": 20256,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "56.3",
    "lon": "38.13333"
  },
  "district": "Центральный",
  "name": "Сергиев Посад",
  "population": 101756,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "52.46667",
    "lon": "44.21667"
  },
  "district": "Приволжский",
  "name": "Сердобск",
  "population": 30220,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "59.58333",
    "lon": "60.56667"
  },
  "district": "Уральский",
  "name": "Серов",
  "population": 94211,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "54.91667",
    "lon": "37.4"
  },
  "district": "Центральный",
  "name": "Серпухов",
  "population": 133793,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "60.141613",
    "lon": "30.211879"
  },
  "district": "Северо-Западный",
  "name": "Сертолово",
  "population": 68241,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "60.1",
    "lon": "29.96667"
  },
  "district": "Северо-Западный",
  "name": "Сестрорецк",
  "population": 45192,
  "subject": "Санкт-Петербург"
}, {
  "coordinates": {
    "lat": "52.7",
    "lon": "58.65"
  },
  "district": "Приволжский",
  "name": "Сибай",
  "population": 56514,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "54.98333",
    "lon": "57.68333"
  },
  "district": "Уральский",
  "name": "Сим",
  "population": 12858,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "44.94806",
    "lon": "34.10417"
  },
  "district": "Южный",
  "name": "Симферополь",
  "population": 340540,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "53.98333",
    "lon": "123.93333"
  },
  "district": "Дальневосточный",
  "name": "Сковородино",
  "population": 7057,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "53.81667",
    "lon": "39.55"
  },
  "district": "Центральный",
  "name": "Скопин",
  "population": 25238,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "53",
    "lon": "78.65"
  },
  "district": "Сибирский",
  "name": "Славгород",
  "population": 27900,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "55.05",
    "lon": "21.66667"
  },
  "district": "Северо-Западный",
  "name": "Славск",
  "population": 4153,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "45.25861",
    "lon": "38.12472"
  },
  "district": "Южный",
  "name": "Славянск-на-Кубани",
  "population": 62985,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "59.11779",
    "lon": "28.088145"
  },
  "district": "Северо-Западный",
  "name": "Сланцы",
  "population": 34628,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "58.724167",
    "lon": "50.161167"
  },
  "district": "Приволжский",
  "name": "Слободской",
  "population": 29148,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "51.66667",
    "lon": "103.7"
  },
  "district": "Сибирский",
  "name": "Слюдянка",
  "population": 18058,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "54.78278",
    "lon": "32.04528"
  },
  "district": "Центральный",
  "name": "Смоленск",
  "population": 316570,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "56.08333",
    "lon": "60.73333"
  },
  "district": "Уральский",
  "name": "Снежинск",
  "population": 50619,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "69.19417",
    "lon": "33.23306"
  },
  "district": "Северо-Западный",
  "name": "Снежногорск",
  "population": 9942,
  "subject": "Мурманская область"
}, {
  "coordinates": {
    "lat": "55.99",
    "lon": "40.01667"
  },
  "district": "Центральный",
  "name": "Собинка",
  "population": 17444,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "55.08333",
    "lon": "21.88333"
  },
  "district": "Северо-Западный",
  "name": "Советск",
  "population": 38910,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "57.601306",
    "lon": "48.938611"
  },
  "district": "Приволжский",
  "name": "Советск",
  "population": 14626,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "53.93333",
    "lon": "37.63333"
  },
  "district": "Центральный",
  "name": "Советск",
  "population": 7889,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "48.966373",
    "lon": "140.285189"
  },
  "district": "Дальневосточный",
  "name": "Советская Гавань",
  "population": 24231,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "61.36667",
    "lon": "63.56667"
  },
  "district": "Уральский",
  "name": "Советский",
  "population": 31138,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "59.46667",
    "lon": "40.11667"
  },
  "district": "Северо-Западный",
  "name": "Сокол",
  "population": 34742,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "59.08333",
    "lon": "42.28333"
  },
  "district": "Центральный",
  "name": "Солигалич",
  "population": 5534,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "59.63333",
    "lon": "56.76667"
  },
  "district": "Приволжский",
  "name": "Соликамск",
  "population": 89473,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "56.185114",
    "lon": "36.977618"
  },
  "district": "Центральный",
  "name": "Солнечногорск",
  "population": 48413,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "51.16667",
    "lon": "54.98333"
  },
  "district": "Приволжский",
  "name": "Соль-Илецк",
  "population": 26149,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "61.33333",
    "lon": "46.91667"
  },
  "district": "Северо-Западный",
  "name": "Сольвычегодск",
  "population": 1952,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "58.11667",
    "lon": "30.31667"
  },
  "district": "Северо-Западный",
  "name": "Сольцы",
  "population": 8449,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "52.43333",
    "lon": "53.15"
  },
  "district": "Приволжский",
  "name": "Сорочинск",
  "population": 28478,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "54",
    "lon": "90.25"
  },
  "district": "Сибирский",
  "name": "Сорск",
  "population": 10124,
  "subject": "Хакасия"
}, {
  "coordinates": {
    "lat": "61.7",
    "lon": "30.66667"
  },
  "district": "Северо-Западный",
  "name": "Сортавала",
  "population": 14867,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "54.05",
    "lon": "35.96667"
  },
  "district": "Центральный",
  "name": "Сосенский",
  "population": 11413,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "56.2543",
    "lon": "51.2812"
  },
  "district": "Приволжский",
  "name": "Сосновка",
  "population": 8428,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "56.13333",
    "lon": "93.36667"
  },
  "district": "Сибирский",
  "name": "Сосновоборск",
  "population": 40442,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "59.9",
    "lon": "29.08611"
  },
  "district": "Северо-Западный",
  "name": "Сосновый Бор",
  "population": 65367,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "63.58333",
    "lon": "53.93333"
  },
  "district": "Северо-Западный",
  "name": "Сосногорск",
  "population": 22189,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "43.58528",
    "lon": "39.72028"
  },
  "district": "Южный",
  "name": "Сочи",
  "population": 466078,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "54.409808",
    "lon": "34.018992"
  },
  "district": "Центральный",
  "name": "Спас-Деменск",
  "population": 4569,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.13333",
    "lon": "40.16667"
  },
  "district": "Центральный",
  "name": "Спас-Клепики",
  "population": 4743,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "44.6",
    "lon": "132.81667"
  },
  "district": "Дальневосточный",
  "name": "Спасск-Дальний",
  "population": 35732,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "54.4",
    "lon": "40.38333"
  },
  "district": "Центральный",
  "name": "Спасск-Рязанский",
  "population": 5796,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "53.93333",
    "lon": "43.18333"
  },
  "district": "Приволжский",
  "name": "Спасск",
  "population": 6936,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "67.458",
    "lon": "153.706"
  },
  "district": "Дальневосточный",
  "name": "Среднеколымск",
  "population": 3131,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "56.98333",
    "lon": "60.46667"
  },
  "district": "Уральский",
  "name": "Среднеуральск",
  "population": 23344,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "52.25",
    "lon": "117.71667"
  },
  "district": "Сибирский",
  "name": "Сретенск",
  "population": 6093,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "45.03333",
    "lon": "41.96667"
  },
  "district": "Северо-Кавказский",
  "name": "Ставрополь",
  "population": 547443,
  "subject": "Ставропольский край"
}, {
  "coordinates": {
    "lat": "55.8",
    "lon": "38.18333"
  },
  "district": "Центральный",
  "name": "Старая Купавна",
  "population": 22898,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.98333",
    "lon": "31.35"
  },
  "district": "Северо-Западный",
  "name": "Старая Русса",
  "population": 27487,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "56.51667",
    "lon": "34.93333"
  },
  "district": "Центральный",
  "name": "Старица",
  "population": 6938,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "52.58333",
    "lon": "32.76667"
  },
  "district": "Центральный",
  "name": "Стародуб",
  "population": 17687,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "45.02917",
    "lon": "35.08861"
  },
  "district": "Южный",
  "name": "Старый Крым",
  "population": 10470,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "51.29806",
    "lon": "37.835"
  },
  "district": "Центральный",
  "name": "Старый Оскол",
  "population": 221676,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "53.63333",
    "lon": "55.95"
  },
  "district": "Приволжский",
  "name": "Стерлитамак",
  "population": 277410,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "60.73333",
    "lon": "77.58333"
  },
  "district": "Сибирский",
  "name": "Стрежевой",
  "population": 39169,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "50.78333",
    "lon": "36.48333"
  },
  "district": "Центральный",
  "name": "Строитель",
  "population": 23780,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "56.37333",
    "lon": "38.585"
  },
  "district": "Центральный",
  "name": "Струнино",
  "population": 11774,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "54.88694",
    "lon": "38.07722"
  },
  "district": "Центральный",
  "name": "Ступино",
  "population": 64412,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "54.11667",
    "lon": "36.5"
  },
  "district": "Центральный",
  "name": "Суворов",
  "population": 17598,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "44.85139",
    "lon": "34.9725"
  },
  "district": "Южный",
  "name": "Судак",
  "population": 17834,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "51.190694",
    "lon": "35.27083"
  },
  "district": "Центральный",
  "name": "Суджа",
  "population": 5127,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "55.95",
    "lon": "40.86667"
  },
  "district": "Центральный",
  "name": "Судогда",
  "population": 10408,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "56.42111",
    "lon": "40.44889"
  },
  "district": "Центральный",
  "name": "Суздаль",
  "population": 9286,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "43.313475",
    "lon": "45.051581"
  },
  "district": "Северо-Кавказский",
  "name": "Сунжа",
  "population": 62078,
  "subject": "Ингушетия"
}, {
  "coordinates": {
    "lat": "62.08333",
    "lon": "32.36667"
  },
  "district": "Северо-Западный",
  "name": "Суоярви",
  "population": 7190,
  "subject": "Карелия"
}, {
  "coordinates": {
    "lat": "53.01667",
    "lon": "32.4"
  },
  "district": "Центральный",
  "name": "Сураж",
  "population": 11176,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "61.25",
    "lon": "73.43333"
  },
  "district": "Уральский",
  "name": "Сургут",
  "population": 396443,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "48.6",
    "lon": "42.85"
  },
  "district": "Южный",
  "name": "Суровикино",
  "population": 18227,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "53.08333",
    "lon": "45.7"
  },
  "district": "Приволжский",
  "name": "Сурск",
  "population": 6034,
  "subject": "Пензенская область"
}, {
  "coordinates": {
    "lat": "62.78333",
    "lon": "148.15"
  },
  "district": "Дальневосточный",
  "name": "Сусуман",
  "population": 4439,
  "subject": "Магаданская область"
}, {
  "coordinates": {
    "lat": "54.1",
    "lon": "35.35"
  },
  "district": "Центральный",
  "name": "Сухиничи",
  "population": 14806,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "56.90583",
    "lon": "62.03417"
  },
  "district": "Уральский",
  "name": "Сухой Лог",
  "population": 32748,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "53.16667",
    "lon": "48.46667"
  },
  "district": "Приволжский",
  "name": "Сызрань",
  "population": 165725,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "61.66667",
    "lon": "50.81667"
  },
  "district": "Северо-Западный",
  "name": "Сыктывкар",
  "population": 220580,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "56.5",
    "lon": "60.81667"
  },
  "district": "Уральский",
  "name": "Сысерть",
  "population": 20634,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "55.83333",
    "lon": "34.28333"
  },
  "district": "Центральный",
  "name": "Сычёвка",
  "population": 7544,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "60.137057",
    "lon": "32.561279"
  },
  "district": "Северо-Западный",
  "name": "Сясьстрой",
  "population": 12566,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "58.05",
    "lon": "65.26667"
  },
  "district": "Уральский",
  "name": "Тавда",
  "population": 32749,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "47.23917",
    "lon": "38.88333"
  },
  "district": "Южный",
  "name": "Таганрог",
  "population": 245120,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "56.06667",
    "lon": "85.61667"
  },
  "district": "Сибирский",
  "name": "Тайга",
  "population": 22375,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "55.93333",
    "lon": "98.01667"
  },
  "district": "Сибирский",
  "name": "Тайшет",
  "population": 34491,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "56.73333",
    "lon": "37.53333"
  },
  "district": "Центральный",
  "name": "Талдом",
  "population": 17317,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.0125",
    "lon": "63.72917"
  },
  "district": "Уральский",
  "name": "Талица",
  "population": 14808,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "52.71667",
    "lon": "41.43333"
  },
  "district": "Центральный",
  "name": "Тамбов",
  "population": 261803,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "56.902383",
    "lon": "74.37079"
  },
  "district": "Сибирский",
  "name": "Тара",
  "population": 26878,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "64.91472",
    "lon": "77.77278"
  },
  "district": "Уральский",
  "name": "Тарко-Сале",
  "population": 19900,
  "subject": "Ямало-Ненецкий АО"
}, {
  "coordinates": {
    "lat": "54.71667",
    "lon": "37.18333"
  },
  "district": "Центральный",
  "name": "Таруса",
  "population": 9918,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.21667",
    "lon": "75.96667"
  },
  "district": "Сибирский",
  "name": "Татарск",
  "population": 23711,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "52.76667",
    "lon": "87.86667"
  },
  "district": "Сибирский",
  "name": "Таштагол",
  "population": 21980,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "56.8578278",
    "lon": "35.9219278"
  },
  "district": "Центральный",
  "name": "Тверь",
  "population": 416219,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "43.449437",
    "lon": "41.74382"
  },
  "district": "Северо-Кавказский",
  "name": "Теберда",
  "population": 9020,
  "subject": "Карачаево-Черкесия"
}, {
  "coordinates": {
    "lat": "56.85",
    "lon": "40.55"
  },
  "district": "Центральный",
  "name": "Тейково",
  "population": 31305,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "54.63333",
    "lon": "43.21667"
  },
  "district": "Приволжский",
  "name": "Темников",
  "population": 6451,
  "subject": "Мордовия"
}, {
  "coordinates": {
    "lat": "45.26667",
    "lon": "37.38333"
  },
  "district": "Южный",
  "name": "Темрюк",
  "population": 41608,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "43.483317",
    "lon": "44.138871"
  },
  "district": "Северо-Кавказский",
  "name": "Терек",
  "population": 19948,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "54.93333",
    "lon": "48.83333"
  },
  "district": "Приволжский",
  "name": "Тетюши",
  "population": 10535,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "45.61667",
    "lon": "38.93333"
  },
  "district": "Южный",
  "name": "Тимашёвск",
  "population": 51858,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "59.644213",
    "lon": "33.542105"
  },
  "district": "Северо-Западный",
  "name": "Тихвин",
  "population": 55415,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "45.85",
    "lon": "40.11667"
  },
  "district": "Южный",
  "name": "Тихорецк",
  "population": 55686,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "58.19528",
    "lon": "68.25806"
  },
  "district": "Уральский",
  "name": "Тобольск",
  "population": 100352,
  "subject": "Тюменская область"
}, {
  "coordinates": {
    "lat": "55.23333",
    "lon": "84.38333"
  },
  "district": "Сибирский",
  "name": "Тогучин",
  "population": 20766,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "53.516666666667",
    "lon": "49.416666666667"
  },
  "district": "Приволжский",
  "name": "Тольятти",
  "population": 684709,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "47.76667",
    "lon": "142.06667"
  },
  "district": "Дальневосточный",
  "name": "Томари",
  "population": 4313,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "58.96667",
    "lon": "126.26667"
  },
  "district": "Дальневосточный",
  "name": "Томмот",
  "population": 6440,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "56.48861",
    "lon": "84.95222"
  },
  "district": "Сибирский",
  "name": "Томск",
  "population": 556478,
  "subject": "Томская область"
}, {
  "coordinates": {
    "lat": "55.28333",
    "lon": "85.61667"
  },
  "district": "Сибирский",
  "name": "Топки",
  "population": 27158,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "57.03333",
    "lon": "34.96667"
  },
  "district": "Центральный",
  "name": "Торжок",
  "population": 41116,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "56.5",
    "lon": "31.63333"
  },
  "district": "Центральный",
  "name": "Торопец",
  "population": 11441,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "59.541179",
    "lon": "30.875006"
  },
  "district": "Северо-Западный",
  "name": "Тосно",
  "population": 34066,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "59.98333",
    "lon": "42.76667"
  },
  "district": "Северо-Западный",
  "name": "Тотьма",
  "population": 8669,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "55.467",
    "lon": "37.3"
  },
  "district": "Центральный",
  "name": "Троицк",
  "population": 65043,
  "subject": "Москва"
}, {
  "coordinates": {
    "lat": "54.08333",
    "lon": "61.56667"
  },
  "district": "Уральский",
  "name": "Троицк",
  "population": 70301,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "52.58333",
    "lon": "33.76667"
  },
  "district": "Центральный",
  "name": "Трубчевск",
  "population": 13287,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "54.8",
    "lon": "58.45"
  },
  "district": "Уральский",
  "name": "Трёхгорный",
  "population": 32463,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "44.100016",
    "lon": "39.083223"
  },
  "district": "Южный",
  "name": "Туапсе",
  "population": 61571,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "54.6",
    "lon": "53.7"
  },
  "district": "Приволжский",
  "name": "Туймазы",
  "population": 68349,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "54.2",
    "lon": "37.61667"
  },
  "district": "Центральный",
  "name": "Тула",
  "population": 473622,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "54.56667",
    "lon": "100.56667"
  },
  "district": "Сибирский",
  "name": "Тулун",
  "population": 38440,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "52.1446",
    "lon": "93.9181"
  },
  "district": "Сибирский",
  "name": "Туран",
  "population": 5044,
  "subject": "Тыва"
}, {
  "coordinates": {
    "lat": "58.03333",
    "lon": "63.7"
  },
  "district": "Уральский",
  "name": "Туринск",
  "population": 16561,
  "subject": "Свердловская область"
}, {
  "coordinates": {
    "lat": "57.88333",
    "lon": "39.53333"
  },
  "district": "Центральный",
  "name": "Тутаев",
  "population": 39643,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "55.15",
    "lon": "124.71667"
  },
  "district": "Дальневосточный",
  "name": "Тында",
  "population": 28625,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "43.3892665",
    "lon": "42.9189065"
  },
  "district": "Северо-Кавказский",
  "name": "Тырныауз",
  "population": 22056,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "55.86667",
    "lon": "72.2"
  },
  "district": "Сибирский",
  "name": "Тюкалинск",
  "population": 9894,
  "subject": "Омская область"
}, {
  "coordinates": {
    "lat": "57.15",
    "lon": "65.53333"
  },
  "district": "Уральский",
  "name": "Тюмень",
  "population": 847488,
  "subject": "Тюменская область"
}, {
  "coordinates": {
    "lat": "51.98333",
    "lon": "42.26667"
  },
  "district": "Центральный",
  "name": "Уварово",
  "population": 23584,
  "subject": "Тамбовская область"
}, {
  "coordinates": {
    "lat": "49.06667",
    "lon": "142.03333"
  },
  "district": "Дальневосточный",
  "name": "Углегорск",
  "population": 8041,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "57.53333",
    "lon": "38.33333"
  },
  "district": "Центральный",
  "name": "Углич",
  "population": 32719,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "66.4",
    "lon": "112.3"
  },
  "district": "Дальневосточный",
  "name": "Удачный",
  "population": 12930,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "57.88333",
    "lon": "35.01667"
  },
  "district": "Центральный",
  "name": "Удомля",
  "population": 25950,
  "subject": "Тверская область"
}, {
  "coordinates": {
    "lat": "55.31667",
    "lon": "89.81667"
  },
  "district": "Сибирский",
  "name": "Ужур",
  "population": 14134,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "53.9791417",
    "lon": "38.1600833"
  },
  "district": "Центральный",
  "name": "Узловая",
  "population": 49427,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "51.83333",
    "lon": "107.61667"
  },
  "district": "Сибирский",
  "name": "Улан-Удэ",
  "population": 437565,
  "subject": "Бурятия"
}, {
  "coordinates": {
    "lat": "54.316666666667",
    "lon": "48.366666666667"
  },
  "district": "Приволжский",
  "name": "Ульяновск",
  "population": 617352,
  "subject": "Ульяновская область"
}, {
  "coordinates": {
    "lat": "52.85",
    "lon": "32.68333"
  },
  "district": "Центральный",
  "name": "Унеча",
  "population": 24274,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "60.13333",
    "lon": "64.78333"
  },
  "district": "Уральский",
  "name": "Урай",
  "population": 41315,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "57.46667",
    "lon": "45.78333"
  },
  "district": "Приволжский",
  "name": "Урень",
  "population": 12450,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "57.11667",
    "lon": "50"
  },
  "district": "Приволжский",
  "name": "Уржум",
  "population": 8448,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "43.129123",
    "lon": "45.54167"
  },
  "district": "Северо-Кавказский",
  "name": "Урус-Мартан",
  "population": 63449,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "50.8",
    "lon": "42.01667"
  },
  "district": "Южный",
  "name": "Урюпинск",
  "population": 36669,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "65.995028",
    "lon": "57.557139"
  },
  "district": "Северо-Западный",
  "name": "Усинск",
  "population": 32182,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "52.05",
    "lon": "39.73333"
  },
  "district": "Центральный",
  "name": "Усмань",
  "population": 19662,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "52.75",
    "lon": "103.65"
  },
  "district": "Сибирский",
  "name": "Усолье-Сибирское",
  "population": 74762,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "59.41667",
    "lon": "56.68333"
  },
  "district": "Приволжский",
  "name": "Усолье",
  "population": 6619,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "43.8",
    "lon": "131.95"
  },
  "district": "Дальневосточный",
  "name": "Уссурийск",
  "population": 180393,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "44.08611",
    "lon": "41.97194"
  },
  "district": "Северо-Кавказский",
  "name": "Усть-Джегута",
  "population": 31137,
  "subject": "Карачаево-Черкесия"
}, {
  "coordinates": {
    "lat": "58",
    "lon": "102.66667"
  },
  "district": "Сибирский",
  "name": "Усть-Илимск",
  "population": 79570,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "54.93333",
    "lon": "58.16667"
  },
  "district": "Уральский",
  "name": "Усть-Катав",
  "population": 21439,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "56.8",
    "lon": "105.83333"
  },
  "district": "Сибирский",
  "name": "Усть-Кут",
  "population": 36918,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "45.21528",
    "lon": "39.68944"
  },
  "district": "Южный",
  "name": "Усть-Лабинск",
  "population": 40158,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "58.83333",
    "lon": "36.43333"
  },
  "district": "Северо-Западный",
  "name": "Устюжна",
  "population": 7843,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "54.73333",
    "lon": "55.96667"
  },
  "district": "Приволжский",
  "name": "Уфа",
  "population": 1144809,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "63.56667",
    "lon": "53.7"
  },
  "district": "Северо-Западный",
  "name": "Ухта",
  "population": 79899,
  "subject": "Коми"
}, {
  "coordinates": {
    "lat": "54.31667",
    "lon": "59.38333"
  },
  "district": "Приволжский",
  "name": "Учалы",
  "population": 36175,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "55.81667",
    "lon": "94.31667"
  },
  "district": "Сибирский",
  "name": "Уяр",
  "population": 12036,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "52.08944",
    "lon": "35.85889"
  },
  "district": "Центральный",
  "name": "Фатеж",
  "population": 4691,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "45.04889",
    "lon": "35.37917"
  },
  "district": "Южный",
  "name": "Феодосия",
  "population": 66293,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "53.45",
    "lon": "34.41667"
  },
  "district": "Центральный",
  "name": "Фокино",
  "population": 12538,
  "subject": "Брянская область"
}, {
  "coordinates": {
    "lat": "42.96667",
    "lon": "132.4"
  },
  "district": "Дальневосточный",
  "name": "Фокино",
  "population": 19711,
  "subject": "Приморский край"
}, {
  "coordinates": {
    "lat": "49.76667",
    "lon": "43.65"
  },
  "district": "Южный",
  "name": "Фролово",
  "population": 35661,
  "subject": "Волгоградская область"
}, {
  "coordinates": {
    "lat": "55.95",
    "lon": "38.05"
  },
  "district": "Центральный",
  "name": "Фрязино",
  "population": 60580,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.25",
    "lon": "41.1"
  },
  "district": "Центральный",
  "name": "Фурманов",
  "population": 29715,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "48.48333",
    "lon": "135.06667"
  },
  "district": "Дальневосточный",
  "name": "Хабаровск",
  "population": 617441,
  "subject": "Хабаровский край"
}, {
  "coordinates": {
    "lat": "44.42389",
    "lon": "39.53722"
  },
  "district": "Южный",
  "name": "Хадыженск",
  "population": 22094,
  "subject": "Краснодарский край"
}, {
  "coordinates": {
    "lat": "61",
    "lon": "69"
  },
  "district": "Уральский",
  "name": "Ханты-Мансийск",
  "population": 107473,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "47.4",
    "lon": "47.25"
  },
  "district": "Южный",
  "name": "Харабали",
  "population": 18514,
  "subject": "Астраханская область"
}, {
  "coordinates": {
    "lat": "59.95",
    "lon": "40.2"
  },
  "district": "Северо-Западный",
  "name": "Харовск",
  "population": 8389,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "43.249937",
    "lon": "46.583247"
  },
  "district": "Северо-Кавказский",
  "name": "Хасавюрт",
  "population": 155144,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "52.48333",
    "lon": "48.1"
  },
  "district": "Приволжский",
  "name": "Хвалынск",
  "population": 12042,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "51.35",
    "lon": "110.45"
  },
  "district": "Сибирский",
  "name": "Хилок",
  "population": 9948,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "55.88917",
    "lon": "37.445"
  },
  "district": "Центральный",
  "name": "Химки",
  "population": 257128,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "57.15",
    "lon": "31.18333"
  },
  "district": "Северо-Западный",
  "name": "Холм",
  "population": 3214,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "47.04028",
    "lon": "142.04306"
  },
  "district": "Дальневосточный",
  "name": "Холмск",
  "population": 25677,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "56.25",
    "lon": "37.98333"
  },
  "district": "Центральный",
  "name": "Хотьково",
  "population": 20466,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.86667",
    "lon": "47.48333"
  },
  "district": "Приволжский",
  "name": "Цивильск",
  "population": 12762,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "47.64667",
    "lon": "42.09472"
  },
  "district": "Южный",
  "name": "Цимлянск",
  "population": 14731,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "51.7602528",
    "lon": "128.121175"
  },
  "district": "Дальневосточный",
  "name": "Циолковский",
  "population": 7194,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "51.28333",
    "lon": "91.56667"
  },
  "district": "Сибирский",
  "name": "Чадан",
  "population": 9732,
  "subject": "Тыва"
}, {
  "coordinates": {
    "lat": "56.773291",
    "lon": "54.140386"
  },
  "district": "Приволжский",
  "name": "Чайковский",
  "population": 75837,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "52.98333",
    "lon": "49.71667"
  },
  "district": "Приволжский",
  "name": "Чапаевск",
  "population": 70228,
  "subject": "Самарская область"
}, {
  "coordinates": {
    "lat": "53.24167",
    "lon": "39.96667"
  },
  "district": "Центральный",
  "name": "Чаплыгин",
  "population": 11579,
  "subject": "Липецкая область"
}, {
  "coordinates": {
    "lat": "54.97778",
    "lon": "60.37"
  },
  "district": "Уральский",
  "name": "Чебаркуль",
  "population": 44693,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "56.11667",
    "lon": "47.23333"
  },
  "district": "Приволжский",
  "name": "Чебоксары",
  "population": 497807,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "43.566657",
    "lon": "43.583325"
  },
  "district": "Северо-Кавказский",
  "name": "Чегем",
  "population": 20736,
  "subject": "Кабардино-Балкария"
}, {
  "coordinates": {
    "lat": "54.1",
    "lon": "36.25"
  },
  "district": "Центральный",
  "name": "Чекалин",
  "population": 935,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "55.15",
    "lon": "61.4"
  },
  "district": "Уральский",
  "name": "Челябинск",
  "population": 1189525,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "60.4",
    "lon": "56.48333"
  },
  "district": "Приволжский",
  "name": "Чердынь",
  "population": 4590,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "53.15",
    "lon": "103.06667"
  },
  "district": "Сибирский",
  "name": "Черемхово",
  "population": 53958,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "54.21667",
    "lon": "83.36667"
  },
  "district": "Сибирский",
  "name": "Черепаново",
  "population": 19900,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "59.11667",
    "lon": "37.9"
  },
  "district": "Северо-Западный",
  "name": "Череповец",
  "population": 305185,
  "subject": "Вологодская область"
}, {
  "coordinates": {
    "lat": "44.213888",
    "lon": "42.04431"
  },
  "district": "Северо-Кавказский",
  "name": "Черкесск",
  "population": 113226,
  "subject": "Карачаево-Черкесия"
}, {
  "coordinates": {
    "lat": "56.01472",
    "lon": "38.38972"
  },
  "district": "Центральный",
  "name": "Черноголовка",
  "population": 19530,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "53.81667",
    "lon": "91.28333"
  },
  "district": "Сибирский",
  "name": "Черногорск",
  "population": 75745,
  "subject": "Хакасия"
}, {
  "coordinates": {
    "lat": "56.5",
    "lon": "56.08333"
  },
  "district": "Приволжский",
  "name": "Чернушка",
  "population": 32991,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "54.63333",
    "lon": "21.81667"
  },
  "district": "Северо-Западный",
  "name": "Черняховск",
  "population": 36128,
  "subject": "Калининградская область"
}, {
  "coordinates": {
    "lat": "55.145",
    "lon": "37.45556"
  },
  "district": "Центральный",
  "name": "Чехов",
  "population": 89025,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.36667",
    "lon": "50.63333"
  },
  "district": "Приволжский",
  "name": "Чистополь",
  "population": 58815,
  "subject": "Татарстан"
}, {
  "coordinates": {
    "lat": "52.03333",
    "lon": "113.5"
  },
  "district": "Сибирский",
  "name": "Чита",
  "population": 334427,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "56.76667",
    "lon": "43.25"
  },
  "district": "Приволжский",
  "name": "Чкаловск",
  "population": 11535,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "59.12806",
    "lon": "31.65917"
  },
  "district": "Северо-Западный",
  "name": "Чудово",
  "population": 14302,
  "subject": "Новгородская область"
}, {
  "coordinates": {
    "lat": "55.1",
    "lon": "80.96667"
  },
  "district": "Сибирский",
  "name": "Чулым",
  "population": 11034,
  "subject": "Новосибирская область"
}, {
  "coordinates": {
    "lat": "58.28333",
    "lon": "57.81667"
  },
  "district": "Приволжский",
  "name": "Чусовой",
  "population": 45471,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "58.75",
    "lon": "42.7"
  },
  "district": "Центральный",
  "name": "Чухлома",
  "population": 4252,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "58.78333",
    "lon": "56.15"
  },
  "district": "Приволжский",
  "name": "Чёрмоз",
  "population": 3044,
  "subject": "Пермский край"
}, {
  "coordinates": {
    "lat": "51.53333",
    "lon": "92.9"
  },
  "district": "Сибирский",
  "name": "Шагонар",
  "population": 11772,
  "subject": "Тыва"
}, {
  "coordinates": {
    "lat": "56.08333",
    "lon": "63.63333"
  },
  "district": "Уральский",
  "name": "Шадринск",
  "population": 68609,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "43.145",
    "lon": "45.903847"
  },
  "district": "Северо-Кавказский",
  "name": "Шали",
  "population": 55054,
  "subject": "Чечня"
}, {
  "coordinates": {
    "lat": "55.525",
    "lon": "89.2"
  },
  "district": "Сибирский",
  "name": "Шарыпово",
  "population": 33961,
  "subject": "Красноярский край"
}, {
  "coordinates": {
    "lat": "58.36667",
    "lon": "45.5"
  },
  "district": "Центральный",
  "name": "Шарья",
  "population": 20439,
  "subject": "Костромская область"
}, {
  "coordinates": {
    "lat": "55.5776722",
    "lon": "39.5446333"
  },
  "district": "Центральный",
  "name": "Шатура",
  "population": 38230,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "47.7122111",
    "lon": "40.2083694"
  },
  "district": "Южный",
  "name": "Шахты",
  "population": 226452,
  "subject": "Ростовская область"
}, {
  "coordinates": {
    "lat": "57.67472",
    "lon": "46.62083"
  },
  "district": "Приволжский",
  "name": "Шахунья",
  "population": 17626,
  "subject": "Нижегородская область"
}, {
  "coordinates": {
    "lat": "54.03333",
    "lon": "41.7"
  },
  "district": "Центральный",
  "name": "Шацк",
  "population": 5927,
  "subject": "Рязанская область"
}, {
  "coordinates": {
    "lat": "50.40778",
    "lon": "36.89694"
  },
  "district": "Центральный",
  "name": "Шебекино",
  "population": 39680,
  "subject": "Белгородская область"
}, {
  "coordinates": {
    "lat": "52.2",
    "lon": "104.1"
  },
  "district": "Сибирский",
  "name": "Шелехов",
  "population": 41998,
  "subject": "Иркутская область"
}, {
  "coordinates": {
    "lat": "62.1",
    "lon": "42.9"
  },
  "district": "Северо-Западный",
  "name": "Шенкурск",
  "population": 4600,
  "subject": "Архангельская область"
}, {
  "coordinates": {
    "lat": "51.85",
    "lon": "116.03333"
  },
  "district": "Сибирский",
  "name": "Шилка",
  "population": 12046,
  "subject": "Забайкальский край"
}, {
  "coordinates": {
    "lat": "52",
    "lon": "127.66667"
  },
  "district": "Дальневосточный",
  "name": "Шимановск",
  "population": 16488,
  "subject": "Амурская область"
}, {
  "coordinates": {
    "lat": "52.1137809",
    "lon": "47.199229"
  },
  "district": "Приволжский",
  "name": "Шиханы",
  "population": 5155,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "59.944959",
    "lon": "31.034754"
  },
  "district": "Северо-Западный",
  "name": "Шлиссельбург",
  "population": 14131,
  "subject": "Ленинградская область"
}, {
  "coordinates": {
    "lat": "55.5",
    "lon": "46.41667"
  },
  "district": "Приволжский",
  "name": "Шумерля",
  "population": 26873,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "55.23333",
    "lon": "63.28333"
  },
  "district": "Уральский",
  "name": "Шумиха",
  "population": 16264,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "56.85",
    "lon": "41.36667"
  },
  "district": "Центральный",
  "name": "Шуя",
  "population": 55225,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "55.5",
    "lon": "37.56667"
  },
  "district": "Центральный",
  "name": "Щербинка",
  "population": 56531,
  "subject": "Москва"
}, {
  "coordinates": {
    "lat": "51.88111",
    "lon": "36.90306"
  },
  "district": "Центральный",
  "name": "Щигры",
  "population": 14927,
  "subject": "Курская область"
}, {
  "coordinates": {
    "lat": "55.21667",
    "lon": "62.76667"
  },
  "district": "Уральский",
  "name": "Щучье",
  "population": 8252,
  "subject": "Курганская область"
}, {
  "coordinates": {
    "lat": "54",
    "lon": "37.51667"
  },
  "district": "Центральный",
  "name": "Щёкино",
  "population": 55109,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "45.42361",
    "lon": "35.81861"
  },
  "district": "Южный",
  "name": "Щёлкино",
  "population": 10131,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "55.91667",
    "lon": "38"
  },
  "district": "Центральный",
  "name": "Щёлково",
  "population": 134211,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.88333",
    "lon": "38.78333"
  },
  "district": "Центральный",
  "name": "Электрогорск",
  "population": 29982,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.8",
    "lon": "38.45"
  },
  "district": "Центральный",
  "name": "Электросталь",
  "population": 146403,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "55.71667",
    "lon": "38.21667"
  },
  "district": "Центральный",
  "name": "Электроугли",
  "population": 17944,
  "subject": "Московская область"
}, {
  "coordinates": {
    "lat": "46.31667",
    "lon": "44.26667"
  },
  "district": "Южный",
  "name": "Элиста",
  "population": 102583,
  "subject": "Калмыкия"
}, {
  "coordinates": {
    "lat": "51.46667",
    "lon": "46.11667"
  },
  "district": "Приволжский",
  "name": "Энгельс",
  "population": 225428,
  "subject": "Саратовская область"
}, {
  "coordinates": {
    "lat": "51.83333",
    "lon": "40.8"
  },
  "district": "Центральный",
  "name": "Эртиль",
  "population": 10024,
  "subject": "Воронежская область"
}, {
  "coordinates": {
    "lat": "61.31667",
    "lon": "63.35"
  },
  "district": "Уральский",
  "name": "Югорск",
  "population": 38238,
  "subject": "Ханты-Мансийский АО"
}, {
  "coordinates": {
    "lat": "56.58333",
    "lon": "42.01667"
  },
  "district": "Центральный",
  "name": "Южа",
  "population": 12957,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "46.95",
    "lon": "142.73333"
  },
  "district": "Дальневосточный",
  "name": "Южно-Сахалинск",
  "population": 181587,
  "subject": "Сахалинская область"
}, {
  "coordinates": {
    "lat": "44.66667",
    "lon": "45.65"
  },
  "district": "Северо-Кавказский",
  "name": "Южно-Сухокумск",
  "population": 10503,
  "subject": "Дагестан"
}, {
  "coordinates": {
    "lat": "54.45",
    "lon": "61.25"
  },
  "district": "Уральский",
  "name": "Южноуральск",
  "population": 37478,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "55.73333",
    "lon": "84.9"
  },
  "district": "Сибирский",
  "name": "Юрга",
  "population": 79693,
  "subject": "Кемеровская область"
}, {
  "coordinates": {
    "lat": "56.5",
    "lon": "39.68333"
  },
  "district": "Центральный",
  "name": "Юрьев-Польский",
  "population": 17276,
  "subject": "Владимирская область"
}, {
  "coordinates": {
    "lat": "57.31667",
    "lon": "43.1"
  },
  "district": "Центральный",
  "name": "Юрьевец",
  "population": 7899,
  "subject": "Ивановская область"
}, {
  "coordinates": {
    "lat": "54.86667",
    "lon": "58.43333"
  },
  "district": "Уральский",
  "name": "Юрюзань",
  "population": 10284,
  "subject": "Челябинская область"
}, {
  "coordinates": {
    "lat": "54.75",
    "lon": "35.23333"
  },
  "district": "Центральный",
  "name": "Юхнов",
  "population": 6610,
  "subject": "Калужская область"
}, {
  "coordinates": {
    "lat": "55.95",
    "lon": "46.2"
  },
  "district": "Приволжский",
  "name": "Ядрин",
  "population": 7918,
  "subject": "Чувашия"
}, {
  "coordinates": {
    "lat": "62.027222222222",
    "lon": "129.73194444444"
  },
  "district": "Дальневосточный",
  "name": "Якутск",
  "population": 355443,
  "subject": "Якутия"
}, {
  "coordinates": {
    "lat": "44.49944",
    "lon": "34.15528"
  },
  "district": "Южный",
  "name": "Ялта",
  "population": 74652,
  "subject": "Крым"
}, {
  "coordinates": {
    "lat": "56.65",
    "lon": "66.3"
  },
  "district": "Уральский",
  "name": "Ялуторовск",
  "population": 38853,
  "subject": "Тюменская область"
}, {
  "coordinates": {
    "lat": "56.26667",
    "lon": "54.93333"
  },
  "district": "Приволжский",
  "name": "Янаул",
  "population": 25908,
  "subject": "Башкортостан"
}, {
  "coordinates": {
    "lat": "57.303306",
    "lon": "47.868806"
  },
  "district": "Приволжский",
  "name": "Яранск",
  "population": 14284,
  "subject": "Кировская область"
}, {
  "coordinates": {
    "lat": "52.93333",
    "lon": "78.58333"
  },
  "district": "Сибирский",
  "name": "Яровое",
  "population": 16424,
  "subject": "Алтайский край"
}, {
  "coordinates": {
    "lat": "57.61667",
    "lon": "39.85"
  },
  "district": "Центральный",
  "name": "Ярославль",
  "population": 577279,
  "subject": "Ярославская область"
}, {
  "coordinates": {
    "lat": "55.06667",
    "lon": "32.68333"
  },
  "district": "Центральный",
  "name": "Ярцево",
  "population": 41452,
  "subject": "Смоленская область"
}, {
  "coordinates": {
    "lat": "54.4793833",
    "lon": "37.6933556"
  },
  "district": "Центральный",
  "name": "Ясногорск",
  "population": 15269,
  "subject": "Тульская область"
}, {
  "coordinates": {
    "lat": "51.03333",
    "lon": "59.86667"
  },
  "district": "Приволжский",
  "name": "Ясный",
  "population": 15471,
  "subject": "Оренбургская область"
}, {
  "coordinates": {
    "lat": "56.28333",
    "lon": "37.48333"
  },
  "district": "Центральный",
  "name": "Яхрома",
  "population": 14011,
  "subject": "Московская область"
}];

/***/ }),

/***/ "./src/citiesTwo.js":
/*!**************************!*\
  !*** ./src/citiesTwo.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   citiesTwo: () => (/* binding */ citiesTwo)
/* harmony export */ });
const citiesTwo = [{
  "name": "Орша",
  "coordinates": [30.4192, 54.5131]
}, {
  "name": "Горки",
  "coordinates": [30.9844, 54.2783]
}, {
  "name": "Шклов",
  "coordinates": [30.2258, 54.2225]
}, {
  "name": "Жодино",
  "coordinates": [28.0022, 54.1117]
}, {
  "name": "Заславль",
  "coordinates": [27.2939, 53.9856]
}, {
  "name": "Воложин",
  "coordinates": [26.535, 54.0958]
}, {
  "name": "Лида",
  "coordinates": [25.2994, 53.8928]
}, {
  "name": "Ошмяны",
  "coordinates": [25.9644, 54.4328]
}, {
  "name": "Тракай",
  "coordinates": [24.9333, 54.6333]
}, {
  "name": "Каунас",
  "coordinates": [23.8817, 54.8986]
}, {
  "name": "Запорожье",
  "coordinates": [35.1394, 47.8389]
}, {
  "name": "Николаев",
  "coordinates": [31.9922, 46.9653]
}, {
  "name": "Одесса",
  "coordinates": [30.7326, 46.4775]
}, {
  "name": "Велиж",
  "coordinates": [31.1814, 55.4753]
}, {
  "name": "Торопец",
  "coordinates": [31.6114, 56.4961]
}, {
  "name": "Черкассы",
  "coordinates": [32.0608, 49.4447]
}, {
  "name": "Чигирин",
  "coordinates": [32.6506, 49.0789]
}, {
  "name": "Звенигородка",
  "coordinates": [30.9647, 49.0719]
}, {
  "name": "Корсунь-Шевченковский",
  "coordinates": [31.2517, 49.4289]
}, {
  "name": "Ярцево",
  "coordinates": [32.6622, 55.0642]
}, {
  "name": "Дорогобуж",
  "coordinates": [33.2717, 54.9389]
}, {
  "name": "Ельня",
  "coordinates": [33.1833, 54.5019]
}, {
  "name": "Ярославль",
  "coordinates": [39.8975, 57.6297]
}, {
  "name": "Руза",
  "coordinates": [36.1997, 55.7008]
}, {
  "name": "Наро-Фоминск",
  "coordinates": [36.7206, 55.3814]
}, {
  "name": "Одинцово",
  "coordinates": [37.2672, 55.6753]
}, {
  "name": "Зубцов",
  "coordinates": [34.9611, 56.1731]
}, {
  "name": "Ржев",
  "coordinates": [34.3253, 56.2581]
}, {
  "name": "Сычевка",
  "coordinates": [34.2964, 55.8375]
}, {
  "name": "Барятино",
  "coordinates": [34.8578, 54.3603]
}, {
  "name": "Ульяново",
  "coordinates": [34.7564, 54.1439]
}, {
  "name": "Белев",
  "coordinates": [36.4803, 53.8011]
}, {
  "name": "Хотьково",
  "coordinates": [38.0469, 56.245]
}, {
  "name": "Жиздра",
  "coordinates": [34.7492, 53.7544]
}, {
  "name": "Болхов",
  "coordinates": [36.2764, 53.4556]
}, {
  "name": "Мценск",
  "coordinates": [36.5442, 53.2719]
}, {
  "name": "Ленинград",
  "coordinates": [30.3351, 59.9343]
}, {
  "name": "Елгава",
  "coordinates": [24.0964, 56.6511]
}, {
  "name": "Лиепая",
  "coordinates": [21.0089, 56.5047]
}, {
  "name": "Кулдига",
  "coordinates": [21.9689, 56.9719]
}, {
  "name": "Бауска",
  "coordinates": [24.4167, 56.4044]
}, {
  "name": "Тукумс",
  "coordinates": [23.1586, 56.9714]
}, {
  "name": "Вентспилс",
  "coordinates": [21.5633, 57.3894]
}, {
  "name": "Саласпилс",
  "coordinates": [24.3506, 56.8581]
}, {
  "name": "Рига",
  "coordinates": [24.1052, 56.9496]
}, {
  "name": "Брест",
  "coordinates": [23.6886, 52.0975]
}, {
  "name": "Коростень",
  "coordinates": [28.6356, 50.9536]
}, {
  "name": "Смолевичи",
  "coordinates": [27.6467, 54.0481]
}, {
  "name": "Минск",
  "coordinates": [27.5617, 53.9022]
}, {
  "name": "Волгоград",
  "coordinates": [44.5172, 48.7081]
}, {
  "name": "Сумы",
  "coordinates": [34.8006, 50.9086]
}, {
  "name": "Курск",
  "coordinates": [36.1822, 51.7353]
}, {
  "name": "Мукачево",
  "coordinates": [22.7192, 48.4478]
}, {
  "name": "Львов",
  "coordinates": [24.0297, 49.8428]
}, {
  "name": "Ровно",
  "coordinates": [26.2511, 50.6197]
}, {
  "name": "Харьков",
  "coordinates": [36.25, 50.0]
}, {
  "name": "Полтава",
  "coordinates": [34.5528, 49.5886]
}, {
  "name": "Кременчуг",
  "coordinates": [33.4375, 49.0628]
}, {
  "name": "Полоцк",
  "coordinates": [28.7803, 55.4853]
}, {
  "name": "Витебск",
  "coordinates": [30.2056, 55.1878]
}, {
  "name": "Можга",
  "coordinates": [52.4333, 56.4167]
}, {
  "name": "Бугульма",
  "coordinates": [52.8061, 54.5325]
}, {
  "name": "Калуга",
  "coordinates": [36.2597, 54.5108]
}, {
  "name": "Ульяновск",
  "coordinates": [48.3747, 54.3078]
}, {
  "name": "Куйбышев",
  "coordinates": [53.7508, 56.2778]
}, {
  "name": "Великие Луки",
  "coordinates": [30.5256, 56.3419]
}, {
  "name": "Остров",
  "coordinates": [28.3556, 57.3581]
}, {
  "name": "Псков",
  "coordinates": [28.3603, 57.8186]
}, {
  "name": "Тарту",
  "coordinates": [26.7167, 58.3833]
}, {
  "name": "Таллин",
  "coordinates": [24.7536, 59.437]
}, {
  "name": "Калининград",
  "coordinates": [20.5108, 54.7064]
}, {
  "name": "Мичуринск",
  "coordinates": [40.4967, 52.8942]
}, {
  "name": "Воронеж",
  "coordinates": [39.2003, 51.6608]
}, {
  "name": "Липецк",
  "coordinates": [39.6067, 52.6136]
}, {
  "name": "Брянск",
  "coordinates": [34.3664, 53.2425]
}, {
  "name": "Гомель",
  "coordinates": [30.9628, 52.4342]
}, {
  "name": "Прилуки",
  "coordinates": [32.5628, 50.595]
}, {
  "name": "Альметьевск",
  "coordinates": [52.2978, 54.9003]
}, {
  "name": "Лениногорск",
  "coordinates": [52.4342, 54.6006]
}, {
  "name": "Донецк",
  "coordinates": [37.8047, 48.0228]
}, {
  "name": "Тюмень",
  "coordinates": [65.5342, 57.1522]
}, {
  "name": "Нефтеюганск",
  "coordinates": [72.6325, 61.0964]
}, {
  "name": "Мегион",
  "coordinates": [76.1006, 61.0331]
}, {
  "name": "Нижневартовск",
  "coordinates": [76.5392, 60.9342]
}, {
  "name": "Сургут",
  "coordinates": [73.4167, 61.25]
}, {
  "name": "Оренбург",
  "coordinates": [55.1011, 51.7669]
}, {
  "name": "Кострома",
  "coordinates": [40.8139, 57.7669]
}, {
  "name": "Чебоксары",
  "coordinates": [47.2353, 56.1167]
}, {
  "name": "Иваново",
  "coordinates": [40.9739, 57.0]
}, {
  "name": "Ош",
  "coordinates": [72.7983, 40.5186]
}, {
  "name": "Андижан",
  "coordinates": [72.3458, 40.7786]
}, {
  "name": "Могилев",
  "coordinates": [30.3325, 53.9]
}, {
  "name": "Барановичи",
  "coordinates": [26.0122, 53.1272]
}, {
  "name": "Слоним",
  "coordinates": [25.5275, 53.0894]
}, {
  "name": "Самарканд",
  "coordinates": [66.9606, 39.6542]
}, {
  "name": "Бухара",
  "coordinates": [64.4167, 39.775]
}, {
  "name": "Рязань",
  "coordinates": [39.7361, 54.6258]
}, {
  "name": "Черняховск",
  "coordinates": [21.8325, 54.6311]
}, {
  "name": "Саратов",
  "coordinates": [46.0186, 51.5336]
}, {
  "name": "Актюбинск",
  "coordinates": [57.1667, 50.2833]
}, {
  "name": "Ташкент",
  "coordinates": [69.2667, 41.2833]
}, {
  "name": "Лабытнанги",
  "coordinates": [66.6594, 66.6558]
}, {
  "name": "Салехард",
  "coordinates": [66.5333, 66.55]
}, {
  "name": "Надым",
  "coordinates": [72.5167, 65.5333]
}, {
  "name": "Виница",
  "coordinates": [28.4881, 49.2331]
}, {
  "name": "Кишинев",
  "coordinates": [28.8578, 47.0056]
}, {
  "name": "Казань",
  "coordinates": [49.1246, 55.7823]
}, {
  "name": "Москва",
  "coordinates": [37.6173, 55.7558]
}, {
  "name": "Киев",
  "coordinates": [30.5234, 50.4501]
}, {
  "name": "Фастов",
  "coordinates": [30.082, 50.0752]
}, {
  "name": "Коростышев",
  "coordinates": [29.09, 50.30]
}, {
  "name": "Житомир",
  "coordinates": [28.6571, 50.2648]
}, {
  "name": "Бердичев",
  "coordinates": [28.8992, 49.8736]
}, {
  "name": "Казатин",
  "coordinates": [28.8283, 49.7172]
}, {
  "name": "Ярмолинцы",
  "coordinates": [26.8639, 49.1047]
}, {
  "name": "Чемеровцы",
  "coordinates": [26.3887, 49.0081]
}, {
  "name": "Городок",
  "coordinates": [26.5635, 48.9434]
}, {
  "name": "Тернополь",
  "coordinates": [25.5908, 49.5528]
}, {
  "name": "Вязьма",
  "coordinates": [34.3105, 55.2167]
}, {
  "name": "Гагарин",
  "coordinates": [34.5847, 55.5494]
}, {
  "name": "Орел",
  "coordinates": [36.0675, 52.9667]
}, {
  "name": "Белгород",
  "coordinates": [36.5861, 50.5978]
}, {
  "name": "Хмельницкий",
  "coordinates": [27.0205, 49.4228]
}, {
  "name": "Канев",
  "coordinates": [31.4555, 49.7403]
}, {
  "name": "Юхнов",
  "coordinates": [35.2372, 54.7367]
}, {
  "name": "Мосальск",
  "coordinates": [34.9556, 54.5214]
}, {
  "name": "Подольск",
  "coordinates": [37.5417, 55.4203]
}, {
  "name": "Кричев",
  "coordinates": [31.7258, 53.7042]
}, {
  "name": "Смоленск",
  "coordinates": [32.0453, 54.7814]
}, {
  "name": "Бахмач",
  "coordinates": [32.8004, 51.1741]
}, {
  "name": "Мена",
  "coordinates": [32.2214, 51.5222]
}, {
  "name": "Чернигов",
  "coordinates": [31.2928, 51.495]
}, {
  "name": "Нежин",
  "coordinates": [31.8756, 51.0333]
}, {
  "name": "Городня",
  "coordinates": [31.473, 51.8879]
}, {
  "name": "Конотоп",
  "coordinates": [33.2064, 51.2047]
}, {
  "name": "Березна",
  "coordinates": [31.7898, 51.6447]
}, {
  "name": "Остер",
  "coordinates": [30.9361, 50.9444]
}, {
  "name": "Овруч",
  "coordinates": [28.8139, 51.3244]
}, {
  "name": "Малин",
  "coordinates": [29.2433, 50.7661]
}, {
  "name": "Городище",
  "coordinates": [31.4542, 49.2947]
}, {
  "name": "Бровары",
  "coordinates": [30.7886, 50.5217]
}, {
  "name": "Иванков",
  "coordinates": [29.9031, 51.1017]
}, {
  "name": "Ирпен",
  "coordinates": [30.2503, 50.5278]
}, {
  "name": "Буча",
  "coordinates": [30.2215, 50.5512]
}, {
  "name": "Белая церковь",
  "coordinates": [30.1225, 49.8044]
}, {
  "name": "Вышгород",
  "coordinates": [30.4636, 50.5919]
}, {
  "name": "Радомышль",
  "coordinates": [29.2315, 50.4939]
}, {
  "name": "Полонное",
  "coordinates": [27.5219, 50.1178]
}, {
  "name": "Новгород",
  "coordinates": [31.2761, 58.5208]
}, {
  "name": "Новгород-Волынский",
  "coordinates": [25.3254, 50.81]
}, {
  "name": "Изяслав",
  "coordinates": [26.8258, 50.1178]
}, {
  "name": "Збараж",
  "coordinates": [25.7694, 49.6683]
}, {
  "name": "Зборов",
  "coordinates": [25.1597, 49.4067]
}, {
  "name": "Золочев",
  "coordinates": [24.8992, 49.8103]
}, {
  "name": "Умань",
  "coordinates": [30.2086, 48.7511]
}, {
  "name": "Симферополь",
  "coordinates": [34.1, 44.95]
}, {
  "name": "Алушта",
  "coordinates": [34.4167, 44.6667]
}, {
  "name": "Бобруйск",
  "coordinates": [29.2239, 53.1511]
}, {
  "name": "Медвежьегорск",
  "coordinates": [34.4511, 62.9142]
}, {
  "name": "Петрозаводск",
  "coordinates": [34.3831, 61.7906]
}, {
  "name": "Тула",
  "coordinates": [37.6178, 54.1961]
}, {
  "name": "Новомосковск",
  "coordinates": [38.2703, 54.0272]
}, {
  "name": "Днепропетровск",
  "coordinates": [35.0469, 48.4647]
}, {
  "name": "Павлоград",
  "coordinates": [35.8667, 48.5167]
}, {
  "name": "Никополь",
  "coordinates": [34.5667, 47.5667]
}, {
  "name": "Кривой Рог",
  "coordinates": [33.3708, 47.9244]
}, {
  "name": "Новый Буг",
  "coordinates": [32.5581, 47.6756]
}, {
  "name": "Вознесенск",
  "coordinates": [31.3208, 47.5619]
}, {
  "name": "Новороссийск",
  "coordinates": [37.7667, 44.7167]
}, {
  "name": "Анапа",
  "coordinates": [37.3167, 44.8958]
}, {
  "name": "Керчь",
  "coordinates": [36.4667, 45.355]
}, {
  "name": "Краснодар",
  "coordinates": [38.9667, 45.0389]
}, {
  "name": "Геленджик",
  "coordinates": [38.0667, 44.5667]
}, {
  "name": "Темрюк",
  "coordinates": [37.2522, 45.2683]
}, {
  "name": "Тихвин",
  "coordinates": [33.5128, 59.6378]
}, {
  "name": "Волхов",
  "coordinates": [32.3467, 59.9289]
}, {
  "name": "Елабуга",
  "coordinates": [52.0667, 55.7667]
}, {
  "name": "Нижнекамск",
  "coordinates": [51.8167, 55.6333]
}, {
  "name": "Беслан",
  "coordinates": [44.1878, 43.2003]
}, {
  "name": "Нальчик",
  "coordinates": [43.6167, 43.6167]
}, {
  "name": "Кириши",
  "coordinates": [32.0194, 59.4417]
}, {
  "name": "Выборг",
  "coordinates": [28.7497, 60.7056]
}, {
  "name": "Клайпеда",
  "coordinates": [21.1333, 55.7]
}, {
  "name": "Клинцы",
  "coordinates": [32.7497, 52.7539]
}, {
  "name": "Ногинск",
  "coordinates": [38.4319, 55.8519]
}, {
  "name": "Лужск",
  "coordinates": [29.8722, 58.5658]
}, {
  "name": "Севастополь",
  "coordinates": [33.472, 44.5953]
}, {
  "name": "Мелитополь",
  "coordinates": [35.3667, 46.8333]
}, {
  "name": "Кандалакша",
  "coordinates": [32.4081, 67.1558]
}, {
  "name": "Кемь",
  "coordinates": [34.5833, 64.95]
}, {
  "name": "Майкоп",
  "coordinates": [40.1003, 44.6111]
}, {
  "name": "Кропоткин",
  "coordinates": [40.5667, 45.4333]
}, {
  "name": "Армавир",
  "coordinates": [41.1333, 45.0]
}, {
  "name": "Гродно",
  "coordinates": [23.8153, 53.6781]
}, {
  "name": "Набережные Челны",
  "coordinates": [52.4081, 55.7206]
}, {
  "name": "Пятигорск",
  "coordinates": [43.05, 44.05]
}, {
  "name": "Минеральные Воды",
  "coordinates": [42.8833, 44.2167]
}, {
  "name": "Ессентуки",
  "coordinates": [42.8667, 44.05]
}, {
  "name": "Георгиевск",
  "coordinates": [43.15, 44.15]
}, {
  "name": "Буденновск",
  "coordinates": [44.1333, 44.7833]
}, {
  "name": "Кисловодск",
  "coordinates": [42.7167, 43.9]
}, {
  "name": "Черкесск",
  "coordinates": [41.0333, 44.2167]
}, {
  "name": "Ставрополь",
  "coordinates": [41.9667, 45.05]
}, {
  "name": "Ивано-Франковск",
  "coordinates": [24.7111, 48.9222]
}, {
  "name": "Ужгород",
  "coordinates": [22.2883, 48.6219]
}];

/***/ }),

/***/ "./node_modules/preline/preline.js":
/*!*****************************************!*\
  !*** ./node_modules/preline/preline.js ***!
  \*****************************************/
/***/ ((module) => {

!function(t,e){if(true)module.exports=e();else { var i, n; }}(self,(()=>(()=>{"use strict";var t={170:(t,e,n)=>{n.r(e),n.d(e,{afterMain:()=>C,afterRead:()=>w,afterWrite:()=>T,applyStyles:()=>P,arrow:()=>Z,auto:()=>l,basePlacements:()=>a,beforeMain:()=>b,beforeRead:()=>g,beforeWrite:()=>x,bottom:()=>o,clippingParents:()=>d,computeStyles:()=>nt,createPopper:()=>Pt,createPopperBase:()=>kt,createPopperLite:()=>Dt,detectOverflow:()=>yt,end:()=>u,eventListeners:()=>ot,flip:()=>wt,hide:()=>Ct,left:()=>s,main:()=>S,modifierPhases:()=>E,offset:()=>xt,placements:()=>m,popper:()=>h,popperGenerator:()=>_t,popperOffsets:()=>It,preventOverflow:()=>Tt,read:()=>y,reference:()=>f,right:()=>r,start:()=>c,top:()=>i,variationPlacements:()=>v,viewport:()=>p,write:()=>I});var i="top",o="bottom",r="right",s="left",l="auto",a=[i,o,r,s],c="start",u="end",d="clippingParents",p="viewport",h="popper",f="reference",v=a.reduce((function(t,e){return t.concat([e+"-"+c,e+"-"+u])}),[]),m=[].concat(a,[l]).reduce((function(t,e){return t.concat([e,e+"-"+c,e+"-"+u])}),[]),g="beforeRead",y="read",w="afterRead",b="beforeMain",S="main",C="afterMain",x="beforeWrite",I="write",T="afterWrite",E=[g,y,w,b,S,C,x,I,T];function O(t){return t?(t.nodeName||"").toLowerCase():null}function L(t){if(null==t)return window;if("[object Window]"!==t.toString()){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function A(t){return t instanceof L(t).Element||t instanceof Element}function _(t){return t instanceof L(t).HTMLElement||t instanceof HTMLElement}function k(t){return"undefined"!=typeof ShadowRoot&&(t instanceof L(t).ShadowRoot||t instanceof ShadowRoot)}const P={name:"applyStyles",enabled:!0,phase:"write",fn:function(t){var e=t.state;Object.keys(e.elements).forEach((function(t){var n=e.styles[t]||{},i=e.attributes[t]||{},o=e.elements[t];_(o)&&O(o)&&(Object.assign(o.style,n),Object.keys(i).forEach((function(t){var e=i[t];!1===e?o.removeAttribute(t):o.setAttribute(t,!0===e?"":e)})))}))},effect:function(t){var e=t.state,n={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,n.popper),e.styles=n,e.elements.arrow&&Object.assign(e.elements.arrow.style,n.arrow),function(){Object.keys(e.elements).forEach((function(t){var i=e.elements[t],o=e.attributes[t]||{},r=Object.keys(e.styles.hasOwnProperty(t)?e.styles[t]:n[t]).reduce((function(t,e){return t[e]="",t}),{});_(i)&&O(i)&&(Object.assign(i.style,r),Object.keys(o).forEach((function(t){i.removeAttribute(t)})))}))}},requires:["computeStyles"]};function D(t){return t.split("-")[0]}var B=Math.max,q=Math.min,H=Math.round;function M(){var t=navigator.userAgentData;return null!=t&&t.brands&&Array.isArray(t.brands)?t.brands.map((function(t){return t.brand+"/"+t.version})).join(" "):navigator.userAgent}function N(){return!/^((?!chrome|android).)*safari/i.test(M())}function j(t,e,n){void 0===e&&(e=!1),void 0===n&&(n=!1);var i=t.getBoundingClientRect(),o=1,r=1;e&&_(t)&&(o=t.offsetWidth>0&&H(i.width)/t.offsetWidth||1,r=t.offsetHeight>0&&H(i.height)/t.offsetHeight||1);var s=(A(t)?L(t):window).visualViewport,l=!N()&&n,a=(i.left+(l&&s?s.offsetLeft:0))/o,c=(i.top+(l&&s?s.offsetTop:0))/r,u=i.width/o,d=i.height/r;return{width:u,height:d,top:c,right:a+u,bottom:c+d,left:a,x:a,y:c}}function $(t){var e=j(t),n=t.offsetWidth,i=t.offsetHeight;return Math.abs(e.width-n)<=1&&(n=e.width),Math.abs(e.height-i)<=1&&(i=e.height),{x:t.offsetLeft,y:t.offsetTop,width:n,height:i}}function V(t,e){var n=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(n&&k(n)){var i=e;do{if(i&&t.isSameNode(i))return!0;i=i.parentNode||i.host}while(i)}return!1}function R(t){return L(t).getComputedStyle(t)}function F(t){return["table","td","th"].indexOf(O(t))>=0}function W(t){return((A(t)?t.ownerDocument:t.document)||window.document).documentElement}function U(t){return"html"===O(t)?t:t.assignedSlot||t.parentNode||(k(t)?t.host:null)||W(t)}function z(t){return _(t)&&"fixed"!==R(t).position?t.offsetParent:null}function Q(t){for(var e=L(t),n=z(t);n&&F(n)&&"static"===R(n).position;)n=z(n);return n&&("html"===O(n)||"body"===O(n)&&"static"===R(n).position)?e:n||function(t){var e=/firefox/i.test(M());if(/Trident/i.test(M())&&_(t)&&"fixed"===R(t).position)return null;var n=U(t);for(k(n)&&(n=n.host);_(n)&&["html","body"].indexOf(O(n))<0;){var i=R(n);if("none"!==i.transform||"none"!==i.perspective||"paint"===i.contain||-1!==["transform","perspective"].indexOf(i.willChange)||e&&"filter"===i.willChange||e&&i.filter&&"none"!==i.filter)return n;n=n.parentNode}return null}(t)||e}function J(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function K(t,e,n){return B(t,q(e,n))}function Y(t){return Object.assign({},{top:0,right:0,bottom:0,left:0},t)}function X(t,e){return e.reduce((function(e,n){return e[n]=t,e}),{})}const Z={name:"arrow",enabled:!0,phase:"main",fn:function(t){var e,n=t.state,l=t.name,c=t.options,u=n.elements.arrow,d=n.modifiersData.popperOffsets,p=D(n.placement),h=J(p),f=[s,r].indexOf(p)>=0?"height":"width";if(u&&d){var v=function(t,e){return Y("number"!=typeof(t="function"==typeof t?t(Object.assign({},e.rects,{placement:e.placement})):t)?t:X(t,a))}(c.padding,n),m=$(u),g="y"===h?i:s,y="y"===h?o:r,w=n.rects.reference[f]+n.rects.reference[h]-d[h]-n.rects.popper[f],b=d[h]-n.rects.reference[h],S=Q(u),C=S?"y"===h?S.clientHeight||0:S.clientWidth||0:0,x=w/2-b/2,I=v[g],T=C-m[f]-v[y],E=C/2-m[f]/2+x,O=K(I,E,T),L=h;n.modifiersData[l]=((e={})[L]=O,e.centerOffset=O-E,e)}},effect:function(t){var e=t.state,n=t.options.element,i=void 0===n?"[data-popper-arrow]":n;null!=i&&("string"!=typeof i||(i=e.elements.popper.querySelector(i)))&&V(e.elements.popper,i)&&(e.elements.arrow=i)},requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function G(t){return t.split("-")[1]}var tt={top:"auto",right:"auto",bottom:"auto",left:"auto"};function et(t){var e,n=t.popper,l=t.popperRect,a=t.placement,c=t.variation,d=t.offsets,p=t.position,h=t.gpuAcceleration,f=t.adaptive,v=t.roundOffsets,m=t.isFixed,g=d.x,y=void 0===g?0:g,w=d.y,b=void 0===w?0:w,S="function"==typeof v?v({x:y,y:b}):{x:y,y:b};y=S.x,b=S.y;var C=d.hasOwnProperty("x"),x=d.hasOwnProperty("y"),I=s,T=i,E=window;if(f){var O=Q(n),A="clientHeight",_="clientWidth";if(O===L(n)&&"static"!==R(O=W(n)).position&&"absolute"===p&&(A="scrollHeight",_="scrollWidth"),a===i||(a===s||a===r)&&c===u)T=o,b-=(m&&O===E&&E.visualViewport?E.visualViewport.height:O[A])-l.height,b*=h?1:-1;if(a===s||(a===i||a===o)&&c===u)I=r,y-=(m&&O===E&&E.visualViewport?E.visualViewport.width:O[_])-l.width,y*=h?1:-1}var k,P=Object.assign({position:p},f&&tt),D=!0===v?function(t,e){var n=t.x,i=t.y,o=e.devicePixelRatio||1;return{x:H(n*o)/o||0,y:H(i*o)/o||0}}({x:y,y:b},L(n)):{x:y,y:b};return y=D.x,b=D.y,h?Object.assign({},P,((k={})[T]=x?"0":"",k[I]=C?"0":"",k.transform=(E.devicePixelRatio||1)<=1?"translate("+y+"px, "+b+"px)":"translate3d("+y+"px, "+b+"px, 0)",k)):Object.assign({},P,((e={})[T]=x?b+"px":"",e[I]=C?y+"px":"",e.transform="",e))}const nt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:function(t){var e=t.state,n=t.options,i=n.gpuAcceleration,o=void 0===i||i,r=n.adaptive,s=void 0===r||r,l=n.roundOffsets,a=void 0===l||l,c={placement:D(e.placement),variation:G(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o,isFixed:"fixed"===e.options.strategy};null!=e.modifiersData.popperOffsets&&(e.styles.popper=Object.assign({},e.styles.popper,et(Object.assign({},c,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:s,roundOffsets:a})))),null!=e.modifiersData.arrow&&(e.styles.arrow=Object.assign({},e.styles.arrow,et(Object.assign({},c,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:a})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})},data:{}};var it={passive:!0};const ot={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:function(t){var e=t.state,n=t.instance,i=t.options,o=i.scroll,r=void 0===o||o,s=i.resize,l=void 0===s||s,a=L(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return r&&c.forEach((function(t){t.addEventListener("scroll",n.update,it)})),l&&a.addEventListener("resize",n.update,it),function(){r&&c.forEach((function(t){t.removeEventListener("scroll",n.update,it)})),l&&a.removeEventListener("resize",n.update,it)}},data:{}};var rt={left:"right",right:"left",bottom:"top",top:"bottom"};function st(t){return t.replace(/left|right|bottom|top/g,(function(t){return rt[t]}))}var lt={start:"end",end:"start"};function at(t){return t.replace(/start|end/g,(function(t){return lt[t]}))}function ct(t){var e=L(t);return{scrollLeft:e.pageXOffset,scrollTop:e.pageYOffset}}function ut(t){return j(W(t)).left+ct(t).scrollLeft}function dt(t){var e=R(t),n=e.overflow,i=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(n+o+i)}function pt(t){return["html","body","#document"].indexOf(O(t))>=0?t.ownerDocument.body:_(t)&&dt(t)?t:pt(U(t))}function ht(t,e){var n;void 0===e&&(e=[]);var i=pt(t),o=i===(null==(n=t.ownerDocument)?void 0:n.body),r=L(i),s=o?[r].concat(r.visualViewport||[],dt(i)?i:[]):i,l=e.concat(s);return o?l:l.concat(ht(U(s)))}function ft(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function vt(t,e,n){return e===p?ft(function(t,e){var n=L(t),i=W(t),o=n.visualViewport,r=i.clientWidth,s=i.clientHeight,l=0,a=0;if(o){r=o.width,s=o.height;var c=N();(c||!c&&"fixed"===e)&&(l=o.offsetLeft,a=o.offsetTop)}return{width:r,height:s,x:l+ut(t),y:a}}(t,n)):A(e)?function(t,e){var n=j(t,!1,"fixed"===e);return n.top=n.top+t.clientTop,n.left=n.left+t.clientLeft,n.bottom=n.top+t.clientHeight,n.right=n.left+t.clientWidth,n.width=t.clientWidth,n.height=t.clientHeight,n.x=n.left,n.y=n.top,n}(e,n):ft(function(t){var e,n=W(t),i=ct(t),o=null==(e=t.ownerDocument)?void 0:e.body,r=B(n.scrollWidth,n.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),s=B(n.scrollHeight,n.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),l=-i.scrollLeft+ut(t),a=-i.scrollTop;return"rtl"===R(o||n).direction&&(l+=B(n.clientWidth,o?o.clientWidth:0)-r),{width:r,height:s,x:l,y:a}}(W(t)))}function mt(t,e,n,i){var o="clippingParents"===e?function(t){var e=ht(U(t)),n=["absolute","fixed"].indexOf(R(t).position)>=0&&_(t)?Q(t):t;return A(n)?e.filter((function(t){return A(t)&&V(t,n)&&"body"!==O(t)})):[]}(t):[].concat(e),r=[].concat(o,[n]),s=r[0],l=r.reduce((function(e,n){var o=vt(t,n,i);return e.top=B(o.top,e.top),e.right=q(o.right,e.right),e.bottom=q(o.bottom,e.bottom),e.left=B(o.left,e.left),e}),vt(t,s,i));return l.width=l.right-l.left,l.height=l.bottom-l.top,l.x=l.left,l.y=l.top,l}function gt(t){var e,n=t.reference,l=t.element,a=t.placement,d=a?D(a):null,p=a?G(a):null,h=n.x+n.width/2-l.width/2,f=n.y+n.height/2-l.height/2;switch(d){case i:e={x:h,y:n.y-l.height};break;case o:e={x:h,y:n.y+n.height};break;case r:e={x:n.x+n.width,y:f};break;case s:e={x:n.x-l.width,y:f};break;default:e={x:n.x,y:n.y}}var v=d?J(d):null;if(null!=v){var m="y"===v?"height":"width";switch(p){case c:e[v]=e[v]-(n[m]/2-l[m]/2);break;case u:e[v]=e[v]+(n[m]/2-l[m]/2)}}return e}function yt(t,e){void 0===e&&(e={});var n=e,s=n.placement,l=void 0===s?t.placement:s,c=n.strategy,u=void 0===c?t.strategy:c,v=n.boundary,m=void 0===v?d:v,g=n.rootBoundary,y=void 0===g?p:g,w=n.elementContext,b=void 0===w?h:w,S=n.altBoundary,C=void 0!==S&&S,x=n.padding,I=void 0===x?0:x,T=Y("number"!=typeof I?I:X(I,a)),E=b===h?f:h,O=t.rects.popper,L=t.elements[C?E:b],_=mt(A(L)?L:L.contextElement||W(t.elements.popper),m,y,u),k=j(t.elements.reference),P=gt({reference:k,element:O,strategy:"absolute",placement:l}),D=ft(Object.assign({},O,P)),B=b===h?D:k,q={top:_.top-B.top+T.top,bottom:B.bottom-_.bottom+T.bottom,left:_.left-B.left+T.left,right:B.right-_.right+T.right},H=t.modifiersData.offset;if(b===h&&H){var M=H[l];Object.keys(q).forEach((function(t){var e=[r,o].indexOf(t)>=0?1:-1,n=[i,o].indexOf(t)>=0?"y":"x";q[t]+=M[n]*e}))}return q}const wt={name:"flip",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,u=t.name;if(!e.modifiersData[u]._skip){for(var d=n.mainAxis,p=void 0===d||d,h=n.altAxis,f=void 0===h||h,g=n.fallbackPlacements,y=n.padding,w=n.boundary,b=n.rootBoundary,S=n.altBoundary,C=n.flipVariations,x=void 0===C||C,I=n.allowedAutoPlacements,T=e.options.placement,E=D(T),O=g||(E===T||!x?[st(T)]:function(t){if(D(t)===l)return[];var e=st(t);return[at(t),e,at(e)]}(T)),L=[T].concat(O).reduce((function(t,n){return t.concat(D(n)===l?function(t,e){void 0===e&&(e={});var n=e,i=n.placement,o=n.boundary,r=n.rootBoundary,s=n.padding,l=n.flipVariations,c=n.allowedAutoPlacements,u=void 0===c?m:c,d=G(i),p=d?l?v:v.filter((function(t){return G(t)===d})):a,h=p.filter((function(t){return u.indexOf(t)>=0}));0===h.length&&(h=p);var f=h.reduce((function(e,n){return e[n]=yt(t,{placement:n,boundary:o,rootBoundary:r,padding:s})[D(n)],e}),{});return Object.keys(f).sort((function(t,e){return f[t]-f[e]}))}(e,{placement:n,boundary:w,rootBoundary:b,padding:y,flipVariations:x,allowedAutoPlacements:I}):n)}),[]),A=e.rects.reference,_=e.rects.popper,k=new Map,P=!0,B=L[0],q=0;q<L.length;q++){var H=L[q],M=D(H),N=G(H)===c,j=[i,o].indexOf(M)>=0,$=j?"width":"height",V=yt(e,{placement:H,boundary:w,rootBoundary:b,altBoundary:S,padding:y}),R=j?N?r:s:N?o:i;A[$]>_[$]&&(R=st(R));var F=st(R),W=[];if(p&&W.push(V[M]<=0),f&&W.push(V[R]<=0,V[F]<=0),W.every((function(t){return t}))){B=H,P=!1;break}k.set(H,W)}if(P)for(var U=function(t){var e=L.find((function(e){var n=k.get(e);if(n)return n.slice(0,t).every((function(t){return t}))}));if(e)return B=e,"break"},z=x?3:1;z>0;z--){if("break"===U(z))break}e.placement!==B&&(e.modifiersData[u]._skip=!0,e.placement=B,e.reset=!0)}},requiresIfExists:["offset"],data:{_skip:!1}};function bt(t,e,n){return void 0===n&&(n={x:0,y:0}),{top:t.top-e.height-n.y,right:t.right-e.width+n.x,bottom:t.bottom-e.height+n.y,left:t.left-e.width-n.x}}function St(t){return[i,r,o,s].some((function(e){return t[e]>=0}))}const Ct={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:function(t){var e=t.state,n=t.name,i=e.rects.reference,o=e.rects.popper,r=e.modifiersData.preventOverflow,s=yt(e,{elementContext:"reference"}),l=yt(e,{altBoundary:!0}),a=bt(s,i),c=bt(l,o,r),u=St(a),d=St(c);e.modifiersData[n]={referenceClippingOffsets:a,popperEscapeOffsets:c,isReferenceHidden:u,hasPopperEscaped:d},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":u,"data-popper-escaped":d})}};const xt={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:function(t){var e=t.state,n=t.options,o=t.name,l=n.offset,a=void 0===l?[0,0]:l,c=m.reduce((function(t,n){return t[n]=function(t,e,n){var o=D(t),l=[s,i].indexOf(o)>=0?-1:1,a="function"==typeof n?n(Object.assign({},e,{placement:t})):n,c=a[0],u=a[1];return c=c||0,u=(u||0)*l,[s,r].indexOf(o)>=0?{x:u,y:c}:{x:c,y:u}}(n,e.rects,a),t}),{}),u=c[e.placement],d=u.x,p=u.y;null!=e.modifiersData.popperOffsets&&(e.modifiersData.popperOffsets.x+=d,e.modifiersData.popperOffsets.y+=p),e.modifiersData[o]=c}};const It={name:"popperOffsets",enabled:!0,phase:"read",fn:function(t){var e=t.state,n=t.name;e.modifiersData[n]=gt({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})},data:{}};const Tt={name:"preventOverflow",enabled:!0,phase:"main",fn:function(t){var e=t.state,n=t.options,l=t.name,a=n.mainAxis,u=void 0===a||a,d=n.altAxis,p=void 0!==d&&d,h=n.boundary,f=n.rootBoundary,v=n.altBoundary,m=n.padding,g=n.tether,y=void 0===g||g,w=n.tetherOffset,b=void 0===w?0:w,S=yt(e,{boundary:h,rootBoundary:f,padding:m,altBoundary:v}),C=D(e.placement),x=G(e.placement),I=!x,T=J(C),E="x"===T?"y":"x",O=e.modifiersData.popperOffsets,L=e.rects.reference,A=e.rects.popper,_="function"==typeof b?b(Object.assign({},e.rects,{placement:e.placement})):b,k="number"==typeof _?{mainAxis:_,altAxis:_}:Object.assign({mainAxis:0,altAxis:0},_),P=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,H={x:0,y:0};if(O){if(u){var M,N="y"===T?i:s,j="y"===T?o:r,V="y"===T?"height":"width",R=O[T],F=R+S[N],W=R-S[j],U=y?-A[V]/2:0,z=x===c?L[V]:A[V],Y=x===c?-A[V]:-L[V],X=e.elements.arrow,Z=y&&X?$(X):{width:0,height:0},tt=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:{top:0,right:0,bottom:0,left:0},et=tt[N],nt=tt[j],it=K(0,L[V],Z[V]),ot=I?L[V]/2-U-it-et-k.mainAxis:z-it-et-k.mainAxis,rt=I?-L[V]/2+U+it+nt+k.mainAxis:Y+it+nt+k.mainAxis,st=e.elements.arrow&&Q(e.elements.arrow),lt=st?"y"===T?st.clientTop||0:st.clientLeft||0:0,at=null!=(M=null==P?void 0:P[T])?M:0,ct=R+rt-at,ut=K(y?q(F,R+ot-at-lt):F,R,y?B(W,ct):W);O[T]=ut,H[T]=ut-R}if(p){var dt,pt="x"===T?i:s,ht="x"===T?o:r,ft=O[E],vt="y"===E?"height":"width",mt=ft+S[pt],gt=ft-S[ht],wt=-1!==[i,s].indexOf(C),bt=null!=(dt=null==P?void 0:P[E])?dt:0,St=wt?mt:ft-L[vt]-A[vt]-bt+k.altAxis,Ct=wt?ft+L[vt]+A[vt]-bt-k.altAxis:gt,xt=y&&wt?function(t,e,n){var i=K(t,e,n);return i>n?n:i}(St,ft,Ct):K(y?St:mt,ft,y?Ct:gt);O[E]=xt,H[E]=xt-ft}e.modifiersData[l]=H}},requiresIfExists:["offset"]};function Et(t,e,n){void 0===n&&(n=!1);var i,o,r=_(e),s=_(e)&&function(t){var e=t.getBoundingClientRect(),n=H(e.width)/t.offsetWidth||1,i=H(e.height)/t.offsetHeight||1;return 1!==n||1!==i}(e),l=W(e),a=j(t,s,n),c={scrollLeft:0,scrollTop:0},u={x:0,y:0};return(r||!r&&!n)&&(("body"!==O(e)||dt(l))&&(c=(i=e)!==L(i)&&_(i)?{scrollLeft:(o=i).scrollLeft,scrollTop:o.scrollTop}:ct(i)),_(e)?((u=j(e,!0)).x+=e.clientLeft,u.y+=e.clientTop):l&&(u.x=ut(l))),{x:a.left+c.scrollLeft-u.x,y:a.top+c.scrollTop-u.y,width:a.width,height:a.height}}function Ot(t){var e=new Map,n=new Set,i=[];function o(t){n.add(t.name),[].concat(t.requires||[],t.requiresIfExists||[]).forEach((function(t){if(!n.has(t)){var i=e.get(t);i&&o(i)}})),i.push(t)}return t.forEach((function(t){e.set(t.name,t)})),t.forEach((function(t){n.has(t.name)||o(t)})),i}var Lt={placement:"bottom",modifiers:[],strategy:"absolute"};function At(){for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];return!e.some((function(t){return!(t&&"function"==typeof t.getBoundingClientRect)}))}function _t(t){void 0===t&&(t={});var e=t,n=e.defaultModifiers,i=void 0===n?[]:n,o=e.defaultOptions,r=void 0===o?Lt:o;return function(t,e,n){void 0===n&&(n=r);var o,s,l={placement:"bottom",orderedModifiers:[],options:Object.assign({},Lt,r),modifiersData:{},elements:{reference:t,popper:e},attributes:{},styles:{}},a=[],c=!1,u={state:l,setOptions:function(n){var o="function"==typeof n?n(l.options):n;d(),l.options=Object.assign({},r,l.options,o),l.scrollParents={reference:A(t)?ht(t):t.contextElement?ht(t.contextElement):[],popper:ht(e)};var s,c,p=function(t){var e=Ot(t);return E.reduce((function(t,n){return t.concat(e.filter((function(t){return t.phase===n})))}),[])}((s=[].concat(i,l.options.modifiers),c=s.reduce((function(t,e){var n=t[e.name];return t[e.name]=n?Object.assign({},n,e,{options:Object.assign({},n.options,e.options),data:Object.assign({},n.data,e.data)}):e,t}),{}),Object.keys(c).map((function(t){return c[t]}))));return l.orderedModifiers=p.filter((function(t){return t.enabled})),l.orderedModifiers.forEach((function(t){var e=t.name,n=t.options,i=void 0===n?{}:n,o=t.effect;if("function"==typeof o){var r=o({state:l,name:e,instance:u,options:i}),s=function(){};a.push(r||s)}})),u.update()},forceUpdate:function(){if(!c){var t=l.elements,e=t.reference,n=t.popper;if(At(e,n)){l.rects={reference:Et(e,Q(n),"fixed"===l.options.strategy),popper:$(n)},l.reset=!1,l.placement=l.options.placement,l.orderedModifiers.forEach((function(t){return l.modifiersData[t.name]=Object.assign({},t.data)}));for(var i=0;i<l.orderedModifiers.length;i++)if(!0!==l.reset){var o=l.orderedModifiers[i],r=o.fn,s=o.options,a=void 0===s?{}:s,d=o.name;"function"==typeof r&&(l=r({state:l,options:a,name:d,instance:u})||l)}else l.reset=!1,i=-1}}},update:(o=function(){return new Promise((function(t){u.forceUpdate(),t(l)}))},function(){return s||(s=new Promise((function(t){Promise.resolve().then((function(){s=void 0,t(o())}))}))),s}),destroy:function(){d(),c=!0}};if(!At(t,e))return u;function d(){a.forEach((function(t){return t()})),a=[]}return u.setOptions(n).then((function(t){!c&&n.onFirstUpdate&&n.onFirstUpdate(t)})),u}}var kt=_t(),Pt=_t({defaultModifiers:[ot,It,nt,P,xt,wt,Tt,Z,Ct]}),Dt=_t({defaultModifiers:[ot,It,nt,P]})},223:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0}),e.BREAKPOINTS=e.COMBO_BOX_ACCESSIBILITY_KEY_SET=e.SELECT_ACCESSIBILITY_KEY_SET=e.TABS_ACCESSIBILITY_KEY_SET=e.OVERLAY_ACCESSIBILITY_KEY_SET=e.DROPDOWN_ACCESSIBILITY_KEY_SET=e.POSITIONS=void 0,e.POSITIONS={auto:"auto","auto-start":"auto-start","auto-end":"auto-end",top:"top","top-left":"top-start","top-right":"top-end",bottom:"bottom","bottom-left":"bottom-start","bottom-right":"bottom-end",right:"right","right-start":"right-start","right-end":"right-end",left:"left","left-start":"left-start","left-end":"left-end"},e.DROPDOWN_ACCESSIBILITY_KEY_SET=["Escape","ArrowUp","ArrowDown","Home","End","Enter"],e.OVERLAY_ACCESSIBILITY_KEY_SET=["Escape","Tab"],e.TABS_ACCESSIBILITY_KEY_SET=["ArrowUp","ArrowLeft","ArrowDown","ArrowRight","Home","End"],e.SELECT_ACCESSIBILITY_KEY_SET=["ArrowUp","ArrowLeft","ArrowDown","ArrowRight","Home","End","Escape","Enter","Tab"],e.COMBO_BOX_ACCESSIBILITY_KEY_SET=["ArrowUp","ArrowLeft","ArrowDown","ArrowRight","Home","End","Escape","Enter"],e.BREAKPOINTS={xs:0,sm:640,md:768,lg:1024,xl:1280,"2xl":1536}},158:function(t,e,n){
/*
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.HSRangeSlider=e.HSFileUpload=e.HSDataTable=e.HSStaticMethods=e.HSTreeView=e.HSTooltip=e.HSTogglePassword=e.HSToggleCount=e.HSThemeSwitch=e.HSTextareaAutoHeight=e.HSTabs=e.HSStrongPassword=e.HSStepper=e.HSSelect=e.HSScrollspy=e.HSRemoveElement=e.HSPinInput=e.HSOverlay=e.HSInputNumber=e.HSDropdown=e.HSComboBox=e.HSCollapse=e.HSCarousel=e.HSAccordion=e.HSCopyMarkup=void 0;var o=n(406);Object.defineProperty(e,"HSCopyMarkup",{enumerable:!0,get:function(){return i(o).default}});var r=n(740);Object.defineProperty(e,"HSAccordion",{enumerable:!0,get:function(){return i(r).default}});var s=n(268);Object.defineProperty(e,"HSCarousel",{enumerable:!0,get:function(){return i(s).default}});var l=n(485);Object.defineProperty(e,"HSCollapse",{enumerable:!0,get:function(){return i(l).default}});var a=n(809);Object.defineProperty(e,"HSComboBox",{enumerable:!0,get:function(){return i(a).default}});var c=n(891);Object.defineProperty(e,"HSDropdown",{enumerable:!0,get:function(){return i(c).default}});var u=n(332);Object.defineProperty(e,"HSInputNumber",{enumerable:!0,get:function(){return i(u).default}});var d=n(850);Object.defineProperty(e,"HSOverlay",{enumerable:!0,get:function(){return i(d).default}});var p=n(60);Object.defineProperty(e,"HSPinInput",{enumerable:!0,get:function(){return i(p).default}});var h=n(911);Object.defineProperty(e,"HSRemoveElement",{enumerable:!0,get:function(){return i(h).default}});var f=n(751);Object.defineProperty(e,"HSScrollspy",{enumerable:!0,get:function(){return i(f).default}});var v=n(442);Object.defineProperty(e,"HSSelect",{enumerable:!0,get:function(){return i(v).default}});var m=n(887);Object.defineProperty(e,"HSStepper",{enumerable:!0,get:function(){return i(m).default}});var g=n(97);Object.defineProperty(e,"HSStrongPassword",{enumerable:!0,get:function(){return i(g).default}});var y=n(166);Object.defineProperty(e,"HSTabs",{enumerable:!0,get:function(){return i(y).default}});var w=n(144);Object.defineProperty(e,"HSTextareaAutoHeight",{enumerable:!0,get:function(){return i(w).default}});var b=n(502);Object.defineProperty(e,"HSThemeSwitch",{enumerable:!0,get:function(){return i(b).default}});var S=n(684);Object.defineProperty(e,"HSToggleCount",{enumerable:!0,get:function(){return i(S).default}});var C=n(100);Object.defineProperty(e,"HSTogglePassword",{enumerable:!0,get:function(){return i(C).default}});var x=n(969);Object.defineProperty(e,"HSTooltip",{enumerable:!0,get:function(){return i(x).default}});var I=n(772);Object.defineProperty(e,"HSTreeView",{enumerable:!0,get:function(){return i(I).default}});var T=n(957);Object.defineProperty(e,"HSStaticMethods",{enumerable:!0,get:function(){return i(T).default}}),"undefined"!=typeof DataTable&&"undefined"!=typeof jQuery?e.HSDataTable=n(814).default:e.HSDataTable=null,"undefined"!=typeof _&&"undefined"!=typeof Dropzone?e.HSFileUpload=n(234).default:e.HSFileUpload=null,void 0!==typeof noUiSlider?e.HSRangeSlider=n(347).default:e.HSRangeSlider=null},740:function(t,e,n){
/*
 * HSAccordion
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;return o.toggle=o.el.querySelector(".hs-accordion-toggle")||null,o.content=o.el.querySelector(".hs-accordion-content")||null,o.update(),o.toggle&&o.content&&o.init(),o}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsAccordionCollection,this),this.toggle.addEventListener("click",(function(e){e.stopPropagation(),t.el.classList.contains("active")?t.hide():t.show()}))},e.prototype.show=function(){var t,e=this;this.group&&!this.isAlwaysOpened&&this.group.querySelector(":scope > .hs-accordion.active")&&this.group.querySelector(":scope > .hs-accordion.active")!==this.el&&window.$hsAccordionCollection.find((function(t){return t.element.el===e.group.querySelector(":scope > .hs-accordion.active")})).element.hide();if(this.el.classList.contains("active"))return!1;this.el.classList.add("active"),(null===(t=null==this?void 0:this.toggle)||void 0===t?void 0:t.ariaExpanded)&&(this.toggle.ariaExpanded="true"),this.content.style.display="block",this.content.style.height="0",setTimeout((function(){e.content.style.height="".concat(e.content.scrollHeight,"px")})),(0,l.afterTransition)(this.content,(function(){e.content.style.display="block",e.content.style.height="",e.fireEvent("open",e.el),(0,l.dispatch)("open.hs.accordion",e.el,e.el)}))},e.prototype.hide=function(){var t,e=this;if(!this.el.classList.contains("active"))return!1;this.el.classList.remove("active"),(null===(t=null==this?void 0:this.toggle)||void 0===t?void 0:t.ariaExpanded)&&(this.toggle.ariaExpanded="false"),this.content.style.height="".concat(this.content.scrollHeight,"px"),setTimeout((function(){e.content.style.height="0"})),(0,l.afterTransition)(this.content,(function(){e.content.style.display="",e.content.style.height="0",e.fireEvent("close",e.el),(0,l.dispatch)("close.hs.accordion",e.el,e.el)}))},e.prototype.update=function(){var t=this;if(this.group=this.el.closest(".hs-accordion-group")||null,!this.group)return!1;this.isAlwaysOpened=this.group.hasAttribute("data-hs-accordion-always-open")||!1,window.$hsAccordionCollection.map((function(e){return e.id===t.el.id&&(e.element.group=t.group,e.element.isAlwaysOpened=t.isAlwaysOpened),e}))},e.getInstance=function(t,e){var n=window.$hsAccordionCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.show=function(t){var e=window.$hsAccordionCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&"block"!==e.element.content.style.display&&e.element.show()},e.hide=function(t){var e=window.$hsAccordionCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&"block"===e.element.content.style.display&&e.element.hide()},e.autoInit=function(){window.$hsAccordionCollection||(window.$hsAccordionCollection=[]),document.querySelectorAll(".hs-accordion:not(.--prevent-on-load-init)").forEach((function(t){window.$hsAccordionCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e.treeView=function(){var t=this;if(!document.querySelectorAll(".hs-accordion-treeview-root").length)return!1;this.selectable=[],document.querySelectorAll(".hs-accordion-treeview-root").forEach((function(e){var n=null==e?void 0:e.getAttribute("data-hs-accordion-options"),i=n?JSON.parse(n):{};t.selectable.push({el:e,options:r({},i)})})),this.selectable.length&&this.selectable.forEach((function(e){e.el.querySelectorAll(".hs-accordion-selectable").forEach((function(n){n.addEventListener("click",(function(i){i.stopPropagation(),t.toggleSelected(e,n)}))}))}))},e.toggleSelected=function(t,e){e.classList.contains("selected")?e.classList.remove("selected"):(t.el.querySelectorAll(".hs-accordion-selectable").forEach((function(t){return t.classList.remove("selected")})),e.classList.add("selected"))},e.on=function(t,e,n){var i=window.$hsAccordionCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit(),document.querySelectorAll(".hs-accordion-treeview-root").length&&a.treeView()})),"undefined"!=typeof window&&(window.HSAccordion=a),e.default=a},961:(t,e)=>{Object.defineProperty(e,"__esModule",{value:!0});var n=function(){function t(t,e,n){this.el=t,this.options=e,this.events=n,this.el=t,this.options=e,this.events={}}return t.prototype.createCollection=function(t,e){var n;t.push({id:(null===(n=null==e?void 0:e.el)||void 0===n?void 0:n.id)||t.length+1,element:e})},t.prototype.fireEvent=function(t,e){if(void 0===e&&(e=null),this.events.hasOwnProperty(t))return this.events[t](e)},t.prototype.on=function(t,e){this.events[t]=e},t}();e.default=n},268:function(t,e,n){
/*
 * HSCarousel
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=s(n(961)),c=n(223),u=function(t){function e(e,n){var i,o,s,l,a,c=t.call(this,e,n)||this,u=e.getAttribute("data-hs-carousel"),d=u?JSON.parse(u):{},p=r(r({},d),n);return c.currentIndex=p.currentIndex||0,c.loadingClasses=p.loadingClasses?"".concat(p.loadingClasses).split(","):null,c.dotsItemClasses=p.dotsItemClasses?p.dotsItemClasses:null,c.isAutoHeight=void 0!==p.isAutoHeight&&p.isAutoHeight,c.isAutoPlay=void 0!==p.isAutoPlay&&p.isAutoPlay,c.isCentered=void 0!==p.isCentered&&p.isCentered,c.isDraggable=void 0!==p.isDraggable&&p.isDraggable,c.isInfiniteLoop=void 0!==p.isInfiniteLoop&&p.isInfiniteLoop,c.isRTL=void 0!==p.isRTL&&p.isRTL,c.isSnap=void 0!==p.isSnap&&p.isSnap,c.hasSnapSpacers=void 0===p.hasSnapSpacers||p.hasSnapSpacers,c.speed=p.speed||4e3,c.updateDelay=p.updateDelay||0,c.slidesQty=p.slidesQty||1,c.loadingClassesRemove=(null===(i=c.loadingClasses)||void 0===i?void 0:i[0])?c.loadingClasses[0].split(" "):"opacity-0",c.loadingClassesAdd=(null===(o=c.loadingClasses)||void 0===o?void 0:o[1])?c.loadingClasses[1].split(" "):"",c.afterLoadingClassesAdd=(null===(s=c.loadingClasses)||void 0===s?void 0:s[2])?c.loadingClasses[2].split(" "):"",c.container=c.el.querySelector(".hs-carousel")||null,c.inner=c.el.querySelector(".hs-carousel-body")||null,c.slides=c.el.querySelectorAll(".hs-carousel-slide")||[],c.prev=c.el.querySelector(".hs-carousel-prev")||null,c.next=c.el.querySelector(".hs-carousel-next")||null,c.dots=c.el.querySelector(".hs-carousel-pagination")||null,c.info=c.el.querySelector(".hs-carousel-info")||null,c.infoTotal=(null===(l=null==c?void 0:c.info)||void 0===l?void 0:l.querySelector(".hs-carousel-info-total"))||null,c.infoCurrent=(null===(a=null==c?void 0:c.info)||void 0===a?void 0:a.querySelector(".hs-carousel-info-current"))||null,c.sliderWidth=c.el.getBoundingClientRect().width,c.isDragging=!1,c.dragStartX=null,c.initialTranslateX=null,c.touchX={start:0,end:0},c.resizeContainer=document.querySelector("body"),c.resizeContainerWidth=0,c.init(),c}return o(e,t),e.prototype.setIsSnap=function(){var t=this,e=this.container.getBoundingClientRect(),n=e.left+e.width/2,i=null,o=null,r=1/0;Array.from(this.inner.children).forEach((function(e){var o=e.getBoundingClientRect(),s=t.inner.getBoundingClientRect(),l=o.left+o.width/2-s.left,a=Math.abs(n-(s.left+l));a<r&&(r=a,i=e)})),i&&(o=Array.from(this.slides).findIndex((function(t){return t===i}))),this.setIndex(o),this.dots&&this.setCurrentDot()},e.prototype.init=function(){var t=this;this.createCollection(window.$hsCarouselCollection,this),this.inner&&(this.calculateWidth(),this.isDraggable&&!this.isSnap&&this.initDragHandling()),this.prev&&this.prev.addEventListener("click",(function(){t.goToPrev(),t.isAutoPlay&&(t.resetTimer(),t.setTimer())})),this.next&&this.next.addEventListener("click",(function(){t.goToNext(),t.isAutoPlay&&(t.resetTimer(),t.setTimer())})),this.dots&&this.initDots(),this.info&&this.buildInfo(),this.slides.length&&(this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass(),this.isAutoPlay&&this.autoPlay()),setTimeout((function(){var e,n;t.isSnap&&t.setIsSnap(),t.loadingClassesRemove&&("string"==typeof t.loadingClassesRemove?t.inner.classList.remove(t.loadingClassesRemove):(e=t.inner.classList).remove.apply(e,t.loadingClassesRemove)),t.loadingClassesAdd&&("string"==typeof t.loadingClassesAdd?t.inner.classList.add(t.loadingClassesAdd):(n=t.inner.classList).add.apply(n,t.loadingClassesAdd)),t.inner&&t.afterLoadingClassesAdd&&setTimeout((function(){var e;"string"==typeof t.afterLoadingClassesAdd?t.inner.classList.add(t.afterLoadingClassesAdd):(e=t.inner.classList).add.apply(e,t.afterLoadingClassesAdd)}))}),400),this.isSnap&&this.container.addEventListener("scroll",(function(){clearTimeout(t.isScrolling),t.isScrolling=setTimeout((function(){t.setIsSnap()}),100)})),this.el.classList.add("init"),this.isSnap||(this.el.addEventListener("touchstart",(function(e){t.touchX.start=e.changedTouches[0].screenX})),this.el.addEventListener("touchend",(function(e){t.touchX.end=e.changedTouches[0].screenX,t.detectDirection()}))),this.observeResize()},e.prototype.initDragHandling=function(){var t=this.inner;t&&(t.addEventListener("mousedown",this.handleDragStart.bind(this)),t.addEventListener("touchstart",this.handleDragStart.bind(this),{passive:!0}),document.addEventListener("mousemove",this.handleDragMove.bind(this)),document.addEventListener("touchmove",this.handleDragMove.bind(this),{passive:!1}),document.addEventListener("mouseup",this.handleDragEnd.bind(this)),document.addEventListener("touchend",this.handleDragEnd.bind(this)))},e.prototype.getTranslateXValue=function(){var t,e=window.getComputedStyle(this.inner).transform;if("none"!==e){var n=null===(t=e.match(/matrix.*\((.+)\)/))||void 0===t?void 0:t[1].split(", ");if(n){var i=parseFloat(6===n.length?n[4]:n[12]);return this.isRTL&&(i=-i),isNaN(i)||0===i?0:-i}}return 0},e.prototype.removeClickEventWhileDragging=function(t){t.preventDefault()},e.prototype.handleDragStart=function(t){t.preventDefault(),this.isDragging=!0,this.dragStartX=this.getEventX(t),this.initialTranslateX=this.isRTL?this.getTranslateXValue():-this.getTranslateXValue(),this.inner.classList.add("dragging")},e.prototype.handleDragMove=function(t){var e=this;if(this.isDragging){this.inner.querySelectorAll("a:not(.prevented-click)").forEach((function(t){t.classList.add("prevented-click"),t.addEventListener("click",e.removeClickEventWhileDragging)}));var n=this.getEventX(t)-this.dragStartX;this.isRTL&&(n=-n);var i=this.initialTranslateX+n;this.setTranslate(function(){var t=e.sliderWidth*e.slides.length/e.getCurrentSlidesQty()-e.sliderWidth,n=e.sliderWidth,o=(n-n/e.getCurrentSlidesQty())/2,r=e.isCentered?o:0;e.isCentered&&(t+=o);var s=-t;return e.isRTL?i<r?r:i>t?s:-i:i>r?r:i<-t?s:i}())}},e.prototype.handleDragEnd=function(){var t=this;if(this.isDragging){this.isDragging=!1;var e=this.sliderWidth/this.getCurrentSlidesQty(),n=this.getTranslateXValue(),i=Math.round(n/e);this.isRTL&&(i=Math.round(n/e)),this.inner.classList.remove("dragging"),setTimeout((function(){t.calculateTransform(i),t.dots&&t.setCurrentDot(),t.dragStartX=null,t.initialTranslateX=null,t.inner.querySelectorAll("a.prevented-click").forEach((function(e){e.classList.remove("prevented-click"),e.removeEventListener("click",t.removeClickEventWhileDragging)}))}))}},e.prototype.getEventX=function(t){return t instanceof MouseEvent?t.clientX:t.touches[0].clientX},e.prototype.getCurrentSlidesQty=function(){var t=this;if("object"==typeof this.slidesQty){var e=document.body.clientWidth,n=0;return Object.keys(this.slidesQty).forEach((function(i){e>=(typeof i+1=="number"?t.slidesQty[i]:c.BREAKPOINTS[i])&&(n=t.slidesQty[i])})),n}return this.slidesQty},e.prototype.buildSnapSpacers=function(){var t=this.inner.querySelector(".hs-snap-before"),e=this.inner.querySelector(".hs-snap-after");t&&t.remove(),e&&e.remove();var n=this.sliderWidth,i=n/2-n/this.getCurrentSlidesQty()/2,o=(0,l.htmlToElement)('<div class="hs-snap-before" style="height: 100%; width: '.concat(i,'px"></div>')),r=(0,l.htmlToElement)('<div class="hs-snap-after" style="height: 100%; width: '.concat(i,'px"></div>'));this.inner.prepend(o),this.inner.appendChild(r)},e.prototype.initDots=function(){this.el.querySelectorAll(".hs-carousel-pagination-item").length?this.setDots():this.buildDots(),this.dots&&this.setCurrentDot()},e.prototype.buildDots=function(){this.dots.innerHTML="";for(var t=!this.isCentered&&this.slidesQty?this.slides.length-(this.getCurrentSlidesQty()-1):this.slides.length,e=0;e<t;e++){var n=this.buildSingleDot(e);this.dots.append(n)}},e.prototype.setDots=function(){var t=this;this.dotsItems=this.dots.querySelectorAll(".hs-carousel-pagination-item"),this.dotsItems.forEach((function(e,n){var i=e.getAttribute("data-carousel-pagination-item-target");t.singleDotEvents(e,i?+i:n)}))},e.prototype.goToCurrentDot=function(){var t=this.dots,e=t.getBoundingClientRect(),n=t.scrollLeft,i=t.scrollTop,o=t.clientWidth,r=t.clientHeight,s=this.dotsItems[this.currentIndex],l=s.getBoundingClientRect(),a=l.left-e.left+n,c=a+s.clientWidth,u=l.top-e.top+i,d=u+s.clientHeight,p=n,h=i;(a<n||c>n+o)&&(p=c-o),(u<i||d>i+r)&&(h=d-r),t.scrollTo({left:p,top:h,behavior:"smooth"})},e.prototype.buildInfo=function(){this.infoTotal&&this.setInfoTotal(),this.infoCurrent&&this.setInfoCurrent()},e.prototype.setInfoTotal=function(){this.infoTotal.innerText="".concat(this.slides.length)},e.prototype.setInfoCurrent=function(){this.infoCurrent.innerText="".concat(this.currentIndex+1)},e.prototype.buildSingleDot=function(t){var e=(0,l.htmlToElement)("<span></span>");return this.dotsItemClasses&&(0,l.classToClassList)(this.dotsItemClasses,e),this.singleDotEvents(e,t),e},e.prototype.singleDotEvents=function(t,e){var n=this;t.addEventListener("click",(function(){n.goTo(e),n.isAutoPlay&&(n.resetTimer(),n.setTimer())}))},e.prototype.observeResize=function(){var t=this;new ResizeObserver((0,l.debounce)((function(e){for(var n=0,i=e;n<i.length;n++){var o=i[n].contentRect.width;o!==t.resizeContainerWidth&&(t.recalculateWidth(),t.dots&&t.initDots(),t.addCurrentClass(),t.resizeContainerWidth=o)}}),this.updateDelay)).observe(this.resizeContainer)},e.prototype.calculateWidth=function(){var t=this;this.isSnap||(this.inner.style.width="".concat(this.sliderWidth*this.slides.length/this.getCurrentSlidesQty(),"px")),this.slides.forEach((function(e){e.style.width="".concat(t.sliderWidth/t.getCurrentSlidesQty(),"px")})),this.calculateTransform()},e.prototype.addCurrentClass=function(){var t=this;if(this.isSnap)for(var e=Math.floor(this.getCurrentSlidesQty()/2),n=0;n<this.slides.length;n++){var i=this.slides[n];n<=this.currentIndex+e&&n>=this.currentIndex-e?i.classList.add("active"):i.classList.remove("active")}else{var o=this.isCentered?this.currentIndex+this.getCurrentSlidesQty()+(this.getCurrentSlidesQty()-1):this.currentIndex+this.getCurrentSlidesQty();this.slides.forEach((function(e,n){n>=t.currentIndex&&n<o?e.classList.add("active"):e.classList.remove("active")}))}},e.prototype.setCurrentDot=function(){var t=this,e=function(e,n){var i=Math.floor(t.getCurrentSlidesQty()/2);(t.isSnap&&!t.hasSnapSpacers?n===(t.getCurrentSlidesQty()%2==0?t.currentIndex-i+1:t.currentIndex-i):n===t.currentIndex)?e.classList.add("active"):e.classList.remove("active")};this.dotsItems?this.dotsItems.forEach((function(t,n){return e(t,n)})):this.dots.querySelectorAll(":scope > *").forEach((function(t,n){return e(t,n)}))},e.prototype.setElementToDisabled=function(t){t.classList.add("disabled"),"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.setAttribute("disabled","disabled")},e.prototype.unsetElementToDisabled=function(t){t.classList.remove("disabled"),"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.removeAttribute("disabled")},e.prototype.addDisabledClass=function(){if(!this.prev||!this.next)return!1;var t=getComputedStyle(this.inner).getPropertyValue("gap"),e=Math.floor(this.getCurrentSlidesQty()/2),n=0,i=0,o=!1,r=!1;this.isSnap?(n=this.currentIndex,i=this.hasSnapSpacers?this.slides.length-1:this.slides.length-e-1,o=this.hasSnapSpacers?0===n:this.getCurrentSlidesQty()%2==0?n-e<0:n-e==0,r=n>=i&&this.container.scrollLeft+this.container.clientWidth+(parseFloat(t)||0)>=this.container.scrollWidth):(o=0===(n=this.currentIndex),r=n>=(i=this.isCentered?this.slides.length-this.getCurrentSlidesQty()+(this.getCurrentSlidesQty()-1):this.slides.length-this.getCurrentSlidesQty())),o?(this.unsetElementToDisabled(this.next),this.setElementToDisabled(this.prev)):r?(this.unsetElementToDisabled(this.prev),this.setElementToDisabled(this.next)):(this.unsetElementToDisabled(this.prev),this.unsetElementToDisabled(this.next))},e.prototype.autoPlay=function(){this.setTimer()},e.prototype.setTimer=function(){var t=this;this.timer=setInterval((function(){t.currentIndex===t.slides.length-1?t.goTo(0):t.goToNext()}),this.speed)},e.prototype.resetTimer=function(){clearInterval(this.timer)},e.prototype.detectDirection=function(){var t=this.touchX,e=t.start,n=t.end;n<e&&this.goToNext(),n>e&&this.goToPrev()},e.prototype.recalculateWidth=function(){this.sliderWidth=this.inner.parentElement.getBoundingClientRect().width,this.calculateWidth(),this.sliderWidth!==this.inner.parentElement.getBoundingClientRect().width&&this.recalculateWidth()},e.prototype.calculateTransform=function(t){void 0!==t&&(this.currentIndex=t),this.currentIndex>this.slides.length-this.getCurrentSlidesQty()&&!this.isCentered&&(this.currentIndex=this.slides.length-this.getCurrentSlidesQty());var e=this.sliderWidth,n=e/this.getCurrentSlidesQty(),i=this.currentIndex*n;if(this.isSnap&&!this.isCentered&&this.container.scrollLeft<e&&this.container.scrollLeft+n/2>e&&(this.container.scrollLeft=this.container.scrollWidth),this.isCentered&&!this.isSnap){var o=(e-n)/2;if(0===this.currentIndex)i=-o;else if(this.currentIndex>=this.slides.length-this.getCurrentSlidesQty()+(this.getCurrentSlidesQty()-1)){i=this.slides.length*n-e+o}else i=this.currentIndex*n-o}this.isSnap||(this.inner.style.transform=this.isRTL?"translate(".concat(i,"px, 0px)"):"translate(".concat(-i,"px, 0px)")),this.isAutoHeight&&(this.inner.style.height="".concat(this.slides[this.currentIndex].clientHeight,"px")),this.dotsItems&&this.goToCurrentDot(),this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass(),this.isSnap&&this.hasSnapSpacers&&this.buildSnapSpacers(),this.infoCurrent&&this.setInfoCurrent()},e.prototype.setTranslate=function(t){this.inner.style.transform=this.isRTL?"translate(".concat(-t,"px, 0px)"):"translate(".concat(t,"px, 0px)")},e.prototype.goToPrev=function(){if(this.currentIndex>0?this.currentIndex--:this.currentIndex=this.slides.length-this.getCurrentSlidesQty(),this.isSnap){var t=this.sliderWidth/this.getCurrentSlidesQty();this.container.scrollBy({left:Math.max(-this.container.scrollLeft,-t),behavior:"smooth"}),this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass()}else this.calculateTransform();this.dots&&this.setCurrentDot()},e.prototype.goToNext=function(){var t=this.isCentered?this.slides.length-this.getCurrentSlidesQty()+(this.getCurrentSlidesQty()-1):this.slides.length-this.getCurrentSlidesQty();if(this.currentIndex<t?this.currentIndex++:this.currentIndex=0,this.isSnap){var e=this.sliderWidth/this.getCurrentSlidesQty(),n=this.container.scrollWidth-this.container.clientWidth;this.container.scrollBy({left:Math.min(e,n-this.container.scrollLeft),behavior:"smooth"}),this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass()}else this.calculateTransform();this.dots&&this.setCurrentDot()},e.prototype.goTo=function(t){var e=this.currentIndex;if(this.currentIndex=t,this.isSnap){var n=this.sliderWidth/this.getCurrentSlidesQty(),i=e>this.currentIndex?e-this.currentIndex:this.currentIndex-e,o=e>this.currentIndex?-n*i:n*i;this.container.scrollBy({left:o,behavior:"smooth"}),this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass()}else this.calculateTransform();this.dots&&this.setCurrentDot()},e.prototype.setIndex=function(t){this.currentIndex=t,this.addCurrentClass(),this.isInfiniteLoop||this.addDisabledClass()},e.getInstance=function(t,e){var n=window.$hsCarouselCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsCarouselCollection||(window.$hsCarouselCollection=[]),document.querySelectorAll("[data-hs-carousel]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsCarouselCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(a.default);window.addEventListener("load",(function(){u.autoInit()})),"undefined"!=typeof window&&(window.HSCarousel=u),e.default=u},485:function(t,e,n){
/*
 * HSCollapse
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(292),l=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;return o.contentId=o.el.dataset.hsCollapse,o.content=document.querySelector(o.contentId),o.animationInProcess=!1,o.content&&o.init(),o}return o(e,t),e.prototype.init=function(){var t,e=this;this.createCollection(window.$hsCollapseCollection,this),(null===(t=null==this?void 0:this.el)||void 0===t?void 0:t.ariaExpanded)&&(this.el.classList.contains("open")?this.el.ariaExpanded="true":this.el.ariaExpanded="false"),this.el.addEventListener("click",(function(){e.content.classList.contains("open")?e.hide():e.show()}))},e.prototype.hideAllMegaMenuItems=function(){this.content.querySelectorAll(".hs-mega-menu-content.block").forEach((function(t){t.classList.remove("block"),t.classList.add("hidden")}))},e.prototype.show=function(){var t,e=this;if(this.animationInProcess||this.el.classList.contains("open"))return!1;this.animationInProcess=!0,this.el.classList.add("open"),(null===(t=null==this?void 0:this.el)||void 0===t?void 0:t.ariaExpanded)&&(this.el.ariaExpanded="true"),this.content.classList.add("open"),this.content.classList.remove("hidden"),this.content.style.height="0",setTimeout((function(){e.content.style.height="".concat(e.content.scrollHeight,"px"),e.fireEvent("beforeOpen",e.el),(0,s.dispatch)("beforeOpen.hs.collapse",e.el,e.el)})),(0,s.afterTransition)(this.content,(function(){e.content.style.height="",e.fireEvent("open",e.el),(0,s.dispatch)("open.hs.collapse",e.el,e.el),e.animationInProcess=!1}))},e.prototype.hide=function(){var t,e=this;if(this.animationInProcess||!this.el.classList.contains("open"))return!1;this.animationInProcess=!0,this.el.classList.remove("open"),(null===(t=null==this?void 0:this.el)||void 0===t?void 0:t.ariaExpanded)&&(this.el.ariaExpanded="false"),this.content.style.height="".concat(this.content.scrollHeight,"px"),setTimeout((function(){e.content.style.height="0"})),this.content.classList.remove("open"),(0,s.afterTransition)(this.content,(function(){e.content.classList.add("hidden"),e.content.style.height="",e.fireEvent("hide",e.el),(0,s.dispatch)("hide.hs.collapse",e.el,e.el),e.animationInProcess=!1})),this.content.querySelectorAll(".hs-mega-menu-content.block").length&&this.hideAllMegaMenuItems()},e.getInstance=function(t,e){void 0===e&&(e=!1);var n=window.$hsCollapseCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsCollapseCollection||(window.$hsCollapseCollection=[]),document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach((function(t){window.$hsCollapseCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e.show=function(t){var e=window.$hsCollapseCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.content.classList.contains("hidden")&&e.element.show()},e.hide=function(t){var e=window.$hsCollapseCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&!e.element.content.classList.contains("hidden")&&e.element.hide()},e.on=function(t,e,n){var i=window.$hsCollapseCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(r(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),"undefined"!=typeof window&&(window.HSCollapse=l),e.default=l},809:function(t,e,n){
/*
 * HSComboBox
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,r){function s(t){try{a(i.next(t))}catch(t){r(t)}}function l(t){try{a(i.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,l)}a((i=i.apply(t,e||[])).next())}))},l=this&&this.__generator||function(t,e){var n,i,o,r,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(l){return function(a){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,l[0]&&(s=0)),s;)try{if(n=1,i&&(o=2&l[0]?i.return:l[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,l[1])).done)return o;switch(i=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,i=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){s.label=l[1];break}if(6===l[0]&&s.label<o[1]){s.label=o[1],o=l;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(l);break}o[2]&&s.ops.pop(),s.trys.pop();continue}l=e.call(t,s)}catch(t){l=[6,t],i=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,a])}}},a=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,o=0,r=e.length;o<r;o++)!i&&o in e||(i||(i=Array.prototype.slice.call(e,0,o)),i[o]=e[o]);return t.concat(i||Array.prototype.slice.call(e))},c=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var u=n(292),d=c(n(961)),p=n(223),h=function(t){function e(e,n,i){var o,s,l,a,c,u,d,p,h,f,v,m,g,y,w,b,S,C,x,I,T,E,O,L,A,_=t.call(this,e,n,i)||this,k=e.getAttribute("data-hs-combo-box"),P=k?JSON.parse(k):{},D=r(r({},P),n);return _.gap=5,_.viewport=null!==(o="string"==typeof(null==D?void 0:D.viewport)?document.querySelector(null==D?void 0:D.viewport):null==D?void 0:D.viewport)&&void 0!==o?o:null,_.preventVisibility=null!==(s=null==D?void 0:D.preventVisibility)&&void 0!==s&&s,_.apiUrl=null!==(l=null==D?void 0:D.apiUrl)&&void 0!==l?l:null,_.apiDataPart=null!==(a=null==D?void 0:D.apiDataPart)&&void 0!==a?a:null,_.apiQuery=null!==(c=null==D?void 0:D.apiQuery)&&void 0!==c?c:null,_.apiSearchQuery=null!==(u=null==D?void 0:D.apiSearchQuery)&&void 0!==u?u:null,_.apiHeaders=null!==(d=null==D?void 0:D.apiHeaders)&&void 0!==d?d:{},_.apiGroupField=null!==(p=null==D?void 0:D.apiGroupField)&&void 0!==p?p:null,_.outputItemTemplate=null!==(h=null==D?void 0:D.outputItemTemplate)&&void 0!==h?h:'<div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-none focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" data-hs-combo-box-output-item>\n\t\t\t\t<div class="flex justify-between items-center w-full">\n\t\t\t\t\t<span data-hs-combo-box-search-text></span>\n\t\t\t\t\t<span class="hidden hs-combo-box-selected:block">\n\t\t\t\t\t\t<svg class="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http:.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n\t\t\t\t\t\t\t<polyline points="20 6 9 17 4 12"></polyline>\n\t\t\t\t\t\t</svg>\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>',_.outputEmptyTemplate=null!==(f=null==D?void 0:D.outputEmptyTemplate)&&void 0!==f?f:'<div class="py-2 px-4 w-full text-sm text-gray-800 rounded-lg dark:bg-neutral-900 dark:text-neutral-200">Nothing found...</div>',_.outputLoaderTemplate=null!==(v=null==D?void 0:D.outputLoaderTemplate)&&void 0!==v?v:'<div class="flex justify-center items-center py-2 px-4 text-sm text-gray-800 rounded-lg bg-white dark:bg-neutral-900 dark:text-neutral-200">\n\t\t\t\t<div class="animate-spin inline-block size-6 border-[3px] border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">\n\t\t\t\t\t<span class="sr-only">Loading...</span>\n\t\t\t\t</div>\n\t\t\t</div>',_.groupingType=null!==(m=null==D?void 0:D.groupingType)&&void 0!==m?m:null,_.groupingTitleTemplate=null!==(g=null==D?void 0:D.groupingTitleTemplate)&&void 0!==g?g:"default"===_.groupingType?'<div class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500"></div>':'<button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"></button>',_.tabsWrapperTemplate=null!==(y=null==D?void 0:D.tabsWrapperTemplate)&&void 0!==y?y:'<div class="overflow-x-auto p-4"></div>',_.preventSelection=null!==(w=null==D?void 0:D.preventSelection)&&void 0!==w&&w,_.preventAutoPosition=null!==(b=null==D?void 0:D.preventAutoPosition)&&void 0!==b&&b,_.isOpenOnFocus=null!==(S=null==D?void 0:D.isOpenOnFocus)&&void 0!==S&&S,_.input=null!==(C=_.el.querySelector("[data-hs-combo-box-input]"))&&void 0!==C?C:null,_.output=null!==(x=_.el.querySelector("[data-hs-combo-box-output]"))&&void 0!==x?x:null,_.itemsWrapper=null!==(I=_.el.querySelector("[data-hs-combo-box-output-items-wrapper]"))&&void 0!==I?I:null,_.items=null!==(T=Array.from(_.el.querySelectorAll("[data-hs-combo-box-output-item]")))&&void 0!==T?T:[],_.tabs=[],_.toggle=null!==(E=_.el.querySelector("[data-hs-combo-box-toggle]"))&&void 0!==E?E:null,_.toggleClose=null!==(O=_.el.querySelector("[data-hs-combo-box-close]"))&&void 0!==O?O:null,_.toggleOpen=null!==(L=_.el.querySelector("[data-hs-combo-box-open]"))&&void 0!==L?L:null,_.outputPlaceholder=null,_.selected=_.value=null!==(A=_.el.querySelector("[data-hs-combo-box-input]").value)&&void 0!==A?A:"",_.isOpened=!1,_.isCurrent=!1,_.animationInProcess=!1,_.selectedGroup="all",_.init(),_}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsComboBoxCollection,this),this.build()},e.prototype.build=function(){this.buildInput(),this.groupingType&&this.setGroups(),this.buildItems(),this.preventVisibility&&(this.preventAutoPosition||this.recalculateDirection()),this.toggle&&this.buildToggle(),this.toggleClose&&this.buildToggleClose(),this.toggleOpen&&this.buildToggleOpen()},e.prototype.setResultAndRender=function(t){void 0===t&&(t="");var e=this.preventVisibility?this.input.value:t;this.setResults(e),this.apiSearchQuery&&this.itemsFromJson()},e.prototype.buildInput=function(){var t=this;this.isOpenOnFocus&&this.input.addEventListener("focus",(function(){t.isOpened||(t.setResultAndRender(),t.open())})),this.input.addEventListener("input",(0,u.debounce)((function(e){t.setResultAndRender(e.target.value),""!==t.input.value?t.el.classList.add("has-value"):t.el.classList.remove("has-value"),t.isOpened||t.open()})))},e.prototype.buildItems=function(){this.output.role="listbox",this.output.tabIndex=-1,this.output.ariaOrientation="vertical",this.apiUrl?this.itemsFromJson():(this.itemsWrapper?this.itemsWrapper.innerHTML="":this.output.innerHTML="",this.itemsFromHtml())},e.prototype.setResults=function(t){this.value=t,this.resultItems(),this.hasVisibleItems()?this.destroyOutputPlaceholder():this.buildOutputPlaceholder()},e.prototype.isItemExists=function(t){return this.items.some((function(e){var n,i,o,r=null!==(n=e.getAttribute("data-hs-combo-box-output-item-group-field"))&&void 0!==n?n:null,s=null!==(i=JSON.parse(e.getAttribute("data-hs-combo-box-output-item")))&&void 0!==i?i:null,l=null;return r&&(null===(o=null==s?void 0:s.group)||void 0===o?void 0:o.name)&&(l=t[r]),Array.from(e.querySelectorAll("[data-hs-combo-box-search-text]")).some((function(e){var n;return(null===(n=null==s?void 0:s.group)||void 0===n?void 0:n.name)&&l?l===s.group.name&&e.getAttribute("data-hs-combo-box-search-text")===t[e.getAttribute("data-hs-combo-box-output-item-field")]:e.getAttribute("data-hs-combo-box-search-text")===t[e.getAttribute("data-hs-combo-box-output-item-field")]}))}))},e.prototype.isTextExists=function(t,e){var n=e.map((function(t){return t.toLowerCase()}));return Array.from(t.querySelectorAll("[data-hs-combo-box-search-text]")).some((function(t){return n.includes(t.getAttribute("data-hs-combo-box-search-text").toLowerCase())}))},e.prototype.isTextExistsAny=function(t,e){return Array.from(t.querySelectorAll("[data-hs-combo-box-search-text]")).some((function(t){return t.getAttribute("data-hs-combo-box-search-text").toLowerCase().includes(e.toLowerCase())}))},e.prototype.valuesBySelector=function(t){return Array.from(t.querySelectorAll("[data-hs-combo-box-search-text]")).reduce((function(t,e){return a(a([],t,!0),[e.getAttribute("data-hs-combo-box-search-text")],!1)}),[])},e.prototype.buildOutputLoader=function(){if(this.outputLoader)return!1;this.outputLoader=(0,u.htmlToElement)(this.outputLoaderTemplate),this.items.length||this.outputPlaceholder?(this.outputLoader.style.position="absolute",this.outputLoader.style.top="0",this.outputLoader.style.bottom="0",this.outputLoader.style.left="0",this.outputLoader.style.right="0",this.outputLoader.style.zIndex="2"):(this.outputLoader.style.position="",this.outputLoader.style.top="",this.outputLoader.style.bottom="",this.outputLoader.style.left="",this.outputLoader.style.right="",this.outputLoader.style.zIndex="",this.outputLoader.style.height="30px"),this.output.append(this.outputLoader)},e.prototype.destroyOutputLoader=function(){this.outputLoader&&this.outputLoader.remove(),this.outputLoader=null},e.prototype.itemsFromJson=function(){return s(this,void 0,void 0,(function(){var t,e,n,i,o,r=this;return l(this,(function(s){switch(s.label){case 0:this.buildOutputLoader(),s.label=1;case 1:return s.trys.push([1,4,,5]),t="".concat(this.apiQuery),e="".concat(this.apiSearchQuery,"=").concat(this.value.toLowerCase()),n=this.apiUrl,this.apiQuery&&this.apiSearchQuery?n+="?".concat(e,"&").concat(t):this.apiQuery?n+="?".concat(t):this.apiSearchQuery&&(n+="?".concat(e)),[4,fetch(n,this.apiHeaders)];case 2:return[4,s.sent().json()];case 3:return i=s.sent(),this.apiDataPart&&(i=i[this.apiDataPart]),this.apiSearchQuery&&(this.items=[]),this.itemsWrapper?this.itemsWrapper.innerHTML="":this.output.innerHTML="","tabs"===this.groupingType?(this.setApiGroups(i),this.groupTabsRender(),this.jsonItemsRender(i)):"default"===this.groupingType?(this.setApiGroups(i),this.groups.forEach((function(t){var e=(0,u.htmlToElement)(r.groupingTitleTemplate);e.setAttribute("data-hs-combo-box-group-title",t.name),e.classList.add("--exclude-accessibility"),e.innerText=t.title;var n=i.filter((function(e){return e[r.apiGroupField]===t.name}));r.itemsWrapper?r.itemsWrapper.append(e):r.output.append(e),r.jsonItemsRender(n)}))):this.jsonItemsRender(i),this.setResults(this.input.value),[3,5];case 4:return o=s.sent(),console.error(o),[3,5];case 5:return this.destroyOutputLoader(),[2]}}))}))},e.prototype.jsonItemsRender=function(t){var e=this;t.forEach((function(t,n){var i=(0,u.htmlToElement)(e.outputItemTemplate);i.querySelectorAll("[data-hs-combo-box-output-item-field]").forEach((function(e){var n=t[e.getAttribute("data-hs-combo-box-output-item-field")],i=e.hasAttribute("data-hs-combo-box-output-item-hide-if-empty");e.textContent=null!=n?n:"",!n&&i&&(e.style.display="none")})),i.querySelectorAll("[data-hs-combo-box-search-text]").forEach((function(e){var n;e.setAttribute("data-hs-combo-box-search-text",null!==(n=t[e.getAttribute("data-hs-combo-box-output-item-field")])&&void 0!==n?n:"")})),i.querySelectorAll("[data-hs-combo-box-output-item-attr]").forEach((function(e){JSON.parse(e.getAttribute("data-hs-combo-box-output-item-attr")).forEach((function(n){e.setAttribute(n.attr,t[n.valueFrom])}))})),i.setAttribute("tabIndex","".concat(n)),"tabs"!==e.groupingType&&"default"!==e.groupingType||i.setAttribute("data-hs-combo-box-output-item",'{"group": {"name": "'.concat(t[e.apiGroupField],'", "title": "').concat(t[e.apiGroupField],'"}}')),e.items=a(a([],e.items,!0),[i],!1),e.preventSelection||i.addEventListener("click",(function(){e.close(i.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")),e.setSelectedByValue(e.valuesBySelector(i))})),e.appendItemsToWrapper(i)}))},e.prototype.setGroups=function(){var t=[];this.items.forEach((function(e){var n=JSON.parse(e.getAttribute("data-hs-combo-box-output-item")).group;t.some((function(t){return(null==t?void 0:t.name)===n.name}))||t.push(n)})),this.groups=t},e.prototype.setCurrent=function(){window.$hsComboBoxCollection.length&&(window.$hsComboBoxCollection.map((function(t){return t.element.isCurrent=!1})),this.isCurrent=!0)},e.prototype.setApiGroups=function(t){var e=this,n=[];t.forEach((function(t){var i=t[e.apiGroupField];n.some((function(t){return t.name===i}))||n.push({name:i,title:i})})),this.groups=n},e.prototype.sortItems=function(){return this.items.sort((function(t,e){var n=t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"),i=e.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");return n<i?-1:n>i?1:0}))},e.prototype.itemRender=function(t){var e=this,n=t.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");this.itemsWrapper?this.itemsWrapper.append(t):this.output.append(t),this.preventSelection||t.addEventListener("click",(function(){e.close(n),e.setSelectedByValue(e.valuesBySelector(t))}))},e.prototype.plainRender=function(t){var e=this;t.forEach((function(t){e.itemRender(t)}))},e.prototype.groupTabsRender=function(){var t=this,e=(0,u.htmlToElement)(this.tabsWrapperTemplate),n=(0,u.htmlToElement)('<div class="flex flex-nowrap gap-x-2"></div>');e.append(n),this.output.insertBefore(e,this.output.firstChild);var i=(0,u.htmlToElement)(this.groupingTitleTemplate);i.setAttribute("data-hs-combo-box-group-title","all"),i.classList.add("--exclude-accessibility","active"),i.innerText="All",this.tabs=a(a([],this.tabs,!0),[i],!1),n.append(i),i.addEventListener("click",(function(){t.selectedGroup="all";var e=t.tabs.find((function(e){return e.getAttribute("data-hs-combo-box-group-title")===t.selectedGroup}));t.tabs.forEach((function(t){return t.classList.remove("active")})),e.classList.add("active"),t.setItemsVisibility()})),this.groups.forEach((function(e){var i=(0,u.htmlToElement)(t.groupingTitleTemplate);i.setAttribute("data-hs-combo-box-group-title",e.name),i.classList.add("--exclude-accessibility"),i.innerText=e.title,t.tabs=a(a([],t.tabs,!0),[i],!1),n.append(i),i.addEventListener("click",(function(){t.selectedGroup=e.name;var n=t.tabs.find((function(e){return e.getAttribute("data-hs-combo-box-group-title")===t.selectedGroup}));t.tabs.forEach((function(t){return t.classList.remove("active")})),n.classList.add("active"),t.setItemsVisibility()}))}))},e.prototype.groupDefaultRender=function(){var t=this;this.groups.forEach((function(e){var n=(0,u.htmlToElement)(t.groupingTitleTemplate);n.setAttribute("data-hs-combo-box-group-title",e.name),n.classList.add("--exclude-accessibility"),n.innerText=e.title,t.itemsWrapper?t.itemsWrapper.append(n):t.output.append(n);var i=t.sortItems().filter((function(t){return JSON.parse(t.getAttribute("data-hs-combo-box-output-item")).group.name===e.name}));t.plainRender(i)}))},e.prototype.itemsFromHtml=function(){if("default"===this.groupingType)this.groupDefaultRender();else if("tabs"===this.groupingType){var t=this.sortItems();this.groupTabsRender(),this.plainRender(t)}else{t=this.sortItems();this.plainRender(t)}this.setResults(this.input.value)},e.prototype.buildToggle=function(){var t,e,n,i,o=this;this.isOpened?((null===(t=null==this?void 0:this.toggle)||void 0===t?void 0:t.ariaExpanded)&&(this.toggle.ariaExpanded="true"),(null===(e=null==this?void 0:this.input)||void 0===e?void 0:e.ariaExpanded)&&(this.input.ariaExpanded="true")):((null===(n=null==this?void 0:this.toggle)||void 0===n?void 0:n.ariaExpanded)&&(this.toggle.ariaExpanded="false"),(null===(i=null==this?void 0:this.input)||void 0===i?void 0:i.ariaExpanded)&&(this.input.ariaExpanded="false")),this.toggle.addEventListener("click",(function(){o.isOpened?o.close():o.open(o.toggle.getAttribute("data-hs-combo-box-toggle"))}))},e.prototype.buildToggleClose=function(){var t=this;this.toggleClose.addEventListener("click",(function(){return t.close()}))},e.prototype.buildToggleOpen=function(){var t=this;this.toggleOpen.addEventListener("click",(function(){return t.open()}))},e.prototype.setSelectedByValue=function(t){var e=this;this.items.forEach((function(n){e.isTextExists(n,t)?n.classList.add("selected"):n.classList.remove("selected")}))},e.prototype.setValue=function(t){this.selected=t,this.value=t,this.input.value=t,this.fireEvent("select",this.el),(0,u.dispatch)("select.hs.combobox",this.el,this.value)},e.prototype.setItemsVisibility=function(){var t=this;"tabs"===this.groupingType&&"all"!==this.selectedGroup&&this.items.forEach((function(t){t.style.display="none"}));var e="tabs"===this.groupingType?"all"===this.selectedGroup?this.items:this.items.filter((function(e){return JSON.parse(e.getAttribute("data-hs-combo-box-output-item")).group.name===t.selectedGroup})):this.items;"tabs"===this.groupingType&&"all"!==this.selectedGroup&&e.forEach((function(t){t.style.display="block"})),e.forEach((function(e){t.isTextExistsAny(e,t.value)?e.style.display="block":e.style.display="none"})),"default"===this.groupingType&&this.output.querySelectorAll("[data-hs-combo-box-group-title]").forEach((function(e){var n=e.getAttribute("data-hs-combo-box-group-title");t.items.filter((function(t){return JSON.parse(t.getAttribute("data-hs-combo-box-output-item")).group.name===n&&"block"===t.style.display})).length?e.style.display="block":e.style.display="none"}))},e.prototype.hasVisibleItems=function(){return!!this.items.length&&this.items.some((function(t){return"block"===t.style.display}))},e.prototype.appendItemsToWrapper=function(t){this.itemsWrapper?this.itemsWrapper.append(t):this.output.append(t)},e.prototype.buildOutputPlaceholder=function(){this.outputPlaceholder||(this.outputPlaceholder=(0,u.htmlToElement)(this.outputEmptyTemplate)),this.appendItemsToWrapper(this.outputPlaceholder)},e.prototype.destroyOutputPlaceholder=function(){this.outputPlaceholder&&this.outputPlaceholder.remove(),this.outputPlaceholder=null},e.prototype.resultItems=function(){if(!this.items.length)return!1;this.setItemsVisibility(),this.setSelectedByValue([this.selected])},e.prototype.setValueAndOpen=function(t){this.value=t,this.items.length&&this.setItemsVisibility()},e.prototype.open=function(t){var e=this;return!this.animationInProcess&&(void 0!==t&&this.setValueAndOpen(t),!this.preventVisibility&&(this.animationInProcess=!0,this.output.style.display="block",this.preventAutoPosition||this.recalculateDirection(),setTimeout((function(){var t,n;(null===(t=null==e?void 0:e.input)||void 0===t?void 0:t.ariaExpanded)&&(e.input.ariaExpanded="true"),(null===(n=null==e?void 0:e.toggle)||void 0===n?void 0:n.ariaExpanded)&&(e.toggle.ariaExpanded="true"),e.el.classList.add("active"),e.animationInProcess=!1})),void(this.isOpened=!0)))},e.prototype.setValueAndClear=function(t){t?this.setValue(t):this.setValue(this.selected),this.outputPlaceholder&&this.destroyOutputPlaceholder()},e.prototype.close=function(t){var e,n,i=this;return!this.animationInProcess&&(this.preventVisibility?(this.setValueAndClear(t),""!==this.input.value?this.el.classList.add("has-value"):this.el.classList.remove("has-value"),!1):(this.animationInProcess=!0,(null===(e=null==this?void 0:this.input)||void 0===e?void 0:e.ariaExpanded)&&(this.input.ariaExpanded="false"),(null===(n=null==this?void 0:this.toggle)||void 0===n?void 0:n.ariaExpanded)&&(this.toggle.ariaExpanded="false"),this.el.classList.remove("active"),this.preventAutoPosition||(this.output.classList.remove("bottom-full","top-full"),this.output.style.marginTop="",this.output.style.marginBottom=""),(0,u.afterTransition)(this.output,(function(){i.output.style.display="none",i.setValueAndClear(t),i.animationInProcess=!1})),""!==this.input.value?this.el.classList.add("has-value"):this.el.classList.remove("has-value"),void(this.isOpened=!1)))},e.prototype.recalculateDirection=function(){(0,u.isEnoughSpace)(this.output,this.input,"bottom",this.gap,this.viewport)?(this.output.classList.remove("bottom-full"),this.output.style.marginBottom="",this.output.classList.add("top-full"),this.output.style.marginTop="".concat(this.gap,"px")):(this.output.classList.remove("top-full"),this.output.style.marginTop="",this.output.classList.add("bottom-full"),this.output.style.marginBottom="".concat(this.gap,"px"))},e.getInstance=function(t,e){var n=window.$hsComboBoxCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsComboBoxCollection||(window.$hsComboBoxCollection=[]),document.querySelectorAll("[data-hs-combo-box]:not(.--prevent-on-load-init)").forEach((function(t){if(!window.$hsComboBoxCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))){var n=t.getAttribute("data-hs-combo-box"),i=n?JSON.parse(n):{};new e(t,i)}})),window.$hsComboBoxCollection&&(window.addEventListener("click",(function(t){var n=t.target;e.closeCurrentlyOpened(n)})),document.addEventListener("keydown",(function(t){return e.accessibility(t)})))},e.close=function(t){var e=window.$hsComboBoxCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.isOpened&&e.element.close()},e.closeCurrentlyOpened=function(t){if(void 0===t&&(t=null),!t.closest("[data-hs-combo-box].active")){var e=window.$hsComboBoxCollection.filter((function(t){return t.element.isOpened}))||null;e&&e.forEach((function(t){t.element.close()}))}},e.getPreparedItems=function(t,e){return void 0===t&&(t=!1),e?(t?Array.from(e.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter((function(t){return"none"!==t.style.display})).reverse():Array.from(e.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter((function(t){return"none"!==t.style.display}))).filter((function(t){return!t.classList.contains("disabled")})):null},e.setHighlighted=function(t,e,n){e.focus(),n.value=e.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"),t&&t.classList.remove("hs-combo-box-output-item-highlighted"),e.classList.add("hs-combo-box-output-item-highlighted")},e.accessibility=function(t){if(window.$hsComboBoxCollection.find((function(t){return t.element.preventVisibility?t.element.isCurrent:t.element.isOpened}))&&p.COMBO_BOX_ACCESSIBILITY_KEY_SET.includes(t.code)&&!t.metaKey)switch(t.code){case"Escape":t.preventDefault(),this.onEscape();break;case"ArrowUp":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow();break;case"ArrowDown":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow(!1);break;case"Home":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd();break;case"End":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd(!1);break;case"Enter":t.preventDefault(),this.onEnter(t)}},e.onEscape=function(){var t=window.$hsComboBoxCollection.find((function(t){return!t.element.preventVisibility&&t.element.isOpened}));t&&(t.element.close(),t.element.input.blur())},e.onArrow=function(t){var n;void 0===t&&(t=!0);var i=window.$hsComboBoxCollection.find((function(t){return t.element.preventVisibility?t.element.isCurrent:t.element.isOpened}));if(i){var o=null!==(n=i.element.itemsWrapper)&&void 0!==n?n:i.element.output;if(!o)return!1;var r,s=e.getPreparedItems(t,o),l=o.querySelector(".hs-combo-box-output-item-highlighted");l||s[0].classList.add("hs-combo-box-output-item-highlighted");var a=s.findIndex((function(t){return t===l}));a+1<s.length&&a++,r=s[a],e.setHighlighted(l,r,i.element.input)}},e.onStartEnd=function(t){var n;void 0===t&&(t=!0);var i=window.$hsComboBoxCollection.find((function(t){return t.element.preventVisibility?t.element.isCurrent:t.element.isOpened}));if(i){var o=null!==(n=i.element.itemsWrapper)&&void 0!==n?n:i.element.output;if(!o)return!1;var r=e.getPreparedItems(t,o),s=o.querySelector(".hs-combo-box-output-item-highlighted");r.length&&e.setHighlighted(s,r[0],i.element.input)}},e.onEnter=function(t){var e=t.target,n=window.$hsComboBoxCollection.find((function(e){return!(0,u.isParentOrElementHidden)(e.element.el)&&t.target.closest("[data-hs-combo-box]")===e.element.el})),i=n.element.el.querySelector(".hs-combo-box-output-item-highlighted a");e.hasAttribute("data-hs-combo-box-input")?(n.element.close(),e.blur()):(n.element.preventSelection||n.element.setSelectedByValue(n.element.valuesBySelector(t.target)),n.element.preventSelection&&i&&window.location.assign(i.getAttribute("href")),n.element.close(n.element.preventSelection?null:t.target.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text")))},e}(d.default);window.addEventListener("load",(function(){h.autoInit()})),document.addEventListener("scroll",(function(){if(!window.$hsComboBoxCollection)return!1;var t=window.$hsComboBoxCollection.find((function(t){return t.element.isOpened}));t&&!t.element.preventAutoPosition&&t.element.recalculateDirection()})),"undefined"!=typeof window&&(window.HSComboBox=h),e.default=h},406:function(t,e,n){
/*
 * HSCopyMarkup
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-copy-markup"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.targetSelector=(null==l?void 0:l.targetSelector)||null,i.wrapperSelector=(null==l?void 0:l.wrapperSelector)||null,i.limit=(null==l?void 0:l.limit)||null,i.items=[],i.targetSelector&&i.init(),i}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsCopyMarkupCollection,this),this.setTarget(),this.setWrapper(),this.addPredefinedItems(),this.el.addEventListener("click",(function(){return t.copy()}))},e.prototype.copy=function(){if(this.limit&&this.items.length>=this.limit)return!1;this.el.hasAttribute("disabled")&&this.el.setAttribute("disabled","");var t=this.target.cloneNode(!0);this.addToItems(t),this.limit&&this.items.length>=this.limit&&this.el.setAttribute("disabled","disabled"),this.fireEvent("copy",t),(0,l.dispatch)("copy.hs.copyMarkup",t,t)},e.prototype.addPredefinedItems=function(){var t=this;Array.from(this.wrapper.children).filter((function(t){return!t.classList.contains("[--ignore-for-count]")})).forEach((function(e){t.addToItems(e)}))},e.prototype.setTarget=function(){var t="string"==typeof this.targetSelector?document.querySelector(this.targetSelector).cloneNode(!0):this.targetSelector.cloneNode(!0);t.removeAttribute("id"),this.target=t},e.prototype.setWrapper=function(){this.wrapper="string"==typeof this.wrapperSelector?document.querySelector(this.wrapperSelector):this.wrapperSelector},e.prototype.addToItems=function(t){var e=this,n=t.querySelector("[data-hs-copy-markup-delete-item]");this.wrapper?this.wrapper.append(t):this.el.before(t),n&&n.addEventListener("click",(function(){return e.delete(t)})),this.items.push(t)},e.prototype.delete=function(t){var e=this.items.indexOf(t);-1!==e&&this.items.splice(e,1),t.remove(),this.fireEvent("delete",t),(0,l.dispatch)("delete.hs.copyMarkup",t,t)},e.getInstance=function(t,e){var n=window.$hsCopyMarkupCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsCopyMarkupCollection||(window.$hsCopyMarkupCollection=[]),document.querySelectorAll("[data-hs-copy-markup]:not(.--prevent-on-load-init)").forEach((function(t){if(!window.$hsCopyMarkupCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))){var n=t.getAttribute("data-hs-copy-markup"),i=n?JSON.parse(n):{};new e(t,i)}}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSCopyMarkup=a),e.default=a},814:function(t,e,n){
/*
 * HSDataTable
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,o=0,r=e.length;o<r;o++)!i&&o in e||(i||(i=Array.prototype.slice.call(e,0,o)),i[o]=e[o]);return t.concat(i||Array.prototype.slice.call(e))},l=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=n(292),c=function(t){function e(e,n,i){var o,l,a,c,u,d,p,h,f,v,m,g,y,w,b,S,C,x,I,T,E,O,L,A,_,k=t.call(this,e,n,i)||this;k.el="string"==typeof e?document.querySelector(e):e;var P=[];Array.from(k.el.querySelectorAll("thead th, thead td")).forEach((function(t,e){t.classList.contains("--exclude-from-ordering")&&P.push({targets:e,orderable:!1})}));var D=k.el.getAttribute("data-hs-datatable"),B=D?JSON.parse(D):{};return k.concatOptions=r(r({searching:!0,lengthChange:!1,order:[],columnDefs:s([],P,!0)},B),n),k.table=k.el.querySelector("table"),k.search=null!==(o=k.el.querySelector("[data-hs-datatable-search]"))&&void 0!==o?o:null,k.pageEntities=null!==(l=k.el.querySelector("[data-hs-datatable-page-entities]"))&&void 0!==l?l:null,k.paging=null!==(a=k.el.querySelector("[data-hs-datatable-paging]"))&&void 0!==a?a:null,k.pagingPrev=null!==(c=k.el.querySelector("[data-hs-datatable-paging-prev]"))&&void 0!==c?c:null,k.pagingNext=null!==(u=k.el.querySelector("[data-hs-datatable-paging-next]"))&&void 0!==u?u:null,k.pagingPages=null!==(d=k.el.querySelector("[data-hs-datatable-paging-pages]"))&&void 0!==d?d:null,k.info=null!==(p=k.el.querySelector("[data-hs-datatable-info]"))&&void 0!==p?p:null,k.infoFrom=null!==(h=k.el.querySelector("[data-hs-datatable-info-from]"))&&void 0!==h?h:null,k.infoTo=null!==(f=k.el.querySelector("[data-hs-datatable-info-to]"))&&void 0!==f?f:null,k.infoLength=null!==(v=k.el.querySelector("[data-hs-datatable-info-length]"))&&void 0!==v?v:null,(null===(m=k.concatOptions)||void 0===m?void 0:m.rowSelectingOptions)&&(k.rowSelectingAll=null!==(S=(null===(y=null===(g=k.concatOptions)||void 0===g?void 0:g.rowSelectingOptions)||void 0===y?void 0:y.selectAllSelector)?document.querySelector(null===(b=null===(w=k.concatOptions)||void 0===w?void 0:w.rowSelectingOptions)||void 0===b?void 0:b.selectAllSelector):document.querySelector("[data-hs-datatable-row-selecting-all]"))&&void 0!==S?S:null),(null===(C=k.concatOptions)||void 0===C?void 0:C.rowSelectingOptions)&&(k.rowSelectingIndividual=null!==(E=null!==(T=null===(I=null===(x=k.concatOptions)||void 0===x?void 0:x.rowSelectingOptions)||void 0===I?void 0:I.individualSelector)&&void 0!==T?T:"[data-hs-datatable-row-selecting-individual]")&&void 0!==E?E:null),k.pageEntities&&(k.concatOptions.pageLength=parseInt(k.pageEntities.value)),k.maxPagesToShow=3,k.isRowSelecting=!!(null===(O=k.concatOptions)||void 0===O?void 0:O.rowSelectingOptions),k.pageBtnClasses=null!==(_=null===(A=null===(L=k.concatOptions)||void 0===L?void 0:L.pagingOptions)||void 0===A?void 0:A.pageBtnClasses)&&void 0!==_?_:null,k.init(),k}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsDataTableCollection,this),this.initTable(),this.search&&this.initSearch(),this.pageEntities&&this.initPageEntities(),this.paging&&this.initPaging(),this.pagingPrev&&this.initPagingPrev(),this.pagingNext&&this.initPagingNext(),this.pagingPages&&this.buildPagingPages(),this.info&&this.initInfo(),this.isRowSelecting&&this.initRowSelecting()},e.prototype.initTable=function(){var t=this;this.dataTable=new DataTable(this.table,this.concatOptions),this.isRowSelecting&&this.triggerChangeEventToRow(),this.dataTable.on("draw",(function(){t.isRowSelecting&&t.updateSelectAllCheckbox(),t.isRowSelecting&&t.triggerChangeEventToRow(),t.updateInfo(),t.updatePaging()}))},e.prototype.initSearch=function(){var t=this;this.search.addEventListener("input",(0,a.debounce)((function(e){return t.onSearchInput(e.target.value)})))},e.prototype.onSearchInput=function(t){this.dataTable.search(t).draw()},e.prototype.initPageEntities=function(){var t=this;this.pageEntities.addEventListener("change",(function(e){return t.onEntitiesChange(parseInt(e.target.value))}))},e.prototype.onEntitiesChange=function(t){this.dataTable.page.len(t).draw()},e.prototype.initInfo=function(){this.infoFrom&&this.initInfoFrom(),this.infoTo&&this.initInfoTo(),this.infoLength&&this.initInfoLength()},e.prototype.initInfoFrom=function(){var t=this.dataTable.page.info().start;this.infoFrom.innerText="".concat(t+1)},e.prototype.initInfoTo=function(){var t=this.dataTable.page.info().end;this.infoTo.innerText="".concat(t)},e.prototype.initInfoLength=function(){var t=this.dataTable.page.info().recordsTotal;this.infoLength.innerText="".concat(t)},e.prototype.updateInfo=function(){this.initInfo()},e.prototype.initPaging=function(){this.hidePagingIfSinglePage()},e.prototype.hidePagingIfSinglePage=function(){this.dataTable.page.info().pages<2?(this.paging.classList.add("hidden"),this.paging.style.display="none"):(this.paging.classList.remove("hidden"),this.paging.style.display="")},e.prototype.initPagingPrev=function(){var t=this;this.pagingPrev.addEventListener("click",(function(){t.onPrevClick()}))},e.prototype.onPrevClick=function(){this.dataTable.page("previous").draw("page")},e.prototype.disablePagingArrow=function(t,e){e?(t.classList.add("disabled"),t.setAttribute("disabled","disabled")):(t.classList.remove("disabled"),t.removeAttribute("disabled"))},e.prototype.initPagingNext=function(){var t=this;this.pagingNext.addEventListener("click",(function(){t.onNextClick()}))},e.prototype.onNextClick=function(){this.dataTable.page("next").draw("page")},e.prototype.buildPagingPages=function(){this.updatePaging()},e.prototype.updatePaging=function(){var t=this.dataTable.page.info(),e=t.page,n=t.pages,i=t.length,o=this.dataTable.rows({search:"applied"}).count(),r=Math.ceil(o/i),s=e+1,l=Math.max(1,s-Math.floor(this.maxPagesToShow/2)),c=Math.min(r,l+(this.maxPagesToShow-1));c-l+1<this.maxPagesToShow&&(l=Math.max(1,c-this.maxPagesToShow+1)),this.pagingPages.innerHTML="",l>1&&(this.buildPagingPage(1),l>2&&this.pagingPages.appendChild((0,a.htmlToElement)('<span class="ellipsis">...</span>')));for(var u=l;u<=c;u++)this.buildPagingPage(u);c<r&&(c<r-1&&this.pagingPages.appendChild((0,a.htmlToElement)('<span class="ellipsis">...</span>')),this.buildPagingPage(r)),this.disablePagingArrow(this.pagingPrev,0===e),this.disablePagingArrow(this.pagingNext,e===n-1),this.hidePagingIfSinglePage()},e.prototype.buildPagingPage=function(t){var e=this,n=this.dataTable.page.info().page,i=(0,a.htmlToElement)('<button type="button"></button>');i.innerText="".concat(t),i.setAttribute("data-page","".concat(t)),this.pageBtnClasses&&(0,a.classToClassList)(this.pageBtnClasses,i),n===t-1&&i.classList.add("active"),i.addEventListener("click",(function(){return e.onPageClick(t)})),this.pagingPages.append(i)},e.prototype.onPageClick=function(t){this.dataTable.page(t-1).draw("page")},e.prototype.initRowSelecting=function(){var t=this;this.rowSelectingAll.addEventListener("change",(function(){return t.onSelectAllChange()}))},e.prototype.triggerChangeEventToRow=function(){var t=this;this.table.querySelectorAll("tbody ".concat(this.rowSelectingIndividual)).forEach((function(e){e.addEventListener("change",(function(){t.updateSelectAllCheckbox()}))}))},e.prototype.onSelectAllChange=function(){var t=this,e=this.rowSelectingAll.checked;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((function(n){var i=n.querySelector(t.rowSelectingIndividual);i&&(i.checked=e)})),this.updateSelectAllCheckbox()},e.prototype.updateSelectAllCheckbox=function(){var t=this;if(!this.dataTable.rows({search:"applied"}).count())return this.rowSelectingAll.checked=!1,!1;var e=!0;Array.from(this.dataTable.rows({page:"current",search:"applied"}).nodes()).forEach((function(n){var i=n.querySelector(t.rowSelectingIndividual);if(i&&!i.checked)return e=!1,!1})),this.rowSelectingAll.checked=e},e.getInstance=function(t,e){var n=window.$hsDataTableCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsDataTableCollection||(window.$hsDataTableCollection=[]),document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsDataTableCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(l(n(961)).default);window.addEventListener("load",(function(){document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").length&&("undefined"==typeof jQuery&&console.error("HSDataTable: jQuery is not available, please add it to the page."),"undefined"==typeof DataTable&&console.error("HSDataTable: DataTable is not available, please add it to the page.")),"undefined"!=typeof DataTable&&"undefined"!=typeof jQuery&&c.autoInit()})),"undefined"!=typeof window&&(window.HSDataTable=c),e.default=c},891:function(t,e,n){
/*
 * HSDropdown
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,o=0,r=e.length;o<r;o++)!i&&o in e||(i||(i=Array.prototype.slice.call(e,0,o)),i[o]=e[o]);return t.concat(i||Array.prototype.slice.call(e))},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=n(170),c=s(n(961)),u=n(223),d=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;return o.toggle=o.el.querySelector(":scope > .hs-dropdown-toggle")||o.el.querySelector(":scope > .hs-dropdown-toggle-wrapper > .hs-dropdown-toggle")||o.el.children[0],o.closers=Array.from(o.el.querySelectorAll(":scope .hs-dropdown-close"))||null,o.menu=o.el.querySelector(":scope > .hs-dropdown-menu"),o.eventMode=(0,l.getClassProperty)(o.el,"--trigger","click"),o.closeMode=(0,l.getClassProperty)(o.el,"--auto-close","true"),o.animationInProcess=!1,o.toggle&&o.menu&&o.init(),o}return o(e,t),e.prototype.init=function(){var t=this;if(this.createCollection(window.$hsDropdownCollection,this),this.toggle.disabled)return!1;this.toggle&&this.buildToggle(),this.menu&&this.buildMenu(),this.closers&&this.buildClosers(),(0,l.isIOS)()||(0,l.isIpadOS)()||(this.el.addEventListener("mouseenter",(function(){return t.onMouseEnterHandler()})),this.el.addEventListener("mouseleave",(function(){return t.onMouseLeaveHandler()})))},e.prototype.resizeHandler=function(){this.eventMode=(0,l.getClassProperty)(this.el,"--trigger","click"),this.closeMode=(0,l.getClassProperty)(this.el,"--auto-close","true")},e.prototype.buildToggle=function(){var t,e=this;(null===(t=null==this?void 0:this.toggle)||void 0===t?void 0:t.ariaExpanded)&&(this.el.classList.contains("open")?this.toggle.ariaExpanded="true":this.toggle.ariaExpanded="false"),this.toggle.addEventListener("click",(function(t){return e.onClickHandler(t)}))},e.prototype.buildMenu=function(){this.menu.role="menu"},e.prototype.buildClosers=function(){var t=this;this.closers.forEach((function(e){e.addEventListener("click",(function(){return t.close()}))}))},e.prototype.onClickHandler=function(t){this.el.classList.contains("open")&&!this.menu.classList.contains("hidden")?this.close():this.open()},e.prototype.onMouseEnterHandler=function(){if("hover"!==this.eventMode)return!1;this.el._popper&&this.forceClearState(),!this.el.classList.contains("open")&&this.menu.classList.contains("hidden")&&this.open()},e.prototype.onMouseLeaveHandler=function(){if("hover"!==this.eventMode)return!1;this.el.classList.contains("open")&&!this.menu.classList.contains("hidden")&&this.close()},e.prototype.destroyPopper=function(){this.menu.classList.remove("block"),this.menu.classList.add("hidden"),this.menu.style.inset=null,this.menu.style.position=null,this.el&&this.el._popper&&this.el._popper.destroy(),this.animationInProcess=!1},e.prototype.absoluteStrategyModifiers=function(){var t=this;return[{name:"applyStyles",fn:function(e){var n=(window.getComputedStyle(t.el).getPropertyValue("--strategy")||"absolute").replace(" ",""),i=(window.getComputedStyle(t.el).getPropertyValue("--adaptive")||"adaptive").replace(" ","");e.state.elements.popper.style.position=n,e.state.elements.popper.style.transform="adaptive"===i?e.state.styles.popper.transform:null,e.state.elements.popper.style.top=null,e.state.elements.popper.style.bottom=null,e.state.elements.popper.style.left=null,e.state.elements.popper.style.right=null,e.state.elements.popper.style.margin=0}}]},e.prototype.open=function(){var t=this;if(this.el.classList.contains("open"))return!1;if(this.animationInProcess)return!1;this.animationInProcess=!0;var e=(window.getComputedStyle(this.el).getPropertyValue("--placement")||"").replace(" ",""),n=(window.getComputedStyle(this.el).getPropertyValue("--flip")||"true").replace(" ",""),i=(window.getComputedStyle(this.el).getPropertyValue("--strategy")||"fixed").replace(" ",""),o=parseInt((window.getComputedStyle(this.el).getPropertyValue("--offset")||"10").replace(" ","")),s=(window.getComputedStyle(this.el).getPropertyValue("--gpu-acceleration")||"true").replace(" ","");"static"!==i&&(this.el._popper=(0,a.createPopper)(this.el,this.menu,{placement:u.POSITIONS[e]||"bottom-start",strategy:i,modifiers:r(r([],"fixed"!==i?this.absoluteStrategyModifiers():[],!0),[{name:"flip",enabled:"true"===n},{name:"offset",options:{offset:[0,o]}},{name:"computeStyles",options:{adaptive:"fixed"===i,gpuAcceleration:"true"===s}}],!1)})),this.menu.style.margin=null,this.menu.classList.remove("hidden"),this.menu.classList.add("block"),setTimeout((function(){var e;(null===(e=null==t?void 0:t.toggle)||void 0===e?void 0:e.ariaExpanded)&&(t.toggle.ariaExpanded="true"),t.el.classList.add("open"),t.animationInProcess=!1})),this.fireEvent("open",this.el),(0,l.dispatch)("open.hs.dropdown",this.el,this.el)},e.prototype.close=function(t){var e=this;if(void 0===t&&(t=!0),this.animationInProcess||!this.el.classList.contains("open"))return!1;var n;if(this.animationInProcess=!0,t){var i=this.el.querySelector("[data-hs-dropdown-transition]")||this.menu;(0,l.afterTransition)(i,(function(){return e.destroyPopper()}))}else this.destroyPopper();e.menu.style.margin=null,(null===(n=null==e?void 0:e.toggle)||void 0===n?void 0:n.ariaExpanded)&&(e.toggle.ariaExpanded="false"),e.el.classList.remove("open"),e.fireEvent("close",e.el),(0,l.dispatch)("close.hs.dropdown",e.el,e.el)},e.prototype.forceClearState=function(){this.destroyPopper(),this.menu.style.margin=null,this.el.classList.remove("open")},e.getInstance=function(t,e){var n=window.$hsDropdownCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){if(window.$hsDropdownCollection||(window.$hsDropdownCollection=[]),document.querySelectorAll(".hs-dropdown:not(.--prevent-on-load-init)").forEach((function(t){window.$hsDropdownCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)})),window.$hsDropdownCollection){document.addEventListener("keydown",(function(t){return e.accessibility(t)})),window.addEventListener("click",(function(t){var n=t.target;e.closeCurrentlyOpened(n)}));var t=window.innerWidth;window.addEventListener("resize",(function(){window.innerWidth!==t&&(t=innerWidth,e.closeCurrentlyOpened(null,!1))}))}},e.open=function(t){var e=window.$hsDropdownCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.menu.classList.contains("hidden")&&e.element.open()},e.close=function(t){var e=window.$hsDropdownCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&!e.element.menu.classList.contains("hidden")&&e.element.close()},e.accessibility=function(t){this.history=l.menuSearchHistory;var e=window.$hsDropdownCollection.find((function(t){return t.element.el.classList.contains("open")}));if(e&&(u.DROPDOWN_ACCESSIBILITY_KEY_SET.includes(t.code)||4===t.code.length&&t.code[t.code.length-1].match(/^[A-Z]*$/))&&!t.metaKey&&!e.element.menu.querySelector("input:focus")&&!e.element.menu.querySelector("textarea:focus"))switch(t.code){case"Escape":e.element.menu.querySelector(".hs-select.active")||(t.preventDefault(),this.onEscape(t));break;case"Enter":e.element.menu.querySelector(".hs-select button:focus")||e.element.menu.querySelector(".hs-collapse-toggle:focus")||this.onEnter(t);break;case"ArrowUp":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow();break;case"ArrowDown":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow(!1);break;case"Home":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd();break;case"End":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd(!1);break;default:t.preventDefault(),this.onFirstLetter(t.key)}},e.onEscape=function(t){var e=t.target.closest(".hs-dropdown.open");if(window.$hsDropdownCollection.find((function(t){return t.element.el===e}))){var n=window.$hsDropdownCollection.find((function(t){return t.element.el===e}));n&&(n.element.close(),n.element.toggle.focus())}else this.closeCurrentlyOpened()},e.onEnter=function(t){var e=t.target.parentElement;if(window.$hsDropdownCollection.find((function(t){return t.element.el===e}))){t.preventDefault();var n=window.$hsDropdownCollection.find((function(t){return t.element.el===e}));n&&n.element.open()}},e.onArrow=function(t){void 0===t&&(t=!0);var e=window.$hsDropdownCollection.find((function(t){return t.element.el.classList.contains("open")}));if(e){var n=e.element.menu;if(!n)return!1;var i=(t?Array.from(n.querySelectorAll("a:not([hidden]), .hs-dropdown > button:not([hidden])")).reverse():Array.from(n.querySelectorAll("a:not([hidden]), .hs-dropdown > button:not([hidden])"))).filter((function(t){return!t.classList.contains("disabled")})),o=n.querySelector("a:focus, button:focus"),r=i.findIndex((function(t){return t===o}));r+1<i.length&&r++,i[r].focus()}},e.onStartEnd=function(t){void 0===t&&(t=!0);var e=window.$hsDropdownCollection.find((function(t){return t.element.el.classList.contains("open")}));if(e){var n=e.element.menu;if(!n)return!1;var i=(t?Array.from(n.querySelectorAll("a")):Array.from(n.querySelectorAll("a")).reverse()).filter((function(t){return!t.classList.contains("disabled")}));i.length&&i[0].focus()}},e.onFirstLetter=function(t){var e=this,n=window.$hsDropdownCollection.find((function(t){return t.element.el.classList.contains("open")}));if(n){var i=n.element.menu;if(!i)return!1;var o=Array.from(i.querySelectorAll("a")),r=function(){return o.findIndex((function(n,i){return n.innerText.toLowerCase().charAt(0)===t.toLowerCase()&&e.history.existsInHistory(i)}))},s=r();-1===s&&(this.history.clearHistory(),s=r()),-1!==s&&(o[s].focus(),this.history.addHistory(s))}},e.closeCurrentlyOpened=function(t,e){void 0===t&&(t=null),void 0===e&&(e=!0);var n=t&&t.closest(".hs-dropdown")&&t.closest(".hs-dropdown").parentElement.closest(".hs-dropdown")?t.closest(".hs-dropdown").parentElement.closest(".hs-dropdown"):null,i=n?window.$hsDropdownCollection.filter((function(t){return t.element.el.classList.contains("open")&&t.element.menu.closest(".hs-dropdown").parentElement.closest(".hs-dropdown")===n})):window.$hsDropdownCollection.filter((function(t){return t.element.el.classList.contains("open")}));t&&t.closest(".hs-dropdown")&&"inside"===(0,l.getClassPropertyAlt)(t.closest(".hs-dropdown"),"--auto-close")&&(i=i.filter((function(e){return e.element.el!==t.closest(".hs-dropdown")}))),i&&i.forEach((function(t){if("false"===t.element.closeMode||"outside"===t.element.closeMode)return!1;t.element.close(e)}))},e.on=function(t,e,n){var i=window.$hsDropdownCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(c.default);window.addEventListener("load",(function(){d.autoInit()})),window.addEventListener("resize",(function(){window.$hsDropdownCollection||(window.$hsDropdownCollection=[]),window.$hsDropdownCollection.forEach((function(t){return t.element.resizeHandler()}))})),"undefined"!=typeof window&&(window.HSDropdown=d),e.default=d},234:function(t,e,n){
/*
 * HSFileUpload
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=s(n(961));"undefined"!=typeof Dropzone&&(Dropzone.autoDiscover=!1);var c=function(t){function e(e,n,i){var o,s=t.call(this,e,n,i)||this;s.extensions={},s.el="string"==typeof e?document.querySelector(e):e;var l=s.el.getAttribute("data-hs-file-upload"),a=l?JSON.parse(l):{};return s.previewTemplate=(null===(o=s.el.querySelector("[data-hs-file-upload-preview]"))||void 0===o?void 0:o.innerHTML)||'<div class="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">\n\t\t\t<div class="mb-2 flex justify-between items-center">\n\t\t\t\t<div class="flex items-center gap-x-3">\n\t\t\t\t\t<span class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500" data-hs-file-upload-file-icon></span>\n\t\t\t\t\t<div>\n\t\t\t\t\t\t<p class="text-sm font-medium text-gray-800 dark:text-white">\n\t\t\t\t\t\t\t<span class="truncate inline-block max-w-[300px] align-bottom" data-hs-file-upload-file-name></span>.<span data-hs-file-upload-file-ext></span>\n\t\t\t\t\t\t</p>\n\t\t\t\t\t\t<p class="text-xs text-gray-500 dark:text-neutral-500" data-hs-file-upload-file-size></p>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="inline-flex items-center gap-x-2">\n\t\t\t\t\t<button type="button" class="text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200" data-hs-file-upload-remove>\n\t\t\t\t\t\t<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>\n\t\t\t\t\t</button>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t\t<div class="flex items-center gap-x-3 whitespace-nowrap">\n\t\t\t\t<div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar>\n\t\t\t\t\t<div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-600 dark:bg-blue-500" style="width: 0" data-hs-file-upload-progress-bar-pane></div>\n\t\t\t\t</div>\n\t\t\t\t<div class="w-10 text-end">\n\t\t\t\t\t<span class="text-sm text-gray-800 dark:text-white">\n\t\t\t\t\t\t<span data-hs-file-upload-progress-bar-value>0</span>%\n\t\t\t\t\t</span>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>',s.extensions=_.merge({default:{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>',class:"size-5"},xls:{icon:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0243 1.43996H7.08805C6.82501 1.43996 6.57277 1.54445 6.38677 1.73043C6.20077 1.91642 6.09631 2.16868 6.09631 2.43171V6.64796L15.0243 11.856L19.4883 13.7398L23.9523 11.856V6.64796L15.0243 1.43996Z" fill="#21A366"></path><path d="M6.09631 6.64796H15.0243V11.856H6.09631V6.64796Z" fill="#107C41"></path><path d="M22.9605 1.43996H15.0243V6.64796H23.9523V2.43171C23.9523 2.16868 23.8478 1.91642 23.6618 1.73043C23.4758 1.54445 23.2235 1.43996 22.9605 1.43996Z" fill="#33C481"></path><path d="M15.0243 11.856H6.09631V21.2802C6.09631 21.5433 6.20077 21.7955 6.38677 21.9815C6.57277 22.1675 6.82501 22.272 7.08805 22.272H22.9606C23.2236 22.272 23.4759 22.1675 23.6618 21.9815C23.8478 21.7955 23.9523 21.5433 23.9523 21.2802V17.064L15.0243 11.856Z" fill="#185C37"></path><path d="M15.0243 11.856H23.9523V17.064H15.0243V11.856Z" fill="#107C41"></path><path opacity="0.1" d="M12.5446 5.15996H6.09631V19.296H12.5446C12.8073 19.2952 13.0591 19.1904 13.245 19.0046C13.4308 18.8188 13.5355 18.567 13.5363 18.3042V6.1517C13.5355 5.88892 13.4308 5.63712 13.245 5.4513C13.0591 5.26548 12.8073 5.16074 12.5446 5.15996Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V20.04H11.8006C12.0633 20.0392 12.3151 19.9344 12.501 19.7486C12.6868 19.5628 12.7915 19.311 12.7923 19.0482V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V18.552H11.8006C12.0633 18.5512 12.3151 18.4464 12.501 18.2606C12.6868 18.0748 12.7915 17.823 12.7923 17.5602V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.0566 5.90396H6.09631V18.552H11.0566C11.3193 18.5512 11.5711 18.4464 11.757 18.2606C11.9428 18.0748 12.0475 17.823 12.0483 17.5602V6.8957C12.0475 6.6329 11.9428 6.38114 11.757 6.19532C11.5711 6.0095 11.3193 5.90475 11.0566 5.90396Z" fill="black"></path><path d="M1.13604 5.90396H11.0566C11.3195 5.90396 11.5718 6.00842 11.7578 6.19442C11.9438 6.38042 12.0483 6.63266 12.0483 6.8957V16.8162C12.0483 17.0793 11.9438 17.3315 11.7578 17.5175C11.5718 17.7035 11.3195 17.808 11.0566 17.808H1.13604C0.873012 17.808 0.620754 17.7035 0.434765 17.5175C0.248775 17.3315 0.144287 17.0793 0.144287 16.8162V6.8957C0.144287 6.63266 0.248775 6.38042 0.434765 6.19442C0.620754 6.00842 0.873012 5.90396 1.13604 5.90396Z" fill="#107C41"></path><path d="M2.77283 15.576L5.18041 11.8455L2.9752 8.13596H4.74964L5.95343 10.5071C6.06401 10.7318 6.14015 10.8994 6.18185 11.01H6.19745C6.27683 10.8305 6.35987 10.6559 6.44669 10.4863L7.73309 8.13596H9.36167L7.09991 11.8247L9.41897 15.576H7.68545L6.29489 12.972C6.22943 12.861 6.17387 12.7445 6.12899 12.6238H6.10817C6.06761 12.7419 6.01367 12.855 5.94748 12.9608L4.51676 15.576H2.77283Z" fill="white"></path></svg>',class:"size-5"},doc:{icon:'<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z" fill="#41A5EE"></path><path d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z" fill="#2B7CD3"></path><path d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z" fill="#185ABD"></path><path d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z" fill="#103F91"></path><path opacity="0.1" d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z" fill="#185ABD"></path><path d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z" fill="white"></path></svg>',class:"size-5"},zip:{icon:'<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="20" r="2"/><path d="M10 7V6"/><path d="M10 12v-1"/><path d="M10 18v-2"/></svg>',class:"size-5"}},a.extensions),s.singleton=a.singleton,s.concatOptions=r(r({clickable:s.el.querySelector("[data-hs-file-upload-trigger]"),previewsContainer:s.el.querySelector("[data-hs-file-upload-previews]"),addRemoveLinks:!1,previewTemplate:s.previewTemplate,autoHideTrigger:!1},a),n),s.init(),s}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsFileUploadCollection,this),this.initDropzone()},e.prototype.initDropzone=function(){var t=this,e=this.el.querySelector("[data-hs-file-upload-clear]"),n=Array.from(this.el.querySelectorAll("[data-hs-file-upload-pseudo-trigger]"));this.dropzone=new Dropzone(this.el,this.concatOptions),this.dropzone.on("addedfile",(function(e){return t.onAddFile(e)})),this.dropzone.on("removedfile",(function(){return t.onRemoveFile()})),this.dropzone.on("uploadprogress",(function(e,n){return t.onUploadProgress(e,n)})),this.dropzone.on("complete",(function(e){return t.onComplete(e)})),e&&(e.onclick=function(){t.dropzone.files.length&&t.dropzone.removeAllFiles(!0)}),n.length&&n.forEach((function(e){e.onclick=function(){var e,n;(null===(e=t.concatOptions)||void 0===e?void 0:e.clickable)&&(null===(n=t.concatOptions)||void 0===n?void 0:n.clickable).click()}}))},e.prototype.onAddFile=function(t){var e=this,n=t.previewElement,i=t.previewElement.querySelector("[data-hs-file-upload-reload]");if(!n)return!1;this.singleton&&this.dropzone.files.length>1&&this.dropzone.removeFile(this.dropzone.files[0]),i&&i.addEventListener("click",(function(n){n.preventDefault(),n.stopPropagation();var i=document.createElement("input");i.type="file",i.click(),i.addEventListener("change",(function(n){var i,o=null===(i=n.target.files)||void 0===i?void 0:i[0];if(o){var r=o;r.status=Dropzone.ADDED,r.accepted=!0,r.previewElement=t.previewElement,r.previewTemplate=t.previewTemplate,r.previewsContainer=t.previewsContainer,e.dropzone.removeFile(t),e.dropzone.addFile(r)}}))})),this.previewAccepted(t)},e.prototype.previewAccepted=function(t){var e=this,n=t.previewElement,i=this.splitFileName(t.name),o=n.querySelector("[data-hs-file-upload-file-name]"),r=n.querySelector("[data-hs-file-upload-file-ext]"),s=n.querySelector("[data-hs-file-upload-file-size]"),l=n.querySelector("[data-hs-file-upload-file-icon]"),a=this.el.querySelector("[data-hs-file-upload-trigger]"),c=n.querySelector("[data-dz-thumbnail]"),u=n.querySelector("[data-hs-file-upload-remove]");o&&(o.textContent=i.name),r&&(r.textContent=i.extension),s&&(s.textContent=this.formatFileSize(t.size)),c&&(t.type.includes("image/")?c.classList.remove("hidden"):this.setIcon(i.extension,l)),this.dropzone.files.length>0&&this.concatOptions.autoHideTrigger&&(a.style.display="none"),u&&(u.onclick=function(){return e.dropzone.removeFile(t)})},e.prototype.onRemoveFile=function(){var t=this.el.querySelector("[data-hs-file-upload-trigger]");0===this.dropzone.files.length&&this.concatOptions.autoHideTrigger&&(t.style.display="")},e.prototype.onUploadProgress=function(t,e){var n=t.previewElement;if(!n)return!1;var i=n.querySelector("[data-hs-file-upload-progress-bar]"),o=n.querySelector("[data-hs-file-upload-progress-bar-pane]"),r=n.querySelector("[data-hs-file-upload-progress-bar-value]"),s=Math.floor(e);i&&i.setAttribute("aria-valuenow","".concat(s)),o&&(o.style.width="".concat(s,"%")),r&&(r.innerText="".concat(s))},e.prototype.onComplete=function(t){var e=t.previewElement;if(!e)return!1;e.classList.add("complete")},e.prototype.setIcon=function(t,e){var n=this.createIcon(t);e.append(n)},e.prototype.createIcon=function(t){var e,n,i=(null===(e=this.extensions[t])||void 0===e?void 0:e.icon)?(0,l.htmlToElement)(this.extensions[t].icon):(0,l.htmlToElement)(this.extensions.default.icon);return(0,l.classToClassList)((null===(n=this.extensions[t])||void 0===n?void 0:n.class)?this.extensions[t].class:this.extensions.default.class,i),i},e.prototype.formatFileSize=function(t){return t<1024?t.toFixed(2)+" B":t<1048576?(t/1024).toFixed(2)+" KB":t<1073741824?(t/1048576).toFixed(2)+" MB":t<1099511627776?(t/1073741824).toFixed(2)+" GB":(t/1099511627776).toFixed(2)+" TB"},e.prototype.splitFileName=function(t){var e=t.lastIndexOf(".");return-1==e?{name:t,extension:""}:{name:t.substring(0,e),extension:t.substring(e+1)}},e.getInstance=function(t,e){var n=window.$hsFileUploadCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsFileUploadCollection||(window.$hsFileUploadCollection=[]),document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsFileUploadCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(a.default);window.addEventListener("load",(function(){document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").length&&("undefined"==typeof _&&console.error("HSFileUpload: Lodash is not available, please add it to the page."),"undefined"==typeof Dropzone&&console.error("HSFileUpload: Dropzone is not available, please add it to the page.")),"undefined"!=typeof _&&"undefined"!=typeof Dropzone&&c.autoInit()})),"undefined"!=typeof window&&(window.HSFileUpload=c),e.default=c},332:function(t,e,n){
/*
 * HSInputNumber
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this;i.input=i.el.querySelector("[data-hs-input-number-input]")||null,i.increment=i.el.querySelector("[data-hs-input-number-increment]")||null,i.decrement=i.el.querySelector("[data-hs-input-number-decrement]")||null,i.input&&i.checkIsNumberAndConvert();var o=i.el.dataset.hsInputNumber,s=o?JSON.parse(o):{step:1},l=r(r({},s),n);return i.minInputValue="min"in l?l.min:0,i.maxInputValue="max"in l?l.max:null,i.step="step"in l&&l.step>0?l.step:1,i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsInputNumberCollection,this),this.input&&this.increment&&this.build()},e.prototype.checkIsNumberAndConvert=function(){var t=this.input.value.trim(),e=this.cleanAndExtractNumber(t);null!==e?(this.inputValue=e,this.input.value=e.toString()):(this.inputValue=0,this.input.value="0")},e.prototype.cleanAndExtractNumber=function(t){var e=[],n=!1;t.split("").forEach((function(t){t>="0"&&t<="9"?e.push(t):"."!==t||n||(e.push(t),n=!0)}));var i=e.join(""),o=parseFloat(i);return isNaN(o)?null:o},e.prototype.build=function(){this.input&&this.buildInput(),this.increment&&this.buildIncrement(),this.decrement&&this.buildDecrement(),this.inputValue<=0&&0===this.minInputValue&&(this.inputValue=0,this.input.value="0"),(this.inputValue<=0||this.minInputValue<0)&&this.changeValue(),this.input.hasAttribute("disabled")&&this.disableButtons()},e.prototype.buildInput=function(){var t=this;this.input.addEventListener("input",(function(){return t.changeValue()}))},e.prototype.buildIncrement=function(){var t=this;this.increment.addEventListener("click",(function(){t.changeValue("increment")}))},e.prototype.buildDecrement=function(){var t=this;this.decrement.addEventListener("click",(function(){t.changeValue("decrement")}))},e.prototype.changeValue=function(t){var e,n;void 0===t&&(t="none");var i={inputValue:this.inputValue},o=null!==(e=this.minInputValue)&&void 0!==e?e:Number.MIN_SAFE_INTEGER,r=null!==(n=this.maxInputValue)&&void 0!==n?n:Number.MAX_SAFE_INTEGER;switch(this.inputValue=isNaN(this.inputValue)?0:this.inputValue,t){case"increment":var s=this.inputValue+this.step;this.inputValue=s>=o&&s<=r?s:r,this.input.value=this.inputValue.toString();break;case"decrement":var a=this.inputValue-this.step;this.inputValue=a>=o&&a<=r?a:o,this.input.value=this.inputValue.toString();break;default:var c=isNaN(parseInt(this.input.value))?0:parseInt(this.input.value);this.inputValue=c>=r?r:c<=o?o:c,this.inputValue<=o&&(this.input.value=this.inputValue.toString())}i.inputValue=this.inputValue,this.inputValue===o?(this.el.classList.add("disabled"),this.decrement&&this.disableButtons("decrement")):(this.el.classList.remove("disabled"),this.decrement&&this.enableButtons("decrement")),this.inputValue===r?(this.el.classList.add("disabled"),this.increment&&this.disableButtons("increment")):(this.el.classList.remove("disabled"),this.increment&&this.enableButtons("increment")),this.fireEvent("change",i),(0,l.dispatch)("change.hs.inputNumber",this.el,i)},e.prototype.disableButtons=function(t){void 0===t&&(t="all"),"all"===t?("BUTTON"!==this.increment.tagName&&"INPUT"!==this.increment.tagName||this.increment.setAttribute("disabled","disabled"),"BUTTON"!==this.decrement.tagName&&"INPUT"!==this.decrement.tagName||this.decrement.setAttribute("disabled","disabled")):"increment"===t?"BUTTON"!==this.increment.tagName&&"INPUT"!==this.increment.tagName||this.increment.setAttribute("disabled","disabled"):"decrement"===t&&("BUTTON"!==this.decrement.tagName&&"INPUT"!==this.decrement.tagName||this.decrement.setAttribute("disabled","disabled"))},e.prototype.enableButtons=function(t){void 0===t&&(t="all"),"all"===t?("BUTTON"!==this.increment.tagName&&"INPUT"!==this.increment.tagName||this.increment.removeAttribute("disabled"),"BUTTON"!==this.decrement.tagName&&"INPUT"!==this.decrement.tagName||this.decrement.removeAttribute("disabled")):"increment"===t?"BUTTON"!==this.increment.tagName&&"INPUT"!==this.increment.tagName||this.increment.removeAttribute("disabled"):"decrement"===t&&("BUTTON"!==this.decrement.tagName&&"INPUT"!==this.decrement.tagName||this.decrement.removeAttribute("disabled"))},e.getInstance=function(t,e){var n=window.$hsInputNumberCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsInputNumberCollection||(window.$hsInputNumberCollection=[]),document.querySelectorAll("[data-hs-input-number]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsInputNumberCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSInputNumber=a),e.default=a},850:function(t,e,n){
/*
 * HSOverlay
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=n(223),c=function(t){function e(e,n,i){var o,s,c,u,d,p=t.call(this,e,n,i)||this,h=e.getAttribute("data-hs-overlay-options"),f=h?JSON.parse(h):{},v=r(r({},f),n);if(p.hiddenClass=(null==v?void 0:v.hiddenClass)||"hidden",p.emulateScrollbarSpace=(null==v?void 0:v.emulateScrollbarSpace)||!1,p.isClosePrev=null===(o=null==v?void 0:v.isClosePrev)||void 0===o||o,p.backdropClasses=null!==(s=null==v?void 0:v.backdropClasses)&&void 0!==s?s:"hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900",p.backdropExtraClasses=null!==(c=null==v?void 0:v.backdropExtraClasses)&&void 0!==c?c:"",p.moveOverlayToBody=(null==v?void 0:v.moveOverlayToBody)||null,p.openNextOverlay=!1,p.autoHide=null,p.overlayId=p.el.getAttribute("data-hs-overlay"),p.overlay=document.querySelector(p.overlayId),p.initContainer=(null===(u=p.overlay)||void 0===u?void 0:u.parentElement)||null,p.overlay){p.isCloseWhenClickInside=(0,l.stringToBoolean)((0,l.getClassProperty)(p.overlay,"--close-when-click-inside","false")||"false"),p.isTabAccessibilityLimited=(0,l.stringToBoolean)((0,l.getClassProperty)(p.overlay,"--tab-accessibility-limited","true")||"true"),p.isLayoutAffect=(0,l.stringToBoolean)((0,l.getClassProperty)(p.overlay,"--is-layout-affect","false")||"false"),p.hasAutofocus=(0,l.stringToBoolean)((0,l.getClassProperty)(p.overlay,"--has-autofocus","true")||"true"),p.hasAbilityToCloseOnBackdropClick=(0,l.stringToBoolean)(p.overlay.getAttribute("data-hs-overlay-keyboard")||"true");var m=(0,l.getClassProperty)(p.overlay,"--auto-close");p.autoClose=!isNaN(+m)&&isFinite(+m)?+m:a.BREAKPOINTS[m]||null;var g=(0,l.getClassProperty)(p.overlay,"--opened");p.openedBreakpoint=(!isNaN(+g)&&isFinite(+g)?+g:a.BREAKPOINTS[g])||null}return p.animationTarget=(null===(d=null==p?void 0:p.overlay)||void 0===d?void 0:d.querySelector(".hs-overlay-animation-target"))||p.overlay,p.overlay&&p.init(),p}return o(e,t),e.prototype.init=function(){var t,n=this;if(this.createCollection(window.$hsOverlayCollection,this),this.isLayoutAffect&&this.openedBreakpoint){var i=e.getInstance(this.el,!0);e.setOpened(this.openedBreakpoint,i)}(null===(t=null==this?void 0:this.el)||void 0===t?void 0:t.ariaExpanded)&&(this.overlay.classList.contains("opened")?this.el.ariaExpanded="true":this.el.ariaExpanded="false"),this.el.addEventListener("click",(function(){n.overlay.classList.contains("opened")?n.close():n.open()})),this.overlay.addEventListener("click",(function(t){t.target.id&&"#".concat(t.target.id)===n.overlayId&&n.isCloseWhenClickInside&&n.hasAbilityToCloseOnBackdropClick&&n.close()}))},e.prototype.hideAuto=function(){var t=this,e=parseInt((0,l.getClassProperty)(this.overlay,"--auto-hide","0"));e&&(this.autoHide=setTimeout((function(){t.close()}),e))},e.prototype.checkTimer=function(){this.autoHide&&(clearTimeout(this.autoHide),this.autoHide=null)},e.prototype.buildBackdrop=function(){var t=this,e=this.overlay.classList.value.split(" "),n=parseInt(window.getComputedStyle(this.overlay).getPropertyValue("z-index")),i=this.overlay.getAttribute("data-hs-overlay-backdrop-container")||!1,o=document.createElement("div"),r="".concat(this.backdropClasses," ").concat(this.backdropExtraClasses),s="static"!==(0,l.getClassProperty)(this.overlay,"--overlay-backdrop","true"),a="false"===(0,l.getClassProperty)(this.overlay,"--overlay-backdrop","true");o.id="".concat(this.overlay.id,"-backdrop"),"style"in o&&(o.style.zIndex="".concat(n-1));for(var c=0,u=e;c<u.length;c++){var d=u[c];(d.startsWith("hs-overlay-backdrop-open:")||d.includes(":hs-overlay-backdrop-open:"))&&(r+=" ".concat(d))}a||(i&&((o=document.querySelector(i).cloneNode(!0)).classList.remove("hidden"),r="".concat(o.classList.toString()),o.classList.value=""),s&&o.addEventListener("click",(function(){return t.close()}),!0),o.setAttribute("data-hs-overlay-backdrop-template",""),document.body.appendChild(o),setTimeout((function(){o.classList.value=r})))},e.prototype.destroyBackdrop=function(){var t=document.querySelector("#".concat(this.overlay.id,"-backdrop"));t&&(this.openNextOverlay&&(t.style.transitionDuration="".concat(1.8*parseFloat(window.getComputedStyle(t).transitionDuration.replace(/[^\d.-]/g,"")),"s")),t.classList.add("opacity-0"),(0,l.afterTransition)(t,(function(){t.remove()})))},e.prototype.focusElement=function(){var t=this.overlay.querySelector("[autofocus]");if(!t)return!1;t.focus()},e.prototype.getScrollbarSize=function(){var t=document.createElement("div");t.style.overflow="scroll",t.style.width="100px",t.style.height="100px",document.body.appendChild(t);var e=t.offsetWidth-t.clientWidth;return document.body.removeChild(t),e},e.prototype.open=function(){var t=this;if(!this.overlay)return!1;var e=document.querySelectorAll(".hs-overlay.open"),n=window.$hsOverlayCollection.find((function(t){return Array.from(e).includes(t.element.overlay)&&!t.element.isLayoutAffect})),i=document.querySelectorAll('[data-hs-overlay="#'.concat(this.overlay.id,'"]')),o="true"!==(0,l.getClassProperty)(this.overlay,"--body-scroll","false");if(this.isClosePrev&&n)return this.openNextOverlay=!0,n.element.close().then((function(){t.open(),t.openNextOverlay=!1}));o&&(document.body.style.overflow="hidden",this.emulateScrollbarSpace&&(document.body.style.paddingRight="".concat(this.getScrollbarSize(),"px"))),this.buildBackdrop(),this.checkTimer(),this.hideAuto(),i.forEach((function(t){t.ariaExpanded&&(t.ariaExpanded="true")})),this.overlay.classList.remove(this.hiddenClass),this.overlay.setAttribute("aria-overlay","true"),this.overlay.setAttribute("tabindex","-1"),setTimeout((function(){if(t.overlay.classList.contains("opened"))return!1;t.overlay.classList.add("open","opened"),t.isLayoutAffect&&document.body.classList.add("hs-overlay-body-open"),t.fireEvent("open",t.el),(0,l.dispatch)("open.hs.overlay",t.el,t.el),t.hasAutofocus&&t.focusElement()}),50)},e.prototype.close=function(t){var e=this;void 0===t&&(t=!1),this.isLayoutAffect&&document.body.classList.remove("hs-overlay-body-open");var n=function(t){if(e.overlay.classList.contains("open"))return!1;document.querySelectorAll('[data-hs-overlay="#'.concat(e.overlay.id,'"]')).forEach((function(t){t.ariaExpanded&&(t.ariaExpanded="false")})),e.overlay.classList.add(e.hiddenClass),e.destroyBackdrop(),e.fireEvent("close",e.el),(0,l.dispatch)("close.hs.overlay",e.el,e.el),document.querySelector(".hs-overlay.opened")||(document.body.style.overflow="",e.emulateScrollbarSpace&&(document.body.style.paddingRight="")),t(e.overlay)};return new Promise((function(i){if(!e.overlay)return!1;e.overlay.classList.remove("open","opened"),e.overlay.removeAttribute("aria-overlay"),e.overlay.removeAttribute("tabindex"),t?n(i):(0,l.afterTransition)(e.animationTarget,(function(){return n(i)}))}))},e.getInstance=function(t,e){var n=window.$hsOverlayCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)||e.element.overlay===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsOverlayCollection||(window.$hsOverlayCollection=[]),document.querySelectorAll("[data-hs-overlay]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsOverlayCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)})),window.$hsOverlayCollection&&document.addEventListener("keydown",(function(t){return e.accessibility(t)}))},e.open=function(t){var e=window.$hsOverlayCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)||e.element.overlay===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.overlay.classList.contains(e.element.hiddenClass)&&e.element.open()},e.close=function(t){var e=window.$hsOverlayCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)||e.element.overlay===("string"==typeof t?document.querySelector(t):t)}));e&&!e.element.overlay.classList.contains(e.element.hiddenClass)&&e.element.close()},e.setOpened=function(t,e){document.body.clientWidth>=t?(document.body.classList.add("hs-overlay-body-open"),e.element.overlay.classList.add("opened")):e.element.close(!0)},e.accessibility=function(t){var e,n,i=window.$hsOverlayCollection.filter((function(t){return t.element.overlay.classList.contains("open")})),o=i[i.length-1],r=null===(n=null===(e=null==o?void 0:o.element)||void 0===e?void 0:e.overlay)||void 0===n?void 0:n.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'),s=[];(null==r?void 0:r.length)&&r.forEach((function(t){(0,l.isParentOrElementHidden)(t)||s.push(t)}));var a=o&&!t.metaKey;if(a&&!o.element.isTabAccessibilityLimited&&"Tab"===t.code)return!1;a&&s.length&&"Tab"===t.code&&(t.preventDefault(),this.onTab(o,s)),a&&"Escape"===t.code&&(t.preventDefault(),this.onEscape(o))},e.onEscape=function(t){t&&t.element.hasAbilityToCloseOnBackdropClick&&t.element.close()},e.onTab=function(t,e){if(!e.length)return!1;var n=t.element.overlay.querySelector(":focus"),i=Array.from(e).indexOf(n);i>-1?e[(i+1)%e.length].focus():e[0].focus()},e.on=function(t,e,n){var i=window.$hsOverlayCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)||t.element.overlay===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(s(n(961)).default),u=function(){if(!window.$hsOverlayCollection.length||!window.$hsOverlayCollection.find((function(t){return t.element.moveOverlayToBody})))return!1;window.$hsOverlayCollection.filter((function(t){return t.element.moveOverlayToBody})).forEach((function(t){var e=t.element.moveOverlayToBody,n=t.element.initContainer,i=document.querySelector("body"),o=t.element.overlay;if(!n&&o)return!1;document.body.clientWidth<=e&&!(0,l.isDirectChild)(i,o)?i.appendChild(o):document.body.clientWidth>e&&!n.contains(o)&&n.appendChild(o)}))};window.addEventListener("load",(function(){c.autoInit(),u()})),window.addEventListener("resize",(function(){!function(){if(!window.$hsOverlayCollection.length||!window.$hsOverlayCollection.find((function(t){return t.element.autoClose})))return!1;window.$hsOverlayCollection.filter((function(t){return t.element.autoClose})).forEach((function(t){document.body.clientWidth>=t.element.autoClose&&t.element.close(!0)}))}(),u(),function(){if(!window.$hsOverlayCollection.length||!window.$hsOverlayCollection.find((function(t){return t.element.autoClose})))return!1;window.$hsOverlayCollection.filter((function(t){return t.element.autoClose})).forEach((function(t){document.body.clientWidth>=t.element.autoClose&&t.element.close(!0)}))}(),function(){if(!window.$hsOverlayCollection.length||!window.$hsOverlayCollection.find((function(t){return t.element.overlay.classList.contains("opened")})))return!1;window.$hsOverlayCollection.filter((function(t){return t.element.overlay.classList.contains("opened")})).forEach((function(t){var e=parseInt(window.getComputedStyle(t.element.overlay).getPropertyValue("z-index")),n=document.querySelector("#".concat(t.element.overlay.id,"-backdrop"));if(e===parseInt(window.getComputedStyle(n).getPropertyValue("z-index"))+1)return!1;"style"in n&&(n.style.zIndex="".concat(e-1)),document.body.classList.add("hs-overlay-body-open")}))}()})),"undefined"!=typeof window&&(window.HSOverlay=c),e.default=c},60:function(t,e,n){
/*
 * HSPinInput
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-pin-input"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.items=i.el.querySelectorAll("[data-hs-pin-input-item]"),i.currentItem=null,i.currentValue=new Array(i.items.length).fill(""),i.placeholders=[],i.availableCharsRE=new RegExp((null==l?void 0:l.availableCharsRE)||"^[a-zA-Z0-9]+$"),i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsPinInputCollection,this),this.items.length&&this.build()},e.prototype.build=function(){this.buildInputItems()},e.prototype.buildInputItems=function(){var t=this;this.items.forEach((function(e,n){t.placeholders.push(e.getAttribute("placeholder")||""),e.hasAttribute("autofocus")&&t.onFocusIn(n),e.addEventListener("input",(function(e){return t.onInput(e,n)})),e.addEventListener("paste",(function(e){return t.onPaste(e)})),e.addEventListener("keydown",(function(e){return t.onKeydown(e,n)})),e.addEventListener("focusin",(function(){return t.onFocusIn(n)})),e.addEventListener("focusout",(function(){return t.onFocusOut(n)}))}))},e.prototype.checkIfNumber=function(t){return t.match(this.availableCharsRE)},e.prototype.autoFillAll=function(t){var e=this;Array.from(t).forEach((function(t,n){if(!(null==e?void 0:e.items[n]))return!1;e.items[n].value=t,e.items[n].dispatchEvent(new Event("input",{bubbles:!0}))}))},e.prototype.setCurrentValue=function(){this.currentValue=Array.from(this.items).map((function(t){return t.value}))},e.prototype.toggleCompleted=function(){this.currentValue.includes("")?this.el.classList.remove("active"):this.el.classList.add("active")},e.prototype.onInput=function(t,e){var n=t.target.value;if(this.currentItem=t.target,this.currentItem.value="",this.currentItem.value=n[n.length-1],!this.checkIfNumber(this.currentItem.value))return this.currentItem.value=this.currentValue[e]||"",!1;if(this.setCurrentValue(),this.currentItem.value){if(e<this.items.length-1&&this.items[e+1].focus(),!this.currentValue.includes("")){var i={currentValue:this.currentValue};this.fireEvent("completed",i),(0,l.dispatch)("completed.hs.pinInput",this.el,i)}this.toggleCompleted()}else e>0&&this.items[e-1].focus()},e.prototype.onKeydown=function(t,e){"Backspace"===t.key&&e>0&&(""===this.items[e].value?(this.items[e-1].value="",this.items[e-1].focus()):this.items[e].value=""),this.setCurrentValue(),this.toggleCompleted()},e.prototype.onFocusIn=function(t){this.items[t].setAttribute("placeholder","")},e.prototype.onFocusOut=function(t){this.items[t].setAttribute("placeholder",this.placeholders[t])},e.prototype.onPaste=function(t){var e=this;t.preventDefault(),this.items.forEach((function(n){document.activeElement===n&&e.autoFillAll(t.clipboardData.getData("text"))}))},e.getInstance=function(t,e){var n=window.$hsPinInputCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsPinInputCollection||(window.$hsPinInputCollection=[]),document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsPinInputCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSPinInput=a),e.default=a},347:function(t,e,n){
/*
 * HSRangeSlider
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this,s=e.getAttribute("data-hs-range-slider"),l=s?JSON.parse(s):{};return o.concatOptions=r(r(r({},l),n),{cssClasses:r(r({},noUiSlider.cssClasses),o.processClasses(l.cssClasses))}),o.init(),o}return o(e,t),Object.defineProperty(e.prototype,"formattedValue",{get:function(){var t=this,e=this.el.noUiSlider.get();if(Array.isArray(e)&&this.format){var n=[];return e.forEach((function(e){n.push(t.format.to(e))})),n}return this.format?this.format.to(e):e},enumerable:!1,configurable:!0}),e.prototype.processClasses=function(t){var e={};return Object.keys(t).forEach((function(n){n&&(e[n]="".concat(noUiSlider.cssClasses[n]," ").concat(t[n]))})),e},e.prototype.init=function(){var t,e,n,i,o,r,s,l,a,c,u,d,p;this.createCollection(window.$hsRangeSliderCollection,this),("object"==typeof(null===(t=this.concatOptions)||void 0===t?void 0:t.formatter)?"thousandsSeparatorAndDecimalPoints"===(null===(n=null===(e=this.concatOptions)||void 0===e?void 0:e.formatter)||void 0===n?void 0:n.type):"thousandsSeparatorAndDecimalPoints"===(null===(i=this.concatOptions)||void 0===i?void 0:i.formatter))?this.thousandsSeparatorAndDecimalPointsFormatter():("object"==typeof(null===(o=this.concatOptions)||void 0===o?void 0:o.formatter)?"integer"===(null===(s=null===(r=this.concatOptions)||void 0===r?void 0:r.formatter)||void 0===s?void 0:s.type):"integer"===(null===(l=this.concatOptions)||void 0===l?void 0:l.formatter))?this.integerFormatter():"object"==typeof(null===(a=this.concatOptions)||void 0===a?void 0:a.formatter)&&((null===(u=null===(c=this.concatOptions)||void 0===c?void 0:c.formatter)||void 0===u?void 0:u.prefix)||(null===(p=null===(d=this.concatOptions)||void 0===d?void 0:d.formatter)||void 0===p?void 0:p.postfix))&&this.prefixOrPostfixFormatter(),noUiSlider.create(this.el,this.concatOptions),this.concatOptions.disabled&&this.setDisabled()},e.prototype.formatValue=function(t){var e,n,i,o,r,s,l,a,c,u="";return"object"==typeof(null===(e=this.concatOptions)||void 0===e?void 0:e.formatter)?((null===(i=null===(n=this.concatOptions)||void 0===n?void 0:n.formatter)||void 0===i?void 0:i.prefix)&&(u+=null===(r=null===(o=this.concatOptions)||void 0===o?void 0:o.formatter)||void 0===r?void 0:r.prefix),u+=t,(null===(l=null===(s=this.concatOptions)||void 0===s?void 0:s.formatter)||void 0===l?void 0:l.postfix)&&(u+=null===(c=null===(a=this.concatOptions)||void 0===a?void 0:a.formatter)||void 0===c?void 0:c.postfix)):u+=t,u},e.prototype.integerFormatter=function(){var t,e=this;this.format={to:function(t){return e.formatValue(Math.round(t))},from:function(t){return Math.round(+t)}},(null===(t=this.concatOptions)||void 0===t?void 0:t.tooltips)&&(this.concatOptions.tooltips=this.format)},e.prototype.prefixOrPostfixFormatter=function(){var t,e=this;this.format={to:function(t){return e.formatValue(t)},from:function(t){return+t}},(null===(t=this.concatOptions)||void 0===t?void 0:t.tooltips)&&(this.concatOptions.tooltips=this.format)},e.prototype.thousandsSeparatorAndDecimalPointsFormatter=function(){var t,e=this;this.format={to:function(t){return e.formatValue(new Intl.NumberFormat("en-US",{minimumFractionDigits:2,maximumFractionDigits:2}).format(t))},from:function(t){return parseFloat(t.replace(/,/g,""))}},(null===(t=this.concatOptions)||void 0===t?void 0:t.tooltips)&&(this.concatOptions.tooltips=this.format)},e.prototype.setDisabled=function(){this.el.setAttribute("disabled","disabled"),this.el.classList.add("disabled")},e.getInstance=function(t,e){void 0===e&&(e=!1);var n=window.$hsRangeSliderCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsRangeSliderCollection||(window.$hsRangeSliderCollection=[]),document.querySelectorAll("[data-hs-range-slider]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsRangeSliderCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e.on=function(t,e,n){var i=window.$hsRangeSliderCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(s(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),"undefined"!=typeof window&&(window.HSRangeSlider=l),e.default=l},911:function(t,e,n){
/*
 * HSRemoveElement
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-remove-element-options"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.removeTargetId=i.el.getAttribute("data-hs-remove-element"),i.removeTarget=document.querySelector(i.removeTargetId),i.removeTargetAnimationClass=(null==l?void 0:l.removeTargetAnimationClass)||"hs-removing",i.removeTarget&&i.init(),i}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsRemoveElementCollection,this),this.el.addEventListener("click",(function(){return t.remove()}))},e.prototype.remove=function(){var t=this;if(!this.removeTarget)return!1;this.removeTarget.classList.add(this.removeTargetAnimationClass),(0,l.afterTransition)(this.removeTarget,(function(){return setTimeout((function(){return t.removeTarget.remove()}))}))},e.autoInit=function(){window.$hsRemoveElementCollection||(window.$hsRemoveElementCollection=[]),document.querySelectorAll("[data-hs-remove-element]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsRemoveElementCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSRemoveElement=a),e.default=a},751:function(t,e,n){
/*
 * HSScrollspy
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(292),l=function(t){function e(e,n){void 0===n&&(n={});var i=t.call(this,e,n)||this;return i.activeSection=null,i.contentId=i.el.getAttribute("data-hs-scrollspy"),i.content=document.querySelector(i.contentId),i.links=i.el.querySelectorAll("[href]"),i.sections=[],i.scrollableId=i.el.getAttribute("data-hs-scrollspy-scrollable-parent"),i.scrollable=i.scrollableId?document.querySelector(i.scrollableId):document,i.init(),i}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsScrollspyCollection,this),this.links.forEach((function(e){t.sections.push(t.scrollable.querySelector(e.getAttribute("href")))})),Array.from(this.sections).forEach((function(e){if(!e.getAttribute("id"))return!1;t.scrollable.addEventListener("scroll",(function(n){return t.update(n,e)}))})),this.links.forEach((function(e){e.addEventListener("click",(function(n){if(n.preventDefault(),"javascript:;"===e.getAttribute("href"))return!1;t.scrollTo(e)}))}))},e.prototype.update=function(t,e){var n=parseInt((0,s.getClassProperty)(this.el,"--scrollspy-offset","0")),i=parseInt((0,s.getClassProperty)(e,"--scrollspy-offset"))||n,o=t.target===document?0:parseInt(String(t.target.getBoundingClientRect().top)),r=parseInt(String(e.getBoundingClientRect().top))-i-o,l=e.offsetHeight;if(r<=0&&r+l>0){if(this.activeSection===e)return!1;this.links.forEach((function(t){t.classList.remove("active")}));var a=this.el.querySelector('[href="#'.concat(e.getAttribute("id"),'"]'));if(a){a.classList.add("active");var c=a.closest("[data-hs-scrollspy-group]");if(c){var u=c.querySelector("[href]");u&&u.classList.add("active")}}this.activeSection=e}},e.prototype.scrollTo=function(t){var e=t.getAttribute("href"),n=document.querySelector(e),i=parseInt((0,s.getClassProperty)(this.el,"--scrollspy-offset","0")),o=parseInt((0,s.getClassProperty)(n,"--scrollspy-offset"))||i,r=this.scrollable===document?0:this.scrollable.offsetTop,l=n.offsetTop-o-r,a=this.scrollable===document?window:this.scrollable,c=function(){window.history.replaceState(null,null,t.getAttribute("href")),"scrollTo"in a&&a.scrollTo({top:l,left:0,behavior:"smooth"})},u=this.fireEvent("beforeScroll",this.el);(0,s.dispatch)("beforeScroll.hs.scrollspy",this.el,this.el),u instanceof Promise?u.then((function(){return c()})):c()},e.getInstance=function(t,e){void 0===e&&(e=!1);var n=window.$hsScrollspyCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsScrollspyCollection||(window.$hsScrollspyCollection=[]),document.querySelectorAll("[data-hs-scrollspy]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsScrollspyCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(r(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),"undefined"!=typeof window&&(window.HSScrollspy=l),e.default=l},442:function(t,e,n){
/*
 * HSSelect
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__awaiter||function(t,e,n,i){return new(n||(n=Promise))((function(o,r){function s(t){try{a(i.next(t))}catch(t){r(t)}}function l(t){try{a(i.throw(t))}catch(t){r(t)}}function a(t){var e;t.done?o(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(s,l)}a((i=i.apply(t,e||[])).next())}))},l=this&&this.__generator||function(t,e){var n,i,o,r,s={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return r={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function l(l){return function(a){return function(l){if(n)throw new TypeError("Generator is already executing.");for(;r&&(r=0,l[0]&&(s=0)),s;)try{if(n=1,i&&(o=2&l[0]?i.return:l[0]?i.throw||((o=i.return)&&o.call(i),0):i.next)&&!(o=o.call(i,l[1])).done)return o;switch(i=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return s.label++,{value:l[1],done:!1};case 5:s.label++,i=l[1],l=[0];continue;case 7:l=s.ops.pop(),s.trys.pop();continue;default:if(!(o=s.trys,(o=o.length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){s=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){s.label=l[1];break}if(6===l[0]&&s.label<o[1]){s.label=o[1],o=l;break}if(o&&s.label<o[2]){s.label=o[2],s.ops.push(l);break}o[2]&&s.ops.pop(),s.trys.pop();continue}l=e.call(t,s)}catch(t){l=[6,t],i=0}finally{n=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,a])}}},a=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,o=0,r=e.length;o<r;o++)!i&&o in e||(i||(i=Array.prototype.slice.call(e,0,o)),i[o]=e[o]);return t.concat(i||Array.prototype.slice.call(e))},c=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var u=n(292),d=c(n(961)),p=n(223),h=function(t){function e(e,n){var i,o,s=t.call(this,e,n)||this;s.optionId=0;var l=e.getAttribute("data-hs-select"),a=l?JSON.parse(l):{},c=r(r({},a),n),u={items:", ",betweenItemsAndCounter:"and"};return s.value=(null==c?void 0:c.value)||s.el.value||null,s.placeholder=(null==c?void 0:c.placeholder)||"Select...",s.hasSearch=(null==c?void 0:c.hasSearch)||!1,s.preventSearchFocus=(null==c?void 0:c.preventSearchFocus)||!1,s.mode=(null==c?void 0:c.mode)||"default",s.viewport=void 0!==(null==c?void 0:c.viewport)?document.querySelector(null==c?void 0:c.viewport):null,s.isOpened=Boolean(null==c?void 0:c.isOpened)||!1,s.isMultiple=s.el.hasAttribute("multiple")||!1,s.isDisabled=s.el.hasAttribute("disabled")||!1,s.selectedItems=[],s.apiUrl=(null==c?void 0:c.apiUrl)||null,s.apiQuery=(null==c?void 0:c.apiQuery)||null,s.apiOptions=(null==c?void 0:c.apiOptions)||null,s.apiSearchQueryKey=(null==c?void 0:c.apiSearchQueryKey)||null,s.apiDataPart=(null==c?void 0:c.apiDataPart)||null,s.apiFieldsMap=(null==c?void 0:c.apiFieldsMap)||null,s.apiIconTag=(null==c?void 0:c.apiIconTag)||null,s.wrapperClasses=(null==c?void 0:c.wrapperClasses)||null,s.toggleTag=(null==c?void 0:c.toggleTag)||null,s.toggleClasses=(null==c?void 0:c.toggleClasses)||null,s.toggleSeparators=null!==(i=r(r({},u),null==c?void 0:c.toggleSeparators))&&void 0!==i?i:u,s.toggleCountText=(null==c?void 0:c.toggleCountText)||null,s.toggleCountTextMinItems=(null==c?void 0:c.toggleCountTextMinItems)||1,s.toggleCountTextMode=(null==c?void 0:c.toggleCountTextMode)||"countAfterLimit",s.tagsItemTemplate=(null==c?void 0:c.tagsItemTemplate)||null,s.tagsItemClasses=(null==c?void 0:c.tagsItemClasses)||null,s.tagsInputId=(null==c?void 0:c.tagsInputId)||null,s.tagsInputClasses=(null==c?void 0:c.tagsInputClasses)||null,s.dropdownTag=(null==c?void 0:c.dropdownTag)||null,s.dropdownClasses=(null==c?void 0:c.dropdownClasses)||null,s.dropdownDirectionClasses=(null==c?void 0:c.dropdownDirectionClasses)||null,s.dropdownSpace=(null==c?void 0:c.dropdownSpace)||10,s.dropdownPlacement=(null==c?void 0:c.dropdownPlacement)||null,s.dropdownScope=(null==c?void 0:c.dropdownScope)||"parent",s.searchTemplate=(null==c?void 0:c.searchTemplate)||null,s.searchWrapperTemplate=(null==c?void 0:c.searchWrapperTemplate)||null,s.searchWrapperClasses=(null==c?void 0:c.searchWrapperClasses)||"bg-white p-2 sticky top-0",s.searchId=(null==c?void 0:c.searchId)||null,s.searchLimit=(null==c?void 0:c.searchLimit)||1/0,s.isSearchDirectMatch=void 0===(null==c?void 0:c.isSearchDirectMatch)||(null==c?void 0:c.isSearchDirectMatch),s.searchClasses=(null==c?void 0:c.searchClasses)||"block w-[calc(100%-2rem)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4",s.searchPlaceholder=(null==c?void 0:c.searchPlaceholder)||"Search...",s.searchNoResultTemplate=(null==c?void 0:c.searchNoResultTemplate)||"<span></span>",s.searchNoResultText=(null==c?void 0:c.searchNoResultText)||"No results found",s.searchNoResultClasses=(null==c?void 0:c.searchNoResultClasses)||"px-4 text-sm text-gray-800 dark:text-neutral-200",s.optionTemplate=(null==c?void 0:c.optionTemplate)||null,s.optionTag=(null==c?void 0:c.optionTag)||null,s.optionClasses=(null==c?void 0:c.optionClasses)||null,s.extraMarkup=(null==c?void 0:c.extraMarkup)||null,s.descriptionClasses=(null==c?void 0:c.descriptionClasses)||null,s.iconClasses=(null==c?void 0:c.iconClasses)||null,s.isAddTagOnEnter=null===(o=null==c?void 0:c.isAddTagOnEnter)||void 0===o||o,s.animationInProcess=!1,s.selectOptions=[],s.remoteOptions=[],s.tagsInputHelper=null,s.init(),s}return o(e,t),e.prototype.setValue=function(t){this.value=t,this.clearSelections(),Array.isArray(t)?(this.toggleTextWrapper.innerHTML=this.value.length?this.stringFromValue():this.placeholder,this.unselectMultipleItems(),this.selectMultipleItems()):(this.setToggleTitle(),this.toggle.querySelector("[data-icon]")&&this.setToggleIcon(),this.toggle.querySelector("[data-title]")&&this.setToggleTitle(),this.selectSingleItem())},e.prototype.init=function(){this.createCollection(window.$hsSelectCollection,this),this.build()},e.prototype.build=function(){var t=this;if(this.el.style.display="none",this.el.children&&Array.from(this.el.children).filter((function(t){return t.value&&""!==t.value})).forEach((function(e){var n=e.getAttribute("data-hs-select-option");t.selectOptions=a(a([],t.selectOptions,!0),[{title:e.textContent,val:e.value,disabled:e.disabled,options:"undefined"!==n?JSON.parse(n):null}],!1)})),this.isMultiple){var e=Array.from(this.el.children).filter((function(t){return t.selected}));if(e){var n=[];e.forEach((function(t){n.push(t.value)})),this.value=n}}this.buildWrapper(),"tags"===this.mode?this.buildTags():this.buildToggle(),this.buildDropdown(),this.extraMarkup&&this.buildExtraMarkup()},e.prototype.buildWrapper=function(){var t=this;this.wrapper=document.createElement("div"),this.wrapper.classList.add("hs-select","relative"),"tags"===this.mode&&this.wrapper.addEventListener("click",(function(e){e.target.closest("[data-hs-select-dropdown]")||e.target.closest("[data-tag-value]")||t.tagsInput.focus()})),this.wrapperClasses&&(0,u.classToClassList)(this.wrapperClasses,this.wrapper),this.el.before(this.wrapper),this.wrapper.append(this.el)},e.prototype.buildExtraMarkup=function(){var t=this,e=function(e){var n=(0,u.htmlToElement)(e);return t.wrapper.append(n),n},n=function(e){e.classList.contains("--prevent-click")||e.addEventListener("click",(function(e){e.stopPropagation(),t.toggleFn()}))};if(Array.isArray(this.extraMarkup))this.extraMarkup.forEach((function(t){var i=e(t);n(i)}));else{var i=e(this.extraMarkup);n(i)}},e.prototype.buildToggle=function(){var t,e,n,i,o=this;this.toggleTextWrapper=document.createElement("span"),this.toggleTextWrapper.classList.add("truncate"),this.toggle=(0,u.htmlToElement)(this.toggleTag||"<div></div>"),n=this.toggle.querySelector("[data-icon]"),i=this.toggle.querySelector("[data-title]"),!this.isMultiple&&n&&this.setToggleIcon(),!this.isMultiple&&i&&this.setToggleTitle(),this.isMultiple?this.toggleTextWrapper.innerHTML=this.value.length?this.stringFromValue():this.placeholder:this.toggleTextWrapper.innerHTML=(null===(t=this.getItemByValue(this.value))||void 0===t?void 0:t.title)||this.placeholder,i||this.toggle.append(this.toggleTextWrapper),this.toggleClasses&&(0,u.classToClassList)(this.toggleClasses,this.toggle),this.isDisabled&&this.toggle.classList.add("disabled"),this.wrapper&&this.wrapper.append(this.toggle),(null===(e=this.toggle)||void 0===e?void 0:e.ariaExpanded)&&(this.isOpened?this.toggle.ariaExpanded="true":this.toggle.ariaExpanded="false"),this.toggle.addEventListener("click",(function(){if(o.isDisabled)return!1;o.toggleFn()}))},e.prototype.setToggleIcon=function(){var t,e=this.getItemByValue(this.value),n=this.toggle.querySelector("[data-icon]");if(n.innerHTML="",n){var i=(0,u.htmlToElement)(this.apiUrl&&this.apiIconTag?this.apiIconTag||"":(null===(t=null==e?void 0:e.options)||void 0===t?void 0:t.icon)||"");this.value&&this.apiUrl&&this.apiIconTag&&e[this.apiFieldsMap.icon]&&(i.src=e[this.apiFieldsMap.icon]||""),n.append(i),i&&(null==i?void 0:i.src)?n.classList.remove("hidden"):n.classList.add("hidden")}},e.prototype.setToggleTitle=function(){var t,e=this.toggle.querySelector("[data-title]");if(e.classList.add("truncate"),e.innerHTML="",e){var n=(null===(t=this.getItemByValue(this.value))||void 0===t?void 0:t.title)||this.placeholder;e.innerHTML=n,this.toggle.append(e)}},e.prototype.buildTags=function(){this.isDisabled&&this.wrapper.classList.add("disabled"),this.buildTagsInput(),this.setTagsItems()},e.prototype.reassignTagsInputPlaceholder=function(t){this.tagsInput.placeholder=t,this.tagsInputHelper.innerHTML=t,this.calculateInputWidth()},e.prototype.buildTagsItem=function(t){var e,n,i,o,r,s,l,a,c=this,d=this.getItemByValue(t),p=document.createElement("div");if(p.setAttribute("data-tag-value",t),this.tagsItemClasses&&(0,u.classToClassList)(this.tagsItemClasses,p),this.tagsItemTemplate&&(r=(0,u.htmlToElement)(this.tagsItemTemplate),p.append(r)),(null===(e=null==d?void 0:d.options)||void 0===e?void 0:e.icon)||this.apiIconTag){var h=(0,u.htmlToElement)(this.apiUrl&&this.apiIconTag?this.apiIconTag:null===(n=null==d?void 0:d.options)||void 0===n?void 0:n.icon);this.apiUrl&&this.apiIconTag&&d[this.apiFieldsMap.icon]&&(h.src=d[this.apiFieldsMap.icon]||""),(a=r?r.querySelector("[data-icon]"):document.createElement("span")).append(h),r||p.append(a)}!r||!r.querySelector("[data-icon]")||(null===(i=null==d?void 0:d.options)||void 0===i?void 0:i.icon)||this.apiUrl||this.apiIconTag||d[null===(o=this.apiFieldsMap)||void 0===o?void 0:o.icon]||r.querySelector("[data-icon]").classList.add("hidden"),(s=r?r.querySelector("[data-title]"):document.createElement("span")).textContent=d.title||"",r||p.append(s),r?l=r.querySelector("[data-remove]"):((l=document.createElement("span")).textContent="X",p.append(l)),l.addEventListener("click",(function(){c.value=c.value.filter((function(e){return e!==t})),c.selectedItems=c.selectedItems.filter((function(e){return e!==t})),c.value.length||c.reassignTagsInputPlaceholder(c.placeholder),c.unselectMultipleItems(),c.selectMultipleItems(),p.remove()})),this.wrapper.append(p)},e.prototype.getItemByValue=function(t){var e=this;return this.apiUrl?this.remoteOptions.find((function(n){return n[e.apiFieldsMap.title]===t})):this.selectOptions.find((function(e){return e.val===t}))},e.prototype.setTagsItems=function(){var t=this;this.value&&this.value.forEach((function(e){t.selectedItems.includes(e)||t.buildTagsItem(e),t.selectedItems=t.selectedItems.includes(e)?t.selectedItems:a(a([],t.selectedItems,!0),[e],!1)}))},e.prototype.buildTagsInput=function(){var t=this;this.tagsInput=document.createElement("input"),this.tagsInputId&&(this.tagsInput.id=this.tagsInputId),this.tagsInputClasses&&(0,u.classToClassList)(this.tagsInputClasses,this.tagsInput),this.tagsInput.addEventListener("focus",(function(){t.isOpened||t.open()})),this.tagsInput.addEventListener("input",(function(){return t.calculateInputWidth()})),this.tagsInput.addEventListener("input",(0,u.debounce)((function(e){return t.searchOptions(e.target.value)}))),this.tagsInput.addEventListener("keydown",(function(e){if("Enter"===e.key&&t.isAddTagOnEnter){var n=e.target.value;if(t.selectOptions.find((function(t){return t.val===n})))return!1;t.addSelectOption(n,n),t.buildOption(n,n),t.dropdown.querySelector('[data-value="'.concat(n,'"]')).click(),t.resetTagsInputField()}})),this.wrapper.append(this.tagsInput),setTimeout((function(){t.adjustInputWidth(),t.reassignTagsInputPlaceholder(t.value.length?"":t.placeholder)}))},e.prototype.buildDropdown=function(){var t=this;this.dropdown=(0,u.htmlToElement)(this.dropdownTag||"<div></div>"),this.dropdown.setAttribute("data-hs-select-dropdown",""),"parent"===this.dropdownScope&&this.dropdown.classList.add("absolute","top-full"),this.dropdown.role="listbox",this.dropdown.tabIndex=-1,this.dropdown.ariaOrientation="vertical",this.isOpened||this.dropdown.classList.add("hidden"),this.dropdownClasses&&(0,u.classToClassList)(this.dropdownClasses,this.dropdown),this.wrapper&&this.wrapper.append(this.dropdown),this.dropdown&&this.hasSearch&&this.buildSearch(),this.selectOptions&&this.selectOptions.forEach((function(e,n){return t.buildOption(e.title,e.val,e.disabled,e.selected,e.options,"".concat(n))})),this.apiUrl&&this.optionsFromRemoteData(),"window"===this.dropdownScope&&this.buildPopper()},e.prototype.buildPopper=function(){"undefined"!=typeof Popper&&Popper.createPopper&&(document.body.appendChild(this.dropdown),this.popperInstance=Popper.createPopper("tags"===this.mode?this.wrapper:this.toggle,this.dropdown,{placement:p.POSITIONS[this.dropdownPlacement]||"bottom",strategy:"fixed",modifiers:[{name:"offset",options:{offset:[0,5]}}]}))},e.prototype.updateDropdownWidth=function(){var t="tags"===this.mode?this.wrapper:this.toggle;this.dropdown.style.width="".concat(t.clientWidth,"px")},e.prototype.buildSearch=function(){var t,e=this;this.searchWrapper=(0,u.htmlToElement)(this.searchWrapperTemplate||"<div></div>"),this.searchWrapperClasses&&(0,u.classToClassList)(this.searchWrapperClasses,this.searchWrapper),t=this.searchWrapper.querySelector("[data-input]");var n=(0,u.htmlToElement)(this.searchTemplate||'<input type="text" />');this.search="INPUT"===n.tagName?n:n.querySelector(":scope input"),this.search.placeholder=this.searchPlaceholder,this.searchClasses&&(0,u.classToClassList)(this.searchClasses,this.search),this.searchId&&(this.search.id=this.searchId),this.search.addEventListener("input",(0,u.debounce)((function(t){e.apiUrl?e.remoteSearch(t.target.value):e.searchOptions(t.target.value)}))),t?t.append(n):this.searchWrapper.append(n),this.dropdown.append(this.searchWrapper)},e.prototype.buildOption=function(t,e,n,i,o,r,s){var l,c=this;void 0===n&&(n=!1),void 0===i&&(i=!1),void 0===r&&(r="1");var d=null,p=null,h=(0,u.htmlToElement)(this.optionTag||"<div></div>");if(h.setAttribute("data-value",e),h.setAttribute("data-title-value",t),h.setAttribute("tabIndex",r),h.classList.add("cursor-pointer"),h.setAttribute("data-id",s||"".concat(this.optionId)),s||this.optionId++,n&&h.classList.add("disabled"),i&&(this.isMultiple?this.value=a(a([],this.value,!0),[e],!1):this.value=e),this.optionTemplate&&(d=(0,u.htmlToElement)(this.optionTemplate),h.append(d)),d?d.querySelector("[data-title]").textContent=t||"":h.textContent=t||"",o){if(o.icon){var f=(0,u.htmlToElement)(null!==(l=this.apiIconTag)&&void 0!==l?l:o.icon);if(f.classList.add("max-w-full"),this.apiUrl&&(f.setAttribute("alt",t),f.setAttribute("src",o.icon)),d)d.querySelector("[data-icon]").append(f);else{var v=(0,u.htmlToElement)("<div></div>");this.iconClasses&&(0,u.classToClassList)(this.iconClasses,v),v.append(f),h.append(v)}}if(o.description)if(d)(p=d.querySelector("[data-description]"))&&p.append(o.description);else{var m=(0,u.htmlToElement)("<div></div>");m.textContent=o.description,this.descriptionClasses&&(0,u.classToClassList)(this.descriptionClasses,m),h.append(m)}}d&&d.querySelector("[data-icon]")&&!o&&!(null==o?void 0:o.icon)&&d.querySelector("[data-icon]").classList.add("hidden"),this.value&&(this.isMultiple?this.value.includes(e):this.value===e)&&h.classList.add("selected"),n||h.addEventListener("click",(function(){return c.onSelectOption(e)})),this.optionClasses&&(0,u.classToClassList)(this.optionClasses,h),this.dropdown&&this.dropdown.append(h),i&&this.setNewValue()},e.prototype.buildOptionFromRemoteData=function(t,e,n,i,o,r,s){void 0===n&&(n=!1),void 0===i&&(i=!1),void 0===o&&(o="1"),o?this.buildOption(t,e,n,i,s,o,r):alert("ID parameter is required for generating remote options! Please check your API endpoint have it.")},e.prototype.buildOptionsFromRemoteData=function(t){var e=this;t.forEach((function(t,n){var i=null,o="",r={id:"",title:"",icon:null,description:null,rest:{}};Object.keys(t).forEach((function(n){var s;t[e.apiFieldsMap.id]&&(i=t[e.apiFieldsMap.id]),t[e.apiFieldsMap.title]&&(o=t[e.apiFieldsMap.title]),t[e.apiFieldsMap.icon]&&(r.icon=t[e.apiFieldsMap.icon]),t[null===(s=e.apiFieldsMap)||void 0===s?void 0:s.description]&&(r.description=t[e.apiFieldsMap.description]),r.rest[n]=t[n]})),e.buildOriginalOption(o,o,i,!1,!1,r),e.buildOptionFromRemoteData(o,o,!1,!1,"".concat(n),i,r)})),this.sortElements(this.el,"option"),this.sortElements(this.dropdown,"[data-value]")},e.prototype.optionsFromRemoteData=function(){return s(this,arguments,void 0,(function(t){var e;return void 0===t&&(t=""),l(this,(function(n){switch(n.label){case 0:return[4,this.apiRequest(t)];case 1:return e=n.sent(),this.remoteOptions=e,e.length?this.buildOptionsFromRemoteData(this.remoteOptions):console.log("There is no data were responded!"),[2]}}))}))},e.prototype.apiRequest=function(){return s(this,arguments,void 0,(function(t){var e,n,i,o,r,s;return void 0===t&&(t=""),l(this,(function(l){switch(l.label){case 0:return l.trys.push([0,3,,4]),e=this.apiUrl,n=this.apiSearchQueryKey?"".concat(this.apiSearchQueryKey,"=").concat(t.toLowerCase()):null,i="".concat(this.apiQuery),o=this.apiOptions||{},n&&(e+="?".concat(n)),this.apiQuery&&(e+="".concat(n?"&":"?").concat(i)),[4,fetch(e,o)];case 1:return[4,l.sent().json()];case 2:return r=l.sent(),[2,this.apiDataPart?r[this.apiDataPart]:r];case 3:return s=l.sent(),console.error(s),[3,4];case 4:return[2]}}))}))},e.prototype.sortElements=function(t,e){var n=Array.from(t.querySelectorAll(e));n.sort((function(t,e){var n=t.classList.contains("selected")||t.hasAttribute("selected"),i=e.classList.contains("selected")||e.hasAttribute("selected");return n&&!i?-1:!n&&i?1:0})),n.forEach((function(e){return t.appendChild(e)}))},e.prototype.remoteSearch=function(t){return s(this,void 0,void 0,(function(){var e,n,i,o,r=this;return l(this,(function(s){switch(s.label){case 0:return[4,this.apiRequest(t)];case 1:return e=s.sent(),this.remoteOptions=e,n=e.map((function(t){return"".concat(t.id)})),null,o=this.dropdown.querySelectorAll("[data-value]"),this.el.querySelectorAll("[data-hs-select-option]").forEach((function(t){var e,i=t.getAttribute("data-id");n.includes(i)||(null===(e=r.value)||void 0===e?void 0:e.includes(t.value))||r.destroyOriginalOption(t.value)})),o.forEach((function(t){var e,i=t.getAttribute("data-id");n.includes(i)||(null===(e=r.value)||void 0===e?void 0:e.includes(t.getAttribute("data-value")))?n=n.filter((function(t){return t!==i})):r.destroyOption(t.getAttribute("data-value"))})),(i=e.filter((function(t){return n.includes("".concat(t.id))}))).length?this.buildOptionsFromRemoteData(i):console.log("There is no data were responded!"),[2]}}))}))},e.prototype.destroyOption=function(t){var e=this.dropdown.querySelector('[data-value="'.concat(t,'"]'));if(!e)return!1;e.remove()},e.prototype.buildOriginalOption=function(t,e,n,i,o,r){var s=(0,u.htmlToElement)("<option></option>");s.setAttribute("value",e),i&&s.setAttribute("disabled","disabled"),o&&s.setAttribute("selected","selected"),n&&s.setAttribute("data-id",n),s.setAttribute("data-hs-select-option",JSON.stringify(r)),s.innerText=t,this.el.append(s)},e.prototype.destroyOriginalOption=function(t){var e=this.el.querySelector('[value="'.concat(t,'"]'));if(!e)return!1;e.remove()},e.prototype.buildTagsInputHelper=function(){this.tagsInputHelper=document.createElement("span"),this.tagsInputHelper.style.fontSize=window.getComputedStyle(this.tagsInput).fontSize,this.tagsInputHelper.style.fontFamily=window.getComputedStyle(this.tagsInput).fontFamily,this.tagsInputHelper.style.fontWeight=window.getComputedStyle(this.tagsInput).fontWeight,this.tagsInputHelper.style.letterSpacing=window.getComputedStyle(this.tagsInput).letterSpacing,this.tagsInputHelper.style.visibility="hidden",this.tagsInputHelper.style.whiteSpace="pre",this.tagsInputHelper.style.position="absolute",this.wrapper.appendChild(this.tagsInputHelper)},e.prototype.calculateInputWidth=function(){this.tagsInputHelper.textContent=this.tagsInput.value||this.tagsInput.placeholder;var t=parseInt(window.getComputedStyle(this.tagsInput).paddingLeft)+parseInt(window.getComputedStyle(this.tagsInput).paddingRight),e=parseInt(window.getComputedStyle(this.tagsInput).borderLeftWidth)+parseInt(window.getComputedStyle(this.tagsInput).borderRightWidth),n=this.tagsInputHelper.offsetWidth+t+e,i=this.wrapper.offsetWidth-(parseInt(window.getComputedStyle(this.wrapper).paddingLeft)+parseInt(window.getComputedStyle(this.wrapper).paddingRight));this.tagsInput.style.width="".concat(Math.min(n,i)+2,"px")},e.prototype.adjustInputWidth=function(){this.buildTagsInputHelper(),this.calculateInputWidth()},e.prototype.onSelectOption=function(t){var e=this;if(this.clearSelections(),this.isMultiple?(this.value=this.value.includes(t)?Array.from(this.value).filter((function(e){return e!==t})):a(a([],Array.from(this.value),!0),[t],!1),this.selectMultipleItems(),this.setNewValue()):(this.value=t,this.selectSingleItem(),this.setNewValue()),this.fireEvent("change",this.value),(0,u.dispatch)("change.hs.select",this.el,this.value),"tags"===this.mode){var n=this.selectedItems.filter((function(t){return!e.value.includes(t)}));n.length&&n.forEach((function(t){e.selectedItems=e.selectedItems.filter((function(e){return e!==t})),e.wrapper.querySelector('[data-tag-value="'.concat(t,'"]')).remove()})),this.resetTagsInputField()}this.isMultiple||(this.toggle.querySelector("[data-icon]")&&this.setToggleIcon(),this.toggle.querySelector("[data-title]")&&this.setToggleTitle(),this.close()),this.value.length||"tags"!==this.mode||this.reassignTagsInputPlaceholder(this.placeholder),this.isOpened&&"tags"===this.mode&&this.tagsInput&&this.tagsInput.focus(),this.triggerChangeEventForNativeSelect()},e.prototype.triggerChangeEventForNativeSelect=function(){var t=new Event("change",{bubbles:!0});this.el.dispatchEvent(t)},e.prototype.addSelectOption=function(t,e,n,i,o){this.selectOptions=a(a([],this.selectOptions,!0),[{title:t,val:e,disabled:n,selected:i,options:o}],!1)},e.prototype.removeSelectOption=function(t,e){if(void 0===e&&(e=!1),!!!this.selectOptions.some((function(e){return e.val===t})))return!1;this.selectOptions=this.selectOptions.filter((function(e){return e.val!==t})),this.value=e?this.value.filter((function(e){return e!==t})):t},e.prototype.resetTagsInputField=function(){this.tagsInput.value="",this.reassignTagsInputPlaceholder(""),this.searchOptions("")},e.prototype.clearSelections=function(){Array.from(this.dropdown.children).forEach((function(t){t.classList.contains("selected")&&t.classList.remove("selected")})),Array.from(this.el.children).forEach((function(t){t.selected&&(t.selected=!1)}))},e.prototype.setNewValue=function(){var t;"tags"===this.mode?this.setTagsItems():(null===(t=this.value)||void 0===t?void 0:t.length)?this.toggleTextWrapper.innerHTML=this.stringFromValue():this.toggleTextWrapper.innerHTML=this.placeholder},e.prototype.stringFromValueBasic=function(t){var e=this,n=[],i="";if(t.forEach((function(t){e.isMultiple?e.value.includes(t.val)&&n.push(t.title):e.value===t.val&&n.push(t.title)})),this.toggleCountText&&""!==this.toggleCountText&&n.length>=this.toggleCountTextMinItems)if("nItemsAndCount"===this.toggleCountTextMode){var o=n.slice(0,this.toggleCountTextMinItems-1);i="".concat(o.join(this.toggleSeparators.items)," ").concat(this.toggleSeparators.betweenItemsAndCounter," ").concat(n.length-o.length," ").concat(this.toggleCountText)}else i="".concat(n.length," ").concat(this.toggleCountText);else i=n.join(this.toggleSeparators.items);return i},e.prototype.stringFromValueRemoteData=function(){var t=this,e=this.dropdown.querySelectorAll("[data-title-value]"),n=[],i="";if(e.forEach((function(e){var i=e.getAttribute("data-value");t.isMultiple?t.value.includes(i)&&n.push(i):t.value===i&&n.push(i)})),this.toggleCountText&&""!==this.toggleCountText&&n.length>=this.toggleCountTextMinItems)if("nItemsAndCount"===this.toggleCountTextMode){var o=n.slice(0,this.toggleCountTextMinItems-1);i="".concat(o.join(this.toggleSeparators.items)," ").concat(this.toggleSeparators.betweenItemsAndCounter," ").concat(n.length-o.length," ").concat(this.toggleCountText)}else i="".concat(n.length," ").concat(this.toggleCountText);else i=n.join(this.toggleSeparators.items);return i},e.prototype.stringFromValue=function(){return this.apiUrl?this.stringFromValueRemoteData():this.stringFromValueBasic(this.selectOptions)},e.prototype.selectSingleItem=function(){var t=this;Array.from(this.el.children).find((function(e){return t.value===e.value})).selected=!0;var e=Array.from(this.dropdown.children).find((function(e){return t.value===e.getAttribute("data-value")}));e&&e.classList.add("selected")},e.prototype.selectMultipleItems=function(){var t=this;Array.from(this.dropdown.children).filter((function(e){return t.value.includes(e.getAttribute("data-value"))})).forEach((function(t){return t.classList.add("selected")})),Array.from(this.el.children).filter((function(e){return t.value.includes(e.value)})).forEach((function(t){return t.selected=!0}))},e.prototype.unselectMultipleItems=function(){Array.from(this.dropdown.children).forEach((function(t){return t.classList.remove("selected")})),Array.from(this.el.children).forEach((function(t){return t.selected=!1}))},e.prototype.searchOptions=function(t){var e=this;this.searchNoResult&&(this.searchNoResult.remove(),this.searchNoResult=null),this.searchNoResult=(0,u.htmlToElement)(this.searchNoResultTemplate),this.searchNoResult.innerText=this.searchNoResultText,(0,u.classToClassList)(this.searchNoResultClasses,this.searchNoResult);var n,i=this.dropdown.querySelectorAll("[data-value]"),o=!1;this.searchLimit&&(n=0),i.forEach((function(i){var r=i.getAttribute("data-title-value").toLocaleLowerCase(),s=t?t.split("").map((function(t){return t.match(/\w/)?"".concat(t,"[\\W_]*"):"\\W*"})).join(""):"",l=new RegExp(s,"i"),a=e.isSearchDirectMatch,c=r.trim();(t?a?!c.toLowerCase().includes(t.toLowerCase())||n>=e.searchLimit:!l.test(c)||n>=e.searchLimit:!l.test(c))?i.classList.add("hidden"):(i.classList.remove("hidden"),o=!0,e.searchLimit&&n++)})),o||this.dropdown.append(this.searchNoResult)},e.prototype.eraseToggleIcon=function(){var t=this.toggle.querySelector("[data-icon]");t&&(t.innerHTML=null,t.classList.add("hidden"))},e.prototype.eraseToggleTitle=function(){var t=this.toggle.querySelector("[data-title]");t?t.innerHTML=this.placeholder:this.toggleTextWrapper.innerHTML=this.placeholder},e.prototype.toggleFn=function(){this.isOpened?this.close():this.open()},e.prototype.destroy=function(){var t=this.el.parentElement.parentElement;this.el.classList.remove("hidden"),this.el.style.display="",t.prepend(this.el),t.querySelector(".hs-select").remove(),this.wrapper=null},e.prototype.open=function(){var t,e=this,n=(null===(t=null===window||void 0===window?void 0:window.$hsSelectCollection)||void 0===t?void 0:t.find((function(t){return t.element.isOpened})))||null;if(n&&n.element.close(),this.animationInProcess)return!1;this.animationInProcess=!0,"window"===this.dropdownScope&&this.dropdown.classList.add("invisible"),this.dropdown.classList.remove("hidden"),this.recalculateDirection(),setTimeout((function(){var t;(null===(t=null==e?void 0:e.toggle)||void 0===t?void 0:t.ariaExpanded)&&(e.toggle.ariaExpanded="true"),e.wrapper.classList.add("active"),e.dropdown.classList.add("opened"),e.dropdown.classList.contains("w-full")&&"window"===e.dropdownScope&&e.updateDropdownWidth(),e.popperInstance&&"window"===e.dropdownScope&&(e.popperInstance.update(),e.dropdown.classList.remove("invisible")),e.hasSearch&&!e.preventSearchFocus&&e.search.focus(),e.animationInProcess=!1})),this.isOpened=!0},e.prototype.close=function(){var t,e,n,i,o=this;if(this.animationInProcess)return!1;this.animationInProcess=!0,(null===(t=null==this?void 0:this.toggle)||void 0===t?void 0:t.ariaExpanded)&&(this.toggle.ariaExpanded="false"),this.wrapper.classList.remove("active"),this.dropdown.classList.remove("opened","bottom-full","top-full"),(null===(e=this.dropdownDirectionClasses)||void 0===e?void 0:e.bottom)&&this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom),(null===(n=this.dropdownDirectionClasses)||void 0===n?void 0:n.top)&&this.dropdown.classList.remove(this.dropdownDirectionClasses.top),this.dropdown.style.marginTop="",this.dropdown.style.marginBottom="",(0,u.afterTransition)(this.dropdown,(function(){o.dropdown.classList.add("hidden"),o.hasSearch&&(o.search.value="",o.search.dispatchEvent(new Event("input",{bubbles:!0})),o.search.blur()),o.animationInProcess=!1})),null===(i=this.dropdown.querySelector(".hs-select-option-highlighted"))||void 0===i||i.classList.remove("hs-select-option-highlighted"),this.isOpened=!1},e.prototype.addOption=function(t){var e=this,n="".concat(this.selectOptions.length),i=function(t){var i=t.title,o=t.val,r=t.disabled,s=t.selected,l=t.options;!!e.selectOptions.some((function(t){return t.val===o}))||(e.addSelectOption(i,o,r,s,l),e.buildOption(i,o,r,s,l,n),e.buildOriginalOption(i,o,null,r,s,l),s&&!e.isMultiple&&e.onSelectOption(o))};Array.isArray(t)?t.forEach((function(t){i(t)})):i(t)},e.prototype.removeOption=function(t){var e=this,n=function(t,n){void 0===n&&(n=!1),!!e.selectOptions.some((function(e){return e.val===t}))&&(e.removeSelectOption(t,n),e.destroyOption(t),e.destroyOriginalOption(t),e.value===t&&(e.value=null,e.eraseToggleTitle(),e.eraseToggleIcon()))};Array.isArray(t)?t.forEach((function(t){n(t,e.isMultiple)})):n(t,this.isMultiple),this.setNewValue()},e.prototype.recalculateDirection=function(){var t,e,n,i;(0,u.isEnoughSpace)(this.dropdown,this.toggle||this.tagsInput,"bottom",this.dropdownSpace,this.viewport)?(this.dropdown.classList.remove("bottom-full"),(null===(t=this.dropdownDirectionClasses)||void 0===t?void 0:t.bottom)&&this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom),this.dropdown.style.marginBottom="",this.dropdown.classList.add("top-full"),(null===(e=this.dropdownDirectionClasses)||void 0===e?void 0:e.top)&&this.dropdown.classList.add(this.dropdownDirectionClasses.top),this.dropdown.style.marginTop="".concat(this.dropdownSpace,"px")):(this.dropdown.classList.remove("top-full"),(null===(n=this.dropdownDirectionClasses)||void 0===n?void 0:n.top)&&this.dropdown.classList.remove(this.dropdownDirectionClasses.top),this.dropdown.style.marginTop="",this.dropdown.classList.add("bottom-full"),(null===(i=this.dropdownDirectionClasses)||void 0===i?void 0:i.bottom)&&this.dropdown.classList.add(this.dropdownDirectionClasses.bottom),this.dropdown.style.marginBottom="".concat(this.dropdownSpace,"px"))},e.getInstance=function(t,e){var n=window.$hsSelectCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsSelectCollection||(window.$hsSelectCollection=[]),document.querySelectorAll("[data-hs-select]:not(.--prevent-on-load-init)").forEach((function(t){if(!window.$hsSelectCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))){var n=t.getAttribute("data-hs-select"),i=n?JSON.parse(n):{};new e(t,i)}})),window.$hsSelectCollection&&(window.addEventListener("click",(function(t){var n=t.target;e.closeCurrentlyOpened(n)})),document.addEventListener("keydown",(function(t){return e.accessibility(t)})))},e.open=function(t){var e=window.$hsSelectCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&!e.element.isOpened&&e.element.open()},e.close=function(t){var e=window.$hsSelectCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.isOpened&&e.element.close()},e.closeCurrentlyOpened=function(t){if(void 0===t&&(t=null),!t.closest(".hs-select.active")&&!t.closest("[data-hs-select-dropdown].opened")){var e=window.$hsSelectCollection.filter((function(t){return t.element.isOpened}))||null;e&&e.forEach((function(t){t.element.close()}))}},e.accessibility=function(t){if(window.$hsSelectCollection.find((function(t){return t.element.isOpened}))&&p.SELECT_ACCESSIBILITY_KEY_SET.includes(t.code)&&!t.metaKey)switch(t.code){case"Escape":t.preventDefault(),this.onEscape();break;case"ArrowUp":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow();break;case"ArrowDown":t.preventDefault(),t.stopImmediatePropagation(),this.onArrow(!1);break;case"Tab":t.preventDefault(),t.stopImmediatePropagation(),this.onTab(t.shiftKey);break;case"Home":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd();break;case"End":t.preventDefault(),t.stopImmediatePropagation(),this.onStartEnd(!1);break;case"Enter":t.preventDefault(),this.onEnter(t)}},e.onEscape=function(){var t=window.$hsSelectCollection.find((function(t){return t.element.isOpened}));t&&t.element.close()},e.onArrow=function(t){void 0===t&&(t=!0);var e=window.$hsSelectCollection.find((function(t){return t.element.isOpened}));if(e){var n=e.element.dropdown;if(!n)return!1;var i=(t?Array.from(n.querySelectorAll(":scope > *:not(.hidden)")).reverse():Array.from(n.querySelectorAll(":scope > *:not(.hidden)"))).filter((function(t){return!t.classList.contains("disabled")})),o=n.querySelector(".hs-select-option-highlighted")||n.querySelector(".selected");o||i[0].classList.add("hs-select-option-highlighted");var r=i.findIndex((function(t){return t===o}));r+1<i.length&&r++,i[r].focus(),o&&o.classList.remove("hs-select-option-highlighted"),i[r].classList.add("hs-select-option-highlighted")}},e.onTab=function(t){void 0===t&&(t=!0);var e=window.$hsSelectCollection.find((function(t){return t.element.isOpened}));if(e){var n=e.element.dropdown;if(!n)return!1;var i=(t?Array.from(n.querySelectorAll(":scope >  *:not(.hidden)")).reverse():Array.from(n.querySelectorAll(":scope >  *:not(.hidden)"))).filter((function(t){return!t.classList.contains("disabled")})),o=n.querySelector(".hs-select-option-highlighted")||n.querySelector(".selected");o||i[0].classList.add("hs-select-option-highlighted");var r=i.findIndex((function(t){return t===o}));if(!(r+1<i.length))return o&&o.classList.remove("hs-select-option-highlighted"),e.element.close(),e.element.toggle.focus(),!1;i[++r].focus(),o&&o.classList.remove("hs-select-option-highlighted"),i[r].classList.add("hs-select-option-highlighted")}},e.onStartEnd=function(t){void 0===t&&(t=!0);var e=window.$hsSelectCollection.find((function(t){return t.element.isOpened}));if(e){var n=e.element.dropdown;if(!n)return!1;var i=(t?Array.from(n.querySelectorAll(":scope >  *:not(.hidden)")):Array.from(n.querySelectorAll(":scope >  *:not(.hidden)")).reverse()).filter((function(t){return!t.classList.contains("disabled")})),o=n.querySelector(".hs-select-option-highlighted");i.length&&(i[0].focus(),o&&o.classList.remove("hs-select-option-highlighted"),i[0].classList.add("hs-select-option-highlighted"))}},e.onEnter=function(t){var e=t.target.previousSibling;if(window.$hsSelectCollection.find((function(t){return t.element.el===e}))){var n=window.$hsSelectCollection.find((function(t){return t.element.isOpened})),i=window.$hsSelectCollection.find((function(t){return t.element.el===e}));n.element.close(),i.element.open()}else{(i=window.$hsSelectCollection.find((function(t){return t.element.isOpened})))&&i.element.onSelectOption(t.target.dataset.value||"")}},e}(d.default);window.addEventListener("load",(function(){h.autoInit()})),document.addEventListener("scroll",(function(){if(!window.$hsSelectCollection)return!1;var t=window.$hsSelectCollection.find((function(t){return t.element.isOpened}));t&&t.element.recalculateDirection()})),"undefined"!=typeof window&&(window.HSSelect=h),e.default=h},887:function(t,e,n){
/*
 * HSStepper
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-stepper"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.currentIndex=(null==l?void 0:l.currentIndex)||1,i.mode=(null==l?void 0:l.mode)||"linear",i.isCompleted=void 0!==(null==l?void 0:l.isCompleted)&&(null==l?void 0:l.isCompleted),i.totalSteps=1,i.navItems=[],i.contentItems=[],i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsStepperCollection,this),this.buildNav(),this.buildContent(),this.buildButtons(),this.setTotalSteps()},e.prototype.getUncompletedSteps=function(t){return void 0===t&&(t=!1),this.navItems.filter((function(e){var n=e.isCompleted,i=e.isSkip;return t?!n||i:!n&&!i}))},e.prototype.setTotalSteps=function(){var t=this;this.navItems.forEach((function(e){var n=e.index;n>t.totalSteps&&(t.totalSteps=n)}))},e.prototype.buildNav=function(){var t=this;this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach((function(e){return t.addNavItem(e)})),this.navItems.forEach((function(e){return t.buildNavItem(e)}))},e.prototype.buildNavItem=function(t){var e=this,n=t.index,i=t.isDisabled,o=t.el;n===this.currentIndex&&this.setCurrentNavItem(),("linear"!==this.mode||i)&&o.addEventListener("click",(function(){return e.handleNavItemClick(t)}))},e.prototype.addNavItem=function(t){var e=JSON.parse(t.getAttribute("data-hs-stepper-nav-item")),n=e.index,i=e.isFinal,o=void 0!==i&&i,r=e.isCompleted,s=void 0!==r&&r,l=e.isSkip,a=void 0!==l&&l,c=e.isOptional,u=void 0!==c&&c,d=e.isDisabled,p=void 0!==d&&d,h=e.isProcessed,f=void 0!==h&&h,v=e.hasError,m=void 0!==v&&v;s&&t.classList.add("success"),a&&t.classList.add("skipped"),p&&("BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.setAttribute("disabled","disabled"),t.classList.add("disabled")),m&&t.classList.add("error"),this.navItems.push({index:n,isFinal:o,isCompleted:s,isSkip:a,isOptional:u,isDisabled:p,isProcessed:f,hasError:m,el:t})},e.prototype.setCurrentNavItem=function(){var t=this;this.navItems.forEach((function(e){var n=e.index,i=e.el;n===t.currentIndex?t.setCurrentNavItemActions(i):t.unsetCurrentNavItemActions(i)}))},e.prototype.setCurrentNavItemActions=function(t){t.classList.add("active"),this.fireEvent("active",this.currentIndex),(0,l.dispatch)("active.hs.stepper",this.el,this.currentIndex)},e.prototype.getNavItem=function(t){return void 0===t&&(t=this.currentIndex),this.navItems.find((function(e){return e.index===t}))},e.prototype.setProcessedNavItemActions=function(t){t.isProcessed=!0,t.el.classList.add("processed")},e.prototype.setErrorNavItemActions=function(t){t.hasError=!0,t.el.classList.add("error")},e.prototype.unsetCurrentNavItemActions=function(t){t.classList.remove("active")},e.prototype.handleNavItemClick=function(t){var e=t.index;this.currentIndex=e,this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep()},e.prototype.buildContent=function(){var t=this;this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach((function(e){return t.addContentItem(e)})),this.navItems.forEach((function(e){return t.buildContentItem(e)}))},e.prototype.buildContentItem=function(t){t.index===this.currentIndex&&this.setCurrentContentItem()},e.prototype.addContentItem=function(t){var e=JSON.parse(t.getAttribute("data-hs-stepper-content-item")),n=e.index,i=e.isFinal,o=void 0!==i&&i,r=e.isCompleted,s=void 0!==r&&r,l=e.isSkip,a=void 0!==l&&l;s&&t.classList.add("success"),a&&t.classList.add("skipped"),this.contentItems.push({index:n,isFinal:o,isCompleted:s,isSkip:a,el:t})},e.prototype.setCurrentContentItem=function(){var t=this;if(this.isCompleted){var e=this.contentItems.find((function(t){return t.isFinal})),n=this.contentItems.filter((function(t){return!t.isFinal}));return e.el.style.display="",n.forEach((function(t){return t.el.style.display="none"})),!1}this.contentItems.forEach((function(e){var n=e.index,i=e.el;n===t.currentIndex?t.setCurrentContentItemActions(i):t.unsetCurrentContentItemActions(i)}))},e.prototype.hideAllContentItems=function(){this.contentItems.forEach((function(t){return t.el.style.display="none"}))},e.prototype.setCurrentContentItemActions=function(t){t.style.display=""},e.prototype.unsetCurrentContentItemActions=function(t){t.style.display="none"},e.prototype.disableAll=function(){var t=this.getNavItem(this.currentIndex);t.hasError=!1,t.isCompleted=!1,t.isDisabled=!1,t.el.classList.remove("error","success"),this.disableButtons()},e.prototype.disableNavItemActions=function(t){t.isDisabled=!0,t.el.classList.add("disabled")},e.prototype.enableNavItemActions=function(t){t.isDisabled=!1,t.el.classList.remove("disabled")},e.prototype.buildButtons=function(){this.backBtn=this.el.querySelector("[data-hs-stepper-back-btn]"),this.nextBtn=this.el.querySelector("[data-hs-stepper-next-btn]"),this.skipBtn=this.el.querySelector("[data-hs-stepper-skip-btn]"),this.completeStepBtn=this.el.querySelector("[data-hs-stepper-complete-step-btn]"),this.finishBtn=this.el.querySelector("[data-hs-stepper-finish-btn]"),this.resetBtn=this.el.querySelector("[data-hs-stepper-reset-btn]"),this.buildBackButton(),this.buildNextButton(),this.buildSkipButton(),this.buildCompleteStepButton(),this.buildFinishButton(),this.buildResetButton()},e.prototype.buildBackButton=function(){var t=this;this.backBtn&&(this.checkForTheFirstStep(),this.backBtn.addEventListener("click",(function(){if(t.handleBackButtonClick(),"linear"===t.mode){var e=t.navItems.find((function(e){return e.index===t.currentIndex})),n=t.contentItems.find((function(e){return e.index===t.currentIndex}));if(!e||!n)return;e.isCompleted&&(e.isCompleted=!1,e.isSkip=!1,e.el.classList.remove("success","skipped")),n.isCompleted&&(n.isCompleted=!1,n.isSkip=!1,n.el.classList.remove("success","skipped")),"linear"===t.mode&&t.currentIndex!==t.totalSteps&&(t.nextBtn&&(t.nextBtn.style.display=""),t.completeStepBtn&&(t.completeStepBtn.style.display="")),t.showSkipButton(),t.showFinishButton(),t.showCompleteStepButton()}})))},e.prototype.handleBackButtonClick=function(){1!==this.currentIndex&&("linear"===this.mode&&this.removeOptionalClasses(),this.currentIndex--,"linear"===this.mode&&this.removeOptionalClasses(),this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.fireEvent("back",this.currentIndex),(0,l.dispatch)("back.hs.stepper",this.el,this.currentIndex))},e.prototype.checkForTheFirstStep=function(){1===this.currentIndex?this.setToDisabled(this.backBtn):this.setToNonDisabled(this.backBtn)},e.prototype.setToDisabled=function(t){"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.setAttribute("disabled","disabled"),t.classList.add("disabled")},e.prototype.setToNonDisabled=function(t){"BUTTON"!==t.tagName&&"INPUT"!==t.tagName||t.removeAttribute("disabled"),t.classList.remove("disabled")},e.prototype.buildNextButton=function(){var t=this;this.nextBtn&&this.nextBtn.addEventListener("click",(function(){var e;if(t.fireEvent("beforeNext",t.currentIndex),(0,l.dispatch)("beforeNext.hs.stepper",t.el,t.currentIndex),null===(e=t.getNavItem(t.currentIndex))||void 0===e?void 0:e.isProcessed)return t.disableAll(),!1;t.goToNext()}))},e.prototype.unsetProcessedNavItemActions=function(t){t.isProcessed=!1,t.el.classList.remove("processed")},e.prototype.handleNextButtonClick=function(t){if(void 0===t&&(t=!0),t)this.currentIndex===this.totalSteps?this.currentIndex=1:this.currentIndex++;else{var e=this.getUncompletedSteps();if(1===e.length){var n=e[0].index;this.currentIndex=n}else{if(this.currentIndex===this.totalSteps)return;this.currentIndex++}}"linear"===this.mode&&this.removeOptionalClasses(),this.setCurrentNavItem(),this.setCurrentContentItem(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.showSkipButton(),this.showFinishButton(),this.showCompleteStepButton(),this.fireEvent("next",this.currentIndex),(0,l.dispatch)("next.hs.stepper",this.el,this.currentIndex)},e.prototype.removeOptionalClasses=function(){var t=this,e=this.navItems.find((function(e){return e.index===t.currentIndex})),n=this.contentItems.find((function(e){return e.index===t.currentIndex}));e.isSkip=!1,e.hasError=!1,e.isDisabled=!1,n.isSkip=!1,e.el.classList.remove("skipped","success","error"),n.el.classList.remove("skipped","success","error")},e.prototype.buildSkipButton=function(){var t=this;this.skipBtn&&(this.showSkipButton(),this.skipBtn.addEventListener("click",(function(){t.handleSkipButtonClick(),"linear"===t.mode&&t.currentIndex===t.totalSteps&&(t.nextBtn&&(t.nextBtn.style.display="none"),t.completeStepBtn&&(t.completeStepBtn.style.display="none"),t.finishBtn&&(t.finishBtn.style.display=""))})))},e.prototype.setSkipItem=function(t){var e=this,n=this.navItems.find((function(n){return n.index===(t||e.currentIndex)})),i=this.contentItems.find((function(n){return n.index===(t||e.currentIndex)}));n&&i&&(this.setSkipItemActions(n),this.setSkipItemActions(i))},e.prototype.setSkipItemActions=function(t){t.isSkip=!0,t.el.classList.add("skipped")},e.prototype.showSkipButton=function(){var t=this;if(this.skipBtn){var e=this.navItems.find((function(e){return e.index===t.currentIndex})).isOptional;this.skipBtn.style.display=e?"":"none"}},e.prototype.handleSkipButtonClick=function(){this.setSkipItem(),this.handleNextButtonClick(),this.fireEvent("skip",this.currentIndex),(0,l.dispatch)("skip.hs.stepper",this.el,this.currentIndex)},e.prototype.buildCompleteStepButton=function(){var t=this;this.completeStepBtn&&(this.completeStepBtnDefaultText=this.completeStepBtn.innerText,this.completeStepBtn.addEventListener("click",(function(){return t.handleCompleteStepButtonClick()})))},e.prototype.changeTextAndDisableCompleteButtonIfStepCompleted=function(){var t=this,e=this.navItems.find((function(e){return e.index===t.currentIndex})),n=JSON.parse(this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn")).completedText;e&&(e.isCompleted?(this.completeStepBtn.innerText=n||this.completeStepBtnDefaultText,this.completeStepBtn.setAttribute("disabled","disabled"),this.completeStepBtn.classList.add("disabled")):(this.completeStepBtn.innerText=this.completeStepBtnDefaultText,this.completeStepBtn.removeAttribute("disabled"),this.completeStepBtn.classList.remove("disabled")))},e.prototype.setCompleteItem=function(t){var e=this,n=this.navItems.find((function(n){return n.index===(t||e.currentIndex)})),i=this.contentItems.find((function(n){return n.index===(t||e.currentIndex)}));n&&i&&(this.setCompleteItemActions(n),this.setCompleteItemActions(i))},e.prototype.setCompleteItemActions=function(t){t.isCompleted=!0,t.el.classList.add("success")},e.prototype.showCompleteStepButton=function(){this.completeStepBtn&&(1===this.getUncompletedSteps().length?this.completeStepBtn.style.display="none":this.completeStepBtn.style.display="")},e.prototype.handleCompleteStepButtonClick=function(){this.setCompleteItem(),this.fireEvent("complete",this.currentIndex),(0,l.dispatch)("complete.hs.stepper",this.el,this.currentIndex),this.handleNextButtonClick(!1),this.showFinishButton(),this.showCompleteStepButton(),this.checkForTheFirstStep(),this.completeStepBtn&&this.changeTextAndDisableCompleteButtonIfStepCompleted(),this.showSkipButton()},e.prototype.buildFinishButton=function(){var t=this;this.finishBtn&&(this.isCompleted&&this.setCompleted(),this.finishBtn.addEventListener("click",(function(){return t.handleFinishButtonClick()})))},e.prototype.setCompleted=function(){this.el.classList.add("completed")},e.prototype.unsetCompleted=function(){this.el.classList.remove("completed")},e.prototype.showFinishButton=function(){this.finishBtn&&(1===this.getUncompletedSteps().length?this.finishBtn.style.display="":this.finishBtn.style.display="none")},e.prototype.handleFinishButtonClick=function(){var t=this,e=this.getUncompletedSteps(),n=this.getUncompletedSteps(!0),i=this.contentItems.find((function(t){return t.isFinal})).el;e.length&&e.forEach((function(e){var n=e.index;return t.setCompleteItem(n)})),this.currentIndex=this.totalSteps,this.setCurrentNavItem(),this.hideAllContentItems();var o=this.navItems.find((function(e){return e.index===t.currentIndex}));(o?o.el:null).classList.remove("active"),i.style.display="block",this.backBtn&&(this.backBtn.style.display="none"),this.nextBtn&&(this.nextBtn.style.display="none"),this.skipBtn&&(this.skipBtn.style.display="none"),this.completeStepBtn&&(this.completeStepBtn.style.display="none"),this.finishBtn&&(this.finishBtn.style.display="none"),this.resetBtn&&(this.resetBtn.style.display=""),n.length<=1&&(this.isCompleted=!0,this.setCompleted()),this.fireEvent("finish",this.currentIndex),(0,l.dispatch)("finish.hs.stepper",this.el,this.currentIndex)},e.prototype.buildResetButton=function(){var t=this;this.resetBtn&&this.resetBtn.addEventListener("click",(function(){return t.handleResetButtonClick()}))},e.prototype.handleResetButtonClick=function(){var t=this;this.backBtn&&(this.backBtn.style.display=""),this.nextBtn&&(this.nextBtn.style.display=""),this.completeStepBtn&&(this.completeStepBtn.style.display="",this.completeStepBtn.innerText=this.completeStepBtnDefaultText,this.completeStepBtn.removeAttribute("disabled"),this.completeStepBtn.classList.remove("disabled")),this.resetBtn&&(this.resetBtn.style.display="none"),this.navItems.forEach((function(e){var n=e.el;e.isSkip=!1,e.isCompleted=!1,t.unsetCurrentNavItemActions(n),n.classList.remove("success","skipped")})),this.contentItems.forEach((function(e){var n=e.el;e.isSkip=!1,e.isCompleted=!1,t.unsetCurrentContentItemActions(n),n.classList.remove("success","skipped")})),this.currentIndex=1,this.setCurrentNavItem(),this.setCurrentContentItem(),this.showFinishButton(),this.showCompleteStepButton(),this.checkForTheFirstStep(),this.unsetCompleted(),this.isCompleted=!1,this.fireEvent("reset",this.currentIndex),(0,l.dispatch)("reset.hs.stepper",this.el,this.currentIndex)},e.prototype.setProcessedNavItem=function(t){var e=this.getNavItem(t);e&&this.setProcessedNavItemActions(e)},e.prototype.unsetProcessedNavItem=function(t){var e=this.getNavItem(t);e&&this.unsetProcessedNavItemActions(e)},e.prototype.goToNext=function(){"linear"===this.mode&&this.setCompleteItem(),this.handleNextButtonClick("linear"!==this.mode),"linear"===this.mode&&this.currentIndex===this.totalSteps&&(this.nextBtn&&(this.nextBtn.style.display="none"),this.completeStepBtn&&(this.completeStepBtn.style.display="none"))},e.prototype.disableButtons=function(){this.backBtn&&this.setToDisabled(this.backBtn),this.nextBtn&&this.setToDisabled(this.nextBtn)},e.prototype.enableButtons=function(){this.backBtn&&this.setToNonDisabled(this.backBtn),this.nextBtn&&this.setToNonDisabled(this.nextBtn)},e.prototype.setErrorNavItem=function(t){var e=this.getNavItem(t);e&&this.setErrorNavItemActions(e)},e.getInstance=function(t,e){var n=window.$hsStepperCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsStepperCollection||(window.$hsStepperCollection=[]),document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsStepperCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSStepper=a),e.default=a},97:function(t,e,n){
/*
 * HSStrongPassword
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this;i.isOpened=!1,i.strength=0,i.passedRules=new Set;var o=e.getAttribute("data-hs-strong-password"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.target=(null==l?void 0:l.target)?"string"==typeof(null==l?void 0:l.target)?document.querySelector(l.target):l.target:null,i.hints=(null==l?void 0:l.hints)?"string"==typeof(null==l?void 0:l.hints)?document.querySelector(l.hints):l.hints:null,i.stripClasses=(null==l?void 0:l.stripClasses)||null,i.minLength=(null==l?void 0:l.minLength)||6,i.mode=(null==l?void 0:l.mode)||"default",i.popoverSpace=(null==l?void 0:l.popoverSpace)||10,i.checksExclude=(null==l?void 0:l.checksExclude)||[],i.availableChecks=["lowercase","uppercase","numbers","special-characters","min-length"].filter((function(t){return!i.checksExclude.includes(t)})),i.specialCharactersSet=(null==l?void 0:l.specialCharactersSet)||"!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~",i.target&&i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsStrongPasswordCollection,this),this.availableChecks.length&&this.build()},e.prototype.build=function(){var t=this;this.buildStrips(),this.hints&&this.buildHints(),this.setStrength(this.target.value),this.target.addEventListener("input",(function(e){t.setStrength(e.target.value)}))},e.prototype.buildStrips=function(){if(this.el.innerHTML="",this.stripClasses)for(var t=0;t<this.availableChecks.length;t++){var e=(0,l.htmlToElement)("<div></div>");(0,l.classToClassList)(this.stripClasses,e),this.el.append(e)}},e.prototype.buildHints=function(){var t=this;this.weakness=this.hints.querySelector("[data-hs-strong-password-hints-weakness-text]")||null,this.rules=Array.from(this.hints.querySelectorAll("[data-hs-strong-password-hints-rule-text]"))||null,this.rules.forEach((function(e){var n,i=e.getAttribute("data-hs-strong-password-hints-rule-text");(null===(n=t.checksExclude)||void 0===n?void 0:n.includes(i))&&e.remove()})),this.weakness&&this.buildWeakness(),this.rules&&this.buildRules(),"popover"===this.mode&&(this.target.addEventListener("focus",(function(){t.isOpened=!0,t.hints.classList.remove("hidden"),t.hints.classList.add("block"),t.recalculateDirection()})),this.target.addEventListener("blur",(function(){t.isOpened=!1,t.hints.classList.remove("block","bottom-full","top-full"),t.hints.classList.add("hidden"),t.hints.style.marginTop="",t.hints.style.marginBottom=""})))},e.prototype.buildWeakness=function(){var t=this;this.checkStrength(this.target.value),this.setWeaknessText(),this.target.addEventListener("input",(function(){return setTimeout((function(){return t.setWeaknessText()}))}))},e.prototype.buildRules=function(){var t=this;this.setRulesText(),this.target.addEventListener("input",(function(){return setTimeout((function(){return t.setRulesText()}))}))},e.prototype.setWeaknessText=function(){var t=this.weakness.getAttribute("data-hs-strong-password-hints-weakness-text"),e=JSON.parse(t);this.weakness.textContent=e[this.strength]},e.prototype.setRulesText=function(){var t=this;this.rules.forEach((function(e){var n=e.getAttribute("data-hs-strong-password-hints-rule-text");t.checkIfPassed(e,t.passedRules.has(n))}))},e.prototype.togglePopover=function(){var t=this.el.querySelector(".popover");t&&t.classList.toggle("show")},e.prototype.checkStrength=function(t){var e=new Set,n={lowercase:/[a-z]+/,uppercase:/[A-Z]+/,numbers:/[0-9]+/,"special-characters":new RegExp("[".concat(this.specialCharactersSet,"]"))},i=0;return this.availableChecks.includes("lowercase")&&t.match(n.lowercase)&&(i+=1,e.add("lowercase")),this.availableChecks.includes("uppercase")&&t.match(n.uppercase)&&(i+=1,e.add("uppercase")),this.availableChecks.includes("numbers")&&t.match(n.numbers)&&(i+=1,e.add("numbers")),this.availableChecks.includes("special-characters")&&t.match(n["special-characters"])&&(i+=1,e.add("special-characters")),this.availableChecks.includes("min-length")&&t.length>=this.minLength&&(i+=1,e.add("min-length")),t.length||(i=0),i===this.availableChecks.length?this.el.classList.add("accepted"):this.el.classList.remove("accepted"),this.strength=i,this.passedRules=e,{strength:this.strength,rules:this.passedRules}},e.prototype.checkIfPassed=function(t,e){void 0===e&&(e=!1);var n=t.querySelector("[data-check]"),i=t.querySelector("[data-uncheck]");e?(t.classList.add("active"),n.classList.remove("hidden"),i.classList.add("hidden")):(t.classList.remove("active"),n.classList.add("hidden"),i.classList.remove("hidden"))},e.prototype.setStrength=function(t){var e=this.checkStrength(t),n=e.strength,i={strength:n,rules:e.rules};this.hideStrips(n),this.fireEvent("change",i),(0,l.dispatch)("change.hs.strongPassword",this.el,i)},e.prototype.hideStrips=function(t){Array.from(this.el.children).forEach((function(e,n){n<t?e.classList.add("passed"):e.classList.remove("passed")}))},e.prototype.recalculateDirection=function(){(0,l.isEnoughSpace)(this.hints,this.target,"bottom",this.popoverSpace)?(this.hints.classList.remove("bottom-full"),this.hints.classList.add("top-full"),this.hints.style.marginBottom="",this.hints.style.marginTop="".concat(this.popoverSpace,"px")):(this.hints.classList.remove("top-full"),this.hints.classList.add("bottom-full"),this.hints.style.marginTop="",this.hints.style.marginBottom="".concat(this.popoverSpace,"px"))},e.getInstance=function(t){var e=window.$hsStrongPasswordCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return e?e.element:null},e.autoInit=function(){window.$hsStrongPasswordCollection||(window.$hsStrongPasswordCollection=[]),document.querySelectorAll("[data-hs-strong-password]:not(.--prevent-on-load-init)").forEach((function(t){if(!window.$hsStrongPasswordCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))){var n=t.getAttribute("data-hs-strong-password"),i=n?JSON.parse(n):{};new e(t,i)}}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),document.addEventListener("scroll",(function(){if(!window.$hsStrongPasswordCollection)return!1;var t=window.$hsStrongPasswordCollection.find((function(t){return t.element.isOpened}));t&&t.element.recalculateDirection()})),"undefined"!=typeof window&&(window.HSStrongPassword=a),e.default=a},166:function(t,e,n){
/*
 * HSTabs
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var s=n(292),l=r(n(961)),a=n(223),c=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;return o.toggles=o.el.querySelectorAll("[data-hs-tab]"),o.extraToggleId=o.el.getAttribute("data-hs-tab-select"),o.extraToggle=document.querySelector(o.extraToggleId),o.current=Array.from(o.toggles).find((function(t){return t.classList.contains("active")})),o.currentContentId=o.current.getAttribute("data-hs-tab"),o.currentContent=document.querySelector(o.currentContentId),o.prev=null,o.prevContentId=null,o.prevContent=null,o.init(),o}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsTabsCollection,this),this.toggles.forEach((function(e){e.addEventListener("click",(function(){return t.open(e)}))})),this.extraToggle&&this.extraToggle.addEventListener("change",(function(e){return t.change(e)}))},e.prototype.open=function(t){var e,n;this.prev=this.current,this.prevContentId=this.currentContentId,this.prevContent=this.currentContent,this.current=t,this.currentContentId=this.current.getAttribute("data-hs-tab"),this.currentContent=document.querySelector(this.currentContentId),(null===(e=null==this?void 0:this.prev)||void 0===e?void 0:e.ariaSelected)&&(this.prev.ariaSelected="false"),this.prev.classList.remove("active"),this.prevContent.classList.add("hidden"),(null===(n=null==this?void 0:this.current)||void 0===n?void 0:n.ariaSelected)&&(this.current.ariaSelected="true"),this.current.classList.add("active"),this.currentContent.classList.remove("hidden"),this.fireEvent("change",{el:t,prev:this.prevContentId,current:this.currentContentId}),(0,s.dispatch)("change.hs.tab",t,{el:t,prev:this.prevContentId,current:this.currentContentId})},e.prototype.change=function(t){var e=document.querySelector('[data-hs-tab="'.concat(t.target.value,'"]'));e&&e.click()},e.getInstance=function(t,e){var n=window.$hsTabsCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsTabsCollection||(window.$hsTabsCollection=[]),document.querySelectorAll('[role="tablist"]:not(select):not(.--prevent-on-load-init)').forEach((function(t){window.$hsTabsCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)})),window.$hsTabsCollection&&document.addEventListener("keydown",(function(t){return e.accessibility(t)}))},e.open=function(t){var e=window.$hsTabsCollection.find((function(e){return Array.from(e.element.toggles).includes("string"==typeof t?document.querySelector(t):t)})),n=Array.from(e.element.toggles).find((function(e){return e===("string"==typeof t?document.querySelector(t):t)}));n&&!n.classList.contains("active")&&e.element.open(n)},e.accessibility=function(t){var e=document.querySelector("[data-hs-tab]:focus");if(e&&a.TABS_ACCESSIBILITY_KEY_SET.includes(t.code)&&!t.metaKey){var n=e.closest('[role="tablist"]').getAttribute("data-hs-tabs-vertical");switch(t.preventDefault(),t.code){case"true"===n?"ArrowUp":"ArrowLeft":this.onArrow();break;case"true"===n?"ArrowDown":"ArrowRight":this.onArrow(!1);break;case"Home":this.onStartEnd();break;case"End":this.onStartEnd(!1)}}},e.onArrow=function(t){void 0===t&&(t=!0);var e=document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'),n=window.$hsTabsCollection.find((function(t){return t.element.el===e}));if(n){var i=t?Array.from(n.element.toggles).reverse():Array.from(n.element.toggles),o=i.find((function(t){return document.activeElement===t})),r=i.findIndex((function(t){return t===o}));i[r=r+1<i.length?r+1:0].focus(),i[r].click()}},e.onStartEnd=function(t){void 0===t&&(t=!0);var e=document.querySelector("[data-hs-tab]:focus").closest('[role="tablist"]'),n=window.$hsTabsCollection.find((function(t){return t.element.el===e}));if(n){var i=t?Array.from(n.element.toggles):Array.from(n.element.toggles).reverse();i.length&&(i[0].focus(),i[0].click())}},e.on=function(t,e,n){var i=window.$hsTabsCollection.find((function(t){return Array.from(t.element.toggles).includes("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(l.default);window.addEventListener("load",(function(){c.autoInit()})),"undefined"!=typeof window&&(window.HSTabs=c),e.default=c},144:function(t,e,n){
/*
 * HSTextareaAutoHeight
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-copy-markup"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.defaultHeight=(null==l?void 0:l.defaultHeight)||0,i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsTextareaAutoHeightCollection,this),this.setAutoHeight()},e.prototype.setAutoHeight=function(){var t=this;this.isParentHidden()?this.callbackAccordingToType():this.textareaSetHeight(3),this.el.addEventListener("input",(function(){return t.textareaSetHeight(3)}))},e.prototype.textareaSetHeight=function(t){void 0===t&&(t=0),this.el.style.height="auto",this.el.style.height=this.checkIfOneLine()&&this.defaultHeight?"".concat(this.defaultHeight,"px"):"".concat(this.el.scrollHeight+t,"px")},e.prototype.checkIfOneLine=function(){var t=this.el.clientHeight;return!(this.el.scrollHeight>t)},e.prototype.isParentHidden=function(){return this.el.closest(".hs-collapse")||this.el.closest(".hs-overlay")},e.prototype.parentType=function(){return this.el.closest(".hs-collapse")?"collapse":!!this.el.closest(".hs-overlay")&&"overlay"},e.prototype.callbackAccordingToType=function(){var t=this;if("collapse"===this.parentType()){var e=this.el.closest(".hs-collapse").id;window.HSCollapse.getInstance('[data-hs-collapse="#'.concat(e,'"]'),!0).element.on("beforeOpen",(function(){if(!t.el)return!1;t.textareaSetHeight(3)}))}else{if("overlay"!==this.parentType())return!1;window.HSOverlay.getInstance(this.el.closest(".hs-overlay"),!0).element.on("open",(function(){if(!t.el)return!1;t.textareaSetHeight(3)}))}},e.getInstance=function(t,e){var n=window.$hsTextareaAutoHeightCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsTextareaAutoHeightCollection||(window.$hsTextareaAutoHeightCollection=[]),document.querySelectorAll("[data-hs-textarea-auto-height]:not(.--prevent-on-load-init)").forEach((function(t){if(!window.$hsTextareaAutoHeightCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))){var n=t.getAttribute("data-hs-textarea-auto-height"),i=n?JSON.parse(n):{};new e(t,i)}}))},e}(s(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),"undefined"!=typeof window&&(window.HSTextareaAutoHeight=l),e.default=l},502:function(t,e,n){var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-theme-switch"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.theme=(null==l?void 0:l.theme)||localStorage.getItem("hs_theme")||"default",i.themeSet=["light","dark","default"],i.init(),i}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsThemeSwitchCollection,this),"default"!==this.theme&&this.setAppearance()},e.prototype.setResetStyles=function(){var t=document.createElement("style");return t.innerText="*{transition: unset !important;}",t.setAttribute("data-hs-appearance-onload-styles",""),document.head.appendChild(t),t},e.prototype.addSystemThemeObserver=function(){var t=this;window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change",(function(e){e.matches?t.setAppearance("dark",!1):t.setAppearance("default",!1)}))},e.prototype.removeSystemThemeObserver=function(){window.matchMedia("(prefers-color-scheme: dark)").removeEventListener},e.prototype.setAppearance=function(t,e,n){void 0===t&&(t=this.theme),void 0===e&&(e=!0),void 0===n&&(n=!0);var i=document.querySelector("html"),o=this.setResetStyles();e&&localStorage.setItem("hs_theme",t),"auto"===t&&(t=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"default"),i.classList.remove("light","dark","default","auto"),i.classList.add(t),setTimeout((function(){return o.remove()})),n&&window.dispatchEvent(new CustomEvent("on-hs-appearance-change",{detail:t}))},e.getInstance=function(t){var e=window.$hsThemeSwitchCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return e?e.element:null},e.autoInit=function(){window.$hsThemeSwitchCollection||(window.$hsThemeSwitchCollection=[]);var t=function(t){"auto"===localStorage.getItem("hs_theme")?t.addSystemThemeObserver():t.removeSystemThemeObserver()};document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach((function(n){if(!window.$hsThemeSwitchCollection.find((function(t){var e;return(null===(e=null==t?void 0:t.element)||void 0===e?void 0:e.el)===n}))){var i=new e(n);i.el.checked="dark"===i.theme,t(i),i.el.addEventListener("change",(function(e){var n=e.target.checked?"dark":"default";i.setAppearance(n),t(i)}))}})),document.querySelectorAll("[data-hs-theme-click-value]:not(.--prevent-on-load-init)").forEach((function(n){var i=n.getAttribute("data-hs-theme-click-value"),o=new e(n);t(o),o.el.addEventListener("click",(function(){o.setAppearance(i),t(o)}))}))},e}(s(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),window.$hsThemeSwitchCollection&&window.addEventListener("on-hs-appearance-change",(function(t){window.$hsThemeSwitchCollection.forEach((function(e){e.element.el.checked="dark"===t.detail}))})),"undefined"!=typeof window&&(window.HSThemeSwitch=l),e.default=l},684:function(t,e,n){
/*
 * HSToggleCount
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-toggle-count"),s=o?JSON.parse(o):{},l=r(r({},s),n);return i.target=(null==l?void 0:l.target)?"string"==typeof(null==l?void 0:l.target)?document.querySelector(l.target):l.target:null,i.min=(null==l?void 0:l.min)||0,i.max=(null==l?void 0:l.max)||0,i.duration=(null==l?void 0:l.duration)||700,i.isChecked=i.target.checked||!1,i.target&&i.init(),i}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsToggleCountCollection,this),this.isChecked&&(this.el.innerText=String(this.max)),this.target.addEventListener("change",(function(){t.isChecked=!t.isChecked,t.toggle()}))},e.prototype.toggle=function(){this.isChecked?this.countUp():this.countDown()},e.prototype.animate=function(t,e){var n=this,i=0,o=function(r){i||(i=r);var s=Math.min((r-i)/n.duration,1);n.el.innerText=String(Math.floor(s*(e-t)+t)),s<1&&window.requestAnimationFrame(o)};window.requestAnimationFrame(o)},e.prototype.countUp=function(){this.animate(this.min,this.max)},e.prototype.countDown=function(){this.animate(this.max,this.min)},e.getInstance=function(t,e){var n=window.$hsToggleCountCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsToggleCountCollection||(window.$hsToggleCountCollection=[]),document.querySelectorAll("[data-hs-toggle-count]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsToggleCountCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){l.autoInit()})),"undefined"!=typeof window&&(window.HSToggleCount=l),e.default=l},100:function(t,e,n){
/*
 * HSTogglePassword
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n){var i=t.call(this,e,n)||this,o=e.getAttribute("data-hs-toggle-password"),s=o?JSON.parse(o):{},a=r(r({},s),n),c=[];(null==a?void 0:a.target)&&"string"==typeof(null==a?void 0:a.target)?(null==a?void 0:a.target.split(",")).forEach((function(t){c.push(document.querySelector(t))})):(null==a?void 0:a.target)&&"object"==typeof(null==a?void 0:a.target)?a.target.forEach((function(t){return c.push(document.querySelector(t))})):a.target.forEach((function(t){return c.push(t)}));return i.target=c,i.isShown=!!i.el.hasAttribute("type")&&i.el.checked,i.eventType=(0,l.isFormElement)(i.el)?"change":"click",i.isMultiple=i.target.length>1&&!!i.el.closest("[data-hs-toggle-password-group]"),i.target&&i.init(),i}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsTogglePasswordCollection,this),this.isShown?this.show():this.hide(),this.el.addEventListener(this.eventType,(function(){t.isShown?t.hide():t.show(),t.fireEvent("toggle",t.target),(0,l.dispatch)("toggle.hs.toggle-select",t.el,t.target)}))},e.prototype.getMultipleToggles=function(){var t=this.el.closest("[data-hs-toggle-password-group]").querySelectorAll("[data-hs-toggle-password]"),n=[];return t.forEach((function(t){n.push(e.getInstance(t))})),n},e.prototype.show=function(){this.isMultiple?(this.getMultipleToggles().forEach((function(t){return!!t&&(t.isShown=!0)})),this.el.closest("[data-hs-toggle-password-group]").classList.add("active")):(this.isShown=!0,this.el.classList.add("active"));this.target.forEach((function(t){t.type="text"}))},e.prototype.hide=function(){this.isMultiple?(this.getMultipleToggles().forEach((function(t){return!!t&&(t.isShown=!1)})),this.el.closest("[data-hs-toggle-password-group]").classList.remove("active")):(this.isShown=!1,this.el.classList.remove("active"));this.target.forEach((function(t){t.type="password"}))},e.getInstance=function(t,e){var n=window.$hsTogglePasswordCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element:null},e.autoInit=function(){window.$hsTogglePasswordCollection||(window.$hsTogglePasswordCollection=[]),document.querySelectorAll("[data-hs-toggle-password]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsTogglePasswordCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSTogglePassword=a),e.default=a},969:function(t,e,n){
/*
 * HSTooltip
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__spreadArray||function(t,e,n){if(n||2===arguments.length)for(var i,o=0,r=e.length;o<r;o++)!i&&o in e||(i||(i=Array.prototype.slice.call(e,0,o)),i[o]=e[o]);return t.concat(i||Array.prototype.slice.call(e))},l=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var a=n(170),c=n(292),u=l(n(961)),d=n(223),p=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;return o.el&&(o.toggle=o.el.querySelector(".hs-tooltip-toggle")||o.el,o.content=o.el.querySelector(".hs-tooltip-content"),o.eventMode=(0,c.getClassProperty)(o.el,"--trigger")||"hover",o.preventPopper=(0,c.getClassProperty)(o.el,"--prevent-popper","false"),o.placement=(0,c.getClassProperty)(o.el,"--placement"),o.strategy=(0,c.getClassProperty)(o.el,"--strategy")),o.el&&o.toggle&&o.content&&o.init(),o}return o(e,t),e.prototype.init=function(){var t=this;this.createCollection(window.$hsTooltipCollection,this),"click"===this.eventMode?this.toggle.addEventListener("click",(function(){return t.click()})):"focus"===this.eventMode?this.toggle.addEventListener("click",(function(){return t.focus()})):"hover"===this.eventMode&&(this.toggle.addEventListener("mouseenter",(function(){return t.enter()})),this.toggle.addEventListener("mouseleave",(function(){return t.leave()}))),"false"===this.preventPopper&&this.buildPopper()},e.prototype.enter=function(){this.show()},e.prototype.leave=function(){this.hide()},e.prototype.click=function(){var t=this;if(this.el.classList.contains("show"))return!1;this.show();var e=function(){setTimeout((function(){t.hide(),t.toggle.removeEventListener("click",e,!0),t.toggle.removeEventListener("blur",e,!0)}))};this.toggle.addEventListener("click",e,!0),this.toggle.addEventListener("blur",e,!0)},e.prototype.focus=function(){var t=this;this.show();var e=function(){t.hide(),t.toggle.removeEventListener("blur",e,!0)};this.toggle.addEventListener("blur",e,!0)},e.prototype.buildPopper=function(){this.popperInstance=(0,a.createPopper)(this.toggle,this.content,{placement:d.POSITIONS[this.placement]||"top",strategy:this.strategy||"fixed",modifiers:[{name:"offset",options:{offset:[0,5]}}]})},e.prototype.show=function(){var t=this;this.content.classList.remove("hidden"),"false"===this.preventPopper&&(this.popperInstance.setOptions((function(t){return r(r({},t),{modifiers:s(s([],t.modifiers,!0),[{name:"eventListeners",enabled:!0}],!1)})})),this.popperInstance.update()),setTimeout((function(){t.el.classList.add("show"),t.fireEvent("show",t.el),(0,c.dispatch)("show.hs.tooltip",t.el,t.el)}))},e.prototype.hide=function(){var t=this;this.el.classList.remove("show"),"false"===this.preventPopper&&this.popperInstance.setOptions((function(t){return r(r({},t),{modifiers:s(s([],t.modifiers,!0),[{name:"eventListeners",enabled:!1}],!1)})})),this.fireEvent("hide",this.el),(0,c.dispatch)("hide.hs.tooltip",this.el,this.el),(0,c.afterTransition)(this.content,(function(){if(t.el.classList.contains("show"))return!1;t.content.classList.add("hidden")}))},e.getInstance=function(t,e){void 0===e&&(e=!1);var n=window.$hsTooltipCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsTooltipCollection||(window.$hsTooltipCollection=[]),document.querySelectorAll(".hs-tooltip").forEach((function(t){window.$hsTooltipCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e.show=function(t){var e=window.$hsTooltipCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));if(e)switch(e.element.eventMode){case"click":e.element.click();break;case"focus":e.element.focus();break;default:e.element.enter()}},e.hide=function(t){var e=window.$hsTooltipCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));e&&e.element.hide()},e.on=function(t,e,n){var i=window.$hsTooltipCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e}(u.default);window.addEventListener("load",(function(){p.autoInit()})),"undefined"!=typeof window&&(window.HSTooltip=p),e.default=p},772:function(t,e,n){
/*
 * HSTreeView
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i,o=this&&this.__extends||(i=function(t,e){return i=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n])},i(t,e)},function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Class extends value "+String(e)+" is not a constructor or null");function n(){this.constructor=t}i(t,e),t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)}),r=this&&this.__assign||function(){return r=Object.assign||function(t){for(var e,n=1,i=arguments.length;n<i;n++)for(var o in e=arguments[n])Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o]);return t},r.apply(this,arguments)},s=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0});var l=n(292),a=function(t){function e(e,n,i){var o=t.call(this,e,n,i)||this;o.items=[];var s=e.getAttribute("data-hs-tree-view"),l=s?JSON.parse(s):{},a=r(r({},l),n);return o.controlBy=(null==a?void 0:a.controlBy)||"button",o.autoSelectChildren=(null==a?void 0:a.autoSelectChildren)||!1,o.isIndeterminate=(null==a?void 0:a.isIndeterminate)||!0,o.init(),o}return o(e,t),e.prototype.init=function(){this.createCollection(window.$hsTreeViewCollection,this),e.group+=1,this.initItems()},e.prototype.initItems=function(){var t=this;this.el.querySelectorAll("[data-hs-tree-view-item]").forEach((function(n,i){var o,s,l=JSON.parse(n.getAttribute("data-hs-tree-view-item"));n.id||(n.id="tree-view-item-".concat(e.group,"-").concat(i));var a=r(r({},l),{id:null!==(o=l.id)&&void 0!==o?o:n.id,path:t.getPath(n),isSelected:null!==(s=l.isSelected)&&void 0!==s&&s});t.items.push(a),"checkbox"===t.controlBy?t.controlByCheckbox(n,a):t.controlByButton(n,a)}))},e.prototype.controlByButton=function(t,e){var n=this;t.addEventListener("click",(function(i){if(i.stopPropagation(),t.classList.contains("disabled"))return!1;i.metaKey||i.shiftKey||n.unselectItem(e),n.selectItem(t,e),n.fireEvent("click",{el:t,data:e}),(0,l.dispatch)("click.hs.treeView",n.el,{el:t,data:e})}))},e.prototype.controlByCheckbox=function(t,e){var n=this,i=t.querySelector('input[value="'.concat(e.value,'"]'));i&&i.addEventListener("change",(function(){n.autoSelectChildren?(n.selectItem(t,e),e.isDir&&n.selectChildren(t,e),n.toggleParent(t)):n.selectItem(t,e)}))},e.prototype.getItem=function(t){return this.items.find((function(e){return e.id===t}))},e.prototype.getPath=function(t){for(var e,n=[],i=t.closest("[data-hs-tree-view-item]");i;){var o=JSON.parse(i.getAttribute("data-hs-tree-view-item"));n.push(o.value),i=null===(e=i.parentElement)||void 0===e?void 0:e.closest("[data-hs-tree-view-item]")}return n.reverse().join("/")},e.prototype.unselectItem=function(t){var e=this;void 0===t&&(t=null);var n=this.getSelectedItems();t&&(n=n.filter((function(e){return e.id!==t.id}))),n.length&&n.forEach((function(t){document.querySelector("#".concat(t.id)).classList.remove("selected"),e.changeItemProp(t.id,"isSelected",!1)}))},e.prototype.selectItem=function(t,e){e.isSelected?(t.classList.remove("selected"),this.changeItemProp(e.id,"isSelected",!1)):(t.classList.add("selected"),this.changeItemProp(e.id,"isSelected",!0))},e.prototype.selectChildren=function(t,e){var n=this,i=t.querySelectorAll("[data-hs-tree-view-item]");Array.from(i).filter((function(t){return!t.classList.contains("disabled")})).forEach((function(t){var i=t.id?n.getItem(t.id):null;if(!i)return!1;e.isSelected?(t.classList.add("selected"),n.changeItemProp(i.id,"isSelected",!0)):(t.classList.remove("selected"),n.changeItemProp(i.id,"isSelected",!1));var o=n.getItem(t.id),r=t.querySelector('input[value="'.concat(o.value,'"]'));n.isIndeterminate&&(r.indeterminate=!1),o.isSelected?r.checked=!0:r.checked=!1}))},e.prototype.toggleParent=function(t){for(var e,n,i=this,o=null===(e=t.parentElement)||void 0===e?void 0:e.closest("[data-hs-tree-view-item]"),r=function(){var t=o.querySelectorAll("[data-hs-tree-view-item]:not(.disabled)"),e=JSON.parse(o.getAttribute("data-hs-tree-view-item")),r=o.querySelector('input[value="'.concat(e.value,'"]')),l=!1,a=0;t.forEach((function(t){var e=i.getItem(t.id);e.isSelected&&(a+=1),e.isSelected||(l=!0)})),l?(o.classList.remove("selected"),s.changeItemProp(o.id,"isSelected",!1),r.checked=!1):(o.classList.add("selected"),s.changeItemProp(o.id,"isSelected",!0),r.checked=!0),s.isIndeterminate&&(a>0&&a<t.length?r.indeterminate=!0:r.indeterminate=!1),o=null===(n=o.parentElement)||void 0===n?void 0:n.closest("[data-hs-tree-view-item]")},s=this;o;)r()},e.prototype.update=function(){var t=this;this.items.map((function(e){var n=document.querySelector("#".concat(e.id));return e.path!==t.getPath(n)&&(e.path=t.getPath(n)),e}))},e.prototype.getSelectedItems=function(){return this.items.filter((function(t){return t.isSelected}))},e.prototype.changeItemProp=function(t,e,n){this.items.map((function(i){return i.id===t&&(i[e]=n),i}))},e.getInstance=function(t,e){var n=window.$hsTreeViewCollection.find((function(e){return e.element.el===("string"==typeof t?document.querySelector(t):t)}));return n?e?n:n.element.el:null},e.autoInit=function(){window.$hsTreeViewCollection||(window.$hsTreeViewCollection=[]),document.querySelectorAll("[data-hs-tree-view]:not(.--prevent-on-load-init)").forEach((function(t){window.$hsTreeViewCollection.find((function(e){var n;return(null===(n=null==e?void 0:e.element)||void 0===n?void 0:n.el)===t}))||new e(t)}))},e.on=function(t,e,n){var i=window.$hsTreeViewCollection.find((function(t){return t.element.el===("string"==typeof e?document.querySelector(e):e)}));i&&(i.element.events[t]=n)},e.group=0,e}(s(n(961)).default);window.addEventListener("load",(function(){a.autoInit()})),"undefined"!=typeof window&&(window.HSTreeView=a),e.default=a},255:function(t,e,n){
/*
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var i=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(e,"__esModule",{value:!0}),e.COLLECTIONS=void 0;var o=i(n(406)),r=i(n(740)),s=i(n(268)),l=i(n(485)),a=i(n(809)),c=i(n(814)),u=i(n(891)),d=i(n(234)),p=i(n(332)),h=i(n(850)),f=i(n(60)),v=i(n(347)),m=i(n(911)),g=i(n(751)),y=i(n(442)),w=i(n(887)),b=i(n(97)),S=i(n(166)),C=i(n(144)),x=i(n(502)),I=i(n(684)),T=i(n(100)),E=i(n(969)),O=i(n(772));e.COLLECTIONS=[{key:"copy-markup",fn:o.default,collection:"$hsCopyMarkupCollection"},{key:"accordion",fn:r.default,collection:"$hsAccordionCollection"},{key:"carousel",fn:s.default,collection:"$hsCarouselCollection"},{key:"collapse",fn:l.default,collection:"$hsCollapseCollection"},{key:"combobox",fn:a.default,collection:"$hsComboBoxCollection"},{key:"datatable",fn:c.default,collection:"$hsDataTableCollection"},{key:"dropdown",fn:u.default,collection:"$hsDropdownCollection"},{key:"file-upload",fn:d.default,collection:"$hsFileUploadCollection"},{key:"input-number",fn:p.default,collection:"$hsInputNumberCollection"},{key:"overlay",fn:h.default,collection:"$hsOverlayCollection"},{key:"pin-input",fn:f.default,collection:"$hsPinInputCollection"},{key:"range-slider",fn:v.default,collection:"$hsRangeSliderCollection"},{key:"remove-element",fn:m.default,collection:"$hsRemoveElementCollection"},{key:"scrollspy",fn:g.default,collection:"$hsScrollspyCollection"},{key:"select",fn:y.default,collection:"$hsSelectCollection"},{key:"stepper",fn:w.default,collection:"$hsStepperCollection"},{key:"strong-password",fn:b.default,collection:"$hsStrongPasswordCollection"},{key:"tabs",fn:S.default,collection:"$hsTabsCollection"},{key:"textarea-auto-height",fn:C.default,collection:"$hsTextareaAutoHeightCollection"},{key:"theme-switch",fn:x.default,collection:"$hsThemeSwitchCollection"},{key:"toggle-count",fn:I.default,collection:"$hsToggleCountCollection"},{key:"toggle-password",fn:T.default,collection:"$hsTogglePasswordCollection"},{key:"tooltip",fn:E.default,collection:"$hsTooltipCollection"},{key:"tree-view",fn:O.default,collection:"$hsTreeViewCollection"}]},957:(t,e,n)=>{
/*
 * HSStaticMethods
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
Object.defineProperty(e,"__esModule",{value:!0});var i=n(292),o=n(255),r={getClassProperty:i.getClassProperty,afterTransition:i.afterTransition,autoInit:function(t){void 0===t&&(t="all"),"all"===t?o.COLLECTIONS.forEach((function(t){var e=t.fn;null==e||e.autoInit()})):o.COLLECTIONS.forEach((function(e){var n=e.key,i=e.fn;t.includes(n)&&(null==i||i.autoInit())}))},cleanCollection:function(t){void 0===t&&(t="all"),"all"===t?o.COLLECTIONS.forEach((function(t){var e=t.collection;window[e]instanceof Array&&(window[e]=[])})):o.COLLECTIONS.forEach((function(e){var n=e.key,i=e.collection;t.includes(n)&&window[i]instanceof Array&&(window[i]=[])}))}};"undefined"!=typeof window&&(window.HSStaticMethods=r),e.default=r},292:function(t,e){
/*
 * @version: 2.5.0
 * @author: Preline Labs Ltd.
 * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
 * Copyright 2024 Preline Labs Ltd.
 */
var n=this;Object.defineProperty(e,"__esModule",{value:!0}),e.menuSearchHistory=e.classToClassList=e.htmlToElement=e.afterTransition=e.dispatch=e.debounce=e.isDirectChild=e.isFormElement=e.isParentOrElementHidden=e.isEnoughSpace=e.isIpadOS=e.isIOS=e.getZIndex=e.getClassPropertyAlt=e.getClassProperty=e.stringToBoolean=void 0,e.getHighestZIndex=function(t){var e=Number.NEGATIVE_INFINITY;return t.forEach((function(t){var n=i(t);"auto"!==n&&(n=parseInt(n,10))>e&&(e=n)})),e};e.stringToBoolean=function(t){return"true"===t};e.getClassProperty=function(t,e,n){return void 0===n&&(n=""),(window.getComputedStyle(t).getPropertyValue(e)||n).replace(" ","")};e.getClassPropertyAlt=function(t,e,n){void 0===n&&(n="");var i="";return t.classList.forEach((function(t){t.includes(e)&&(i=t)})),i.match(/:(.*)]/)?i.match(/:(.*)]/)[1]:n};var i=function(t){return window.getComputedStyle(t).getPropertyValue("z-index")};e.getZIndex=i;e.isIOS=function(){return!!/iPad|iPhone|iPod/.test(navigator.platform)||navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform)};e.isIpadOS=function(){return navigator.maxTouchPoints&&navigator.maxTouchPoints>2&&/MacIntel/.test(navigator.platform)};e.isDirectChild=function(t,e){for(var n=t.children,i=0;i<n.length;i++)if(n[i]===e)return!0;return!1};e.isEnoughSpace=function(t,e,n,i,o){void 0===n&&(n="auto"),void 0===i&&(i=10),void 0===o&&(o=null);var r=e.getBoundingClientRect(),s=o?o.getBoundingClientRect():null,l=window.innerHeight,a=s?r.top-s.top:r.top,c=(o?s.bottom:l)-r.bottom,u=t.clientHeight+i;return"bottom"===n?c>=u:"top"===n?a>=u:a>=u||c>=u};e.isFormElement=function(t){return t instanceof HTMLInputElement||t instanceof HTMLTextAreaElement||t instanceof HTMLSelectElement};var o=function(t){return!!t&&("none"===window.getComputedStyle(t).display||o(t.parentElement))};e.isParentOrElementHidden=o;e.debounce=function(t,e){var i;return void 0===e&&(e=200),function(){for(var o=[],r=0;r<arguments.length;r++)o[r]=arguments[r];clearTimeout(i),i=setTimeout((function(){t.apply(n,o)}),e)}};e.dispatch=function(t,e,n){void 0===n&&(n=null);var i=new CustomEvent(t,{detail:{payload:n},bubbles:!0,cancelable:!0,composed:!1});e.dispatchEvent(i)};e.afterTransition=function(t,e){var n=function(){e(),t.removeEventListener("transitionend",n,!0)},i=window.getComputedStyle(t),o=i.getPropertyValue("transition-duration");"none"!==i.getPropertyValue("transition-property")&&parseFloat(o)>0?t.addEventListener("transitionend",n,!0):e()};e.htmlToElement=function(t){var e=document.createElement("template");return t=t.trim(),e.innerHTML=t,e.content.firstChild};e.classToClassList=function(t,e,n,i){void 0===n&&(n=" "),void 0===i&&(i="add"),t.split(n).forEach((function(t){return"add"===i?e.classList.add(t):e.classList.remove(t)}))};e.menuSearchHistory={historyIndex:-1,addHistory:function(t){this.historyIndex=t},existsInHistory:function(t){return t>this.historyIndex},clearHistory:function(){this.historyIndex=-1}}}},e={};function n(i){var o=e[i];if(void 0!==o)return o.exports;var r=e[i]={exports:{}};return t[i].call(r.exports,r,r.exports,n),r.exports}return n.d=(t,e)=>{for(var i in e)n.o(e,i)&&!n.o(t,i)&&Object.defineProperty(t,i,{enumerable:!0,get:e[i]})},n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n(158)})()));

/***/ }),

/***/ "./node_modules/react-dom/client.js":
/*!******************************************!*\
  !*** ./node_modules/react-dom/client.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";


var m = __webpack_require__(/*! react-dom */ "react-dom");
if (false) {} else {
  var i = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  exports.createRoot = function(c, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.createRoot(c, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
  exports.hydrateRoot = function(c, h, o) {
    i.usingClientEntryPoint = true;
    try {
      return m.hydrateRoot(c, h, o);
    } finally {
      i.usingClientEntryPoint = false;
    }
  };
}


/***/ }),

/***/ "./node_modules/react/cjs/react-jsx-runtime.development.js":
/*!*****************************************************************!*\
  !*** ./node_modules/react/cjs/react-jsx-runtime.development.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

"use strict";
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */



if (true) {
  (function() {
'use strict';

var React = __webpack_require__(/*! react */ "react");

// ATTENTION
// When adding new symbols to this file,
// Please consider also adding to 'react-devtools-shared/src/backend/ReactSymbols'
// The Symbol used to tag the ReactElement-like types.
var REACT_ELEMENT_TYPE = Symbol.for('react.element');
var REACT_PORTAL_TYPE = Symbol.for('react.portal');
var REACT_FRAGMENT_TYPE = Symbol.for('react.fragment');
var REACT_STRICT_MODE_TYPE = Symbol.for('react.strict_mode');
var REACT_PROFILER_TYPE = Symbol.for('react.profiler');
var REACT_PROVIDER_TYPE = Symbol.for('react.provider');
var REACT_CONTEXT_TYPE = Symbol.for('react.context');
var REACT_FORWARD_REF_TYPE = Symbol.for('react.forward_ref');
var REACT_SUSPENSE_TYPE = Symbol.for('react.suspense');
var REACT_SUSPENSE_LIST_TYPE = Symbol.for('react.suspense_list');
var REACT_MEMO_TYPE = Symbol.for('react.memo');
var REACT_LAZY_TYPE = Symbol.for('react.lazy');
var REACT_OFFSCREEN_TYPE = Symbol.for('react.offscreen');
var MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
var FAUX_ITERATOR_SYMBOL = '@@iterator';
function getIteratorFn(maybeIterable) {
  if (maybeIterable === null || typeof maybeIterable !== 'object') {
    return null;
  }

  var maybeIterator = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable[FAUX_ITERATOR_SYMBOL];

  if (typeof maybeIterator === 'function') {
    return maybeIterator;
  }

  return null;
}

var ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

function error(format) {
  {
    {
      for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
        args[_key2 - 1] = arguments[_key2];
      }

      printWarning('error', format, args);
    }
  }
}

function printWarning(level, format, args) {
  // When changing this logic, you might want to also
  // update consoleWithStackDev.www.js as well.
  {
    var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;
    var stack = ReactDebugCurrentFrame.getStackAddendum();

    if (stack !== '') {
      format += '%s';
      args = args.concat([stack]);
    } // eslint-disable-next-line react-internal/safe-string-coercion


    var argsWithFormat = args.map(function (item) {
      return String(item);
    }); // Careful: RN currently depends on this prefix

    argsWithFormat.unshift('Warning: ' + format); // We intentionally don't use spread (or .apply) directly because it
    // breaks IE9: https://github.com/facebook/react/issues/13610
    // eslint-disable-next-line react-internal/no-production-logging

    Function.prototype.apply.call(console[level], console, argsWithFormat);
  }
}

// -----------------------------------------------------------------------------

var enableScopeAPI = false; // Experimental Create Event Handle API.
var enableCacheElement = false;
var enableTransitionTracing = false; // No known bugs, but needs performance testing

var enableLegacyHidden = false; // Enables unstable_avoidThisFallback feature in Fiber
// stuff. Intended to enable React core members to more easily debug scheduling
// issues in DEV builds.

var enableDebugTracing = false; // Track which Fiber(s) schedule render work.

var REACT_MODULE_REFERENCE;

{
  REACT_MODULE_REFERENCE = Symbol.for('react.module.reference');
}

function isValidElementType(type) {
  if (typeof type === 'string' || typeof type === 'function') {
    return true;
  } // Note: typeof might be other than 'symbol' or 'number' (e.g. if it's a polyfill).


  if (type === REACT_FRAGMENT_TYPE || type === REACT_PROFILER_TYPE || enableDebugTracing  || type === REACT_STRICT_MODE_TYPE || type === REACT_SUSPENSE_TYPE || type === REACT_SUSPENSE_LIST_TYPE || enableLegacyHidden  || type === REACT_OFFSCREEN_TYPE || enableScopeAPI  || enableCacheElement  || enableTransitionTracing ) {
    return true;
  }

  if (typeof type === 'object' && type !== null) {
    if (type.$$typeof === REACT_LAZY_TYPE || type.$$typeof === REACT_MEMO_TYPE || type.$$typeof === REACT_PROVIDER_TYPE || type.$$typeof === REACT_CONTEXT_TYPE || type.$$typeof === REACT_FORWARD_REF_TYPE || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    type.$$typeof === REACT_MODULE_REFERENCE || type.getModuleId !== undefined) {
      return true;
    }
  }

  return false;
}

function getWrappedName(outerType, innerType, wrapperName) {
  var displayName = outerType.displayName;

  if (displayName) {
    return displayName;
  }

  var functionName = innerType.displayName || innerType.name || '';
  return functionName !== '' ? wrapperName + "(" + functionName + ")" : wrapperName;
} // Keep in sync with react-reconciler/getComponentNameFromFiber


function getContextName(type) {
  return type.displayName || 'Context';
} // Note that the reconciler package should generally prefer to use getComponentNameFromFiber() instead.


function getComponentNameFromType(type) {
  if (type == null) {
    // Host root, text node or just invalid type.
    return null;
  }

  {
    if (typeof type.tag === 'number') {
      error('Received an unexpected object in getComponentNameFromType(). ' + 'This is likely a bug in React. Please file an issue.');
    }
  }

  if (typeof type === 'function') {
    return type.displayName || type.name || null;
  }

  if (typeof type === 'string') {
    return type;
  }

  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return 'Fragment';

    case REACT_PORTAL_TYPE:
      return 'Portal';

    case REACT_PROFILER_TYPE:
      return 'Profiler';

    case REACT_STRICT_MODE_TYPE:
      return 'StrictMode';

    case REACT_SUSPENSE_TYPE:
      return 'Suspense';

    case REACT_SUSPENSE_LIST_TYPE:
      return 'SuspenseList';

  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        var context = type;
        return getContextName(context) + '.Consumer';

      case REACT_PROVIDER_TYPE:
        var provider = type;
        return getContextName(provider._context) + '.Provider';

      case REACT_FORWARD_REF_TYPE:
        return getWrappedName(type, type.render, 'ForwardRef');

      case REACT_MEMO_TYPE:
        var outerName = type.displayName || null;

        if (outerName !== null) {
          return outerName;
        }

        return getComponentNameFromType(type.type) || 'Memo';

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            return getComponentNameFromType(init(payload));
          } catch (x) {
            return null;
          }
        }

      // eslint-disable-next-line no-fallthrough
    }
  }

  return null;
}

var assign = Object.assign;

// Helpers to patch console.logs to avoid logging during side-effect free
// replaying on render function. This currently only patches the object
// lazily which won't cover if the log function was extracted eagerly.
// We could also eagerly patch the method.
var disabledDepth = 0;
var prevLog;
var prevInfo;
var prevWarn;
var prevError;
var prevGroup;
var prevGroupCollapsed;
var prevGroupEnd;

function disabledLog() {}

disabledLog.__reactDisabledLog = true;
function disableLogs() {
  {
    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      prevLog = console.log;
      prevInfo = console.info;
      prevWarn = console.warn;
      prevError = console.error;
      prevGroup = console.group;
      prevGroupCollapsed = console.groupCollapsed;
      prevGroupEnd = console.groupEnd; // https://github.com/facebook/react/issues/19099

      var props = {
        configurable: true,
        enumerable: true,
        value: disabledLog,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        info: props,
        log: props,
        warn: props,
        error: props,
        group: props,
        groupCollapsed: props,
        groupEnd: props
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    disabledDepth++;
  }
}
function reenableLogs() {
  {
    disabledDepth--;

    if (disabledDepth === 0) {
      /* eslint-disable react-internal/no-production-logging */
      var props = {
        configurable: true,
        enumerable: true,
        writable: true
      }; // $FlowFixMe Flow thinks console is immutable.

      Object.defineProperties(console, {
        log: assign({}, props, {
          value: prevLog
        }),
        info: assign({}, props, {
          value: prevInfo
        }),
        warn: assign({}, props, {
          value: prevWarn
        }),
        error: assign({}, props, {
          value: prevError
        }),
        group: assign({}, props, {
          value: prevGroup
        }),
        groupCollapsed: assign({}, props, {
          value: prevGroupCollapsed
        }),
        groupEnd: assign({}, props, {
          value: prevGroupEnd
        })
      });
      /* eslint-enable react-internal/no-production-logging */
    }

    if (disabledDepth < 0) {
      error('disabledDepth fell below zero. ' + 'This is a bug in React. Please file an issue.');
    }
  }
}

var ReactCurrentDispatcher = ReactSharedInternals.ReactCurrentDispatcher;
var prefix;
function describeBuiltInComponentFrame(name, source, ownerFn) {
  {
    if (prefix === undefined) {
      // Extract the VM specific prefix used by each line.
      try {
        throw Error();
      } catch (x) {
        var match = x.stack.trim().match(/\n( *(at )?)/);
        prefix = match && match[1] || '';
      }
    } // We use the prefix to ensure our stacks line up with native stack frames.


    return '\n' + prefix + name;
  }
}
var reentry = false;
var componentFrameCache;

{
  var PossiblyWeakMap = typeof WeakMap === 'function' ? WeakMap : Map;
  componentFrameCache = new PossiblyWeakMap();
}

function describeNativeComponentFrame(fn, construct) {
  // If something asked for a stack inside a fake render, it should get ignored.
  if ( !fn || reentry) {
    return '';
  }

  {
    var frame = componentFrameCache.get(fn);

    if (frame !== undefined) {
      return frame;
    }
  }

  var control;
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace; // $FlowFixMe It does accept undefined.

  Error.prepareStackTrace = undefined;
  var previousDispatcher;

  {
    previousDispatcher = ReactCurrentDispatcher.current; // Set the dispatcher in DEV because this might be call in the render function
    // for warnings.

    ReactCurrentDispatcher.current = null;
    disableLogs();
  }

  try {
    // This should throw.
    if (construct) {
      // Something should be setting the props in the constructor.
      var Fake = function () {
        throw Error();
      }; // $FlowFixMe


      Object.defineProperty(Fake.prototype, 'props', {
        set: function () {
          // We use a throwing setter instead of frozen or non-writable props
          // because that won't throw in a non-strict mode function.
          throw Error();
        }
      });

      if (typeof Reflect === 'object' && Reflect.construct) {
        // We construct a different control for this case to include any extra
        // frames added by the construct call.
        try {
          Reflect.construct(Fake, []);
        } catch (x) {
          control = x;
        }

        Reflect.construct(fn, [], Fake);
      } else {
        try {
          Fake.call();
        } catch (x) {
          control = x;
        }

        fn.call(Fake.prototype);
      }
    } else {
      try {
        throw Error();
      } catch (x) {
        control = x;
      }

      fn();
    }
  } catch (sample) {
    // This is inlined manually because closure doesn't do it for us.
    if (sample && control && typeof sample.stack === 'string') {
      // This extracts the first frame from the sample that isn't also in the control.
      // Skipping one frame that we assume is the frame that calls the two.
      var sampleLines = sample.stack.split('\n');
      var controlLines = control.stack.split('\n');
      var s = sampleLines.length - 1;
      var c = controlLines.length - 1;

      while (s >= 1 && c >= 0 && sampleLines[s] !== controlLines[c]) {
        // We expect at least one stack frame to be shared.
        // Typically this will be the root most one. However, stack frames may be
        // cut off due to maximum stack limits. In this case, one maybe cut off
        // earlier than the other. We assume that the sample is longer or the same
        // and there for cut off earlier. So we should find the root most frame in
        // the sample somewhere in the control.
        c--;
      }

      for (; s >= 1 && c >= 0; s--, c--) {
        // Next we find the first one that isn't the same which should be the
        // frame that called our sample function and the control.
        if (sampleLines[s] !== controlLines[c]) {
          // In V8, the first line is describing the message but other VMs don't.
          // If we're about to return the first line, and the control is also on the same
          // line, that's a pretty good indicator that our sample threw at same line as
          // the control. I.e. before we entered the sample frame. So we ignore this result.
          // This can happen if you passed a class to function component, or non-function.
          if (s !== 1 || c !== 1) {
            do {
              s--;
              c--; // We may still have similar intermediate frames from the construct call.
              // The next one that isn't the same should be our match though.

              if (c < 0 || sampleLines[s] !== controlLines[c]) {
                // V8 adds a "new" prefix for native classes. Let's remove it to make it prettier.
                var _frame = '\n' + sampleLines[s].replace(' at new ', ' at '); // If our component frame is labeled "<anonymous>"
                // but we have a user-provided "displayName"
                // splice it in to make the stack more readable.


                if (fn.displayName && _frame.includes('<anonymous>')) {
                  _frame = _frame.replace('<anonymous>', fn.displayName);
                }

                {
                  if (typeof fn === 'function') {
                    componentFrameCache.set(fn, _frame);
                  }
                } // Return the line we found.


                return _frame;
              }
            } while (s >= 1 && c >= 0);
          }

          break;
        }
      }
    }
  } finally {
    reentry = false;

    {
      ReactCurrentDispatcher.current = previousDispatcher;
      reenableLogs();
    }

    Error.prepareStackTrace = previousPrepareStackTrace;
  } // Fallback to just using the name if we couldn't make it throw.


  var name = fn ? fn.displayName || fn.name : '';
  var syntheticFrame = name ? describeBuiltInComponentFrame(name) : '';

  {
    if (typeof fn === 'function') {
      componentFrameCache.set(fn, syntheticFrame);
    }
  }

  return syntheticFrame;
}
function describeFunctionComponentFrame(fn, source, ownerFn) {
  {
    return describeNativeComponentFrame(fn, false);
  }
}

function shouldConstruct(Component) {
  var prototype = Component.prototype;
  return !!(prototype && prototype.isReactComponent);
}

function describeUnknownElementTypeFrameInDEV(type, source, ownerFn) {

  if (type == null) {
    return '';
  }

  if (typeof type === 'function') {
    {
      return describeNativeComponentFrame(type, shouldConstruct(type));
    }
  }

  if (typeof type === 'string') {
    return describeBuiltInComponentFrame(type);
  }

  switch (type) {
    case REACT_SUSPENSE_TYPE:
      return describeBuiltInComponentFrame('Suspense');

    case REACT_SUSPENSE_LIST_TYPE:
      return describeBuiltInComponentFrame('SuspenseList');
  }

  if (typeof type === 'object') {
    switch (type.$$typeof) {
      case REACT_FORWARD_REF_TYPE:
        return describeFunctionComponentFrame(type.render);

      case REACT_MEMO_TYPE:
        // Memo may contain any component type so we recursively resolve it.
        return describeUnknownElementTypeFrameInDEV(type.type, source, ownerFn);

      case REACT_LAZY_TYPE:
        {
          var lazyComponent = type;
          var payload = lazyComponent._payload;
          var init = lazyComponent._init;

          try {
            // Lazy may contain any component type so we recursively resolve it.
            return describeUnknownElementTypeFrameInDEV(init(payload), source, ownerFn);
          } catch (x) {}
        }
    }
  }

  return '';
}

var hasOwnProperty = Object.prototype.hasOwnProperty;

var loggedTypeFailures = {};
var ReactDebugCurrentFrame = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame.setExtraStackFrame(null);
    }
  }
}

function checkPropTypes(typeSpecs, values, location, componentName, element) {
  {
    // $FlowFixMe This is okay but Flow doesn't know it.
    var has = Function.call.bind(hasOwnProperty);

    for (var typeSpecName in typeSpecs) {
      if (has(typeSpecs, typeSpecName)) {
        var error$1 = void 0; // Prop type validation may throw. In case they do, we don't want to
        // fail the render phase where it didn't fail before. So we log it.
        // After these have been cleaned up, we'll let them throw.

        try {
          // This is intentionally an invariant that gets caught. It's the same
          // behavior as without this statement except with a better message.
          if (typeof typeSpecs[typeSpecName] !== 'function') {
            // eslint-disable-next-line react-internal/prod-error-codes
            var err = Error((componentName || 'React class') + ': ' + location + ' type `' + typeSpecName + '` is invalid; ' + 'it must be a function, usually from the `prop-types` package, but received `' + typeof typeSpecs[typeSpecName] + '`.' + 'This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.');
            err.name = 'Invariant Violation';
            throw err;
          }

          error$1 = typeSpecs[typeSpecName](values, typeSpecName, componentName, location, null, 'SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED');
        } catch (ex) {
          error$1 = ex;
        }

        if (error$1 && !(error$1 instanceof Error)) {
          setCurrentlyValidatingElement(element);

          error('%s: type specification of %s' + ' `%s` is invalid; the type checker ' + 'function must return `null` or an `Error` but returned a %s. ' + 'You may have forgotten to pass an argument to the type checker ' + 'creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and ' + 'shape all require an argument).', componentName || 'React class', location, typeSpecName, typeof error$1);

          setCurrentlyValidatingElement(null);
        }

        if (error$1 instanceof Error && !(error$1.message in loggedTypeFailures)) {
          // Only monitor this failure once because there tends to be a lot of the
          // same error.
          loggedTypeFailures[error$1.message] = true;
          setCurrentlyValidatingElement(element);

          error('Failed %s type: %s', location, error$1.message);

          setCurrentlyValidatingElement(null);
        }
      }
    }
  }
}

var isArrayImpl = Array.isArray; // eslint-disable-next-line no-redeclare

function isArray(a) {
  return isArrayImpl(a);
}

/*
 * The `'' + value` pattern (used in in perf-sensitive code) throws for Symbol
 * and Temporal.* types. See https://github.com/facebook/react/pull/22064.
 *
 * The functions in this module will throw an easier-to-understand,
 * easier-to-debug exception with a clear errors message message explaining the
 * problem. (Instead of a confusing exception thrown inside the implementation
 * of the `value` object).
 */
// $FlowFixMe only called in DEV, so void return is not possible.
function typeName(value) {
  {
    // toStringTag is needed for namespaced types like Temporal.Instant
    var hasToStringTag = typeof Symbol === 'function' && Symbol.toStringTag;
    var type = hasToStringTag && value[Symbol.toStringTag] || value.constructor.name || 'Object';
    return type;
  }
} // $FlowFixMe only called in DEV, so void return is not possible.


function willCoercionThrow(value) {
  {
    try {
      testStringCoercion(value);
      return false;
    } catch (e) {
      return true;
    }
  }
}

function testStringCoercion(value) {
  // If you ended up here by following an exception call stack, here's what's
  // happened: you supplied an object or symbol value to React (as a prop, key,
  // DOM attribute, CSS property, string ref, etc.) and when React tried to
  // coerce it to a string using `'' + value`, an exception was thrown.
  //
  // The most common types that will cause this exception are `Symbol` instances
  // and Temporal objects like `Temporal.Instant`. But any object that has a
  // `valueOf` or `[Symbol.toPrimitive]` method that throws will also cause this
  // exception. (Library authors do this to prevent users from using built-in
  // numeric operators like `+` or comparison operators like `>=` because custom
  // methods are needed to perform accurate arithmetic or comparison.)
  //
  // To fix the problem, coerce this object or symbol value to a string before
  // passing it to React. The most reliable way is usually `String(value)`.
  //
  // To find which value is throwing, check the browser or debugger console.
  // Before this exception was thrown, there should be `console.error` output
  // that shows the type (Symbol, Temporal.PlainDate, etc.) that caused the
  // problem and how that type was used: key, atrribute, input value prop, etc.
  // In most cases, this console output also shows the component and its
  // ancestor components where the exception happened.
  //
  // eslint-disable-next-line react-internal/safe-string-coercion
  return '' + value;
}
function checkKeyStringCoercion(value) {
  {
    if (willCoercionThrow(value)) {
      error('The provided key is an unsupported type %s.' + ' This value must be coerced to a string before before using it here.', typeName(value));

      return testStringCoercion(value); // throw (to help callers find troubleshooting comments)
    }
  }
}

var ReactCurrentOwner = ReactSharedInternals.ReactCurrentOwner;
var RESERVED_PROPS = {
  key: true,
  ref: true,
  __self: true,
  __source: true
};
var specialPropKeyWarningShown;
var specialPropRefWarningShown;
var didWarnAboutStringRefs;

{
  didWarnAboutStringRefs = {};
}

function hasValidRef(config) {
  {
    if (hasOwnProperty.call(config, 'ref')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'ref').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.ref !== undefined;
}

function hasValidKey(config) {
  {
    if (hasOwnProperty.call(config, 'key')) {
      var getter = Object.getOwnPropertyDescriptor(config, 'key').get;

      if (getter && getter.isReactWarning) {
        return false;
      }
    }
  }

  return config.key !== undefined;
}

function warnIfStringRefCannotBeAutoConverted(config, self) {
  {
    if (typeof config.ref === 'string' && ReactCurrentOwner.current && self && ReactCurrentOwner.current.stateNode !== self) {
      var componentName = getComponentNameFromType(ReactCurrentOwner.current.type);

      if (!didWarnAboutStringRefs[componentName]) {
        error('Component "%s" contains the string ref "%s". ' + 'Support for string refs will be removed in a future major release. ' + 'This case cannot be automatically converted to an arrow function. ' + 'We ask you to manually fix this case by using useRef() or createRef() instead. ' + 'Learn more about using refs safely here: ' + 'https://reactjs.org/link/strict-mode-string-ref', getComponentNameFromType(ReactCurrentOwner.current.type), config.ref);

        didWarnAboutStringRefs[componentName] = true;
      }
    }
  }
}

function defineKeyPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingKey = function () {
      if (!specialPropKeyWarningShown) {
        specialPropKeyWarningShown = true;

        error('%s: `key` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingKey.isReactWarning = true;
    Object.defineProperty(props, 'key', {
      get: warnAboutAccessingKey,
      configurable: true
    });
  }
}

function defineRefPropWarningGetter(props, displayName) {
  {
    var warnAboutAccessingRef = function () {
      if (!specialPropRefWarningShown) {
        specialPropRefWarningShown = true;

        error('%s: `ref` is not a prop. Trying to access it will result ' + 'in `undefined` being returned. If you need to access the same ' + 'value within the child component, you should pass it as a different ' + 'prop. (https://reactjs.org/link/special-props)', displayName);
      }
    };

    warnAboutAccessingRef.isReactWarning = true;
    Object.defineProperty(props, 'ref', {
      get: warnAboutAccessingRef,
      configurable: true
    });
  }
}
/**
 * Factory method to create a new React element. This no longer adheres to
 * the class pattern, so do not use new to call it. Also, instanceof check
 * will not work. Instead test $$typeof field against Symbol.for('react.element') to check
 * if something is a React Element.
 *
 * @param {*} type
 * @param {*} props
 * @param {*} key
 * @param {string|object} ref
 * @param {*} owner
 * @param {*} self A *temporary* helper to detect places where `this` is
 * different from the `owner` when React.createElement is called, so that we
 * can warn. We want to get rid of owner and replace string `ref`s with arrow
 * functions, and as long as `this` and owner are the same, there will be no
 * change in behavior.
 * @param {*} source An annotation object (added by a transpiler or otherwise)
 * indicating filename, line number, and/or other information.
 * @internal
 */


var ReactElement = function (type, key, ref, self, source, owner, props) {
  var element = {
    // This tag allows us to uniquely identify this as a React Element
    $$typeof: REACT_ELEMENT_TYPE,
    // Built-in properties that belong on the element
    type: type,
    key: key,
    ref: ref,
    props: props,
    // Record the component responsible for creating this element.
    _owner: owner
  };

  {
    // The validation flag is currently mutative. We put it on
    // an external backing store so that we can freeze the whole object.
    // This can be replaced with a WeakMap once they are implemented in
    // commonly used development environments.
    element._store = {}; // To make comparing ReactElements easier for testing purposes, we make
    // the validation flag non-enumerable (where possible, which should
    // include every environment we run tests in), so the test framework
    // ignores it.

    Object.defineProperty(element._store, 'validated', {
      configurable: false,
      enumerable: false,
      writable: true,
      value: false
    }); // self and source are DEV only properties.

    Object.defineProperty(element, '_self', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: self
    }); // Two elements created in two different places should be considered
    // equal for testing purposes and therefore we hide it from enumeration.

    Object.defineProperty(element, '_source', {
      configurable: false,
      enumerable: false,
      writable: false,
      value: source
    });

    if (Object.freeze) {
      Object.freeze(element.props);
      Object.freeze(element);
    }
  }

  return element;
};
/**
 * https://github.com/reactjs/rfcs/pull/107
 * @param {*} type
 * @param {object} props
 * @param {string} key
 */

function jsxDEV(type, config, maybeKey, source, self) {
  {
    var propName; // Reserved names are extracted

    var props = {};
    var key = null;
    var ref = null; // Currently, key can be spread in as a prop. This causes a potential
    // issue if key is also explicitly declared (ie. <div {...props} key="Hi" />
    // or <div key="Hi" {...props} /> ). We want to deprecate key spread,
    // but as an intermediary step, we will use jsxDEV for everything except
    // <div {...props} key="Hi" />, because we aren't currently able to tell if
    // key is explicitly declared to be undefined or not.

    if (maybeKey !== undefined) {
      {
        checkKeyStringCoercion(maybeKey);
      }

      key = '' + maybeKey;
    }

    if (hasValidKey(config)) {
      {
        checkKeyStringCoercion(config.key);
      }

      key = '' + config.key;
    }

    if (hasValidRef(config)) {
      ref = config.ref;
      warnIfStringRefCannotBeAutoConverted(config, self);
    } // Remaining properties are added to a new props object


    for (propName in config) {
      if (hasOwnProperty.call(config, propName) && !RESERVED_PROPS.hasOwnProperty(propName)) {
        props[propName] = config[propName];
      }
    } // Resolve default props


    if (type && type.defaultProps) {
      var defaultProps = type.defaultProps;

      for (propName in defaultProps) {
        if (props[propName] === undefined) {
          props[propName] = defaultProps[propName];
        }
      }
    }

    if (key || ref) {
      var displayName = typeof type === 'function' ? type.displayName || type.name || 'Unknown' : type;

      if (key) {
        defineKeyPropWarningGetter(props, displayName);
      }

      if (ref) {
        defineRefPropWarningGetter(props, displayName);
      }
    }

    return ReactElement(type, key, ref, self, source, ReactCurrentOwner.current, props);
  }
}

var ReactCurrentOwner$1 = ReactSharedInternals.ReactCurrentOwner;
var ReactDebugCurrentFrame$1 = ReactSharedInternals.ReactDebugCurrentFrame;

function setCurrentlyValidatingElement$1(element) {
  {
    if (element) {
      var owner = element._owner;
      var stack = describeUnknownElementTypeFrameInDEV(element.type, element._source, owner ? owner.type : null);
      ReactDebugCurrentFrame$1.setExtraStackFrame(stack);
    } else {
      ReactDebugCurrentFrame$1.setExtraStackFrame(null);
    }
  }
}

var propTypesMisspellWarningShown;

{
  propTypesMisspellWarningShown = false;
}
/**
 * Verifies the object is a ReactElement.
 * See https://reactjs.org/docs/react-api.html#isvalidelement
 * @param {?object} object
 * @return {boolean} True if `object` is a ReactElement.
 * @final
 */


function isValidElement(object) {
  {
    return typeof object === 'object' && object !== null && object.$$typeof === REACT_ELEMENT_TYPE;
  }
}

function getDeclarationErrorAddendum() {
  {
    if (ReactCurrentOwner$1.current) {
      var name = getComponentNameFromType(ReactCurrentOwner$1.current.type);

      if (name) {
        return '\n\nCheck the render method of `' + name + '`.';
      }
    }

    return '';
  }
}

function getSourceInfoErrorAddendum(source) {
  {
    if (source !== undefined) {
      var fileName = source.fileName.replace(/^.*[\\\/]/, '');
      var lineNumber = source.lineNumber;
      return '\n\nCheck your code at ' + fileName + ':' + lineNumber + '.';
    }

    return '';
  }
}
/**
 * Warn if there's no key explicitly set on dynamic arrays of children or
 * object keys are not valid. This allows us to keep track of children between
 * updates.
 */


var ownerHasKeyUseWarning = {};

function getCurrentComponentErrorInfo(parentType) {
  {
    var info = getDeclarationErrorAddendum();

    if (!info) {
      var parentName = typeof parentType === 'string' ? parentType : parentType.displayName || parentType.name;

      if (parentName) {
        info = "\n\nCheck the top-level render call using <" + parentName + ">.";
      }
    }

    return info;
  }
}
/**
 * Warn if the element doesn't have an explicit key assigned to it.
 * This element is in an array. The array could grow and shrink or be
 * reordered. All children that haven't already been validated are required to
 * have a "key" property assigned to it. Error statuses are cached so a warning
 * will only be shown once.
 *
 * @internal
 * @param {ReactElement} element Element that requires a key.
 * @param {*} parentType element's parent's type.
 */


function validateExplicitKey(element, parentType) {
  {
    if (!element._store || element._store.validated || element.key != null) {
      return;
    }

    element._store.validated = true;
    var currentComponentErrorInfo = getCurrentComponentErrorInfo(parentType);

    if (ownerHasKeyUseWarning[currentComponentErrorInfo]) {
      return;
    }

    ownerHasKeyUseWarning[currentComponentErrorInfo] = true; // Usually the current owner is the offender, but if it accepts children as a
    // property, it may be the creator of the child that's responsible for
    // assigning it a key.

    var childOwner = '';

    if (element && element._owner && element._owner !== ReactCurrentOwner$1.current) {
      // Give the component that originally created this child.
      childOwner = " It was passed a child from " + getComponentNameFromType(element._owner.type) + ".";
    }

    setCurrentlyValidatingElement$1(element);

    error('Each child in a list should have a unique "key" prop.' + '%s%s See https://reactjs.org/link/warning-keys for more information.', currentComponentErrorInfo, childOwner);

    setCurrentlyValidatingElement$1(null);
  }
}
/**
 * Ensure that every element either is passed in a static location, in an
 * array with an explicit keys property defined, or in an object literal
 * with valid key property.
 *
 * @internal
 * @param {ReactNode} node Statically passed child of any type.
 * @param {*} parentType node's parent's type.
 */


function validateChildKeys(node, parentType) {
  {
    if (typeof node !== 'object') {
      return;
    }

    if (isArray(node)) {
      for (var i = 0; i < node.length; i++) {
        var child = node[i];

        if (isValidElement(child)) {
          validateExplicitKey(child, parentType);
        }
      }
    } else if (isValidElement(node)) {
      // This element was passed in a valid location.
      if (node._store) {
        node._store.validated = true;
      }
    } else if (node) {
      var iteratorFn = getIteratorFn(node);

      if (typeof iteratorFn === 'function') {
        // Entry iterators used to provide implicit keys,
        // but now we print a separate warning for them later.
        if (iteratorFn !== node.entries) {
          var iterator = iteratorFn.call(node);
          var step;

          while (!(step = iterator.next()).done) {
            if (isValidElement(step.value)) {
              validateExplicitKey(step.value, parentType);
            }
          }
        }
      }
    }
  }
}
/**
 * Given an element, validate that its props follow the propTypes definition,
 * provided by the type.
 *
 * @param {ReactElement} element
 */


function validatePropTypes(element) {
  {
    var type = element.type;

    if (type === null || type === undefined || typeof type === 'string') {
      return;
    }

    var propTypes;

    if (typeof type === 'function') {
      propTypes = type.propTypes;
    } else if (typeof type === 'object' && (type.$$typeof === REACT_FORWARD_REF_TYPE || // Note: Memo only checks outer props here.
    // Inner props are checked in the reconciler.
    type.$$typeof === REACT_MEMO_TYPE)) {
      propTypes = type.propTypes;
    } else {
      return;
    }

    if (propTypes) {
      // Intentionally inside to avoid triggering lazy initializers:
      var name = getComponentNameFromType(type);
      checkPropTypes(propTypes, element.props, 'prop', name, element);
    } else if (type.PropTypes !== undefined && !propTypesMisspellWarningShown) {
      propTypesMisspellWarningShown = true; // Intentionally inside to avoid triggering lazy initializers:

      var _name = getComponentNameFromType(type);

      error('Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?', _name || 'Unknown');
    }

    if (typeof type.getDefaultProps === 'function' && !type.getDefaultProps.isReactClassApproved) {
      error('getDefaultProps is only used on classic React.createClass ' + 'definitions. Use a static property named `defaultProps` instead.');
    }
  }
}
/**
 * Given a fragment, validate that it can only be provided with fragment props
 * @param {ReactElement} fragment
 */


function validateFragmentProps(fragment) {
  {
    var keys = Object.keys(fragment.props);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];

      if (key !== 'children' && key !== 'key') {
        setCurrentlyValidatingElement$1(fragment);

        error('Invalid prop `%s` supplied to `React.Fragment`. ' + 'React.Fragment can only have `key` and `children` props.', key);

        setCurrentlyValidatingElement$1(null);
        break;
      }
    }

    if (fragment.ref !== null) {
      setCurrentlyValidatingElement$1(fragment);

      error('Invalid attribute `ref` supplied to `React.Fragment`.');

      setCurrentlyValidatingElement$1(null);
    }
  }
}

var didWarnAboutKeySpread = {};
function jsxWithValidation(type, props, key, isStaticChildren, source, self) {
  {
    var validType = isValidElementType(type); // We warn in this case but don't throw. We expect the element creation to
    // succeed and there will likely be errors in render.

    if (!validType) {
      var info = '';

      if (type === undefined || typeof type === 'object' && type !== null && Object.keys(type).length === 0) {
        info += ' You likely forgot to export your component from the file ' + "it's defined in, or you might have mixed up default and named imports.";
      }

      var sourceInfo = getSourceInfoErrorAddendum(source);

      if (sourceInfo) {
        info += sourceInfo;
      } else {
        info += getDeclarationErrorAddendum();
      }

      var typeString;

      if (type === null) {
        typeString = 'null';
      } else if (isArray(type)) {
        typeString = 'array';
      } else if (type !== undefined && type.$$typeof === REACT_ELEMENT_TYPE) {
        typeString = "<" + (getComponentNameFromType(type.type) || 'Unknown') + " />";
        info = ' Did you accidentally export a JSX literal instead of a component?';
      } else {
        typeString = typeof type;
      }

      error('React.jsx: type is invalid -- expected a string (for ' + 'built-in components) or a class/function (for composite ' + 'components) but got: %s.%s', typeString, info);
    }

    var element = jsxDEV(type, props, key, source, self); // The result can be nullish if a mock or a custom function is used.
    // TODO: Drop this when these are no longer allowed as the type argument.

    if (element == null) {
      return element;
    } // Skip key warning if the type isn't valid since our key validation logic
    // doesn't expect a non-string/function type and can throw confusing errors.
    // We don't want exception behavior to differ between dev and prod.
    // (Rendering will throw with a helpful message and as soon as the type is
    // fixed, the key warnings will appear.)


    if (validType) {
      var children = props.children;

      if (children !== undefined) {
        if (isStaticChildren) {
          if (isArray(children)) {
            for (var i = 0; i < children.length; i++) {
              validateChildKeys(children[i], type);
            }

            if (Object.freeze) {
              Object.freeze(children);
            }
          } else {
            error('React.jsx: Static children should always be an array. ' + 'You are likely explicitly calling React.jsxs or React.jsxDEV. ' + 'Use the Babel transform instead.');
          }
        } else {
          validateChildKeys(children, type);
        }
      }
    }

    {
      if (hasOwnProperty.call(props, 'key')) {
        var componentName = getComponentNameFromType(type);
        var keys = Object.keys(props).filter(function (k) {
          return k !== 'key';
        });
        var beforeExample = keys.length > 0 ? '{key: someKey, ' + keys.join(': ..., ') + ': ...}' : '{key: someKey}';

        if (!didWarnAboutKeySpread[componentName + beforeExample]) {
          var afterExample = keys.length > 0 ? '{' + keys.join(': ..., ') + ': ...}' : '{}';

          error('A props object containing a "key" prop is being spread into JSX:\n' + '  let props = %s;\n' + '  <%s {...props} />\n' + 'React keys must be passed directly to JSX without using spread:\n' + '  let props = %s;\n' + '  <%s key={someKey} {...props} />', beforeExample, componentName, afterExample, componentName);

          didWarnAboutKeySpread[componentName + beforeExample] = true;
        }
      }
    }

    if (type === REACT_FRAGMENT_TYPE) {
      validateFragmentProps(element);
    } else {
      validatePropTypes(element);
    }

    return element;
  }
} // These two functions exist to still get child warnings in dev
// even with the prod transform. This means that jsxDEV is purely
// opt-in behavior for better messages but that we won't stop
// giving you warnings if you use production apis.

function jsxWithValidationStatic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, true);
  }
}
function jsxWithValidationDynamic(type, props, key) {
  {
    return jsxWithValidation(type, props, key, false);
  }
}

var jsx =  jsxWithValidationDynamic ; // we may want to special case jsxs internally to take advantage of static children.
// for now we can ship identical prod functions

var jsxs =  jsxWithValidationStatic ;

exports.Fragment = REACT_FRAGMENT_TYPE;
exports.jsx = jsx;
exports.jsxs = jsxs;
  })();
}


/***/ }),

/***/ "./node_modules/react/jsx-runtime.js":
/*!*******************************************!*\
  !*** ./node_modules/react/jsx-runtime.js ***!
  \*******************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


if (false) {} else {
  module.exports = __webpack_require__(/*! ./cjs/react-jsx-runtime.development.js */ "./node_modules/react/cjs/react-jsx-runtime.development.js");
}


/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "React" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = window["React"];

/***/ }),

/***/ "react-dom":
/*!***************************!*\
  !*** external "ReactDOM" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = window["ReactDOM"];

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/focusManager.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/focusManager.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   FocusManager: () => (/* binding */ FocusManager),
/* harmony export */   focusManager: () => (/* binding */ focusManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/focusManager.ts


var FocusManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #focused;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onFocus) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const listener = () => onFocus();
        window.addEventListener("visibilitychange", listener, false);
        return () => {
          window.removeEventListener("visibilitychange", listener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup((focused) => {
      if (typeof focused === "boolean") {
        this.setFocused(focused);
      } else {
        this.onFocus();
      }
    });
  }
  setFocused(focused) {
    const changed = this.#focused !== focused;
    if (changed) {
      this.#focused = focused;
      this.onFocus();
    }
  }
  onFocus() {
    const isFocused = this.isFocused();
    this.listeners.forEach((listener) => {
      listener(isFocused);
    });
  }
  isFocused() {
    if (typeof this.#focused === "boolean") {
      return this.#focused;
    }
    return globalThis.document?.visibilityState !== "hidden";
  }
};
var focusManager = new FocusManager();

//# sourceMappingURL=focusManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js":
/*!*********************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js ***!
  \*********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   hasNextPage: () => (/* binding */ hasNextPage),
/* harmony export */   hasPreviousPage: () => (/* binding */ hasPreviousPage),
/* harmony export */   infiniteQueryBehavior: () => (/* binding */ infiniteQueryBehavior)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/infiniteQueryBehavior.ts

function infiniteQueryBehavior(pages) {
  return {
    onFetch: (context, query) => {
      const options = context.options;
      const direction = context.fetchOptions?.meta?.fetchMore?.direction;
      const oldPages = context.state.data?.pages || [];
      const oldPageParams = context.state.data?.pageParams || [];
      let result = { pages: [], pageParams: [] };
      let currentPage = 0;
      const fetchFn = async () => {
        let cancelled = false;
        const addSignalProperty = (object) => {
          Object.defineProperty(object, "signal", {
            enumerable: true,
            get: () => {
              if (context.signal.aborted) {
                cancelled = true;
              } else {
                context.signal.addEventListener("abort", () => {
                  cancelled = true;
                });
              }
              return context.signal;
            }
          });
        };
        const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.ensureQueryFn)(context.options, context.fetchOptions);
        const fetchPage = async (data, param, previous) => {
          if (cancelled) {
            return Promise.reject();
          }
          if (param == null && data.pages.length) {
            return Promise.resolve(data);
          }
          const queryFnContext = {
            queryKey: context.queryKey,
            pageParam: param,
            direction: previous ? "backward" : "forward",
            meta: context.options.meta
          };
          addSignalProperty(queryFnContext);
          const page = await queryFn(
            queryFnContext
          );
          const { maxPages } = context.options;
          const addTo = previous ? _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToStart : _utils_js__WEBPACK_IMPORTED_MODULE_0__.addToEnd;
          return {
            pages: addTo(data.pages, page, maxPages),
            pageParams: addTo(data.pageParams, param, maxPages)
          };
        };
        if (direction && oldPages.length) {
          const previous = direction === "backward";
          const pageParamFn = previous ? getPreviousPageParam : getNextPageParam;
          const oldData = {
            pages: oldPages,
            pageParams: oldPageParams
          };
          const param = pageParamFn(options, oldData);
          result = await fetchPage(oldData, param, previous);
        } else {
          const remainingPages = pages ?? oldPages.length;
          do {
            const param = currentPage === 0 ? oldPageParams[0] ?? options.initialPageParam : getNextPageParam(options, result);
            if (currentPage > 0 && param == null) {
              break;
            }
            result = await fetchPage(result, param);
            currentPage++;
          } while (currentPage < remainingPages);
        }
        return result;
      };
      if (context.options.persister) {
        context.fetchFn = () => {
          return context.options.persister?.(
            fetchFn,
            {
              queryKey: context.queryKey,
              meta: context.options.meta,
              signal: context.signal
            },
            query
          );
        };
      } else {
        context.fetchFn = fetchFn;
      }
    }
  };
}
function getNextPageParam(options, { pages, pageParams }) {
  const lastIndex = pages.length - 1;
  return pages.length > 0 ? options.getNextPageParam(
    pages[lastIndex],
    pages,
    pageParams[lastIndex],
    pageParams
  ) : void 0;
}
function getPreviousPageParam(options, { pages, pageParams }) {
  return pages.length > 0 ? options.getPreviousPageParam?.(pages[0], pages, pageParams[0], pageParams) : void 0;
}
function hasNextPage(options, data) {
  if (!data)
    return false;
  return getNextPageParam(options, data) != null;
}
function hasPreviousPage(options, data) {
  if (!data || !options.getPreviousPageParam)
    return false;
  return getPreviousPageParam(options, data) != null;
}

//# sourceMappingURL=infiniteQueryBehavior.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutation.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutation.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Mutation: () => (/* binding */ Mutation),
/* harmony export */   getDefaultState: () => (/* binding */ getDefaultState)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
// src/mutation.ts



var Mutation = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #observers;
  #mutationCache;
  #retryer;
  constructor(config) {
    super();
    this.mutationId = config.mutationId;
    this.#mutationCache = config.mutationCache;
    this.#observers = [];
    this.state = config.state || getDefaultState();
    this.setOptions(config.options);
    this.scheduleGc();
  }
  setOptions(options) {
    this.options = options;
    this.updateGcTime(this.options.gcTime);
  }
  get meta() {
    return this.options.meta;
  }
  addObserver(observer) {
    if (!this.#observers.includes(observer)) {
      this.#observers.push(observer);
      this.clearGcTimeout();
      this.#mutationCache.notify({
        type: "observerAdded",
        mutation: this,
        observer
      });
    }
  }
  removeObserver(observer) {
    this.#observers = this.#observers.filter((x) => x !== observer);
    this.scheduleGc();
    this.#mutationCache.notify({
      type: "observerRemoved",
      mutation: this,
      observer
    });
  }
  optionalRemove() {
    if (!this.#observers.length) {
      if (this.state.status === "pending") {
        this.scheduleGc();
      } else {
        this.#mutationCache.remove(this);
      }
    }
  }
  continue() {
    return this.#retryer?.continue() ?? // continuing a mutation assumes that variables are set, mutation must have been dehydrated before
    this.execute(this.state.variables);
  }
  async execute(variables) {
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_1__.createRetryer)({
      fn: () => {
        if (!this.options.mutationFn) {
          return Promise.reject(new Error("No mutationFn found"));
        }
        return this.options.mutationFn(variables);
      },
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: this.options.retry ?? 0,
      retryDelay: this.options.retryDelay,
      networkMode: this.options.networkMode,
      canRun: () => this.#mutationCache.canRun(this)
    });
    const restored = this.state.status === "pending";
    const isPaused = !this.#retryer.canStart();
    try {
      if (!restored) {
        this.#dispatch({ type: "pending", variables, isPaused });
        await this.#mutationCache.config.onMutate?.(
          variables,
          this
        );
        const context = await this.options.onMutate?.(variables);
        if (context !== this.state.context) {
          this.#dispatch({
            type: "pending",
            context,
            variables,
            isPaused
          });
        }
      }
      const data = await this.#retryer.start();
      await this.#mutationCache.config.onSuccess?.(
        data,
        variables,
        this.state.context,
        this
      );
      await this.options.onSuccess?.(data, variables, this.state.context);
      await this.#mutationCache.config.onSettled?.(
        data,
        null,
        this.state.variables,
        this.state.context,
        this
      );
      await this.options.onSettled?.(data, null, variables, this.state.context);
      this.#dispatch({ type: "success", data });
      return data;
    } catch (error) {
      try {
        await this.#mutationCache.config.onError?.(
          error,
          variables,
          this.state.context,
          this
        );
        await this.options.onError?.(
          error,
          variables,
          this.state.context
        );
        await this.#mutationCache.config.onSettled?.(
          void 0,
          error,
          this.state.variables,
          this.state.context,
          this
        );
        await this.options.onSettled?.(
          void 0,
          error,
          variables,
          this.state.context
        );
        throw error;
      } finally {
        this.#dispatch({ type: "error", error });
      }
    } finally {
      this.#mutationCache.runNext(this);
    }
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            failureCount: action.failureCount,
            failureReason: action.error
          };
        case "pause":
          return {
            ...state,
            isPaused: true
          };
        case "continue":
          return {
            ...state,
            isPaused: false
          };
        case "pending":
          return {
            ...state,
            context: action.context,
            data: void 0,
            failureCount: 0,
            failureReason: null,
            error: null,
            isPaused: action.isPaused,
            status: "pending",
            variables: action.variables,
            submittedAt: Date.now()
          };
        case "success":
          return {
            ...state,
            data: action.data,
            failureCount: 0,
            failureReason: null,
            error: null,
            status: "success",
            isPaused: false
          };
        case "error":
          return {
            ...state,
            data: void 0,
            error: action.error,
            failureCount: state.failureCount + 1,
            failureReason: action.error,
            isPaused: false,
            status: "error"
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.#observers.forEach((observer) => {
        observer.onMutationUpdate(action);
      });
      this.#mutationCache.notify({
        mutation: this,
        type: "updated",
        action
      });
    });
  }
};
function getDefaultState() {
  return {
    context: void 0,
    data: void 0,
    error: null,
    failureCount: 0,
    failureReason: null,
    isPaused: false,
    status: "idle",
    variables: void 0,
    submittedAt: 0
  };
}

//# sourceMappingURL=mutation.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/mutationCache.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   MutationCache: () => (/* binding */ MutationCache)
/* harmony export */ });
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _mutation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutation.js */ "./node_modules/@tanstack/query-core/build/modern/mutation.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/mutationCache.ts




var MutationCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#mutations = /* @__PURE__ */ new Map();
    this.#mutationId = Date.now();
  }
  #mutations;
  #mutationId;
  build(client, options, state) {
    const mutation = new _mutation_js__WEBPACK_IMPORTED_MODULE_1__.Mutation({
      mutationCache: this,
      mutationId: ++this.#mutationId,
      options: client.defaultMutationOptions(options),
      state
    });
    this.add(mutation);
    return mutation;
  }
  add(mutation) {
    const scope = scopeFor(mutation);
    const mutations = this.#mutations.get(scope) ?? [];
    mutations.push(mutation);
    this.#mutations.set(scope, mutations);
    this.notify({ type: "added", mutation });
  }
  remove(mutation) {
    const scope = scopeFor(mutation);
    if (this.#mutations.has(scope)) {
      const mutations = this.#mutations.get(scope)?.filter((x) => x !== mutation);
      if (mutations) {
        if (mutations.length === 0) {
          this.#mutations.delete(scope);
        } else {
          this.#mutations.set(scope, mutations);
        }
      }
    }
    this.notify({ type: "removed", mutation });
  }
  canRun(mutation) {
    const firstPendingMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m.state.status === "pending");
    return !firstPendingMutation || firstPendingMutation === mutation;
  }
  runNext(mutation) {
    const foundMutation = this.#mutations.get(scopeFor(mutation))?.find((m) => m !== mutation && m.state.isPaused);
    return foundMutation?.continue() ?? Promise.resolve();
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.getAll().forEach((mutation) => {
        this.remove(mutation);
      });
    });
  }
  getAll() {
    return [...this.#mutations.values()].flat();
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(defaultedFilters, mutation)
    );
  }
  findAll(filters = {}) {
    return this.getAll().filter((mutation) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.matchMutation)(filters, mutation));
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  resumePausedMutations() {
    const pausedMutations = this.getAll().filter((x) => x.state.isPaused);
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_2__.notifyManager.batch(
      () => Promise.all(
        pausedMutations.map((mutation) => mutation.continue().catch(_utils_js__WEBPACK_IMPORTED_MODULE_3__.noop))
      )
    );
  }
};
function scopeFor(mutation) {
  return mutation.options.scope?.id ?? String(mutation.mutationId);
}

//# sourceMappingURL=mutationCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/notifyManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   createNotifyManager: () => (/* binding */ createNotifyManager),
/* harmony export */   notifyManager: () => (/* binding */ notifyManager)
/* harmony export */ });
// src/notifyManager.ts
function createNotifyManager() {
  let queue = [];
  let transactions = 0;
  let notifyFn = (callback) => {
    callback();
  };
  let batchNotifyFn = (callback) => {
    callback();
  };
  let scheduleFn = (cb) => setTimeout(cb, 0);
  const schedule = (callback) => {
    if (transactions) {
      queue.push(callback);
    } else {
      scheduleFn(() => {
        notifyFn(callback);
      });
    }
  };
  const flush = () => {
    const originalQueue = queue;
    queue = [];
    if (originalQueue.length) {
      scheduleFn(() => {
        batchNotifyFn(() => {
          originalQueue.forEach((callback) => {
            notifyFn(callback);
          });
        });
      });
    }
  };
  return {
    batch: (callback) => {
      let result;
      transactions++;
      try {
        result = callback();
      } finally {
        transactions--;
        if (!transactions) {
          flush();
        }
      }
      return result;
    },
    /**
     * All calls to the wrapped function will be batched.
     */
    batchCalls: (callback) => {
      return (...args) => {
        schedule(() => {
          callback(...args);
        });
      };
    },
    schedule,
    /**
     * Use this method to set a custom notify function.
     * This can be used to for example wrap notifications with `React.act` while running tests.
     */
    setNotifyFunction: (fn) => {
      notifyFn = fn;
    },
    /**
     * Use this method to set a custom function to batch notifications together into a single tick.
     * By default React Query will use the batch function provided by ReactDOM or React Native.
     */
    setBatchNotifyFunction: (fn) => {
      batchNotifyFn = fn;
    },
    setScheduler: (fn) => {
      scheduleFn = fn;
    }
  };
}
var notifyManager = createNotifyManager();

//# sourceMappingURL=notifyManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/onlineManager.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   OnlineManager: () => (/* binding */ OnlineManager),
/* harmony export */   onlineManager: () => (/* binding */ onlineManager)
/* harmony export */ });
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/onlineManager.ts


var OnlineManager = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  #online = true;
  #cleanup;
  #setup;
  constructor() {
    super();
    this.#setup = (onOnline) => {
      if (!_utils_js__WEBPACK_IMPORTED_MODULE_1__.isServer && window.addEventListener) {
        const onlineListener = () => onOnline(true);
        const offlineListener = () => onOnline(false);
        window.addEventListener("online", onlineListener, false);
        window.addEventListener("offline", offlineListener, false);
        return () => {
          window.removeEventListener("online", onlineListener);
          window.removeEventListener("offline", offlineListener);
        };
      }
      return;
    };
  }
  onSubscribe() {
    if (!this.#cleanup) {
      this.setEventListener(this.#setup);
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.#cleanup?.();
      this.#cleanup = void 0;
    }
  }
  setEventListener(setup) {
    this.#setup = setup;
    this.#cleanup?.();
    this.#cleanup = setup(this.setOnline.bind(this));
  }
  setOnline(online) {
    const changed = this.#online !== online;
    if (changed) {
      this.#online = online;
      this.listeners.forEach((listener) => {
        listener(online);
      });
    }
  }
  isOnline() {
    return this.#online;
  }
};
var onlineManager = new OnlineManager();

//# sourceMappingURL=onlineManager.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/query.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/query.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Query: () => (/* binding */ Query),
/* harmony export */   fetchState: () => (/* binding */ fetchState)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _retryer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./retryer.js */ "./node_modules/@tanstack/query-core/build/modern/retryer.js");
/* harmony import */ var _removable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./removable.js */ "./node_modules/@tanstack/query-core/build/modern/removable.js");
// src/query.ts




var Query = class extends _removable_js__WEBPACK_IMPORTED_MODULE_0__.Removable {
  #initialState;
  #revertState;
  #cache;
  #retryer;
  #defaultOptions;
  #abortSignalConsumed;
  constructor(config) {
    super();
    this.#abortSignalConsumed = false;
    this.#defaultOptions = config.defaultOptions;
    this.setOptions(config.options);
    this.observers = [];
    this.#cache = config.cache;
    this.queryKey = config.queryKey;
    this.queryHash = config.queryHash;
    this.#initialState = getDefaultState(this.options);
    this.state = config.state ?? this.#initialState;
    this.scheduleGc();
  }
  get meta() {
    return this.options.meta;
  }
  get promise() {
    return this.#retryer?.promise;
  }
  setOptions(options) {
    this.options = { ...this.#defaultOptions, ...options };
    this.updateGcTime(this.options.gcTime);
  }
  optionalRemove() {
    if (!this.observers.length && this.state.fetchStatus === "idle") {
      this.#cache.remove(this);
    }
  }
  setData(newData, options) {
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.replaceData)(this.state.data, newData, this.options);
    this.#dispatch({
      data,
      type: "success",
      dataUpdatedAt: options?.updatedAt,
      manual: options?.manual
    });
    return data;
  }
  setState(state, setStateOptions) {
    this.#dispatch({ type: "setState", state, setStateOptions });
  }
  cancel(options) {
    const promise = this.#retryer?.promise;
    this.#retryer?.cancel(options);
    return promise ? promise.then(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_1__.noop) : Promise.resolve();
  }
  destroy() {
    super.destroy();
    this.cancel({ silent: true });
  }
  reset() {
    this.destroy();
    this.setState(this.#initialState);
  }
  isActive() {
    return this.observers.some(
      (observer) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.resolveEnabled)(observer.options.enabled, this) !== false
    );
  }
  isDisabled() {
    return this.getObserversCount() > 0 && !this.isActive();
  }
  isStale() {
    if (this.state.isInvalidated) {
      return true;
    }
    if (this.getObserversCount() > 0) {
      return this.observers.some(
        (observer) => observer.getCurrentResult().isStale
      );
    }
    return this.state.data === void 0;
  }
  isStaleByTime(staleTime = 0) {
    return this.state.isInvalidated || this.state.data === void 0 || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.timeUntilStale)(this.state.dataUpdatedAt, staleTime);
  }
  onFocus() {
    const observer = this.observers.find((x) => x.shouldFetchOnWindowFocus());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  onOnline() {
    const observer = this.observers.find((x) => x.shouldFetchOnReconnect());
    observer?.refetch({ cancelRefetch: false });
    this.#retryer?.continue();
  }
  addObserver(observer) {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
      this.clearGcTimeout();
      this.#cache.notify({ type: "observerAdded", query: this, observer });
    }
  }
  removeObserver(observer) {
    if (this.observers.includes(observer)) {
      this.observers = this.observers.filter((x) => x !== observer);
      if (!this.observers.length) {
        if (this.#retryer) {
          if (this.#abortSignalConsumed) {
            this.#retryer.cancel({ revert: true });
          } else {
            this.#retryer.cancelRetry();
          }
        }
        this.scheduleGc();
      }
      this.#cache.notify({ type: "observerRemoved", query: this, observer });
    }
  }
  getObserversCount() {
    return this.observers.length;
  }
  invalidate() {
    if (!this.state.isInvalidated) {
      this.#dispatch({ type: "invalidate" });
    }
  }
  fetch(options, fetchOptions) {
    if (this.state.fetchStatus !== "idle") {
      if (this.state.data !== void 0 && fetchOptions?.cancelRefetch) {
        this.cancel({ silent: true });
      } else if (this.#retryer) {
        this.#retryer.continueRetry();
        return this.#retryer.promise;
      }
    }
    if (options) {
      this.setOptions(options);
    }
    if (!this.options.queryFn) {
      const observer = this.observers.find((x) => x.options.queryFn);
      if (observer) {
        this.setOptions(observer.options);
      }
    }
    if (true) {
      if (!Array.isArray(this.options.queryKey)) {
        console.error(
          `As of v4, queryKey needs to be an Array. If you are using a string like 'repoData', please change it to an Array, e.g. ['repoData']`
        );
      }
    }
    const abortController = new AbortController();
    const addSignalProperty = (object) => {
      Object.defineProperty(object, "signal", {
        enumerable: true,
        get: () => {
          this.#abortSignalConsumed = true;
          return abortController.signal;
        }
      });
    };
    const fetchFn = () => {
      const queryFn = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.ensureQueryFn)(this.options, fetchOptions);
      const queryFnContext = {
        queryKey: this.queryKey,
        meta: this.meta
      };
      addSignalProperty(queryFnContext);
      this.#abortSignalConsumed = false;
      if (this.options.persister) {
        return this.options.persister(
          queryFn,
          queryFnContext,
          this
        );
      }
      return queryFn(queryFnContext);
    };
    const context = {
      fetchOptions,
      options: this.options,
      queryKey: this.queryKey,
      state: this.state,
      fetchFn
    };
    addSignalProperty(context);
    this.options.behavior?.onFetch(
      context,
      this
    );
    this.#revertState = this.state;
    if (this.state.fetchStatus === "idle" || this.state.fetchMeta !== context.fetchOptions?.meta) {
      this.#dispatch({ type: "fetch", meta: context.fetchOptions?.meta });
    }
    const onError = (error) => {
      if (!((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.silent)) {
        this.#dispatch({
          type: "error",
          error
        });
      }
      if (!(0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error)) {
        this.#cache.config.onError?.(
          error,
          this
        );
        this.#cache.config.onSettled?.(
          this.state.data,
          error,
          this
        );
      }
      if (!this.isFetchingOptimistic) {
        this.scheduleGc();
      }
      this.isFetchingOptimistic = false;
    };
    this.#retryer = (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.createRetryer)({
      initialPromise: fetchOptions?.initialPromise,
      fn: context.fetchFn,
      abort: abortController.abort.bind(abortController),
      onSuccess: (data) => {
        if (data === void 0) {
          if (true) {
            console.error(
              `Query data cannot be undefined. Please make sure to return a value other than undefined from your query function. Affected query key: ${this.queryHash}`
            );
          }
          onError(new Error(`${this.queryHash} data is undefined`));
          return;
        }
        try {
          this.setData(data);
        } catch (error) {
          onError(error);
          return;
        }
        this.#cache.config.onSuccess?.(data, this);
        this.#cache.config.onSettled?.(
          data,
          this.state.error,
          this
        );
        if (!this.isFetchingOptimistic) {
          this.scheduleGc();
        }
        this.isFetchingOptimistic = false;
      },
      onError,
      onFail: (failureCount, error) => {
        this.#dispatch({ type: "failed", failureCount, error });
      },
      onPause: () => {
        this.#dispatch({ type: "pause" });
      },
      onContinue: () => {
        this.#dispatch({ type: "continue" });
      },
      retry: context.options.retry,
      retryDelay: context.options.retryDelay,
      networkMode: context.options.networkMode,
      canRun: () => true
    });
    return this.#retryer.start();
  }
  #dispatch(action) {
    const reducer = (state) => {
      switch (action.type) {
        case "failed":
          return {
            ...state,
            fetchFailureCount: action.failureCount,
            fetchFailureReason: action.error
          };
        case "pause":
          return {
            ...state,
            fetchStatus: "paused"
          };
        case "continue":
          return {
            ...state,
            fetchStatus: "fetching"
          };
        case "fetch":
          return {
            ...state,
            ...fetchState(state.data, this.options),
            fetchMeta: action.meta ?? null
          };
        case "success":
          return {
            ...state,
            data: action.data,
            dataUpdateCount: state.dataUpdateCount + 1,
            dataUpdatedAt: action.dataUpdatedAt ?? Date.now(),
            error: null,
            isInvalidated: false,
            status: "success",
            ...!action.manual && {
              fetchStatus: "idle",
              fetchFailureCount: 0,
              fetchFailureReason: null
            }
          };
        case "error":
          const error = action.error;
          if ((0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.isCancelledError)(error) && error.revert && this.#revertState) {
            return { ...this.#revertState, fetchStatus: "idle" };
          }
          return {
            ...state,
            error,
            errorUpdateCount: state.errorUpdateCount + 1,
            errorUpdatedAt: Date.now(),
            fetchFailureCount: state.fetchFailureCount + 1,
            fetchFailureReason: error,
            fetchStatus: "idle",
            status: "error"
          };
        case "invalidate":
          return {
            ...state,
            isInvalidated: true
          };
        case "setState":
          return {
            ...state,
            ...action.state
          };
      }
    };
    this.state = reducer(this.state);
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.observers.forEach((observer) => {
        observer.onQueryUpdate();
      });
      this.#cache.notify({ query: this, type: "updated", action });
    });
  }
};
function fetchState(data, options) {
  return {
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchStatus: (0,_retryer_js__WEBPACK_IMPORTED_MODULE_2__.canFetch)(options.networkMode) ? "fetching" : "paused",
    ...data === void 0 && {
      error: null,
      status: "pending"
    }
  };
}
function getDefaultState(options) {
  const data = typeof options.initialData === "function" ? options.initialData() : options.initialData;
  const hasData = data !== void 0;
  const initialDataUpdatedAt = hasData ? typeof options.initialDataUpdatedAt === "function" ? options.initialDataUpdatedAt() : options.initialDataUpdatedAt : 0;
  return {
    data,
    dataUpdateCount: 0,
    dataUpdatedAt: hasData ? initialDataUpdatedAt ?? Date.now() : 0,
    error: null,
    errorUpdateCount: 0,
    errorUpdatedAt: 0,
    fetchFailureCount: 0,
    fetchFailureReason: null,
    fetchMeta: null,
    isInvalidated: false,
    status: hasData ? "success" : "pending",
    fetchStatus: "idle"
  };
}

//# sourceMappingURL=query.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryCache.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryCache.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryCache: () => (/* binding */ QueryCache)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
// src/queryCache.ts




var QueryCache = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(config = {}) {
    super();
    this.config = config;
    this.#queries = /* @__PURE__ */ new Map();
  }
  #queries;
  build(client, options, state) {
    const queryKey = options.queryKey;
    const queryHash = options.queryHash ?? (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.hashQueryKeyByOptions)(queryKey, options);
    let query = this.get(queryHash);
    if (!query) {
      query = new _query_js__WEBPACK_IMPORTED_MODULE_2__.Query({
        cache: this,
        queryKey,
        queryHash,
        options: client.defaultQueryOptions(options),
        state,
        defaultOptions: client.getQueryDefaults(queryKey)
      });
      this.add(query);
    }
    return query;
  }
  add(query) {
    if (!this.#queries.has(query.queryHash)) {
      this.#queries.set(query.queryHash, query);
      this.notify({
        type: "added",
        query
      });
    }
  }
  remove(query) {
    const queryInMap = this.#queries.get(query.queryHash);
    if (queryInMap) {
      query.destroy();
      if (queryInMap === query) {
        this.#queries.delete(query.queryHash);
      }
      this.notify({ type: "removed", query });
    }
  }
  clear() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        this.remove(query);
      });
    });
  }
  get(queryHash) {
    return this.#queries.get(queryHash);
  }
  getAll() {
    return [...this.#queries.values()];
  }
  find(filters) {
    const defaultedFilters = { exact: true, ...filters };
    return this.getAll().find(
      (query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(defaultedFilters, query)
    );
  }
  findAll(filters = {}) {
    const queries = this.getAll();
    return Object.keys(filters).length > 0 ? queries.filter((query) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.matchQuery)(filters, query)) : queries;
  }
  notify(event) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.listeners.forEach((listener) => {
        listener(event);
      });
    });
  }
  onFocus() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onFocus();
      });
    });
  }
  onOnline() {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_3__.notifyManager.batch(() => {
      this.getAll().forEach((query) => {
        query.onOnline();
      });
    });
  }
};

//# sourceMappingURL=queryCache.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryClient.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryClient.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClient: () => (/* binding */ QueryClient)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _queryCache_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./queryCache.js */ "./node_modules/@tanstack/query-core/build/modern/queryCache.js");
/* harmony import */ var _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mutationCache.js */ "./node_modules/@tanstack/query-core/build/modern/mutationCache.js");
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./infiniteQueryBehavior.js */ "./node_modules/@tanstack/query-core/build/modern/infiniteQueryBehavior.js");
// src/queryClient.ts







var QueryClient = class {
  #queryCache;
  #mutationCache;
  #defaultOptions;
  #queryDefaults;
  #mutationDefaults;
  #mountCount;
  #unsubscribeFocus;
  #unsubscribeOnline;
  constructor(config = {}) {
    this.#queryCache = config.queryCache || new _queryCache_js__WEBPACK_IMPORTED_MODULE_0__.QueryCache();
    this.#mutationCache = config.mutationCache || new _mutationCache_js__WEBPACK_IMPORTED_MODULE_1__.MutationCache();
    this.#defaultOptions = config.defaultOptions || {};
    this.#queryDefaults = /* @__PURE__ */ new Map();
    this.#mutationDefaults = /* @__PURE__ */ new Map();
    this.#mountCount = 0;
  }
  mount() {
    this.#mountCount++;
    if (this.#mountCount !== 1)
      return;
    this.#unsubscribeFocus = _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.subscribe(async (focused) => {
      if (focused) {
        await this.resumePausedMutations();
        this.#queryCache.onFocus();
      }
    });
    this.#unsubscribeOnline = _onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.subscribe(async (online) => {
      if (online) {
        await this.resumePausedMutations();
        this.#queryCache.onOnline();
      }
    });
  }
  unmount() {
    this.#mountCount--;
    if (this.#mountCount !== 0)
      return;
    this.#unsubscribeFocus?.();
    this.#unsubscribeFocus = void 0;
    this.#unsubscribeOnline?.();
    this.#unsubscribeOnline = void 0;
  }
  isFetching(filters) {
    return this.#queryCache.findAll({ ...filters, fetchStatus: "fetching" }).length;
  }
  isMutating(filters) {
    return this.#mutationCache.findAll({ ...filters, status: "pending" }).length;
  }
  getQueryData(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state.data;
  }
  ensureQueryData(options) {
    const cachedData = this.getQueryData(options.queryKey);
    if (cachedData === void 0)
      return this.fetchQuery(options);
    else {
      const defaultedOptions = this.defaultQueryOptions(options);
      const query = this.#queryCache.build(this, defaultedOptions);
      if (options.revalidateIfStale && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query))) {
        void this.prefetchQuery(defaultedOptions);
      }
      return Promise.resolve(cachedData);
    }
  }
  getQueriesData(filters) {
    return this.#queryCache.findAll(filters).map(({ queryKey, state }) => {
      const data = state.data;
      return [queryKey, data];
    });
  }
  setQueryData(queryKey, updater, options) {
    const defaultedOptions = this.defaultQueryOptions({ queryKey });
    const query = this.#queryCache.get(
      defaultedOptions.queryHash
    );
    const prevData = query?.state.data;
    const data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.functionalUpdate)(updater, prevData);
    if (data === void 0) {
      return void 0;
    }
    return this.#queryCache.build(this, defaultedOptions).setData(data, { ...options, manual: true });
  }
  setQueriesData(filters, updater, options) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map(({ queryKey }) => [
        queryKey,
        this.setQueryData(queryKey, updater, options)
      ])
    );
  }
  getQueryState(queryKey) {
    const options = this.defaultQueryOptions({ queryKey });
    return this.#queryCache.get(options.queryHash)?.state;
  }
  removeQueries(filters) {
    const queryCache = this.#queryCache;
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        queryCache.remove(query);
      });
    });
  }
  resetQueries(filters, options) {
    const queryCache = this.#queryCache;
    const refetchFilters = {
      type: "active",
      ...filters
    };
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      queryCache.findAll(filters).forEach((query) => {
        query.reset();
      });
      return this.refetchQueries(refetchFilters, options);
    });
  }
  cancelQueries(filters = {}, cancelOptions = {}) {
    const defaultedCancelOptions = { revert: true, ...cancelOptions };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).map((query) => query.cancel(defaultedCancelOptions))
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  invalidateQueries(filters = {}, options = {}) {
    return _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      this.#queryCache.findAll(filters).forEach((query) => {
        query.invalidate();
      });
      if (filters.refetchType === "none") {
        return Promise.resolve();
      }
      const refetchFilters = {
        ...filters,
        type: filters.refetchType ?? filters.type ?? "active"
      };
      return this.refetchQueries(refetchFilters, options);
    });
  }
  refetchQueries(filters = {}, options) {
    const fetchOptions = {
      ...options,
      cancelRefetch: options?.cancelRefetch ?? true
    };
    const promises = _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(
      () => this.#queryCache.findAll(filters).filter((query) => !query.isDisabled()).map((query) => {
        let promise = query.fetch(void 0, fetchOptions);
        if (!fetchOptions.throwOnError) {
          promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
        }
        return query.state.fetchStatus === "paused" ? Promise.resolve() : promise;
      })
    );
    return Promise.all(promises).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchQuery(options) {
    const defaultedOptions = this.defaultQueryOptions(options);
    if (defaultedOptions.retry === void 0) {
      defaultedOptions.retry = false;
    }
    const query = this.#queryCache.build(this, defaultedOptions);
    return query.isStaleByTime(
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.resolveStaleTime)(defaultedOptions.staleTime, query)
    ) ? query.fetch(defaultedOptions) : Promise.resolve(query.state.data);
  }
  prefetchQuery(options) {
    return this.fetchQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  fetchInfiniteQuery(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.fetchQuery(options);
  }
  prefetchInfiniteQuery(options) {
    return this.fetchInfiniteQuery(options).then(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop).catch(_utils_js__WEBPACK_IMPORTED_MODULE_4__.noop);
  }
  ensureInfiniteQueryData(options) {
    options.behavior = (0,_infiniteQueryBehavior_js__WEBPACK_IMPORTED_MODULE_6__.infiniteQueryBehavior)(options.pages);
    return this.ensureQueryData(options);
  }
  resumePausedMutations() {
    if (_onlineManager_js__WEBPACK_IMPORTED_MODULE_3__.onlineManager.isOnline()) {
      return this.#mutationCache.resumePausedMutations();
    }
    return Promise.resolve();
  }
  getQueryCache() {
    return this.#queryCache;
  }
  getMutationCache() {
    return this.#mutationCache;
  }
  getDefaultOptions() {
    return this.#defaultOptions;
  }
  setDefaultOptions(options) {
    this.#defaultOptions = options;
  }
  setQueryDefaults(queryKey, options) {
    this.#queryDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(queryKey), {
      queryKey,
      defaultOptions: options
    });
  }
  getQueryDefaults(queryKey) {
    const defaults = [...this.#queryDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(queryKey, queryDefault.queryKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  setMutationDefaults(mutationKey, options) {
    this.#mutationDefaults.set((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashKey)(mutationKey), {
      mutationKey,
      defaultOptions: options
    });
  }
  getMutationDefaults(mutationKey) {
    const defaults = [...this.#mutationDefaults.values()];
    let result = {};
    defaults.forEach((queryDefault) => {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.partialMatchKey)(mutationKey, queryDefault.mutationKey)) {
        result = { ...result, ...queryDefault.defaultOptions };
      }
    });
    return result;
  }
  defaultQueryOptions(options) {
    if (options._defaulted) {
      return options;
    }
    const defaultedOptions = {
      ...this.#defaultOptions.queries,
      ...this.getQueryDefaults(options.queryKey),
      ...options,
      _defaulted: true
    };
    if (!defaultedOptions.queryHash) {
      defaultedOptions.queryHash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_4__.hashQueryKeyByOptions)(
        defaultedOptions.queryKey,
        defaultedOptions
      );
    }
    if (defaultedOptions.refetchOnReconnect === void 0) {
      defaultedOptions.refetchOnReconnect = defaultedOptions.networkMode !== "always";
    }
    if (defaultedOptions.throwOnError === void 0) {
      defaultedOptions.throwOnError = !!defaultedOptions.suspense;
    }
    if (!defaultedOptions.networkMode && defaultedOptions.persister) {
      defaultedOptions.networkMode = "offlineFirst";
    }
    if (defaultedOptions.enabled !== true && defaultedOptions.queryFn === _utils_js__WEBPACK_IMPORTED_MODULE_4__.skipToken) {
      defaultedOptions.enabled = false;
    }
    return defaultedOptions;
  }
  defaultMutationOptions(options) {
    if (options?._defaulted) {
      return options;
    }
    return {
      ...this.#defaultOptions.mutations,
      ...options?.mutationKey && this.getMutationDefaults(options.mutationKey),
      ...options,
      _defaulted: true
    };
  }
  clear() {
    this.#queryCache.clear();
    this.#mutationCache.clear();
  }
};

//# sourceMappingURL=queryClient.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/queryObserver.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/queryObserver.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryObserver: () => (/* binding */ QueryObserver)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./notifyManager.js */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _query_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./query.js */ "./node_modules/@tanstack/query-core/build/modern/query.js");
/* harmony import */ var _subscribable_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./subscribable.js */ "./node_modules/@tanstack/query-core/build/modern/subscribable.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/queryObserver.ts






var QueryObserver = class extends _subscribable_js__WEBPACK_IMPORTED_MODULE_0__.Subscribable {
  constructor(client, options) {
    super();
    this.options = options;
    this.#client = client;
    this.#selectError = null;
    this.#currentThenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
    if (!this.options.experimental_prefetchInRender) {
      this.#currentThenable.reject(
        new Error("experimental_prefetchInRender feature flag is not enabled")
      );
    }
    this.bindMethods();
    this.setOptions(options);
  }
  #client;
  #currentQuery = void 0;
  #currentQueryInitialState = void 0;
  #currentResult = void 0;
  #currentResultState;
  #currentResultOptions;
  #currentThenable;
  #selectError;
  #selectFn;
  #selectResult;
  // This property keeps track of the last query with defined data.
  // It will be used to pass the previous data and query to the placeholder function between renders.
  #lastQueryWithDefinedData;
  #staleTimeoutId;
  #refetchIntervalId;
  #currentRefetchInterval;
  #trackedProps = /* @__PURE__ */ new Set();
  bindMethods() {
    this.refetch = this.refetch.bind(this);
  }
  onSubscribe() {
    if (this.listeners.size === 1) {
      this.#currentQuery.addObserver(this);
      if (shouldFetchOnMount(this.#currentQuery, this.options)) {
        this.#executeFetch();
      } else {
        this.updateResult();
      }
      this.#updateTimers();
    }
  }
  onUnsubscribe() {
    if (!this.hasListeners()) {
      this.destroy();
    }
  }
  shouldFetchOnReconnect() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnReconnect
    );
  }
  shouldFetchOnWindowFocus() {
    return shouldFetchOn(
      this.#currentQuery,
      this.options,
      this.options.refetchOnWindowFocus
    );
  }
  destroy() {
    this.listeners = /* @__PURE__ */ new Set();
    this.#clearStaleTimeout();
    this.#clearRefetchInterval();
    this.#currentQuery.removeObserver(this);
  }
  setOptions(options, notifyOptions) {
    const prevOptions = this.options;
    const prevQuery = this.#currentQuery;
    this.options = this.#client.defaultQueryOptions(options);
    if (this.options.enabled !== void 0 && typeof this.options.enabled !== "boolean" && typeof this.options.enabled !== "function" && typeof (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== "boolean") {
      throw new Error(
        "Expected enabled to be a boolean or a callback that returns a boolean"
      );
    }
    this.#updateQuery();
    this.#currentQuery.setOptions(this.options);
    if (prevOptions._defaulted && !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(this.options, prevOptions)) {
      this.#client.getQueryCache().notify({
        type: "observerOptionsUpdated",
        query: this.#currentQuery,
        observer: this
      });
    }
    const mounted = this.hasListeners();
    if (mounted && shouldFetchOptionally(
      this.#currentQuery,
      prevQuery,
      this.options,
      prevOptions
    )) {
      this.#executeFetch();
    }
    this.updateResult(notifyOptions);
    if (mounted && (this.#currentQuery !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, this.#currentQuery) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(this.options.staleTime, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(prevOptions.staleTime, this.#currentQuery))) {
      this.#updateStaleTimeout();
    }
    const nextRefetchInterval = this.#computeRefetchInterval();
    if (mounted && (this.#currentQuery !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, this.#currentQuery) || nextRefetchInterval !== this.#currentRefetchInterval)) {
      this.#updateRefetchInterval(nextRefetchInterval);
    }
  }
  getOptimisticResult(options) {
    const query = this.#client.getQueryCache().build(this.#client, options);
    const result = this.createResult(query, options);
    if (shouldAssignObserverCurrentProperties(this, result)) {
      this.#currentResult = result;
      this.#currentResultOptions = this.options;
      this.#currentResultState = this.#currentQuery.state;
    }
    return result;
  }
  getCurrentResult() {
    return this.#currentResult;
  }
  trackResult(result, onPropTracked) {
    const trackedResult = {};
    Object.keys(result).forEach((key) => {
      Object.defineProperty(trackedResult, key, {
        configurable: false,
        enumerable: true,
        get: () => {
          this.trackProp(key);
          onPropTracked?.(key);
          return result[key];
        }
      });
    });
    return trackedResult;
  }
  trackProp(key) {
    this.#trackedProps.add(key);
  }
  getCurrentQuery() {
    return this.#currentQuery;
  }
  refetch({ ...options } = {}) {
    return this.fetch({
      ...options
    });
  }
  fetchOptimistic(options) {
    const defaultedOptions = this.#client.defaultQueryOptions(options);
    const query = this.#client.getQueryCache().build(this.#client, defaultedOptions);
    query.isFetchingOptimistic = true;
    return query.fetch().then(() => this.createResult(query, defaultedOptions));
  }
  fetch(fetchOptions) {
    return this.#executeFetch({
      ...fetchOptions,
      cancelRefetch: fetchOptions.cancelRefetch ?? true
    }).then(() => {
      this.updateResult();
      return this.#currentResult;
    });
  }
  #executeFetch(fetchOptions) {
    this.#updateQuery();
    let promise = this.#currentQuery.fetch(
      this.options,
      fetchOptions
    );
    if (!fetchOptions?.throwOnError) {
      promise = promise.catch(_utils_js__WEBPACK_IMPORTED_MODULE_2__.noop);
    }
    return promise;
  }
  #updateStaleTimeout() {
    this.#clearStaleTimeout();
    const staleTime = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(
      this.options.staleTime,
      this.#currentQuery
    );
    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__.isServer || this.#currentResult.isStale || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(staleTime)) {
      return;
    }
    const time = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.timeUntilStale)(this.#currentResult.dataUpdatedAt, staleTime);
    const timeout = time + 1;
    this.#staleTimeoutId = setTimeout(() => {
      if (!this.#currentResult.isStale) {
        this.updateResult();
      }
    }, timeout);
  }
  #computeRefetchInterval() {
    return (typeof this.options.refetchInterval === "function" ? this.options.refetchInterval(this.#currentQuery) : this.options.refetchInterval) ?? false;
  }
  #updateRefetchInterval(nextInterval) {
    this.#clearRefetchInterval();
    this.#currentRefetchInterval = nextInterval;
    if (_utils_js__WEBPACK_IMPORTED_MODULE_2__.isServer || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(this.options.enabled, this.#currentQuery) === false || !(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.isValidTimeout)(this.#currentRefetchInterval) || this.#currentRefetchInterval === 0) {
      return;
    }
    this.#refetchIntervalId = setInterval(() => {
      if (this.options.refetchIntervalInBackground || _focusManager_js__WEBPACK_IMPORTED_MODULE_3__.focusManager.isFocused()) {
        this.#executeFetch();
      }
    }, this.#currentRefetchInterval);
  }
  #updateTimers() {
    this.#updateStaleTimeout();
    this.#updateRefetchInterval(this.#computeRefetchInterval());
  }
  #clearStaleTimeout() {
    if (this.#staleTimeoutId) {
      clearTimeout(this.#staleTimeoutId);
      this.#staleTimeoutId = void 0;
    }
  }
  #clearRefetchInterval() {
    if (this.#refetchIntervalId) {
      clearInterval(this.#refetchIntervalId);
      this.#refetchIntervalId = void 0;
    }
  }
  createResult(query, options) {
    const prevQuery = this.#currentQuery;
    const prevOptions = this.options;
    const prevResult = this.#currentResult;
    const prevResultState = this.#currentResultState;
    const prevResultOptions = this.#currentResultOptions;
    const queryChange = query !== prevQuery;
    const queryInitialState = queryChange ? query.state : this.#currentQueryInitialState;
    const { state } = query;
    let newState = { ...state };
    let isPlaceholderData = false;
    let data;
    if (options._optimisticResults) {
      const mounted = this.hasListeners();
      const fetchOnMount = !mounted && shouldFetchOnMount(query, options);
      const fetchOptionally = mounted && shouldFetchOptionally(query, prevQuery, options, prevOptions);
      if (fetchOnMount || fetchOptionally) {
        newState = {
          ...newState,
          ...(0,_query_js__WEBPACK_IMPORTED_MODULE_4__.fetchState)(state.data, query.options)
        };
      }
      if (options._optimisticResults === "isRestoring") {
        newState.fetchStatus = "idle";
      }
    }
    let { error, errorUpdatedAt, status } = newState;
    if (options.select && newState.data !== void 0) {
      if (prevResult && newState.data === prevResultState?.data && options.select === this.#selectFn) {
        data = this.#selectResult;
      } else {
        try {
          this.#selectFn = options.select;
          data = options.select(newState.data);
          data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.replaceData)(prevResult?.data, data, options);
          this.#selectResult = data;
          this.#selectError = null;
        } catch (selectError) {
          this.#selectError = selectError;
        }
      }
    } else {
      data = newState.data;
    }
    if (options.placeholderData !== void 0 && data === void 0 && status === "pending") {
      let placeholderData;
      if (prevResult?.isPlaceholderData && options.placeholderData === prevResultOptions?.placeholderData) {
        placeholderData = prevResult.data;
      } else {
        placeholderData = typeof options.placeholderData === "function" ? options.placeholderData(
          this.#lastQueryWithDefinedData?.state.data,
          this.#lastQueryWithDefinedData
        ) : options.placeholderData;
        if (options.select && placeholderData !== void 0) {
          try {
            placeholderData = options.select(placeholderData);
            this.#selectError = null;
          } catch (selectError) {
            this.#selectError = selectError;
          }
        }
      }
      if (placeholderData !== void 0) {
        status = "success";
        data = (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.replaceData)(
          prevResult?.data,
          placeholderData,
          options
        );
        isPlaceholderData = true;
      }
    }
    if (this.#selectError) {
      error = this.#selectError;
      data = this.#selectResult;
      errorUpdatedAt = Date.now();
      status = "error";
    }
    const isFetching = newState.fetchStatus === "fetching";
    const isPending = status === "pending";
    const isError = status === "error";
    const isLoading = isPending && isFetching;
    const hasData = data !== void 0;
    const result = {
      status,
      fetchStatus: newState.fetchStatus,
      isPending,
      isSuccess: status === "success",
      isError,
      isInitialLoading: isLoading,
      isLoading,
      data,
      dataUpdatedAt: newState.dataUpdatedAt,
      error,
      errorUpdatedAt,
      failureCount: newState.fetchFailureCount,
      failureReason: newState.fetchFailureReason,
      errorUpdateCount: newState.errorUpdateCount,
      isFetched: newState.dataUpdateCount > 0 || newState.errorUpdateCount > 0,
      isFetchedAfterMount: newState.dataUpdateCount > queryInitialState.dataUpdateCount || newState.errorUpdateCount > queryInitialState.errorUpdateCount,
      isFetching,
      isRefetching: isFetching && !isPending,
      isLoadingError: isError && !hasData,
      isPaused: newState.fetchStatus === "paused",
      isPlaceholderData,
      isRefetchError: isError && hasData,
      isStale: isStale(query, options),
      refetch: this.refetch,
      promise: this.#currentThenable
    };
    return result;
  }
  updateResult(notifyOptions) {
    const prevResult = this.#currentResult;
    const nextResult = this.createResult(this.#currentQuery, this.options);
    this.#currentResultState = this.#currentQuery.state;
    this.#currentResultOptions = this.options;
    if (this.#currentResultState.data !== void 0) {
      this.#lastQueryWithDefinedData = this.#currentQuery;
    }
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(nextResult, prevResult)) {
      return;
    }
    if (this.options.experimental_prefetchInRender) {
      const finalizeThenableIfPossible = (thenable) => {
        if (nextResult.status === "error") {
          thenable.reject(nextResult.error);
        } else if (nextResult.data !== void 0) {
          thenable.resolve(nextResult.data);
        }
      };
      const recreateThenable = () => {
        const pending = this.#currentThenable = nextResult.promise = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
        finalizeThenableIfPossible(pending);
      };
      const prevThenable = this.#currentThenable;
      switch (prevThenable.status) {
        case "pending":
          finalizeThenableIfPossible(prevThenable);
          break;
        case "fulfilled":
          if (nextResult.status === "error" || nextResult.data !== prevThenable.value) {
            recreateThenable();
          }
          break;
        case "rejected":
          if (nextResult.status !== "error" || nextResult.error !== prevThenable.reason) {
            recreateThenable();
          }
          break;
      }
    }
    this.#currentResult = nextResult;
    const defaultNotifyOptions = {};
    const shouldNotifyListeners = () => {
      if (!prevResult) {
        return true;
      }
      const { notifyOnChangeProps } = this.options;
      const notifyOnChangePropsValue = typeof notifyOnChangeProps === "function" ? notifyOnChangeProps() : notifyOnChangeProps;
      if (notifyOnChangePropsValue === "all" || !notifyOnChangePropsValue && !this.#trackedProps.size) {
        return true;
      }
      const includedProps = new Set(
        notifyOnChangePropsValue ?? this.#trackedProps
      );
      if (this.options.throwOnError) {
        includedProps.add("error");
      }
      return Object.keys(this.#currentResult).some((key) => {
        const typedKey = key;
        const changed = this.#currentResult[typedKey] !== prevResult[typedKey];
        return changed && includedProps.has(typedKey);
      });
    };
    if (notifyOptions?.listeners !== false && shouldNotifyListeners()) {
      defaultNotifyOptions.listeners = true;
    }
    this.#notify({ ...defaultNotifyOptions, ...notifyOptions });
  }
  #updateQuery() {
    const query = this.#client.getQueryCache().build(this.#client, this.options);
    if (query === this.#currentQuery) {
      return;
    }
    const prevQuery = this.#currentQuery;
    this.#currentQuery = query;
    this.#currentQueryInitialState = query.state;
    if (this.hasListeners()) {
      prevQuery?.removeObserver(this);
      query.addObserver(this);
    }
  }
  onQueryUpdate() {
    this.updateResult();
    if (this.hasListeners()) {
      this.#updateTimers();
    }
  }
  #notify(notifyOptions) {
    _notifyManager_js__WEBPACK_IMPORTED_MODULE_5__.notifyManager.batch(() => {
      if (notifyOptions.listeners) {
        this.listeners.forEach((listener) => {
          listener(this.#currentResult);
        });
      }
      this.#client.getQueryCache().notify({
        query: this.#currentQuery,
        type: "observerResultsUpdated"
      });
    });
  }
};
function shouldLoadOnMount(query, options) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false && query.state.data === void 0 && !(query.state.status === "error" && options.retryOnMount === false);
}
function shouldFetchOnMount(query, options) {
  return shouldLoadOnMount(query, options) || query.state.data !== void 0 && shouldFetchOn(query, options, options.refetchOnMount);
}
function shouldFetchOn(query, options, field) {
  if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false) {
    const value = typeof field === "function" ? field(query) : field;
    return value === "always" || value !== false && isStale(query, options);
  }
  return false;
}
function shouldFetchOptionally(query, prevQuery, options, prevOptions) {
  return (query !== prevQuery || (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(prevOptions.enabled, query) === false) && (!options.suspense || query.state.status !== "error") && isStale(query, options);
}
function isStale(query, options) {
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveEnabled)(options.enabled, query) !== false && query.isStaleByTime((0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.resolveStaleTime)(options.staleTime, query));
}
function shouldAssignObserverCurrentProperties(observer, optimisticResult) {
  if (!(0,_utils_js__WEBPACK_IMPORTED_MODULE_2__.shallowEqualObjects)(observer.getCurrentResult(), optimisticResult)) {
    return true;
  }
  return false;
}

//# sourceMappingURL=queryObserver.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/removable.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/removable.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Removable: () => (/* binding */ Removable)
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/removable.ts

var Removable = class {
  #gcTimeout;
  destroy() {
    this.clearGcTimeout();
  }
  scheduleGc() {
    this.clearGcTimeout();
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.isValidTimeout)(this.gcTime)) {
      this.#gcTimeout = setTimeout(() => {
        this.optionalRemove();
      }, this.gcTime);
    }
  }
  updateGcTime(newGcTime) {
    this.gcTime = Math.max(
      this.gcTime || 0,
      newGcTime ?? (_utils_js__WEBPACK_IMPORTED_MODULE_0__.isServer ? Infinity : 5 * 60 * 1e3)
    );
  }
  clearGcTimeout() {
    if (this.#gcTimeout) {
      clearTimeout(this.#gcTimeout);
      this.#gcTimeout = void 0;
    }
  }
};

//# sourceMappingURL=removable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/retryer.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/retryer.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CancelledError: () => (/* binding */ CancelledError),
/* harmony export */   canFetch: () => (/* binding */ canFetch),
/* harmony export */   createRetryer: () => (/* binding */ createRetryer),
/* harmony export */   isCancelledError: () => (/* binding */ isCancelledError)
/* harmony export */ });
/* harmony import */ var _focusManager_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./focusManager.js */ "./node_modules/@tanstack/query-core/build/modern/focusManager.js");
/* harmony import */ var _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./onlineManager.js */ "./node_modules/@tanstack/query-core/build/modern/onlineManager.js");
/* harmony import */ var _thenable_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./thenable.js */ "./node_modules/@tanstack/query-core/build/modern/thenable.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
// src/retryer.ts




function defaultRetryDelay(failureCount) {
  return Math.min(1e3 * 2 ** failureCount, 3e4);
}
function canFetch(networkMode) {
  return (networkMode ?? "online") === "online" ? _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline() : true;
}
var CancelledError = class extends Error {
  constructor(options) {
    super("CancelledError");
    this.revert = options?.revert;
    this.silent = options?.silent;
  }
};
function isCancelledError(value) {
  return value instanceof CancelledError;
}
function createRetryer(config) {
  let isRetryCancelled = false;
  let failureCount = 0;
  let isResolved = false;
  let continueFn;
  const thenable = (0,_thenable_js__WEBPACK_IMPORTED_MODULE_1__.pendingThenable)();
  const cancel = (cancelOptions) => {
    if (!isResolved) {
      reject(new CancelledError(cancelOptions));
      config.abort?.();
    }
  };
  const cancelRetry = () => {
    isRetryCancelled = true;
  };
  const continueRetry = () => {
    isRetryCancelled = false;
  };
  const canContinue = () => _focusManager_js__WEBPACK_IMPORTED_MODULE_2__.focusManager.isFocused() && (config.networkMode === "always" || _onlineManager_js__WEBPACK_IMPORTED_MODULE_0__.onlineManager.isOnline()) && config.canRun();
  const canStart = () => canFetch(config.networkMode) && config.canRun();
  const resolve = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onSuccess?.(value);
      continueFn?.();
      thenable.resolve(value);
    }
  };
  const reject = (value) => {
    if (!isResolved) {
      isResolved = true;
      config.onError?.(value);
      continueFn?.();
      thenable.reject(value);
    }
  };
  const pause = () => {
    return new Promise((continueResolve) => {
      continueFn = (value) => {
        if (isResolved || canContinue()) {
          continueResolve(value);
        }
      };
      config.onPause?.();
    }).then(() => {
      continueFn = void 0;
      if (!isResolved) {
        config.onContinue?.();
      }
    });
  };
  const run = () => {
    if (isResolved) {
      return;
    }
    let promiseOrValue;
    const initialPromise = failureCount === 0 ? config.initialPromise : void 0;
    try {
      promiseOrValue = initialPromise ?? config.fn();
    } catch (error) {
      promiseOrValue = Promise.reject(error);
    }
    Promise.resolve(promiseOrValue).then(resolve).catch((error) => {
      if (isResolved) {
        return;
      }
      const retry = config.retry ?? (_utils_js__WEBPACK_IMPORTED_MODULE_3__.isServer ? 0 : 3);
      const retryDelay = config.retryDelay ?? defaultRetryDelay;
      const delay = typeof retryDelay === "function" ? retryDelay(failureCount, error) : retryDelay;
      const shouldRetry = retry === true || typeof retry === "number" && failureCount < retry || typeof retry === "function" && retry(failureCount, error);
      if (isRetryCancelled || !shouldRetry) {
        reject(error);
        return;
      }
      failureCount++;
      config.onFail?.(failureCount, error);
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_3__.sleep)(delay).then(() => {
        return canContinue() ? void 0 : pause();
      }).then(() => {
        if (isRetryCancelled) {
          reject(error);
        } else {
          run();
        }
      });
    });
  };
  return {
    promise: thenable,
    cancel,
    continue: () => {
      continueFn?.();
      return thenable;
    },
    cancelRetry,
    continueRetry,
    canStart,
    start: () => {
      if (canStart()) {
        run();
      } else {
        pause().then(run);
      }
      return thenable;
    }
  };
}

//# sourceMappingURL=retryer.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/subscribable.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/subscribable.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Subscribable: () => (/* binding */ Subscribable)
/* harmony export */ });
// src/subscribable.ts
var Subscribable = class {
  constructor() {
    this.listeners = /* @__PURE__ */ new Set();
    this.subscribe = this.subscribe.bind(this);
  }
  subscribe(listener) {
    this.listeners.add(listener);
    this.onSubscribe();
    return () => {
      this.listeners.delete(listener);
      this.onUnsubscribe();
    };
  }
  hasListeners() {
    return this.listeners.size > 0;
  }
  onSubscribe() {
  }
  onUnsubscribe() {
  }
};

//# sourceMappingURL=subscribable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/thenable.js":
/*!********************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/thenable.js ***!
  \********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   pendingThenable: () => (/* binding */ pendingThenable)
/* harmony export */ });
// src/thenable.ts
function pendingThenable() {
  let resolve;
  let reject;
  const thenable = new Promise((_resolve, _reject) => {
    resolve = _resolve;
    reject = _reject;
  });
  thenable.status = "pending";
  thenable.catch(() => {
  });
  function finalize(data) {
    Object.assign(thenable, data);
    delete thenable.resolve;
    delete thenable.reject;
  }
  thenable.resolve = (value) => {
    finalize({
      status: "fulfilled",
      value
    });
    resolve(value);
  };
  thenable.reject = (reason) => {
    finalize({
      status: "rejected",
      reason
    });
    reject(reason);
  };
  return thenable;
}

//# sourceMappingURL=thenable.js.map

/***/ }),

/***/ "./node_modules/@tanstack/query-core/build/modern/utils.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@tanstack/query-core/build/modern/utils.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   addToEnd: () => (/* binding */ addToEnd),
/* harmony export */   addToStart: () => (/* binding */ addToStart),
/* harmony export */   ensureQueryFn: () => (/* binding */ ensureQueryFn),
/* harmony export */   functionalUpdate: () => (/* binding */ functionalUpdate),
/* harmony export */   hashKey: () => (/* binding */ hashKey),
/* harmony export */   hashQueryKeyByOptions: () => (/* binding */ hashQueryKeyByOptions),
/* harmony export */   isPlainArray: () => (/* binding */ isPlainArray),
/* harmony export */   isPlainObject: () => (/* binding */ isPlainObject),
/* harmony export */   isServer: () => (/* binding */ isServer),
/* harmony export */   isValidTimeout: () => (/* binding */ isValidTimeout),
/* harmony export */   keepPreviousData: () => (/* binding */ keepPreviousData),
/* harmony export */   matchMutation: () => (/* binding */ matchMutation),
/* harmony export */   matchQuery: () => (/* binding */ matchQuery),
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   partialMatchKey: () => (/* binding */ partialMatchKey),
/* harmony export */   replaceData: () => (/* binding */ replaceData),
/* harmony export */   replaceEqualDeep: () => (/* binding */ replaceEqualDeep),
/* harmony export */   resolveEnabled: () => (/* binding */ resolveEnabled),
/* harmony export */   resolveStaleTime: () => (/* binding */ resolveStaleTime),
/* harmony export */   shallowEqualObjects: () => (/* binding */ shallowEqualObjects),
/* harmony export */   skipToken: () => (/* binding */ skipToken),
/* harmony export */   sleep: () => (/* binding */ sleep),
/* harmony export */   timeUntilStale: () => (/* binding */ timeUntilStale)
/* harmony export */ });
// src/utils.ts
var isServer = typeof window === "undefined" || "Deno" in globalThis;
function noop() {
  return void 0;
}
function functionalUpdate(updater, input) {
  return typeof updater === "function" ? updater(input) : updater;
}
function isValidTimeout(value) {
  return typeof value === "number" && value >= 0 && value !== Infinity;
}
function timeUntilStale(updatedAt, staleTime) {
  return Math.max(updatedAt + (staleTime || 0) - Date.now(), 0);
}
function resolveStaleTime(staleTime, query) {
  return typeof staleTime === "function" ? staleTime(query) : staleTime;
}
function resolveEnabled(enabled, query) {
  return typeof enabled === "function" ? enabled(query) : enabled;
}
function matchQuery(filters, query) {
  const {
    type = "all",
    exact,
    fetchStatus,
    predicate,
    queryKey,
    stale
  } = filters;
  if (queryKey) {
    if (exact) {
      if (query.queryHash !== hashQueryKeyByOptions(queryKey, query.options)) {
        return false;
      }
    } else if (!partialMatchKey(query.queryKey, queryKey)) {
      return false;
    }
  }
  if (type !== "all") {
    const isActive = query.isActive();
    if (type === "active" && !isActive) {
      return false;
    }
    if (type === "inactive" && isActive) {
      return false;
    }
  }
  if (typeof stale === "boolean" && query.isStale() !== stale) {
    return false;
  }
  if (fetchStatus && fetchStatus !== query.state.fetchStatus) {
    return false;
  }
  if (predicate && !predicate(query)) {
    return false;
  }
  return true;
}
function matchMutation(filters, mutation) {
  const { exact, status, predicate, mutationKey } = filters;
  if (mutationKey) {
    if (!mutation.options.mutationKey) {
      return false;
    }
    if (exact) {
      if (hashKey(mutation.options.mutationKey) !== hashKey(mutationKey)) {
        return false;
      }
    } else if (!partialMatchKey(mutation.options.mutationKey, mutationKey)) {
      return false;
    }
  }
  if (status && mutation.state.status !== status) {
    return false;
  }
  if (predicate && !predicate(mutation)) {
    return false;
  }
  return true;
}
function hashQueryKeyByOptions(queryKey, options) {
  const hashFn = options?.queryKeyHashFn || hashKey;
  return hashFn(queryKey);
}
function hashKey(queryKey) {
  return JSON.stringify(
    queryKey,
    (_, val) => isPlainObject(val) ? Object.keys(val).sort().reduce((result, key) => {
      result[key] = val[key];
      return result;
    }, {}) : val
  );
}
function partialMatchKey(a, b) {
  if (a === b) {
    return true;
  }
  if (typeof a !== typeof b) {
    return false;
  }
  if (a && b && typeof a === "object" && typeof b === "object") {
    return !Object.keys(b).some((key) => !partialMatchKey(a[key], b[key]));
  }
  return false;
}
function replaceEqualDeep(a, b) {
  if (a === b) {
    return a;
  }
  const array = isPlainArray(a) && isPlainArray(b);
  if (array || isPlainObject(a) && isPlainObject(b)) {
    const aItems = array ? a : Object.keys(a);
    const aSize = aItems.length;
    const bItems = array ? b : Object.keys(b);
    const bSize = bItems.length;
    const copy = array ? [] : {};
    let equalItems = 0;
    for (let i = 0; i < bSize; i++) {
      const key = array ? i : bItems[i];
      if ((!array && aItems.includes(key) || array) && a[key] === void 0 && b[key] === void 0) {
        copy[key] = void 0;
        equalItems++;
      } else {
        copy[key] = replaceEqualDeep(a[key], b[key]);
        if (copy[key] === a[key] && a[key] !== void 0) {
          equalItems++;
        }
      }
    }
    return aSize === bSize && equalItems === aSize ? a : copy;
  }
  return b;
}
function shallowEqualObjects(a, b) {
  if (!b || Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (a[key] !== b[key]) {
      return false;
    }
  }
  return true;
}
function isPlainArray(value) {
  return Array.isArray(value) && value.length === Object.keys(value).length;
}
function isPlainObject(o) {
  if (!hasObjectPrototype(o)) {
    return false;
  }
  const ctor = o.constructor;
  if (ctor === void 0) {
    return true;
  }
  const prot = ctor.prototype;
  if (!hasObjectPrototype(prot)) {
    return false;
  }
  if (!prot.hasOwnProperty("isPrototypeOf")) {
    return false;
  }
  if (Object.getPrototypeOf(o) !== Object.prototype) {
    return false;
  }
  return true;
}
function hasObjectPrototype(o) {
  return Object.prototype.toString.call(o) === "[object Object]";
}
function sleep(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}
function replaceData(prevData, data, options) {
  if (typeof options.structuralSharing === "function") {
    return options.structuralSharing(prevData, data);
  } else if (options.structuralSharing !== false) {
    if (true) {
      try {
        return replaceEqualDeep(prevData, data);
      } catch (error) {
        console.error(
          `Structural sharing requires data to be JSON serializable. To fix this, turn off structuralSharing or return JSON-serializable data from your queryFn. [${options.queryHash}]: ${error}`
        );
      }
    }
    return replaceEqualDeep(prevData, data);
  }
  return data;
}
function keepPreviousData(previousData) {
  return previousData;
}
function addToEnd(items, item, max = 0) {
  const newItems = [...items, item];
  return max && newItems.length > max ? newItems.slice(1) : newItems;
}
function addToStart(items, item, max = 0) {
  const newItems = [item, ...items];
  return max && newItems.length > max ? newItems.slice(0, -1) : newItems;
}
var skipToken = Symbol();
function ensureQueryFn(options, fetchOptions) {
  if (true) {
    if (options.queryFn === skipToken) {
      console.error(
        `Attempted to invoke queryFn when set to skipToken. This is likely a configuration error. Query hash: '${options.queryHash}'`
      );
    }
  }
  if (!options.queryFn && fetchOptions?.initialPromise) {
    return () => fetchOptions.initialPromise;
  }
  if (!options.queryFn || options.queryFn === skipToken) {
    return () => Promise.reject(new Error(`Missing queryFn: '${options.queryHash}'`));
  }
  return options.queryFn;
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryClientContext: () => (/* binding */ QueryClientContext),
/* harmony export */   QueryClientProvider: () => (/* binding */ QueryClientProvider),
/* harmony export */   useQueryClient: () => (/* binding */ useQueryClient)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/QueryClientProvider.tsx


var QueryClientContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(
  void 0
);
var useQueryClient = (queryClient) => {
  const client = react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryClientContext);
  if (queryClient) {
    return queryClient;
  }
  if (!client) {
    throw new Error("No QueryClient set, use QueryClientProvider to set one");
  }
  return client;
};
var QueryClientProvider = ({
  client,
  children
}) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    client.mount();
    return () => {
      client.unmount();
    };
  }, [client]);
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryClientContext.Provider, { value: client, children });
};

//# sourceMappingURL=QueryClientProvider.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js":
/*!************************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js ***!
  \************************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   QueryErrorResetBoundary: () => (/* binding */ QueryErrorResetBoundary),
/* harmony export */   useQueryErrorResetBoundary: () => (/* binding */ useQueryErrorResetBoundary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "./node_modules/react/jsx-runtime.js");
"use client";

// src/QueryErrorResetBoundary.tsx


function createValue() {
  let isReset = false;
  return {
    clearReset: () => {
      isReset = false;
    },
    reset: () => {
      isReset = true;
    },
    isReset: () => {
      return isReset;
    }
  };
}
var QueryErrorResetBoundaryContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(createValue());
var useQueryErrorResetBoundary = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(QueryErrorResetBoundaryContext);
var QueryErrorResetBoundary = ({
  children
}) => {
  const [value] = react__WEBPACK_IMPORTED_MODULE_0__.useState(() => createValue());
  return /* @__PURE__ */ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(QueryErrorResetBoundaryContext.Provider, { value, children: typeof children === "function" ? children(value) : children });
};

//# sourceMappingURL=QueryErrorResetBoundary.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js":
/*!*******************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js ***!
  \*******************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ensurePreventErrorBoundaryRetry: () => (/* binding */ ensurePreventErrorBoundaryRetry),
/* harmony export */   getHasError: () => (/* binding */ getHasError),
/* harmony export */   useClearResetErrorBoundary: () => (/* binding */ useClearResetErrorBoundary)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-query/build/modern/utils.js");
"use client";

// src/errorBoundaryUtils.ts


var ensurePreventErrorBoundaryRetry = (options, errorResetBoundary) => {
  if (options.suspense || options.throwOnError) {
    if (!errorResetBoundary.isReset()) {
      options.retryOnMount = false;
    }
  }
};
var useClearResetErrorBoundary = (errorResetBoundary) => {
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    errorResetBoundary.clearReset();
  }, [errorResetBoundary]);
};
var getHasError = ({
  result,
  errorResetBoundary,
  throwOnError,
  query
}) => {
  return result.isError && !errorResetBoundary.isReset() && !result.isFetching && query && (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.shouldThrowError)(throwOnError, [result.error, query]);
};

//# sourceMappingURL=errorBoundaryUtils.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/isRestoring.js":
/*!************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/isRestoring.js ***!
  \************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   IsRestoringProvider: () => (/* binding */ IsRestoringProvider),
/* harmony export */   useIsRestoring: () => (/* binding */ useIsRestoring)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
"use client";

// src/isRestoring.ts

var IsRestoringContext = react__WEBPACK_IMPORTED_MODULE_0__.createContext(false);
var useIsRestoring = () => react__WEBPACK_IMPORTED_MODULE_0__.useContext(IsRestoringContext);
var IsRestoringProvider = IsRestoringContext.Provider;

//# sourceMappingURL=isRestoring.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/suspense.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/suspense.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   defaultThrowOnError: () => (/* binding */ defaultThrowOnError),
/* harmony export */   ensureSuspenseTimers: () => (/* binding */ ensureSuspenseTimers),
/* harmony export */   fetchOptimistic: () => (/* binding */ fetchOptimistic),
/* harmony export */   shouldSuspend: () => (/* binding */ shouldSuspend),
/* harmony export */   willFetch: () => (/* binding */ willFetch)
/* harmony export */ });
// src/suspense.ts
var defaultThrowOnError = (_error, query) => query.state.data === void 0;
var ensureSuspenseTimers = (defaultedOptions) => {
  if (defaultedOptions.suspense) {
    if (typeof defaultedOptions.staleTime !== "number") {
      defaultedOptions.staleTime = 1e3;
    }
    if (typeof defaultedOptions.gcTime === "number") {
      defaultedOptions.gcTime = Math.max(defaultedOptions.gcTime, 1e3);
    }
  }
};
var willFetch = (result, isRestoring) => result.isLoading && result.isFetching && !isRestoring;
var shouldSuspend = (defaultedOptions, result) => defaultedOptions?.suspense && result.isPending;
var fetchOptimistic = (defaultedOptions, observer, errorResetBoundary) => observer.fetchOptimistic(defaultedOptions).catch(() => {
  errorResetBoundary.clearReset();
});

//# sourceMappingURL=suspense.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useBaseQuery: () => (/* binding */ useBaseQuery)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/notifyManager.js");
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/utils.js");
/* harmony import */ var _QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./QueryClientProvider.js */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var _QueryErrorResetBoundary_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./QueryErrorResetBoundary.js */ "./node_modules/@tanstack/react-query/build/modern/QueryErrorResetBoundary.js");
/* harmony import */ var _errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./errorBoundaryUtils.js */ "./node_modules/@tanstack/react-query/build/modern/errorBoundaryUtils.js");
/* harmony import */ var _isRestoring_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isRestoring.js */ "./node_modules/@tanstack/react-query/build/modern/isRestoring.js");
/* harmony import */ var _suspense_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./suspense.js */ "./node_modules/@tanstack/react-query/build/modern/suspense.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./utils.js */ "./node_modules/@tanstack/react-query/build/modern/utils.js");
"use client";

// src/useBaseQuery.ts








function useBaseQuery(options, Observer, queryClient) {
  if (true) {
    if (typeof options !== "object" || Array.isArray(options)) {
      throw new Error(
        'Bad argument type. Starting with v5, only the "Object" form is allowed when calling query related functions. Please use the error stack to find the culprit call. More info here: https://tanstack.com/query/latest/docs/react/guides/migrating-to-v5#supports-a-single-signature-one-object'
      );
    }
  }
  const client = (0,_QueryClientProvider_js__WEBPACK_IMPORTED_MODULE_1__.useQueryClient)(queryClient);
  const isRestoring = (0,_isRestoring_js__WEBPACK_IMPORTED_MODULE_2__.useIsRestoring)();
  const errorResetBoundary = (0,_QueryErrorResetBoundary_js__WEBPACK_IMPORTED_MODULE_3__.useQueryErrorResetBoundary)();
  const defaultedOptions = client.defaultQueryOptions(options);
  client.getDefaultOptions().queries?._experimental_beforeQuery?.(
    defaultedOptions
  );
  defaultedOptions._optimisticResults = isRestoring ? "isRestoring" : "optimistic";
  (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.ensureSuspenseTimers)(defaultedOptions);
  (0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.ensurePreventErrorBoundaryRetry)(defaultedOptions, errorResetBoundary);
  (0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.useClearResetErrorBoundary)(errorResetBoundary);
  const isNewCacheEntry = !client.getQueryState(options.queryKey);
  const [observer] = react__WEBPACK_IMPORTED_MODULE_0__.useState(
    () => new Observer(
      client,
      defaultedOptions
    )
  );
  const result = observer.getOptimisticResult(defaultedOptions);
  react__WEBPACK_IMPORTED_MODULE_0__.useSyncExternalStore(
    react__WEBPACK_IMPORTED_MODULE_0__.useCallback(
      (onStoreChange) => {
        const unsubscribe = isRestoring ? () => void 0 : observer.subscribe(_tanstack_query_core__WEBPACK_IMPORTED_MODULE_6__.notifyManager.batchCalls(onStoreChange));
        observer.updateResult();
        return unsubscribe;
      },
      [observer, isRestoring]
    ),
    () => observer.getCurrentResult(),
    () => observer.getCurrentResult()
  );
  react__WEBPACK_IMPORTED_MODULE_0__.useEffect(() => {
    observer.setOptions(defaultedOptions, { listeners: false });
  }, [defaultedOptions, observer]);
  if ((0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.shouldSuspend)(defaultedOptions, result)) {
    throw (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(defaultedOptions, observer, errorResetBoundary);
  }
  if ((0,_errorBoundaryUtils_js__WEBPACK_IMPORTED_MODULE_5__.getHasError)({
    result,
    errorResetBoundary,
    throwOnError: defaultedOptions.throwOnError,
    query: client.getQueryCache().get(defaultedOptions.queryHash)
  })) {
    throw result.error;
  }
  ;
  client.getDefaultOptions().queries?._experimental_afterQuery?.(
    defaultedOptions,
    result
  );
  if (defaultedOptions.experimental_prefetchInRender && !_tanstack_query_core__WEBPACK_IMPORTED_MODULE_7__.isServer && (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.willFetch)(result, isRestoring)) {
    const promise = isNewCacheEntry ? (
      // Fetch immediately on render in order to ensure `.promise` is resolved even if the component is unmounted
      (0,_suspense_js__WEBPACK_IMPORTED_MODULE_4__.fetchOptimistic)(defaultedOptions, observer, errorResetBoundary)
    ) : (
      // subscribe to the "cache promise" so that we can finalize the currentThenable once data comes in
      client.getQueryCache().get(defaultedOptions.queryHash)?.promise
    );
    promise?.catch(_utils_js__WEBPACK_IMPORTED_MODULE_8__.noop).finally(() => {
      if (!observer.hasListeners()) {
        observer.updateResult();
      }
    });
  }
  return !defaultedOptions.notifyOnChangeProps ? observer.trackResult(result) : result;
}

//# sourceMappingURL=useBaseQuery.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/useQuery.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/useQuery.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   useQuery: () => (/* binding */ useQuery)
/* harmony export */ });
/* harmony import */ var _tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @tanstack/query-core */ "./node_modules/@tanstack/query-core/build/modern/queryObserver.js");
/* harmony import */ var _useBaseQuery_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./useBaseQuery.js */ "./node_modules/@tanstack/react-query/build/modern/useBaseQuery.js");
"use client";

// src/useQuery.ts


function useQuery(options, queryClient) {
  return (0,_useBaseQuery_js__WEBPACK_IMPORTED_MODULE_0__.useBaseQuery)(options, _tanstack_query_core__WEBPACK_IMPORTED_MODULE_1__.QueryObserver, queryClient);
}

//# sourceMappingURL=useQuery.js.map

/***/ }),

/***/ "./node_modules/@tanstack/react-query/build/modern/utils.js":
/*!******************************************************************!*\
  !*** ./node_modules/@tanstack/react-query/build/modern/utils.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   noop: () => (/* binding */ noop),
/* harmony export */   shouldThrowError: () => (/* binding */ shouldThrowError)
/* harmony export */ });
// src/utils.ts
function shouldThrowError(throwError, params) {
  if (typeof throwError === "function") {
    return throwError(...params);
  }
  return !!throwError;
}
function noop() {
}

//# sourceMappingURL=utils.js.map

/***/ }),

/***/ "./node_modules/d3-array/src/fsum.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-array/src/fsum.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Adder: () => (/* binding */ Adder),
/* harmony export */   fcumsum: () => (/* binding */ fcumsum),
/* harmony export */   fsum: () => (/* binding */ fsum)
/* harmony export */ });
// https://github.com/python/cpython/blob/a74eea238f5baba15797e2e8b570d153bc8690a7/Modules/mathmodule.c#L1423
class Adder {
  constructor() {
    this._partials = new Float64Array(32);
    this._n = 0;
  }
  add(x) {
    const p = this._partials;
    let i = 0;
    for (let j = 0; j < this._n && j < 32; j++) {
      const y = p[j],
        hi = x + y,
        lo = Math.abs(x) < Math.abs(y) ? x - (hi - y) : y - (hi - x);
      if (lo) p[i++] = lo;
      x = hi;
    }
    p[i] = x;
    this._n = i + 1;
    return this;
  }
  valueOf() {
    const p = this._partials;
    let n = this._n, x, y, lo, hi = 0;
    if (n > 0) {
      hi = p[--n];
      while (n > 0) {
        x = hi;
        y = p[--n];
        hi = x + y;
        lo = y - (hi - x);
        if (lo) break;
      }
      if (n > 0 && ((lo < 0 && p[n - 1] < 0) || (lo > 0 && p[n - 1] > 0))) {
        y = lo * 2;
        x = hi + y;
        if (y == x - hi) hi = x;
      }
    }
    return hi;
  }
}

function fsum(values, valueof) {
  const adder = new Adder();
  if (valueof === undefined) {
    for (let value of values) {
      if (value = +value) {
        adder.add(value);
      }
    }
  } else {
    let index = -1;
    for (let value of values) {
      if (value = +valueof(value, ++index, values)) {
        adder.add(value);
      }
    }
  }
  return +adder;
}

function fcumsum(values, valueof) {
  const adder = new Adder();
  let index = -1;
  return Float64Array.from(values, valueof === undefined
      ? v => adder.add(+v || 0)
      : v => adder.add(+valueof(v, ++index, values) || 0)
  );
}


/***/ }),

/***/ "./node_modules/d3-array/src/merge.js":
/*!********************************************!*\
  !*** ./node_modules/d3-array/src/merge.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ merge)
/* harmony export */ });
function* flatten(arrays) {
  for (const array of arrays) {
    yield* array;
  }
}

function merge(arrays) {
  return Array.from(flatten(arrays));
}


/***/ }),

/***/ "./node_modules/d3-color/src/color.js":
/*!********************************************!*\
  !*** ./node_modules/d3-color/src/color.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Color: () => (/* binding */ Color),
/* harmony export */   Rgb: () => (/* binding */ Rgb),
/* harmony export */   brighter: () => (/* binding */ brighter),
/* harmony export */   darker: () => (/* binding */ darker),
/* harmony export */   "default": () => (/* binding */ color),
/* harmony export */   hsl: () => (/* binding */ hsl),
/* harmony export */   hslConvert: () => (/* binding */ hslConvert),
/* harmony export */   rgb: () => (/* binding */ rgb),
/* harmony export */   rgbConvert: () => (/* binding */ rgbConvert)
/* harmony export */ });
/* harmony import */ var _define_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./define.js */ "./node_modules/d3-color/src/define.js");


function Color() {}

var darker = 0.7;
var brighter = 1 / darker;

var reI = "\\s*([+-]?\\d+)\\s*",
    reN = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*",
    reP = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*",
    reHex = /^#([0-9a-f]{3,8})$/,
    reRgbInteger = new RegExp(`^rgb\\(${reI},${reI},${reI}\\)$`),
    reRgbPercent = new RegExp(`^rgb\\(${reP},${reP},${reP}\\)$`),
    reRgbaInteger = new RegExp(`^rgba\\(${reI},${reI},${reI},${reN}\\)$`),
    reRgbaPercent = new RegExp(`^rgba\\(${reP},${reP},${reP},${reN}\\)$`),
    reHslPercent = new RegExp(`^hsl\\(${reN},${reP},${reP}\\)$`),
    reHslaPercent = new RegExp(`^hsla\\(${reN},${reP},${reP},${reN}\\)$`);

var named = {
  aliceblue: 0xf0f8ff,
  antiquewhite: 0xfaebd7,
  aqua: 0x00ffff,
  aquamarine: 0x7fffd4,
  azure: 0xf0ffff,
  beige: 0xf5f5dc,
  bisque: 0xffe4c4,
  black: 0x000000,
  blanchedalmond: 0xffebcd,
  blue: 0x0000ff,
  blueviolet: 0x8a2be2,
  brown: 0xa52a2a,
  burlywood: 0xdeb887,
  cadetblue: 0x5f9ea0,
  chartreuse: 0x7fff00,
  chocolate: 0xd2691e,
  coral: 0xff7f50,
  cornflowerblue: 0x6495ed,
  cornsilk: 0xfff8dc,
  crimson: 0xdc143c,
  cyan: 0x00ffff,
  darkblue: 0x00008b,
  darkcyan: 0x008b8b,
  darkgoldenrod: 0xb8860b,
  darkgray: 0xa9a9a9,
  darkgreen: 0x006400,
  darkgrey: 0xa9a9a9,
  darkkhaki: 0xbdb76b,
  darkmagenta: 0x8b008b,
  darkolivegreen: 0x556b2f,
  darkorange: 0xff8c00,
  darkorchid: 0x9932cc,
  darkred: 0x8b0000,
  darksalmon: 0xe9967a,
  darkseagreen: 0x8fbc8f,
  darkslateblue: 0x483d8b,
  darkslategray: 0x2f4f4f,
  darkslategrey: 0x2f4f4f,
  darkturquoise: 0x00ced1,
  darkviolet: 0x9400d3,
  deeppink: 0xff1493,
  deepskyblue: 0x00bfff,
  dimgray: 0x696969,
  dimgrey: 0x696969,
  dodgerblue: 0x1e90ff,
  firebrick: 0xb22222,
  floralwhite: 0xfffaf0,
  forestgreen: 0x228b22,
  fuchsia: 0xff00ff,
  gainsboro: 0xdcdcdc,
  ghostwhite: 0xf8f8ff,
  gold: 0xffd700,
  goldenrod: 0xdaa520,
  gray: 0x808080,
  green: 0x008000,
  greenyellow: 0xadff2f,
  grey: 0x808080,
  honeydew: 0xf0fff0,
  hotpink: 0xff69b4,
  indianred: 0xcd5c5c,
  indigo: 0x4b0082,
  ivory: 0xfffff0,
  khaki: 0xf0e68c,
  lavender: 0xe6e6fa,
  lavenderblush: 0xfff0f5,
  lawngreen: 0x7cfc00,
  lemonchiffon: 0xfffacd,
  lightblue: 0xadd8e6,
  lightcoral: 0xf08080,
  lightcyan: 0xe0ffff,
  lightgoldenrodyellow: 0xfafad2,
  lightgray: 0xd3d3d3,
  lightgreen: 0x90ee90,
  lightgrey: 0xd3d3d3,
  lightpink: 0xffb6c1,
  lightsalmon: 0xffa07a,
  lightseagreen: 0x20b2aa,
  lightskyblue: 0x87cefa,
  lightslategray: 0x778899,
  lightslategrey: 0x778899,
  lightsteelblue: 0xb0c4de,
  lightyellow: 0xffffe0,
  lime: 0x00ff00,
  limegreen: 0x32cd32,
  linen: 0xfaf0e6,
  magenta: 0xff00ff,
  maroon: 0x800000,
  mediumaquamarine: 0x66cdaa,
  mediumblue: 0x0000cd,
  mediumorchid: 0xba55d3,
  mediumpurple: 0x9370db,
  mediumseagreen: 0x3cb371,
  mediumslateblue: 0x7b68ee,
  mediumspringgreen: 0x00fa9a,
  mediumturquoise: 0x48d1cc,
  mediumvioletred: 0xc71585,
  midnightblue: 0x191970,
  mintcream: 0xf5fffa,
  mistyrose: 0xffe4e1,
  moccasin: 0xffe4b5,
  navajowhite: 0xffdead,
  navy: 0x000080,
  oldlace: 0xfdf5e6,
  olive: 0x808000,
  olivedrab: 0x6b8e23,
  orange: 0xffa500,
  orangered: 0xff4500,
  orchid: 0xda70d6,
  palegoldenrod: 0xeee8aa,
  palegreen: 0x98fb98,
  paleturquoise: 0xafeeee,
  palevioletred: 0xdb7093,
  papayawhip: 0xffefd5,
  peachpuff: 0xffdab9,
  peru: 0xcd853f,
  pink: 0xffc0cb,
  plum: 0xdda0dd,
  powderblue: 0xb0e0e6,
  purple: 0x800080,
  rebeccapurple: 0x663399,
  red: 0xff0000,
  rosybrown: 0xbc8f8f,
  royalblue: 0x4169e1,
  saddlebrown: 0x8b4513,
  salmon: 0xfa8072,
  sandybrown: 0xf4a460,
  seagreen: 0x2e8b57,
  seashell: 0xfff5ee,
  sienna: 0xa0522d,
  silver: 0xc0c0c0,
  skyblue: 0x87ceeb,
  slateblue: 0x6a5acd,
  slategray: 0x708090,
  slategrey: 0x708090,
  snow: 0xfffafa,
  springgreen: 0x00ff7f,
  steelblue: 0x4682b4,
  tan: 0xd2b48c,
  teal: 0x008080,
  thistle: 0xd8bfd8,
  tomato: 0xff6347,
  turquoise: 0x40e0d0,
  violet: 0xee82ee,
  wheat: 0xf5deb3,
  white: 0xffffff,
  whitesmoke: 0xf5f5f5,
  yellow: 0xffff00,
  yellowgreen: 0x9acd32
};

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Color, color, {
  copy(channels) {
    return Object.assign(new this.constructor, this, channels);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: color_formatHex, // Deprecated! Use color.formatHex.
  formatHex: color_formatHex,
  formatHex8: color_formatHex8,
  formatHsl: color_formatHsl,
  formatRgb: color_formatRgb,
  toString: color_formatRgb
});

function color_formatHex() {
  return this.rgb().formatHex();
}

function color_formatHex8() {
  return this.rgb().formatHex8();
}

function color_formatHsl() {
  return hslConvert(this).formatHsl();
}

function color_formatRgb() {
  return this.rgb().formatRgb();
}

function color(format) {
  var m, l;
  format = (format + "").trim().toLowerCase();
  return (m = reHex.exec(format)) ? (l = m[1].length, m = parseInt(m[1], 16), l === 6 ? rgbn(m) // #ff0000
      : l === 3 ? new Rgb((m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), ((m & 0xf) << 4) | (m & 0xf), 1) // #f00
      : l === 8 ? rgba(m >> 24 & 0xff, m >> 16 & 0xff, m >> 8 & 0xff, (m & 0xff) / 0xff) // #ff000000
      : l === 4 ? rgba((m >> 12 & 0xf) | (m >> 8 & 0xf0), (m >> 8 & 0xf) | (m >> 4 & 0xf0), (m >> 4 & 0xf) | (m & 0xf0), (((m & 0xf) << 4) | (m & 0xf)) / 0xff) // #f000
      : null) // invalid hex
      : (m = reRgbInteger.exec(format)) ? new Rgb(m[1], m[2], m[3], 1) // rgb(255, 0, 0)
      : (m = reRgbPercent.exec(format)) ? new Rgb(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, 1) // rgb(100%, 0%, 0%)
      : (m = reRgbaInteger.exec(format)) ? rgba(m[1], m[2], m[3], m[4]) // rgba(255, 0, 0, 1)
      : (m = reRgbaPercent.exec(format)) ? rgba(m[1] * 255 / 100, m[2] * 255 / 100, m[3] * 255 / 100, m[4]) // rgb(100%, 0%, 0%, 1)
      : (m = reHslPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, 1) // hsl(120, 50%, 50%)
      : (m = reHslaPercent.exec(format)) ? hsla(m[1], m[2] / 100, m[3] / 100, m[4]) // hsla(120, 50%, 50%, 1)
      : named.hasOwnProperty(format) ? rgbn(named[format]) // eslint-disable-line no-prototype-builtins
      : format === "transparent" ? new Rgb(NaN, NaN, NaN, 0)
      : null;
}

function rgbn(n) {
  return new Rgb(n >> 16 & 0xff, n >> 8 & 0xff, n & 0xff, 1);
}

function rgba(r, g, b, a) {
  if (a <= 0) r = g = b = NaN;
  return new Rgb(r, g, b, a);
}

function rgbConvert(o) {
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Rgb;
  o = o.rgb();
  return new Rgb(o.r, o.g, o.b, o.opacity);
}

function rgb(r, g, b, opacity) {
  return arguments.length === 1 ? rgbConvert(r) : new Rgb(r, g, b, opacity == null ? 1 : opacity);
}

function Rgb(r, g, b, opacity) {
  this.r = +r;
  this.g = +g;
  this.b = +b;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Rgb, rgb, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Rgb(this.r * k, this.g * k, this.b * k, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new Rgb(clampi(this.r), clampi(this.g), clampi(this.b), clampa(this.opacity));
  },
  displayable() {
    return (-0.5 <= this.r && this.r < 255.5)
        && (-0.5 <= this.g && this.g < 255.5)
        && (-0.5 <= this.b && this.b < 255.5)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  hex: rgb_formatHex, // Deprecated! Use color.formatHex.
  formatHex: rgb_formatHex,
  formatHex8: rgb_formatHex8,
  formatRgb: rgb_formatRgb,
  toString: rgb_formatRgb
}));

function rgb_formatHex() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}`;
}

function rgb_formatHex8() {
  return `#${hex(this.r)}${hex(this.g)}${hex(this.b)}${hex((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}

function rgb_formatRgb() {
  const a = clampa(this.opacity);
  return `${a === 1 ? "rgb(" : "rgba("}${clampi(this.r)}, ${clampi(this.g)}, ${clampi(this.b)}${a === 1 ? ")" : `, ${a})`}`;
}

function clampa(opacity) {
  return isNaN(opacity) ? 1 : Math.max(0, Math.min(1, opacity));
}

function clampi(value) {
  return Math.max(0, Math.min(255, Math.round(value) || 0));
}

function hex(value) {
  value = clampi(value);
  return (value < 16 ? "0" : "") + value.toString(16);
}

function hsla(h, s, l, a) {
  if (a <= 0) h = s = l = NaN;
  else if (l <= 0 || l >= 1) h = s = NaN;
  else if (s <= 0) h = NaN;
  return new Hsl(h, s, l, a);
}

function hslConvert(o) {
  if (o instanceof Hsl) return new Hsl(o.h, o.s, o.l, o.opacity);
  if (!(o instanceof Color)) o = color(o);
  if (!o) return new Hsl;
  if (o instanceof Hsl) return o;
  o = o.rgb();
  var r = o.r / 255,
      g = o.g / 255,
      b = o.b / 255,
      min = Math.min(r, g, b),
      max = Math.max(r, g, b),
      h = NaN,
      s = max - min,
      l = (max + min) / 2;
  if (s) {
    if (r === max) h = (g - b) / s + (g < b) * 6;
    else if (g === max) h = (b - r) / s + 2;
    else h = (r - g) / s + 4;
    s /= l < 0.5 ? max + min : 2 - max - min;
    h *= 60;
  } else {
    s = l > 0 && l < 1 ? 0 : h;
  }
  return new Hsl(h, s, l, o.opacity);
}

function hsl(h, s, l, opacity) {
  return arguments.length === 1 ? hslConvert(h) : new Hsl(h, s, l, opacity == null ? 1 : opacity);
}

function Hsl(h, s, l, opacity) {
  this.h = +h;
  this.s = +s;
  this.l = +l;
  this.opacity = +opacity;
}

(0,_define_js__WEBPACK_IMPORTED_MODULE_0__["default"])(Hsl, hsl, (0,_define_js__WEBPACK_IMPORTED_MODULE_0__.extend)(Color, {
  brighter(k) {
    k = k == null ? brighter : Math.pow(brighter, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  darker(k) {
    k = k == null ? darker : Math.pow(darker, k);
    return new Hsl(this.h, this.s, this.l * k, this.opacity);
  },
  rgb() {
    var h = this.h % 360 + (this.h < 0) * 360,
        s = isNaN(h) || isNaN(this.s) ? 0 : this.s,
        l = this.l,
        m2 = l + (l < 0.5 ? l : 1 - l) * s,
        m1 = 2 * l - m2;
    return new Rgb(
      hsl2rgb(h >= 240 ? h - 240 : h + 120, m1, m2),
      hsl2rgb(h, m1, m2),
      hsl2rgb(h < 120 ? h + 240 : h - 120, m1, m2),
      this.opacity
    );
  },
  clamp() {
    return new Hsl(clamph(this.h), clampt(this.s), clampt(this.l), clampa(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s))
        && (0 <= this.l && this.l <= 1)
        && (0 <= this.opacity && this.opacity <= 1);
  },
  formatHsl() {
    const a = clampa(this.opacity);
    return `${a === 1 ? "hsl(" : "hsla("}${clamph(this.h)}, ${clampt(this.s) * 100}%, ${clampt(this.l) * 100}%${a === 1 ? ")" : `, ${a})`}`;
  }
}));

function clamph(value) {
  value = (value || 0) % 360;
  return value < 0 ? value + 360 : value;
}

function clampt(value) {
  return Math.max(0, Math.min(1, value || 0));
}

/* From FvD 13.37, CSS Color Module Level 3 */
function hsl2rgb(h, m1, m2) {
  return (h < 60 ? m1 + (m2 - m1) * h / 60
      : h < 180 ? m2
      : h < 240 ? m1 + (m2 - m1) * (240 - h) / 60
      : m1) * 255;
}


/***/ }),

/***/ "./node_modules/d3-color/src/define.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-color/src/define.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   extend: () => (/* binding */ extend)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(constructor, factory, prototype) {
  constructor.prototype = factory.prototype = prototype;
  prototype.constructor = constructor;
}

function extend(parent, definition) {
  var prototype = Object.create(parent.prototype);
  for (var key in definition) prototype[key] = definition[key];
  return prototype;
}


/***/ }),

/***/ "./node_modules/d3-dispatch/src/dispatch.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-dispatch/src/dispatch.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var noop = {value: () => {}};

function dispatch() {
  for (var i = 0, n = arguments.length, _ = {}, t; i < n; ++i) {
    if (!(t = arguments[i] + "") || (t in _) || /[\s.]/.test(t)) throw new Error("illegal type: " + t);
    _[t] = [];
  }
  return new Dispatch(_);
}

function Dispatch(_) {
  this._ = _;
}

function parseTypenames(typenames, types) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    if (t && !types.hasOwnProperty(t)) throw new Error("unknown type: " + t);
    return {type: t, name: name};
  });
}

Dispatch.prototype = dispatch.prototype = {
  constructor: Dispatch,
  on: function(typename, callback) {
    var _ = this._,
        T = parseTypenames(typename + "", _),
        t,
        i = -1,
        n = T.length;

    // If no callback was specified, return the callback of the given type and name.
    if (arguments.length < 2) {
      while (++i < n) if ((t = (typename = T[i]).type) && (t = get(_[t], typename.name))) return t;
      return;
    }

    // If a type was specified, set the callback for the given type and name.
    // Otherwise, if a null callback was specified, remove callbacks of the given name.
    if (callback != null && typeof callback !== "function") throw new Error("invalid callback: " + callback);
    while (++i < n) {
      if (t = (typename = T[i]).type) _[t] = set(_[t], typename.name, callback);
      else if (callback == null) for (t in _) _[t] = set(_[t], typename.name, null);
    }

    return this;
  },
  copy: function() {
    var copy = {}, _ = this._;
    for (var t in _) copy[t] = _[t].slice();
    return new Dispatch(copy);
  },
  call: function(type, that) {
    if ((n = arguments.length - 2) > 0) for (var args = new Array(n), i = 0, n, t; i < n; ++i) args[i] = arguments[i + 2];
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  },
  apply: function(type, that, args) {
    if (!this._.hasOwnProperty(type)) throw new Error("unknown type: " + type);
    for (var t = this._[type], i = 0, n = t.length; i < n; ++i) t[i].value.apply(that, args);
  }
};

function get(type, name) {
  for (var i = 0, n = type.length, c; i < n; ++i) {
    if ((c = type[i]).name === name) {
      return c.value;
    }
  }
}

function set(type, name, callback) {
  for (var i = 0, n = type.length; i < n; ++i) {
    if (type[i].name === name) {
      type[i] = noop, type = type.slice(0, i).concat(type.slice(i + 1));
      break;
    }
  }
  if (callback != null) type.push({name: name, value: callback});
  return type;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (dispatch);


/***/ }),

/***/ "./node_modules/d3-drag/src/nodrag.js":
/*!********************************************!*\
  !*** ./node_modules/d3-drag/src/nodrag.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   yesdrag: () => (/* binding */ yesdrag)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/select.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./noevent.js */ "./node_modules/d3-drag/src/noevent.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(view) {
  var root = view.document.documentElement,
      selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(view).on("dragstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);
  } else {
    root.__noselect = root.style.MozUserSelect;
    root.style.MozUserSelect = "none";
  }
}

function yesdrag(view, noclick) {
  var root = view.document.documentElement,
      selection = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(view).on("dragstart.drag", null);
  if (noclick) {
    selection.on("click.drag", _noevent_js__WEBPACK_IMPORTED_MODULE_1__["default"], _noevent_js__WEBPACK_IMPORTED_MODULE_1__.nonpassivecapture);
    setTimeout(function() { selection.on("click.drag", null); }, 0);
  }
  if ("onselectstart" in root) {
    selection.on("selectstart.drag", null);
  } else {
    root.style.MozUserSelect = root.__noselect;
    delete root.__noselect;
  }
}


/***/ }),

/***/ "./node_modules/d3-drag/src/noevent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-drag/src/noevent.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   nonpassive: () => (/* binding */ nonpassive),
/* harmony export */   nonpassivecapture: () => (/* binding */ nonpassivecapture),
/* harmony export */   nopropagation: () => (/* binding */ nopropagation)
/* harmony export */ });
// These are typically used in conjunction with noevent to ensure that we can
// preventDefault on the event.
const nonpassive = {passive: false};
const nonpassivecapture = {capture: true, passive: false};

function nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}


/***/ }),

/***/ "./node_modules/d3-ease/src/cubic.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-ease/src/cubic.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cubicIn: () => (/* binding */ cubicIn),
/* harmony export */   cubicInOut: () => (/* binding */ cubicInOut),
/* harmony export */   cubicOut: () => (/* binding */ cubicOut)
/* harmony export */ });
function cubicIn(t) {
  return t * t * t;
}

function cubicOut(t) {
  return --t * t * t + 1;
}

function cubicInOut(t) {
  return ((t *= 2) <= 1 ? t * t * t : (t -= 2) * t * t + 2) / 2;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/cartesian.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/cartesian.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   cartesian: () => (/* binding */ cartesian),
/* harmony export */   cartesianAddInPlace: () => (/* binding */ cartesianAddInPlace),
/* harmony export */   cartesianCross: () => (/* binding */ cartesianCross),
/* harmony export */   cartesianDot: () => (/* binding */ cartesianDot),
/* harmony export */   cartesianNormalizeInPlace: () => (/* binding */ cartesianNormalizeInPlace),
/* harmony export */   cartesianScale: () => (/* binding */ cartesianScale),
/* harmony export */   spherical: () => (/* binding */ spherical)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


function spherical(cartesian) {
  return [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(cartesian[1], cartesian[0]), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(cartesian[2])];
}

function cartesian(spherical) {
  var lambda = spherical[0], phi = spherical[1], cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi);
  return [cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda), cosPhi * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda), (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi)];
}

function cartesianDot(a, b) {
  return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
}

function cartesianCross(a, b) {
  return [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
}

// TODO return a
function cartesianAddInPlace(a, b) {
  a[0] += b[0], a[1] += b[1], a[2] += b[2];
}

function cartesianScale(vector, k) {
  return [vector[0] * k, vector[1] * k, vector[2] * k];
}

// TODO return d
function cartesianNormalizeInPlace(d) {
  var l = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(d[0] * d[0] + d[1] * d[1] + d[2] * d[2]);
  d[0] /= l, d[1] /= l, d[2] /= l;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/circle.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/circle.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   circleStream: () => (/* binding */ circleStream),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-geo/src/constant.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rotation.js */ "./node_modules/d3-geo/src/rotation.js");





// Generates a circle centered at [0°, 0°], with a given radius and precision.
function circleStream(stream, radius, delta, direction, t0, t1) {
  if (!delta) return;
  var cosRadius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(radius),
      sinRadius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(radius),
      step = direction * delta;
  if (t0 == null) {
    t0 = radius + direction * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
    t1 = radius - step / 2;
  } else {
    t0 = circleRadius(cosRadius, t0);
    t1 = circleRadius(cosRadius, t1);
    if (direction > 0 ? t0 < t1 : t0 > t1) t0 += direction * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
  }
  for (var point, t = t0; direction > 0 ? t > t1 : t < t1; t -= step) {
    point = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.spherical)([cosRadius, -sinRadius * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(t), -sinRadius * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(t)]);
    stream.point(point[0], point[1]);
  }
}

// Returns the signed angle of a cartesian point relative to [cosRadius, 0, 0].
function circleRadius(cosRadius, point) {
  point = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.cartesian)(point), point[0] -= cosRadius;
  (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_1__.cartesianNormalizeInPlace)(point);
  var radius = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.acos)(-point[1]);
  return ((-point[2] < 0 ? -radius : radius) + _math_js__WEBPACK_IMPORTED_MODULE_0__.tau - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon) % _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var center = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])([0, 0]),
      radius = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(90),
      precision = (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(2),
      ring,
      rotate,
      stream = {point: point};

  function point(x, y) {
    ring.push(x = rotate(x, y));
    x[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, x[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees;
  }

  function circle() {
    var c = center.apply(this, arguments),
        r = radius.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
        p = precision.apply(this, arguments) * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians;
    ring = [];
    rotate = (0,_rotation_js__WEBPACK_IMPORTED_MODULE_3__.rotateRadians)(-c[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, -c[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, 0).invert;
    circleStream(stream, r, p, 1);
    c = {type: "Polygon", coordinates: [ring]};
    ring = rotate = null;
    return c;
  }

  circle.center = function(_) {
    return arguments.length ? (center = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])([+_[0], +_[1]]), circle) : center;
  };

  circle.radius = function(_) {
    return arguments.length ? (radius = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(+_), circle) : radius;
  };

  circle.precision = function(_) {
    return arguments.length ? (precision = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_2__["default"])(+_), circle) : precision;
  };

  return circle;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/antimeridian.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/antimeridian.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(
  function() { return true; },
  clipAntimeridianLine,
  clipAntimeridianInterpolate,
  [-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -_math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi]
));

// Takes a line and cuts into visible segments. Return values: 0 - there were
// intersections or the line was empty; 1 - no intersections; 2 - there were
// intersections, and the first and last segments should be rejoined.
function clipAntimeridianLine(stream) {
  var lambda0 = NaN,
      phi0 = NaN,
      sign0 = NaN,
      clean; // no intersections

  return {
    lineStart: function() {
      stream.lineStart();
      clean = 1;
    },
    point: function(lambda1, phi1) {
      var sign1 = lambda1 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.pi,
          delta = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda1 - lambda0);
      if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(delta - _math_js__WEBPACK_IMPORTED_MODULE_1__.pi) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) { // line crosses a pole
        stream.point(lambda0, phi0 = (phi0 + phi1) / 2 > 0 ? _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        stream.point(lambda1, phi0);
        clean = 0;
      } else if (sign0 !== sign1 && delta >= _math_js__WEBPACK_IMPORTED_MODULE_1__.pi) { // line crosses antimeridian
        if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda0 - sign0) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) lambda0 -= sign0 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon; // handle degeneracies
        if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(lambda1 - sign1) < _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) lambda1 -= sign1 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon;
        phi0 = clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1);
        stream.point(sign0, phi0);
        stream.lineEnd();
        stream.lineStart();
        stream.point(sign1, phi0);
        clean = 0;
      }
      stream.point(lambda0 = lambda1, phi0 = phi1);
      sign0 = sign1;
    },
    lineEnd: function() {
      stream.lineEnd();
      lambda0 = phi0 = NaN;
    },
    clean: function() {
      return 2 - clean; // if intersections, rejoin first and last segments
    }
  };
}

function clipAntimeridianIntersect(lambda0, phi0, lambda1, phi1) {
  var cosPhi0,
      cosPhi1,
      sinLambda0Lambda1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda0 - lambda1);
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(sinLambda0Lambda1) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon
      ? (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.atan)(((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi0) * (cosPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi1)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda1)
          - (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(phi1) * (cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(phi0)) * (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(lambda0))
          / (cosPhi0 * cosPhi1 * sinLambda0Lambda1))
      : (phi0 + phi1) / 2;
}

function clipAntimeridianInterpolate(from, to, direction, stream) {
  var phi;
  if (from == null) {
    phi = direction * _math_js__WEBPACK_IMPORTED_MODULE_1__.halfPi;
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
    stream.point(0, phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, 0);
    stream.point(_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -phi);
    stream.point(0, -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, -phi);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, 0);
    stream.point(-_math_js__WEBPACK_IMPORTED_MODULE_1__.pi, phi);
  } else if ((0,_math_js__WEBPACK_IMPORTED_MODULE_1__.abs)(from[0] - to[0]) > _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon) {
    var lambda = from[0] < to[0] ? _math_js__WEBPACK_IMPORTED_MODULE_1__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_1__.pi;
    phi = direction * lambda / 2;
    stream.point(-lambda, phi);
    stream.point(0, phi);
    stream.point(lambda, phi);
  } else {
    stream.point(to[0], to[1]);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/buffer.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/buffer.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var lines = [],
      line;
  return {
    point: function(x, y, m) {
      line.push([x, y, m]);
    },
    lineStart: function() {
      lines.push(line = []);
    },
    lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
    rejoin: function() {
      if (lines.length > 1) lines.push(lines.pop().concat(lines.shift()));
    },
    result: function() {
      var result = lines;
      lines = [];
      line = null;
      return result;
    }
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/circle.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/circle.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _circle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../circle.js */ "./node_modules/d3-geo/src/circle.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/clip/index.js");






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(radius) {
  var cr = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(radius),
      delta = 2 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians,
      smallRadius = cr > 0,
      notHemisphere = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(cr) > _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon; // TODO optimise for this common case

  function interpolate(from, to, direction, stream) {
    (0,_circle_js__WEBPACK_IMPORTED_MODULE_1__.circleStream)(stream, radius, delta, direction, from, to);
  }

  function visible(lambda, phi) {
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi) > cr;
  }

  // Takes a line and cuts into visible segments. Return values used for polygon
  // clipping: 0 - there were intersections or the line was empty; 1 - no
  // intersections 2 - there were intersections, and the first and last segments
  // should be rejoined.
  function clipLine(stream) {
    var point0, // previous point
        c0, // code for previous point
        v0, // visibility of previous point
        v00, // visibility of first point
        clean; // no intersections
    return {
      lineStart: function() {
        v00 = v0 = false;
        clean = 1;
      },
      point: function(lambda, phi) {
        var point1 = [lambda, phi],
            point2,
            v = visible(lambda, phi),
            c = smallRadius
              ? v ? 0 : code(lambda, phi)
              : v ? code(lambda + (lambda < 0 ? _math_js__WEBPACK_IMPORTED_MODULE_0__.pi : -_math_js__WEBPACK_IMPORTED_MODULE_0__.pi), phi) : 0;
        if (!point0 && (v00 = v0 = v)) stream.lineStart();
        if (v !== v0) {
          point2 = intersect(point0, point1);
          if (!point2 || (0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point0, point2) || (0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point1, point2))
            point1[2] = 1;
        }
        if (v !== v0) {
          clean = 0;
          if (v) {
            // outside going in
            stream.lineStart();
            point2 = intersect(point1, point0);
            stream.point(point2[0], point2[1]);
          } else {
            // inside going out
            point2 = intersect(point0, point1);
            stream.point(point2[0], point2[1], 2);
            stream.lineEnd();
          }
          point0 = point2;
        } else if (notHemisphere && point0 && smallRadius ^ v) {
          var t;
          // If the codes for two points are different, or are both zero,
          // and there this segment intersects with the small circle.
          if (!(c & c0) && (t = intersect(point1, point0, true))) {
            clean = 0;
            if (smallRadius) {
              stream.lineStart();
              stream.point(t[0][0], t[0][1]);
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
            } else {
              stream.point(t[1][0], t[1][1]);
              stream.lineEnd();
              stream.lineStart();
              stream.point(t[0][0], t[0][1], 3);
            }
          }
        }
        if (v && (!point0 || !(0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_2__["default"])(point0, point1))) {
          stream.point(point1[0], point1[1]);
        }
        point0 = point1, v0 = v, c0 = c;
      },
      lineEnd: function() {
        if (v0) stream.lineEnd();
        point0 = null;
      },
      // Rejoin first and last segments if there were intersections and the first
      // and last points were visible.
      clean: function() {
        return clean | ((v00 && v0) << 1);
      }
    };
  }

  // Intersects the great circle between a and b with the clip circle.
  function intersect(a, b, two) {
    var pa = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesian)(a),
        pb = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesian)(b);

    // We have two planes, n1.p = d1 and n2.p = d2.
    // Find intersection line p(t) = c1 n1 + c2 n2 + t (n1 ⨯ n2).
    var n1 = [1, 0, 0], // normal
        n2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(pa, pb),
        n2n2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(n2, n2),
        n1n2 = n2[0], // cartesianDot(n1, n2),
        determinant = n2n2 - n1n2 * n1n2;

    // Two polar points.
    if (!determinant) return !two && a;

    var c1 =  cr * n2n2 / determinant,
        c2 = -cr * n1n2 / determinant,
        n1xn2 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianCross)(n1, n2),
        A = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(n1, c1),
        B = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(n2, c2);
    (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(A, B);

    // Solve |p(t)|^2 = 1.
    var u = n1xn2,
        w = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(A, u),
        uu = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(u, u),
        t2 = w * w - uu * ((0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianDot)(A, A) - 1);

    if (t2 < 0) return;

    var t = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(t2),
        q = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(u, (-w - t) / uu);
    (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(q, A);
    q = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.spherical)(q);

    if (!two) return q;

    // Two intersection points.
    var lambda0 = a[0],
        lambda1 = b[0],
        phi0 = a[1],
        phi1 = b[1],
        z;

    if (lambda1 < lambda0) z = lambda0, lambda0 = lambda1, lambda1 = z;

    var delta = lambda1 - lambda0,
        polar = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(delta - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon,
        meridian = polar || delta < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;

    if (!polar && phi1 < phi0) z = phi0, phi0 = phi1, phi1 = z;

    // Check that the first point is between a and b.
    if (meridian
        ? polar
          ? phi0 + phi1 > 0 ^ q[1] < ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(q[0] - lambda0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? phi0 : phi1)
          : phi0 <= q[1] && q[1] <= phi1
        : delta > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ^ (lambda0 <= q[0] && q[0] <= lambda1)) {
      var q1 = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianScale)(u, (-w + t) / uu);
      (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.cartesianAddInPlace)(q1, A);
      return [q, (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_3__.spherical)(q1)];
    }
  }

  // Generates a 4-bit vector representing the location of a point relative to
  // the small circle's bounding box.
  function code(lambda, phi) {
    var r = smallRadius ? radius : _math_js__WEBPACK_IMPORTED_MODULE_0__.pi - radius,
        code = 0;
    if (lambda < -r) code |= 1; // left
    else if (lambda > r) code |= 2; // right
    if (phi < -r) code |= 4; // below
    else if (phi > r) code |= 8; // above
    return code;
  }

  return (0,_index_js__WEBPACK_IMPORTED_MODULE_4__["default"])(visible, clipLine, interpolate, smallRadius ? [0, -radius] : [-_math_js__WEBPACK_IMPORTED_MODULE_0__.pi, radius - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _polygonContains_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../polygonContains.js */ "./node_modules/d3-geo/src/polygonContains.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/merge.js");






/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(pointVisible, clipLine, interpolate, start) {
  return function(sink) {
    var line = clipLine(sink),
        ringBuffer = (0,_buffer_js__WEBPACK_IMPORTED_MODULE_0__["default"])(),
        ringSink = clipLine(ringBuffer),
        polygonStarted = false,
        polygon,
        segments,
        ring;

    var clip = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() {
        clip.point = pointRing;
        clip.lineStart = ringStart;
        clip.lineEnd = ringEnd;
        segments = [];
        polygon = [];
      },
      polygonEnd: function() {
        clip.point = point;
        clip.lineStart = lineStart;
        clip.lineEnd = lineEnd;
        segments = (0,d3_array__WEBPACK_IMPORTED_MODULE_1__["default"])(segments);
        var startInside = (0,_polygonContains_js__WEBPACK_IMPORTED_MODULE_2__["default"])(polygon, start);
        if (segments.length) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          (0,_rejoin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, sink);
        } else if (startInside) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          interpolate(null, null, 1, sink);
          sink.lineEnd();
        }
        if (polygonStarted) sink.polygonEnd(), polygonStarted = false;
        segments = polygon = null;
      },
      sphere: function() {
        sink.polygonStart();
        sink.lineStart();
        interpolate(null, null, 1, sink);
        sink.lineEnd();
        sink.polygonEnd();
      }
    };

    function point(lambda, phi) {
      if (pointVisible(lambda, phi)) sink.point(lambda, phi);
    }

    function pointLine(lambda, phi) {
      line.point(lambda, phi);
    }

    function lineStart() {
      clip.point = pointLine;
      line.lineStart();
    }

    function lineEnd() {
      clip.point = point;
      line.lineEnd();
    }

    function pointRing(lambda, phi) {
      ring.push([lambda, phi]);
      ringSink.point(lambda, phi);
    }

    function ringStart() {
      ringSink.lineStart();
      ring = [];
    }

    function ringEnd() {
      pointRing(ring[0][0], ring[0][1]);
      ringSink.lineEnd();

      var clean = ringSink.clean(),
          ringSegments = ringBuffer.result(),
          i, n = ringSegments.length, m,
          segment,
          point;

      ring.pop();
      polygon.push(ring);
      ring = null;

      if (!n) return;

      // No intersections.
      if (clean & 1) {
        segment = ringSegments[0];
        if ((m = segment.length - 1) > 0) {
          if (!polygonStarted) sink.polygonStart(), polygonStarted = true;
          sink.lineStart();
          for (i = 0; i < m; ++i) sink.point((point = segment[i])[0], point[1]);
          sink.lineEnd();
        }
        return;
      }

      // Rejoin connected segments.
      // TODO reuse ringBuffer.rejoin()?
      if (n > 1 && clean & 2) ringSegments.push(ringSegments.pop().concat(ringSegments.shift()));

      segments.push(ringSegments.filter(validSegment));
    }

    return clip;
  };
}

function validSegment(segment) {
  return segment.length > 1;
}

// Intersections are sorted along the clip edge. For both antimeridian cutting
// and circle clipping, the same comparison is used.
function compareIntersection(a, b) {
  return ((a = a.x)[0] < 0 ? a[1] - _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_4__.epsilon : _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - a[1])
       - ((b = b.x)[0] < 0 ? b[1] - _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_4__.epsilon : _math_js__WEBPACK_IMPORTED_MODULE_4__.halfPi - b[1]);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/line.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/clip/line.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, x0, y0, x1, y1) {
  var ax = a[0],
      ay = a[1],
      bx = b[0],
      by = b[1],
      t0 = 0,
      t1 = 1,
      dx = bx - ax,
      dy = by - ay,
      r;

  r = x0 - ax;
  if (!dx && r > 0) return;
  r /= dx;
  if (dx < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dx > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = x1 - ax;
  if (!dx && r < 0) return;
  r /= dx;
  if (dx < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dx > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  r = y0 - ay;
  if (!dy && r > 0) return;
  r /= dy;
  if (dy < 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  } else if (dy > 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  }

  r = y1 - ay;
  if (!dy && r < 0) return;
  r /= dy;
  if (dy < 0) {
    if (r > t1) return;
    if (r > t0) t0 = r;
  } else if (dy > 0) {
    if (r < t0) return;
    if (r < t1) t1 = r;
  }

  if (t0 > 0) a[0] = ax + t0 * dx, a[1] = ay + t0 * dy;
  if (t1 < 1) b[0] = ax + t1 * dx, b[1] = ay + t1 * dy;
  return true;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rectangle.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rectangle.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ clipRectangle)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _buffer_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./buffer.js */ "./node_modules/d3-geo/src/clip/buffer.js");
/* harmony import */ var _line_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./line.js */ "./node_modules/d3-geo/src/clip/line.js");
/* harmony import */ var _rejoin_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./rejoin.js */ "./node_modules/d3-geo/src/clip/rejoin.js");
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/merge.js");






var clipMax = 1e9, clipMin = -clipMax;

// TODO Use d3-polygon’s polygonContains here for the ring check?
// TODO Eliminate duplicate buffering in clipBuffer and polygon.push?

function clipRectangle(x0, y0, x1, y1) {

  function visible(x, y) {
    return x0 <= x && x <= x1 && y0 <= y && y <= y1;
  }

  function interpolate(from, to, direction, stream) {
    var a = 0, a1 = 0;
    if (from == null
        || (a = corner(from, direction)) !== (a1 = corner(to, direction))
        || comparePoint(from, to) < 0 ^ direction > 0) {
      do stream.point(a === 0 || a === 3 ? x0 : x1, a > 1 ? y1 : y0);
      while ((a = (a + direction + 4) % 4) !== a1);
    } else {
      stream.point(to[0], to[1]);
    }
  }

  function corner(p, direction) {
    return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[0] - x0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 0 : 3
        : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[0] - x1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 2 : 1
        : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(p[1] - y0) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? direction > 0 ? 1 : 0
        : direction > 0 ? 3 : 2; // abs(p[1] - y1) < epsilon
  }

  function compareIntersection(a, b) {
    return comparePoint(a.x, b.x);
  }

  function comparePoint(a, b) {
    var ca = corner(a, 1),
        cb = corner(b, 1);
    return ca !== cb ? ca - cb
        : ca === 0 ? b[1] - a[1]
        : ca === 1 ? a[0] - b[0]
        : ca === 2 ? a[1] - b[1]
        : b[0] - a[0];
  }

  return function(stream) {
    var activeStream = stream,
        bufferStream = (0,_buffer_js__WEBPACK_IMPORTED_MODULE_1__["default"])(),
        segments,
        polygon,
        ring,
        x__, y__, v__, // first point
        x_, y_, v_, // previous point
        first,
        clean;

    var clipStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: polygonStart,
      polygonEnd: polygonEnd
    };

    function point(x, y) {
      if (visible(x, y)) activeStream.point(x, y);
    }

    function polygonInside() {
      var winding = 0;

      for (var i = 0, n = polygon.length; i < n; ++i) {
        for (var ring = polygon[i], j = 1, m = ring.length, point = ring[0], a0, a1, b0 = point[0], b1 = point[1]; j < m; ++j) {
          a0 = b0, a1 = b1, point = ring[j], b0 = point[0], b1 = point[1];
          if (a1 <= y1) { if (b1 > y1 && (b0 - a0) * (y1 - a1) > (b1 - a1) * (x0 - a0)) ++winding; }
          else { if (b1 <= y1 && (b0 - a0) * (y1 - a1) < (b1 - a1) * (x0 - a0)) --winding; }
        }
      }

      return winding;
    }

    // Buffer geometry within a polygon and then clip it en masse.
    function polygonStart() {
      activeStream = bufferStream, segments = [], polygon = [], clean = true;
    }

    function polygonEnd() {
      var startInside = polygonInside(),
          cleanInside = clean && startInside,
          visible = (segments = (0,d3_array__WEBPACK_IMPORTED_MODULE_2__["default"])(segments)).length;
      if (cleanInside || visible) {
        stream.polygonStart();
        if (cleanInside) {
          stream.lineStart();
          interpolate(null, null, 1, stream);
          stream.lineEnd();
        }
        if (visible) {
          (0,_rejoin_js__WEBPACK_IMPORTED_MODULE_3__["default"])(segments, compareIntersection, startInside, interpolate, stream);
        }
        stream.polygonEnd();
      }
      activeStream = stream, segments = polygon = ring = null;
    }

    function lineStart() {
      clipStream.point = linePoint;
      if (polygon) polygon.push(ring = []);
      first = true;
      v_ = false;
      x_ = y_ = NaN;
    }

    // TODO rather than special-case polygons, simply handle them separately.
    // Ideally, coincident intersection points should be jittered to avoid
    // clipping issues.
    function lineEnd() {
      if (segments) {
        linePoint(x__, y__);
        if (v__ && v_) bufferStream.rejoin();
        segments.push(bufferStream.result());
      }
      clipStream.point = point;
      if (v_) activeStream.lineEnd();
    }

    function linePoint(x, y) {
      var v = visible(x, y);
      if (polygon) ring.push([x, y]);
      if (first) {
        x__ = x, y__ = y, v__ = v;
        first = false;
        if (v) {
          activeStream.lineStart();
          activeStream.point(x, y);
        }
      } else {
        if (v && v_) activeStream.point(x, y);
        else {
          var a = [x_ = Math.max(clipMin, Math.min(clipMax, x_)), y_ = Math.max(clipMin, Math.min(clipMax, y_))],
              b = [x = Math.max(clipMin, Math.min(clipMax, x)), y = Math.max(clipMin, Math.min(clipMax, y))];
          if ((0,_line_js__WEBPACK_IMPORTED_MODULE_4__["default"])(a, b, x0, y0, x1, y1)) {
            if (!v_) {
              activeStream.lineStart();
              activeStream.point(a[0], a[1]);
            }
            activeStream.point(b[0], b[1]);
            if (!v) activeStream.lineEnd();
            clean = false;
          } else if (v) {
            activeStream.lineStart();
            activeStream.point(x, y);
            clean = false;
          }
        }
      }
      x_ = x, y_ = y, v_ = v;
    }

    return clipStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/clip/rejoin.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/clip/rejoin.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _pointEqual_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../pointEqual.js */ "./node_modules/d3-geo/src/pointEqual.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");



function Intersection(point, points, other, entry) {
  this.x = point;
  this.z = points;
  this.o = other; // another intersection
  this.e = entry; // is an entry?
  this.v = false; // visited
  this.n = this.p = null; // next & previous
}

// A generalized polygon clipping algorithm: given a polygon that has been cut
// into its visible line segments, and rejoins the segments by interpolating
// along the clip edge.
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(segments, compareIntersection, startInside, interpolate, stream) {
  var subject = [],
      clip = [],
      i,
      n;

  segments.forEach(function(segment) {
    if ((n = segment.length - 1) <= 0) return;
    var n, p0 = segment[0], p1 = segment[n], x;

    if ((0,_pointEqual_js__WEBPACK_IMPORTED_MODULE_0__["default"])(p0, p1)) {
      if (!p0[2] && !p1[2]) {
        stream.lineStart();
        for (i = 0; i < n; ++i) stream.point((p0 = segment[i])[0], p0[1]);
        stream.lineEnd();
        return;
      }
      // handle degenerate cases by moving the point
      p1[0] += 2 * _math_js__WEBPACK_IMPORTED_MODULE_1__.epsilon;
    }

    subject.push(x = new Intersection(p0, segment, null, true));
    clip.push(x.o = new Intersection(p0, null, x, false));
    subject.push(x = new Intersection(p1, segment, null, false));
    clip.push(x.o = new Intersection(p1, null, x, true));
  });

  if (!subject.length) return;

  clip.sort(compareIntersection);
  link(subject);
  link(clip);

  for (i = 0, n = clip.length; i < n; ++i) {
    clip[i].e = startInside = !startInside;
  }

  var start = subject[0],
      points,
      point;

  while (1) {
    // Find first unvisited intersection.
    var current = start,
        isSubject = true;
    while (current.v) if ((current = current.n) === start) return;
    points = current.z;
    stream.lineStart();
    do {
      current.v = current.o.v = true;
      if (current.e) {
        if (isSubject) {
          for (i = 0, n = points.length; i < n; ++i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.n.x, 1, stream);
        }
        current = current.n;
      } else {
        if (isSubject) {
          points = current.p.z;
          for (i = points.length - 1; i >= 0; --i) stream.point((point = points[i])[0], point[1]);
        } else {
          interpolate(current.x, current.p.x, -1, stream);
        }
        current = current.p;
      }
      current = current.o;
      points = current.z;
      isSubject = !isSubject;
    } while (!current.v);
    stream.lineEnd();
  }
}

function link(array) {
  if (!(n = array.length)) return;
  var n,
      i = 0,
      a = array[0],
      b;
  while (++i < n) {
    a.n = b = array[i];
    b.p = a;
    a = b;
  }
  a.n = b = array[0];
  b.p = a;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/compose.js":
/*!********************************************!*\
  !*** ./node_modules/d3-geo/src/compose.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {

  function compose(x, y) {
    return x = a(x, y), b(x[0], x[1]);
  }

  if (a.invert && b.invert) compose.invert = function(x, y) {
    return x = b.invert(x, y), x && a.invert(x[0], x[1]);
  };

  return compose;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/constant.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/constant.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/identity.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/identity.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => x);


/***/ }),

/***/ "./node_modules/d3-geo/src/math.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/math.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   abs: () => (/* binding */ abs),
/* harmony export */   acos: () => (/* binding */ acos),
/* harmony export */   asin: () => (/* binding */ asin),
/* harmony export */   atan: () => (/* binding */ atan),
/* harmony export */   atan2: () => (/* binding */ atan2),
/* harmony export */   ceil: () => (/* binding */ ceil),
/* harmony export */   cos: () => (/* binding */ cos),
/* harmony export */   degrees: () => (/* binding */ degrees),
/* harmony export */   epsilon: () => (/* binding */ epsilon),
/* harmony export */   epsilon2: () => (/* binding */ epsilon2),
/* harmony export */   exp: () => (/* binding */ exp),
/* harmony export */   floor: () => (/* binding */ floor),
/* harmony export */   halfPi: () => (/* binding */ halfPi),
/* harmony export */   haversin: () => (/* binding */ haversin),
/* harmony export */   hypot: () => (/* binding */ hypot),
/* harmony export */   log: () => (/* binding */ log),
/* harmony export */   pi: () => (/* binding */ pi),
/* harmony export */   pow: () => (/* binding */ pow),
/* harmony export */   quarterPi: () => (/* binding */ quarterPi),
/* harmony export */   radians: () => (/* binding */ radians),
/* harmony export */   sign: () => (/* binding */ sign),
/* harmony export */   sin: () => (/* binding */ sin),
/* harmony export */   sqrt: () => (/* binding */ sqrt),
/* harmony export */   tan: () => (/* binding */ tan),
/* harmony export */   tau: () => (/* binding */ tau)
/* harmony export */ });
var epsilon = 1e-6;
var epsilon2 = 1e-12;
var pi = Math.PI;
var halfPi = pi / 2;
var quarterPi = pi / 4;
var tau = pi * 2;

var degrees = 180 / pi;
var radians = pi / 180;

var abs = Math.abs;
var atan = Math.atan;
var atan2 = Math.atan2;
var cos = Math.cos;
var ceil = Math.ceil;
var exp = Math.exp;
var floor = Math.floor;
var hypot = Math.hypot;
var log = Math.log;
var pow = Math.pow;
var sin = Math.sin;
var sign = Math.sign || function(x) { return x > 0 ? 1 : x < 0 ? -1 : 0; };
var sqrt = Math.sqrt;
var tan = Math.tan;

function acos(x) {
  return x > 1 ? 0 : x < -1 ? pi : Math.acos(x);
}

function asin(x) {
  return x > 1 ? halfPi : x < -1 ? -halfPi : Math.asin(x);
}

function haversin(x) {
  return (x = sin(x / 2)) * x;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/noop.js":
/*!*****************************************!*\
  !*** ./node_modules/d3-geo/src/noop.js ***!
  \*****************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ noop)
/* harmony export */ });
function noop() {}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/area.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/path/area.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    x00,
    y00,
    x0,
    y0;

var areaStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  polygonStart: function() {
    areaStream.lineStart = areaRingStart;
    areaStream.lineEnd = areaRingEnd;
  },
  polygonEnd: function() {
    areaStream.lineStart = areaStream.lineEnd = areaStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"];
    areaSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.abs)(areaRingSum));
    areaRingSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
  },
  result: function() {
    var area = areaSum / 2;
    areaSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    return area;
  }
};

function areaRingStart() {
  areaStream.point = areaPointFirst;
}

function areaPointFirst(x, y) {
  areaStream.point = areaPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function areaPoint(x, y) {
  areaRingSum.add(y0 * x - x0 * y);
  x0 = x, y0 = y;
}

function areaRingEnd() {
  areaPoint(x00, y00);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (areaStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/bounds.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/bounds.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");


var x0 = Infinity,
    y0 = x0,
    x1 = -x0,
    y1 = x1;

var boundsStream = {
  point: boundsPoint,
  lineStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  lineEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonStart: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  polygonEnd: _noop_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  result: function() {
    var bounds = [[x0, y0], [x1, y1]];
    x1 = y1 = -(y0 = x0 = Infinity);
    return bounds;
  }
};

function boundsPoint(x, y) {
  if (x < x0) x0 = x;
  if (x > x1) x1 = x;
  if (y < y0) y0 = y;
  if (y > y1) y1 = y;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (boundsStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/centroid.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-geo/src/path/centroid.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");


// TODO Enforce positive area for exterior, negative area for interior?

var X0 = 0,
    Y0 = 0,
    Z0 = 0,
    X1 = 0,
    Y1 = 0,
    Z1 = 0,
    X2 = 0,
    Y2 = 0,
    Z2 = 0,
    x00,
    y00,
    x0,
    y0;

var centroidStream = {
  point: centroidPoint,
  lineStart: centroidLineStart,
  lineEnd: centroidLineEnd,
  polygonStart: function() {
    centroidStream.lineStart = centroidRingStart;
    centroidStream.lineEnd = centroidRingEnd;
  },
  polygonEnd: function() {
    centroidStream.point = centroidPoint;
    centroidStream.lineStart = centroidLineStart;
    centroidStream.lineEnd = centroidLineEnd;
  },
  result: function() {
    var centroid = Z2 ? [X2 / Z2, Y2 / Z2]
        : Z1 ? [X1 / Z1, Y1 / Z1]
        : Z0 ? [X0 / Z0, Y0 / Z0]
        : [NaN, NaN];
    X0 = Y0 = Z0 =
    X1 = Y1 = Z1 =
    X2 = Y2 = Z2 = 0;
    return centroid;
  }
};

function centroidPoint(x, y) {
  X0 += x;
  Y0 += y;
  ++Z0;
}

function centroidLineStart() {
  centroidStream.point = centroidPointFirstLine;
}

function centroidPointFirstLine(x, y) {
  centroidStream.point = centroidPointLine;
  centroidPoint(x0 = x, y0 = y);
}

function centroidPointLine(x, y) {
  var dx = x - x0, dy = y - y0, z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);
  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;
  centroidPoint(x0 = x, y0 = y);
}

function centroidLineEnd() {
  centroidStream.point = centroidPoint;
}

function centroidRingStart() {
  centroidStream.point = centroidPointFirstRing;
}

function centroidRingEnd() {
  centroidPointRing(x00, y00);
}

function centroidPointFirstRing(x, y) {
  centroidStream.point = centroidPointRing;
  centroidPoint(x00 = x0 = x, y00 = y0 = y);
}

function centroidPointRing(x, y) {
  var dx = x - x0,
      dy = y - y0,
      z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(dx * dx + dy * dy);

  X1 += z * (x0 + x) / 2;
  Y1 += z * (y0 + y) / 2;
  Z1 += z;

  z = y0 * x - x0 * y;
  X2 += z * (x0 + x);
  Y2 += z * (y0 + y);
  Z2 += z * 3;
  centroidPoint(x0 = x, y0 = y);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (centroidStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/context.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/context.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PathContext)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");



function PathContext(context) {
  this._context = context;
}

PathContext.prototype = {
  _radius: 4.5,
  pointRadius: function(_) {
    return this._radius = _, this;
  },
  polygonStart: function() {
    this._line = 0;
  },
  polygonEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    if (this._line === 0) this._context.closePath();
    this._point = NaN;
  },
  point: function(x, y) {
    switch (this._point) {
      case 0: {
        this._context.moveTo(x, y);
        this._point = 1;
        break;
      }
      case 1: {
        this._context.lineTo(x, y);
        break;
      }
      default: {
        this._context.moveTo(x + this._radius, y);
        this._context.arc(x, y, this._radius, 0, _math_js__WEBPACK_IMPORTED_MODULE_0__.tau);
        break;
      }
    }
  },
  result: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"]
};


/***/ }),

/***/ "./node_modules/d3-geo/src/path/index.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/path/index.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _area_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./area.js */ "./node_modules/d3-geo/src/path/area.js");
/* harmony import */ var _bounds_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");
/* harmony import */ var _centroid_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./centroid.js */ "./node_modules/d3-geo/src/path/centroid.js");
/* harmony import */ var _context_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./context.js */ "./node_modules/d3-geo/src/path/context.js");
/* harmony import */ var _measure_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./measure.js */ "./node_modules/d3-geo/src/path/measure.js");
/* harmony import */ var _string_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./string.js */ "./node_modules/d3-geo/src/path/string.js");









/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(projection, context) {
  let digits = 3,
      pointRadius = 4.5,
      projectionStream,
      contextStream;

  function path(object) {
    if (object) {
      if (typeof pointRadius === "function") contextStream.pointRadius(+pointRadius.apply(this, arguments));
      (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(contextStream));
    }
    return contextStream.result();
  }

  path.area = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_area_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
    return _area_js__WEBPACK_IMPORTED_MODULE_1__["default"].result();
  };

  path.measure = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_measure_js__WEBPACK_IMPORTED_MODULE_2__["default"]));
    return _measure_js__WEBPACK_IMPORTED_MODULE_2__["default"].result();
  };

  path.bounds = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"]));
    return _bounds_js__WEBPACK_IMPORTED_MODULE_3__["default"].result();
  };

  path.centroid = function(object) {
    (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projectionStream(_centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"]));
    return _centroid_js__WEBPACK_IMPORTED_MODULE_4__["default"].result();
  };

  path.projection = function(_) {
    if (!arguments.length) return projection;
    projectionStream = _ == null ? (projection = null, _identity_js__WEBPACK_IMPORTED_MODULE_5__["default"]) : (projection = _).stream;
    return path;
  };

  path.context = function(_) {
    if (!arguments.length) return context;
    contextStream = _ == null ? (context = null, new _string_js__WEBPACK_IMPORTED_MODULE_6__["default"](digits)) : new _context_js__WEBPACK_IMPORTED_MODULE_7__["default"](context = _);
    if (typeof pointRadius !== "function") contextStream.pointRadius(pointRadius);
    return path;
  };

  path.pointRadius = function(_) {
    if (!arguments.length) return pointRadius;
    pointRadius = typeof _ === "function" ? _ : (contextStream.pointRadius(+_), +_);
    return path;
  };

  path.digits = function(_) {
    if (!arguments.length) return digits;
    if (_ == null) digits = null;
    else {
      const d = Math.floor(_);
      if (!(d >= 0)) throw new RangeError(`invalid digits: ${_}`);
      digits = d;
    }
    if (context === null) contextStream = new _string_js__WEBPACK_IMPORTED_MODULE_6__["default"](digits);
    return path;
  };

  return path.projection(projection).digits(digits).context(context);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/path/measure.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-geo/src/path/measure.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _noop_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../noop.js */ "./node_modules/d3-geo/src/noop.js");




var lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder(),
    lengthRing,
    x00,
    y00,
    x0,
    y0;

var lengthStream = {
  point: _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  lineStart: function() {
    lengthStream.point = lengthPointFirst;
  },
  lineEnd: function() {
    if (lengthRing) lengthPoint(x00, y00);
    lengthStream.point = _noop_js__WEBPACK_IMPORTED_MODULE_1__["default"];
  },
  polygonStart: function() {
    lengthRing = true;
  },
  polygonEnd: function() {
    lengthRing = null;
  },
  result: function() {
    var length = +lengthSum;
    lengthSum = new d3_array__WEBPACK_IMPORTED_MODULE_0__.Adder();
    return length;
  }
};

function lengthPointFirst(x, y) {
  lengthStream.point = lengthPoint;
  x00 = x0 = x, y00 = y0 = y;
}

function lengthPoint(x, y) {
  x0 -= x, y0 -= y;
  lengthSum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_2__.sqrt)(x0 * x0 + y0 * y0));
  x0 = x, y0 = y;
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (lengthStream);


/***/ }),

/***/ "./node_modules/d3-geo/src/path/string.js":
/*!************************************************!*\
  !*** ./node_modules/d3-geo/src/path/string.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ PathString)
/* harmony export */ });
// Simple caching for constant-radius points.
let cacheDigits, cacheAppend, cacheRadius, cacheCircle;

class PathString {
  constructor(digits) {
    this._append = digits == null ? append : appendRound(digits);
    this._radius = 4.5;
    this._ = "";
  }
  pointRadius(_) {
    this._radius = +_;
    return this;
  }
  polygonStart() {
    this._line = 0;
  }
  polygonEnd() {
    this._line = NaN;
  }
  lineStart() {
    this._point = 0;
  }
  lineEnd() {
    if (this._line === 0) this._ += "Z";
    this._point = NaN;
  }
  point(x, y) {
    switch (this._point) {
      case 0: {
        this._append`M${x},${y}`;
        this._point = 1;
        break;
      }
      case 1: {
        this._append`L${x},${y}`;
        break;
      }
      default: {
        this._append`M${x},${y}`;
        if (this._radius !== cacheRadius || this._append !== cacheAppend) {
          const r = this._radius;
          const s = this._;
          this._ = ""; // stash the old string so we can cache the circle path fragment
          this._append`m0,${r}a${r},${r} 0 1,1 0,${-2 * r}a${r},${r} 0 1,1 0,${2 * r}z`;
          cacheRadius = r;
          cacheAppend = this._append;
          cacheCircle = this._;
          this._ = s;
        }
        this._ += cacheCircle;
        break;
      }
    }
  }
  result() {
    const result = this._;
    this._ = "";
    return result.length ? result : null;
  }
}

function append(strings) {
  let i = 1;
  this._ += strings[0];
  for (const j = strings.length; i < j; ++i) {
    this._ += arguments[i] + strings[i];
  }
}

function appendRound(digits) {
  const d = Math.floor(digits);
  if (!(d >= 0)) throw new RangeError(`invalid digits: ${digits}`);
  if (d > 15) return append;
  if (d !== cacheDigits) {
    const k = 10 ** d;
    cacheDigits = d;
    cacheAppend = function append(strings) {
      let i = 1;
      this._ += strings[0];
      for (const j = strings.length; i < j; ++i) {
        this._ += Math.round(arguments[i] * k) / k + strings[i];
      }
    };
  }
  return cacheAppend;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/pointEqual.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-geo/src/pointEqual.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[0] - b[0]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(a[1] - b[1]) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/polygonContains.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-geo/src/polygonContains.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-array */ "./node_modules/d3-array/src/fsum.js");
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");




function longitude(point) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(point[0]) <= _math_js__WEBPACK_IMPORTED_MODULE_0__.pi ? point[0] : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sign)(point[0]) * (((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(point[0]) + _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) % _math_js__WEBPACK_IMPORTED_MODULE_0__.tau - _math_js__WEBPACK_IMPORTED_MODULE_0__.pi);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(polygon, point) {
  var lambda = longitude(point),
      phi = point[1],
      sinPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
      normal = [(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda), -(0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda), 0],
      angle = 0,
      winding = 0;

  var sum = new d3_array__WEBPACK_IMPORTED_MODULE_1__.Adder();

  if (sinPhi === 1) phi = _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;
  else if (sinPhi === -1) phi = -_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi - _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon;

  for (var i = 0, n = polygon.length; i < n; ++i) {
    if (!(m = (ring = polygon[i]).length)) continue;
    var ring,
        m,
        point0 = ring[m - 1],
        lambda0 = longitude(point0),
        phi0 = point0[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi,
        sinPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi0),
        cosPhi0 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi0);

    for (var j = 0; j < m; ++j, lambda0 = lambda1, sinPhi0 = sinPhi1, cosPhi0 = cosPhi1, point0 = point1) {
      var point1 = ring[j],
          lambda1 = longitude(point1),
          phi1 = point1[1] / 2 + _math_js__WEBPACK_IMPORTED_MODULE_0__.quarterPi,
          sinPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi1),
          cosPhi1 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi1),
          delta = lambda1 - lambda0,
          sign = delta >= 0 ? 1 : -1,
          absDelta = sign * delta,
          antimeridian = absDelta > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi,
          k = sinPhi0 * sinPhi1;

      sum.add((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(k * sign * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(absDelta), cosPhi0 * cosPhi1 + k * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(absDelta)));
      angle += antimeridian ? delta + sign * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau : delta;

      // Are the longitudes either side of the point’s meridian (lambda),
      // and are the latitudes smaller than the parallel (phi)?
      if (antimeridian ^ lambda0 >= lambda ^ lambda1 >= lambda) {
        var arc = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianCross)((0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)(point0), (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)(point1));
        (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianNormalizeInPlace)(arc);
        var intersection = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianCross)(normal, arc);
        (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesianNormalizeInPlace)(intersection);
        var phiArc = (antimeridian ^ delta >= 0 ? -1 : 1) * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(intersection[2]);
        if (phi > phiArc || phi === phiArc && (arc[0] || arc[1])) {
          winding += antimeridian ^ delta >= 0 ? 1 : -1;
        }
      }
    }
  }

  // First, determine whether the South pole is inside or outside:
  //
  // It is inside if:
  // * the polygon winds around it in a clockwise direction.
  // * the polygon does not (cumulatively) wind around it, but has a negative
  //   (counter-clockwise) area.
  //
  // Second, count the (signed) number of times a segment crosses a lambda
  // from the point to the South pole.  If it is zero, then the point is the
  // same side as the South pole.

  return (angle < -_math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || angle < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon && sum < -_math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon2) ^ (winding & 1);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/fit.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/fit.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   fitExtent: () => (/* binding */ fitExtent),
/* harmony export */   fitHeight: () => (/* binding */ fitHeight),
/* harmony export */   fitSize: () => (/* binding */ fitSize),
/* harmony export */   fitWidth: () => (/* binding */ fitWidth)
/* harmony export */ });
/* harmony import */ var _stream_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../stream.js */ "./node_modules/d3-geo/src/stream.js");
/* harmony import */ var _path_bounds_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../path/bounds.js */ "./node_modules/d3-geo/src/path/bounds.js");



function fit(projection, fitBounds, object) {
  var clip = projection.clipExtent && projection.clipExtent();
  projection.scale(150).translate([0, 0]);
  if (clip != null) projection.clipExtent(null);
  (0,_stream_js__WEBPACK_IMPORTED_MODULE_0__["default"])(object, projection.stream(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"]));
  fitBounds(_path_bounds_js__WEBPACK_IMPORTED_MODULE_1__["default"].result());
  if (clip != null) projection.clipExtent(clip);
  return projection;
}

function fitExtent(projection, extent, object) {
  return fit(projection, function(b) {
    var w = extent[1][0] - extent[0][0],
        h = extent[1][1] - extent[0][1],
        k = Math.min(w / (b[1][0] - b[0][0]), h / (b[1][1] - b[0][1])),
        x = +extent[0][0] + (w - k * (b[1][0] + b[0][0])) / 2,
        y = +extent[0][1] + (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitSize(projection, size, object) {
  return fitExtent(projection, [[0, 0], size], object);
}

function fitWidth(projection, width, object) {
  return fit(projection, function(b) {
    var w = +width,
        k = w / (b[1][0] - b[0][0]),
        x = (w - k * (b[1][0] + b[0][0])) / 2,
        y = -k * b[0][1];
    projection.scale(150 * k).translate([x, y]);
  }, object);
}

function fitHeight(projection, height, object) {
  return fit(projection, function(b) {
    var h = +height,
        k = h / (b[1][1] - b[0][1]),
        x = -k * b[0][0],
        y = (h - k * (b[1][1] + b[0][1])) / 2;
    projection.scale(150 * k).translate([x, y]);
  }, object);
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/index.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ projection),
/* harmony export */   projectionMutator: () => (/* binding */ projectionMutator)
/* harmony export */ });
/* harmony import */ var _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../clip/antimeridian.js */ "./node_modules/d3-geo/src/clip/antimeridian.js");
/* harmony import */ var _clip_circle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../clip/circle.js */ "./node_modules/d3-geo/src/clip/circle.js");
/* harmony import */ var _clip_rectangle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../clip/rectangle.js */ "./node_modules/d3-geo/src/clip/rectangle.js");
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _identity_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../identity.js */ "./node_modules/d3-geo/src/identity.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");
/* harmony import */ var _fit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./fit.js */ "./node_modules/d3-geo/src/projection/fit.js");
/* harmony import */ var _resample_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./resample.js */ "./node_modules/d3-geo/src/projection/resample.js");











var transformRadians = (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transformer)({
  point: function(x, y) {
    this.stream.point(x * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, y * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians);
  }
});

function transformRotate(rotate) {
  return (0,_transform_js__WEBPACK_IMPORTED_MODULE_0__.transformer)({
    point: function(x, y) {
      var r = rotate(x, y);
      return this.stream.point(r[0], r[1]);
    }
  });
}

function scaleTranslate(k, dx, dy, sx, sy) {
  function transform(x, y) {
    x *= sx; y *= sy;
    return [dx + k * x, dy - k * y];
  }
  transform.invert = function(x, y) {
    return [(x - dx) / k * sx, (dy - y) / k * sy];
  };
  return transform;
}

function scaleTranslateRotate(k, dx, dy, sx, sy, alpha) {
  if (!alpha) return scaleTranslate(k, dx, dy, sx, sy);
  var cosAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.cos)(alpha),
      sinAlpha = (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sin)(alpha),
      a = cosAlpha * k,
      b = sinAlpha * k,
      ai = cosAlpha / k,
      bi = sinAlpha / k,
      ci = (sinAlpha * dy - cosAlpha * dx) / k,
      fi = (sinAlpha * dx + cosAlpha * dy) / k;
  function transform(x, y) {
    x *= sx; y *= sy;
    return [a * x - b * y + dx, dy - b * x - a * y];
  }
  transform.invert = function(x, y) {
    return [sx * (ai * x - bi * y + ci), sy * (fi - bi * x - ai * y)];
  };
  return transform;
}

function projection(project) {
  return projectionMutator(function() { return project; })();
}

function projectionMutator(projectAt) {
  var project,
      k = 150, // scale
      x = 480, y = 250, // translate
      lambda = 0, phi = 0, // center
      deltaLambda = 0, deltaPhi = 0, deltaGamma = 0, rotate, // pre-rotate
      alpha = 0, // post-rotate angle
      sx = 1, // reflectX
      sy = 1, // reflectX
      theta = null, preclip = _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__["default"], // pre-clip angle
      x0 = null, y0, x1, y1, postclip = _identity_js__WEBPACK_IMPORTED_MODULE_3__["default"], // post-clip extent
      delta2 = 0.5, // precision
      projectResample,
      projectTransform,
      projectRotateTransform,
      cache,
      cacheStream;

  function projection(point) {
    return projectRotateTransform(point[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, point[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians);
  }

  function invert(point) {
    point = projectRotateTransform.invert(point[0], point[1]);
    return point && [point[0] * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, point[1] * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  }

  projection.stream = function(stream) {
    return cache && cacheStream === stream ? cache : cache = transformRadians(transformRotate(rotate)(preclip(projectResample(postclip(cacheStream = stream)))));
  };

  projection.preclip = function(_) {
    return arguments.length ? (preclip = _, theta = undefined, reset()) : preclip;
  };

  projection.postclip = function(_) {
    return arguments.length ? (postclip = _, x0 = y0 = x1 = y1 = null, reset()) : postclip;
  };

  projection.clipAngle = function(_) {
    return arguments.length ? (preclip = +_ ? (0,_clip_circle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(theta = _ * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians) : (theta = null, _clip_antimeridian_js__WEBPACK_IMPORTED_MODULE_2__["default"]), reset()) : theta * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees;
  };

  projection.clipExtent = function(_) {
    return arguments.length ? (postclip = _ == null ? (x0 = y0 = x1 = y1 = null, _identity_js__WEBPACK_IMPORTED_MODULE_3__["default"]) : (0,_clip_rectangle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1]), reset()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  projection.scale = function(_) {
    return arguments.length ? (k = +_, recenter()) : k;
  };

  projection.translate = function(_) {
    return arguments.length ? (x = +_[0], y = +_[1], recenter()) : [x, y];
  };

  projection.center = function(_) {
    return arguments.length ? (lambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, phi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, recenter()) : [lambda * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, phi * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  };

  projection.rotate = function(_) {
    return arguments.length ? (deltaLambda = _[0] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, deltaPhi = _[1] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, deltaGamma = _.length > 2 ? _[2] % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians : 0, recenter()) : [deltaLambda * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, deltaPhi * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees, deltaGamma * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees];
  };

  projection.angle = function(_) {
    return arguments.length ? (alpha = _ % 360 * _math_js__WEBPACK_IMPORTED_MODULE_1__.radians, recenter()) : alpha * _math_js__WEBPACK_IMPORTED_MODULE_1__.degrees;
  };

  projection.reflectX = function(_) {
    return arguments.length ? (sx = _ ? -1 : 1, recenter()) : sx < 0;
  };

  projection.reflectY = function(_) {
    return arguments.length ? (sy = _ ? -1 : 1, recenter()) : sy < 0;
  };

  projection.precision = function(_) {
    return arguments.length ? (projectResample = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__["default"])(projectTransform, delta2 = _ * _), reset()) : (0,_math_js__WEBPACK_IMPORTED_MODULE_1__.sqrt)(delta2);
  };

  projection.fitExtent = function(extent, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitExtent)(projection, extent, object);
  };

  projection.fitSize = function(size, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitSize)(projection, size, object);
  };

  projection.fitWidth = function(width, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitWidth)(projection, width, object);
  };

  projection.fitHeight = function(height, object) {
    return (0,_fit_js__WEBPACK_IMPORTED_MODULE_7__.fitHeight)(projection, height, object);
  };

  function recenter() {
    var center = scaleTranslateRotate(k, 0, 0, sx, sy, alpha).apply(null, project(lambda, phi)),
        transform = scaleTranslateRotate(k, x - center[0], y - center[1], sx, sy, alpha);
    rotate = (0,_rotation_js__WEBPACK_IMPORTED_MODULE_8__.rotateRadians)(deltaLambda, deltaPhi, deltaGamma);
    projectTransform = (0,_compose_js__WEBPACK_IMPORTED_MODULE_9__["default"])(project, transform);
    projectRotateTransform = (0,_compose_js__WEBPACK_IMPORTED_MODULE_9__["default"])(rotate, projectTransform);
    projectResample = (0,_resample_js__WEBPACK_IMPORTED_MODULE_6__["default"])(projectTransform, delta2);
    return reset();
  }

  function reset() {
    cache = cacheStream = null;
    return projection;
  }

  return function() {
    project = projectAt.apply(this, arguments);
    projection.invert = project.invert && invert;
    return recenter();
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/mercator.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/mercator.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   mercatorProjection: () => (/* binding */ mercatorProjection),
/* harmony export */   mercatorRaw: () => (/* binding */ mercatorRaw)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _rotation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../rotation.js */ "./node_modules/d3-geo/src/rotation.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-geo/src/projection/index.js");




function mercatorRaw(lambda, phi) {
  return [lambda, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.log)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.tan)((_math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi + phi) / 2))];
}

mercatorRaw.invert = function(x, y) {
  return [x, 2 * (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.exp)(y)) - _math_js__WEBPACK_IMPORTED_MODULE_0__.halfPi];
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return mercatorProjection(mercatorRaw)
      .scale(961 / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau);
}

function mercatorProjection(project) {
  var m = (0,_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(project),
      center = m.center,
      scale = m.scale,
      translate = m.translate,
      clipExtent = m.clipExtent,
      x0 = null, y0, x1, y1; // clip extent

  m.scale = function(_) {
    return arguments.length ? (scale(_), reclip()) : scale();
  };

  m.translate = function(_) {
    return arguments.length ? (translate(_), reclip()) : translate();
  };

  m.center = function(_) {
    return arguments.length ? (center(_), reclip()) : center();
  };

  m.clipExtent = function(_) {
    return arguments.length ? ((_ == null ? x0 = y0 = x1 = y1 = null : (x0 = +_[0][0], y0 = +_[0][1], x1 = +_[1][0], y1 = +_[1][1])), reclip()) : x0 == null ? null : [[x0, y0], [x1, y1]];
  };

  function reclip() {
    var k = _math_js__WEBPACK_IMPORTED_MODULE_0__.pi * scale(),
        t = m((0,_rotation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(m.rotate()).invert([0, 0]));
    return clipExtent(x0 == null
        ? [[t[0] - k, t[1] - k], [t[0] + k, t[1] + k]] : project === mercatorRaw
        ? [[Math.max(t[0] - k, x0), y0], [Math.min(t[0] + k, x1), y1]]
        : [[x0, Math.max(t[1] - k, y0)], [x1, Math.min(t[1] + k, y1)]]);
  }

  return reclip();
}


/***/ }),

/***/ "./node_modules/d3-geo/src/projection/resample.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-geo/src/projection/resample.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _cartesian_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../cartesian.js */ "./node_modules/d3-geo/src/cartesian.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../math.js */ "./node_modules/d3-geo/src/math.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transform.js */ "./node_modules/d3-geo/src/transform.js");




var maxDepth = 16, // maximum depth of subdivision
    cosMinDistance = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(30 * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians); // cos(minimum angular distance)

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(project, delta2) {
  return +delta2 ? resample(project, delta2) : resampleNone(project);
}

function resampleNone(project) {
  return (0,_transform_js__WEBPACK_IMPORTED_MODULE_1__.transformer)({
    point: function(x, y) {
      x = project(x, y);
      this.stream.point(x[0], x[1]);
    }
  });
}

function resample(project, delta2) {

  function resampleLineTo(x0, y0, lambda0, a0, b0, c0, x1, y1, lambda1, a1, b1, c1, depth, stream) {
    var dx = x1 - x0,
        dy = y1 - y0,
        d2 = dx * dx + dy * dy;
    if (d2 > 4 * delta2 && depth--) {
      var a = a0 + a1,
          b = b0 + b1,
          c = c0 + c1,
          m = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sqrt)(a * a + b * b + c * c),
          phi2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(c /= m),
          lambda2 = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(c) - 1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda0 - lambda1) < _math_js__WEBPACK_IMPORTED_MODULE_0__.epsilon ? (lambda0 + lambda1) / 2 : (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(b, a),
          p = project(lambda2, phi2),
          x2 = p[0],
          y2 = p[1],
          dx2 = x2 - x0,
          dy2 = y2 - y0,
          dz = dy * dx2 - dx * dy2;
      if (dz * dz / d2 > delta2 // perpendicular projected distance
          || (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)((dx * dx2 + dy * dy2) / d2 - 0.5) > 0.3 // midpoint close to an end
          || a0 * a1 + b0 * b1 + c0 * c1 < cosMinDistance) { // angular distance
        resampleLineTo(x0, y0, lambda0, a0, b0, c0, x2, y2, lambda2, a /= m, b /= m, c, depth, stream);
        stream.point(x2, y2);
        resampleLineTo(x2, y2, lambda2, a, b, c, x1, y1, lambda1, a1, b1, c1, depth, stream);
      }
    }
  }
  return function(stream) {
    var lambda00, x00, y00, a00, b00, c00, // first point
        lambda0, x0, y0, a0, b0, c0; // previous point

    var resampleStream = {
      point: point,
      lineStart: lineStart,
      lineEnd: lineEnd,
      polygonStart: function() { stream.polygonStart(); resampleStream.lineStart = ringStart; },
      polygonEnd: function() { stream.polygonEnd(); resampleStream.lineStart = lineStart; }
    };

    function point(x, y) {
      x = project(x, y);
      stream.point(x[0], x[1]);
    }

    function lineStart() {
      x0 = NaN;
      resampleStream.point = linePoint;
      stream.lineStart();
    }

    function linePoint(lambda, phi) {
      var c = (0,_cartesian_js__WEBPACK_IMPORTED_MODULE_2__.cartesian)([lambda, phi]), p = project(lambda, phi);
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x0 = p[0], y0 = p[1], lambda0 = lambda, a0 = c[0], b0 = c[1], c0 = c[2], maxDepth, stream);
      stream.point(x0, y0);
    }

    function lineEnd() {
      resampleStream.point = point;
      stream.lineEnd();
    }

    function ringStart() {
      lineStart();
      resampleStream.point = ringPoint;
      resampleStream.lineEnd = ringEnd;
    }

    function ringPoint(lambda, phi) {
      linePoint(lambda00 = lambda, phi), x00 = x0, y00 = y0, a00 = a0, b00 = b0, c00 = c0;
      resampleStream.point = linePoint;
    }

    function ringEnd() {
      resampleLineTo(x0, y0, lambda0, a0, b0, c0, x00, y00, lambda00, a00, b00, c00, maxDepth, stream);
      resampleStream.lineEnd = lineEnd;
      lineEnd();
    }

    return resampleStream;
  };
}


/***/ }),

/***/ "./node_modules/d3-geo/src/rotation.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-geo/src/rotation.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   rotateRadians: () => (/* binding */ rotateRadians)
/* harmony export */ });
/* harmony import */ var _compose_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./compose.js */ "./node_modules/d3-geo/src/compose.js");
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/d3-geo/src/math.js");



function rotationIdentity(lambda, phi) {
  if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) lambda -= Math.round(lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau) * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
  return [lambda, phi];
}

rotationIdentity.invert = rotationIdentity;

function rotateRadians(deltaLambda, deltaPhi, deltaGamma) {
  return (deltaLambda %= _math_js__WEBPACK_IMPORTED_MODULE_0__.tau) ? (deltaPhi || deltaGamma ? (0,_compose_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rotationLambda(deltaLambda), rotationPhiGamma(deltaPhi, deltaGamma))
    : rotationLambda(deltaLambda))
    : (deltaPhi || deltaGamma ? rotationPhiGamma(deltaPhi, deltaGamma)
    : rotationIdentity);
}

function forwardRotationLambda(deltaLambda) {
  return function(lambda, phi) {
    lambda += deltaLambda;
    if ((0,_math_js__WEBPACK_IMPORTED_MODULE_0__.abs)(lambda) > _math_js__WEBPACK_IMPORTED_MODULE_0__.pi) lambda -= Math.round(lambda / _math_js__WEBPACK_IMPORTED_MODULE_0__.tau) * _math_js__WEBPACK_IMPORTED_MODULE_0__.tau;
    return [lambda, phi];
  };
}

function rotationLambda(deltaLambda) {
  var rotation = forwardRotationLambda(deltaLambda);
  rotation.invert = forwardRotationLambda(-deltaLambda);
  return rotation;
}

function rotationPhiGamma(deltaPhi, deltaGamma) {
  var cosDeltaPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(deltaPhi),
      sinDeltaPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(deltaPhi),
      cosDeltaGamma = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(deltaGamma),
      sinDeltaGamma = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(deltaGamma);

  function rotation(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
        y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        k = z * cosDeltaPhi + x * sinDeltaPhi;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y * cosDeltaGamma - k * sinDeltaGamma, x * cosDeltaPhi - z * sinDeltaPhi),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(k * cosDeltaGamma + y * sinDeltaGamma)
    ];
  }

  rotation.invert = function(lambda, phi) {
    var cosPhi = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(phi),
        x = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.cos)(lambda) * cosPhi,
        y = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(lambda) * cosPhi,
        z = (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.sin)(phi),
        k = z * cosDeltaGamma - y * sinDeltaGamma;
    return [
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.atan2)(y * cosDeltaGamma + z * sinDeltaGamma, x * cosDeltaPhi + k * sinDeltaPhi),
      (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.asin)(k * cosDeltaPhi - x * sinDeltaPhi)
    ];
  };

  return rotation;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(rotate) {
  rotate = rotateRadians(rotate[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, rotate[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, rotate.length > 2 ? rotate[2] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians : 0);

  function forward(coordinates) {
    coordinates = rotate(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates;
  }

  forward.invert = function(coordinates) {
    coordinates = rotate.invert(coordinates[0] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians, coordinates[1] * _math_js__WEBPACK_IMPORTED_MODULE_0__.radians);
    return coordinates[0] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates[1] *= _math_js__WEBPACK_IMPORTED_MODULE_0__.degrees, coordinates;
  };

  return forward;
}


/***/ }),

/***/ "./node_modules/d3-geo/src/stream.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-geo/src/stream.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function streamGeometry(geometry, stream) {
  if (geometry && streamGeometryType.hasOwnProperty(geometry.type)) {
    streamGeometryType[geometry.type](geometry, stream);
  }
}

var streamObjectType = {
  Feature: function(object, stream) {
    streamGeometry(object.geometry, stream);
  },
  FeatureCollection: function(object, stream) {
    var features = object.features, i = -1, n = features.length;
    while (++i < n) streamGeometry(features[i].geometry, stream);
  }
};

var streamGeometryType = {
  Sphere: function(object, stream) {
    stream.sphere();
  },
  Point: function(object, stream) {
    object = object.coordinates;
    stream.point(object[0], object[1], object[2]);
  },
  MultiPoint: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) object = coordinates[i], stream.point(object[0], object[1], object[2]);
  },
  LineString: function(object, stream) {
    streamLine(object.coordinates, stream, 0);
  },
  MultiLineString: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamLine(coordinates[i], stream, 0);
  },
  Polygon: function(object, stream) {
    streamPolygon(object.coordinates, stream);
  },
  MultiPolygon: function(object, stream) {
    var coordinates = object.coordinates, i = -1, n = coordinates.length;
    while (++i < n) streamPolygon(coordinates[i], stream);
  },
  GeometryCollection: function(object, stream) {
    var geometries = object.geometries, i = -1, n = geometries.length;
    while (++i < n) streamGeometry(geometries[i], stream);
  }
};

function streamLine(coordinates, stream, closed) {
  var i = -1, n = coordinates.length - closed, coordinate;
  stream.lineStart();
  while (++i < n) coordinate = coordinates[i], stream.point(coordinate[0], coordinate[1], coordinate[2]);
  stream.lineEnd();
}

function streamPolygon(coordinates, stream) {
  var i = -1, n = coordinates.length;
  stream.polygonStart();
  while (++i < n) streamLine(coordinates[i], stream, 1);
  stream.polygonEnd();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(object, stream) {
  if (object && streamObjectType.hasOwnProperty(object.type)) {
    streamObjectType[object.type](object, stream);
  } else {
    streamGeometry(object, stream);
  }
}


/***/ }),

/***/ "./node_modules/d3-geo/src/transform.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-geo/src/transform.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   transformer: () => (/* binding */ transformer)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(methods) {
  return {
    stream: transformer(methods)
  };
}

function transformer(methods) {
  return function(stream) {
    var s = new TransformStream;
    for (var key in methods) s[key] = methods[key];
    s.stream = stream;
    return s;
  };
}

function TransformStream() {}

TransformStream.prototype = {
  constructor: TransformStream,
  point: function(x, y) { this.stream.point(x, y); },
  sphere: function() { this.stream.sphere(); },
  lineStart: function() { this.stream.lineStart(); },
  lineEnd: function() { this.stream.lineEnd(); },
  polygonStart: function() { this.stream.polygonStart(); },
  polygonEnd: function() { this.stream.polygonEnd(); }
};


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basis.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basis.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   basis: () => (/* binding */ basis),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function basis(t1, v0, v1, v2, v3) {
  var t2 = t1 * t1, t3 = t2 * t1;
  return ((1 - 3 * t1 + 3 * t2 - t3) * v0
      + (4 - 6 * t2 + 3 * t3) * v1
      + (1 + 3 * t1 + 3 * t2 - 3 * t3) * v2
      + t3 * v3) / 6;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length - 1;
  return function(t) {
    var i = t <= 0 ? (t = 0) : t >= 1 ? (t = 1, n - 1) : Math.floor(t * n),
        v1 = values[i],
        v2 = values[i + 1],
        v0 = i > 0 ? values[i - 1] : 2 * v1 - v2,
        v3 = i < n - 1 ? values[i + 2] : 2 * v2 - v1;
    return basis((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/basisClosed.js":
/*!********************************************************!*\
  !*** ./node_modules/d3-interpolate/src/basisClosed.js ***!
  \********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(values) {
  var n = values.length;
  return function(t) {
    var i = Math.floor(((t %= 1) < 0 ? ++t : t) * n),
        v0 = values[(i + n - 1) % n],
        v1 = values[i % n],
        v2 = values[(i + 1) % n],
        v3 = values[(i + 2) % n];
    return (0,_basis_js__WEBPACK_IMPORTED_MODULE_0__.basis)((t - i / n) * n, v0, v1, v2, v3);
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/color.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-interpolate/src/color.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ nogamma),
/* harmony export */   gamma: () => (/* binding */ gamma),
/* harmony export */   hue: () => (/* binding */ hue)
/* harmony export */ });
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-interpolate/src/constant.js");


function linear(a, d) {
  return function(t) {
    return a + t * d;
  };
}

function exponential(a, b, y) {
  return a = Math.pow(a, y), b = Math.pow(b, y) - a, y = 1 / y, function(t) {
    return Math.pow(a + t * b, y);
  };
}

function hue(a, b) {
  var d = b - a;
  return d ? linear(a, d > 180 || d < -180 ? d - 360 * Math.round(d / 360) : d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}

function gamma(y) {
  return (y = +y) === 1 ? nogamma : function(a, b) {
    return b - a ? exponential(a, b, y) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
  };
}

function nogamma(a, b) {
  var d = b - a;
  return d ? linear(a, d) : (0,_constant_js__WEBPACK_IMPORTED_MODULE_0__["default"])(isNaN(a) ? b : a);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/constant.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-interpolate/src/constant.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/number.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/number.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  return a = +a, b = +b, function(t) {
    return a * (1 - t) + b * t;
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/rgb.js":
/*!************************************************!*\
  !*** ./node_modules/d3-interpolate/src/rgb.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   rgbBasis: () => (/* binding */ rgbBasis),
/* harmony export */   rgbBasisClosed: () => (/* binding */ rgbBasisClosed)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var _basis_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./basis.js */ "./node_modules/d3-interpolate/src/basis.js");
/* harmony import */ var _basisClosed_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./basisClosed.js */ "./node_modules/d3-interpolate/src/basisClosed.js");
/* harmony import */ var _color_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./color.js */ "./node_modules/d3-interpolate/src/color.js");





/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function rgbGamma(y) {
  var color = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__.gamma)(y);

  function rgb(start, end) {
    var r = color((start = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(start)).r, (end = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(end)).r),
        g = color(start.g, end.g),
        b = color(start.b, end.b),
        opacity = (0,_color_js__WEBPACK_IMPORTED_MODULE_0__["default"])(start.opacity, end.opacity);
    return function(t) {
      start.r = r(t);
      start.g = g(t);
      start.b = b(t);
      start.opacity = opacity(t);
      return start + "";
    };
  }

  rgb.gamma = rgbGamma;

  return rgb;
})(1));

function rgbSpline(spline) {
  return function(colors) {
    var n = colors.length,
        r = new Array(n),
        g = new Array(n),
        b = new Array(n),
        i, color;
    for (i = 0; i < n; ++i) {
      color = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__.rgb)(colors[i]);
      r[i] = color.r || 0;
      g[i] = color.g || 0;
      b[i] = color.b || 0;
    }
    r = spline(r);
    g = spline(g);
    b = spline(b);
    color.opacity = 1;
    return function(t) {
      color.r = r(t);
      color.g = g(t);
      color.b = b(t);
      return color + "";
    };
  };
}

var rgbBasis = rgbSpline(_basis_js__WEBPACK_IMPORTED_MODULE_2__["default"]);
var rgbBasisClosed = rgbSpline(_basisClosed_js__WEBPACK_IMPORTED_MODULE_3__["default"]);


/***/ }),

/***/ "./node_modules/d3-interpolate/src/string.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-interpolate/src/string.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./number.js */ "./node_modules/d3-interpolate/src/number.js");


var reA = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g,
    reB = new RegExp(reA.source, "g");

function zero(b) {
  return function() {
    return b;
  };
}

function one(b) {
  return function(t) {
    return b(t) + "";
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var bi = reA.lastIndex = reB.lastIndex = 0, // scan index for next number in b
      am, // current match in a
      bm, // current match in b
      bs, // string preceding current number in b, if any
      i = -1, // index in s
      s = [], // string constants and placeholders
      q = []; // number interpolators

  // Coerce inputs to strings.
  a = a + "", b = b + "";

  // Interpolate pairs of numbers in a & b.
  while ((am = reA.exec(a))
      && (bm = reB.exec(b))) {
    if ((bs = bm.index) > bi) { // a string precedes the next number in b
      bs = b.slice(bi, bs);
      if (s[i]) s[i] += bs; // coalesce with previous string
      else s[++i] = bs;
    }
    if ((am = am[0]) === (bm = bm[0])) { // numbers in a & b match
      if (s[i]) s[i] += bm; // coalesce with previous string
      else s[++i] = bm;
    } else { // interpolate non-matching numbers
      s[++i] = null;
      q.push({i: i, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(am, bm)});
    }
    bi = reB.lastIndex;
  }

  // Add remains of b.
  if (bi < b.length) {
    bs = b.slice(bi);
    if (s[i]) s[i] += bs; // coalesce with previous string
    else s[++i] = bs;
  }

  // Special optimization for only a single match.
  // Otherwise, interpolate each of the numbers and rejoin the string.
  return s.length < 2 ? (q[0]
      ? one(q[0].x)
      : zero(b))
      : (b = q.length, function(t) {
          for (var i = 0, o; i < b; ++i) s[(o = q[i]).i] = o.x(t);
          return s.join("");
        });
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/decompose.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/decompose.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   identity: () => (/* binding */ identity)
/* harmony export */ });
var degrees = 180 / Math.PI;

var identity = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b, c, d, e, f) {
  var scaleX, scaleY, skewX;
  if (scaleX = Math.sqrt(a * a + b * b)) a /= scaleX, b /= scaleX;
  if (skewX = a * c + b * d) c -= a * skewX, d -= b * skewX;
  if (scaleY = Math.sqrt(c * c + d * d)) c /= scaleY, d /= scaleY, skewX /= scaleY;
  if (a * d < b * c) a = -a, b = -b, skewX = -skewX, scaleX = -scaleX;
  return {
    translateX: e,
    translateY: f,
    rotate: Math.atan2(b, a) * degrees,
    skewX: Math.atan(skewX) * degrees,
    scaleX: scaleX,
    scaleY: scaleY
  };
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   interpolateTransformCss: () => (/* binding */ interpolateTransformCss),
/* harmony export */   interpolateTransformSvg: () => (/* binding */ interpolateTransformSvg)
/* harmony export */ });
/* harmony import */ var _number_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../number.js */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var _parse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./parse.js */ "./node_modules/d3-interpolate/src/transform/parse.js");



function interpolateTransform(parse, pxComma, pxParen, degParen) {

  function pop(s) {
    return s.length ? s.pop() + " " : "";
  }

  function translate(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push("translate(", null, pxComma, null, pxParen);
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb || yb) {
      s.push("translate(" + xb + pxComma + yb + pxParen);
    }
  }

  function rotate(a, b, s, q) {
    if (a !== b) {
      if (a - b > 180) b += 360; else if (b - a > 180) a += 360; // shortest path
      q.push({i: s.push(pop(s) + "rotate(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "rotate(" + b + degParen);
    }
  }

  function skewX(a, b, s, q) {
    if (a !== b) {
      q.push({i: s.push(pop(s) + "skewX(", null, degParen) - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(a, b)});
    } else if (b) {
      s.push(pop(s) + "skewX(" + b + degParen);
    }
  }

  function scale(xa, ya, xb, yb, s, q) {
    if (xa !== xb || ya !== yb) {
      var i = s.push(pop(s) + "scale(", null, ",", null, ")");
      q.push({i: i - 4, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(xa, xb)}, {i: i - 2, x: (0,_number_js__WEBPACK_IMPORTED_MODULE_0__["default"])(ya, yb)});
    } else if (xb !== 1 || yb !== 1) {
      s.push(pop(s) + "scale(" + xb + "," + yb + ")");
    }
  }

  return function(a, b) {
    var s = [], // string constants and placeholders
        q = []; // number interpolators
    a = parse(a), b = parse(b);
    translate(a.translateX, a.translateY, b.translateX, b.translateY, s, q);
    rotate(a.rotate, b.rotate, s, q);
    skewX(a.skewX, b.skewX, s, q);
    scale(a.scaleX, a.scaleY, b.scaleX, b.scaleY, s, q);
    a = b = null; // gc
    return function(t) {
      var i = -1, n = q.length, o;
      while (++i < n) s[(o = q[i]).i] = o.x(t);
      return s.join("");
    };
  };
}

var interpolateTransformCss = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseCss, "px, ", "px)", "deg)");
var interpolateTransformSvg = interpolateTransform(_parse_js__WEBPACK_IMPORTED_MODULE_1__.parseSvg, ", ", ")", ")");


/***/ }),

/***/ "./node_modules/d3-interpolate/src/transform/parse.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-interpolate/src/transform/parse.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   parseCss: () => (/* binding */ parseCss),
/* harmony export */   parseSvg: () => (/* binding */ parseSvg)
/* harmony export */ });
/* harmony import */ var _decompose_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./decompose.js */ "./node_modules/d3-interpolate/src/transform/decompose.js");


var svgNode;

/* eslint-disable no-undef */
function parseCss(value) {
  const m = new (typeof DOMMatrix === "function" ? DOMMatrix : WebKitCSSMatrix)(value + "");
  return m.isIdentity ? _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity : (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(m.a, m.b, m.c, m.d, m.e, m.f);
}

function parseSvg(value) {
  if (value == null) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  if (!svgNode) svgNode = document.createElementNS("http://www.w3.org/2000/svg", "g");
  svgNode.setAttribute("transform", value);
  if (!(value = svgNode.transform.baseVal.consolidate())) return _decompose_js__WEBPACK_IMPORTED_MODULE_0__.identity;
  value = value.matrix;
  return (0,_decompose_js__WEBPACK_IMPORTED_MODULE_0__["default"])(value.a, value.b, value.c, value.d, value.e, value.f);
}


/***/ }),

/***/ "./node_modules/d3-interpolate/src/zoom.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-interpolate/src/zoom.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var epsilon2 = 1e-12;

function cosh(x) {
  return ((x = Math.exp(x)) + 1 / x) / 2;
}

function sinh(x) {
  return ((x = Math.exp(x)) - 1 / x) / 2;
}

function tanh(x) {
  return ((x = Math.exp(2 * x)) - 1) / (x + 1);
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((function zoomRho(rho, rho2, rho4) {

  // p0 = [ux0, uy0, w0]
  // p1 = [ux1, uy1, w1]
  function zoom(p0, p1) {
    var ux0 = p0[0], uy0 = p0[1], w0 = p0[2],
        ux1 = p1[0], uy1 = p1[1], w1 = p1[2],
        dx = ux1 - ux0,
        dy = uy1 - uy0,
        d2 = dx * dx + dy * dy,
        i,
        S;

    // Special case for u0 ≅ u1.
    if (d2 < epsilon2) {
      S = Math.log(w1 / w0) / rho;
      i = function(t) {
        return [
          ux0 + t * dx,
          uy0 + t * dy,
          w0 * Math.exp(rho * t * S)
        ];
      }
    }

    // General case.
    else {
      var d1 = Math.sqrt(d2),
          b0 = (w1 * w1 - w0 * w0 + rho4 * d2) / (2 * w0 * rho2 * d1),
          b1 = (w1 * w1 - w0 * w0 - rho4 * d2) / (2 * w1 * rho2 * d1),
          r0 = Math.log(Math.sqrt(b0 * b0 + 1) - b0),
          r1 = Math.log(Math.sqrt(b1 * b1 + 1) - b1);
      S = (r1 - r0) / rho;
      i = function(t) {
        var s = t * S,
            coshr0 = cosh(r0),
            u = w0 / (rho2 * d1) * (coshr0 * tanh(rho * s + r0) - sinh(r0));
        return [
          ux0 + u * dx,
          uy0 + u * dy,
          w0 * coshr0 / cosh(rho * s + r0)
        ];
      }
    }

    i.duration = S * 1000 * rho / Math.SQRT2;

    return i;
  }

  zoom.rho = function(_) {
    var _1 = Math.max(1e-3, +_), _2 = _1 * _1, _4 = _2 * _2;
    return zoomRho(_1, _2, _4);
  };

  return zoom;
})(Math.SQRT2, 2, 4));


/***/ }),

/***/ "./node_modules/d3-selection/src/array.js":
/*!************************************************!*\
  !*** ./node_modules/d3-selection/src/array.js ***!
  \************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ array)
/* harmony export */ });
// Given something array like (or null), returns something that is strictly an
// array. This is used to ensure that array-like objects passed to d3.selectAll
// or selection.selectAll are converted into proper arrays when creating a
// selection; we don’t ever want to create a selection backed by a live
// HTMLCollection or NodeList. However, note that selection.selectAll will use a
// static NodeList as a group, since it safely derived from querySelectorAll.
function array(x) {
  return x == null ? [] : Array.isArray(x) ? x : Array.from(x);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/constant.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/constant.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(x) {
  return function() {
    return x;
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/creator.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/creator.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./namespace.js */ "./node_modules/d3-selection/src/namespace.js");
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ "./node_modules/d3-selection/src/namespaces.js");



function creatorInherit(name) {
  return function() {
    var document = this.ownerDocument,
        uri = this.namespaceURI;
    return uri === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml && document.documentElement.namespaceURI === _namespaces_js__WEBPACK_IMPORTED_MODULE_0__.xhtml
        ? document.createElement(name)
        : document.createElementNS(uri, name);
  };
}

function creatorFixed(fullname) {
  return function() {
    return this.ownerDocument.createElementNS(fullname.space, fullname.local);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_1__["default"])(name);
  return (fullname.local
      ? creatorFixed
      : creatorInherit)(fullname);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/matcher.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/matcher.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   childMatcher: () => (/* binding */ childMatcher),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return function() {
    return this.matches(selector);
  };
}

function childMatcher(selector) {
  return function(node) {
    return node.matches(selector);
  };
}



/***/ }),

/***/ "./node_modules/d3-selection/src/namespace.js":
/*!****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespace.js ***!
  \****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespaces_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./namespaces.js */ "./node_modules/d3-selection/src/namespaces.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var prefix = name += "", i = prefix.indexOf(":");
  if (i >= 0 && (prefix = name.slice(0, i)) !== "xmlns") name = name.slice(i + 1);
  return _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"].hasOwnProperty(prefix) ? {space: _namespaces_js__WEBPACK_IMPORTED_MODULE_0__["default"][prefix], local: name} : name; // eslint-disable-line no-prototype-builtins
}


/***/ }),

/***/ "./node_modules/d3-selection/src/namespaces.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-selection/src/namespaces.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   xhtml: () => (/* binding */ xhtml)
/* harmony export */ });
var xhtml = "http://www.w3.org/1999/xhtml";

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  svg: "http://www.w3.org/2000/svg",
  xhtml: xhtml,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
});


/***/ }),

/***/ "./node_modules/d3-selection/src/pointer.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-selection/src/pointer.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./sourceEvent.js */ "./node_modules/d3-selection/src/sourceEvent.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event, node) {
  event = (0,_sourceEvent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(event);
  if (node === undefined) node = event.currentTarget;
  if (node) {
    var svg = node.ownerSVGElement || node;
    if (svg.createSVGPoint) {
      var point = svg.createSVGPoint();
      point.x = event.clientX, point.y = event.clientY;
      point = point.matrixTransform(node.getScreenCTM().inverse());
      return [point.x, point.y];
    }
    if (node.getBoundingClientRect) {
      var rect = node.getBoundingClientRect();
      return [event.clientX - rect.left - node.clientLeft, event.clientY - rect.top - node.clientTop];
    }
  }
  return [event.pageX, event.pageY];
}


/***/ }),

/***/ "./node_modules/d3-selection/src/select.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/select.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return typeof selector === "string"
      ? new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[document.querySelector(selector)]], [document.documentElement])
      : new _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.Selection([[selector]], _selection_index_js__WEBPACK_IMPORTED_MODULE_0__.root);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/append.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/append.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "./node_modules/d3-selection/src/creator.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var create = typeof name === "function" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return this.select(function() {
    return this.appendChild(create.apply(this, arguments));
  });
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/attr.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/attr.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _namespace_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../namespace.js */ "./node_modules/d3-selection/src/namespace.js");


function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, value) {
  return function() {
    this.setAttribute(name, value);
  };
}

function attrConstantNS(fullname, value) {
  return function() {
    this.setAttributeNS(fullname.space, fullname.local, value);
  };
}

function attrFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttribute(name);
    else this.setAttribute(name, v);
  };
}

function attrFunctionNS(fullname, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.removeAttributeNS(fullname.space, fullname.local);
    else this.setAttributeNS(fullname.space, fullname.local, v);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var fullname = (0,_namespace_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name);

  if (arguments.length < 2) {
    var node = this.node();
    return fullname.local
        ? node.getAttributeNS(fullname.space, fullname.local)
        : node.getAttribute(fullname);
  }

  return this.each((value == null
      ? (fullname.local ? attrRemoveNS : attrRemove) : (typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)
      : (fullname.local ? attrConstantNS : attrConstant)))(fullname, value));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/call.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/call.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var callback = arguments[0];
  arguments[0] = this;
  callback.apply(null, arguments);
  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/classed.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/classed.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function classArray(string) {
  return string.trim().split(/^|\s+/);
}

function classList(node) {
  return node.classList || new ClassList(node);
}

function ClassList(node) {
  this._node = node;
  this._names = classArray(node.getAttribute("class") || "");
}

ClassList.prototype = {
  add: function(name) {
    var i = this._names.indexOf(name);
    if (i < 0) {
      this._names.push(name);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  remove: function(name) {
    var i = this._names.indexOf(name);
    if (i >= 0) {
      this._names.splice(i, 1);
      this._node.setAttribute("class", this._names.join(" "));
    }
  },
  contains: function(name) {
    return this._names.indexOf(name) >= 0;
  }
};

function classedAdd(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.add(names[i]);
}

function classedRemove(node, names) {
  var list = classList(node), i = -1, n = names.length;
  while (++i < n) list.remove(names[i]);
}

function classedTrue(names) {
  return function() {
    classedAdd(this, names);
  };
}

function classedFalse(names) {
  return function() {
    classedRemove(this, names);
  };
}

function classedFunction(names, value) {
  return function() {
    (value.apply(this, arguments) ? classedAdd : classedRemove)(this, names);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var names = classArray(name + "");

  if (arguments.length < 2) {
    var list = classList(this.node()), i = -1, n = names.length;
    while (++i < n) if (!list.contains(names[i])) return false;
    return true;
  }

  return this.each((typeof value === "function"
      ? classedFunction : value
      ? classedTrue
      : classedFalse)(names, value));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/clone.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/clone.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function selection_cloneShallow() {
  var clone = this.cloneNode(false), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

function selection_cloneDeep() {
  var clone = this.cloneNode(true), parent = this.parentNode;
  return parent ? parent.insertBefore(clone, this.nextSibling) : clone;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(deep) {
  return this.select(deep ? selection_cloneDeep : selection_cloneShallow);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/data.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/data.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./enter.js */ "./node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constant.js */ "./node_modules/d3-selection/src/constant.js");




function bindIndex(parent, group, enter, update, exit, data) {
  var i = 0,
      node,
      groupLength = group.length,
      dataLength = data.length;

  // Put any non-null nodes that fit into update.
  // Put any null nodes into enter.
  // Put any remaining data into enter.
  for (; i < dataLength; ++i) {
    if (node = group[i]) {
      node.__data__ = data[i];
      update[i] = node;
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);
    }
  }

  // Put any non-null nodes that don’t fit into exit.
  for (; i < groupLength; ++i) {
    if (node = group[i]) {
      exit[i] = node;
    }
  }
}

function bindKey(parent, group, enter, update, exit, data, key) {
  var i,
      node,
      nodeByKeyValue = new Map,
      groupLength = group.length,
      dataLength = data.length,
      keyValues = new Array(groupLength),
      keyValue;

  // Compute the key for each node.
  // If multiple nodes have the same key, the duplicates are added to exit.
  for (i = 0; i < groupLength; ++i) {
    if (node = group[i]) {
      keyValues[i] = keyValue = key.call(node, node.__data__, i, group) + "";
      if (nodeByKeyValue.has(keyValue)) {
        exit[i] = node;
      } else {
        nodeByKeyValue.set(keyValue, node);
      }
    }
  }

  // Compute the key for each datum.
  // If there a node associated with this key, join and add it to update.
  // If there is not (or the key is a duplicate), add it to enter.
  for (i = 0; i < dataLength; ++i) {
    keyValue = key.call(parent, data[i], i, data) + "";
    if (node = nodeByKeyValue.get(keyValue)) {
      update[i] = node;
      node.__data__ = data[i];
      nodeByKeyValue.delete(keyValue);
    } else {
      enter[i] = new _enter_js__WEBPACK_IMPORTED_MODULE_0__.EnterNode(parent, data[i]);
    }
  }

  // Add any remaining nodes that were not bound to data to exit.
  for (i = 0; i < groupLength; ++i) {
    if ((node = group[i]) && (nodeByKeyValue.get(keyValues[i]) === node)) {
      exit[i] = node;
    }
  }
}

function datum(node) {
  return node.__data__;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value, key) {
  if (!arguments.length) return Array.from(this, datum);

  var bind = key ? bindKey : bindIndex,
      parents = this._parents,
      groups = this._groups;

  if (typeof value !== "function") value = (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(value);

  for (var m = groups.length, update = new Array(m), enter = new Array(m), exit = new Array(m), j = 0; j < m; ++j) {
    var parent = parents[j],
        group = groups[j],
        groupLength = group.length,
        data = arraylike(value.call(parent, parent && parent.__data__, j, parents)),
        dataLength = data.length,
        enterGroup = enter[j] = new Array(dataLength),
        updateGroup = update[j] = new Array(dataLength),
        exitGroup = exit[j] = new Array(groupLength);

    bind(parent, group, enterGroup, updateGroup, exitGroup, data, key);

    // Now connect the enter nodes to their following update node, such that
    // appendChild can insert the materialized enter node before this node,
    // rather than at the end of the parent node.
    for (var i0 = 0, i1 = 0, previous, next; i0 < dataLength; ++i0) {
      if (previous = enterGroup[i0]) {
        if (i0 >= i1) i1 = i0 + 1;
        while (!(next = updateGroup[i1]) && ++i1 < dataLength);
        previous._next = next || null;
      }
    }
  }

  update = new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(update, parents);
  update._enter = enter;
  update._exit = exit;
  return update;
}

// Given some data, this returns an array-like view of it: an object that
// exposes a length property and allows numeric indexing. Note that unlike
// selectAll, this isn’t worried about “live” collections because the resulting
// array will only be used briefly while data is being bound. (It is possible to
// cause the data to change while iterating by using a key function, but please
// don’t; we’d rather avoid a gratuitous copy.)
function arraylike(data) {
  return typeof data === "object" && "length" in data
    ? data // Array, TypedArray, NodeList, array-like
    : Array.from(data); // Map, Set, iterable, string, or anything else
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/datum.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/datum.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.property("__data__", value)
      : this.node().__data__;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/dispatch.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/dispatch.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "./node_modules/d3-selection/src/window.js");


function dispatchEvent(node, type, params) {
  var window = (0,_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node),
      event = window.CustomEvent;

  if (typeof event === "function") {
    event = new event(type, params);
  } else {
    event = window.document.createEvent("Event");
    if (params) event.initEvent(type, params.bubbles, params.cancelable), event.detail = params.detail;
    else event.initEvent(type, false, false);
  }

  node.dispatchEvent(event);
}

function dispatchConstant(type, params) {
  return function() {
    return dispatchEvent(this, type, params);
  };
}

function dispatchFunction(type, params) {
  return function() {
    return dispatchEvent(this, type, params.apply(this, arguments));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(type, params) {
  return this.each((typeof params === "function"
      ? dispatchFunction
      : dispatchConstant)(type, params));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/each.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/each.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback) {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) callback.call(node, node.__data__, i, group);
    }
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/empty.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/empty.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return !this.node();
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/enter.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/enter.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   EnterNode: () => (/* binding */ EnterNode),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ "./node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._enter || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__["default"]), this._parents);
}

function EnterNode(parent, datum) {
  this.ownerDocument = parent.ownerDocument;
  this.namespaceURI = parent.namespaceURI;
  this._next = null;
  this._parent = parent;
  this.__data__ = datum;
}

EnterNode.prototype = {
  constructor: EnterNode,
  appendChild: function(child) { return this._parent.insertBefore(child, this._next); },
  insertBefore: function(child, next) { return this._parent.insertBefore(child, next); },
  querySelector: function(selector) { return this._parent.querySelector(selector); },
  querySelectorAll: function(selector) { return this._parent.querySelectorAll(selector); }
};


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/exit.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/exit.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _sparse_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sparse.js */ "./node_modules/d3-selection/src/selection/sparse.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(this._exit || this._groups.map(_sparse_js__WEBPACK_IMPORTED_MODULE_1__["default"]), this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/filter.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/filter.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  if (typeof match !== "function") match = (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__["default"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/html.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/html.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function htmlRemove() {
  this.innerHTML = "";
}

function htmlConstant(value) {
  return function() {
    this.innerHTML = value;
  };
}

function htmlFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.innerHTML = v == null ? "" : v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.each(value == null
          ? htmlRemove : (typeof value === "function"
          ? htmlFunction
          : htmlConstant)(value))
      : this.node().innerHTML;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Selection: () => (/* binding */ Selection),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   root: () => (/* binding */ root)
/* harmony export */ });
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./select.js */ "./node_modules/d3-selection/src/selection/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./selectAll.js */ "./node_modules/d3-selection/src/selection/selectAll.js");
/* harmony import */ var _selectChild_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectChild.js */ "./node_modules/d3-selection/src/selection/selectChild.js");
/* harmony import */ var _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./selectChildren.js */ "./node_modules/d3-selection/src/selection/selectChildren.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./filter.js */ "./node_modules/d3-selection/src/selection/filter.js");
/* harmony import */ var _data_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./data.js */ "./node_modules/d3-selection/src/selection/data.js");
/* harmony import */ var _enter_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./enter.js */ "./node_modules/d3-selection/src/selection/enter.js");
/* harmony import */ var _exit_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./exit.js */ "./node_modules/d3-selection/src/selection/exit.js");
/* harmony import */ var _join_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./join.js */ "./node_modules/d3-selection/src/selection/join.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./merge.js */ "./node_modules/d3-selection/src/selection/merge.js");
/* harmony import */ var _order_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./order.js */ "./node_modules/d3-selection/src/selection/order.js");
/* harmony import */ var _sort_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./sort.js */ "./node_modules/d3-selection/src/selection/sort.js");
/* harmony import */ var _call_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./call.js */ "./node_modules/d3-selection/src/selection/call.js");
/* harmony import */ var _nodes_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./nodes.js */ "./node_modules/d3-selection/src/selection/nodes.js");
/* harmony import */ var _node_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./node.js */ "./node_modules/d3-selection/src/selection/node.js");
/* harmony import */ var _size_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./size.js */ "./node_modules/d3-selection/src/selection/size.js");
/* harmony import */ var _empty_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./empty.js */ "./node_modules/d3-selection/src/selection/empty.js");
/* harmony import */ var _each_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./each.js */ "./node_modules/d3-selection/src/selection/each.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./attr.js */ "./node_modules/d3-selection/src/selection/attr.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./style.js */ "./node_modules/d3-selection/src/selection/style.js");
/* harmony import */ var _property_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./property.js */ "./node_modules/d3-selection/src/selection/property.js");
/* harmony import */ var _classed_js__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./classed.js */ "./node_modules/d3-selection/src/selection/classed.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./text.js */ "./node_modules/d3-selection/src/selection/text.js");
/* harmony import */ var _html_js__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./html.js */ "./node_modules/d3-selection/src/selection/html.js");
/* harmony import */ var _raise_js__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./raise.js */ "./node_modules/d3-selection/src/selection/raise.js");
/* harmony import */ var _lower_js__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./lower.js */ "./node_modules/d3-selection/src/selection/lower.js");
/* harmony import */ var _append_js__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./append.js */ "./node_modules/d3-selection/src/selection/append.js");
/* harmony import */ var _insert_js__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ./insert.js */ "./node_modules/d3-selection/src/selection/insert.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-selection/src/selection/remove.js");
/* harmony import */ var _clone_js__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ./clone.js */ "./node_modules/d3-selection/src/selection/clone.js");
/* harmony import */ var _datum_js__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ./datum.js */ "./node_modules/d3-selection/src/selection/datum.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./on.js */ "./node_modules/d3-selection/src/selection/on.js");
/* harmony import */ var _dispatch_js__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ./dispatch.js */ "./node_modules/d3-selection/src/selection/dispatch.js");
/* harmony import */ var _iterator_js__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! ./iterator.js */ "./node_modules/d3-selection/src/selection/iterator.js");



































var root = [null];

function Selection(groups, parents) {
  this._groups = groups;
  this._parents = parents;
}

function selection() {
  return new Selection([[document.documentElement]], root);
}

function selection_selection() {
  return this;
}

Selection.prototype = selection.prototype = {
  constructor: Selection,
  select: _select_js__WEBPACK_IMPORTED_MODULE_0__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectChild: _selectChild_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  selectChildren: _selectChildren_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  data: _data_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  enter: _enter_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  exit: _exit_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  join: _join_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  selection: selection_selection,
  order: _order_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  sort: _sort_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  call: _call_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  nodes: _nodes_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  node: _node_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  size: _size_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  empty: _empty_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  each: _each_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  property: _property_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  classed: _classed_js__WEBPACK_IMPORTED_MODULE_21__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_22__["default"],
  html: _html_js__WEBPACK_IMPORTED_MODULE_23__["default"],
  raise: _raise_js__WEBPACK_IMPORTED_MODULE_24__["default"],
  lower: _lower_js__WEBPACK_IMPORTED_MODULE_25__["default"],
  append: _append_js__WEBPACK_IMPORTED_MODULE_26__["default"],
  insert: _insert_js__WEBPACK_IMPORTED_MODULE_27__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_28__["default"],
  clone: _clone_js__WEBPACK_IMPORTED_MODULE_29__["default"],
  datum: _datum_js__WEBPACK_IMPORTED_MODULE_30__["default"],
  on: _on_js__WEBPACK_IMPORTED_MODULE_31__["default"],
  dispatch: _dispatch_js__WEBPACK_IMPORTED_MODULE_32__["default"],
  [Symbol.iterator]: _iterator_js__WEBPACK_IMPORTED_MODULE_33__["default"]
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (selection);


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/insert.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/insert.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _creator_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../creator.js */ "./node_modules/d3-selection/src/creator.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selector.js */ "./node_modules/d3-selection/src/selector.js");



function constantNull() {
  return null;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, before) {
  var create = typeof name === "function" ? name : (0,_creator_js__WEBPACK_IMPORTED_MODULE_0__["default"])(name),
      select = before == null ? constantNull : typeof before === "function" ? before : (0,_selector_js__WEBPACK_IMPORTED_MODULE_1__["default"])(before);
  return this.select(function() {
    return this.insertBefore(create.apply(this, arguments), select.apply(this, arguments) || null);
  });
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/iterator.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/iterator.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function* __WEBPACK_DEFAULT_EXPORT__() {
  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length, node; i < n; ++i) {
      if (node = group[i]) yield node;
    }
  }
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/join.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/join.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(onenter, onupdate, onexit) {
  var enter = this.enter(), update = this, exit = this.exit();
  if (typeof onenter === "function") {
    enter = onenter(enter);
    if (enter) enter = enter.selection();
  } else {
    enter = enter.append(onenter + "");
  }
  if (onupdate != null) {
    update = onupdate(update);
    if (update) update = update.selection();
  }
  if (onexit == null) exit.remove(); else onexit(exit);
  return enter && update ? enter.merge(update).order() : update;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/lower.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/lower.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function lower() {
  if (this.previousSibling) this.parentNode.insertBefore(this, this.parentNode.firstChild);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(lower);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/merge.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/merge.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(context) {
  var selection = context.selection ? context.selection() : context;

  for (var groups0 = this._groups, groups1 = selection._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(merges, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/node.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/node.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {

  for (var groups = this._groups, j = 0, m = groups.length; j < m; ++j) {
    for (var group = groups[j], i = 0, n = group.length; i < n; ++i) {
      var node = group[i];
      if (node) return node;
    }
  }

  return null;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/nodes.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/nodes.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return Array.from(this);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/on.js":
/*!*******************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/on.js ***!
  \*******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function contextListener(listener) {
  return function(event) {
    listener.call(this, event, this.__data__);
  };
}

function parseTypenames(typenames) {
  return typenames.trim().split(/^|\s+/).map(function(t) {
    var name = "", i = t.indexOf(".");
    if (i >= 0) name = t.slice(i + 1), t = t.slice(0, i);
    return {type: t, name: name};
  });
}

function onRemove(typename) {
  return function() {
    var on = this.__on;
    if (!on) return;
    for (var j = 0, i = -1, m = on.length, o; j < m; ++j) {
      if (o = on[j], (!typename.type || o.type === typename.type) && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
      } else {
        on[++i] = o;
      }
    }
    if (++i) on.length = i;
    else delete this.__on;
  };
}

function onAdd(typename, value, options) {
  return function() {
    var on = this.__on, o, listener = contextListener(value);
    if (on) for (var j = 0, m = on.length; j < m; ++j) {
      if ((o = on[j]).type === typename.type && o.name === typename.name) {
        this.removeEventListener(o.type, o.listener, o.options);
        this.addEventListener(o.type, o.listener = listener, o.options = options);
        o.value = value;
        return;
      }
    }
    this.addEventListener(typename.type, listener, options);
    o = {type: typename.type, name: typename.name, value: value, listener: listener, options: options};
    if (!on) this.__on = [o];
    else on.push(o);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(typename, value, options) {
  var typenames = parseTypenames(typename + ""), i, n = typenames.length, t;

  if (arguments.length < 2) {
    var on = this.node().__on;
    if (on) for (var j = 0, m = on.length, o; j < m; ++j) {
      for (i = 0, o = on[j]; i < n; ++i) {
        if ((t = typenames[i]).type === o.type && t.name === o.name) {
          return o.value;
        }
      }
    }
    return;
  }

  on = value ? onAdd : onRemove;
  for (i = 0; i < n; ++i) this.each(on(typenames[i], value, options));
  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/order.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/order.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {

  for (var groups = this._groups, j = -1, m = groups.length; ++j < m;) {
    for (var group = groups[j], i = group.length - 1, next = group[i], node; --i >= 0;) {
      if (node = group[i]) {
        if (next && node.compareDocumentPosition(next) ^ 4) next.parentNode.insertBefore(node, next);
        next = node;
      }
    }
  }

  return this;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/property.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/property.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function propertyRemove(name) {
  return function() {
    delete this[name];
  };
}

function propertyConstant(name, value) {
  return function() {
    this[name] = value;
  };
}

function propertyFunction(name, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) delete this[name];
    else this[name] = v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  return arguments.length > 1
      ? this.each((value == null
          ? propertyRemove : typeof value === "function"
          ? propertyFunction
          : propertyConstant)(name, value))
      : this.node()[name];
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/raise.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/raise.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function raise() {
  if (this.nextSibling) this.parentNode.appendChild(this);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(raise);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/remove.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/remove.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function remove() {
  var parent = this.parentNode;
  if (parent) parent.removeChild(this);
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.each(remove);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/select.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/select.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _selector_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selector.js */ "./node_modules/d3-selection/src/selector.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  if (typeof select !== "function") select = (0,_selector_js__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Selection(subgroups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectAll.js":
/*!**************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectAll.js ***!
  \**************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _array_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../array.js */ "./node_modules/d3-selection/src/array.js");
/* harmony import */ var _selectorAll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../selectorAll.js */ "./node_modules/d3-selection/src/selectorAll.js");




function arrayAll(select) {
  return function() {
    return (0,_array_js__WEBPACK_IMPORTED_MODULE_0__["default"])(select.apply(this, arguments));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  if (typeof select === "function") select = arrayAll(select);
  else select = (0,_selectorAll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        subgroups.push(select.call(node, node.__data__, i, group));
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Selection(subgroups, parents);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChild.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChild.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");


var find = Array.prototype.find;

function childFind(match) {
  return function() {
    return find.call(this.children, match);
  };
}

function childFirst() {
  return this.firstElementChild;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  return this.select(match == null ? childFirst
      : childFind(typeof match === "function" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/selectChildren.js":
/*!*******************************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/selectChildren.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _matcher_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../matcher.js */ "./node_modules/d3-selection/src/matcher.js");


var filter = Array.prototype.filter;

function children() {
  return Array.from(this.children);
}

function childrenFilter(match) {
  return function() {
    return filter.call(this.children, match);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  return this.selectAll(match == null ? children
      : childrenFilter(typeof match === "function" ? match : (0,_matcher_js__WEBPACK_IMPORTED_MODULE_0__.childMatcher)(match)));
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/size.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/size.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  let size = 0;
  for (const node of this) ++size; // eslint-disable-line no-unused-vars
  return size;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sort.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sort.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-selection/src/selection/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(compare) {
  if (!compare) compare = ascending;

  function compareNode(a, b) {
    return a && b ? compare(a.__data__, b.__data__) : !a - !b;
  }

  for (var groups = this._groups, m = groups.length, sortgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, sortgroup = sortgroups[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        sortgroup[i] = node;
      }
    }
    sortgroup.sort(compareNode);
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Selection(sortgroups, this._parents).order();
}

function ascending(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/sparse.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/sparse.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(update) {
  return new Array(update.length);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/style.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/style.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   styleValue: () => (/* binding */ styleValue)
/* harmony export */ });
/* harmony import */ var _window_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../window.js */ "./node_modules/d3-selection/src/window.js");


function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, value, priority) {
  return function() {
    this.style.setProperty(name, value, priority);
  };
}

function styleFunction(name, value, priority) {
  return function() {
    var v = value.apply(this, arguments);
    if (v == null) this.style.removeProperty(name);
    else this.style.setProperty(name, v, priority);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  return arguments.length > 1
      ? this.each((value == null
            ? styleRemove : typeof value === "function"
            ? styleFunction
            : styleConstant)(name, value, priority == null ? "" : priority))
      : styleValue(this.node(), name);
}

function styleValue(node, name) {
  return node.style.getPropertyValue(name)
      || (0,_window_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).getComputedStyle(node, null).getPropertyValue(name);
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selection/text.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-selection/src/selection/text.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function textRemove() {
  this.textContent = "";
}

function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var v = value.apply(this, arguments);
    this.textContent = v == null ? "" : v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return arguments.length
      ? this.each(value == null
          ? textRemove : (typeof value === "function"
          ? textFunction
          : textConstant)(value))
      : this.node().textContent;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selector.js":
/*!***************************************************!*\
  !*** ./node_modules/d3-selection/src/selector.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function none() {}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? none : function() {
    return this.querySelector(selector);
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/selectorAll.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/selectorAll.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function empty() {
  return [];
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(selector) {
  return selector == null ? empty : function() {
    return this.querySelectorAll(selector);
  };
}


/***/ }),

/***/ "./node_modules/d3-selection/src/sourceEvent.js":
/*!******************************************************!*\
  !*** ./node_modules/d3-selection/src/sourceEvent.js ***!
  \******************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {
  let sourceEvent;
  while (sourceEvent = event.sourceEvent) event = sourceEvent;
  return event;
}


/***/ }),

/***/ "./node_modules/d3-selection/src/window.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-selection/src/window.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node) {
  return (node.ownerDocument && node.ownerDocument.defaultView) // node is a Node
      || (node.document && node) // node is a Window
      || node.defaultView; // node is a Document
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timeout.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-timer/src/timeout.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ "./node_modules/d3-timer/src/timer.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(callback, delay, time) {
  var t = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer;
  delay = delay == null ? 0 : +delay;
  t.restart(elapsed => {
    t.stop();
    callback(elapsed + delay);
  }, delay, time);
  return t;
}


/***/ }),

/***/ "./node_modules/d3-timer/src/timer.js":
/*!********************************************!*\
  !*** ./node_modules/d3-timer/src/timer.js ***!
  \********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Timer: () => (/* binding */ Timer),
/* harmony export */   now: () => (/* binding */ now),
/* harmony export */   timer: () => (/* binding */ timer),
/* harmony export */   timerFlush: () => (/* binding */ timerFlush)
/* harmony export */ });
var frame = 0, // is an animation frame pending?
    timeout = 0, // is a timeout pending?
    interval = 0, // are any timers active?
    pokeDelay = 1000, // how frequently we check for clock skew
    taskHead,
    taskTail,
    clockLast = 0,
    clockNow = 0,
    clockSkew = 0,
    clock = typeof performance === "object" && performance.now ? performance : Date,
    setFrame = typeof window === "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(f) { setTimeout(f, 17); };

function now() {
  return clockNow || (setFrame(clearNow), clockNow = clock.now() + clockSkew);
}

function clearNow() {
  clockNow = 0;
}

function Timer() {
  this._call =
  this._time =
  this._next = null;
}

Timer.prototype = timer.prototype = {
  constructor: Timer,
  restart: function(callback, delay, time) {
    if (typeof callback !== "function") throw new TypeError("callback is not a function");
    time = (time == null ? now() : +time) + (delay == null ? 0 : +delay);
    if (!this._next && taskTail !== this) {
      if (taskTail) taskTail._next = this;
      else taskHead = this;
      taskTail = this;
    }
    this._call = callback;
    this._time = time;
    sleep();
  },
  stop: function() {
    if (this._call) {
      this._call = null;
      this._time = Infinity;
      sleep();
    }
  }
};

function timer(callback, delay, time) {
  var t = new Timer;
  t.restart(callback, delay, time);
  return t;
}

function timerFlush() {
  now(); // Get the current time, if not already set.
  ++frame; // Pretend we’ve set an alarm, if we haven’t already.
  var t = taskHead, e;
  while (t) {
    if ((e = clockNow - t._time) >= 0) t._call.call(undefined, e);
    t = t._next;
  }
  --frame;
}

function wake() {
  clockNow = (clockLast = clock.now()) + clockSkew;
  frame = timeout = 0;
  try {
    timerFlush();
  } finally {
    frame = 0;
    nap();
    clockNow = 0;
  }
}

function poke() {
  var now = clock.now(), delay = now - clockLast;
  if (delay > pokeDelay) clockSkew -= delay, clockLast = now;
}

function nap() {
  var t0, t1 = taskHead, t2, time = Infinity;
  while (t1) {
    if (t1._call) {
      if (time > t1._time) time = t1._time;
      t0 = t1, t1 = t1._next;
    } else {
      t2 = t1._next, t1._next = null;
      t1 = t0 ? t0._next = t2 : taskHead = t2;
    }
  }
  taskTail = t0;
  sleep(time);
}

function sleep(time) {
  if (frame) return; // Soonest alarm already set, or will be.
  if (timeout) timeout = clearTimeout(timeout);
  var delay = time - clockNow; // Strictly less than if we recomputed clockNow.
  if (delay > 24) {
    if (time < Infinity) timeout = setTimeout(wake, time - clock.now() - clockSkew);
    if (interval) interval = clearInterval(interval);
  } else {
    if (!interval) clockLast = clock.now(), interval = setInterval(poke, pokeDelay);
    frame = 1, setFrame(wake);
  }
}


/***/ }),

/***/ "./node_modules/d3-transition/src/active.js":
/*!**************************************************!*\
  !*** ./node_modules/d3-transition/src/active.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");



var root = [null];

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name) {
  var schedules = node.__transition,
      schedule,
      i;

  if (schedules) {
    name = name == null ? null : name + "";
    for (i in schedules) {
      if ((schedule = schedules[i]).state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.SCHEDULED && schedule.name === name) {
        return new _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition([[node]], root, name, +i);
      }
    }
  }

  return null;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/index.js":
/*!*************************************************!*\
  !*** ./node_modules/d3-transition/src/index.js ***!
  \*************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   active: () => (/* reexport safe */ _active_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   interrupt: () => (/* reexport safe */ _interrupt_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   transition: () => (/* reexport safe */ _transition_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _selection_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./selection/index.js */ "./node_modules/d3-transition/src/selection/index.js");
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _active_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./active.js */ "./node_modules/d3-transition/src/active.js");
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interrupt.js */ "./node_modules/d3-transition/src/interrupt.js");






/***/ }),

/***/ "./node_modules/d3-transition/src/interrupt.js":
/*!*****************************************************!*\
  !*** ./node_modules/d3-transition/src/interrupt.js ***!
  \*****************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name) {
  var schedules = node.__transition,
      schedule,
      active,
      empty = true,
      i;

  if (!schedules) return;

  name = name == null ? null : name + "";

  for (i in schedules) {
    if ((schedule = schedules[i]).name !== name) { empty = false; continue; }
    active = schedule.state > _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.STARTING && schedule.state < _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDING;
    schedule.state = _transition_schedule_js__WEBPACK_IMPORTED_MODULE_0__.ENDED;
    schedule.timer.stop();
    schedule.on.call(active ? "interrupt" : "cancel", node, node.__data__, schedule.index, schedule.group);
    delete schedules[i];
  }

  if (empty) delete node.__transition;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./interrupt.js */ "./node_modules/d3-transition/src/selection/interrupt.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./transition.js */ "./node_modules/d3-transition/src/selection/transition.js");




d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.interrupt = _interrupt_js__WEBPACK_IMPORTED_MODULE_1__["default"];
d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.transition = _transition_js__WEBPACK_IMPORTED_MODULE_2__["default"];


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/interrupt.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/interrupt.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _interrupt_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../interrupt.js */ "./node_modules/d3-transition/src/interrupt.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  return this.each(function() {
    (0,_interrupt_js__WEBPACK_IMPORTED_MODULE_0__["default"])(this, name);
  });
}


/***/ }),

/***/ "./node_modules/d3-transition/src/selection/transition.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/selection/transition.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _transition_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../transition/index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../transition/schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var d3_ease__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-ease */ "./node_modules/d3-ease/src/cubic.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");





var defaultTiming = {
  time: null, // Set on use.
  delay: 0,
  duration: 250,
  ease: d3_ease__WEBPACK_IMPORTED_MODULE_0__.cubicInOut
};

function inherit(node, id) {
  var timing;
  while (!(timing = node.__transition) || !(timing = timing[id])) {
    if (!(node = node.parentNode)) {
      throw new Error(`transition ${id} not found`);
    }
  }
  return timing;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name) {
  var id,
      timing;

  if (name instanceof _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition) {
    id = name._id, name = name._name;
  } else {
    id = (0,_transition_index_js__WEBPACK_IMPORTED_MODULE_1__.newId)(), (timing = defaultTiming).time = (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__.now)(), name = name == null ? null : name + "";
  }

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        (0,_transition_schedule_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node, name, id, i, group, timing || inherit(node, id));
      }
    }
  }

  return new _transition_index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(groups, this._parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attr.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attr.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/namespace.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-transition/src/transition/interpolate.js");





function attrRemove(name) {
  return function() {
    this.removeAttribute(name);
  };
}

function attrRemoveNS(fullname) {
  return function() {
    this.removeAttributeNS(fullname.space, fullname.local);
  };
}

function attrConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttribute(name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrConstantNS(fullname, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = this.getAttributeNS(fullname.space, fullname.local);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function attrFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttribute(name);
    string0 = this.getAttribute(name);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function attrFunctionNS(fullname, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0, value1 = value(this), string1;
    if (value1 == null) return void this.removeAttributeNS(fullname.space, fullname.local);
    string0 = this.getAttributeNS(fullname.space, fullname.local);
    string1 = value1 + "";
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(name), i = fullname === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_1__.interpolateTransformSvg : _interpolate_js__WEBPACK_IMPORTED_MODULE_2__["default"];
  return this.attrTween(name, typeof value === "function"
      ? (fullname.local ? attrFunctionNS : attrFunction)(fullname, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_3__.tweenValue)(this, "attr." + name, value))
      : value == null ? (fullname.local ? attrRemoveNS : attrRemove)(fullname)
      : (fullname.local ? attrConstantNS : attrConstant)(fullname, i, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/attrTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/attrTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/namespace.js");


function attrInterpolate(name, i) {
  return function(t) {
    this.setAttribute(name, i.call(this, t));
  };
}

function attrInterpolateNS(fullname, i) {
  return function(t) {
    this.setAttributeNS(fullname.space, fullname.local, i.call(this, t));
  };
}

function attrTweenNS(fullname, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolateNS(fullname, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

function attrTween(name, value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && attrInterpolate(name, i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var key = "attr." + name;
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  var fullname = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(name);
  return this.tween(key, (fullname.local ? attrTweenNS : attrTween)(fullname, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/delay.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/delay.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function delayFunction(id, value) {
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = +value.apply(this, arguments);
  };
}

function delayConstant(id, value) {
  return value = +value, function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.init)(this, id).delay = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? delayFunction
          : delayConstant)(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).delay;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/duration.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/duration.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function durationFunction(id, value) {
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = +value.apply(this, arguments);
  };
}

function durationConstant(id, value) {
  return value = +value, function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).duration = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each((typeof value === "function"
          ? durationFunction
          : durationConstant)(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).duration;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/ease.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/ease.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function easeConstant(id, value) {
  if (typeof value !== "function") throw new Error;
  return function() {
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = value;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var id = this._id;

  return arguments.length
      ? this.each(easeConstant(id, value))
      : (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).ease;
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/easeVarying.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/easeVarying.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function easeVarying(id, value) {
  return function() {
    var v = value.apply(this, arguments);
    if (typeof v !== "function") throw new Error;
    (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id).ease = v;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  if (typeof value !== "function") throw new Error;
  return this.each(easeVarying(this._id, value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/end.js":
/*!**********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/end.js ***!
  \**********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var on0, on1, that = this, id = that._id, size = that.size();
  return new Promise(function(resolve, reject) {
    var cancel = {value: reject},
        end = {value: function() { if (--size === 0) resolve(); }};

    that.each(function() {
      var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
          on = schedule.on;

      // If this node shared a dispatch with the previous node,
      // just assign the updated shared dispatch and we’re done!
      // Otherwise, copy-on-write.
      if (on !== on0) {
        on1 = (on0 = on).copy();
        on1._.cancel.push(cancel);
        on1._.interrupt.push(cancel);
        on1._.end.push(end);
      }

      schedule.on = on1;
    });

    // The selection was empty, resolve end immediately
    if (size === 0) resolve();
  });
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/filter.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/filter.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/matcher.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(match) {
  if (typeof match !== "function") match = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(match);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = [], node, i = 0; i < n; ++i) {
      if ((node = group[i]) && match.call(node, node.__data__, i, group)) {
        subgroup.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_1__.Transition(subgroups, this._parents, this._name, this._id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/index.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transition: () => (/* binding */ Transition),
/* harmony export */   "default": () => (/* binding */ transition),
/* harmony export */   newId: () => (/* binding */ newId)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");
/* harmony import */ var _attr_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./attr.js */ "./node_modules/d3-transition/src/transition/attr.js");
/* harmony import */ var _attrTween_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./attrTween.js */ "./node_modules/d3-transition/src/transition/attrTween.js");
/* harmony import */ var _delay_js__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./delay.js */ "./node_modules/d3-transition/src/transition/delay.js");
/* harmony import */ var _duration_js__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./duration.js */ "./node_modules/d3-transition/src/transition/duration.js");
/* harmony import */ var _ease_js__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./ease.js */ "./node_modules/d3-transition/src/transition/ease.js");
/* harmony import */ var _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./easeVarying.js */ "./node_modules/d3-transition/src/transition/easeVarying.js");
/* harmony import */ var _filter_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./filter.js */ "./node_modules/d3-transition/src/transition/filter.js");
/* harmony import */ var _merge_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./merge.js */ "./node_modules/d3-transition/src/transition/merge.js");
/* harmony import */ var _on_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./on.js */ "./node_modules/d3-transition/src/transition/on.js");
/* harmony import */ var _remove_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./remove.js */ "./node_modules/d3-transition/src/transition/remove.js");
/* harmony import */ var _select_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./select.js */ "./node_modules/d3-transition/src/transition/select.js");
/* harmony import */ var _selectAll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./selectAll.js */ "./node_modules/d3-transition/src/transition/selectAll.js");
/* harmony import */ var _selection_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./selection.js */ "./node_modules/d3-transition/src/transition/selection.js");
/* harmony import */ var _style_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./style.js */ "./node_modules/d3-transition/src/transition/style.js");
/* harmony import */ var _styleTween_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./styleTween.js */ "./node_modules/d3-transition/src/transition/styleTween.js");
/* harmony import */ var _text_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./text.js */ "./node_modules/d3-transition/src/transition/text.js");
/* harmony import */ var _textTween_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./textTween.js */ "./node_modules/d3-transition/src/transition/textTween.js");
/* harmony import */ var _transition_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./transition.js */ "./node_modules/d3-transition/src/transition/transition.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _end_js__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./end.js */ "./node_modules/d3-transition/src/transition/end.js");






















var id = 0;

function Transition(groups, parents, name, id) {
  this._groups = groups;
  this._parents = parents;
  this._name = name;
  this._id = id;
}

function transition(name) {
  return (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])().transition(name);
}

function newId() {
  return ++id;
}

var selection_prototype = d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype;

Transition.prototype = transition.prototype = {
  constructor: Transition,
  select: _select_js__WEBPACK_IMPORTED_MODULE_1__["default"],
  selectAll: _selectAll_js__WEBPACK_IMPORTED_MODULE_2__["default"],
  selectChild: selection_prototype.selectChild,
  selectChildren: selection_prototype.selectChildren,
  filter: _filter_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  merge: _merge_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  selection: _selection_js__WEBPACK_IMPORTED_MODULE_5__["default"],
  transition: _transition_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  call: selection_prototype.call,
  nodes: selection_prototype.nodes,
  node: selection_prototype.node,
  size: selection_prototype.size,
  empty: selection_prototype.empty,
  each: selection_prototype.each,
  on: _on_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  attr: _attr_js__WEBPACK_IMPORTED_MODULE_8__["default"],
  attrTween: _attrTween_js__WEBPACK_IMPORTED_MODULE_9__["default"],
  style: _style_js__WEBPACK_IMPORTED_MODULE_10__["default"],
  styleTween: _styleTween_js__WEBPACK_IMPORTED_MODULE_11__["default"],
  text: _text_js__WEBPACK_IMPORTED_MODULE_12__["default"],
  textTween: _textTween_js__WEBPACK_IMPORTED_MODULE_13__["default"],
  remove: _remove_js__WEBPACK_IMPORTED_MODULE_14__["default"],
  tween: _tween_js__WEBPACK_IMPORTED_MODULE_15__["default"],
  delay: _delay_js__WEBPACK_IMPORTED_MODULE_16__["default"],
  duration: _duration_js__WEBPACK_IMPORTED_MODULE_17__["default"],
  ease: _ease_js__WEBPACK_IMPORTED_MODULE_18__["default"],
  easeVarying: _easeVarying_js__WEBPACK_IMPORTED_MODULE_19__["default"],
  end: _end_js__WEBPACK_IMPORTED_MODULE_20__["default"],
  [Symbol.iterator]: selection_prototype[Symbol.iterator]
};


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/interpolate.js":
/*!******************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/interpolate.js ***!
  \******************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_color__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-color */ "./node_modules/d3-color/src/color.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/number.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/rgb.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/string.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(a, b) {
  var c;
  return (typeof b === "number" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_0__["default"]
      : b instanceof d3_color__WEBPACK_IMPORTED_MODULE_1__["default"] ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["default"]
      : (c = (0,d3_color__WEBPACK_IMPORTED_MODULE_1__["default"])(b)) ? (b = c, d3_interpolate__WEBPACK_IMPORTED_MODULE_2__["default"])
      : d3_interpolate__WEBPACK_IMPORTED_MODULE_3__["default"])(a, b);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/merge.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/merge.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");


/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(transition) {
  if (transition._id !== this._id) throw new Error;

  for (var groups0 = this._groups, groups1 = transition._groups, m0 = groups0.length, m1 = groups1.length, m = Math.min(m0, m1), merges = new Array(m0), j = 0; j < m; ++j) {
    for (var group0 = groups0[j], group1 = groups1[j], n = group0.length, merge = merges[j] = new Array(n), node, i = 0; i < n; ++i) {
      if (node = group0[i] || group1[i]) {
        merge[i] = node;
      }
    }
  }

  for (; j < m0; ++j) {
    merges[j] = groups0[j];
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(merges, this._parents, this._name, this._id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/on.js":
/*!*********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/on.js ***!
  \*********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function start(name) {
  return (name + "").trim().split(/^|\s+/).every(function(t) {
    var i = t.indexOf(".");
    if (i >= 0) t = t.slice(0, i);
    return !t || t === "start";
  });
}

function onFunction(id, name, listener) {
  var on0, on1, sit = start(name) ? _schedule_js__WEBPACK_IMPORTED_MODULE_0__.init : _schedule_js__WEBPACK_IMPORTED_MODULE_0__.set;
  return function() {
    var schedule = sit(this, id),
        on = schedule.on;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0) (on1 = (on0 = on).copy()).on(name, listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, listener) {
  var id = this._id;

  return arguments.length < 2
      ? (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).on.on(name)
      : this.each(onFunction(id, name, listener));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/remove.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/remove.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function removeFunction(id) {
  return function() {
    var parent = this.parentNode;
    for (var i in this.__transition) if (+i !== id) return;
    if (parent) parent.removeChild(this);
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return this.on("end.remove", removeFunction(this._id));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/schedule.js":
/*!***************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/schedule.js ***!
  \***************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   CREATED: () => (/* binding */ CREATED),
/* harmony export */   ENDED: () => (/* binding */ ENDED),
/* harmony export */   ENDING: () => (/* binding */ ENDING),
/* harmony export */   RUNNING: () => (/* binding */ RUNNING),
/* harmony export */   SCHEDULED: () => (/* binding */ SCHEDULED),
/* harmony export */   STARTED: () => (/* binding */ STARTED),
/* harmony export */   STARTING: () => (/* binding */ STARTING),
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   get: () => (/* binding */ get),
/* harmony export */   init: () => (/* binding */ init),
/* harmony export */   set: () => (/* binding */ set)
/* harmony export */ });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/src/dispatch.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timer.js");
/* harmony import */ var d3_timer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-timer */ "./node_modules/d3-timer/src/timeout.js");



var emptyOn = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_0__["default"])("start", "end", "cancel", "interrupt");
var emptyTween = [];

var CREATED = 0;
var SCHEDULED = 1;
var STARTING = 2;
var STARTED = 3;
var RUNNING = 4;
var ENDING = 5;
var ENDED = 6;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(node, name, id, index, group, timing) {
  var schedules = node.__transition;
  if (!schedules) node.__transition = {};
  else if (id in schedules) return;
  create(node, id, {
    name: name,
    index: index, // For context during callback.
    group: group, // For context during callback.
    on: emptyOn,
    tween: emptyTween,
    time: timing.time,
    delay: timing.delay,
    duration: timing.duration,
    ease: timing.ease,
    timer: null,
    state: CREATED
  });
}

function init(node, id) {
  var schedule = get(node, id);
  if (schedule.state > CREATED) throw new Error("too late; already scheduled");
  return schedule;
}

function set(node, id) {
  var schedule = get(node, id);
  if (schedule.state > STARTED) throw new Error("too late; already running");
  return schedule;
}

function get(node, id) {
  var schedule = node.__transition;
  if (!schedule || !(schedule = schedule[id])) throw new Error("transition not found");
  return schedule;
}

function create(node, id, self) {
  var schedules = node.__transition,
      tween;

  // Initialize the self timer when the transition is created.
  // Note the actual delay is not known until the first callback!
  schedules[id] = self;
  self.timer = (0,d3_timer__WEBPACK_IMPORTED_MODULE_1__.timer)(schedule, 0, self.time);

  function schedule(elapsed) {
    self.state = SCHEDULED;
    self.timer.restart(start, self.delay, self.time);

    // If the elapsed delay is less than our first sleep, start immediately.
    if (self.delay <= elapsed) start(elapsed - self.delay);
  }

  function start(elapsed) {
    var i, j, n, o;

    // If the state is not SCHEDULED, then we previously errored on start.
    if (self.state !== SCHEDULED) return stop();

    for (i in schedules) {
      o = schedules[i];
      if (o.name !== self.name) continue;

      // While this element already has a starting transition during this frame,
      // defer starting an interrupting transition until that transition has a
      // chance to tick (and possibly end); see d3/d3-transition#54!
      if (o.state === STARTED) return (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(start);

      // Interrupt the active transition, if any.
      if (o.state === RUNNING) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("interrupt", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }

      // Cancel any pre-empted transitions.
      else if (+i < id) {
        o.state = ENDED;
        o.timer.stop();
        o.on.call("cancel", node, node.__data__, o.index, o.group);
        delete schedules[i];
      }
    }

    // Defer the first tick to end of the current frame; see d3/d3#1576.
    // Note the transition may be canceled after start and before the first tick!
    // Note this must be scheduled before the start event; see d3/d3-transition#16!
    // Assuming this is successful, subsequent callbacks go straight to tick.
    (0,d3_timer__WEBPACK_IMPORTED_MODULE_2__["default"])(function() {
      if (self.state === STARTED) {
        self.state = RUNNING;
        self.timer.restart(tick, self.delay, self.time);
        tick(elapsed);
      }
    });

    // Dispatch the start event.
    // Note this must be done before the tween are initialized.
    self.state = STARTING;
    self.on.call("start", node, node.__data__, self.index, self.group);
    if (self.state !== STARTING) return; // interrupted
    self.state = STARTED;

    // Initialize the tween, deleting null tween.
    tween = new Array(n = self.tween.length);
    for (i = 0, j = -1; i < n; ++i) {
      if (o = self.tween[i].value.call(node, node.__data__, self.index, self.group)) {
        tween[++j] = o;
      }
    }
    tween.length = j + 1;
  }

  function tick(elapsed) {
    var t = elapsed < self.duration ? self.ease.call(null, elapsed / self.duration) : (self.timer.restart(stop), self.state = ENDING, 1),
        i = -1,
        n = tween.length;

    while (++i < n) {
      tween[i].call(node, t);
    }

    // Dispatch the end event.
    if (self.state === ENDING) {
      self.on.call("end", node, node.__data__, self.index, self.group);
      stop();
    }
  }

  function stop() {
    self.state = ENDED;
    self.timer.stop();
    delete schedules[id];
    for (var i in schedules) return; // eslint-disable-line no-unused-vars
    delete node.__transition;
  }
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/select.js":
/*!*************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/select.js ***!
  \*************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selector.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = new Array(m), j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, subgroup = subgroups[j] = new Array(n), node, subnode, i = 0; i < n; ++i) {
      if ((node = group[i]) && (subnode = select.call(node, node.__data__, i, group))) {
        if ("__data__" in node) subnode.__data__ = node.__data__;
        subgroup[i] = subnode;
        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(subgroup[i], name, id, i, subgroup, (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id));
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, this._parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selectAll.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selectAll.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selectorAll.js");
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");




/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(select) {
  var name = this._name,
      id = this._id;

  if (typeof select !== "function") select = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"])(select);

  for (var groups = this._groups, m = groups.length, subgroups = [], parents = [], j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        for (var children = select.call(node, node.__data__, i, group), child, inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id), k = 0, l = children.length; k < l; ++k) {
          if (child = children[k]) {
            (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(child, name, id, k, children, inherit);
          }
        }
        subgroups.push(children);
        parents.push(node);
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_2__.Transition(subgroups, parents, name, id);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/selection.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/selection.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/index.js");


var Selection = d3_selection__WEBPACK_IMPORTED_MODULE_0__["default"].prototype.constructor;

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  return new Selection(this._groups, this._parents);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/style.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/style.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/transform/index.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/selection/style.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");
/* harmony import */ var _interpolate_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./interpolate.js */ "./node_modules/d3-transition/src/transition/interpolate.js");






function styleNull(name, interpolate) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),
        string1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, string10 = string1);
  };
}

function styleRemove(name) {
  return function() {
    this.style.removeProperty(name);
  };
}

function styleConstant(name, interpolate, value1) {
  var string00,
      string1 = value1 + "",
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name);
    return string0 === string1 ? null
        : string0 === string00 ? interpolate0
        : interpolate0 = interpolate(string00 = string0, value1);
  };
}

function styleFunction(name, interpolate, value) {
  var string00,
      string10,
      interpolate0;
  return function() {
    var string0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name),
        value1 = value(this),
        string1 = value1 + "";
    if (value1 == null) string1 = value1 = (this.style.removeProperty(name), (0,d3_selection__WEBPACK_IMPORTED_MODULE_0__.styleValue)(this, name));
    return string0 === string1 ? null
        : string0 === string00 && string1 === string10 ? interpolate0
        : (string10 = string1, interpolate0 = interpolate(string00 = string0, value1));
  };
}

function styleMaybeRemove(id, name) {
  var on0, on1, listener0, key = "style." + name, event = "end." + key, remove;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.set)(this, id),
        on = schedule.on,
        listener = schedule.value[key] == null ? remove || (remove = styleRemove(name)) : undefined;

    // If this node shared a dispatch with the previous node,
    // just assign the updated shared dispatch and we’re done!
    // Otherwise, copy-on-write.
    if (on !== on0 || listener0 !== listener) (on1 = (on0 = on).copy()).on(event, listener0 = listener);

    schedule.on = on1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  var i = (name += "") === "transform" ? d3_interpolate__WEBPACK_IMPORTED_MODULE_2__.interpolateTransformCss : _interpolate_js__WEBPACK_IMPORTED_MODULE_3__["default"];
  return value == null ? this
      .styleTween(name, styleNull(name, i))
      .on("end.style." + name, styleRemove(name))
    : typeof value === "function" ? this
      .styleTween(name, styleFunction(name, i, (0,_tween_js__WEBPACK_IMPORTED_MODULE_4__.tweenValue)(this, "style." + name, value)))
      .each(styleMaybeRemove(this._id, name))
    : this
      .styleTween(name, styleConstant(name, i, value), priority)
      .on("end.style." + name, null);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/styleTween.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/styleTween.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function styleInterpolate(name, i, priority) {
  return function(t) {
    this.style.setProperty(name, i.call(this, t), priority);
  };
}

function styleTween(name, value, priority) {
  var t, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t = (i0 = i) && styleInterpolate(name, i, priority);
    return t;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value, priority) {
  var key = "style." + (name += "");
  if (arguments.length < 2) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, styleTween(name, value, priority == null ? "" : priority));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/text.js":
/*!***********************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/text.js ***!
  \***********************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _tween_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tween.js */ "./node_modules/d3-transition/src/transition/tween.js");


function textConstant(value) {
  return function() {
    this.textContent = value;
  };
}

function textFunction(value) {
  return function() {
    var value1 = value(this);
    this.textContent = value1 == null ? "" : value1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  return this.tween("text", typeof value === "function"
      ? textFunction((0,_tween_js__WEBPACK_IMPORTED_MODULE_0__.tweenValue)(this, "text", value))
      : textConstant(value == null ? "" : value + ""));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/textTween.js":
/*!****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/textTween.js ***!
  \****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function textInterpolate(i) {
  return function(t) {
    this.textContent = i.call(this, t);
  };
}

function textTween(value) {
  var t0, i0;
  function tween() {
    var i = value.apply(this, arguments);
    if (i !== i0) t0 = (i0 = i) && textInterpolate(i);
    return t0;
  }
  tween._value = value;
  return tween;
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(value) {
  var key = "text";
  if (arguments.length < 1) return (key = this.tween(key)) && key._value;
  if (value == null) return this.tween(key, null);
  if (typeof value !== "function") throw new Error;
  return this.tween(key, textTween(value));
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/transition.js":
/*!*****************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/transition.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index.js */ "./node_modules/d3-transition/src/transition/index.js");
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");



/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var name = this._name,
      id0 = this._id,
      id1 = (0,_index_js__WEBPACK_IMPORTED_MODULE_0__.newId)();

  for (var groups = this._groups, m = groups.length, j = 0; j < m; ++j) {
    for (var group = groups[j], n = group.length, node, i = 0; i < n; ++i) {
      if (node = group[i]) {
        var inherit = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__.get)(node, id0);
        (0,_schedule_js__WEBPACK_IMPORTED_MODULE_1__["default"])(node, name, id1, i, group, {
          time: inherit.time + inherit.delay + inherit.duration,
          delay: 0,
          duration: inherit.duration,
          ease: inherit.ease
        });
      }
    }
  }

  return new _index_js__WEBPACK_IMPORTED_MODULE_0__.Transition(groups, this._parents, name, id1);
}


/***/ }),

/***/ "./node_modules/d3-transition/src/transition/tween.js":
/*!************************************************************!*\
  !*** ./node_modules/d3-transition/src/transition/tween.js ***!
  \************************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   tweenValue: () => (/* binding */ tweenValue)
/* harmony export */ });
/* harmony import */ var _schedule_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./schedule.js */ "./node_modules/d3-transition/src/transition/schedule.js");


function tweenRemove(id, name) {
  var tween0, tween1;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = tween0 = tween;
      for (var i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1 = tween1.slice();
          tween1.splice(i, 1);
          break;
        }
      }
    }

    schedule.tween = tween1;
  };
}

function tweenFunction(id, name, value) {
  var tween0, tween1;
  if (typeof value !== "function") throw new Error;
  return function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id),
        tween = schedule.tween;

    // If this node shared tween with the previous node,
    // just assign the updated shared tween and we’re done!
    // Otherwise, copy-on-write.
    if (tween !== tween0) {
      tween1 = (tween0 = tween).slice();
      for (var t = {name: name, value: value}, i = 0, n = tween1.length; i < n; ++i) {
        if (tween1[i].name === name) {
          tween1[i] = t;
          break;
        }
      }
      if (i === n) tween1.push(t);
    }

    schedule.tween = tween1;
  };
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(name, value) {
  var id = this._id;

  name += "";

  if (arguments.length < 2) {
    var tween = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(this.node(), id).tween;
    for (var i = 0, n = tween.length, t; i < n; ++i) {
      if ((t = tween[i]).name === name) {
        return t.value;
      }
    }
    return null;
  }

  return this.each((value == null ? tweenRemove : tweenFunction)(id, name, value));
}

function tweenValue(transition, name, value) {
  var id = transition._id;

  transition.each(function() {
    var schedule = (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.set)(this, id);
    (schedule.value || (schedule.value = {}))[name] = value.apply(this, arguments);
  });

  return function(node) {
    return (0,_schedule_js__WEBPACK_IMPORTED_MODULE_0__.get)(node, id).value[name];
  };
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/constant.js":
/*!**********************************************!*\
  !*** ./node_modules/d3-zoom/src/constant.js ***!
  \**********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (x => () => x);


/***/ }),

/***/ "./node_modules/d3-zoom/src/event.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/event.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ZoomEvent)
/* harmony export */ });
function ZoomEvent(type, {
  sourceEvent,
  target,
  transform,
  dispatch
}) {
  Object.defineProperties(this, {
    type: {value: type, enumerable: true, configurable: true},
    sourceEvent: {value: sourceEvent, enumerable: true, configurable: true},
    target: {value: target, enumerable: true, configurable: true},
    transform: {value: transform, enumerable: true, configurable: true},
    _: {value: dispatch}
  });
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/index.js":
/*!*******************************************!*\
  !*** ./node_modules/d3-zoom/src/index.js ***!
  \*******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ZoomTransform: () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_1__.Transform),
/* harmony export */   zoom: () => (/* reexport safe */ _zoom_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   zoomIdentity: () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_1__.identity),
/* harmony export */   zoomTransform: () => (/* reexport safe */ _transform_js__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _zoom_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./zoom.js */ "./node_modules/d3-zoom/src/zoom.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-zoom/src/transform.js");




/***/ }),

/***/ "./node_modules/d3-zoom/src/noevent.js":
/*!*********************************************!*\
  !*** ./node_modules/d3-zoom/src/noevent.js ***!
  \*********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   nopropagation: () => (/* binding */ nopropagation)
/* harmony export */ });
function nopropagation(event) {
  event.stopImmediatePropagation();
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(event) {
  event.preventDefault();
  event.stopImmediatePropagation();
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/transform.js":
/*!***********************************************!*\
  !*** ./node_modules/d3-zoom/src/transform.js ***!
  \***********************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Transform: () => (/* binding */ Transform),
/* harmony export */   "default": () => (/* binding */ transform),
/* harmony export */   identity: () => (/* binding */ identity)
/* harmony export */ });
function Transform(k, x, y) {
  this.k = k;
  this.x = x;
  this.y = y;
}

Transform.prototype = {
  constructor: Transform,
  scale: function(k) {
    return k === 1 ? this : new Transform(this.k * k, this.x, this.y);
  },
  translate: function(x, y) {
    return x === 0 & y === 0 ? this : new Transform(this.k, this.x + this.k * x, this.y + this.k * y);
  },
  apply: function(point) {
    return [point[0] * this.k + this.x, point[1] * this.k + this.y];
  },
  applyX: function(x) {
    return x * this.k + this.x;
  },
  applyY: function(y) {
    return y * this.k + this.y;
  },
  invert: function(location) {
    return [(location[0] - this.x) / this.k, (location[1] - this.y) / this.k];
  },
  invertX: function(x) {
    return (x - this.x) / this.k;
  },
  invertY: function(y) {
    return (y - this.y) / this.k;
  },
  rescaleX: function(x) {
    return x.copy().domain(x.range().map(this.invertX, this).map(x.invert, x));
  },
  rescaleY: function(y) {
    return y.copy().domain(y.range().map(this.invertY, this).map(y.invert, y));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};

var identity = new Transform(1, 0, 0);

transform.prototype = Transform.prototype;

function transform(node) {
  while (!node.__zoom) if (!(node = node.parentNode)) return identity;
  return node.__zoom;
}


/***/ }),

/***/ "./node_modules/d3-zoom/src/zoom.js":
/*!******************************************!*\
  !*** ./node_modules/d3-zoom/src/zoom.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var d3_dispatch__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! d3-dispatch */ "./node_modules/d3-dispatch/src/dispatch.js");
/* harmony import */ var d3_drag__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! d3-drag */ "./node_modules/d3-drag/src/nodrag.js");
/* harmony import */ var d3_interpolate__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! d3-interpolate */ "./node_modules/d3-interpolate/src/zoom.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/select.js");
/* harmony import */ var d3_selection__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! d3-selection */ "./node_modules/d3-selection/src/pointer.js");
/* harmony import */ var d3_transition__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! d3-transition */ "./node_modules/d3-transition/src/index.js");
/* harmony import */ var _constant_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./constant.js */ "./node_modules/d3-zoom/src/constant.js");
/* harmony import */ var _event_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./event.js */ "./node_modules/d3-zoom/src/event.js");
/* harmony import */ var _transform_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./transform.js */ "./node_modules/d3-zoom/src/transform.js");
/* harmony import */ var _noevent_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./noevent.js */ "./node_modules/d3-zoom/src/noevent.js");










// Ignore right-click, since that should open the context menu.
// except for pinch-to-zoom, which is sent as a wheel+ctrlKey event
function defaultFilter(event) {
  return (!event.ctrlKey || event.type === 'wheel') && !event.button;
}

function defaultExtent() {
  var e = this;
  if (e instanceof SVGElement) {
    e = e.ownerSVGElement || e;
    if (e.hasAttribute("viewBox")) {
      e = e.viewBox.baseVal;
      return [[e.x, e.y], [e.x + e.width, e.y + e.height]];
    }
    return [[0, 0], [e.width.baseVal.value, e.height.baseVal.value]];
  }
  return [[0, 0], [e.clientWidth, e.clientHeight]];
}

function defaultTransform() {
  return this.__zoom || _transform_js__WEBPACK_IMPORTED_MODULE_3__.identity;
}

function defaultWheelDelta(event) {
  return -event.deltaY * (event.deltaMode === 1 ? 0.05 : event.deltaMode ? 1 : 0.002) * (event.ctrlKey ? 10 : 1);
}

function defaultTouchable() {
  return navigator.maxTouchPoints || ("ontouchstart" in this);
}

function defaultConstrain(transform, extent, translateExtent) {
  var dx0 = transform.invertX(extent[0][0]) - translateExtent[0][0],
      dx1 = transform.invertX(extent[1][0]) - translateExtent[1][0],
      dy0 = transform.invertY(extent[0][1]) - translateExtent[0][1],
      dy1 = transform.invertY(extent[1][1]) - translateExtent[1][1];
  return transform.translate(
    dx1 > dx0 ? (dx0 + dx1) / 2 : Math.min(0, dx0) || Math.max(0, dx1),
    dy1 > dy0 ? (dy0 + dy1) / 2 : Math.min(0, dy0) || Math.max(0, dy1)
  );
}

/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {
  var filter = defaultFilter,
      extent = defaultExtent,
      constrain = defaultConstrain,
      wheelDelta = defaultWheelDelta,
      touchable = defaultTouchable,
      scaleExtent = [0, Infinity],
      translateExtent = [[-Infinity, -Infinity], [Infinity, Infinity]],
      duration = 250,
      interpolate = d3_interpolate__WEBPACK_IMPORTED_MODULE_5__["default"],
      listeners = (0,d3_dispatch__WEBPACK_IMPORTED_MODULE_6__["default"])("start", "zoom", "end"),
      touchstarting,
      touchfirst,
      touchending,
      touchDelay = 500,
      wheelDelay = 150,
      clickDistance2 = 0,
      tapDistance = 10;

  function zoom(selection) {
    selection
        .property("__zoom", defaultTransform)
        .on("wheel.zoom", wheeled, {passive: false})
        .on("mousedown.zoom", mousedowned)
        .on("dblclick.zoom", dblclicked)
      .filter(touchable)
        .on("touchstart.zoom", touchstarted)
        .on("touchmove.zoom", touchmoved)
        .on("touchend.zoom touchcancel.zoom", touchended)
        .style("-webkit-tap-highlight-color", "rgba(0,0,0,0)");
  }

  zoom.transform = function(collection, transform, point, event) {
    var selection = collection.selection ? collection.selection() : collection;
    selection.property("__zoom", defaultTransform);
    if (collection !== selection) {
      schedule(collection, transform, point, event);
    } else {
      selection.interrupt().each(function() {
        gesture(this, arguments)
          .event(event)
          .start()
          .zoom(null, typeof transform === "function" ? transform.apply(this, arguments) : transform)
          .end();
      });
    }
  };

  zoom.scaleBy = function(selection, k, p, event) {
    zoom.scaleTo(selection, function() {
      var k0 = this.__zoom.k,
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return k0 * k1;
    }, p, event);
  };

  zoom.scaleTo = function(selection, k, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t0 = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p,
          p1 = t0.invert(p0),
          k1 = typeof k === "function" ? k.apply(this, arguments) : k;
      return constrain(translate(scale(t0, k1), p0, p1), e, translateExtent);
    }, p, event);
  };

  zoom.translateBy = function(selection, x, y, event) {
    zoom.transform(selection, function() {
      return constrain(this.__zoom.translate(
        typeof x === "function" ? x.apply(this, arguments) : x,
        typeof y === "function" ? y.apply(this, arguments) : y
      ), extent.apply(this, arguments), translateExtent);
    }, null, event);
  };

  zoom.translateTo = function(selection, x, y, p, event) {
    zoom.transform(selection, function() {
      var e = extent.apply(this, arguments),
          t = this.__zoom,
          p0 = p == null ? centroid(e) : typeof p === "function" ? p.apply(this, arguments) : p;
      return constrain(_transform_js__WEBPACK_IMPORTED_MODULE_3__.identity.translate(p0[0], p0[1]).scale(t.k).translate(
        typeof x === "function" ? -x.apply(this, arguments) : -x,
        typeof y === "function" ? -y.apply(this, arguments) : -y
      ), e, translateExtent);
    }, p, event);
  };

  function scale(transform, k) {
    k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], k));
    return k === transform.k ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(k, transform.x, transform.y);
  }

  function translate(transform, p0, p1) {
    var x = p0[0] - p1[0] * transform.k, y = p0[1] - p1[1] * transform.k;
    return x === transform.x && y === transform.y ? transform : new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(transform.k, x, y);
  }

  function centroid(extent) {
    return [(+extent[0][0] + +extent[1][0]) / 2, (+extent[0][1] + +extent[1][1]) / 2];
  }

  function schedule(transition, transform, point, event) {
    transition
        .on("start.zoom", function() { gesture(this, arguments).event(event).start(); })
        .on("interrupt.zoom end.zoom", function() { gesture(this, arguments).event(event).end(); })
        .tween("zoom", function() {
          var that = this,
              args = arguments,
              g = gesture(that, args).event(event),
              e = extent.apply(that, args),
              p = point == null ? centroid(e) : typeof point === "function" ? point.apply(that, args) : point,
              w = Math.max(e[1][0] - e[0][0], e[1][1] - e[0][1]),
              a = that.__zoom,
              b = typeof transform === "function" ? transform.apply(that, args) : transform,
              i = interpolate(a.invert(p).concat(w / a.k), b.invert(p).concat(w / b.k));
          return function(t) {
            if (t === 1) t = b; // Avoid rounding error on end.
            else { var l = i(t), k = w / l[2]; t = new _transform_js__WEBPACK_IMPORTED_MODULE_3__.Transform(k, p[0] - l[0] * k, p[1] - l[1] * k); }
            g.zoom(null, t);
          };
        });
  }

  function gesture(that, args, clean) {
    return (!clean && that.__zooming) || new Gesture(that, args);
  }

  function Gesture(that, args) {
    this.that = that;
    this.args = args;
    this.active = 0;
    this.sourceEvent = null;
    this.extent = extent.apply(that, args);
    this.taps = 0;
  }

  Gesture.prototype = {
    event: function(event) {
      if (event) this.sourceEvent = event;
      return this;
    },
    start: function() {
      if (++this.active === 1) {
        this.that.__zooming = this;
        this.emit("start");
      }
      return this;
    },
    zoom: function(key, transform) {
      if (this.mouse && key !== "mouse") this.mouse[1] = transform.invert(this.mouse[0]);
      if (this.touch0 && key !== "touch") this.touch0[1] = transform.invert(this.touch0[0]);
      if (this.touch1 && key !== "touch") this.touch1[1] = transform.invert(this.touch1[0]);
      this.that.__zoom = transform;
      this.emit("zoom");
      return this;
    },
    end: function() {
      if (--this.active === 0) {
        delete this.that.__zooming;
        this.emit("end");
      }
      return this;
    },
    emit: function(type) {
      var d = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__["default"])(this.that).datum();
      listeners.call(
        type,
        this.that,
        new _event_js__WEBPACK_IMPORTED_MODULE_2__["default"](type, {
          sourceEvent: this.sourceEvent,
          target: zoom,
          type,
          transform: this.that.__zoom,
          dispatch: listeners
        }),
        d
      );
    }
  };

  function wheeled(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var g = gesture(this, args).event(event),
        t = this.__zoom,
        k = Math.max(scaleExtent[0], Math.min(scaleExtent[1], t.k * Math.pow(2, wheelDelta.apply(this, arguments)))),
        p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(event);

    // If the mouse is in the same location as before, reuse it.
    // If there were recent wheel events, reset the wheel idle timeout.
    if (g.wheel) {
      if (g.mouse[0][0] !== p[0] || g.mouse[0][1] !== p[1]) {
        g.mouse[1] = t.invert(g.mouse[0] = p);
      }
      clearTimeout(g.wheel);
    }

    // If this wheel event won’t trigger a transform change, ignore it.
    else if (t.k === k) return;

    // Otherwise, capture the mouse point and location at the start.
    else {
      g.mouse = [p, t.invert(p)];
      (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);
      g.start();
    }

    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
    g.wheel = setTimeout(wheelidled, wheelDelay);
    g.zoom("mouse", constrain(translate(scale(t, k), g.mouse[0], g.mouse[1]), g.extent, translateExtent));

    function wheelidled() {
      g.wheel = null;
      g.end();
    }
  }

  function mousedowned(event, ...args) {
    if (touchending || !filter.apply(this, arguments)) return;
    var currentTarget = event.currentTarget,
        g = gesture(this, args, true).event(event),
        v = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__["default"])(event.view).on("mousemove.zoom", mousemoved, true).on("mouseup.zoom", mouseupped, true),
        p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(event, currentTarget),
        x0 = event.clientX,
        y0 = event.clientY;

    (0,d3_drag__WEBPACK_IMPORTED_MODULE_9__["default"])(event.view);
    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);
    g.mouse = [p, this.__zoom.invert(p)];
    (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);
    g.start();

    function mousemoved(event) {
      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
      if (!g.moved) {
        var dx = event.clientX - x0, dy = event.clientY - y0;
        g.moved = dx * dx + dy * dy > clickDistance2;
      }
      g.event(event)
       .zoom("mouse", constrain(translate(g.that.__zoom, g.mouse[0] = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(event, currentTarget), g.mouse[1]), g.extent, translateExtent));
    }

    function mouseupped(event) {
      v.on("mousemove.zoom mouseup.zoom", null);
      (0,d3_drag__WEBPACK_IMPORTED_MODULE_9__.yesdrag)(event.view, g.moved);
      (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
      g.event(event).end();
    }
  }

  function dblclicked(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var t0 = this.__zoom,
        p0 = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(event.changedTouches ? event.changedTouches[0] : event, this),
        p1 = t0.invert(p0),
        k1 = t0.k * (event.shiftKey ? 0.5 : 2),
        t1 = constrain(translate(scale(t0, k1), p0, p1), extent.apply(this, args), translateExtent);

    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
    if (duration > 0) (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__["default"])(this).transition().duration(duration).call(schedule, t1, p0, event);
    else (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__["default"])(this).call(zoom.transform, t1, p0, event);
  }

  function touchstarted(event, ...args) {
    if (!filter.apply(this, arguments)) return;
    var touches = event.touches,
        n = touches.length,
        g = gesture(this, args, event.changedTouches.length === n).event(event),
        started, i, t, p;

    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(t, this);
      p = [p, this.__zoom.invert(p), t.identifier];
      if (!g.touch0) g.touch0 = p, started = true, g.taps = 1 + !!touchstarting;
      else if (!g.touch1 && g.touch0[2] !== p[2]) g.touch1 = p, g.taps = 0;
    }

    if (touchstarting) touchstarting = clearTimeout(touchstarting);

    if (started) {
      if (g.taps < 2) touchfirst = p[0], touchstarting = setTimeout(function() { touchstarting = null; }, touchDelay);
      (0,d3_transition__WEBPACK_IMPORTED_MODULE_0__.interrupt)(this);
      g.start();
    }
  }

  function touchmoved(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t, p, l;

    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__["default"])(event);
    for (i = 0; i < n; ++i) {
      t = touches[i], p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(t, this);
      if (g.touch0 && g.touch0[2] === t.identifier) g.touch0[0] = p;
      else if (g.touch1 && g.touch1[2] === t.identifier) g.touch1[0] = p;
    }
    t = g.that.__zoom;
    if (g.touch1) {
      var p0 = g.touch0[0], l0 = g.touch0[1],
          p1 = g.touch1[0], l1 = g.touch1[1],
          dp = (dp = p1[0] - p0[0]) * dp + (dp = p1[1] - p0[1]) * dp,
          dl = (dl = l1[0] - l0[0]) * dl + (dl = l1[1] - l0[1]) * dl;
      t = scale(t, Math.sqrt(dp / dl));
      p = [(p0[0] + p1[0]) / 2, (p0[1] + p1[1]) / 2];
      l = [(l0[0] + l1[0]) / 2, (l0[1] + l1[1]) / 2];
    }
    else if (g.touch0) p = g.touch0[0], l = g.touch0[1];
    else return;

    g.zoom("touch", constrain(translate(t, p, l), g.extent, translateExtent));
  }

  function touchended(event, ...args) {
    if (!this.__zooming) return;
    var g = gesture(this, args).event(event),
        touches = event.changedTouches,
        n = touches.length, i, t;

    (0,_noevent_js__WEBPACK_IMPORTED_MODULE_4__.nopropagation)(event);
    if (touchending) clearTimeout(touchending);
    touchending = setTimeout(function() { touchending = null; }, touchDelay);
    for (i = 0; i < n; ++i) {
      t = touches[i];
      if (g.touch0 && g.touch0[2] === t.identifier) delete g.touch0;
      else if (g.touch1 && g.touch1[2] === t.identifier) delete g.touch1;
    }
    if (g.touch1 && !g.touch0) g.touch0 = g.touch1, delete g.touch1;
    if (g.touch0) g.touch0[1] = this.__zoom.invert(g.touch0[0]);
    else {
      g.end();
      // If this was a dbltap, reroute to the (optional) dblclick.zoom handler.
      if (g.taps === 2) {
        t = (0,d3_selection__WEBPACK_IMPORTED_MODULE_8__["default"])(t, this);
        if (Math.hypot(touchfirst[0] - t[0], touchfirst[1] - t[1]) < tapDistance) {
          var p = (0,d3_selection__WEBPACK_IMPORTED_MODULE_7__["default"])(this).on("dblclick.zoom");
          if (p) p.apply(this, arguments);
        }
      }
    }
  }

  zoom.wheelDelta = function(_) {
    return arguments.length ? (wheelDelta = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(+_), zoom) : wheelDelta;
  };

  zoom.filter = function(_) {
    return arguments.length ? (filter = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(!!_), zoom) : filter;
  };

  zoom.touchable = function(_) {
    return arguments.length ? (touchable = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])(!!_), zoom) : touchable;
  };

  zoom.extent = function(_) {
    return arguments.length ? (extent = typeof _ === "function" ? _ : (0,_constant_js__WEBPACK_IMPORTED_MODULE_1__["default"])([[+_[0][0], +_[0][1]], [+_[1][0], +_[1][1]]]), zoom) : extent;
  };

  zoom.scaleExtent = function(_) {
    return arguments.length ? (scaleExtent[0] = +_[0], scaleExtent[1] = +_[1], zoom) : [scaleExtent[0], scaleExtent[1]];
  };

  zoom.translateExtent = function(_) {
    return arguments.length ? (translateExtent[0][0] = +_[0][0], translateExtent[1][0] = +_[1][0], translateExtent[0][1] = +_[0][1], translateExtent[1][1] = +_[1][1], zoom) : [[translateExtent[0][0], translateExtent[0][1]], [translateExtent[1][0], translateExtent[1][1]]];
  };

  zoom.constrain = function(_) {
    return arguments.length ? (constrain = _, zoom) : constrain;
  };

  zoom.duration = function(_) {
    return arguments.length ? (duration = +_, zoom) : duration;
  };

  zoom.interpolate = function(_) {
    return arguments.length ? (interpolate = _, zoom) : interpolate;
  };

  zoom.on = function() {
    var value = listeners.on.apply(listeners, arguments);
    return value === listeners ? zoom : value;
  };

  zoom.clickDistance = function(_) {
    return arguments.length ? (clickDistance2 = (_ = +_) * _, zoom) : Math.sqrt(clickDistance2);
  };

  zoom.tapDistance = function(_) {
    return arguments.length ? (tapDistance = +_, zoom) : tapDistance;
  };

  return zoom;
}


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*************************!*\
  !*** ./src/frontend.js ***!
  \*************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom_client__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/client */ "./node_modules/react-dom/client.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/query-core/build/modern/queryClient.js");
/* harmony import */ var _tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @tanstack/react-query */ "./node_modules/@tanstack/react-query/build/modern/QueryClientProvider.js");
/* harmony import */ var preline_preline__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! preline/preline */ "./node_modules/preline/preline.js");
/* harmony import */ var preline_preline__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(preline_preline__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Map__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Map */ "./src/Map.jsx");







const divsToUpdate = document.querySelectorAll(".tailwind-update-me");
divsToUpdate.forEach(div => {
  const data = JSON.parse(div.querySelector("pre").innerText);
  const root = react_dom_client__WEBPACK_IMPORTED_MODULE_1__.createRoot(div);
  root.render((0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(OurComponent, {
    ...data
  }));
  div.classList.remove("tailwind-update-me");
});
const queryClient = new _tanstack_react_query__WEBPACK_IMPORTED_MODULE_4__.QueryClient();
function OurComponent(props) {
  return (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_tanstack_react_query__WEBPACK_IMPORTED_MODULE_5__.QueryClientProvider, {
    client: queryClient
  }, (0,react__WEBPACK_IMPORTED_MODULE_0__.createElement)(_Map__WEBPACK_IMPORTED_MODULE_3__["default"], {
    props: props
  }));
}
})();

/******/ })()
;
//# sourceMappingURL=frontend.js.map