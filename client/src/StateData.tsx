import { StateDataMap, Scaling, Decimals } from "./logic/types";
import { SlideData, Value, Metric } from "./logic/types";
import {
  PLANET_IMG,
  PLANET_FACTS,
  METRIC_DATA,
  METRIC_DEF,
} from "./constants/solarSysData";
import { formatNumber } from "./utils/numberFormat";

const formatDelta = (
  n: string | number,
  scaling: Scaling,
  decimals: Decimals,
  suffix?: string
) =>
  `${
    isNaN(Number(n))
      ? undefined
      : Number(n) >= 1000
      ? ">+999"
      : Number(n) <= -1000
      ? "<-999"
      : `${Number(n) > 0 ? "+" : ""}${formatNumber(n, scaling, decimals)}`
  }${suffix ? ` ${suffix}` : undefined}`;

/*
    Create state data methods
    Below method relies on manual collection of data
    Another option is to connect to an API and create a conversion method from the API output to StateDataMap type
*/

const getMetricDelta = (val: number, metric: Metric) =>
  val / METRIC_DATA[metric].data["Earth"];

const getSum = (arr: Array<number>) =>
  arr.reduce((acc: number, val: number) => acc + val);

const getRange = (arr: Array<number>) =>
  `${formatNumber(Math.min(...arr), 1, 1)} - ${formatNumber(
    Math.max(...arr),
    1,
    1
  )}`;

const getAvg = (arr: Array<number>) => {
  const newArr = arr.filter((n) => !isNaN(n));
  return getSum(newArr) / newArr.length;
};

const suffix = "×E";
const suffixExt = " × E";

const planetNames = Object.keys(METRIC_DATA);
const arr = new Array(
  Math.floor(planetNames.length / 3 + (planetNames.length % 3 !== 0 ? 1 : 0))
).fill(null);

const metricSlides: Array<[string, SlideData]> = [
  [
    "Metrics",
    arr.map((x, n) => ({
      headers: {
        category: "Metrics",
        sequence: "Metrics",
        titlePrimary: "Solar System",
        titlePrimaryShort: "SS",
        titleSecondary: "Vs. the Earth",
        titleSecondaryShort: `M${n + 1}`,
      },
      data: new Map(
        Object.entries(METRIC_DATA)
          .filter((el, i) => i >= n * 3 && i < (n + 1) * 3)
          .map(([metric, metricData]) => [
            metric,
            {
              main: new Map([
                [
                  "Total",
                  {
                    type: "bar-chart",
                    data: Object.entries(metricData.data).map(
                      ([planet, value]) => {
                        const delta = getMetricDelta(value, metric as Metric);

                        return {
                          name: planet,
                          primary: value,
                          primaryFormatted: formatNumber(
                            value,
                            1,
                            // metricData.decimals as Decimals
                            1
                          ),
                          primaryDelta: delta,
                          primaryDeltaFormatted: `${formatNumber(
                            delta,
                            1,
                            1
                          )}${suffix}`,
                          primaryIsGood: delta > 1,
                          primaryIsBad: delta < 1,
                        };
                      }
                    ),
                  },
                ],
              ]),
              tile: {
                name: metric,
                tooltip: METRIC_DEF[metric as Metric],
                primary: getSum(Object.values(metricData.data)),
                primaryFormatted: `${getRange(
                  Object.values(metricData.data)
                )} ${metricData.unit}`,
                primaryDelta: getMetricDelta(
                  getAvg(Object.values(metricData.data)),
                  metric as Metric
                ),
                primaryDeltaFormatted: `Avg: ${formatNumber(
                  getMetricDelta(
                    getAvg(Object.values(metricData.data)),
                    metric as Metric
                  ),
                  1,
                  2
                )}`,
              },
            },
          ])
      ),
    })),
  ],
];

const planetsSlides: Array<[string, SlideData]> = [
  [
    "Planets",
    new Array(
      Math.floor(Object.keys(PLANET_IMG).length / 3) +
        (Object.keys(PLANET_IMG).length % 3 !== 0 ? 1 : 0)
    )
      .fill(null)
      .map((x, n) => ({
        headers: {
          category: "Planets",
          sequence: "Planets",
          titlePrimary: "Solar System",
          titlePrimaryShort: "SS",
          titleSecondary: "Planets show",
          titleSecondaryShort: `P ${n * 3 + 1} - ${(n + 1) * 3}`,
        },
        data: new Map(
          Object.entries(PLANET_IMG)
            .filter((planet, i) => i >= n * 3 && i < (n + 1) * 3)
            .map(([planet, planetData], i) => [
              planet,
              {
                main: new Map([
                  [
                    "Total",
                    {
                      type: "items",
                      data: planetData.map(
                        ({ name, description, img, link }) => ({
                          name: name,
                          description: description,
                          img: { src: img },
                          link: link,
                        })
                      ),
                    },
                  ],
                ]),
                tile: {
                  name: planet,
                  primary: i + 1,
                  // primaryFormatted: `${i + 1}${
                  //   i === 0 ? "st" : i === 1 ? "nd" : i === 2 ? "rd" : "th"
                  // } planet from the Sun`,
                  primaryFormatted: PLANET_FACTS[n * 3 + i],
                },
              },
            ])
        ),
      })),
  ],
];

const tickerData: Map<string, Map<string, Array<Value>>> = new Map([
  [
    "Solar System Metrics VS. the Earth",
    new Map(
      Object.entries(METRIC_DATA).map(([metric, metricData], i) => [
        `${metric} (${metricData.unit})`,

        Object.entries(metricData.data).map(([planet, value]) => {
          const delta = getMetricDelta(value, metric as Metric);

          return {
            name: planet,
            primary: value,
            primaryFormatted: formatNumber(
              value,
              1,
              metricData.decimals as Decimals
            ),
            primaryDelta: delta,
            primaryDeltaFormatted: `${formatNumber(delta, 1, 3)}${suffix}`,
            primaryIsGood: delta > 1,
            primaryIsBad: delta < 1,
          };
        }),
      ])
    ),
  ],
]);

const createStateData = (): StateDataMap =>
  new Map([
    [
      "solar-system",
      {
        slides: new Map([...metricSlides, ...planetsSlides]),
        ticker: tickerData,
      },
    ],
  ]);

export { createStateData };
