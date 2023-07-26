import { useStoreState } from "store/store";

export const useActiveRequestDetails = () => {
  const {
    requests: { activeRequest },
    common: { isNetworkError },
  } = useStoreState((state) => state);

  return {
    isNetworkError,
    activeRequest,
  };
};
