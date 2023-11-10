import React from "react";
import { useQueryClient } from "@tanstack/react-query";

const Dashboard: React.FC = () => {
  const queryClient = useQueryClient();
  const result = queryClient.getQueryData<any>(["student", "1"]) || {};
  const { data } = result;

  setTimeout(() => {
    // queryClient.clear();
  }, 6000);

  return (
    <div>
      <h1 className="mb-6 text-lg">Dashboard</h1>
      <div>
        Name: {[data?.data?.first_name, data?.data?.last_name].join(" ")}
      </div>
    </div>
  );
};

export default Dashboard;
