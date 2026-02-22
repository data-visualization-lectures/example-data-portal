import { allDatasets } from "@/lib/datasets";
import { DatasetsBrowser } from "@/components/datasets/DatasetsBrowser";

export default function DatasetsPage() {
  return (
    <div>
      <DatasetsBrowser allDatasets={allDatasets} />
    </div>
  );
}
