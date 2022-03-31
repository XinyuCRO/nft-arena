import Link from "next/link";
import { useEffect } from "react";

import { HeroTicket } from "../components/HeroTicket";

const Index = function () {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "lofi");
  }, []);

  return (
    <div className="hero">
      <div className="text-center hero-content">
        <div className="">
          <div className="flex items-center justify-center max-w-md m-auto mt-10 mb-10">
            <figure className="m-auto">
              <HeroTicket />
            </figure>
          </div>
          <div className="space-y-10">
            <div className="text-6xl font-bold tracking-wide text-white uppercase">Next Level Ticketing</div>
            <Link href="/events">
              <button className="bg-white btn btn-outline hover:bg-secondary hover:text-white btn-xs sm:btn-sm md:btn-md lg:btn-lg">Browse Events</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Index;
