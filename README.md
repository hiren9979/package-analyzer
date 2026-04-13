# Package Analyzer

A powerful tool to analyze and explore npm package dependencies, health metrics, and security insights.

## Features

- **Single Package Analysis**: Search and analyze any npm package for health metrics
- **Batch Package Analysis**: Upload your package.json to analyze all dependencies at once
- **Comprehensive Scoring**: Get detailed package health scores from 0-100
- **Dependency Insights**: Understand package relationships and potential issues
- **Modern UI**: Clean, responsive interface built with React and Tailwind CSS

## Package Health Score

Our scoring system evaluates packages on a scale of 0-100, where **100 represents a perfectly healthy package**. Here's how we calculate the score:

### Scoring Breakdown (Total: 100 points)

#### Popularity & Usage (30 points)
- **Weekly Downloads** (15 points)
  - >1M downloads: 15 points
  - 100K-1M downloads: 12 points
  - 10K-100K downloads: 8 points
  - 1K-10K downloads: 4 points
  - <1K downloads: 0 points

- **GitHub Stars** (10 points)
  - >10K stars: 10 points
  - 1K-10K stars: 7 points
  - 100-1K stars: 4 points
  - <100 stars: 0 points

- **Dependents Count** (5 points)
  - >1K dependents: 5 points
  - 100-1K dependents: 3 points
  - 10-100 dependents: 1 point
  - <10 dependents: 0 points

#### Security & Maintenance (35 points)
- **Last Update** (15 points)
  - Updated within 1 month: 15 points
  - Updated within 3 months: 12 points
  - Updated within 6 months: 8 points
  - Updated within 1 year: 4 points
  - Updated >1 year ago: 0 points

- **Security Vulnerabilities** (15 points)
  - No vulnerabilities: 15 points
  - Low severity only: 10 points
  - Moderate severity: 5 points
  - High severity: 0 points

- **License** (5 points)
  - Has valid license: 5 points
  - No license: 0 points

#### Code Quality (20 points)
- **Bundle Size** (10 points)
  - <100KB: 10 points
  - 100KB-500KB: 7 points
  - 500KB-1MB: 4 points
  - >1MB: 0 points

- **Dependencies** (10 points)
  - 0-5 dependencies: 10 points
  - 6-15 dependencies: 7 points
  - 16-30 dependencies: 4 points
  - >30 dependencies: 0 points

#### Community & Support (15 points)
- **Issues Management** (8 points)
  - <10 open issues: 8 points
  - 10-50 open issues: 5 points
  - 50-100 open issues: 2 points
  - >100 open issues: 0 points

- **Documentation** (7 points)
  - Comprehensive README: 7 points
  - Basic documentation: 4 points
  - Minimal documentation: 1 point
  - No documentation: 0 points

### Score Interpretation

- **90-100**: Excellent - Well-maintained, secure, and popular
- **75-89**: Good - Generally healthy with minor concerns
- **60-74**: Fair - Some issues that should be reviewed
- **40-59**: Poor - Significant concerns, consider alternatives
- **0-39**: Very Poor - Major issues, avoid if possible

## Installation

```bash
# Clone the repository
git clone https://github.com/hiren9979/package-analyzer.git
cd package-analyzer

# Install dependencies
npm install

# Start development server
npm run dev
```

## Usage

### Single Package Analysis
1. Navigate to the "Single Package" tab
2. Enter an npm package name (e.g., "react", "lodash")
3. View detailed health metrics and score

### Batch Package Analysis
1. Navigate to the "Package Analyzer" tab
2. Paste your package.json content
3. Click "Analyze Dependencies"
4. Review comprehensive analysis of all dependencies

## Tech Stack

- **Frontend**: React 19, Vite
- **Styling**: Tailwind CSS, Bootstrap
- **UI Components**: shadcn/ui, Radix UI
- **Charts**: Recharts
- **HTTP Client**: Axios
- **Forms**: React Hook Form with Zod validation

## Requirements

- Node.js 20.x or higher
- npm or yarn package manager

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Links

- [Live Demo](https://your-demo-url.com)
- [GitHub Repository](https://github.com/hiren9979/package-analyzer)
- [Report Issues](https://github.com/hiren9979/package-analyzer/issues)

## Acknowledgments

- npm registry for package data
- GitHub API for repository information
- Open Source Security Platform for vulnerability data
