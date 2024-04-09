import { Header } from "@/modules/core";

 const DashboardLayout = ({children}: {children: React.ReactNode})  => {
  
  return (
    <div> 
      <Header />
      {children} 
      
      </div>
  );
}

export default DashboardLayout