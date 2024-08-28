import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import CreateSegment from "../../components/CreateSegment";
import { getSegmentData } from "../../api/segmentApi";

const HomePage = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getSegmentData(setData);
  }, []);
  return (
    <div>
      <Header />
      <CreateSegment />
    </div>
  );
};

export default HomePage;
