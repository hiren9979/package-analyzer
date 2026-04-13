// Lightweight semver parser and comparator

export function parseVersion(versionString) {
  if (!versionString) return null;
  
  // Remove leading ^ ~ or = symbols
  const cleanVersion = versionString.replace(/^[~^=]/, '').trim();
  
  // Extract major.minor.patch
  const match = cleanVersion.match(/^(\d+)\.(\d+)\.(\d+)/);
  
  if (!match) return null;
  
  return {
    major: parseInt(match[1], 10),
    minor: parseInt(match[2], 10),
    patch: parseInt(match[3], 10),
    original: versionString,
    clean: cleanVersion
  };
}

export function compareVersions(installed, latest) {
  const installedParsed = parseVersion(installed);
  const latestParsed = parseVersion(latest);
  
  if (!installedParsed || !latestParsed) {
    return null;
  }
  
  // Compare major
  if (installedParsed.major < latestParsed.major) {
    return 'major_behind';
  }
  if (installedParsed.major > latestParsed.major) {
    return 'ahead';
  }
  
  // Compare minor
  if (installedParsed.minor < latestParsed.minor) {
    return 'minor_behind';
  }
  if (installedParsed.minor > latestParsed.minor) {
    return 'ahead';
  }
  
  // Compare patch
  if (installedParsed.patch < latestParsed.patch) {
    return 'patch_behind';
  }
  if (installedParsed.patch > latestParsed.patch) {
    return 'ahead';
  }
  
  return 'equal';
}