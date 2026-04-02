import { Rotate3d } from "lucide-react";

const VirtualTour = () => (
  <section className="px-4 py-4">
    <h2 className="text-heading-sm text-foreground mb-3">Lihat Unit Secara Nyata</h2>
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
      <div className="w-full h-[500px]">
        <iframe 
          src="https://vista-forge-37.lovable.app/tour/3f130c76-7339-42d7-b90e-d923110f3df8" 
          width="100%" 
          height="100%" 
          frameBorder="0" 
          allow="gyroscope; accelerometer" 
          allowFullScreen
          title="Virtual Tour Unit"
        ></iframe>
      </div>
    </div>
  </section>
);

export default VirtualTour;
