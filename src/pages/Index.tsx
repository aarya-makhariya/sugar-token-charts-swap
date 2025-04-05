
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Sugar Token</h1>
        <p className="text-xl text-gray-600 mb-8">A test cryptocurrency with real-time price chart and swap functionality</p>
        
        <div className="flex justify-center">
          <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600">
            <Link to="/crypto">
              Launch Sugar Token Exchange
            </Link>
          </Button>
        </div>
        
        <div className="mt-8 max-w-md mx-auto text-left">
          <h2 className="text-lg font-semibold mb-2">Features:</h2>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>Real-time price chart with multiple timeframes</li>
            <li>Token swap interface</li>
            <li>Market statistics</li>
            <li>Mobile responsive design</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Index;
