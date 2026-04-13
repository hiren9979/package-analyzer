import { useState, useEffect } from 'react';

export function useNpmPackage(packageName) {
  const [data, setData] = useState(null);
  const [downloads, setDownloads] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    if (!packageName || packageName.trim() === '') {
      setData(null);
      setDownloads(null);
      setError(null);
      return;
    }
    
    const fetchPackage = async () => {
      setLoading(true);
      setError(null);
      
      try {
        // Fetch package metadata
        const packageResponse = await fetch(`https://registry.npmjs.org/${packageName}`);
        
        if (!packageResponse.ok) {
          if (packageResponse.status === 404) {
            throw new Error('Package not found');
          }
          throw new Error('Failed to fetch package data');
        }
        
        const packageData = await packageResponse.json();
        
        // Fetch download stats
        const downloadsResponse = await fetch(
          `https://api.npmjs.org/downloads/point/last-month/${packageName}`
        );
        
        let downloadsData = null;
        if (downloadsResponse.ok) {
          downloadsData = await downloadsResponse.json();
        }
        
        setData(packageData);
        setDownloads(downloadsData);
      } catch (err) {
        setError(err.message);
        setData(null);
        setDownloads(null);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPackage();
  }, [packageName]);
  
  return { data, downloads, loading, error };
}