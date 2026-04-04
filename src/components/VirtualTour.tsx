import { useEffect } from "react";

const VirtualTour = () => {
  useEffect(() => {
    const handler = (e: DeviceMotionEvent) => {
      const iframe = document.getElementById("tour-embeded") as HTMLIFrameElement;
      if (iframe?.contentWindow) {
        iframe.contentWindow.postMessage({
          type: "devicemotion",
          deviceMotionEvent: {
            acceleration: { x: e.acceleration?.x, y: e.acceleration?.y, z: e.acceleration?.z },
            accelerationIncludingGravity: { x: e.accelerationIncludingGravity?.x, y: e.accelerationIncludingGravity?.y, z: e.accelerationIncludingGravity?.z },
            rotationRate: { alpha: e.rotationRate?.alpha, beta: e.rotationRate?.beta, gamma: e.rotationRate?.gamma },
            interval: e.interval,
            timeStamp: e.timeStamp,
          },
        }, "*");
      }
    };
    window.addEventListener("devicemotion", handler);
    return () => window.removeEventListener("devicemotion", handler);
  }, []);

  return (
    <section className="px-4 py-4">
      <h2 className="text-heading-sm text-foreground mb-3">Virtual Room Tour</h2>
      <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
        <iframe
          id="tour-embeded"
          name="Room Apartmen Gunawangsa Gresik"
          src="https://tour.panoee.net/iframe/69d17eda7469c62bf6f49581"
          frameBorder="0"
          width="100%"
          height="400px"
          scrolling="no"
          allow="vr; xr; accelerometer; gyroscope; autoplay;"
          allowFullScreen
          loading="lazy"
          title="Virtual Room Tour Apartemen Gunawangsa Gresik"
        />
      </div>
    </section>
  );
};

export default VirtualTour;
