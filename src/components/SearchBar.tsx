import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const query = formData.get("search") as string;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-3xl mx-auto">
      <div className="glass-effect rounded-xl p-2 flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
          <Input
            name="search"
            type="text"
            placeholder="Search NASA bioscience publications, experiments, and datasets..."
            className="pl-10 bg-transparent border-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0"
          />
        </div>
        <Button type="submit" variant="hero" size="lg">
          Search
        </Button>
      </div>
    </form>
  );
};
