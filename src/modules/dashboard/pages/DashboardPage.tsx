import { Button } from "@/modules/core/ui";

 const DashboardPage = () => {
  
  return (
    <div className="flex gap-7 "> 
      <Button variant="filled" text="SEVE"/>
      <Button > <p>Save</p> </Button>
      <Button variant="outline"> <p>Save</p> </Button>
    </div>
  );
}

export default DashboardPage