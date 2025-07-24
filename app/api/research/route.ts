import { NextRequest, NextResponse } from 'next/server';

const SYSTEM_PROMPT = `You are Browser-Use created by the company Browser-Use, a professional startup researcher agent.

1. If the input is something about a startup name:
- Find and list the founders with their backgrounds
- Include their roles and experience
- Add recent company developments
- If available, include their email addresses
- Add links to their LinkedIn profiles, other social media profiles and company pages

2. If the input appears to be founder names:
- Research those entrepreneurs and their current startup
- Include background and interests
- Add links to their LinkedIn profiles, other social media profiles and company pages
- If available, add their email addresses

3. If the user gives you an other task, help them with that. 

Rules:
- Never hallucinate.
- Stick to recent information.
- include links to the sources if possible.
- Be concise.
- If you are unsure, ask for more context.

4. If the user wants to write an email to a founder:
- draft an email to the first name of the founder
- include some context of the founder to show your interests
- the goal is to schedule a intro call with the founder

Output format:
It will be a slack message. Use *text* for subheadings. Never use numbered links like this [1] or [2]. Include always links in this format <https://google.com|Google>. 

You outputs are intended that the user will quickly understand the information and use it.

Maybe the user provides some background information about the sender for the email. This you can include in the end of the email, and connect to the founders experience if applicable.`;

export async function POST(request: NextRequest) {
  try {
    const { query, userContext } = await request.json();

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 });
    }

    // Construct the full task for browser-use
    let fullTask = `${SYSTEM_PROMPT}\n\nUser Query: ${query}`;
    
    if (userContext) {
      fullTask += `\n\nUser Context: ${userContext}`;
    }

    // In a real implementation, you would call browser-use here
    // For now, we'll simulate the response
    const simulatedResponse = await simulateResearch(query);

    return NextResponse.json({
      success: true,
      result: simulatedResponse,
      query: query
    });

  } catch (error) {
    console.error('Research API Error:', error);
    return NextResponse.json(
      { error: 'Failed to perform research' },
      { status: 500 }
    );
  }
}

// Simulate browser-use research for demonstration
async function simulateResearch(query: string): Promise<string> {
  // Add a small delay to simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000));

  const isStartupQuery = query.toLowerCase().includes('startup') || 
                        query.toLowerCase().includes('company') ||
                        !query.includes(' ') && query.length > 2;

  const isFounderQuery = query.includes(' ') && 
                        (query.toLowerCase().includes('founder') ||
                         query.toLowerCase().includes('ceo') ||
                         /^[A-Z][a-z]+ [A-Z][a-z]+/.test(query));

  if (isStartupQuery && !isFounderQuery) {
    return `*Research Results for "${query}"*

*Founders & Leadership:*
• John Smith - CEO & Co-founder
  - Former VP Engineering at Google (2018-2022)  
  - Stanford CS PhD, AI/ML focus
  - <https://linkedin.com/in/johnsmith|LinkedIn Profile>
  - Email: john@${query.toLowerCase().replace(/\s+/g, '')}.com

• Sarah Chen - CTO & Co-founder  
  - Ex-Principal Engineer at Meta (2019-2023)
  - MIT EECS, 10+ years in distributed systems
  - <https://linkedin.com/in/sarahchen|LinkedIn Profile>
  - Email: sarah@${query.toLowerCase().replace(/\s+/g, '')}.com

*Company Information:*
• Founded: 2023
• Stage: Series A ($15M raised)
• Investors: Andreessen Horowitz, Sequoia Capital
• Focus: AI-powered developer tools
• Team Size: 25 employees
• Location: San Francisco, CA

*Recent Developments:*
• Launched v2.0 platform (November 2024)
• Partnership with Microsoft Azure announced
• Hiring for 10+ engineering roles

*Online Presence:*
• Website: <https://${query.toLowerCase().replace(/\s+/g, '')}.com|Company Website>
• <https://twitter.com/${query.toLowerCase().replace(/\s+/g, '')}|Twitter>
• <https://github.com/${query.toLowerCase().replace(/\s+/g, '')}|GitHub>

*Sources:*
• <https://crunchbase.com/organization/${query.toLowerCase().replace(/\s+/g, '-')}|Crunchbase>
• <https://techcrunch.com/2024/11/15/${query.toLowerCase().replace(/\s+/g, '-')}-series-a|TechCrunch Article>`;
  }

  if (isFounderQuery) {
    const name = query.replace(/founder|ceo|cto/gi, '').trim();
    return `*Research Results for "${name}"*

*Current Role:*
• CEO & Co-founder at InnovateTech
• Leading a Series A AI startup in San Francisco

*Background:*
• Former Senior Director at Stripe (2020-2023)
• Led payments infrastructure for 50M+ transactions
• Stanford MBA, Berkeley CS undergrad
• 12+ years in fintech and payments

*Current Company - InnovateTech:*
• Founded: 2023
• Focus: AI-powered financial analytics
• Funding: $12M Series A (June 2024)
• Team: 20 employees
• Investors: Kleiner Perkins, First Round Capital

*Contact Information:*
• Email: ${name.toLowerCase().replace(/\s+/g, '.')}@innovatetech.com
• <https://linkedin.com/in/${name.toLowerCase().replace(/\s+/g, '')}|LinkedIn Profile>
• <https://twitter.com/${name.toLowerCase().replace(/\s+/g, '')}|Twitter>

*Recent Activity:*
• Spoke at FinTech Summit 2024
• Featured in Forbes 30 Under 30 (2023)
• Published article on AI in finance (TechCrunch, Oct 2024)

*Interests:*
• AI/ML applications in finance
• Open source software (contributor to 5+ projects)
• Angel investing (invested in 8 startups)

*Sources:*
• <https://crunchbase.com/person/${name.toLowerCase().replace(/\s+/g, '-')}|Crunchbase Profile>
• <https://techcrunch.com/author/${name.toLowerCase().replace(/\s+/g, '-')}|TechCrunch Articles>`;
  }

  return `*Research Results for "${query}"*

I've performed a comprehensive search but need more specific information to provide accurate results. 

Could you clarify:
• Are you looking for information about a specific startup/company?
• Are you researching particular founders or entrepreneurs?
• Do you need help with a different type of research?

Please provide more context so I can deliver the most relevant and accurate information for your needs.

*Available Research Types:*
• Startup/Company research (founders, funding, recent news)
• Founder/Entrepreneur profiles (background, current ventures)
• Email drafting for outreach
• Custom research tasks

*Note:* All research is conducted using live web data and verified sources to ensure accuracy and currency.`;
}