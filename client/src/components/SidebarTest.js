import React from 'react';
import { useSidebarData } from '../hooks/useSidebarData';
import { renderIcon } from '../utils/iconMapper';

const SidebarTest = () => {
  const { sidebarData, loading, error, refreshData } = useSidebarData();

  if (loading) {
    return <div>Loading sidebar data...</div>;
  }

  if (error) {
    return (
      <div>
        <p>Error: {error}</p>
        <button onClick={refreshData}>Retry</button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px' }}>
      <h2>Sidebar Data Test</h2>
      <h3>Stats:</h3>
      <pre>{JSON.stringify(sidebarData?.stats, null, 2)}</pre>
      
      <h3>Menu Items:</h3>
      {sidebarData?.menuItems?.map((section, sectionIndex) => (
        <div key={sectionIndex} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
          <h4>
            {renderIcon(section.icon)} {section.title}
          </h4>
          <ul>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>
                {renderIcon(item.icon)} {item.label}
                {item.badge && <span style={{ background: 'red', color: 'white', padding: '2px 6px', borderRadius: '10px', marginLeft: '10px' }}>
                  {item.badge}
                </span>}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SidebarTest; 