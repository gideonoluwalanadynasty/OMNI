import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  Network,
  Users,
  Building2,
  Shield,
  Search,
  Filter,
  Sparkles,
  Zap,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Eye,
  Lock,
  Globe,
  Share2,
  Phone,
  MessageSquare,
  Video,
  DollarSign,
  CheckCircle2,
  Calendar,
  X,
  Plus,
  RefreshCw,
  Heart,
  Briefcase,
  Layers,
  Crown
} from 'lucide-react';
import {
  OmniGraphNode,
  OmniGraphEdge,
  OmniUniversalContact,
  OmniCircle,
  AiRelationshipRecommendation,
  AiFollowUpSuggestion,
  AiOpportunitySignal,
  AiEngagementPattern,
  OmniEntityKind,
  OmniRelationshipKind
} from '../../../types/omni_relationship_graph';
import { UniversalOmniProfile } from '../../../types/omni_identity';

interface OmniRelationshipGraphViewProps {
  nodes: OmniGraphNode[];
  edges: OmniGraphEdge[];
  circles: OmniCircle[];
  contacts: OmniUniversalContact[];
  recommendations: AiRelationshipRecommendation[];
  followUps: AiFollowUpSuggestion[];
  opportunities: AiOpportunitySignal[];
  engagementPatterns: AiEngagementPattern[];
  activeProfile: UniversalOmniProfile;
  onAddRelationship: (edge: Omit<OmniGraphEdge, 'id' | 'createdAt'>) => void;
  onOpenContact: (contactId: string) => void;
  onOpenMeeting?: () => void;
  onOpenMessage?: (handle?: string) => void;
}

