import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Switch } from './Switch';

const colorModes = {
  normal: { icon: '👁️', filter: 'none' },
  protanopia: {
    icon: '🔴',
    filter: 'url(#protanopia)'
  },
  deuteranopia: {
    icon: '🟢',
    filter: 'url(#deuteranopia)'
  },
  tritanopia: {
    icon: '🔵',
    filter: 'url(#tritanopia)'
  },
  monochromacy: {
    icon: '⚫',
    filter: 'grayscale(100%)'
  },
  protanomaly: {
    icon: '🌅',
    filter: 'url(#protanomaly)'
  },
  deuteranomaly: {
    icon: '🌄',
    filter: 'url(#deuteranomaly)'
  },
  tritanomaly: {
    icon: '🌊',
    filter: 'url(#tritanomaly)'
  },
  achromatomaly: {
    icon: '🌫️',
    filter: 'grayscale(50%)'
  }
};

interface ColorBlindSectionProps {
  activeMode: string;
  setActiveMode: (mode: string) => void;
  siteEnabled: boolean;
  setSiteEnabled: (enabled: boolean) => void;
}

export function ColorBlindSection({
  activeMode,
  setActiveMode,
  siteEnabled,
  setSiteEnabled
}: ColorBlindSectionProps) {
  const { t } = useLanguage();

  // SVG filters for color vision deficiency simulation
  const svgFilters = `
    <svg style="display:none">
      <defs>
        <filter id="protanopia">
          <feColorMatrix
            type="matrix"
            values="0.567,0.433,0,0,0
                    0.558,0.442,0,0,0
                    0,0.242,0.758,0,0
                    0,0,0,1,0"/>
        </filter>
        <filter id="deuteranopia">
          <feColorMatrix
            type="matrix"
            values="0.625,0.375,0,0,0
                    0.7,0.3,0,0,0
                    0,0.3,0.7,0,0
                    0,0,0,1,0"/>
        </filter>
        <filter id="tritanopia">
          <feColorMatrix
            type="matrix"
            values="0.95,0.05,0,0,0
                    0,0.433,0.567,0,0
                    0,0.475,0.525,0,0
                    0,0,0,1,0"/>
        </filter>
        <filter id="protanomaly">
          <feColorMatrix
            type="matrix"
            values="0.817,0.183,0,0,0
                    0.333,0.667,0,0,0
                    0,0.125,0.875,0,0
                    0,0,0,1,0"/>
        </filter>
        <filter id="deuteranomaly">
          <feColorMatrix
            type="matrix"
            values="0.8,0.2,0,0,0
                    0.258,0.742,0,0,0
                    0,0.142,0.858,0,0
                    0,0,0,1,0"/>
        </filter>
        <filter id="tritanomaly">
          <feColorMatrix
            type="matrix"
            values="0.967,0.033,0,0,0
                    0,0.733,0.267,0,0
                    0,0.183,0.817,0,0
                    0,0,0,1,0"/>
        </filter>
      </defs>
    </svg>
  `;

  React.useEffect(() => {
    // Insert SVG filters into the document if they don't exist
    if (!document.getElementById('colorblind-filters')) {
      const filterContainer = document.createElement('div');
      filterContainer.id = 'colorblind-filters';
      filterContainer.innerHTML = svgFilters;
      document.body.appendChild(filterContainer);
    }
  }, []);

  const getFilterStyle = (mode: string) => {
    if (!siteEnabled) return {};
    return {
      filter: colorModes[mode as keyof typeof colorModes]?.filter || 'none',
      WebkitFilter: colorModes[mode as keyof typeof colorModes]?.filter || 'none'
    };
  };

  return (
    <div className="space-y-6">
      <div className="vision-modes grid grid-cols-3 gap-4">
        {Object.entries(colorModes).map(([id, { icon }]) => (
          <button
            key={id}
            onClick={() => setActiveMode(id)}
            className={`mode-button p-4 rounded-lg shadow transition-all ${
              activeMode === id
                ? 'bg-blue-500 text-white ring-2 ring-blue-300'
                : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <span className="mode-icon text-2xl block mb-2">{icon}</span>
            <span className="mode-name text-sm font-medium">
              {t(`mode.${id}`)}
            </span>
          </button>
        ))}
      </div>

      <div className="preview-section bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">{t('preview')}</h2>
        <div className="preview-container space-y-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">Color Spectrum</h3>
            <div
              className="color-strip h-8 rounded"
              style={{
                background: 'linear-gradient(to right, #ff0000, #ff8000, #ffff00, #00ff00, #00ffff, #0000ff, #8000ff, #ff00ff)',
                ...getFilterStyle(activeMode)
              }}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">Natural Image</h3>
            <img
              src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94"
              alt="Sunset landscape"
              className="w-full h-48 object-cover rounded"
              style={getFilterStyle(activeMode)}
            />
          </div>

          <div className="space-y-2">
            <h3 className="text-sm font-medium">UI Elements</h3>
            <div className="grid grid-cols-4 gap-2" style={getFilterStyle(activeMode)}>
              <div className="h-8 bg-blue-500 rounded"></div>
              <div className="h-8 bg-green-500 rounded"></div>
              <div className="h-8 bg-red-500 rounded"></div>
              <div className="h-8 bg-yellow-500 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="site-settings bg-white dark:bg-gray-800 rounded-lg shadow p-4">
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium">{t('site.enable')}</label>
          <Switch checked={siteEnabled} onCheckedChange={setSiteEnabled} />
        </div>
      </div>
    </div>
  );
}