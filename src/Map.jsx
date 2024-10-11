import React, { useState, useEffect, useRef } from 'react';
import { geoMercator, geoPath } from 'd3-geo';
import { zoom, zoomIdentity } from 'd3-zoom';
import { select } from 'd3-selection';
import { citiesAll } from './cities';
import { useQuery } from '@tanstack/react-query';
import { citiesTwo } from './citiesTwo';

const cities = citiesAll
  .map((item) => ({ ...item, coordinates: [Number(item.coordinates.lon), Number(item.coordinates.lat)] }))
  .concat(citiesTwo)
  .filter((city, index, self) =>
    index === self.findIndex((c) => (
      c.coordinates[0] === city.coordinates[0] && c.coordinates[1] === city.coordinates[1]
    ))
  );


function Map() {
  const [slug, setSlug] = useState('pohod-1989-g-snezhnogo-desanta-istoricheskogo-fakulteta-2');
  //   const [slug,setSlug] = useState(window.location.href.substring(window.location.href.lastIndexOf('/') + 1))
  const [selectedCity, setSelectedCity] = useState(null);
  const [russiaGeoJson, setRussiaGeoJson] = useState(null);
  const [showRoute, setShowRoute] = useState(true);
  const svgRef = useRef(null);

  const { isPending, error, data, isFetching } = useQuery({
    queryKey: ['repoData', slug],
    queryFn: async () => {
      const response = await fetch(
        `https://sneg.kpfu.ru/wp-json/wp/v2/campaign?slug=${slug}`
      );
      return await response.json();
    },
  });

  const array = Array.isArray(data) && data.length > 0 ? data[0]?.route_new.value : [];

  useEffect(() => {
    fetch('https://raw.githubusercontent.com/codeforamerica/click_that_hood/master/public/data/asia.geojson')
      .then(response => response.json())
      .then(data => setRussiaGeoJson(data));
  }, []);

  useEffect(() => {
    if (svgRef.current && russiaGeoJson) {
      const svg = select(svgRef.current);
      const zoomBehavior = zoom()
        .scaleExtent([1, 8])
        .on('zoom', (event) => {
          svg.select('g').attr('transform', event.transform);
        });

      svg.call(zoomBehavior);
    }
  }, [russiaGeoJson]);

  const width = 1200;
  const height = 600;

  const projection = geoMercator()
    .center([65, 57])
    .scale(500)
    .translate([width / 2, height / 2]);

  const path = geoPath().projection(projection);

  const routeCoordinates = array.length > 0
    ? array?.map(cityName => cities.find(city => city.name === cityName)?.coordinates)
      .filter((coords) => coords !== undefined)
    : [];

  return (
    <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
      <div className="bg-white rounded-lg shadow-lg p-6 w-[1200px]">
        <div className="border border-gray-300 rounded-lg overflow-hidden flex justify-center w-[1200px]">
          <svg ref={svgRef} width={width} height={height}>
            <g>
              {russiaGeoJson && russiaGeoJson.features.map((feature, index) => (
                <path
                  key={index}
                  d={path(feature) || ''}
                  fill="#EAEAEC"
                  stroke="#D6D6DA"
                />
              ))}
              {showRoute && (
                <path
                  d={`M${routeCoordinates?.map(coord => projection(coord).join(',')).join('L')}`}
                  fill="none"
                  stroke="#FF0000"
                  strokeWidth="2"
                />
              )}
              {array?.length > 0 &&
                cities.filter((city) => array?.includes(city.name)).map((city) => {
                  const [x, y] = projection(city.coordinates) || [0, 0];
                  return (
                    <g key={city.name}>
                      <circle
                        cx={x}
                        cy={y}
                        r={selectedCity?.name === city.name ? 8 : 5}
                        fill={array?.includes(city.name) ? "#FF0000" : "#000000"}
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={x}
                        y={y - 10}
                        textAnchor="middle"
                        fill="#000000"
                        fontSize="12px"
                      >
                        {city.name}
                      </text>
                    </g>
                  );
                })
              }
            </g>
          </svg>
        </div>
        {selectedCity && (
          <div className="mt-4 text-center">
            <p className="font-semibold text-lg text-blue-700">Выбранный город: {selectedCity.name}</p>
            <p className="text-gray-600">Координаты: {selectedCity.coordinates.join(', ')}</p>
          </div>
        )}
        {/* <div className="mt-4 flex justify-center space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => select(svgRef.current).transition().call(zoom().scaleBy, 1.5)}
          >
            Увеличить
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={() => select(svgRef.current).transition().call(zoom().scaleBy, 0.75)}
          >
            Уменьшить
          </button>
          <button
            className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition-colors"
            onClick={() => select(svgRef.current).transition().call(zoom().transform, zoomIdentity)}
          >
            Сбросить масштаб
          </button>
        </div> */}
      </div>
    </div>
  );
}

export default Map;