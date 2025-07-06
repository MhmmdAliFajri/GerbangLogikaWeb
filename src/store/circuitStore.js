import { create } from 'zustand';

// Store untuk mengelola state rangkaian logika
export const useCircuitStore = create((set, get) => ({
  // State untuk menyimpan semua komponen dalam rangkaian
  components: [],
  
  // State untuk menyimpan koneksi antar komponen
  connections: [],
  
  // State untuk mode aplikasi (edit, simulate)
  mode: 'edit',
  
  // State untuk komponen yang sedang dipilih
  selectedComponent: null,
  
  // State untuk input values
  inputValues: {},
  
  // State untuk output values
  outputValues: {},
  
  // State untuk connection mode
  connectionMode: false,
  
  // State untuk temporary connection saat sedang membuat koneksi
  tempConnection: null,
  
  // Action untuk menambah komponen baru
  addComponent: (component) => set((state) => ({
    components: [...state.components, { 
      ...component, 
      id: `${component.type}_${Date.now()}` 
    }]
  })),
  
  // Action untuk menghapus komponen
  removeComponent: (id) => set((state) => ({
    components: state.components.filter(comp => comp.id !== id),
    connections: state.connections.filter(conn => 
      conn.from !== id && conn.to !== id
    )
  })),
  
  // Action untuk memperbarui posisi komponen
  updateComponentPosition: (id, position) => set((state) => {
    const updatedComponents = state.components.map(comp =>
      comp.id === id ? { ...comp, position } : comp
    );
    
    // Update connection positions
    const updatedConnections = state.connections.map(conn => {
      const newConn = { ...conn };
      
      if (conn.from === id) {
        const component = updatedComponents.find(c => c.id === id);
        newConn.fromPos = getPinPosition(component, 'output', conn.fromPin);
      }
      
      if (conn.to === id) {
        const component = updatedComponents.find(c => c.id === id);
        newConn.toPos = getPinPosition(component, 'input', conn.toPin);
      }
      
      return newConn;
    });
    
    return {
      components: updatedComponents,
      connections: updatedConnections
    };
  }),
  
  // Action untuk menambah koneksi
  addConnection: (connection) => set((state) => ({
    connections: [...state.connections, connection]
  })),
  
  // Action untuk menghapus koneksi
  removeConnection: (connectionId) => set((state) => ({
    connections: state.connections.filter(conn => conn.id !== connectionId)
  })),
  
  // Action untuk mengubah mode
  setMode: (mode) => set({ mode }),
  
  // Action untuk memilih komponen
  selectComponent: (id) => set({ selectedComponent: id }),
  
  // Action untuk mengubah nilai input
  setInputValue: (id, value) => set((state) => ({
    inputValues: { ...state.inputValues, [id]: value }
  })),
  
  // Action untuk connection mode
  setConnectionMode: (mode) => set({ connectionMode: mode }),
  
  // Action untuk temp connection
  setTempConnection: (connection) => set({ tempConnection: connection }),
  
  // Action untuk menghitung dan memperbarui output
  calculateOutputs: () => {
    const state = get();
    const newOutputValues = {};

    // Fungsi untuk menghitung output berdasarkan type gerbang
    const calculateGateOutput = (gate, inputs) => {
      switch (gate.type) {
        case 'AND':
          return inputs.length > 0 ? inputs.every(input => input === true) : false;
        case 'OR':
          return inputs.length > 0 ? inputs.some(input => input === true) : false;
        case 'NOT':
          return inputs.length > 0 ? !inputs[0] : true;
        case 'NAND':
          return inputs.length > 0 ? !inputs.every(input => input === true) : true;
        case 'NOR':
          return inputs.length > 0 ? !inputs.some(input => input === true) : true;
        case 'XOR':
          return inputs.length === 2 ? inputs[0] !== inputs[1] : false;
        case 'XNOR':
          return inputs.length === 2 ? inputs[0] === inputs[1] : true;
        default:
          return false;
      }
    };

    // Fungsi rekursif untuk menghitung nilai komponen
    const calculateComponentValue = (componentId, visited = new Set()) => {
      if (visited.has(componentId)) return false; // Hindari infinite loop
      visited.add(componentId);

      const component = state.components.find(c => c.id === componentId);
      if (!component) return false;

      // Jika komponen adalah input, ambil nilai dari inputValues
      if (component.type === 'INPUT') {
        return state.inputValues[componentId] || false;
      }

      // Jika komponen adalah OUTPUT atau OUTPUT_LED_ICON, ambil nilai dari komponen yang terhubung ke input-nya
      if (component.type === 'OUTPUT' || component.type === 'OUTPUT_LED_ICON') {
        // Cari koneksi ke pin input 0
        const inputConn = state.connections.find(conn => conn.to === componentId && conn.toPin === 0);
        if (inputConn) {
          return calculateComponentValue(inputConn.from, new Set(visited));
        } else {
          return false;
        }
      }

      // Cari semua koneksi yang menuju ke komponen ini, diurutkan berdasarkan pin index
      const inputConnections = state.connections
        .filter(conn => conn.to === componentId)
        .sort((a, b) => a.toPin - b.toPin);

      // Buat array input values berdasarkan pin index
      const inputValues = [];
      for (let i = 0; i < component.inputs; i++) {
        const connection = inputConnections.find(conn => conn.toPin === i);
        if (connection) {
          inputValues[i] = calculateComponentValue(connection.from, new Set(visited));
        } else {
          inputValues[i] = false; // Default value untuk pin yang tidak terhubung
        }
      }

      // Hitung output berdasarkan type gerbang
      return calculateGateOutput(component, inputValues);
    };

    // Hitung nilai untuk semua komponen non-input
    state.components.forEach(component => {
      if (component.type !== 'INPUT') {
        newOutputValues[component.id] = calculateComponentValue(component.id);
      }
    });

    set({ outputValues: newOutputValues });
  },
  
  // Action untuk reset semua
  reset: () => set({
    components: [],
    connections: [],
    selectedComponent: null,
    inputValues: {},
    outputValues: {},
    connectionMode: false,
    tempConnection: null
  }),
  
  // Action untuk generate truth table
  generateTruthTable: () => {
    const state = get();
    const inputComponents = state.components.filter(c => c.type === 'INPUT');
    const outputComponents = state.components.filter(c => c.type === 'OUTPUT');
    
    if (inputComponents.length === 0) return [];
    
    const numInputs = inputComponents.length;
    const numRows = Math.pow(2, numInputs);
    const truthTable = [];
    
    // Generate semua kombinasi input
    for (let i = 0; i < numRows; i++) {
      const row = {};
      
      // Set nilai input berdasarkan binary representation dari i
      inputComponents.forEach((input, index) => {
        const bitValue = (i >> (numInputs - 1 - index)) & 1;
        row[input.id] = bitValue === 1;
      });
      
      // Temporarily set input values dan hitung output
      const originalInputValues = { ...state.inputValues };
      set({ inputValues: row });
      get().calculateOutputs();
      
      // Ambil output values
      const currentOutputs = get().outputValues;
      outputComponents.forEach(output => {
        row[output.id] = currentOutputs[output.id] || false;
      });
      
      truthTable.push(row);
      
      // Restore original input values
      set({ inputValues: originalInputValues });
    }
    
    return truthTable;
  }
}));

// Helper function untuk menghitung posisi pin
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

