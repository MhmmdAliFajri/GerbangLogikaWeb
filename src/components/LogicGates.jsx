import React from 'react';

// Komponen untuk gerbang AND
export const AndGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">AND</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang OR
export const OrGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">OR</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang NOT
export const NotGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">NOT</div>
      
      {/* Input pin */}
      <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1 -translate-y-1/2"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang NAND
export const NandGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">NAND</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang NOR
export const NorGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">NOR</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang XOR
export const XorGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">XOR</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk gerbang XNOR
export const XnorGate = ({ id, position, inputs, output, onInputChange }) => {
  return (
    <div 
      className="bg-white border-2 border-gray-400 rounded-lg p-2 w-20 h-16 flex items-center justify-center relative"
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">XNOR</div>
      
      {/* Input pins */}
      <div className="absolute left-0 top-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      <div className="absolute left-0 bottom-2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1"></div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk input switch
export const InputSwitch = ({ id, position, value, onChange }) => {
  return (
    <div 
      className="bg-green-200 border-2 border-green-400 rounded-lg p-2 w-16 h-12 flex items-center justify-center relative cursor-pointer"
      style={{ position: 'absolute', left: position.x, top: position.y }}
      onClick={() => onChange(id, !value)}
    >
      <div className="text-xs font-bold">{value ? '1' : '0'}</div>
      
      {/* Output pin */}
      <div className="absolute right-0 top-1/2 w-2 h-2 bg-red-500 rounded-full translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

// Komponen untuk output LED
export const OutputLed = ({ id, position, value }) => {
  return (
    <div 
      className={`border-2 rounded-lg p-2 w-16 h-12 flex items-center justify-center relative ${
        value ? 'bg-red-200 border-red-400' : 'bg-gray-200 border-gray-400'
      }`}
      style={{ position: 'absolute', left: position.x, top: position.y }}
    >
      <div className="text-xs font-bold">{value ? '1' : '0'}</div>
      
      {/* Input pin */}
      <div className="absolute left-0 top-1/2 w-2 h-2 bg-blue-500 rounded-full -translate-x-1 -translate-y-1/2"></div>
    </div>
  );
};

