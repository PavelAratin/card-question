import { useState } from "react";
import { delayFn } from "../helpers/delayFn";
import { toast } from "react-toastify";
export const useFetch = (cb) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const fetchFn = async (arg) => {
    try {
      setIsLoading(true);
      setError("");
      await delayFn();
      const response = await cb(arg);
      return response;
    } catch (error) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false);
    }
  }
  return [fetchFn, isLoading, error]

}