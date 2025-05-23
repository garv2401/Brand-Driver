import Header from "../components/Header";
import OverviewCards from "../components/Overview";
import DashboardCharts from "../components/DashBoardCharts";
import DataTable from "../components/DataTable";

const Dashboard = () => {
  return (
    <>
      
      {/* Overview */}
      <OverviewCards />

      {/* DashBoard Charts */}
      <DashboardCharts/>


      {/* Data table */}
      <DataTable/>
    </>
  );
};

export default Dashboard;
