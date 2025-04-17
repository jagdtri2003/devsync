import React from 'react';
import './SettingsPanel.css';
import { freeThemes, proThemes } from '../../resources/editorThemes';
import { dracula } from '@uiw/codemirror-themes-all';
import { useUser } from '@clerk/clerk-react';
import { freeFonts,proFonts } from '../../resources/Fonts';

function SettingsPanel({ theme, setTheme, language, setLanguage, fontSize, setFontSize, fontFamily, setFontFamily }) {
  // For displaying theme names
  const themeNames = Object.keys({...freeThemes, ...proThemes});
  const { user } = useUser();
  
  const languages = [
    { value: 'javascript', label: 'JavaScript' },
    { value: 'html', label: 'HTML' },
    { value: 'css', label: 'CSS' }
  ];

  const fontSizes = [10,12, 14, 16, 18, 20, 24];

  // Helper function to get the current theme name
  const getCurrentThemeName = () => {
    return Object.entries({...freeThemes, ...proThemes}).find(
      ([_, themeObj]) => themeObj === theme
    )?.[0] || 'Dracula';
  };

  // Handle theme change
  const handleThemeChange = (e) => {
    const selectedThemeName = e.target.value;
    const selectedTheme = {...freeThemes, ...proThemes}[selectedThemeName];
    if (selectedTheme) {
      setTheme(selectedTheme);
    } else {
      // Fallback to dracula if theme not found
      setTheme(dracula);
    }
  };

  return (
    <div className="settings-panel">
      <h3 className="settings-title">Settings</h3>

      <div className="settings-section">
        <label htmlFor="font-family">Font Family</label>
        <select 
          id="font-family"
          className="settings-select"
          value={fontFamily}
          onChange={(e) => setFontFamily(e.target.value)}
        >
          {freeFonts.map(family => (
            <option key={family} value={family} >{family}</option>
          ))}
          {proFonts.map(family => (
            <option key={family} value={family} disabled={user?.unsafeMetadata?.plan ==='Free'}>{family} {user?.unsafeMetadata?.plan ==='Free' ? '🔒' : ''}</option>
          ))}
        </select>
      </div>

      <div className="settings-section">
        <label htmlFor="theme">Theme</label>
        <select 
          id="theme"
          className="settings-select"
          value={getCurrentThemeName()}
          onChange={handleThemeChange}
        >
          {themeNames.map(name => (
            <option key={name} value={name} disabled={proThemes[name] && user?.unsafeMetadata?.plan ==='Free'}>
              {name} {proThemes[name] && user?.unsafeMetadata?.plan ==='Free' ? '🔒' : ''}
            </option>
          ))}
        </select>
      </div>

      <div className="settings-section">
        <label htmlFor="language">Language</label>
        <select 
          id="language"
          className="settings-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          {languages.map(l => (
            <option key={l.value} value={l.value}>{l.label}</option>
          ))}
        </select>
      </div>

      <div className="settings-section">
        <label htmlFor="font-size">Font Size</label>
        <select 
          id="font-size"
          className="settings-select"
          value={fontSize}
          onChange={(e) => setFontSize(Number(e.target.value))}
        >
          {fontSizes.map(size => (
            <option key={size} value={size}>{size}px</option>
          ))}
        </select>
      </div>

      <button onClick={() => {
        setTheme(dracula);
        setLanguage('javascript');
        setFontSize(16);
      }} className="reset-button">Reset to default</button>
    </div>
  );
}

export default SettingsPanel; 