import React from 'react';
import { Slider } from './Slider';
import { Switch } from './Switch';
import { Select } from './Select';
import { ColorPicker } from './ColorPicker';
import { useLanguage } from '../contexts/LanguageContext';
import { 
  AlignLeft, AlignCenter, AlignJustify,
  Type, ArrowUpDown, TextQuote,
  Maximize2, BookOpen, MinusCircle,
  PlusCircle, RotateCcw, Bookmark
} from 'lucide-react';

const fonts = [
  { value: 'system-ui', label: 'System Default' },
  { value: 'arial', label: 'Arial' },
  { value: 'times-new-roman', label: 'Times New Roman' },
  { value: 'open-dyslexic', label: 'OpenDyslexic' },
  { value: 'georgia', label: 'Georgia' },
  { value: 'verdana', label: 'Verdana' }
];

const themes = [
  { value: 'default', label: 'Default', bg: '#ffffff', text: '#000000' },
  { value: 'sepia', label: 'Sepia', bg: '#f4ecd8', text: '#5b4636' },
  { value: 'dark', label: 'Dark', bg: '#222222', text: '#ffffff' },
  { value: 'high-contrast', label: 'High Contrast', bg: '#000000', text: '#ffffff' }
];

interface ReadModeSectionProps {
  enabled: boolean;
  setEnabled: (enabled: boolean) => void;
  fontSize: number;
  setFontSize: (size: number) => void;
  lineHeight: number;
  setLineHeight: (height: number) => void;
}

export function ReadModeSection({
  enabled,
  setEnabled,
  fontSize,
  setFontSize,
  lineHeight,
  setLineHeight
}: ReadModeSectionProps) {
  const { t } = useLanguage();
  const [font, setFont] = React.useState('system-ui');
  const [letterSpacing, setLetterSpacing] = React.useState(0);
  const [textAlign, setTextAlign] = React.useState<'left' | 'center' | 'justify'>('left');
  const [theme, setTheme] = React.useState(themes[0]);
  const [isTextOnly, setIsTextOnly] = React.useState(false);
  const [isLineFocus, setIsLineFocus] = React.useState(false);
  const [isFullScreen, setIsFullScreen] = React.useState(false);
  const [maxWidth, setMaxWidth] = React.useState(800);

  const handleFontSizeChange = (newSize: number) => {
    setFontSize(Math.min(Math.max(newSize, 12), 32));
  };

  const resetSettings = () => {
    setFont('system-ui');
    setFontSize(16);
    setLineHeight(1.5);
    setLetterSpacing(0);
    setTextAlign('left');
    setTheme(themes[0]);
    setMaxWidth(800);
  };

  const previewText = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

  const previewStyle = {
    fontFamily: font,
    fontSize: `${fontSize}px`,
    lineHeight: lineHeight,
    letterSpacing: `${letterSpacing}px`,
    textAlign,
    backgroundColor: theme.bg,
    color: theme.text,
    padding: '2rem',
    maxWidth: `${maxWidth}px`,
    margin: '0 auto',
    transition: 'all 0.3s ease'
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">{t('readMode.enable')}</label>
        <Switch checked={enabled} onCheckedChange={setEnabled} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Type className="w-4 h-4" />
              {t('readMode.font')}
            </label>
            <Select
              value={font}
              onValueChange={setFont}
              options={fonts}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center justify-between">
              <span className="flex items-center gap-2">
                <Type className="w-4 h-4" />
                {t('readMode.fontSize')} ({fontSize}px)
              </span>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleFontSizeChange(fontSize - 1)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Decrease font size"
                >
                  <MinusCircle className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFontSizeChange(fontSize + 1)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700"
                  title="Increase font size"
                >
                  <PlusCircle className="w-4 h-4" />
                </button>
              </div>
            </label>
            <Slider
              value={[fontSize]}
              onValueChange={([value]) => handleFontSizeChange(value)}
              min={12}
              max={32}
              step={1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <ArrowUpDown className="w-4 h-4" />
              {t('readMode.lineHeight')}
            </label>
            <Slider
              value={[lineHeight]}
              onValueChange={([value]) => setLineHeight(value)}
              min={1}
              max={2}
              step={0.1}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <TextQuote className="w-4 h-4" />
              {t('readMode.letterSpacing')}
            </label>
            <Slider
              value={[letterSpacing]}
              onValueChange={([value]) => setLetterSpacing(value)}
              min={0}
              max={5}
              step={0.5}
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">{t('readMode.theme')}</label>
            <div className="flex gap-2">
              {themes.map((t) => (
                <button
                  key={t.value}
                  onClick={() => setTheme(t)}
                  className={`w-8 h-8 rounded-full border-2 ${
                    theme.value === t.value ? 'ring-2 ring-blue-500' : ''
                  }`}
                  style={{ backgroundColor: t.bg }}
                  title={t.label}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">{t('readMode.textAlign')}</label>
            <div className="flex gap-2">
              <button
                onClick={() => setTextAlign('left')}
                className={`p-2 rounded ${
                  textAlign === 'left' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
                title="Align left"
              >
                <AlignLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextAlign('center')}
                className={`p-2 rounded ${
                  textAlign === 'center' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
                title="Align center"
              >
                <AlignCenter className="w-4 h-4" />
              </button>
              <button
                onClick={() => setTextAlign('justify')}
                className={`p-2 rounded ${
                  textAlign === 'justify' ? 'bg-blue-500 text-white' : 'bg-gray-100 dark:bg-gray-800'
                }`}
                title="Justify text"
              >
                <AlignJustify className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium flex items-center gap-2">
              <Maximize2 className="w-4 h-4" />
              {t('readMode.maxWidth')}
            </label>
            <Slider
              value={[maxWidth]}
              onValueChange={([value]) => setMaxWidth(value)}
              min={400}
              max={1200}
              step={50}
            />
          </div>

          <div className="flex items-center justify-between">
            <label className="text-sm font-medium flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              {t('readMode.textOnly')}
            </label>
            <Switch checked={isTextOnly} onCheckedChange={setIsTextOnly} />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={resetSettings}
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-800 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            title="Reset all settings"
          >
            <RotateCcw className="w-4 h-4" />
            {t('readMode.reset')}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <Switch checked={isLineFocus} onCheckedChange={setIsLineFocus} />
          <label className="text-sm font-medium">
            {t('readMode.lineFocus')}
          </label>
        </div>
      </div>

      <div className="preview-section rounded-lg shadow-lg overflow-hidden">
        <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800">
          <h2 className="text-lg font-semibold">{t('preview')}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setIsFullScreen(!isFullScreen)}
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Toggle fullscreen"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
              title="Save bookmark"
            >
              <Bookmark className="w-4 h-4" />
            </button>
          </div>
        </div>
        <div 
          className={`relative ${isFullScreen ? 'fixed inset-0 z-50' : ''}`}
          style={previewStyle}
        >
          {isLineFocus && (
            <div className="absolute inset-0 bg-black/50">
              <div className="h-8 bg-transparent my-4" />
            </div>
          )}
          <p className="relative z-10">{previewText}</p>
          {!isTextOnly && (
            <img
              src="https://images.unsplash.com/photo-1490730141103-6cac27aaab94"
              alt="Sample"
              className="w-full h-48 object-cover rounded mt-4"
            />
          )}
        </div>
      </div>
    </div>
  );
}