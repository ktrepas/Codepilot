import React, { useState } from 'react';
import { Code2, BookOpen, Bug, Trophy, Play } from 'lucide-react';

function AppWithBackend() {
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');
  const [code, setCode] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const executeCode = async () => {
    setOutput('');
    if (selectedLanguage === 'python') {
      setIsLoading(true);
      try {
        const response = await fetch('http://127.0.0.1:5000/api/python', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ code })
        });
        const data = await response.json();
        setOutput(data.output || data.error || '');
      } catch (error) {
        setOutput('Error: Could not reach backend server.');
      } finally {
        setIsLoading(false);
      }
    } else {
      let logs: string[] = [];
      const customConsole = {
        log: (...args: any[]) => logs.push(args.join(' ')),
        error: (...args: any[]) => logs.push('Error: ' + args.join(' ')),
        warn: (...args: any[]) => logs.push('Warning: ' + args.join(' ')),
      };
      try {
        const fn = new Function('console', `\n${code}`);
        const result = fn(customConsole);
        if (logs.length > 0) {
          setOutput(logs.join('\n'));
        } else if (result !== undefined) {
          setOutput(String(result));
        } else {
          setOutput('');
        }
      } catch (error) {
        setOutput(error instanceof Error ? `Error: ${error.message}` : `Error: ${String(error)}`);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <nav className="bg-gray-800 border-b border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Code2 className="h-8 w-8 text-indigo-400" />
              <span className="ml-2 text-xl font-semibold text-gray-100">CodeMentor</span>
            </div>
            <div className="flex space-x-4">
              <button className="text-gray-300 hover:text-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                Sign In
              </button>
              <button className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-indigo-700">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-100 sm:text-5xl md:text-6xl">
            Learn to Code Through
            <span className="text-indigo-400"> Active Practice</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-gray-400 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Master programming concepts by explaining code in your own words and debugging real-world problems.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <FeatureCard
            icon={<BookOpen className="h-8 w-8 text-indigo-400" />}
            title="Learn by Explaining"
            description="Deepen your understanding by explaining code concepts in your own words."
          />
          <FeatureCard
            icon={<Bug className="h-8 w-8 text-indigo-400" />}
            title="Debug Real Code"
            description="Practice finding and fixing bugs in real-world code examples."
          />
          <FeatureCard
            icon={<Trophy className="h-8 w-8 text-indigo-400" />}
            title="Track Progress"
            description="Monitor your learning journey with achievements and progress tracking."
          />
        </div>

        <div className="mt-16 bg-gray-800 rounded-lg shadow-xl overflow-hidden border border-gray-700">
          <div className="px-6 py-8">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-gray-100">Try it now!</h2>
              <div className="flex items-center space-x-4">
                <select
                  value={selectedLanguage}
                  onChange={(e) => setSelectedLanguage(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-gray-100 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="javascript">JavaScript</option>
                  <option value="python">Python</option>
                </select>
                <button
                  onClick={executeCode}
                  disabled={isLoading}
                  className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  <Play className="h-4 w-4" />
                  <span>{isLoading ? 'Loading...' : 'Run'}</span>
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-gray-700 p-4 rounded-lg">
                  <textarea
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="w-full h-48 font-mono bg-transparent text-gray-100 outline-none placeholder-gray-400"
                    placeholder="Write your code here..."
                  />
                </div>
                {output && (
                  <div className="bg-gray-950 text-gray-100 p-4 rounded-lg">
                    <pre className="whitespace-pre-wrap">{output}</pre>
                  </div>
                )}
              </div>
              <div>
                <p className="text-gray-400 mb-4">Explain how this code works in your own words:</p>
                <textarea
                  className="w-full h-32 p-3 bg-gray-700 border border-gray-600 rounded-md text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-400"
                  placeholder="Type your explanation here..."
                />
                <button className="mt-4 w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                  Submit Explanation
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

type FeatureCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 transform transition-transform hover:scale-105 border border-gray-700">
      <div className="flex items-center justify-center w-12 h-12 rounded-md bg-gray-700 mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium text-gray-100">{title}</h3>
      <p className="mt-2 text-gray-400">{description}</p>
    </div>
  );
}

export default AppWithBackend;
