export function makeNewData(data?: any, type?: any) {
  if (type === "index") {
    let newData = data.data.close.map((data: any) => {
      let graph = { x: "", y: 0 };
      graph.x = data.Date;
      graph.y = data.Close;
      return graph;
    });
    return newData;
  } else {
    let newData = data.data.price.map((data: any) => {
      let graph = { x: "", y: 0 };
      graph.x = data.date;
      graph.y = data.close;
      return graph;
    });
    return newData;
  }
}

export function makeAfterMin(data?: any) {
  let after_min = data.data.after_min2.map((data: any, index: any) => {
    let graph = { x: "", y: 0 };
    graph.x = `${index + 1}일 뒤`;
    graph.y = data.after_min2;
    return graph;
  });
  return after_min;
}

export function makeAfterMax(data?: any) {
  let after_max = data.data.after_max2.map((data: any, index: any) => {
    let graph = { x: "", y: 0 };
    graph.x = `${index + 1}일 뒤`;
    graph.y = data.after_max2;
    return graph;
  });
  return after_max;
}

export function makeWeightMean(data?: any) {
  let weight_mean = data.data.after_weight_mean.map((data: any, index: any) => {
    let graph = { x: "", y: 0 };
    graph.x = `${index + 1}일 뒤`;
    graph.y = data.after_weight_mean;
    return graph;
  });
  return weight_mean;
}

export function makeAreaGraph(data?: any, type?: any) {
  if (type === "index") {
    let area = data.data.close.map((data: any) => {
      let graph = { x: "", y: null };
      graph.x = data.Date;
      graph.y = data.Close;
      return graph;
    });

    area[59].y = data.data.close[59].Close;
    return area;
  } else {
    let area = data.data.price.map((data: any) => {
      let graph = { x: "", y: null };
      graph.x = data.date;
      graph.y = data.close;
      return graph;
    });

    area[59].y = data.data.price[59].close;
    return area;
  }
}