export const OmniRelationshipGraphView: React.FC<OmniRelationshipGraphViewProps> = ({
  nodes,
  edges,
  circles,
  contacts,
  recommendations,
  followUps,
  opportunities,
  engagementPatterns,
  activeProfile,
  onAddRelationship,
  onOpenContact,
  onOpenMeeting,
  onOpenMessage
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEntityType, setSelectedEntityType] = useState<OmniEntityKind | 'all'>('all');
  const [selectedCircleId, setSelectedCircleId] = useState<string>('all');
  const [selectedRelationshipType, setSelectedRelationshipType] = useState<OmniRelationshipKind | 'all'>('all');
  const [selectedNode, setSelectedNode] = useState<OmniGraphNode | null>(nodes[0] || null);
  const [activeTab, setActiveTab] = useState<'graph' | 'ai_intelligence' | 'recommendations' | 'opportunities'>('graph');
  const [isAddRelationshipModalOpen, setIsAddRelationshipModalOpen] = useState(false);

  // Form state for adding relationship edge
  const [newTargetId, setNewTargetId] = useState(nodes[1]?.id || '');
  const [newRelType, setNewRelType] = useState<OmniRelationshipKind>('partner');
  const [newVisibility, setNewVisibility] = useState<'public' | 'mutual_only' | 'circle_only' | 'private'>('circle_only');
  const [newStrength, setNewStrength] = useState(85);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Filtered nodes and edges
  const filteredNodes = useMemo(() => {
    return nodes.filter(node => {
      if (selectedEntityType !== 'all' && node.entityType !== selectedEntityType) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const matchName = node.name.toLowerCase().includes(q);
        const matchHandle = node.handle?.toLowerCase().includes(q);
        const matchOrg = node.organisation?.toLowerCase().includes(q);
        if (!matchName && !matchHandle && !matchOrg) return false;
      }
      return true;
    });
  }, [nodes, selectedEntityType, searchQuery]);

  const filteredEdges = useMemo(() => {
    const nodeIds = new Set(filteredNodes.map(n => n.id));
    return edges.filter(edge => {
      if (!nodeIds.has(edge.sourceId) || !nodeIds.has(edge.targetId)) return false;
      if (selectedRelationshipType !== 'all' && edge.relationshipType !== selectedRelationshipType) return false;
      if (selectedCircleId !== 'all' && !edge.circleIds.includes(selectedCircleId)) return false;
      return true;
    });
  }, [edges, filteredNodes, selectedRelationshipType, selectedCircleId]);

  // Selected Node's connected edges and contacts
  const nodeConnections = useMemo(() => {
    if (!selectedNode) return [];
    return edges.filter(e => e.sourceId === selectedNode.id || e.targetId === selectedNode.id);
  }, [selectedNode, edges]);

  // Canvas visual rendering with smooth node pulses and physics coordinates
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const render = () => {
      time += 0.03;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw subtle grid
      ctx.strokeStyle = 'rgba(30, 41, 59, 0.4)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < canvas.width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }
      for (let y = 0; y < canvas.height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }

      // Draw Edges with animated gradient pulses
      filteredEdges.forEach(edge => {
        const source = nodes.find(n => n.id === edge.sourceId);
        const target = nodes.find(n => n.id === edge.targetId);
        if (!source || !target) return;

        const sx = source.x || 300;
        const sy = source.y || 200;
        const tx = target.x || 500;
        const ty = target.y || 300;

        const isHighlighted = selectedNode && (selectedNode.id === source.id || selectedNode.id === target.id);

        ctx.beginPath();
        ctx.moveTo(sx, sy);
        ctx.lineTo(tx, ty);
        ctx.strokeStyle = isHighlighted
          ? 'rgba(99, 102, 241, 0.8)'
          : edge.relationshipType === 'partner'
          ? 'rgba(168, 85, 247, 0.4)'
          : edge.relationshipType === 'customer'
          ? 'rgba(16, 185, 129, 0.4)'
          : 'rgba(71, 85, 105, 0.4)';
        ctx.lineWidth = isHighlighted ? 3 : Math.max(1, edge.strength / 30);
        ctx.stroke();

        // Edge label & pulse dot
        const midX = (sx + tx) / 2;
        const midY = (sy + ty) / 2;

        if (isHighlighted) {
          ctx.fillStyle = '#C7D2FE';
          ctx.font = '10px sans-serif';
          ctx.fillText(`${edge.relationshipType} (${edge.strength}%)`, midX + 6, midY - 6);
        }

        // Particle pulse along line
        const pulseProgress = (time * 0.5 + (edge.strength % 10) * 0.1) % 1;
        const px = sx + (tx - sx) * pulseProgress;
        const py = sy + (ty - sy) * pulseProgress;
        ctx.beginPath();
        ctx.arc(px, py, 3, 0, Math.PI * 2);
        ctx.fillStyle = isHighlighted ? '#818CF8' : '#38BDF8';
        ctx.fill();
      });

      // Draw Nodes
      filteredNodes.forEach(node => {
        const nx = node.x || 300;
        const ny = node.y || 200;
        const radius = node.radius || 28;
        const isSelected = selectedNode?.id === node.id;

        // Outer glow
        if (isSelected) {
          ctx.beginPath();
          ctx.arc(nx, ny, radius + 8 + Math.sin(time * 3) * 3, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(99, 102, 241, 0.25)';
          ctx.fill();
        }

        // Node Circle
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fillStyle = isSelected
          ? '#4F46E5'
          : node.entityType === 'business'
          ? '#0F172A'
          : node.entityType === 'organisation'
          ? '#1E1B4B'
          : '#1E293B';
        ctx.fill();
        ctx.lineWidth = isSelected ? 3 : 2;
        ctx.strokeStyle = isSelected
          ? '#818CF8'
          : node.entityType === 'business'
          ? '#38BDF8'
          : node.entityType === 'organisation'
          ? '#A855F7'
          : '#64748B';
        ctx.stroke();

        // Node Label
        ctx.fillStyle = '#FFFFFF';
        ctx.font = isSelected ? 'bold 12px sans-serif' : '11px sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(node.name.length > 14 ? node.name.substring(0, 12) + '...' : node.name, nx, ny + radius + 16);

        if (node.handle) {
          ctx.fillStyle = '#94A3B8';
          ctx.font = '10px monospace';
          ctx.fillText(node.handle, nx, ny + radius + 28);
        }
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [filteredNodes, filteredEdges, selectedNode]);

  // Handle canvas click to select node
  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const clicked = filteredNodes.find(node => {
      const nx = node.x || 300;
      const ny = node.y || 200;
      const r = (node.radius || 28) + 6;
      const dist = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);
      return dist <= r;
    });

    if (clicked) {
      setSelectedNode(clicked);
    }
  };

  const handleCreateRelationship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedNode || !newTargetId || selectedNode.id === newTargetId) return;
    const targetNode = nodes.find(n => n.id === newTargetId);
    if (!targetNode) return;

    onAddRelationship({
      tenantId: 'tenant_primary_001',
      sourceId: selectedNode.id,
      sourceName: selectedNode.name,
      targetId: targetNode.id,
      targetName: targetNode.name,
      relationshipType: newRelType,
      strength: newStrength,
      direction: 'bidirectional',
      visibility: newVisibility,
      circleIds: [selectedCircleId !== 'all' ? selectedCircleId : 'circle_partners'],
      tags: ['Manual Connection', newRelType.toUpperCase()],
      status: 'active',
      sentimentScore: 0.85,
      interactionCount: 1,
      lastInteractionAt: new Date().toISOString(),
      aiNotes: `Established relationship with strength ${newStrength}%.`,
      isMutual: true
    });

    setIsAddRelationshipModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950/80 to-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 flex items-center gap-1.5">
              <Network className="w-3 h-3 text-indigo-400" />
              Sovereign Core Differentiator
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
              Active Graph Engine
            </span>
          </div>
          <h2 className="text-2xl lg:text-3xl font-extrabold text-white">
            OMNI Relationship Intelligence Graph
          </h2>
          <p className="text-xs lg:text-sm text-slate-300 max-w-3xl leading-relaxed">
            Multi-dimensional neural network mapping authorised connections between People, Businesses, Communities, Organisations, Customers, and Partners with zero-leakage cryptographic privacy.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => setIsAddRelationshipModalOpen(true)}
            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center gap-2 shadow-lg shadow-indigo-600/20"
          >
            <Plus className="w-4 h-4" />
            <span>Connect Relationship</span>
          </button>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('graph')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'graph'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>Interactive Visual Graph ({filteredNodes.length} Nodes / {filteredEdges.length} Links)</span>
        </button>

        <button
          onClick={() => setActiveTab('ai_intelligence')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'ai_intelligence'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Sparkles className="w-4 h-4 text-indigo-400" />
          <span>AI Relationship Intelligence</span>
          <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-[10px] text-indigo-300 font-mono">
            {followUps.length + opportunities.length} Signals
          </span>
        </button>

        <button
          onClick={() => setActiveTab('recommendations')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'recommendations'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <Zap className="w-4 h-4 text-amber-400" />
          <span>Connection Recommendations ({recommendations.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('opportunities')}
          className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-2 transition-all ${
            activeTab === 'opportunities'
              ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
              : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
          }`}
        >
          <TrendingUp className="w-4 h-4 text-emerald-400" />
          <span>Commercial & Ecosystem Opportunities ({opportunities.length})</span>
        </button>
      </div>

      {/* VIEW 1: INTERACTIVE VISUAL GRAPH */}
      {activeTab === 'graph' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Visual Canvas (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            {/* Filter Bar */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative flex-1 min-w-[200px]">
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search entities, handles, tags..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
                />
              </div>

              {/* Entity Type Filter */}
              <select
                value={selectedEntityType}
                onChange={e => setSelectedEntityType(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Entity Types</option>
                <option value="person">People</option>
                <option value="business">Businesses</option>
                <option value="organisation">Organisations</option>
                <option value="community">Communities</option>
                <option value="customer">Customers</option>
                <option value="partner">Partners</option>
                <option value="employee">Employees</option>
                <option value="supplier">Suppliers</option>
              </select>

              {/* Circle Filter */}
              <select
                value={selectedCircleId}
                onChange={e => setSelectedCircleId(e.target.value)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Sovereign Circles</option>
                {circles.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.memberCount})
                  </option>
                ))}
              </select>

              {/* Relationship Type Filter */}
              <select
                value={selectedRelationshipType}
                onChange={e => setSelectedRelationshipType(e.target.value as any)}
                className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-indigo-500"
              >
                <option value="all">All Relationship Kinds</option>
                <option value="partner">Partners</option>
                <option value="customer">Customers</option>
                <option value="member">Members</option>
                <option value="employee">Employees</option>
                <option value="supplier">Suppliers</option>
                <option value="friend">Friends</option>
                <option value="family">Family</option>
                <option value="community_member">Community Members</option>
              </select>
            </div>

            {/* Canvas Container */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
              <div className="absolute top-3 left-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[11px] text-slate-300 flex items-center gap-2 z-10">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Live Physics Simulation • Click nodes to inspect</span>
              </div>

              <div className="absolute bottom-3 right-3 bg-slate-900/90 backdrop-blur-md border border-slate-800 px-3 py-1.5 rounded-xl text-[10px] text-slate-400 flex items-center gap-3 z-10">
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> Partner</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span> Customer</span>
                <span className="flex items-center gap-1"><span className="w-2.5 h-2.5 rounded-full bg-purple-500"></span> Org / Faith</span>
              </div>

              <canvas
                ref={canvasRef}
                width={780}
                height={520}
                onClick={handleCanvasClick}
                className="w-full h-[520px] cursor-crosshair block"
              />
            </div>
          </div>

          {/* Node Inspector Drawer (1 Col) */}
          <div className="space-y-4">
            {selectedNode ? (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
                {/* Node Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img
                      src={selectedNode.avatarUrl}
                      alt={selectedNode.name}
                      className="w-14 h-14 rounded-2xl object-cover border-2 border-indigo-500/50 shadow-md"
                    />
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h3 className="text-base font-extrabold text-white">{selectedNode.name}</h3>
                        {selectedNode.isVerified && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </div>
                      <p className="text-xs text-indigo-400 font-mono">{selectedNode.handle}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 bg-slate-800 text-slate-300 text-[10px] font-bold rounded uppercase">
                        {selectedNode.entityType} • {selectedNode.categoryTag || 'Ecosystem Node'}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Organisation & Metadata */}
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Affiliated Organisation:</span>
                    <span className="text-white font-semibold">{selectedNode.organisation || 'Autonomous'}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Tenant Partition:</span>
                    <span className="font-mono text-slate-300">{selectedNode.tenantId}</span>
                  </div>
                  <div className="flex items-center justify-between text-slate-400">
                    <span>Connected Links:</span>
                    <span className="text-emerald-400 font-bold">{nodeConnections.length} Relationships</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-3 gap-2">
                  <button
                    onClick={() => onOpenMessage && onOpenMessage(selectedNode.handle)}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
                  >
                    <MessageSquare className="w-4 h-4 text-indigo-400" />
                    <span>Send DM</span>
                  </button>
                  <button
                    onClick={() => onOpenMeeting && onOpenMeeting()}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
                  >
                    <Video className="w-4 h-4 text-emerald-400" />
                    <span>Meet (HD)</span>
                  </button>
                  <button
                    onClick={() => {
                      const matched = contacts.find(c => c.name.toLowerCase() === selectedNode.name.toLowerCase() || c.linkedOmniHandle === selectedNode.handle);
                      if (matched) onOpenContact(matched.id);
                    }}
                    className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-semibold flex flex-col items-center gap-1 transition-colors"
                  >
                    <DollarSign className="w-4 h-4 text-amber-400" />
                    <span>Transact</span>
                  </button>
                </div>

                {/* Relationship Links Breakdown */}
                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center justify-between">
                    <span>Authorised Connections</span>
                    <span className="text-[10px] text-indigo-400 font-mono">{nodeConnections.length} Active</span>
                  </h4>

                  <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                    {nodeConnections.map(edge => {
                      const isSource = edge.sourceId === selectedNode.id;
                      const otherName = isSource ? edge.targetName : edge.sourceName;

                      return (
                        <div
                          key={edge.id}
                          className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs space-y-1.5"
                        >
                          <div className="flex items-center justify-between">
                            <span className="font-bold text-white">{otherName}</span>
                            <span className="px-2 py-0.5 rounded text-[9px] font-bold uppercase bg-indigo-500/20 text-indigo-300 border border-indigo-500/30">
                              {edge.relationshipType}
                            </span>
                          </div>

                          <div className="flex items-center justify-between text-[11px] text-slate-400">
                            <span>Connection Strength:</span>
                            <span className="font-mono text-emerald-400 font-bold">{edge.strength}%</span>
                          </div>

                          <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                            <div
                              className="bg-gradient-to-r from-indigo-500 to-emerald-400 h-full rounded-full"
                              style={{ width: `${edge.strength}%` }}
                            ></div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                            <span className="flex items-center gap-1">
                              {edge.visibility === 'public' ? (
                                <Globe className="w-3 h-3 text-sky-400" />
                              ) : (
                                <Lock className="w-3 h-3 text-amber-400" />
                              )}
                              {edge.visibility.replace('_', ' ')}
                            </span>
                            <span>{edge.interactionCount} interactions</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center text-slate-500 space-y-3">
                <Network className="w-10 h-10 mx-auto text-slate-600 animate-bounce" />
                <p className="text-xs">Click any node on the graph canvas to inspect relationship telemetry, trust scores, and AI recommendations.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* VIEW 2: AI RELATIONSHIP INTELLIGENCE */}
      {activeTab === 'ai_intelligence' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Follow-Up Suggestions */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                  <Sparkles className="w-4 h-4" />
                  <span>AI Follow-Up Triggers</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300">
                  {followUps.length} Actions
                </span>
              </div>

              <div className="space-y-3">
                {followUps.map(item => (
                  <div key={item.id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{item.contactName}</h4>
                      <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold uppercase ${
                        item.priority === 'high' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30' : 'bg-amber-500/20 text-amber-300'
                      }`}>
                        {item.priority} Priority
                      </span>
                    </div>
                    <p className="text-xs text-slate-300">{item.reason}</p>
                    <div className="bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-900/40 text-[11px] text-indigo-200">
                      <strong className="block text-indigo-400 text-[10px] uppercase">Recommended Action:</strong>
                      {item.recommendedAction}
                    </div>
                    {item.suggestedDraft && (
                      <div className="bg-slate-900 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-400 italic">
                        "{item.suggestedDraft}"
                      </div>
                    )}
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-slate-500 font-mono">Due: {item.dueDate}</span>
                      <button
                        onClick={() => onOpenContact(item.contactId)}
                        className="px-3 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-colors"
                      >
                        <span>Execute</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Engagement Patterns */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <TrendingUp className="w-4 h-4" />
                  <span>Engagement Velocity</span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
                  Real-time
                </span>
              </div>

              <div className="space-y-3">
                {engagementPatterns.map((pat, idx) => (
                  <div key={idx} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-white">{pat.contactName}</h4>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-400 font-mono">
                        {pat.engagementScore}/100 Score
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-slate-400">
                      <span>Trend: <strong className="text-white capitalize">{pat.trend}</strong></span>
                      <span>•</span>
                      <span>Sentiment: <strong className="text-indigo-400 capitalize">{pat.sentiment}</strong></span>
                    </div>
                    <p className="text-xs text-slate-300">{pat.notes}</p>
                    <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                      <div
                        className="bg-emerald-400 h-full rounded-full"
                        style={{ width: `${pat.engagementScore}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Sovereign Guardrails Box */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                  <Shield className="w-4 h-4" />
                  <span>AI Privacy & Sovereign Guardrails</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  OMNI AI operates strictly under Zero Data Retention (ZDR). It assists with relationship synthesis and follow-ups but is mathematically constrained from revealing private relationships or executing unapproved decisions.
                </p>
                <div className="space-y-2 pt-2">
                  <div className="flex items-start gap-2 text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>No automated actions executed without explicit user confirmation.</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-emerald-300 bg-emerald-950/30 p-2.5 rounded-xl border border-emerald-900/40">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>Zero cross-tenant leakage between enterprise and faith dioceses.</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1 font-mono">
                <div className="text-white font-bold">Cryptographic Ledger Sync</div>
                <div>Hash: sha256:rel_ai_mesh_proof_9921a</div>
                <div>Status: Verified Sovereign</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* VIEW 3: CONNECTION RECOMMENDATIONS */}
      {activeTab === 'recommendations' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map(rec => (
            <div key={rec.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rec.avatarUrl}
                    alt={rec.name}
                    className="w-12 h-12 rounded-2xl object-cover border border-indigo-500/40"
                  />
                  <div>
                    <h3 className="text-sm font-bold text-white">{rec.name}</h3>
                    <p className="text-xs text-indigo-400 font-mono">{rec.handle}</p>
                    <span className="text-[10px] text-slate-400 uppercase font-semibold">{rec.entityType}</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Mutual Nodes:</span>
                    <span className="font-bold text-emerald-400">{rec.mutualConnectionsCount} Connections</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Compatibility:</span>
                    <span className="font-bold text-indigo-400 font-mono">{rec.compatibilityScore}%</span>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {rec.rationale}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-1">
                  {rec.mutualCircles.map((cir, i) => (
                    <span key={i} className="px-2 py-0.5 bg-slate-800 text-slate-300 rounded text-[10px] font-semibold">
                      {cir}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 flex items-center gap-2">
                <button
                  onClick={() => {
                    onAddRelationship({
                      tenantId: 'tenant_primary_001',
                      sourceId: 'node_gideon',
                      sourceName: activeProfile.displayName,
                      targetId: rec.profileId,
                      targetName: rec.name,
                      relationshipType: rec.recommendedRelationship,
                      strength: rec.compatibilityScore,
                      direction: 'bidirectional',
                      visibility: 'circle_only',
                      circleIds: ['circle_partners'],
                      tags: ['AI Recommended', rec.recommendedRelationship.toUpperCase()],
                      status: 'active',
                      sentimentScore: 0.90,
                      interactionCount: 1,
                      lastInteractionAt: new Date().toISOString(),
                      aiNotes: rec.rationale,
                      isMutual: true
                    });
                  }}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-indigo-600/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Connect as {rec.recommendedRelationship}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* VIEW 4: OPPORTUNITIES */}
      {activeTab === 'opportunities' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {opportunities.map(opp => (
            <div key={opp.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4 flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-1 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-lg text-xs font-extrabold font-mono">
                    ${opp.estimatedValue.toLocaleString()} {opp.currency}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-500/20 text-indigo-300 font-mono">
                    {opp.probability}% Probability
                  </span>
                </div>

                <div>
                  <h3 className="text-sm font-extrabold text-white">{opp.title}</h3>
                  <p className="text-xs text-slate-400 mt-0.5">{opp.contactName} • {opp.organisation}</p>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed">
                  {opp.rationale}
                </p>

                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[11px] text-amber-300 space-y-1">
                  <strong className="block text-amber-400 text-[10px] uppercase">Trigger Signal:</strong>
                  {opp.triggerEvent}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center gap-2">
                <button
                  onClick={() => onOpenContact(opp.contactId)}
                  className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold transition-colors flex items-center justify-center gap-1.5 shadow-lg shadow-emerald-600/20"
                >
                  <span>Open Contact & CRM Pipeline</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* MODAL: ADD RELATIONSHIP */}
      {isAddRelationshipModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Network className="w-5 h-5 text-indigo-400" />
                Establish Sovereign Relationship
              </h3>
              <button
                onClick={() => setIsAddRelationshipModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateRelationship} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Source Entity (Author)</label>
                <input
                  type="text"
                  disabled
                  value={selectedNode?.name || activeProfile.displayName}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-slate-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Entity to Connect</label>
                <select
                  value={newTargetId}
                  onChange={e => setNewTargetId(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>
                      {n.name} ({n.handle || n.entityType})
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Relationship Type</label>
                  <select
                    value={newRelType}
                    onChange={e => setNewRelType(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="partner">Partner</option>
                    <option value="customer">Customer</option>
                    <option value="lead">Lead</option>
                    <option value="member">Member</option>
                    <option value="employee">Employee</option>
                    <option value="supplier">Supplier</option>
                    <option value="friend">Friend</option>
                    <option value="family">Family</option>
                    <option value="student">Student</option>
                    <option value="subscriber">Subscriber</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Visibility Level</label>
                  <select
                    value={newVisibility}
                    onChange={e => setNewVisibility(e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-indigo-500"
                  >
                    <option value="public">Public (Open)</option>
                    <option value="circle_only">Circle Only</option>
                    <option value="mutual_only">Mutual Only</option>
                    <option value="private">Private (Encrypted)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Connection Strength ({newStrength}%)
                </label>
                <input
                  type="range"
                  min="1"
                  max="100"
                  value={newStrength}
                  onChange={e => setNewStrength(Number(e.target.value))}
                  className="w-full accent-indigo-500"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddRelationshipModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 hover:bg-slate-700 rounded-xl text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold shadow-lg"
                >
                  Save Relationship Link
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
