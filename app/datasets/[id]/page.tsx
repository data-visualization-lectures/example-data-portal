import { notFound } from "next/navigation";
import Link from "next/link";
import { allDatasets, getDatasetById } from "@/lib/datasets";
import { Badge } from "@/components/ui/Badge";
import {
  FORMAT_COLORS,
  CHART_TYPE_COLORS,
  TOOL_COLORS,
  TOOL_LABELS,
} from "@/lib/constants";
import { ArrowLeft, Download, ExternalLink, FileText, Hash, HardDrive, Tag } from "lucide-react";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return allDatasets.map((d) => ({ id: d.id }));
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const dataset = getDatasetById(id);
  if (!dataset) return {};
  return {
    title: `${dataset.name} — Example Data Portal`,
    description: dataset.description,
  };
}

export default async function DatasetDetailPage({ params }: Props) {
  const { id } = await params;
  const dataset = getDatasetById(id);
  if (!dataset) notFound();

  const primaryDownloadUrl = Object.values(dataset.downloadUrls)[0];
  const primaryFormat = Object.keys(dataset.downloadUrls)[0];

  return (
    <div className="max-w-4xl mx-auto">
      <Link
        href="/datasets"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 mb-5 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Back to Datasets
      </Link>

      {/* Title row */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{dataset.name}</h1>
          <p className="text-gray-500 mt-1 text-sm leading-relaxed max-w-2xl">
            {dataset.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 shrink-0">
          {Object.entries(dataset.downloadUrls).map(([fmt, url]) => (
            <a
              key={fmt}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm rounded-lg font-medium transition-colors"
            >
              <Download className="w-4 h-4" />
              Download {fmt.toUpperCase()}
            </a>
          ))}
        </div>
      </div>

      {/* Metadata stat cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Tag className="w-3.5 h-3.5" /> Tool
          </p>
          <Badge className={TOOL_COLORS[dataset.tool]}>
            {TOOL_LABELS[dataset.tool]}
          </Badge>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" /> Rows
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {dataset.rows?.toLocaleString() ?? "—"}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5" /> Columns
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {dataset.columns ?? "—"}
          </p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
            <HardDrive className="w-3.5 h-3.5" /> Size
          </p>
          <p className="text-lg font-semibold text-gray-900">
            {dataset.sizeKb ? `${dataset.sizeKb} KB` : "—"}
          </p>
        </div>
      </div>

      {/* Tags & metadata card */}
      <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5 space-y-4">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 w-full sm:w-24 shrink-0">
            Formats
          </span>
          <div className="flex flex-wrap gap-1.5">
            {dataset.formats.map((f) => (
              <Badge key={f} className={FORMAT_COLORS[f]}>
                {f.toUpperCase()}
              </Badge>
            ))}
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs font-semibold text-gray-500 w-full sm:w-24 shrink-0">
            Chart Types
          </span>
          <div className="flex flex-wrap gap-1.5">
            {dataset.chartTypes.map((ct) => (
              <Badge key={ct} className={CHART_TYPE_COLORS[ct]}>
                {ct}
              </Badge>
            ))}
          </div>
        </div>
        {dataset.tags && dataset.tags.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 w-full sm:w-24 shrink-0">
              Tags
            </span>
            <div className="flex flex-wrap gap-1.5">
              {dataset.tags.map((tag) => (
                <Badge key={tag} className="bg-gray-100 text-gray-600">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        )}
        {dataset.license && (
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-gray-500 w-full sm:w-24 shrink-0">
              License
            </span>
            <span className="text-sm text-gray-700">{dataset.license}</span>
          </div>
        )}
        {dataset.source && dataset.source !== "internal" && (
          <div className="flex items-start gap-2">
            <span className="text-xs font-semibold text-gray-500 w-full sm:w-24 shrink-0 pt-0.5">
              データ出典
            </span>
            <a
              href={dataset.source}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-indigo-600 hover:text-indigo-800 hover:underline flex items-center gap-1 break-all"
            >
              {dataset.source}
              <ExternalLink className="w-3 h-3 shrink-0" />
            </a>
          </div>
        )}
      </div>

      {/* Long description */}
      {dataset.longDescription && (
        <div className="bg-white rounded-lg border border-gray-200 p-5 mb-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-3">
            About this dataset
          </h2>
          <p className="text-sm text-gray-600 leading-relaxed">
            {dataset.longDescription}
          </p>
        </div>
      )}

      {/* Download section */}
      <div className="bg-white rounded-lg border border-gray-200 p-5">
        <h2 className="text-sm font-semibold text-gray-900 mb-3">
          Download
        </h2>
        <div className="space-y-2">
          {Object.entries(dataset.downloadUrls).map(([fmt, url]) => (
            <div
              key={fmt}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-3 bg-gray-50 rounded-lg"
            >
              <div className="flex items-center gap-3 min-w-0">
                <Badge className={FORMAT_COLORS[fmt as keyof typeof FORMAT_COLORS] ?? "bg-gray-100 text-gray-600"}>
                  {fmt.toUpperCase()}
                </Badge>
                <span className="text-sm text-gray-600 font-mono text-xs truncate max-w-full sm:max-w-sm">
                  {url.length > 60 ? `${url.substring(0, 60)}...` : url}
                </span>
              </div>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-indigo-600 border border-indigo-300 rounded-lg hover:bg-indigo-50 font-medium transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                Download
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
