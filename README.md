# VC Research Agent

A modern AI-powered research agent built with Next.js and browser-use technology. This application enables VCs, entrepreneurs, and researchers to quickly gather comprehensive information about startups and founders through a simple chat interface.

![VC Research Agent](https://via.placeholder.com/800x400/1f2937/ffffff?text=VC+Research+Agent)

## 🚀 Features

- **Startup Research**: Get detailed information about any startup including founders, funding, recent developments
- **Founder Profiles**: Research entrepreneurs and their backgrounds, current ventures, and contact information  
- **Email Drafting**: Generate personalized outreach emails to founders
- **Real-time Chat Interface**: Modern, responsive chat UI with markdown support
- **Browser Automation**: Powered by browser-use for accurate, up-to-date information
- **Slack-style Formatting**: Professional output formatting with links and structured data

## 🏗️ Built With

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **browser-use** - AI browser automation library
- **React Markdown** - Markdown rendering for chat messages

## 📋 Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- OpenAI API key (or other supported LLM provider)

## 🚀 Quick Start

### 1. Clone the Repository

```bash
git clone <repository-url>
cd vc-research-agent
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```bash
# LLM API Keys (choose your provider)
OPENAI_API_KEY=your_openai_api_key_here
ANTHROPIC_API_KEY=your_anthropic_api_key_here
GOOGLE_API_KEY=your_google_api_key_here

# Optional: Custom browser-use settings
BROWSERUSE_DEBUG=false
```

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 💡 Usage Examples

### Startup Research
```
Input: "Anthropic"
Output: Comprehensive information about Anthropic including founders, funding rounds, recent developments, and contact details.
```

### Founder Research  
```
Input: "Dario Amodei"
Output: Background, current role, previous experience, and contact information for the founder.
```

### Email Drafting
```
Input: "Write an email to the founder of OpenAI about potential collaboration"
Output: Professional, personalized email draft with context about the founder.
```

## 🔧 Customization

### Modifying the System Prompt

Edit the `SYSTEM_PROMPT` in `app/api/research/route.ts` to customize the agent's behavior:

```typescript
const SYSTEM_PROMPT = `You are Browser-Use created by the company Browser-Use, a professional startup researcher agent.

1. If the input is something about a startup name:
- Find and list the founders with their backgrounds
- Include their roles and experience
// ... customize as needed
`;
```

### Adding New Research Types

Extend the API route to handle different research scenarios:

```typescript
// Add new research logic in app/api/research/route.ts
if (query.includes('market analysis')) {
  // Custom market research logic
}
```

### Styling Customization

The app uses Tailwind CSS with a design system based on shadcn/ui components:

- Modify `tailwind.config.js` for theme changes
- Update `app/globals.css` for custom CSS variables
- Customize components in `components/ui/` for design changes

## 🔌 Browser-Use Integration

This application is designed to work with the browser-use library for real browser automation. The current implementation includes:

1. **Simulated Responses**: For development and demonstration
2. **API Integration Points**: Ready for browser-use integration
3. **Task Formatting**: Proper prompt structure for browser-use agents

### Integrating Real Browser-Use

To connect with actual browser-use:

1. Install browser-use dependencies:
```bash
pip install browser-use
playwright install chromium
```

2. Update the API route to call browser-use:
```typescript
// In app/api/research/route.ts
import { Agent } from 'browser-use';

const agent = new Agent({
  task: fullTask,
  llm: ChatOpenAI({ model: "gpt-4o" })
});

const result = await agent.run();
```

## 📁 Project Structure

```
vc-research-agent/
├── app/
│   ├── api/research/        # Research API endpoint
│   ├── globals.css          # Global styles
│   ├── layout.tsx           # Root layout
│   └── page.tsx             # Main page
├── components/
│   ├── ui/                  # Reusable UI components
│   └── chat-interface.tsx   # Main chat component
├── lib/
│   └── utils.ts             # Utility functions
├── README.md
├── package.json
└── tailwind.config.js
```

## 🌐 Deployment

### Deploy on Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to [Vercel](https://vercel.com)
3. Add environment variables in the Vercel dashboard
4. Deploy automatically

### Deploy on Other Platforms

The app is a standard Next.js application and can be deployed on:
- Netlify
- Railway
- AWS Amplify
- Docker containers

## 🤝 Contributing

This repository is designed as a template for building vertical applications around browser-use. Feel free to:

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- [browser-use](https://github.com/browser-use/browser-use) - The core browser automation library
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful and accessible component library
- [Next.js](https://nextjs.org/) - The React framework for production

## 📞 Support

If you have questions or need help:

1. Check the [browser-use documentation](https://docs.browser-use.com/)
2. Open an issue in this repository
3. Join the [browser-use Discord community](https://discord.gg/browser-use)

---

**Built with ❤️ for the VC and startup community**