import { useState } from "react";
import { SearchBar } from "@/components/SearchBar";
import { PublicationCard } from "@/components/PublicationCard";
import { StatsCard } from "@/components/StatsCard";
import { PlanetAnimation } from "@/components/PlanetAnimation";
import { MilkyWayBackground } from "@/components/MilkyWayBackground";
import { Button } from "@/components/ui/button";
import { Database, Sparkles, Network, Rocket, FileText } from "lucide-react";
import heroImage from "@/assets/hero-space.jpg";

const Index = () => {
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [planetType, setPlanetType] = useState<"mars" | "moon" | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    // Detect planet type from search query
    const lowerQuery = query.toLowerCase();
    if (lowerQuery.includes("mars")) {
      setPlanetType("mars");
    } else if (lowerQuery.includes("moon") || lowerQuery.includes("lunar")) {
      setPlanetType("moon");
    } else {
      setPlanetType(null);
    }
    // Mock search results - will be replaced with actual NASA API integration
    const mockResults = [
      {
        title: "Transcriptomic Analysis of Arabidopsis Seedlings Grown in Simulated Lunar Regolith",
        authors: ["Johnson, M.", "Smith, R.", "Chen, L."],
        date: "2024-08-15",
        abstract: "This study investigates gene expression changes in Arabidopsis thaliana when grown in lunar regolith simulant. Results show adaptive responses in nutrient uptake pathways and stress response mechanisms, providing insights for future lunar agriculture systems.",
        tags: ["Arabidopsis", "Lunar Agriculture", "Gene Expression", "OSDR-242"],
        relevance: "Critical for establishing sustainable plant growth systems on lunar surface habitats during Artemis missions."
      },
      {
        title: "Microgravity Effects on Human Cardiovascular System: A Meta-Analysis",
        authors: ["Williams, A.", "Zhang, Y.", "Rodriguez, C."],
        date: "2024-07-22",
        abstract: "Comprehensive analysis of cardiovascular adaptations during long-duration spaceflight. Data from ISS experiments reveal significant changes in cardiac output and vascular resistance, with implications for Mars mission planning.",
        tags: ["Human Health", "Cardiovascular", "ISS", "OSDR-187"],
        relevance: "Essential data for crew health monitoring systems and countermeasure development for extended Mars transit periods."
      },
      {
        title: "Radiation Tolerance in Bacillus Subtilis: Implications for Planetary Protection",
        authors: ["Kumar, S.", "Thompson, J.", "Lee, K."],
        date: "2024-06-10",
        abstract: "Investigation of DNA repair mechanisms in Bacillus subtilis exposed to cosmic radiation levels. Findings suggest enhanced repair pathways that could inform bioregenerative life support systems.",
        tags: ["Bacteria", "Radiation Biology", "DNA Repair", "OSDR-156"],
        relevance: "Informs planetary protection protocols and potential use of extremophiles in closed-loop life support for Mars habitats."
      }
    ];
    setSearchResults(mockResults);
  };

  return (
    <div className="min-h-screen">
      <MilkyWayBackground />
      <PlanetAnimation planetType={planetType} searchQuery={searchQuery} />
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="inline-flex items-center gap-2 glass-effect px-4 py-2 rounded-full text-sm text-primary">
              <Sparkles className="h-4 w-4" />
              NASA Space Apps Challenge 2024
            </div>
            
            <h1 className="text-5xl md:text-7xl font-bold leading-tight">
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Moon Hackers
              </span>
              <br />
              <span className="text-foreground">Research Discovery</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              AI-powered knowledge graph platform for NASA bioscience research. 
              Accelerating discovery for Moon and Mars missions through intelligent data integration.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="hero" size="lg">
                <Database className="mr-2 h-5 w-5" />
                Explore Research
              </Button>
              <Button variant="outline" size="lg">
                <Network className="mr-2 h-5 w-5" />
                View Knowledge Graph
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <StatsCard 
            icon={Database} 
            label="Publications Indexed" 
            value="2,847" 
            trend="+156 this month"
          />
          <StatsCard 
            icon={Network} 
            label="Research Connections" 
            value="12.4K" 
            trend="Growing network"
          />
          <StatsCard 
            icon={Rocket} 
            label="Active Experiments" 
            value="423" 
            trend="From OSDR"
          />
          <StatsCard 
            icon={Sparkles} 
            label="AI Insights" 
            value="1,892" 
            trend="Generated today"
          />
        </div>
      </section>

      {/* Search Section */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-foreground mb-3">Search NASA Bioscience Data</h2>
            <p className="text-muted-foreground">
              Access OSDR publications, GeneLab datasets, and mission-relevant research
            </p>
          </div>
          
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Results Section */}
      {searchResults.length > 0 && (
        <section className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-2xl font-bold text-foreground mb-6">
              Search Results ({searchResults.length})
            </h3>
            <div className="space-y-6">
              {searchResults.map((result, index) => (
                <PublicationCard key={index} {...result} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Powered by AI & Knowledge Graphs
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Advanced capabilities designed for NASA researchers and mission planners
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="glass-effect p-6 rounded-xl space-y-3">
              <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">AI Summarization</h3>
              <p className="text-muted-foreground text-sm">
                Automatic extraction of key findings, organisms, assays, and experimental conditions from research papers
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-3">
              <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center glow-secondary">
                <Network className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Knowledge Graph</h3>
              <p className="text-muted-foreground text-sm">
                Interactive visualization of research connections, identifying patterns across experiments and publications
              </p>
            </div>

            <div className="glass-effect p-6 rounded-xl space-y-3">
              <div className="h-12 w-12 rounded-lg bg-accent/20 flex items-center justify-center">
                <Rocket className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold text-foreground">Mission Relevance</h3>
              <p className="text-muted-foreground text-sm">
                Automatic assessment of research applicability to Artemis Moon program and Mars exploration initiatives
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Data Sources Section */}
      <section className="container mx-auto px-4 py-16 border-t border-border/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-3">
              Data Sources & References
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Our platform integrates data from official NASA repositories and peer-reviewed scientific publications
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="https://www.nasa.gov/osdr-api/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-effect p-6 rounded-xl hover:glow-primary transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-primary/20 flex items-center justify-center glow-primary flex-shrink-0">
                  <Database className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                    NASA OSDR API
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Open Science Data Repository - Biological and physical science data from space biology experiments
                  </p>
                  <p className="text-xs text-primary font-mono">
                    www.nasa.gov/osdr-api
                  </p>
                </div>
              </div>
            </a>

            <a 
              href="https://academic.oup.com/nar/article/49/D1/D1515/5932845?login=false" 
              target="_blank" 
              rel="noopener noreferrer"
              className="glass-effect p-6 rounded-xl hover:glow-secondary transition-all duration-300 group"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-lg bg-secondary/20 flex items-center justify-center glow-secondary flex-shrink-0">
                  <FileText className="h-6 w-6 text-secondary" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    GeneLab Database
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nucleic Acids Research - Comprehensive omics database for spaceflight and space-relevant studies
                  </p>
                  <p className="text-xs text-secondary font-mono">
                    academic.oup.com/nar
                  </p>
                </div>
              </div>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
