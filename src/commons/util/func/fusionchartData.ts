export const TreeMapData = (mapData: any) => {
  const dataSource = {
    data: [
      {
        data: mapData,
      },
    ],
    colorrange: {
      mapbypercent: "0",
      // gradient: "1",
      // minvalue: "0",
      code: "#b1b1b1",
      // startlabel: "Ideal",
      // endlabel: "Threshold",
      color: [
        {
          code: "#ff2616",
          maxvalue: "100",
        },
        {
          code: "#ff2616",
          maxvalue: "10",
        },
        {
          code: "#ff2616",
          maxvalue: "3",
        },
        {
          code: "#ff928a",
          maxvalue: "2",
        },
        {
          code: "#ffd3d0",
          maxvalue: "1",
        },
        {
          code: "#ffe0de",
          maxvalue: "0.1",
        },
        {
          code: "#fff1f0",
          maxvalue: "0.01",
        },
        {
          code: "#b1b1b1",
          maxvalue: "0",
        },
        {
          code: "#e8f4ff",
          maxvalue: "-0.01",
        },
        {
          code: "#d6ebff",
          maxvalue: "-0.1",
        },
        {
          code: "#a6cef6",
          maxvalue: "-1",
        },
        {
          code: "#518bf5",
          maxvalue: "-2",
        },
        {
          code: "#518bf5",
          maxvalue: "-3",
        },
        {
          code: "#0076ec",
          maxvalue: "-100",
        },
      ],
    },
    chart: {
      hideTitle: "1",
      algorithm: "squarified",
      plottooltext: "<div>$label $svalue%</div>",
      theme: "fusion",
      showPrintMenuItem: 0,
      showChildLabels: 1,
      chartTopMargin: -40,
      chartRightMargin: -10,
      chartBottomMargin: -40,
      plotborderthickness: ".5",
      plotbordercolor: "ffffff",
      horizontalPadding: 0,
      verticalPadding: 0,
      showHoverEffect: 0,
      showNavigationBar: 0,
      showTooltip: 1,
      showLegend: 0,
      showParent: 0,
      labelFontBold: 1,
      labelFontColor: "ffffff",
      padding: 0,
      labelGlow: 0,
      labelFontSize: 14,
      creditLabel: 0,
      chartLeftMargin: 0,
      useEllipsesWhenOverflow: 0,
    },
  };

  return dataSource;
};

export const IndexGrapqh = (isColor: any, indexGraph: any) => {
  const dataSource = {
    chart: {
      anchorradius: "0",
      plottooltext: "<b>$dataValue</b>",
      showhovereffect: "1",
      showvalues: "0",
      palettecolors: isColor ? "#0080ff" : "#ff1d40",
      // numbersuffix: "°C",
      setadaptiveymin: "1",
      theme: "umber",
      // bgColor: "#ffffff",
      canvasBgAlpha: "00",
      bgAlpha: "00",
      canvasbgColor: "#ffffff",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      bgColor: "#eeeeee",
      bgBorder: "0",
      divlineAlpha: "0",
      // decimals: "0",
      formatNumberScale: "0",
      xFormatNumber: "0",
      formatNumber: "0",
      xFormatNumberScale: "0",
      showLabels: "0",
      showValues: "0",
      showYAxisValues: "1",
      // renderAt: "chartContainer",
      width: "100%",
    },
    data: indexGraph,
  };
  return dataSource;
};

export const BarGraph = (stockData: any) => {
  const dataSource = {
    chart: {
      theme: "fusion",
      plottooltext: "<b>$dataValue</b>",
      showLabels: "1",
      showValues: "0",
      showYAxisValues: "0",
      canvasBgAlpha: "00",
      bgAlpha: "00",
      canvasbgColor: "#ffffff",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      plotbordercolor: "ffffff",
      showVLineLabelBorder: false,
      showPlotBorder: false,
      numDivLines: 0,
      divLineColor: "#ffffff",
      showLimits: false,
      errorBarWidthPercent: 0,
      // errorBarColor: "#ffffff",
      plotGradientColor: "#ffffff",
      // xFormatNumber: "0",
      formatNumber: "1",
      // xFormatNumberScale: "0",
      numberSuffix: "",
      forceNumberScale: "1",
      numberScaleUnit: "",
      formatNumberScale: 0,
      valueBorderRadius: 5,
      yAxisValueBorderRadius: 5,
      xAxisValueBorderRadius: 5,
      maxColWidth: "100%",
    },
    categories: [
      {
        category: stockData.category,
        borderRadius: 100,
      },
    ],
    dataset: [
      {
        data: stockData.income,
        color: "#85f3e8",
      },
      {
        data: stockData.revenue,
        color: "#f8e495",
      },
    ],
  };
  return dataSource;
};

export const BarGraph2 = (stockData: any) => {
  const dataSource = {
    chart: {
      theme: "fusion",
      plottooltext: "<b>$dataValue</b>",
      showLabels: "1",
      showValues: "0",
      showYAxisValues: "0",
      canvasBgAlpha: "00",
      bgAlpha: "00",
      canvasbgColor: "#ffffff",
      canvasBorderThickness: "0",
      showAlternateHGridColor: "0",
      plotbordercolor: "ffffff",
      showVLineLabelBorder: false,
      showPlotBorder: false,
      numDivLines: 0,
      divLineColor: "#ffffff",
      showLimits: false,
      errorBarWidthPercent: 0,
      // errorBarColor: "#ffffff",
      plotGradientColor: "#ffffff",
      // xFormatNumber: "0",
      formatNumber: "1",
      // xFormatNumberScale: "0",
      numberSuffix: "",
      forceNumberScale: "1",
      numberScaleUnit: "",
      formatNumberScale: 0,
      valueBorderRadius: 5,
      yAxisValueBorderRadius: 5,
      xAxisValueBorderRadius: 5,
      maxColWidth: "100%",
    },
    categories: [
      {
        category: stockData.category,
      },
    ],
    dataset: [
      {
        data: stockData.capital,
        color: "#85f3e8",
      },
      {
        data: stockData.debt,
        color: "#f8e495",
      },
      {
        data: stockData.asset,
        color: "#f8b995",
      },
    ],
  };
  return dataSource;
};
