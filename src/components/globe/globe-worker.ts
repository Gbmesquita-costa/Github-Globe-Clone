type Position = {
  order: number;
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  arcAlt: number;
  color: string;
};

type GenRandomNumberProps = {
  min: number;
  max: number;
  count: number;
};

self.onmessage = (event) => {
  const {
    data: { type, data },
  } = event;
  const workerProcess = new GlobeWorkerProcess();

  // Send processed data back to the main thread
  switch (type) {
    case "processData":
      const processedData = workerProcess.processGlobeData(data);
      self.postMessage({ type: "data", data: processedData });
      break;
    case "numbersOfRings":
      const numbersOfRings = workerProcess.genRandomNumbers(data);
      self.postMessage({ type: "rings", data: numbersOfRings });
      break;
  }
};

class GlobeWorkerProcess {
  processGlobeData(data: Position[]) {
    let points = [];

    for (const arc of data) {
      const rgb = this.hexToRgb(arc.color);

      points.push({
        size: 1,
        order: arc.order,
        color: rgb,
        lat: arc.startLat,
        lng: arc.startLng,
      });

      points.push({
        size: 1,
        order: arc.order,
        color: rgb,
        lat: arc.endLat,
        lng: arc.endLng,
      });
    }

    // Remove duplicates for same lat and lng
    return points.filter(
      (v, i, a) =>
        a.findIndex((v2) =>
          ["lat", "lng"].every(
            (k) => v2[k as "lat" | "lng"] === v[k as "lat" | "lng"]
          )
        ) === i
    );
  }

  hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;

    hex = hex.replace(shorthandRegex, (m, r, g, b) => {
      return r + r + g + g + b + b;
    });

    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : null;
  }

  genRandomNumbers({ min, max, count }: GenRandomNumberProps) {
    const arr = [];

    while (arr.length < count) {
      const r = Math.floor(Math.random() * (max - min)) + min;
      if (arr.indexOf(r) === -1) arr.push(r);
    }

    return arr;
  }
}
