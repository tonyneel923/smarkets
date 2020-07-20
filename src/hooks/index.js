import { useEffect, useState } from "react";
import Styles from "~/src/utils/styles";

/**
 * used to change values based on screen size breakpoints
 * @param {object} breakpointValues of shape { medium: values, large, values, xl, values }
 * @returns {any} any values you define for that breakpoint
 */
export function useTransformOnScreenChange(breakpointValues) {
  const [screenSize, setScreenSize] = useState(getScreenSize());
  useEffect(() => {
    window.addEventListener("resize", onScreenChange);

    return function cleanup() {
      window.removeEventListener("resize", onScreenChange);
    };
  }, []);

  function onScreenChange() {
    setScreenSize(getScreenSize());
  }

  function getScreenSize() {
    const screenWidth = window.innerWidth;
    const { breakpoints } = Styles;
    // xl, large, medium
    const screenBreakpoints = Object.keys(breakpoints).reverse();
    const screenMeasurement = screenBreakpoints.find(
      (breakpoint) => screenWidth >= breakpoints[breakpoint].split("px")[0]
    );
    return screenMeasurement;
  }

  // need to check if screen is smaller than given breakpoints and default to the smallest supplied
  return (
    breakpointValues[screenSize] ||
    breakpointValues.medium ||
    breakpointValues.large ||
    breakpointValues.xl
  );
}

/**
 * use for newtwork calls, would probably add skip and other flags for prod
 * @param {string} endpoint you want to hit
 * @param {object} payload for your request
 */
export const useFetch = (endpoint, payload) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const options = {
    "content-type": "application/json",
    ...payload,
  };

  useEffect(() => {
    const fetchData = () => {
      setIsLoading(true);
      fetch(`https://cors-anywhere.herokuapp.com/${endpoint}`, { ...options })
        .then((res) => res.json())
        .then((responseData) => {
          setResponse(responseData);
          setIsLoading(false);
        })
        .catch((error) => {
          setIsLoading(false);
          setError(error);
        });
    };
    fetchData();
  }, [endpoint]);
  return { data: response, error, isLoading };
};
