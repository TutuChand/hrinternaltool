import { useMutation, useQueryClient } from "@tanstack/react-query";
import { bulkImportApi } from "../../Api/addemployee";

export const useBulkImport = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: bulkImportApi,

    onSuccess: () => {
      queryClient.invalidateQueries(["employeeList"]);
      alert("Employees imported successfully ✅");
    },

    onError: (error) => {
      console.error("Error during bulk import:", error);
      alert(error.message || "Import failed ❌");
    },
  });
};
