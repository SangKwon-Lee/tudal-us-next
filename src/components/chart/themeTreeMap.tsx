import FusionCharts from "fusioncharts";
import TreeMap from "fusioncharts/fusioncharts.treemap";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import ReactFC from "react-fusioncharts";

// @ts-ignore
FusionCharts.options["license"]({
  key: "cgB1kvdF5H2E4F1C5B1A3A1A1D4G4I3xkcA3D5trxfsA2B2jE-11oE1G4E1A2B6C4A3F4B2C1C3H2C1C8B7B5E-11acE3E3G2sA4B2C2feI-8D1H4B3zD-13mD1D3G4nvrB9D2C6E2C4B1I4F1A9C11A5uD-11C-9A2I3NC5qD-17jD2FH3H1F-7B-22tC8B2E6D2E2F2J2C10A2B3D6C1D1D3r==",
  creditLabel: false,
});

ReactFC.fcRoot(FusionCharts, TreeMap, FusionTheme);
interface Props {
  dataSource: any;
}

export default function ThemeTreeMapChart(props: Props) {
  const { dataSource } = props;

  return (
    <>
      <ReactFC
        type={"treemap"}
        width="100%"
        height="230"
        dataFormat={"json"}
        dataSource={dataSource}
      />
    </>
  );
}
