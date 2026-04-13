// Extract GitHub URL from npm package repository field
export function extractGithubUrl(repository) {
  if (!repository) return null;
  
  let url = typeof repository === 'string' ? repository : repository.url;
  
  if (!url) return null;
  
  // Remove git+ prefix and .git suffix
  url = url.replace(/^git\+/, '').replace(/\.git$/, '');
  
  // Convert git:// to https://
  url = url.replace(/^git:\/\//, 'https://');
  
  // Convert ssh format to https
  url = url.replace(/^git@github\.com:/, 'https://github.com/');
  
  if (url.includes('github.com')) {
    return url;
  }
  
  return null;
}

// Extract owner and repo from GitHub URL for API calls
export function parseGithubUrl(url) {
  if (!url) return null;
  
  const match = url.match(/github\.com\/([^\/]+)\/([^\/]+)/);
  
  if (match) {
    return {
      owner: match[1],
      repo: match[2]
    };
  }
  
  return null;
}