import React from 'react';
import { useCircuitStore } from '../store/circuitStore';

const Wire = ({ connection, onDelete }) => {
  const { from, to, fromPin, toPin, fromPos, toPos } = connection;
  const { outputValues, inputValues, components } = useCircuitStore();

  // Calculate control points for curved wire
  const dx = toPos.x - fromPos.x;
  const dy = toPos.y - fromPos.y;
  const distance = Math.sqrt(dx * dx + dy * dy);
  
  // Create a smooth curve
  const controlPoint1X = fromPos.x + Math.min(distance * 0.5, 100);
  const controlPoint1Y = fromPos.y;
  const controlPoint2X = toPos.x - Math.min(distance * 0.5, 100);
  const controlPoint2Y = toPos.y;

  const pathData = `M ${fromPos.x} ${fromPos.y} C ${controlPoint1X} ${controlPoint1Y}, ${controlPoint2X} ${controlPoint2Y}, ${toPos.x} ${toPos.y}`;

  // Get signal value
  const getSignalValue = () => {
    const fromComponent = components.find(c => c.id === from);
    if (!fromComponent) return false;
    
    if (fromComponent.type === 'INPUT') {
      return inputValues[from] || false;
    } else {
      return outputValues[from] || false;
    }
  };

  const signalValue = getSignalValue();
  const wireColor = signalValue ? '#22c55e' : '#6b7280'; // Green for 1, gray for 0
  const wireWidth = signalValue ? '3' : '2';

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (window.confirm('Hapus koneksi ini?')) {
      onDelete(connection.id);
    }
  };

  return (
    <g>
      {/* Invisible thick line for easier clicking */}
      <path
        d={pathData}
        stroke="transparent"
        strokeWidth="12"
        fill="none"
        style={{ cursor: 'pointer' }}
        onContextMenu={handleContextMenu}
      />
      
      {/* Visible wire with signal color */}
      <path
        d={pathData}
        stroke={wireColor}
        strokeWidth={wireWidth}
        fill="none"
        className="transition-all duration-200"
        style={{ pointerEvents: 'none' }}
      />
      
      {/* Signal value indicator */}
      {distance > 60 && (
        <text
          x={(fromPos.x + toPos.x) / 2}
          y={(fromPos.y + toPos.y) / 2 - 8}
          textAnchor="middle"
          className="text-xs font-bold pointer-events-none"
          fill={signalValue ? '#22c55e' : '#6b7280'}
        >
          {signalValue ? '1' : '0'}
        </text>
      )}
      
      {/* Connection points */}
      <circle
        cx={fromPos.x}
        cy={fromPos.y}
        r="3"
        fill="#ef4444"
        className="pointer-events-none"
      />
      <circle
        cx={toPos.x}
        cy={toPos.y}
        r="3"
        fill="#3b82f6"
        className="pointer-events-none"
      />
    </g>
  );
};

export default Wire;

