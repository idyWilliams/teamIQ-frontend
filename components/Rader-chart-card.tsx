import {
  ResponsiveContainer,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  Tooltip,
} from "recharts";

type chartData = {
  skill: string;
  percentage: number;
};

type RaderChartProps = {
  chartData: chartData[];
  text?: string;
};

const RaderChartCard = ({
  chartData,
  text = "Skill Overview",
}: RaderChartProps) => {
  return (
    <div className="mx-auto flex-1 flex flex-col w-full lg:w-[80%] border py-[24px] lg:p-[24px] rounded-[16px]">
      <h3 className="font-semibold px-[12px]">{text}</h3>
      <div className="h-[320px] lg:h-[90%] p-[24px] flex my-auto items-center">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={chartData}>
            <Tooltip />
            <PolarAngleAxis dataKey="skill" />
            <PolarGrid />
            <Radar dataKey="percentage" fill="#086ACE" fillOpacity={0.6} />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RaderChartCard;
