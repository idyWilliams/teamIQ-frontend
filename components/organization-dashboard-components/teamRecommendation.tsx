import React from "react";
import { Card, CardContent, CardTitle } from "../ui/card";

export default function teamRecommendation() {
  return (
    <>
      <div className="m-6 w-[416px] rounded-3xl border border-gray-200 p-6">
        <h4 className="mb-8 text-lg font-semibold">Team Recommendation</h4>
        <div className="flex flex-col gap-8">
          {recommendations.map((rec, i) => (
            <Card
              key={i}
              className="border-iq-500 rounded-lg border-0 border-l-2 bg-gray-50"
            >
              {/* <CardHeader className="flex justify-between"> */}
              <div className="flex justify-between px-6">
                <CardTitle className="text-sm">{rec.title}</CardTitle>
                <button className="text-iq-err-300 bg-iq-err-100 rounded-4xl px-4 py-1 text-xs">
                  {rec.priority}
                </button>
              </div>

              {/* </CardHeader> */}
              <CardContent className="text-xs">{rec.details}</CardContent>
            </Card>
          ))}
        </div>
      </div>
    </>
  );
}

const recommendations = [
  {
    id: 0,
    title: "Train 3 devs in AWS - 2 weeks",
    priority: "high",
    details:
      "You only have 1 good dev in aws and this is bad for your team because Goldies project requires someone with a good knowledge of AWS",
  },
  {
    id: 0,
    title: "Hire DevOps specialist",
    priority: "high",
    details:
      "You only have 1 good dev in aws and this is bad for your team because Goldies project requires someone with a good knowledge of AWS",
  },
  {
    id: 0,
    title: "Upskill React team - 2 weeks",
    priority: "high",
    details:
      "You only have 1 good dev in aws and this is bad for your team because Goldies project requires someone with a good knowledge of AWS",
  },
];
