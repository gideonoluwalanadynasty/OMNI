import React, { useState } from 'react';
import { 
  OmniSpreadsheet, OmniSheetTab, OmniSheetRow, OmniSheetCell, OmniSheetForecast 
} from '../../../types';
import { SEED_OMNI_SPREADSHEETS } from '../../../ai_store_data';
import { omniAi } from '../../../lib/omniAiSdk';
import { 
  BarChart2, Plus, Download, Upload, Sparkles, Filter, 
  ArrowUpDown, RefreshCw, CheckCircle2, TrendingUp, HelpCircle, 
  FileText, Layers, Trash2, Edit2, Play, Table, Sigma, Shield,
  Check, ArrowRight, CornerDownRight, X
} from 'lucide-react';
import { 
  BarChart, Bar, LineChart, Line, AreaChart, Area, XAxis, YAxis, 
  CartesianGrid, Tooltip, ResponsiveContainer, Legend 
} from 'recharts';

interface OmniSheetStudioProps {
  initialSpreadsheetId?: string;
  onOpenDocument?: (docId?: string) => void;
  onOpenSlideDeck?: (slideDeckId?: string) => void;
}

export const OmniSheetStudio: React.FC<OmniSheetStudioProps> = ({
  initialSpreadsheetId,
  onOpenDocument,
  onOpenSlideDeck
}) => {
  const [spreadsheets, setSpreadsheets] = useState<OmniSpreadsheet[]>(SEED_OMNI_SPREADSHEETS);
  const [activeSheetId, setActiveSheetId] = useState<string>(initialSpreadsheetId || SEED_OMNI_SPREADSHEETS[0].id);
  const [activeTabIdx, setActiveTabIdx] = useState<number>(0);
  const [selectedCellCoord, setSelectedCellCoord] = useState<string>('B1');
  const [formulaBarValue, setFormulaBarValue] = useState<string>('$450,000');
  const [sortConfig, setSortConfig] = useState<{ colKey: string; direction: 'asc' | 'desc' } | null>(null);
  const [filterQuery, setFilterQuery] = useState('');
  const [chartViewType, setChartViewType] = useState<'bar' | 'line' | 'area'>('bar');

  // AI Analyst State
  const [nlQuery, setNlQuery] = useState('');
  const [nlAnswer, setNlAnswer] = useState<string | null>(null);
  const [isAnalystLoading, setIsAnalystLoading] = useState(false);
  const [cleaningStatus, setCleaningStatus] = useState<string | null>(null);

  // Active Spreadsheet & Tab
  const activeSheet = spreadsheets.find(s => s.id === activeSheetId) || spreadsheets[0];
  const activeTab = activeSheet.tabs[activeTabIdx] || activeSheet.tabs[0];

  const updateActiveSpreadsheet = (updates: Partial<OmniSpreadsheet>) => {
    setSpreadsheets(prev => prev.map(s => {
      if (s.id === activeSheet.id) {
        return { ...s, ...updates, updatedAt: new Date().toISOString() };
      }
      return s;
    }));
  };

  // Cell Selection & Editing
  const handleSelectCell = (colKey: string, rowNumber: number, cell: OmniSheetCell) => {
    const coord = `${colKey}${rowNumber}`;
    setSelectedCellCoord(coord);
    setFormulaBarValue(cell.formula || cell.computedValue || cell.value?.toString() || '');
  };

  const handleUpdateCell = (colKey: string, rowNumber: number, newVal: string) => {
    const isFormula = newVal.startsWith('=');
    const updatedTabs = [...activeSheet.tabs];
    const targetTab = { ...updatedTabs[activeTabIdx] };
    const rows = [...targetTab.rows];
    const rowIdx = rows.findIndex(r => r.rowNumber === rowNumber);

    if (rowIdx !== -1) {
      const row = { ...rows[rowIdx] };
      const cells = { ...row.cells };
      const currentCell = cells[colKey] || { value: '' };

      let parsedNum = parseFloat(newVal.replace(/[\$,%]/g, ''));
      let valToStore: any = isNaN(parsedNum) ? newVal : parsedNum;

      cells[colKey] = {
        ...currentCell,
        value: isFormula ? currentCell.value : valToStore,
        formula: isFormula ? newVal : undefined,
        computedValue: newVal
      };
      row.cells = cells;
      rows[rowIdx] = row;
      targetTab.rows = rows;
      updatedTabs[activeTabIdx] = targetTab;

      updateActiveSpreadsheet({ tabs: updatedTabs });
    }
  };

  // Run Deterministic Recalculate
  const handleRecalculate = async () => {
    try {
      const resp = await omniAi.analyzeSheetDeterministic({
        spreadsheet: activeSheet,
        action: 'recalculate'
      });
      if (resp.spreadsheet) {
        updateActiveSpreadsheet({
          tabs: resp.spreadsheet.tabs,
          kpis: resp.kpis || activeSheet.kpis,
          forecast: resp.forecast || activeSheet.forecast
        });
      }
    } catch (err: any) {
      console.warn('Recalculate error:', err);
    }
  };

  // Run Data Cleaning Suite
  const handleCleanData = async () => {
    setCleaningStatus('Cleaning data...');
    try {
      const resp = await omniAi.analyzeSheetDeterministic({
        spreadsheet: activeSheet,
        action: 'clean'
      });
      if (resp.spreadsheet) {
        updateActiveSpreadsheet({ tabs: resp.spreadsheet.tabs });
        setCleaningStatus(`Data clean: ${resp.cleaningReport?.deduplicatedCount || 0} duplicate rows removed, ${resp.cleaningReport?.normalizedTextCount || 0} strings trimmed.`);
        setTimeout(() => setCleaningStatus(null), 4000);
      }
    } catch (err: any) {
      setCleaningStatus(`Clean error: ${err.message}`);
    }
  };

  // Natural Language Data Q&A
  const handleAskAnalyst = async () => {
    if (!nlQuery.trim()) return;
    setIsAnalystLoading(true);
    setNlAnswer(null);
    try {
      const resp = await omniAi.analyzeSheetDeterministic({
        spreadsheet: activeSheet,
        action: 'ask_question',
        query: nlQuery
      });
      setNlAnswer(resp.answer || 'Query processed.');
    } catch (err: any) {
      setNlAnswer(`Analyst error: ${err.message}`);
    } finally {
      setIsAnalystLoading(false);
    }
  };

  // Real File Exports
  const handleExport = (format: 'csv' | 'json' | 'html') => {
    if (format === 'csv') {
      const headers = activeTab.columns.map(c => `"${c.header}"`).join(',');
      const rows = activeTab.rows.map(r => 
        activeTab.columns.map(c => {
          const cell = r.cells[c.key];
          return `"${cell?.computedValue || cell?.value || ''}"`;
        }).join(',')
      ).join('\n');

      const csvContent = `${headers}\n${rows}`;
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeSheet.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'json') {
      const blob = new Blob([JSON.stringify(activeSheet, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeSheet.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}.json`;
      a.click();
      URL.revokeObjectURL(url);
    } else if (format === 'html') {
      const tableHtml = `
        <table border="1" style="width:100%; border-collapse:collapse; font-family:sans-serif; text-align:left;">
          <thead style="background:#f3f4f6;">
            <tr>${activeTab.columns.map(c => `<th style="padding:8px;">${c.header}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${activeTab.rows.map(r => `
              <tr>${activeTab.columns.map(c => `<td style="padding:8px; border:1px solid #ddd;">${r.cells[c.key]?.computedValue || r.cells[c.key]?.value || ''}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      `;
      const htmlDoc = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>${activeSheet.title}</title></head><body style="padding:30px;"><h2>${activeSheet.title}</h2><p>${activeSheet.description || ''}</p>${tableHtml}</body></html>`;
      const blob = new Blob([htmlDoc], { type: 'text/html;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${activeSheet.title.toLowerCase().replace(/[^a-z0-9]/gi, '_')}_report.html`;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  // CSV Drag-and-Drop / File Upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      if (!content) return;

      const lines = content.split('\n').filter(l => l.trim().length > 0);
      if (lines.length === 0) return;

      const headerCols = lines[0].split(',').map((h, idx) => ({
        key: String.fromCharCode(65 + idx),
        header: h.replace(/^"|"$/g, '').trim(),
        type: 'string' as const,
        width: 140
      }));

      const dataRows = lines.slice(1).map((line, rIdx) => {
        const values = line.split(',').map(v => v.replace(/^"|"$/g, '').trim());
        const cells: Record<string, OmniSheetCell> = {};
        headerCols.forEach((col, cIdx) => {
          const raw = values[cIdx] || '';
          const num = parseFloat(raw);
          cells[col.key] = {
            value: isNaN(num) ? raw : num,
            computedValue: raw
          };
        });
        return {
          id: `row_${rIdx + 1}`,
          rowNumber: rIdx + 1,
          cells
        };
      });

      const newTab: OmniSheetTab = {
        id: `tab_${Date.now()}`,
        name: file.name.replace(/\.[^/.]+$/, '').slice(0, 20),
        columns: headerCols,
        rows: dataRows
      };

      updateActiveSpreadsheet({
        tabs: [...activeSheet.tabs, newTab]
      });
      setActiveTabIdx(activeSheet.tabs.length);
    };
    reader.readAsText(file);
  };

  // Filtered & Sorted Rows
  let displayedRows = [...activeTab.rows];
  if (filterQuery.trim()) {
    displayedRows = displayedRows.filter(r => 
      Object.values(r.cells).some((c: OmniSheetCell) => 
        (c.computedValue || c.value || '').toString().toLowerCase().includes(filterQuery.toLowerCase())
      )
    );
  }
  if (sortConfig) {
    displayedRows.sort((a, b) => {
      const valA = a.cells[sortConfig.colKey]?.value || '';
      const valB = b.cells[sortConfig.colKey]?.value || '';
      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortConfig.direction === 'asc' ? valA - valB : valB - valA;
      }
      return sortConfig.direction === 'asc' 
        ? valA.toString().localeCompare(valB.toString()) 
        : valB.toString().localeCompare(valA.toString());
    });
  }

  // Chart Data preparation
  const chartData = activeTab.rows.filter(r => r.rowNumber < activeTab.rows.length).map(r => ({
    name: (r.cells['A']?.computedValue || r.cells['A']?.value || `Row ${r.rowNumber}`).toString().split(' ')[0],
    q1: typeof r.cells['B']?.value === 'number' ? r.cells['B']?.value : 0,
    q2: typeof r.cells['C']?.value === 'number' ? r.cells['C']?.value : 0,
    q3: typeof r.cells['D']?.value === 'number' ? r.cells['D']?.value : 0,
    total: typeof r.cells['E']?.value === 'number' ? r.cells['E']?.value : 0
  }));

  return (
    <div id="omni-sheet-studio-container" className="flex flex-col h-full bg-neutral-950 text-neutral-100 min-h-[750px]">
      {/* Header Bar */}
      <header id="sheet-studio-header" className="flex items-center justify-between px-6 py-3 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md z-10">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <BarChart2 className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={activeSheet.title}
                onChange={e => updateActiveSpreadsheet({ title: e.target.value })}
                className="bg-transparent text-lg font-semibold text-white focus:outline-none focus:border-b border-emerald-500 hover:border-b hover:border-neutral-700 transition-colors"
                placeholder="Spreadsheet Title"
              />
              <span className="px-2 py-0.5 text-xs font-mono rounded bg-emerald-950 text-emerald-400 border border-emerald-800/60">
                DETERMINISTIC COMPUTATION
              </span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-neutral-400 mt-0.5">
              <span>{activeTab.rows.length} rows</span>
              <span>•</span>
              <span>{activeTab.columns.length} columns</span>
              <span>•</span>
              <span>R² Forecast: <strong className="text-emerald-400">{activeSheet.forecast?.rSquared || 0.984}</strong></span>
            </div>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center space-x-2">
          {/* Recalculate Formulas */}
          <button
            id="recalc-btn"
            onClick={handleRecalculate}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            title="Recalculate mathematical formulas"
          >
            <Sigma className="w-3.5 h-3.5 text-emerald-400" />
            <span>Recalculate</span>
          </button>

          {/* Clean Data */}
          <button
            id="clean-data-btn"
            onClick={handleCleanData}
            className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 transition-colors"
            title="Deduplicate rows and trim whitespaces"
          >
            <Shield className="w-3.5 h-3.5 text-indigo-400" />
            <span>Clean Data</span>
          </button>

          {/* Upload CSV */}
          <label className="flex items-center space-x-1 px-3 py-1.5 text-xs font-medium rounded-lg bg-neutral-800 hover:bg-neutral-700 text-neutral-200 border border-neutral-700 cursor-pointer transition-colors">
            <Upload className="w-3.5 h-3.5 text-amber-400" />
            <span>Import CSV</span>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
          </label>

          {/* Export Dropdown */}
          <div className="relative group">
            <button
              id="export-sheet-btn"
              className="flex items-center space-x-1 px-3 py-1.5 text-xs font-semibold rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export</span>
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-neutral-900 border border-neutral-800 rounded-lg shadow-xl py-1 hidden group-hover:block z-50">
              <button
                onClick={() => handleExport('csv')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>CSV File</span>
                <span className="text-neutral-500 font-mono">.csv</span>
              </button>
              <button
                onClick={() => handleExport('json')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Sheet JSON</span>
                <span className="text-neutral-500 font-mono">.json</span>
              </button>
              <button
                onClick={() => handleExport('html')}
                className="w-full text-left px-3 py-1.5 text-xs text-neutral-300 hover:bg-neutral-800 hover:text-white flex items-center justify-between"
              >
                <span>Report HTML</span>
                <span className="text-neutral-500 font-mono">.html</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Formula Bar & Coordinate Pointer */}
      <div id="formula-bar-container" className="flex items-center px-4 py-2 border-b border-neutral-800 bg-neutral-900/60 space-x-3">
        <div className="px-2.5 py-1 text-xs font-mono font-bold bg-neutral-800 text-emerald-400 rounded border border-neutral-700 w-16 text-center">
          {selectedCellCoord}
        </div>
        <div className="text-neutral-500 font-mono font-bold text-xs">fx</div>
        <input
          id="formula-bar-input"
          type="text"
          value={formulaBarValue}
          onChange={e => setFormulaBarValue(e.target.value)}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const colKey = selectedCellCoord.charAt(0);
              const rowNum = parseInt(selectedCellCoord.slice(1));
              handleUpdateCell(colKey, rowNum, formulaBarValue);
              handleRecalculate();
            }
          }}
          placeholder="Enter numerical value or formula (=SUM(B1:D1), =AVERAGE(B1:B4), =E1*F1)..."
          className="flex-1 bg-neutral-950 border border-neutral-800 px-3 py-1 text-xs font-mono text-white rounded focus:outline-none focus:border-emerald-500"
        />
        {cleaningStatus && (
          <span className="text-xs text-emerald-400 font-medium px-2 py-0.5 rounded bg-emerald-950 border border-emerald-800 animate-pulse">
            {cleaningStatus}
          </span>
        )}
      </div>

      {/* Main Studio Body: Left Data Grid, Right Analytics & Charts */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Data Grid Area */}
        <main id="sheet-grid-main" className="flex-1 flex flex-col overflow-hidden bg-neutral-950 border-r border-neutral-800">
          {/* Tab Selector & Filter Bar */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/40">
            <div className="flex items-center space-x-1">
              {activeSheet.tabs.map((tab, idx) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTabIdx(idx)}
                  className={`px-3 py-1 text-xs font-medium rounded-t-md transition-colors ${
                    idx === activeTabIdx
                      ? 'bg-neutral-800 text-emerald-400 border-t-2 border-emerald-500 font-semibold'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>

            {/* Filter Query */}
            <div className="flex items-center space-x-2">
              <Filter className="w-3.5 h-3.5 text-neutral-500" />
              <input
                type="text"
                value={filterQuery}
                onChange={e => setFilterQuery(e.target.value)}
                placeholder="Filter rows..."
                className="px-2 py-1 text-xs bg-neutral-800 border border-neutral-700 rounded text-white focus:outline-none focus:border-emerald-500 w-36"
              />
            </div>
          </div>

          {/* Spreadsheet Table Grid */}
          <div className="flex-1 overflow-auto">
            <table className="w-full text-xs text-left border-collapse font-sans">
              <thead className="bg-neutral-900 text-neutral-400 sticky top-0 z-10 select-none">
                <tr>
                  <th className="w-12 px-2 py-2 text-center border-b border-r border-neutral-800 font-mono text-[10px] bg-neutral-900/90 text-neutral-600">
                    #
                  </th>
                  {activeTab.columns.map(col => (
                    <th
                      key={col.key}
                      style={{ width: col.width || 140 }}
                      className="px-3 py-2 border-b border-r border-neutral-800 font-semibold text-neutral-300 cursor-pointer hover:bg-neutral-800/80 transition-colors"
                      onClick={() => {
                        if (sortConfig?.colKey === col.key) {
                          setSortConfig({ colKey: col.key, direction: sortConfig.direction === 'asc' ? 'desc' : 'asc' });
                        } else {
                          setSortConfig({ colKey: col.key, direction: 'asc' });
                        }
                      }}
                    >
                      <div className="flex items-center justify-between">
                        <span>{col.header} ({col.key})</span>
                        <ArrowUpDown className="w-3 h-3 text-neutral-500 ml-1" />
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-800/60 bg-neutral-950 font-mono">
                {displayedRows.map((row) => {
                  const isTotalRow = row.rowNumber === activeTab.rows.length;
                  return (
                    <tr key={row.id} className={`hover:bg-neutral-900/50 ${isTotalRow ? 'bg-neutral-900/60 font-bold border-t-2 border-neutral-700' : ''}`}>
                      <td className="px-2 py-2 text-center border-r border-neutral-800 text-[10px] text-neutral-500 select-none bg-neutral-900/30">
                        {row.rowNumber}
                      </td>
                      {activeTab.columns.map(col => {
                        const cell = row.cells[col.key] || { value: '' };
                        const coord = `${col.key}${row.rowNumber}`;
                        const isSelected = coord === selectedCellCoord;
                        return (
                          <td
                            key={col.key}
                            onClick={() => handleSelectCell(col.key, row.rowNumber, cell)}
                            className={`px-3 py-2 border-r border-neutral-800 transition-all ${
                              isSelected ? 'bg-emerald-950/40 ring-1 ring-emerald-500 font-bold' : ''
                            } ${cell.bold ? 'font-bold text-white' : 'text-neutral-300'}`}
                          >
                            <input
                              type="text"
                              value={cell.computedValue || cell.value || ''}
                              onChange={e => handleUpdateCell(col.key, row.rowNumber, e.target.value)}
                              className={`w-full bg-transparent focus:outline-none ${
                                col.type === 'number' ? 'text-right' : 'text-left'
                              }`}
                            />
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </main>

        {/* Right Analytics, Charts & Natural Language Q&A */}
        <aside id="sheet-analytics-sidebar" className="w-96 bg-neutral-900/50 flex flex-col shrink-0 overflow-y-auto p-4 space-y-6">
          {/* Top KPI Cards */}
          <div>
            <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider block mb-3">Key Performance Metrics</span>
            <div className="grid grid-cols-2 gap-2.5">
              {(activeSheet.kpis || []).map((kpi, idx) => (
                <div key={idx} className="p-3 rounded-lg bg-neutral-900/80 border border-neutral-800">
                  <span className="text-[11px] text-neutral-400 block truncate">{kpi.label}</span>
                  <span className="text-lg font-bold text-white my-1 block">{kpi.value}</span>
                  <span className="text-[10px] text-emerald-400 font-semibold">{kpi.delta}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Interactive Chart Visualizer */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-neutral-300 uppercase tracking-wider">Visual Distribution</span>
              <div className="flex bg-neutral-800 p-0.5 rounded border border-neutral-700">
                <button
                  onClick={() => setChartViewType('bar')}
                  className={`px-2 py-0.5 text-[10px] rounded ${chartViewType === 'bar' ? 'bg-emerald-600 text-white' : 'text-neutral-400'}`}
                >
                  Bar
                </button>
                <button
                  onClick={() => setChartViewType('line')}
                  className={`px-2 py-0.5 text-[10px] rounded ${chartViewType === 'line' ? 'bg-emerald-600 text-white' : 'text-neutral-400'}`}
                >
                  Line
                </button>
                <button
                  onClick={() => setChartViewType('area')}
                  className={`px-2 py-0.5 text-[10px] rounded ${chartViewType === 'area' ? 'bg-emerald-600 text-white' : 'text-neutral-400'}`}
                >
                  Area
                </button>
              </div>
            </div>

            <div className="h-52 bg-neutral-950/80 p-3 rounded-xl border border-neutral-800">
              <ResponsiveContainer width="100%" height="100%">
                {chartViewType === 'bar' ? (
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '11px', color: '#fff' }} />
                    <Bar dataKey="q3" fill="#10B981" name="Q3 ($)" radius={[3, 3, 0, 0]} />
                    <Bar dataKey="q2" fill="#6366F1" name="Q2 ($)" radius={[3, 3, 0, 0]} />
                  </BarChart>
                ) : chartViewType === 'line' ? (
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '11px', color: '#fff' }} />
                    <Line type="monotone" dataKey="total" stroke="#10B981" strokeWidth={2} name="Total ($)" />
                  </LineChart>
                ) : (
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis dataKey="name" stroke="#666" fontSize={10} />
                    <YAxis stroke="#666" fontSize={10} />
                    <Tooltip contentStyle={{ backgroundColor: '#18181b', borderColor: '#3f3f46', borderRadius: '6px', fontSize: '11px', color: '#fff' }} />
                    <Area type="monotone" dataKey="total" fill="#10B981" stroke="#10B981" fillOpacity={0.2} />
                  </AreaChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>

          {/* Deterministic Forecast Summary */}
          {activeSheet.forecast && (
            <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white flex items-center space-x-1">
                  <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
                  <span>ARIMA / Linear Regression</span>
                </span>
                <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950 px-1.5 py-0.5 rounded border border-emerald-800">
                  R² = {activeSheet.forecast.rSquared}
                </span>
              </div>
              <p className="text-[11px] text-neutral-400">
                Quarterly growth trajectory compounds at <strong className="text-white">+{activeSheet.forecast.growthRatePct}%</strong>.
              </p>
              <div className="space-y-1.5 pt-1">
                {activeSheet.forecast.projection.map((proj, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs p-1.5 bg-neutral-950/60 rounded border border-neutral-800/80">
                    <span className="text-neutral-300 font-medium">{proj.period}</span>
                    <span className="font-bold font-mono text-emerald-400">${proj.predicted.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Natural Language Sheet Q&A Box */}
          <div className="p-3.5 bg-neutral-900/90 rounded-xl border border-neutral-800 space-y-3">
            <span className="text-xs font-bold text-white flex items-center space-x-1.5">
              <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
              <span>Data Analyst Q&A</span>
            </span>
            <div className="space-y-2">
              <input
                type="text"
                value={nlQuery}
                onChange={e => setNlQuery(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleAskAnalyst()}
                placeholder="Ask about this data (e.g. 'What was Q3 revenue in West Africa?')..."
                className="w-full px-3 py-2 text-xs bg-neutral-950 border border-neutral-800 rounded-lg text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500"
              />
              <button
                onClick={handleAskAnalyst}
                disabled={isAnalystLoading || !nlQuery.trim()}
                className="w-full py-1.5 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center space-x-1 disabled:opacity-50"
              >
                {isAnalystLoading ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <span>Query Data Model</span>}
              </button>
            </div>

            {nlAnswer && (
              <div className="p-2.5 bg-neutral-950 rounded-lg border border-emerald-500/30 text-xs text-neutral-200 whitespace-pre-wrap leading-relaxed">
                {nlAnswer}
              </div>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
};
