export default function SimilarProducts({ tag }: { tag: string }) {
  return (
    <div className="mt-8 border-t border-gray-200 pt-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">
        Similar Products as {tag}
      </h2>
      <div className="h-48 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400">
        Similar products section
      </div>
    </div>
  );
}
