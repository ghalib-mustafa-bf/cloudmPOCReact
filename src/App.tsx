import React from 'react';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-navy-light p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header to test custom colors */}
        <h1 className="text-4xl font-bold text-navy mb-8 text-center">
          CloudM POC - Tailwind Test
        </h1>
        
        {/* Test card using @apply directive */}
        <div className="test-card mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Testing Tailwind Configuration
          </h2>
          <p className="text-gray-600 mb-4">
            This card uses the custom @apply directive from our CSS file.
          </p>
          
          {/* Test various Tailwind utilities */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-primary text-white p-4 rounded">
              <h3 className="font-bold">Primary Color</h3>
              <p className="text-sm opacity-90">Using custom color</p>
            </div>
            <div className="bg-accent text-white p-4 rounded">
              <h3 className="font-bold">Accent Color</h3>
              <p className="text-sm opacity-90">From theme</p>
            </div>
            <div className="bg-success text-white p-4 rounded">
              <h3 className="font-bold">Success Color</h3>
              <p className="text-sm opacity-90">Semantic color</p>
            </div>
          </div>
          
          {/* Test buttons */}
          <div className="flex flex-wrap gap-3">
            <button className="test-button">
              Custom Button Class
            </button>
            <button className="px-4 py-2 bg-warning text-gray-800 rounded hover:opacity-90 transition-opacity">
              Warning Button
            </button>
            <button className="px-4 py-2 bg-danger text-white rounded hover:bg-red-600 transition-colors">
              Danger Button
            </button>
          </div>
        </div>
        
        {/* Test CSS variables */}
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-4">CSS Variables Test</h3>
          <div className="space-y-2">
            <div 
              className="p-3 rounded"
              style={{ backgroundColor: 'var(--color-navy-light)' }}
            >
              Using CSS variable: --color-navy-light
            </div>
            <div 
              className="p-3 rounded text-white"
              style={{ backgroundColor: 'var(--color-navy)' }}
            >
              Using CSS variable: --color-navy
            </div>
            <div 
              className="p-3 rounded"
              style={{ backgroundColor: 'var(--color-fee-bg)' }}
            >
              Using CSS variable: --color-fee-bg
            </div>
          </div>
        </div>
        
        {/* Test responsive design */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((num) => (
            <div 
              key={num}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow"
            >
              <div className="h-20 bg-gradient-to-r from-primary to-accent rounded mb-2"></div>
              <p className="text-center text-gray-700">Card {num}</p>
            </div>
          ))}
        </div>
        
        {/* Test hover and transition effects */}
        <div className="mt-8 p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
          <h3 className="text-lg font-semibold mb-2">Hover Effects Test</h3>
          <p className="text-gray-600">
            Hover over this card to see shadow and transform transitions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default App;