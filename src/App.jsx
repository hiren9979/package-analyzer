import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import './App.css';

// Components
import Header from './components/Header';
import TabSwitcher from './components/TabSwitcher';
import SearchBar from './components/SinglePackage/SearchBar';
import PackageCard from './components/SinglePackage/PackageCard';
import JsonInput from './components/PackageAnalyzer/JsonInput';
import ProgressBar from './components/PackageAnalyzer/ProgressBar';
import SummaryBanner from './components/PackageAnalyzer/SummaryBanner';
import FilterBar from './components/PackageAnalyzer/FilterBar';
import PackageTable from './components/PackageAnalyzer/PackageTable';
import Skeleton from './components/ui/skeleton';
import ErrorCard from './components/ui/ErrorCard.jsx';
import KeyboardShortcuts from './components/KeyboardShortcuts';

// Hooks
import { useNpmPackage } from './hooks/useNpmPackage';
import { useBatchAnalyze } from './hooks/useBatchAnalyze';

function App() {
  const [activeTab, setActiveTab] = useState('single');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState('all');
  
  // Single Package Hook
  const { data, downloads, loading, error } = useNpmPackage(searchQuery);
  
  // Batch Analyzer Hook
  const { results, loading: analyzing, progress, error: analyzeError, analyze } = useBatchAnalyze();
  
  // Filter results
  const filteredResults = filter === 'all'
    ? results
    : results.filter(r => r.status === filter);
  
  return (
    <div className="App">
      <Header />
      
      <Container className="content-wrapper pb-5">
        <TabSwitcher activeTab={activeTab} onTabChange={setActiveTab} />
        
        {/* Single Package Tab */}
        {activeTab === 'single' && (
          <div data-testid="single-package-view">
            <SearchBar onSearch={setSearchQuery} />
            
            {loading && (
              <div>
                <Skeleton height="50px" className="mb-3" />
                <Skeleton height="300px" />
              </div>
            )}
            
            {error && <ErrorCard message={error} title="Package Not Found" />}
            
            {data && !loading && <PackageCard data={data} downloads={downloads} />}
            
            {!loading && !error && !data && (
              <div className="text-center text-muted py-5" data-testid="empty-state">
                Search for any npm package to see its health report
              </div>
            )}
          </div>
        )}
        
        {/* Package Analyzer Tab */}
        {activeTab === 'analyzer' && (
          <div data-testid="analyzer-view">
            <JsonInput onAnalyze={analyze} />
            
            {analyzing && <ProgressBar current={progress.current} total={progress.total} />}
            
            {analyzeError && <ErrorCard message={analyzeError} title="Analysis Error" />}
            
            {results.length > 0 && !analyzing && (
              <>
                <SummaryBanner results={results} />
                <FilterBar activeFilter={filter} onFilterChange={setFilter} />
                <PackageTable packages={filteredResults} />
              </>
            )}
            
            {!analyzing && results.length === 0 && !analyzeError && (
              <div className="text-center text-muted py-5" data-testid="empty-analyzer-state">
                Paste your package.json content above to analyze all dependencies
              </div>
            )}
          </div>
        )}
      </Container>
    </div>
  );
}

export default App;
