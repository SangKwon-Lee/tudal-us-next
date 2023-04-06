export const Baroptions = {
  responsive: true,
  animation: {
    duration: 1000,
  },
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    filler: {
      propagate: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
  layout: {
    padding: 30,
  },
  scales: {
    x: {
      display: true,
      grid: {
        drawBorder: false,
      },
    },
    y: {
      display: false,
      grid: {
        drawBorder: false,
      },
      gridLines: {
        drawBorder: false,
      },
    },
  },
};

export const optionsLine = {
  responsive: true,
  animation: {
    duration: 0,
  },
  plugins: {
    legend: {
      display: false,
      position: "top" as const,
    },
    filler: {
      propagate: true,
    },
    elements: {
      point: {
        radius: 0,
      },
    },
  },
  scales: {
    x: {
      display: false,
      grid: {
        drawBorder: false,
      },
    },
    y: {
      display: true,
      grid: {
        drawBorder: false,
      },
      gridLines: {
        drawBorder: false,
      },
    },
  },
};

export const treeOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    title: {
      display: false,
    },
    legend: {
      display: false,
    },
    tooltip: {
      displayColors: false,
      callbacks: {
        title(items: any) {
          return items[0].raw._data.name;
        },
        label(item: any) {
          const {
            _data: { name, changePercent },
          } = item.raw;
          return [`${name}: ${changePercent}%`];
        },
      },
    },
  },
};
