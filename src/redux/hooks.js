const { useDispatch, useSelector } = require("react-redux");
const { useEffect, useState } = require("react");

const useAppDispatch = useDispatch;
const useAppSelector = useSelector;

const useDebounced = ({ searchQuery, delay }) => {
  const [debouncedValue, setDebouncedValue] = useState(searchQuery);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(searchQuery);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery, delay]);

  return debouncedValue;
};

module.exports = { useAppDispatch, useAppSelector, useDebounced };
