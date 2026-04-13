import { compareVersions } from './semver';

// Calculate package status: GOOD, BAD, WORST, BEST
export function calculatePackageStatus(packageData, installedVersion, latestVersion) {
  // Check if deprecated
  if (packageData.deprecated) {
    return 'WORST';
  }
  
  // Check last publish date (if > 2 years, consider abandoned)
  const lastPublish = new Date(packageData.time?.[latestVersion] || packageData.time?.modified);
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 2);
  
  if (lastPublish < twoYearsAgo) {
    return 'WORST';
  }
  
  // Compare versions
  const comparison = compareVersions(installedVersion, latestVersion);
  
  if (comparison === 'equal') {
    return 'GOOD';
  }
  
  if (comparison === 'ahead') {
    return 'BEST';
  }
  
  if (comparison === 'major_behind') {
    return 'BAD';
  }
  
  if (comparison === 'minor_behind' || comparison === 'patch_behind') {
    return 'GOOD'; // Minor/patch behind is still acceptable
  }
  
  return 'GOOD';
}

// Calculate overall health score for single package view
export function calculateHealthScore(packageData, npmDownloads) {
  let score = 0;
  
  // Check deprecation
  if (packageData.deprecated) {
    return 0;
  }
  
  // Check recent activity (25 points)
  const latestVersion = packageData['dist-tags']?.latest;
  const lastPublish = new Date(packageData.time?.[latestVersion] || packageData.time?.modified);
  const monthsAgo = (Date.now() - lastPublish.getTime()) / (1000 * 60 * 60 * 24 * 30);
  
  if (monthsAgo < 6) score += 25;
  else if (monthsAgo < 12) score += 15;
  else if (monthsAgo < 24) score += 5;
  
  // Check downloads (25 points)
  const downloads = npmDownloads?.downloads || 0;
  if (downloads > 1000000) score += 25;
  else if (downloads > 100000) score += 20;
  else if (downloads > 10000) score += 15;
  else if (downloads > 1000) score += 10;
  else if (downloads > 100) score += 5;
  
  // Check version history (25 points)
  const versions = Object.keys(packageData.versions || {});
  if (versions.length > 50) score += 25;
  else if (versions.length > 20) score += 20;
  else if (versions.length > 10) score += 15;
  else if (versions.length > 5) score += 10;
  
  // Check if has repo (25 points)
  if (packageData.repository?.url) score += 25;
  
  return Math.min(score, 100);
}

export function getHealthLabel(score) {
  if (score >= 80) return { label: 'EXCELLENT', variant: 'GOOD' };
  if (score >= 60) return { label: 'GOOD', variant: 'GOOD' };
  if (score >= 40) return { label: 'FAIR', variant: 'BAD' };
  if (score >= 20) return { label: 'POOR', variant: 'BAD' };
  return { label: 'CRITICAL', variant: 'WORST' };
}