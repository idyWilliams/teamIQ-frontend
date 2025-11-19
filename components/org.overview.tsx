import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

const data = [
  { name: "In progress", value: 3 },
  { name: "In review", value: 3 },
  { name: "Completed", value: 3 },
  { name: "Approved", value: 3 },
];

const COLORS = ["#8c52ff", "#b388ff", "#5db0ff", "#67e3a0"]; 

export default function Dashboard() {
  return (
    <div className="w-full min-h-screen p-6 bg-gray-50 flex flex-col gap-6">
      <h1 className="text-2xl font-semibold text-gray-700">ISentry Technologies</h1>

      <div className="flex gap-6">
        <Card className="w-full p-4 rounded-2xl shadow-sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Project Task</p>
              <h2 className="text-5xl font-bold mt-2">234</h2>
              <Button className="mt-4">23+ Unassigned Task</Button>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-48 h-48">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie
                      data={data}
                      innerRadius={55}
                      outerRadius={80}
                      paddingAngle={3}
                      dataKey="value"
                    >
                      {data.map((entry, index) => (
                        <Cell key={index} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>

              <div className="flex flex-col gap-2">
                {data.map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index] }}
                    ></span>
                    <p className="text-gray-600 text-sm">{item.name}</p>
                    <p className="text-gray-800 font-semibold text-sm">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full p-6 rounded-2xl shadow-sm">
        <p className="text-gray-500 text-sm mb-4">Team Performance</p>
        <div className="w-full h-64">
          <motion.svg initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full">
            <path
              d="M0,120 C100,40 200,80 300,60 C400,40 500,100 600,80 C700,60 800,140 900,110"
              fill="none"
              strokeWidth="4"
              stroke="currentColor"
            />
          </motion.svg>
        </div>
      </Card>
    </div>
  );
}
