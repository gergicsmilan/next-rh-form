import { useEffect, useMemo, useState } from "react";

const useOptions = () => {
  const [isOptionsLoading, setOptionsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setOptionsLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const carOptions = useMemo(
    () => [
      { label: "Első autó", id: "0" },
      { label: "Második autó", id: "1" },
      { label: "Harmadik autó", id: "2" },
    ],
    []
  );

  const dayOptions = useMemo(
    () => [
      { label: "Hétfő", id: "0H" },
      { label: "Kedd", id: "1K" },
      { label: "Szerda", id: "2Sze" },
    ],
    []
  );

  return { carOptions, dayOptions, isOptionsLoading };
};

export default useOptions;
