import { useState, useCallback } from 'react';
import { fetchWithConcurrency } from '../utils/concurrentFetch';
import { calculatePackageStatus } from '../utils/statusCalculator';

export function useBatchAnalyze() {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const [error, setError] = useState(null);
  const [cache] = useState(new Map());
  
  const analyze = useCallback(async (packageJsonContent) => {
    setLoading(true);
    setError(null);
    setResults([]);
    
    try {
      // Parse package.json
      const parsed = JSON.parse(packageJsonContent);
      
      // Extract all dependencies
      const dependencies = {
        ...parsed.dependencies,
        ...parsed.devDependencies
      };
      
      const packages = Object.entries(dependencies).map(([name, version]) => ({
        name,
        installedVersion: version
      }));
      
      if (packages.length === 0) {
        throw new Error('No dependencies found in package.json');
      }
      
      setProgress({ current: 0, total: packages.length });
      
      // Fetch package data with concurrency limit
      const fetchPackage = async (pkg, index) => {
        // Check cache first
        if (cache.has(pkg.name)) {
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          return cache.get(pkg.name);
        }
        
        try {
          const response = await fetch(`https://registry.npmjs.org/${pkg.name}`);
          
          if (!response.ok) {
            throw new Error('Not found');
          }
          
          const data = await response.json();
          const latestVersion = data['dist-tags']?.latest || 'unknown';
          
          const result = {
            name: pkg.name,
            installedVersion: pkg.installedVersion,
            latestVersion,
            description: data.description || 'No description',
            repository: data.repository,
            lastPublish: data.time?.[latestVersion] || data.time?.modified,
            deprecated: data.deprecated || false,
            status: calculatePackageStatus(data, pkg.installedVersion, latestVersion),
            homepage: data.homepage,
            license: data.license
          };
          
          // Cache result
          cache.set(pkg.name, result);
          
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          
          return result;
        } catch (err) {
          setProgress(prev => ({ ...prev, current: prev.current + 1 }));
          
          return {
            name: pkg.name,
            installedVersion: pkg.installedVersion,
            latestVersion: 'unknown',
            description: 'Failed to fetch',
            status: 'WORST',
            error: err.message
          };
        }
      };
      
      const results = await fetchWithConcurrency(packages, fetchPackage, 5);
      
      const finalResults = results
        .filter(r => r.status === 'fulfilled')
        .map(r => r.value);
      
      setResults(finalResults);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [cache]);
  
  return { results, loading, progress, error, analyze };
}