# Contributing to Real-Time Toxicity Detector

Thank you for your interest in contributing to the Real-Time Toxicity Detector project! This document provides guidelines and instructions for contributing to the project.

## Code of Conduct

By participating in this project, you agree to abide by our Code of Conduct. Please read the [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) file for more details.

## How to Contribute

1. Fork the repository
2. Create a new branch for your feature or bugfix
3. Make your changes
4. Submit a pull request

## Development Setup

### Prerequisites

- Python 3.9+
- Node.js 16+
- Docker and Docker Compose
- Git

### Setting Up the Development Environment

1. Clone the repository:

```bash
git clone https://github.com/yourusername/Real-Time-Toxicity-Detector.git
cd Real-Time-Toxicity-Detector
```

2. Set up the Python environment:

```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
```

3. Set up the frontend:

```bash
cd frontend
npm install
```

4. Start the development environment:

```bash
docker-compose up -d
```

## Coding Standards

### Python

- Follow PEP 8 style guide
- Use type hints
- Write docstrings for all public functions and classes
- Keep functions small and focused
- Write unit tests for new features

### JavaScript/TypeScript

- Follow ESLint rules
- Use TypeScript for type safety
- Write JSDoc comments for public functions
- Follow React best practices
- Write unit tests for components

## Testing

### Backend Tests

```bash
pytest tests/
```

### Frontend Tests

```bash
cd frontend
npm test
```

## Pull Request Process

1. Ensure your code passes all tests
2. Update documentation if necessary
3. Provide a clear description of your changes
4. Reference any related issues
5. Wait for review and address any feedback

## Documentation

- Keep documentation up to date
- Use clear and concise language
- Include examples where appropriate
- Document any breaking changes

## Issue Reporting

When reporting issues, please include:

- A clear description of the problem
- Steps to reproduce
- Expected behavior
- Actual behavior
- Environment details
- Screenshots if applicable

## Feature Requests

For feature requests:

- Describe the feature in detail
- Explain why it would be valuable
- Provide examples of how it would be used
- Consider contributing the feature yourself

## Security

If you discover a security vulnerability, please report it privately to the maintainers.

## License

By contributing to this project, you agree that your contributions will be licensed under the project's MIT License.
