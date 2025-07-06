import React, { useState } from 'react';
import { useCircuitStore } from '../store/circuitStore';

const ConnectionPin = ({ 
  componentId, 
  pinType, // 'input' or 'output'
  pinIndex = 0,
  position,
  isConnected = false 
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const { 
    addConnection, 
    connections, 
    components,
    mode,
    connectionMode,
    setConnectionMode,
    tempConnection,
    setTempConnection
  } = useCircuitStore();

  const handleMouseDown = (e) => {
    if (mode !== 'edit') return;
    
    e.stopPropagation();
    
    if (pinType === 'output') {
      // Start creating a connection from output pin
      const component = components.find(c => c.id === componentId);
      const pinPosition = getPinPosition(component, pinType, pinIndex);
      
      setConnectionMode(true);
      setTempConnection({
        from: componentId,
        fromPin: pinIndex,
        fromPos: pinPosition,
        toPos: { x: e.clientX, y: e.clientY }
      });
    }
  };

  const handleMouseUp = (e) => {
    if (mode !== 'edit' || !connectionMode || !tempConnection) return;
    
    e.stopPropagation();
    
    if (pinType === 'input' && tempConnection.from !== componentId) {
      // Complete the connection to input pin
      const component = components.find(c => c.id === componentId);
      const pinPosition = getPinPosition(component, pinType, pinIndex);
      
      // Check if this input is already connected
      const existingConnection = connections.find(
        conn => conn.to === componentId && conn.toPin === pinIndex
      );
      
      if (!existingConnection) {
        const newConnection = {
          id: `conn_${Date.now()}`,
          from: tempConnection.from,
          to: componentId,
          fromPin: tempConnection.fromPin,
          toPin: pinIndex,
          fromPos: tempConnection.fromPos,
          toPos: pinPosition
        };
        
        addConnection(newConnection);
      }
      
      setConnectionMode(false);
      setTempConnection(null);
    }
  };

  const getPinPosition = (component, type, index) => {
    const baseX = component.position.x;
    const baseY = component.position.y;
    
    if (type === 'output') {
      return {
        x: baseX + (component.type === 'INPUT' ? 80 : 96), // Right side
        y: baseY + (component.type === 'INPUT' ? 24 : 32)  // Center
      };
    } else {
      // Input pin
      if (component.inputs === 1) {
        return {
          x: baseX,
          y: baseY + (component.type === 'OUTPUT' ? 24 : 32)
        };
      } else {
        return {
          x: baseX,
          y: baseY + 20 + (index * 24)
        };
      }
    }
  };

  const pinColor = pinType === 'output' ? '#ef4444' : '#3b82f6';
  const hoverColor = pinType === 'output' ? '#dc2626' : '#2563eb';

  return (
    <div
      className={`absolute w-3 h-3 rounded-full border-2 border-white shadow-sm cursor-pointer transition-all duration-200 ${
        isHovered ? 'scale-125' : ''
      } ${
        isConnected ? 'ring-2 ring-yellow-400' : ''
      }`}
      style={{
        backgroundColor: isHovered ? hoverColor : pinColor,
        left: position.x,
        top: position.y,
        transform: 'translate(-50%, -50%)',
        zIndex: 10
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

export default ConnectionPin;

