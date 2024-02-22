import Image from "next/image";
import Link from "next/link";
import React from "react";
import {agentsData} from "@/data/agents"


const AgentsView = ({data} : any) => {
  return (
    <>
      {agentsData.map((agent : any) => (
        <div className="col" key={agent.id}>
          <div className="feature-style2 mb30">
            <div className="feature-img">
              <Link  href={`/agent-single/${agent.id}`}>
                <Image
                  width={210}
                  height={240}
                  className="bdrs12 w-100 h-100 cover"
                  src={agent.image}
                  alt="agents"
                />
              </Link>
            </div>
            <div className="feature-content pt20">
              <h6 className="title mb-1">
                <Link href={`/agent-single/${agent.id}`}>{agent.name}</Link>
              </h6>
              <p className="text fz15">Broker</p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default AgentsView;
