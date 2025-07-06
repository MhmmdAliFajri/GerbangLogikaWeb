import React, { useState, useRef } from 'react';
import { useCircuitStore } from '../store/circuitStore';

const DraggableComponent = ({ component, children }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const { updateComponentPosition, removeComponent, selectedComponent, selectComponent } = useCircuitStore();
  const dragRef = useRef(null);

  const handleMouseDown = (e) => {
    if (e.button !== 0) return; // Only handle left click
    
    const rect = dragRef.current.getBoundingClientRect();
    const canvasRect = dragRef.current.closest('.canvas-area').getBoundingClientRect();
    
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    });
    
    setIsDragging(true);
    selectComponent(component.id);
    
    // Prevent text selection
    e.preventDefault();
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const canvasRect = dragRef.current.closest('.canvas-area').getBoundingClientRect();
    const newX = e.clientX - canvasRect.left - dragOffset.x;
    const newY = e.clientY - canvasRect.top - dragOffset.y;
    
    // Constrain to canvas bounds
    const constrainedX = Math.max(0, Math.min(newX, canvasRect.width - 100));
    const constrainedY = Math.max(0, Math.min(newY, canvasRect.height - 80));
    
    updateComponentPosition(component.id, { x: constrainedX, y: constrainedY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleContextMenu = (e) => {
    e.preventDefault();
    if (window.confirm(`Hapus komponen ${component.type}?`)) {
      removeComponent(component.id);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Delete' && selectedComponent === component.id) {
      removeComponent(component.id);
    }
  };

  // Add global mouse event listeners when dragging
  React.useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('keydown', handleKeyDown);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
        document.removeEventListener('keydown', handleKeyDown);
      };
    }
  }, [isDragging, dragOffset]);

  return (
    <div
      ref={dragRef}
      className={`absolute cursor-move select-none transition-shadow ${
        isDragging ? 'shadow-lg scale-105 z-50' : 'hover:shadow-md'
      } ${
        selectedComponent === component.id ? 'ring-2 ring-blue-500' : ''
      }`}
      style={{ 
        left: component.position.x, 
        top: component.position.y,
        transform: isDragging ? 'rotate(2deg)' : 'rotate(0deg)'
      }}
      onMouseDown={handleMouseDown}
      onContextMenu={handleContextMenu}
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {children}
    </div>
  );
};

export default DraggableComponent;

