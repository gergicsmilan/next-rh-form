import { useEffect, useState } from "react";
import { defaultData } from "../defaultData";
import { ExampleFormType } from "../exampleFormTypes";

const useDefaultData = () => {
  const [isDefaultDataLoading, setDefaultDataLoading] = useState(true);
  const [_defaultData, setDefaultData] = useState(
    undefined as undefined | ExampleFormType
  );

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDefaultDataLoading(false);
      setDefaultData(defaultData);
    }, 1000);

    return () => clearTimeout(timeout);
  }, []);

  return { defaultData: _defaultData, isDefaultDataLoading };
};

export default useDefaultData;
