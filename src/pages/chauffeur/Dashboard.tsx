import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Clock, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";

const chauffeursEnRoute = [
  {
    id: 1,
    name: "Ahmed B.",
    plate: "1-ABC-123",
    startTime: "08:30",
    image: "/driverimg.jpg",
    phone: "+12345678901",
  },
  {
    id: 2,
    name: "Sophie L.",
    plate: "2-XYZ-456",
    startTime: "09:15",
    image: "/driverimg.jpg",
    phone: "+12345678902",
  },
  {
    id: 3,
    name: "Youssef K.",
    plate: "3-JKL-789",
    startTime: "10:00",
    image: "/driverimg.jpg",
    phone: "+12345678903",
  },
  {
    id: 4,
    name: "Fatima R.",
    plate: "4-MNO-654",
    startTime: "07:45",
    image: "/driverimg.jpg",
    phone: "+12345678904",
  },
  {
    id: 5,
    name: "Omar T.",
    plate: "5-QWE-987",
    startTime: "06:30",
    image: "/driverimg.jpg",
    phone: "+12345678905",
  },
];

const Dashboard = () => {
  const location = useLocation();

  const generateWhatsAppLink = (phone) => `https://wa.me/${phone}`;

  return (
    <div className="container mx-auto p-4">
      {location.pathname === "/admin/dashboard" ? (
        <div className="flex flex-col items-center  min-h-screen">
          <h2 className="text-2xl font-bold mb-20 text-yellow-500">
            <Clock className="inline mr-2 text-yellow-500" /> Chauffeurs en
            service actuellement
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {chauffeursEnRoute.map((chauffeur) => (
              <div
                key={chauffeur.id}
                className="bg-gray-800 p-6 rounded-lg shadow-lg flex items-center space-x-4 border border-yellow-500 relative"
              >
                <img
                  src={chauffeur.image}
                  alt={chauffeur.name}
                  className="w-16 h-16 rounded-full border-2 border-yellow-400"
                />
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    {chauffeur.name}
                  </h3>
                  <p className="text-gray-400">
                    <Tag className="inline mr-1" /> {chauffeur.plate}
                  </p>
                  <p className="text-gray-400">
                    <Clock className="inline mr-1" /> Départ:{" "}
                    {chauffeur.startTime}
                  </p>
                  <a
                    href={generateWhatsAppLink(chauffeur.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button
                      variant="outline"
                      className="mt-5 flex items-center text-sm hover:bg-yellow-500 hover:text-white"
                    >
                      <img
                        src="/whatsapp.png"
                        alt="WhatsApp"
                        className="h-6 w-6"
                      />
                      <span>Contacter</span>
                    </Button>
                  </a>
                </div>
                <div className="absolute top-0 right-0 p-2">
                  <img src="/online.gif" alt="En route" className="w-5 h-5" />
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
};

export default Dashboard;
