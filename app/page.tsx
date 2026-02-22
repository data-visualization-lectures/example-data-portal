import { allDatasets } from "@/lib/datasets";
import { DatasetsBrowser } from "@/components/datasets/DatasetsBrowser";

export default function Home() {
  return (
    <div>
      <DatasetsBrowser allDatasets={allDatasets} />
    </div>
  );
}
