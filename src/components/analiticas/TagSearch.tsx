import { useState, useEffect } from "react";
import { Input } from "../ui/input";
import { useTags } from "@/hooks/useTags";
import { X } from "lucide-react";
import { Analitica } from "@/types";

type TagSearchProps = {
  analitica?: Analitica;
};

export default function TagSearch({ analitica }: TagSearchProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const { tags, error, handleAddTag, handleRemoveTag } = useTags();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  useEffect(() => {
    setSelectedTags(analitica?.tags?.map((tag) => tag.name) || []);
  }, [analitica]);

  useEffect(() => {
    if (query.length < 2) {
      setResults([]);
      return;
    }
    const filtered = tags
      .map((t) => t.name)
      .filter((name) => name.toLowerCase().includes(query.toLowerCase()));
    setResults(filtered);
  }, [query]);

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && query.trim()) {
      const normalizedQuery = query.trim().toLowerCase();
      if (!selectedTags.includes(normalizedQuery)) {
        setSelectedTags([...selectedTags, normalizedQuery]);
      }
      if (analitica) {
        await handleAddTag(analitica._id, normalizedQuery);
      }
      setQuery("");
    }
  };

  return (
    <div className='w-full max-w-md mx-auto mb-6'>
      <Input
        type='text'
        className='w-full'
        placeholder='busca etiqueta...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
      {selectedTags.length > 0 && (
        <div className='mt-2 flex flex-wrap gap-2'>
          {selectedTags.map((tag) => (
            <div
              key={tag}
              className='bg-gray-400 text-sm pl-3 py-1 rounded text-white'
            >
              #{tag}
              <button
                className='ml-2 text-white hover:text-red-500 focus:outline-none transition-transform duration-200 transform hover:scale-125 cursor-pointer'
                onClick={() => {
                  setSelectedTags(selectedTags.filter((t) => t !== tag));
                  const tagToRemove =
                    analitica?.tags?.filter((t) => t.name === tag) || [];
                  if (analitica?._id) {
                    handleRemoveTag(analitica._id, tagToRemove[0]._id);
                  }
                }}
              >
                <X height={10} />
              </button>
            </div>
          ))}
        </div>
      )}
      <ul className='mt-2 space-y-1'>
        {results.map((result) => (
          <li
            key={result}
            className='px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 cursor-pointer'
            onClick={async () => {
              if (!selectedTags.includes(result)) {
                setSelectedTags([...selectedTags, result]);
              }
              if (analitica) {
                await handleAddTag(analitica._id, result);
              }
            }}
          >
            #{result}
          </li>
        ))}
      </ul>
    </div>
  );
}
